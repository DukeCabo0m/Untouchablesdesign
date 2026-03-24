import { useState, useEffect } from 'react';
import { AdminSidebar } from '@/app/components/Admin/AdminSidebar';
import { AdminHeader } from '@/app/components/Admin/AdminHeader';
import { AdminDataTable, Column, Action } from '@/app/components/Admin/AdminDataTable';
import { AdminStatsCard } from '@/app/components/Admin/AdminStatsCard';
import { MessageSquare, CheckCircle, Clock, Trash2, Eye, XCircle, Search } from 'lucide-react';
import { commentsApi, usersApi, articlesApi } from '@/app/utils/api';

interface Comment {
  id: string;
  userId: string;
  username?: string;
  content: string;
  entityType: string;
  entityId: string;
  entityTitle?: string;
  createdAt: string;
  isApproved: boolean;
}

export function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Load comments, users, and articles
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        console.log('[AdminCommentsPage] Loading all comments...');
        
        const [commentsData, users, articles] = await Promise.all([
          commentsApi.getAll(),
          usersApi.getAll().catch(() => []),
          articlesApi.getAll().catch(() => [])
        ]);

        console.log('[AdminCommentsPage] Loaded:', {
          comments: commentsData.length,
          users: users.length,
          articles: articles.length
        });

        // Enrich comments with user and entity data
        const enrichedComments = commentsData.map((comment: any) => {
          const user = users.find((u: any) => u.id === comment.userId);
          let entityTitle = 'Unknown';
          
          if (comment.entityType === 'article') {
            const article = articles.find((a: any) => a.id === comment.entityId);
            entityTitle = article?.title || 'Article supprimé';
          }
          
          return {
            ...comment,
            username: user?.username || 'Anonymous',
            entityTitle
          };
        });

        // Sort by date descending (newest first)
        enrichedComments.sort((a: any, b: any) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setComments(enrichedComments);
      } catch (error) {
        console.error('[AdminCommentsPage] Failed to load comments:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter comments based on search and status
  const filteredComments = comments.filter(comment => {
    // Status filter
    if (statusFilter === 'approved' && !comment.isApproved) return false;
    if (statusFilter === 'pending' && comment.isApproved) return false;
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        comment.username?.toLowerCase().includes(query) ||
        comment.content.toLowerCase().includes(query) ||
        comment.entityTitle?.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const pendingCount = comments.filter(c => !c.isApproved).length;
  const approvedCount = comments.filter(c => c.isApproved).length;

  // Handle approve
  const handleApprove = async (comment: Comment) => {
    try {
      console.log('[AdminCommentsPage] Approving comment:', comment.id);
      await commentsApi.approve(comment.id);
      
      // Update local state
      setComments(prev => prev.map(c => 
        c.id === comment.id ? { ...c, isApproved: true } : c
      ));
      
      console.log('[AdminCommentsPage] Comment approved successfully');
    } catch (error) {
      console.error('[AdminCommentsPage] Failed to approve comment:', error);
      alert('Erreur lors de l\'approbation du commentaire');
    }
  };

  // Handle reject
  const handleReject = async (comment: Comment) => {
    try {
      console.log('[AdminCommentsPage] Rejecting comment:', comment.id);
      await commentsApi.reject(comment.id);
      
      // Update local state
      setComments(prev => prev.map(c => 
        c.id === comment.id ? { ...c, isApproved: false } : c
      ));
      
      console.log('[AdminCommentsPage] Comment rejected successfully');
    } catch (error) {
      console.error('[AdminCommentsPage] Failed to reject comment:', error);
      alert('Erreur lors du rejet du commentaire');
    }
  };

  // Handle delete
  const handleDelete = async (comment: Comment) => {
    if (!confirm('Voulez-vous vraiment supprimer ce commentaire ?')) return;
    
    try {
      console.log('[AdminCommentsPage] Deleting comment:', comment.id);
      await commentsApi.delete(comment.id);
      
      // Remove from local state
      setComments(prev => prev.filter(c => c.id !== comment.id));
      
      console.log('[AdminCommentsPage] Comment deleted successfully');
    } catch (error) {
      console.error('[AdminCommentsPage] Failed to delete comment:', error);
      alert('Erreur lors de la suppression du commentaire');
    }
  };

  const columns: Column<Comment>[] = [
    { 
      key: 'username', 
      label: 'Auteur', 
      sortable: true, 
      render: (v) => <span className="text-[#F0F0F0] font-medium">{v || 'Anonymous'}</span>, 
      width: '12%' 
    },
    { 
      key: 'content', 
      label: 'Commentaire', 
      sortable: false, 
      render: (v) => (
        <span className="text-[#808080] text-sm block truncate max-w-md" title={v}>
          {v.length > 100 ? v.substring(0, 100) + '...' : v}
        </span>
      ), 
      width: '35%' 
    },
    { 
      key: 'entityTitle', 
      label: 'Article', 
      sortable: true, 
      render: (v) => (
        <span className="text-[#8B0000] text-sm block truncate" title={v}>
          {v}
        </span>
      ), 
      width: '20%' 
    },
    { 
      key: 'createdAt', 
      label: 'Date', 
      sortable: true, 
      render: (v) => (
        <span className="font-mono text-xs text-[#F0F0F0]">
          {new Date(v).toLocaleDateString('fr-FR', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      ), 
      width: '15%' 
    },
    {
      key: 'isApproved', 
      label: 'Statut', 
      sortable: true,
      render: (v) => {
        const isApproved = v as boolean;
        return (
          <span 
            className="px-2 py-1 text-xs font-mono uppercase border" 
            style={{ 
              backgroundColor: isApproved ? '#F0F0F020' : '#80808020', 
              borderColor: isApproved ? '#F0F0F040' : '#80808040', 
              color: isApproved ? '#F0F0F0' : '#808080' 
            }}
          >
            {isApproved ? 'Approuvé' : 'En attente'}
          </span>
        );
      },
      width: '10%'
    }
  ];

  const actions: Action<Comment>[] = [
    { 
      icon: CheckCircle, 
      label: 'Approuver', 
      onClick: handleApprove, 
      variant: 'default', 
      show: (c) => !c.isApproved 
    },
    { 
      icon: XCircle, 
      label: 'Rejeter', 
      onClick: handleReject, 
      variant: 'default', 
      show: (c) => c.isApproved 
    },
    { 
      icon: Trash2, 
      label: 'Supprimer', 
      onClick: handleDelete, 
      variant: 'danger' 
    }
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-[#0A0A0A]">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-[#8B0000] font-mono text-sm animate-pulse">
            CHARGEMENT DES COMMENTAIRES...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader title="Commentaires" breadcrumbs={[{ label: 'Modération' }, { label: 'Commentaires' }]} />
        <main className="flex-1 p-6 space-y-6">
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AdminStatsCard icon={MessageSquare} label="Total" value={comments.length} color="#8B0000" />
              <AdminStatsCard icon={CheckCircle} label="Approuvés" value={approvedCount} color="#F0F0F0" />
              <AdminStatsCard icon={Clock} label="En attente" value={pendingCount} color="#808080" />
            </div>
          </section>
          
          <section className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
            <div className="flex gap-3">
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#808080]" />
                <input 
                  type="text" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  placeholder="Rechercher par auteur, contenu ou article..." 
                  className="w-full pl-9 pr-4 py-2 bg-[#1A1A1A] border border-[#8B0000]/30 focus:border-[#8B0000] text-[#F0F0F0] text-xs placeholder:text-[#808080] outline-none" 
                />
              </div>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)} 
                className="px-4 py-2 bg-[#1A1A1A] border border-[#8B0000]/30 text-[#F0F0F0] text-xs outline-none cursor-pointer"
              >
                <option value="all">Tous les statuts</option>
                <option value="approved">Approuvés</option>
                <option value="pending">En attente</option>
              </select>
            </div>
          </section>
          
          <section>
            <AdminDataTable 
              data={filteredComments} 
              columns={columns} 
              actions={actions} 
              selectable={false}
              emptyMessage="Aucun commentaire trouvé" 
            />
          </section>
        </main>
      </div>
    </div>
  );
}
