import { useState, useEffect } from 'react';
import { AdminSidebar } from '@/app/components/Admin/AdminSidebar';
import { AdminHeader } from '@/app/components/Admin/AdminHeader';
import { AdminDataTable, Column, Action } from '@/app/components/Admin/AdminDataTable';
import { AdminStatsCard } from '@/app/components/Admin/AdminStatsCard';
import { AdminTabs, TabPanel } from '@/app/components/Admin/AdminTabs';
import { Button } from '@/app/components/Button';
import { CategoryFormModal, DeleteConfirmModal } from '@/app/components/Admin/CategoryTagModals';
import { articlesApi, categoriesApi, tagsApi } from '@/app/utils/api';
import { 
  FileText, 
  FilePlus, 
  Eye, 
  Edit, 
  Trash2, 
  Search,
  CheckCircle,
  Clock,
  XCircle,
  Folder,
  Tag as TagIcon
} from 'lucide-react';

// Types
interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
  isActive: boolean;
  articleCount: number;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
  isActive: boolean;
  articleCount: number;
}

interface Article {
  id: number;
  title: string;
  author: string;
  category: string;
  status: 'published' | 'draft' | 'pending';
  views: number;
  publishDate: string;
  tags?: string[];
}

export function AdminArticlesPage() {
  const [activeTab, setActiveTab] = useState('articles');
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Modals - Categories
  const [deleteConfirmCategory, setDeleteConfirmCategory] = useState<Category | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    description: '',
    color: '#8B0000',
    isActive: true
  });
  
  // Modals - Tags
  const [deleteConfirmTag, setDeleteConfirmTag] = useState<Tag | null>(null);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [showCreateTag, setShowCreateTag] = useState(false);
  const [tagForm, setTagForm] = useState({
    name: '',
    slug: '',
    description: '',
    color: '#808080',
    isActive: true
  });
  
  useEffect(() => {
    loadAllData();
  }, []);
  
  // Initialize forms when editing
  useEffect(() => {
    if (editingCategory) {
      setCategoryForm({
        name: editingCategory.name,
        slug: editingCategory.slug,
        description: editingCategory.description || '',
        color: editingCategory.color,
        isActive: editingCategory.isActive
      });
    }
  }, [editingCategory]);
  
  useEffect(() => {
    if (editingTag) {
      setTagForm({
        name: editingTag.name,
        slug: editingTag.slug,
        description: editingTag.description || '',
        color: editingTag.color,
        isActive: editingTag.isActive
      });
    }
  }, [editingTag]);
  
  async function loadAllData() {
    try {
      const [articlesData, categoriesData, tagsData] = await Promise.all([
        articlesApi.getAll(),
        categoriesApi.getAll(),
        tagsApi.getAll()
      ]);
      
      const mappedArticles = articlesData.map((article: any) => ({
        id: article.id,
        title: article.title,
        author: 'Admin',
        category: article.category,
        status: article.isPublished ? 'published' : 'draft',
        views: article.viewCount || 0,
        publishDate: article.publishedAt ? new Date(article.publishedAt).toISOString().split('T')[0] : '',
        tags: article.tags || []
      }));
      
      setArticles(mappedArticles);
      setCategories(categoriesData);
      setTags(tagsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  }
  
  // CATEGORY CRUD
  async function handleCreateCategory() {
    try {
      await categoriesApi.create(categoryForm);
      await loadAllData();
      setShowCreateCategory(false);
      setCategoryForm({ name: '', slug: '', description: '', color: '#8B0000', isActive: true });
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  }
  
  async function handleUpdateCategory() {
    if (!editingCategory) return;
    try {
      await categoriesApi.update(editingCategory.id, categoryForm);
      await loadAllData();
      setEditingCategory(null);
      setCategoryForm({ name: '', slug: '', description: '', color: '#8B0000', isActive: true });
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  }
  
  async function handleDeleteCategory() {
    if (!deleteConfirmCategory) return;
    try {
      await categoriesApi.delete(deleteConfirmCategory.id);
      await loadAllData();
      setDeleteConfirmCategory(null);
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  }
  
  // TAG CRUD
  async function handleCreateTag() {
    try {
      await tagsApi.create(tagForm);
      await loadAllData();
      setShowCreateTag(false);
      setTagForm({ name: '', slug: '', description: '', color: '#808080', isActive: true });
    } catch (error) {
      console.error('Failed to create tag:', error);
    }
  }
  
  async function handleUpdateTag() {
    if (!editingTag) return;
    try {
      await tagsApi.update(editingTag.id, tagForm);
      await loadAllData();
      setEditingTag(null);
      setTagForm({ name: '', slug: '', description: '', color: '#808080', isActive: true });
    } catch (error) {
      console.error('Failed to update tag:', error);
    }
  }
  
  async function handleDeleteTag() {
    if (!deleteConfirmTag) return;
    try {
      await tagsApi.delete(deleteConfirmTag.id);
      await loadAllData();
      setDeleteConfirmTag(null);
    } catch (error) {
      console.error('Failed to delete tag:', error);
    }
  }
  
  const getCategoryBySlug = (slug: string): Category | undefined => {
    return categories.find(cat => cat.slug === slug);
  };
  
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const stats = {
    articles: {
      total: articles.length,
      published: articles.filter(a => a.status === 'published').length,
      draft: articles.filter(a => a.status === 'draft').length,
    },
    categories: {
      total: categories.length,
      active: categories.filter(c => c.isActive).length,
    },
    tags: {
      total: tags.length,
      active: tags.filter(t => t.isActive).length,
    }
  };
  
  const articleColumns: Column<Article>[] = [
    {
      key: 'title',
      label: 'Article',
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="text-[#F0F0F0] font-medium mb-1">{value}</p>
          <p className="font-mono text-xs text-[#808080]">Par {row.author}</p>
        </div>
      ),
      width: '35%'
    },
    {
      key: 'category',
      label: 'Catégorie',
      sortable: true,
      render: (value) => {
        const category = getCategoryBySlug(value);
        const categoryColor = category?.color || '#8B0000';
        const categoryName = category?.name || value;
        return (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border border-[#8B0000]/50" style={{ backgroundColor: categoryColor }} />
            <span className="px-2 py-1 text-xs font-mono uppercase border" style={{ backgroundColor: `${categoryColor}20`, borderColor: `${categoryColor}40`, color: categoryColor }}>
              {categoryName}
            </span>
          </div>
        );
      },
      width: '20%'
    },
    {
      key: 'status',
      label: 'Statut',
      sortable: true,
      render: (value) => {
        const statusConfig = {
          published: { color: '#F0F0F0', label: 'Publié', icon: CheckCircle },
          draft: { color: '#808080', label: 'Brouillon', icon: Edit },
          pending: { color: '#8B0000', label: 'En attente', icon: Clock }
        };
        const config = statusConfig[value as keyof typeof statusConfig];
        const Icon = config.icon;
        return (
          <div className="flex items-center gap-2">
            <Icon size={14} style={{ color: config.color }} />
            <span className="px-2 py-1 text-xs font-mono uppercase border" style={{ backgroundColor: `${config.color}20`, borderColor: `${config.color}40`, color: config.color }}>
              {config.label}
            </span>
          </div>
        );
      },
      width: '20%'
    },
    {
      key: 'views',
      label: 'Vues',
      sortable: true,
      render: (value) => <span className="font-mono text-sm text-[#F0F0F0] font-bold">{value.toLocaleString('fr-FR')}</span>,
      width: '12%'
    },
    {
      key: 'publishDate',
      label: 'Publication',
      sortable: true,
      render: (value) => <span className="font-mono text-xs text-[#8B0000]">{value ? new Date(value).toLocaleDateString('fr-FR') : '-'}</span>,
      width: '13%'
    }
  ];
  
  const categoryColumns: Column<Category>[] = [
    {
      key: 'name',
      label: 'Catégorie',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 border border-[#8B0000]/50" style={{ backgroundColor: row.color }} />
          <div>
            <p className="text-[#F0F0F0] font-medium mb-1">{value}</p>
            <p className="font-mono text-xs text-[#808080]">{row.slug}</p>
          </div>
        </div>
      ),
      width: '30%'
    },
    {
      key: 'description',
      label: 'Description',
      sortable: false,
      render: (value) => <span className="text-[#808080] text-sm line-clamp-2">{value || '—'}</span>,
      width: '40%'
    },
    {
      key: 'articleCount',
      label: 'Articles',
      sortable: true,
      render: (value) => <span className="font-mono text-sm text-[#F0F0F0] font-bold">{value}</span>,
      width: '15%'
    },
    {
      key: 'isActive',
      label: 'Statut',
      sortable: true,
      render: (value) => {
        const Icon = value ? CheckCircle : XCircle;
        const color = value ? '#F0F0F0' : '#808080';
        const label = value ? 'Actif' : 'Inactif';
        return (
          <div className="flex items-center gap-2">
            <Icon size={14} style={{ color }} />
            <span className="px-2 py-1 text-xs font-mono uppercase border" style={{ backgroundColor: `${color}20`, borderColor: `${color}40`, color }}>
              {label}
            </span>
          </div>
        );
      },
      width: '15%'
    }
  ];
  
  const tagColumns: Column<Tag>[] = categoryColumns;
  
  const articleActions: Action<Article>[] = [
    { icon: Eye, label: 'Voir', onClick: () => {}, variant: 'default' },
    { icon: Edit, label: 'Éditer', onClick: () => {}, variant: 'default' },
    { icon: Trash2, label: 'Supprimer', onClick: () => {}, variant: 'danger' }
  ];
  
  const categoryActions: Action<Category>[] = [
    { icon: Edit, label: 'Éditer', onClick: (cat) => setEditingCategory(cat), variant: 'default' },
    { icon: Trash2, label: 'Supprimer', onClick: (cat) => setDeleteConfirmCategory(cat), variant: 'danger' }
  ];
  
  const tagActions: Action<Tag>[] = [
    { icon: Edit, label: 'Éditer', onClick: (tag) => setEditingTag(tag), variant: 'default' },
    { icon: Trash2, label: 'Supprimer', onClick: (tag) => setDeleteConfirmTag(tag), variant: 'danger' }
  ];
  
  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col">
        <AdminHeader 
          title="Gestion des Articles"
          breadcrumbs={[{ label: 'Gestion' }, { label: 'Articles' }]}
        />
        
        <AdminTabs
          tabs={[
            { id: 'articles', label: 'Articles', icon: FileText, count: stats.articles.total },
            { id: 'categories', label: 'Catégories', icon: Folder, count: stats.categories.total },
            { id: 'tags', label: 'Tags', icon: TagIcon, count: stats.tags.total }
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <main className="flex-1 p-6 space-y-6">
          <TabPanel id="articles" activeTab={activeTab}>
            <section className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AdminStatsCard icon={FileText} label="Total Articles" value={stats.articles.total} color="#8B0000" />
                <AdminStatsCard icon={CheckCircle} label="Publiés" value={stats.articles.published} color="#F0F0F0" />
                <AdminStatsCard icon={Edit} label="Brouillons" value={stats.articles.draft} color="#808080" />
              </div>
            </section>
            
            <section className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#808080]" />
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Rechercher..." className="w-full pl-9 pr-4 py-2 bg-[#1A1A1A] border border-[#8B0000]/30 focus:border-[#8B0000] text-[#F0F0F0] text-xs placeholder:text-[#808080] outline-none" />
                  </div>
                  <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-4 py-2 bg-[#1A1A1A] border border-[#8B0000]/30 text-[#F0F0F0] text-xs outline-none cursor-pointer">
                    <option value="all">Toutes catégories</option>
                    {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
                  </select>
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 bg-[#1A1A1A] border border-[#8B0000]/30 text-[#F0F0F0] text-xs outline-none cursor-pointer">
                    <option value="all">Tous statuts</option>
                    <option value="published">Publié</option>
                    <option value="draft">Brouillon</option>
                  </select>
                </div>
                <Button variant="primary" size="sm"><FilePlus size={16} />Nouvel Article</Button>
              </div>
            </section>
            
            <section>
              <AdminDataTable data={filteredArticles} columns={articleColumns} actions={articleActions} selectable={false} emptyMessage="Aucun article trouvé" />
            </section>
          </TabPanel>
          
          <TabPanel id="categories" activeTab={activeTab}>
            <section className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AdminStatsCard icon={Folder} label="Total Catégories" value={stats.categories.total} color="#8B0000" />
                <AdminStatsCard icon={CheckCircle} label="Actives" value={stats.categories.active} color="#F0F0F0" />
              </div>
            </section>
            
            <section className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#808080]" />
                  <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Rechercher une catégorie..." className="w-full pl-9 pr-4 py-2 bg-[#1A1A1A] border border-[#8B0000]/30 focus:border-[#8B0000] text-[#F0F0F0] text-xs placeholder:text-[#808080] outline-none" />
                </div>
                <Button variant="primary" size="sm" onClick={() => setShowCreateCategory(true)}><FilePlus size={16} />Nouvelle Catégorie</Button>
              </div>
            </section>
            
            <section>
              <AdminDataTable data={filteredCategories} columns={categoryColumns} actions={categoryActions} selectable={false} emptyMessage="Aucune catégorie trouvée" />
            </section>
          </TabPanel>
          
          <TabPanel id="tags" activeTab={activeTab}>
            <section className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AdminStatsCard icon={TagIcon} label="Total Tags" value={stats.tags.total} color="#8B0000" />
                <AdminStatsCard icon={CheckCircle} label="Actifs" value={stats.tags.active} color="#F0F0F0" />
              </div>
            </section>
            
            <section className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#808080]" />
                  <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Rechercher un tag..." className="w-full pl-9 pr-4 py-2 bg-[#1A1A1A] border border-[#8B0000]/30 focus:border-[#8B0000] text-[#F0F0F0] text-xs placeholder:text-[#808080] outline-none" />
                </div>
                <Button variant="primary" size="sm" onClick={() => setShowCreateTag(true)}><FilePlus size={16} />Nouveau Tag</Button>
              </div>
            </section>
            
            <section>
              <AdminDataTable data={filteredTags} columns={tagColumns} actions={tagActions} selectable={false} emptyMessage="Aucun tag trouvé" />
            </section>
          </TabPanel>
        </main>
      </div>
      
      {/* Modales pour Catégories */}
      <CategoryFormModal
        isOpen={showCreateCategory}
        mode="create"
        form={categoryForm}
        onFormChange={setCategoryForm}
        onSubmit={handleCreateCategory}
        onClose={() => {
          setShowCreateCategory(false);
          setCategoryForm({ name: '', slug: '', description: '', color: '#8B0000', isActive: true });
        }}
        title="Nouvelle Catégorie"
      />
      
      <CategoryFormModal
        isOpen={!!editingCategory}
        mode="edit"
        form={categoryForm}
        onFormChange={setCategoryForm}
        onSubmit={handleUpdateCategory}
        onClose={() => {
          setEditingCategory(null);
          setCategoryForm({ name: '', slug: '', description: '', color: '#8B0000', isActive: true });
        }}
        title="Éditer la Catégorie"
      />
      
      <DeleteConfirmModal
        isOpen={!!deleteConfirmCategory}
        item={deleteConfirmCategory}
        itemType="catégorie"
        onConfirm={handleDeleteCategory}
        onClose={() => setDeleteConfirmCategory(null)}
      />
      
      {/* Modales pour Tags */}
      <CategoryFormModal
        isOpen={showCreateTag}
        mode="create"
        form={tagForm}
        onFormChange={setTagForm}
        onSubmit={handleCreateTag}
        onClose={() => {
          setShowCreateTag(false);
          setTagForm({ name: '', slug: '', description: '', color: '#808080', isActive: true });
        }}
        title="Nouveau Tag"
        itemType="tag"
      />
      
      <CategoryFormModal
        isOpen={!!editingTag}
        mode="edit"
        form={tagForm}
        onFormChange={setTagForm}
        onSubmit={handleUpdateTag}
        onClose={() => {
          setEditingTag(null);
          setTagForm({ name: '', slug: '', description: '', color: '#808080', isActive: true });
        }}
        title="Éditer le Tag"
        itemType="tag"
      />
      
      <DeleteConfirmModal
        isOpen={!!deleteConfirmTag}
        item={deleteConfirmTag}
        itemType="tag"
        onConfirm={handleDeleteTag}
        onClose={() => setDeleteConfirmTag(null)}
      />
    </div>
  );
}