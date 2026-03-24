import { useState } from 'react';
import { AdminSidebar } from '@/app/components/Admin/AdminSidebar';
import { AdminHeader } from '@/app/components/Admin/AdminHeader';
import { AdminStatsCard } from '@/app/components/Admin/AdminStatsCard';
import { Button } from '@/app/components/Button';
import { 
  Image, 
  Video, 
  File, 
  Upload,
  Search,
  Download,
  Trash2,
  Eye,
  HardDrive
} from 'lucide-react';

export function AdminMediaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const mockMedia = [
    { id: 1, name: 'concert-paris-2026.jpg', type: 'image', size: '2.4 MB', date: '2026-03-15' },
    { id: 2, name: 'album-cover-untouchables.png', type: 'image', size: '1.8 MB', date: '2026-03-10' },
    { id: 3, name: 'interview-jonathan.mp4', type: 'video', size: '124 MB', date: '2026-03-08' },
    { id: 4, name: 'live-performance.mp4', type: 'video', size: '456 MB', date: '2026-03-05' },
    { id: 5, name: 'press-release.pdf', type: 'document', size: '0.5 MB', date: '2026-03-01' }
  ];

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminHeader 
          title="Médias"
          breadcrumbs={[{ label: 'Gestion' }, { label: 'Médias' }]}
        />

        <main className="flex-1 p-6 space-y-6">
          {/* Stats */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AdminStatsCard icon={Image} label="Images" value={234} color="#8B0000" />
              <AdminStatsCard icon={Video} label="Vidéos" value={67} color="#F0F0F0" />
              <AdminStatsCard icon={File} label="Documents" value={89} color="#808080" />
              <AdminStatsCard icon={HardDrive} label="Stockage" value="12.4 GB" color="#F0F0F0" />
            </div>
          </section>

          {/* Upload & Filters */}
          <section className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#808080]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher un fichier..."
                    className="w-full pl-9 pr-4 py-2 bg-[#1A1A1A] border border-[#8B0000]/30 focus:border-[#8B0000] text-[#F0F0F0] text-xs placeholder:text-[#808080] outline-none"
                  />
                </div>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-2 bg-[#1A1A1A] border border-[#8B0000]/30 text-[#F0F0F0] text-xs outline-none cursor-pointer"
                >
                  <option value="all">Tous les types</option>
                  <option value="image">Images</option>
                  <option value="video">Vidéos</option>
                  <option value="document">Documents</option>
                </select>
              </div>
              <Button variant="primary" size="sm">
                <Upload size={16} />
                Uploader
              </Button>
            </div>
          </section>

          {/* Media Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockMedia.map((media) => (
              <div key={media.id} className="bg-[#0A0A0A] border border-[#8B0000]/30 p-4">
                <div className="aspect-square bg-[#1A1A1A] flex items-center justify-center mb-4 border border-[#8B0000]/20">
                  {media.type === 'image' && <Image size={48} className="text-[#808080]" />}
                  {media.type === 'video' && <Video size={48} className="text-[#808080]" />}
                  {media.type === 'document' && <File size={48} className="text-[#808080]" />}
                </div>
                <p className="text-[#F0F0F0] font-medium text-sm mb-2 truncate">{media.name}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-[#808080]">{media.size}</span>
                  <span className="font-mono text-xs text-[#8B0000]">{new Date(media.date).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 p-2 border border-[#8B0000]/30 hover:bg-[#8B0000]/10 text-[#F0F0F0]">
                    <Eye size={14} className="mx-auto" />
                  </button>
                  <button className="flex-1 p-2 border border-[#8B0000]/30 hover:bg-[#8B0000]/10 text-[#F0F0F0]">
                    <Download size={14} className="mx-auto" />
                  </button>
                  <button className="flex-1 p-2 border border-[#8B0000]/30 hover:bg-[#8B0000]/10 text-[#8B0000]">
                    <Trash2 size={14} className="mx-auto" />
                  </button>
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
