import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AdminSidebar } from '@/app/components/Admin/AdminSidebar';
import { AdminHeader } from '@/app/components/Admin/AdminHeader';
import { AdminDataTable, Column, Action } from '@/app/components/Admin/AdminDataTable';
import { AdminStatsCard } from '@/app/components/Admin/AdminStatsCard';
import { Button } from '@/app/components/Button';
import { usersApi } from '@/app/utils/api';
import {
  Users,
  UserPlus,
  UserX,
  UserCheck,
  Eye,
  Edit,
  Trash2,
  Download,
  Filter,
  Search,
  Shield,
  Crown,
  User as UserIcon
} from 'lucide-react';

interface User {
  id: number;
  username: string;
  email: string;
  role: 'Super Admin' | 'Admin' | 'Modérateur' | 'Contributeur' | 'Membre';
  status: 'active' | 'pending' | 'suspended' | 'banned';
  joinDate: string;
  lastLogin: string;
  articlesCount: number;
  commentsCount: number;
  reportsCount: number;
}

export function AdminUsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [deleteConfirmUser, setDeleteConfirmUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [showBulkRoleModal, setShowBulkRoleModal] = useState(false);
  const [showBulkSuspendModal, setShowBulkSuspendModal] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [bulkRole, setBulkRole] = useState('Membre');
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    role: '',
    status: '',
    bio: ''
  });
  const [createForm, setCreateForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Membre',
    status: 'active',
    bio: ''
  });

  // Helper function to convert frontend role to backend roles array
  const roleToBackend = (role: string): string[] => {
    const roleMap: Record<string, string[]> = {
      'Super Admin': ['ROLE_ADMIN', 'ROLE_MODERATOR', 'ROLE_CONTRIBUTOR', 'ROLE_USER'],
      'Admin': ['ROLE_ADMIN', 'ROLE_MODERATOR', 'ROLE_CONTRIBUTOR', 'ROLE_USER'],
      'Modérateur': ['ROLE_MODERATOR', 'ROLE_CONTRIBUTOR', 'ROLE_USER'],
      'Contributeur': ['ROLE_CONTRIBUTOR', 'ROLE_USER'],
      'Membre': ['ROLE_USER']
    };
    return roleMap[role] || ['ROLE_USER'];
  };

  // Helper function to convert frontend status to backend flags
  const statusToBackend = (status: string) => {
    const statusMap: Record<string, { isActive: boolean; isBanned: boolean }> = {
      'active': { isActive: true, isBanned: false },
      'pending': { isActive: false, isBanned: false },
      'suspended': { isActive: false, isBanned: false },
      'banned': { isActive: false, isBanned: true }
    };
    return statusMap[status] || { isActive: true, isBanned: false };
  };

  // Helper function to convert frontend data to backend format
  const convertToBackendFormat = (data: any) => {
    const backendData: any = {};
    
    if (data.username) backendData.username = data.username;
    if (data.email) backendData.email = data.email;
    if (data.password) backendData.password = data.password;
    if (data.bio) backendData.bio = data.bio;
    
    if (data.role) {
      backendData.roles = roleToBackend(data.role);
    }
    
    if (data.status) {
      const statusFlags = statusToBackend(data.status);
      backendData.isActive = statusFlags.isActive;
      backendData.isBanned = statusFlags.isBanned;
    }
    
    return backendData;
  };

  // Export users to CSV
  const exportToCSV = () => {
    const headers = ['ID', 'Nom d\'utilisateur', 'Email', 'Rôle', 'Statut', 'Date d\'inscription', 'Dernière connexion', 'Articles', 'Commentaires', 'Signalements'];
    const rows = filteredUsers.map(user => [
      user.id,
      user.username,
      user.email,
      user.role,
      user.status,
      user.joinDate,
      user.lastLogin,
      user.articlesCount,
      user.commentsCount,
      user.reportsCount
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `untouchables_users_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Load users from backend
  useEffect(() => {
    async function loadUsers() {
      try {
        setIsLoading(true);
        console.log('[AdminUsersPage] Loading users');
        
        const allUsers = await usersApi.getAll();
        console.log('[AdminUsersPage] Loaded users:', allUsers.length);
        
        // Map backend users to admin format
        const mappedUsers: User[] = allUsers.map(user => ({
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.roles?.includes('ROLE_ADMIN') ? 'Admin' : 
                user.roles?.includes('ROLE_MODERATOR') ? 'Modérateur' : 
                user.roles?.includes('ROLE_CONTRIBUTOR') ? 'Contributeur' : 'Membre',
          status: user.isBanned ? 'banned' : 
                  user.isActive === false ? 'suspended' : 'active',
          joinDate: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : '2024-01-01',
          lastLogin: user.updatedAt ? new Date(user.updatedAt).toISOString().replace('T', ' ').substring(0, 16) : 'Jamais',
          articlesCount: 0, // TODO: Get from stats
          commentsCount: 0, // TODO: Get from stats
          reportsCount: 0 // TODO: Get from stats
        }));
        
        console.log('[AdminUsersPage] Mapped users:', mappedUsers.map(u => ({ id: u.id, username: u.username })));
        setUsers(mappedUsers);
        setError(null);
      } catch (err) {
        console.error('[AdminUsersPage] Failed to load users:', err);
        setError('Impossible de charger les utilisateurs');
      } finally {
        setIsLoading(false);
      }
    }
    loadUsers();
  }, []);

  // Initialize edit form when editingUser changes
  useEffect(() => {
    if (editingUser) {
      setEditForm({
        username: editingUser.username,
        email: editingUser.email,
        role: editingUser.role,
        status: editingUser.status,
        bio: '' // TODO: Get from backend if available
      });
    }
  }, [editingUser]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const userColumns: Column<User>[] = [
    {
      key: 'username',
      label: 'Utilisateur',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#8B0000] flex items-center justify-center">
            {row.role === 'Super Admin' && <Crown size={16} className="text-[#F0F0F0]" />}
            {row.role === 'Admin' && <Shield size={16} className="text-[#F0F0F0]" />}
            {(row.role === 'Modérateur' || row.role === 'Contributeur') && <UserCheck size={16} className="text-[#F0F0F0]" />}
            {row.role === 'Membre' && <UserIcon size={16} className="text-[#F0F0F0]" />}
          </div>
          <div>
            <p className="text-[#F0F0F0] font-medium">{value}</p>
            <p className="font-mono text-xs text-[#808080]">{row.email}</p>
          </div>
        </div>
      ),
      width: '25%'
    },
    {
      key: 'role',
      label: 'Rôle',
      sortable: true,
      render: (value) => {
        const roleColors: Record<string, string> = {
          'Super Admin': '#8B0000',
          'Admin': '#8B0000',
          'Modérateur': '#F0F0F0',
          'Contributeur': '#808080',
          'Membre': '#808080'
        };
        const color = roleColors[value] || '#808080';
        return (
          <span 
            className="px-2 py-1 text-xs font-mono uppercase border"
            style={{ 
              backgroundColor: `${color}20`,
              borderColor: `${color}40`,
              color
            }}
          >
            {value}
          </span>
        );
      },
      width: '12%'
    },
    {
      key: 'status',
      label: 'Statut',
      sortable: true,
      render: (value) => {
        const statusConfig = {
          active: { color: '#F0F0F0', label: 'Actif' },
          pending: { color: '#808080', label: 'En attente' },
          suspended: { color: '#8B0000', label: 'Suspendu' },
          banned: { color: '#8B0000', label: 'Banni' }
        };
        const config = statusConfig[value as keyof typeof statusConfig];
        return (
          <span 
            className="px-2 py-1 text-xs font-mono uppercase border"
            style={{ 
              backgroundColor: `${config.color}20`,
              borderColor: `${config.color}40`,
              color: config.color
            }}
          >
            {config.label}
          </span>
        );
      },
      width: '10%'
    },
    {
      key: 'articlesCount',
      label: 'Articles',
      sortable: true,
      render: (value) => (
        <span className="font-mono text-sm text-[#F0F0F0] font-bold">
          {value}
        </span>
      ),
      width: '8%'
    },
    {
      key: 'commentsCount',
      label: 'Commentaires',
      sortable: true,
      render: (value) => (
        <span className="font-mono text-sm text-[#808080]">
          {value}
        </span>
      ),
      width: '10%'
    },
    {
      key: 'reportsCount',
      label: 'Signalements',
      sortable: true,
      render: (value) => (
        <span 
          className={`font-mono text-sm font-bold ${value > 0 ? 'text-[#8B0000]' : 'text-[#808080]'}`}
        >
          {value}
        </span>
      ),
      width: '10%'
    },
    {
      key: 'joinDate',
      label: 'Inscription',
      sortable: true,
      render: (value) => (
        <span className="font-mono text-xs text-[#8B0000]">
          {new Date(value).toLocaleDateString('fr-FR')}
        </span>
      ),
      width: '10%'
    }
  ];

  const userActions: Action<User>[] = [
    {
      icon: Eye,
      label: 'Voir le profil',
      onClick: (user) => setViewingUser(user),
      variant: 'default'
    },
    {
      icon: Edit,
      label: 'Éditer',
      onClick: (user) => setEditingUser(user),
      variant: 'default'
    },
    {
      icon: Trash2,
      label: 'Supprimer',
      onClick: (user) => setDeleteConfirmUser(user),
      variant: 'danger',
      show: (user) => user.role !== 'Super Admin' && user.role !== 'Admin'
    }
  ];

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    pending: users.filter(u => u.status === 'pending').length,
    suspended: users.filter(u => u.status === 'suspended' || u.status === 'banned').length
  };

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminHeader 
          title="Utilisateurs"
          breadcrumbs={[{ label: 'Gestion' }, { label: 'Utilisateurs' }]}
        />

        <main className="flex-1 p-6 space-y-6">
          {/* Stats */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AdminStatsCard
                icon={Users}
                label="Total Utilisateurs"
                value={stats.total}
                color="#8B0000"
              />
              <AdminStatsCard
                icon={UserCheck}
                label="Actifs"
                value={stats.active}
                color="#F0F0F0"
              />
              <AdminStatsCard
                icon={UserPlus}
                label="En attente"
                value={stats.pending}
                color="#808080"
              />
              <AdminStatsCard
                icon={UserX}
                label="Suspendus / Bannis"
                value={stats.suspended}
                color="#8B0000"
              />
            </div>
          </section>

          {/* Filters & Actions */}
          <section className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#808080]" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher un utilisateur..."
                    className="
                      w-full pl-9 pr-4 py-2 
                      bg-[#1A1A1A] 
                      border border-[#8B0000]/30 
                      focus:border-[#8B0000] 
                      text-[#F0F0F0] 
                      text-xs 
                      placeholder:text-[#808080]
                      outline-none
                    "
                  />
                </div>

                {/* Role Filter */}
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="
                    px-4 py-2 
                    bg-[#1A1A1A] 
                    border border-[#8B0000]/30 
                    text-[#F0F0F0] 
                    text-xs 
                    outline-none
                    cursor-pointer
                  "
                >
                  <option value="all">Tous les rôles</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Modérateur">Modérateur</option>
                  <option value="Contributeur">Contributeur</option>
                  <option value="Membre">Membre</option>
                </select>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="
                    px-4 py-2 
                    bg-[#1A1A1A] 
                    border border-[#8B0000]/30 
                    text-[#F0F0F0] 
                    text-xs 
                    outline-none
                    cursor-pointer
                  "
                >
                  <option value="all">Tous les statuts</option>
                  <option value="active">Actif</option>
                  <option value="pending">En attente</option>
                  <option value="suspended">Suspendu</option>
                  <option value="banned">Banni</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={exportToCSV}
                >
                  <Download size={16} />
                  Exporter
                </Button>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => setShowCreateModal(true)}
                >
                  <UserPlus size={16} />
                  Nouvel Utilisateur
                </Button>
              </div>
            </div>
          </section>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div
              className="bg-[#8B0000]/10 border border-[#8B0000] p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#F0F0F0] font-medium">
                  {selectedUsers.length} utilisateur{selectedUsers.length > 1 ? 's' : ''} sélectionné{selectedUsers.length > 1 ? 's' : ''}
                </span>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => setShowBulkRoleModal(true)}
                  >
                    <Edit size={16} />
                    Changer le rôle
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => setShowBulkSuspendModal(true)}
                  >
                    <UserX size={16} />
                    Suspendre
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => setShowBulkDeleteModal(true)}
                  >
                    <Trash2 size={16} />
                    Supprimer
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Users Table */}
          <section>
            <AdminDataTable
              data={filteredUsers}
              columns={userColumns}
              actions={userActions}
              selectable={true}
              onSelectionChange={setSelectedUsers}
              emptyMessage="Aucun utilisateur trouvé"
            />
          </section>

          {/* Pagination */}
          <section className="flex items-center justify-between">
            <span className="font-mono text-xs text-[#808080] uppercase">
              Affichage de {filteredUsers.length} sur {users.length} utilisateurs
            </span>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm">Précédent</Button>
              <span className="font-mono text-xs text-[#F0F0F0] px-4">Page 1 / 1</span>
              <Button variant="secondary" size="sm">Suivant</Button>
            </div>
          </section>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmUser && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setDeleteConfirmUser(null)}
        >
          <div 
            className="bg-[#0A0A0A] border-2 border-[#8B0000] p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-[#F0F0F0] mb-4 uppercase tracking-wide">
              Confirmer la suppression
            </h3>
            <p className="text-[#808080] mb-6">
              Êtes-vous sûr de vouloir supprimer l'utilisateur <span className="text-[#F0F0F0] font-bold">{deleteConfirmUser.username}</span> ?
              Cette action est irréversible.
            </p>
            <div className="flex gap-3">
              <Button 
                variant="secondary" 
                onClick={() => setDeleteConfirmUser(null)}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button 
                variant="primary" 
                onClick={async () => {
                  try {
                    await usersApi.delete(String(deleteConfirmUser.id));
                    setUsers(users.filter(u => u.id !== deleteConfirmUser.id));
                    setDeleteConfirmUser(null);
                  } catch (err) {
                    console.error('Failed to delete user:', err);
                    alert('Erreur lors de la suppression');
                  }
                }}
                className="flex-1 bg-[#8B0000] hover:bg-[#6B0000]"
              >
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setEditingUser(null)}
        >
          <div 
            className="bg-[#0A0A0A] border-2 border-[#8B0000] p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-[#F0F0F0] mb-4 uppercase tracking-wide">
              Éditer l'utilisateur
            </h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const backendData = convertToBackendFormat(editForm);
                  await usersApi.update(String(editingUser.id), backendData);
                  setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...editForm } : u));
                  setEditingUser(null);
                } catch (err) {
                  console.error('Failed to update user:', err);
                  alert('Erreur lors de la mise à jour');
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#F0F0F0]">Nom d'utilisateur</label>
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                  className="
                    w-full pl-4 pr-4 py-2 
                    bg-[#1A1A1A] 
                    border border-[#8B0000]/30 
                    focus:border-[#8B0000] 
                    text-[#F0F0F0] 
                    text-xs 
                    placeholder:text-[#808080]
                    outline-none
                  "
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#F0F0F0]">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="
                    w-full pl-4 pr-4 py-2 
                    bg-[#1A1A1A] 
                    border border-[#8B0000]/30 
                    focus:border-[#8B0000] 
                    text-[#F0F0F0] 
                    text-xs 
                    placeholder:text-[#808080]
                    outline-none
                  "
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#F0F0F0] mb-2">Rôle</label>
                <select
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  className="
                    w-full
                    px-4 py-2 
                    bg-[#1A1A1A] 
                    border border-[#8B0000]/30 
                    text-[#F0F0F0] 
                    text-xs 
                    outline-none
                    cursor-pointer
                  "
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Modérateur">Modérateur</option>
                  <option value="Contributeur">Contributeur</option>
                  <option value="Membre">Membre</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#F0F0F0] mb-2">Statut</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="
                    w-full
                    px-4 py-2 
                    bg-[#1A1A1A] 
                    border border-[#8B0000]/30 
                    text-[#F0F0F0] 
                    text-xs 
                    outline-none
                    cursor-pointer
                  "
                >
                  <option value="active">Actif</option>
                  <option value="pending">En attente</option>
                  <option value="suspended">Suspendu</option>
                  <option value="banned">Banni</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#F0F0F0]">Bio</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="
                    w-full pl-4 pr-4 py-2 
                    bg-[#1A1A1A] 
                    border border-[#8B0000]/30 
                    focus:border-[#8B0000] 
                    text-[#F0F0F0] 
                    text-xs 
                    placeholder:text-[#808080]
                    outline-none
                  "
                />
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="secondary" 
                  onClick={() => setEditingUser(null)}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button 
                  variant="primary" 
                  type="submit"
                  className="flex-1 bg-[#8B0000] hover:bg-[#6B0000]"
                >
                  Enregistrer
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View User Modal */}
      {viewingUser && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setViewingUser(null)}
        >
          <div 
            className="bg-[#0A0A0A] border-2 border-[#8B0000] p-8 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#8B0000]/30">
              <div className="w-16 h-16 bg-[#8B0000] flex items-center justify-center">
                {viewingUser.role === 'Super Admin' && <Crown size={24} className="text-[#F0F0F0]" />}
                {viewingUser.role === 'Admin' && <Shield size={24} className="text-[#F0F0F0]" />}
                {(viewingUser.role === 'Modérateur' || viewingUser.role === 'Contributeur') && <UserCheck size={24} className="text-[#F0F0F0]" />}
                {viewingUser.role === 'Membre' && <UserIcon size={24} className="text-[#F0F0F0]" />}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#F0F0F0] uppercase tracking-wide">
                  {viewingUser.username}
                </h3>
                <p className="font-mono text-xs text-[#808080]">{viewingUser.email}</p>
              </div>
            </div>

            {/* User Info */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-mono text-[#808080] uppercase mb-1">Rôle</label>
                <p className="text-[#F0F0F0] font-medium">{viewingUser.role}</p>
              </div>
              <div>
                <label className="block text-xs font-mono text-[#808080] uppercase mb-1">Statut</label>
                <p className="text-[#F0F0F0] font-medium capitalize">{viewingUser.status}</p>
              </div>
              <div>
                <label className="block text-xs font-mono text-[#808080] uppercase mb-1">Date d'inscription</label>
                <p className="text-[#F0F0F0] font-medium">
                  {new Date(viewingUser.joinDate).toLocaleDateString('fr-FR', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div>
                <label className="block text-xs font-mono text-[#808080] uppercase mb-1">Dernière connexion</label>
                <p className="text-[#F0F0F0] font-medium">{viewingUser.lastLogin}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="border-t border-[#8B0000]/30 pt-6 mb-6">
              <h4 className="text-sm font-mono text-[#808080] uppercase mb-4">Statistiques</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#1A1A1A] border border-[#8B0000]/30 p-4 text-center">
                  <p className="font-mono text-2xl font-bold text-[#F0F0F0] mb-1">
                    {viewingUser.articlesCount}
                  </p>
                  <p className="text-xs text-[#808080] uppercase">Articles</p>
                </div>
                <div className="bg-[#1A1A1A] border border-[#8B0000]/30 p-4 text-center">
                  <p className="font-mono text-2xl font-bold text-[#F0F0F0] mb-1">
                    {viewingUser.commentsCount}
                  </p>
                  <p className="text-xs text-[#808080] uppercase">Commentaires</p>
                </div>
                <div className="bg-[#1A1A1A] border border-[#8B0000]/30 p-4 text-center">
                  <p className={`font-mono text-2xl font-bold mb-1 ${viewingUser.reportsCount > 0 ? 'text-[#8B0000]' : 'text-[#F0F0F0]'}`}>
                    {viewingUser.reportsCount}
                  </p>
                  <p className="text-xs text-[#808080] uppercase">Signalements</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button 
                variant="secondary" 
                onClick={() => {
                  setViewingUser(null);
                  setEditingUser(viewingUser);
                }}
                className="flex-1"
              >
                <Edit size={16} />
                Éditer
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => setViewingUser(null)}
                className="flex-1"
              >
                Fermer
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Role Modal */}
      {showBulkRoleModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setShowBulkRoleModal(false)}
        >
          <div 
            className="bg-[#0A0A0A] border-2 border-[#8B0000] p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-[#F0F0F0] mb-4 uppercase tracking-wide">
              Changer le rôle
            </h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  console.log('[Bulk Role] Selected users:', selectedUsers.map(u => ({ id: u.id, username: u.username })));
                  const backendData = convertToBackendFormat({ role: bulkRole });
                  console.log('[Bulk Role] Backend data:', backendData);
                  
                  const updatedUsers = await Promise.all(selectedUsers.map(async user => {
                    console.log(`[Bulk Role] Updating user ${user.id} (${user.username})`);
                    return await usersApi.update(String(user.id), backendData);
                  }));
                  
                  console.log('[Bulk Role] Successfully updated all users');
                  
                  // Update local state with new role
                  setUsers(users.map(u => {
                    const isSelected = selectedUsers.some(selected => selected.id === u.id);
                    return isSelected ? { ...u, role: bulkRole as any } : u;
                  }));
                  setSelectedUsers([]);
                  setShowBulkRoleModal(false);
                } catch (err) {
                  console.error('Failed to update users:', err);
                  alert('Erreur lors de la mise à jour');
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#F0F0F0] mb-2">Rôle</label>
                <select
                  value={bulkRole}
                  onChange={(e) => setBulkRole(e.target.value)}
                  className="
                    w-full
                    px-4 py-2 
                    bg-[#1A1A1A] 
                    border border-[#8B0000]/30 
                    text-[#F0F0F0] 
                    text-xs 
                    outline-none
                    cursor-pointer
                  "
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Modérateur">Modérateur</option>
                  <option value="Contributeur">Contributeur</option>
                  <option value="Membre">Membre</option>
                </select>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="secondary" 
                  onClick={() => setShowBulkRoleModal(false)}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button 
                  variant="primary" 
                  type="submit"
                  className="flex-1 bg-[#8B0000] hover:bg-[#6B0000]"
                >
                  Enregistrer
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Suspend Modal */}
      {showBulkSuspendModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setShowBulkSuspendModal(false)}
        >
          <div 
            className="bg-[#0A0A0A] border-2 border-[#8B0000] p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-[#F0F0F0] mb-4 uppercase tracking-wide">
              Confirmer la suspension
            </h3>
            <p className="text-[#808080] mb-6">
              Êtes-vous sûr de vouloir suspendre {selectedUsers.length} utilisateur{selectedUsers.length > 1 ? 's' : ''} ?
              Cette action est irréversible.
            </p>
            <div className="flex gap-3">
              <Button 
                variant="secondary" 
                onClick={() => setShowBulkSuspendModal(false)}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button 
                variant="primary" 
                onClick={async () => {
                  try {
                    const backendData = convertToBackendFormat({ status: 'suspended' });
                    await Promise.all(selectedUsers.map(user => 
                      usersApi.update(String(user.id), backendData)
                    ));
                    
                    // Update local state with new status
                    setUsers(users.map(u => {
                      const isSelected = selectedUsers.some(selected => selected.id === u.id);
                      return isSelected ? { ...u, status: 'suspended' } : u;
                    }));
                    setSelectedUsers([]);
                    setShowBulkSuspendModal(false);
                  } catch (err) {
                    console.error('Failed to suspend users:', err);
                    alert('Erreur lors de la suspension');
                  }
                }}
                className="flex-1 bg-[#8B0000] hover:bg-[#6B0000]"
              >
                Suspendre
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Modal */}
      {showBulkDeleteModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setShowBulkDeleteModal(false)}
        >
          <div 
            className="bg-[#0A0A0A] border-2 border-[#8B0000] p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-[#F0F0F0] mb-4 uppercase tracking-wide">
              Confirmer la suppression
            </h3>
            <p className="text-[#808080] mb-6">
              Êtes-vous sûr de vouloir supprimer {selectedUsers.length} utilisateur{selectedUsers.length > 1 ? 's' : ''} ?
              Cette action est irréversible.
            </p>
            <div className="flex gap-3">
              <Button 
                variant="secondary" 
                onClick={() => setShowBulkDeleteModal(false)}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button 
                variant="primary" 
                onClick={async () => {
                  try {
                    const idsToDelete = selectedUsers.map(u => u.id);
                    await Promise.all(selectedUsers.map(user => 
                      usersApi.delete(String(user.id))
                    ));
                    setUsers(users.filter(u => !idsToDelete.includes(u.id)));
                    setSelectedUsers([]);
                    setShowBulkDeleteModal(false);
                  } catch (err) {
                    console.error('Failed to delete users:', err);
                    alert('Erreur lors de la suppression');
                  }
                }}
                className="flex-1 bg-[#8B0000] hover:bg-[#6B0000]"
              >
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setShowCreateModal(false)}
        >
          <div 
            className="bg-[#0A0A0A] border-2 border-[#8B0000] p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-[#F0F0F0] mb-4 uppercase tracking-wide">
              Créer un utilisateur
            </h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const backendData = convertToBackendFormat(createForm);
                  await usersApi.create(backendData);
                  setUsers([...users, {
                    id: Math.random() * 1000000, // Placeholder ID
                    username: createForm.username,
                    email: createForm.email,
                    role: createForm.role as any,
                    status: createForm.status as any,
                    joinDate: new Date().toISOString().split('T')[0],
                    lastLogin: 'Jamais',
                    articlesCount: 0,
                    commentsCount: 0,
                    reportsCount: 0
                  }]);
                  setShowCreateModal(false);
                } catch (err) {
                  console.error('Failed to create user:', err);
                  alert('Erreur lors de la création');
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#F0F0F0]">Nom d'utilisateur</label>
                <input
                  type="text"
                  value={createForm.username}
                  onChange={(e) => setCreateForm({ ...createForm, username: e.target.value })}
                  className="
                    w-full pl-4 pr-4 py-2 
                    bg-[#1A1A1A] 
                    border border-[#8B0000]/30 
                    focus:border-[#8B0000] 
                    text-[#F0F0F0] 
                    text-xs 
                    placeholder:text-[#808080]
                    outline-none
                  "
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#F0F0F0]">Email</label>
                <input
                  type="email"
                  value={createForm.email}
                  onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                  className="
                    w-full pl-4 pr-4 py-2 
                    bg-[#1A1A1A] 
                    border border-[#8B0000]/30 
                    focus:border-[#8B0000] 
                    text-[#F0F0F0] 
                    text-xs 
                    placeholder:text-[#808080]
                    outline-none
                  "
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#F0F0F0]">Mot de passe</label>
                <input
                  type="password"
                  value={createForm.password}
                  onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                  className="
                    w-full pl-4 pr-4 py-2 
                    bg-[#1A1A1A] 
                    border border-[#8B0000]/30 
                    focus:border-[#8B0000] 
                    text-[#F0F0F0] 
                    text-xs 
                    placeholder:text-[#808080]
                    outline-none
                  "
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#F0F0F0] mb-2">Rôle</label>
                <select
                  value={createForm.role}
                  onChange={(e) => setCreateForm({ ...createForm, role: e.target.value })}
                  className="
                    w-full
                    px-4 py-2 
                    bg-[#1A1A1A] 
                    border border-[#8B0000]/30 
                    text-[#F0F0F0] 
                    text-xs 
                    outline-none
                    cursor-pointer
                  "
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Modérateur">Modérateur</option>
                  <option value="Contributeur">Contributeur</option>
                  <option value="Membre">Membre</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#F0F0F0] mb-2">Statut</label>
                <select
                  value={createForm.status}
                  onChange={(e) => setCreateForm({ ...createForm, status: e.target.value })}
                  className="
                    w-full
                    px-4 py-2 
                    bg-[#1A1A1A] 
                    border border-[#8B0000]/30 
                    text-[#F0F0F0] 
                    text-xs 
                    outline-none
                    cursor-pointer
                  "
                >
                  <option value="active">Actif</option>
                  <option value="pending">En attente</option>
                  <option value="suspended">Suspendu</option>
                  <option value="banned">Banni</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#F0F0F0]">Bio</label>
                <textarea
                  value={createForm.bio}
                  onChange={(e) => setCreateForm({ ...createForm, bio: e.target.value })}
                  className="
                    w-full pl-4 pr-4 py-2 
                    bg-[#1A1A1A] 
                    border border-[#8B0000]/30 
                    focus:border-[#8B0000] 
                    text-[#F0F0F0] 
                    text-xs 
                    placeholder:text-[#808080]
                    outline-none
                  "
                />
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="secondary" 
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button 
                  variant="primary" 
                  type="submit"
                  className="flex-1 bg-[#8B0000] hover:bg-[#6B0000]"
                >
                  Créer
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}