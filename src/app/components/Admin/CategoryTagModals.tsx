import { X, Save, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '@/app/components/Button';

interface CategoryTagForm {
  name: string;
  slug: string;
  description: string;
  color: string;
  isActive: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
  isActive: boolean;
  articleCount: number;
}

interface CategoryFormModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit';
  form: CategoryTagForm;
  onFormChange: (form: CategoryTagForm) => void;
  onSubmit: () => void;
  onClose: () => void;
  title: string;
  itemType?: 'catégorie' | 'tag';
}

export function CategoryFormModal({ isOpen, mode, form, onFormChange, onSubmit, onClose, title, itemType = 'catégorie' }: CategoryFormModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="w-full max-w-2xl bg-[#0A0A0A] border border-[#8B0000] shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-[#8B0000]/30">
          <h2 className="text-lg font-bold text-[#8B0000] uppercase tracking-wider">{title}</h2>
          <button onClick={onClose} className="text-[#808080] hover:text-[#F0F0F0] transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-xs font-bold text-[#8B0000] uppercase tracking-wide mb-2">
              Nom*
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => {
                const name = e.target.value;
                const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                onFormChange({ ...form, name, slug });
              }}
              placeholder={`Nom ${itemType === 'tag' ? 'du tag' : 'de la catégorie'}`}
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#8B0000]/30 focus:border-[#8B0000] text-[#F0F0F0] text-sm placeholder:text-[#808080] outline-none"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-[#8B0000] uppercase tracking-wide mb-2">
              Slug*
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => onFormChange({ ...form, slug: e.target.value })}
              placeholder={`slug-${itemType === 'tag' ? 'du-tag' : 'de-la-categorie'}`}
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#8B0000]/30 focus:border-[#8B0000] text-[#F0F0F0] text-sm font-mono placeholder:text-[#808080] outline-none"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-[#8B0000] uppercase tracking-wide mb-2">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => onFormChange({ ...form, description: e.target.value })}
              placeholder={`Description ${itemType === 'tag' ? 'du tag' : 'de la catégorie'}...`}
              rows={4}
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#8B0000]/30 focus:border-[#8B0000] text-[#F0F0F0] text-sm placeholder:text-[#808080] outline-none resize-none"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#8B0000] uppercase tracking-wide mb-2">
                Couleur*
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={form.color}
                  onChange={(e) => onFormChange({ ...form, color: e.target.value })}
                  className="w-16 h-12 border border-[#8B0000]/30 bg-[#1A1A1A] cursor-pointer"
                />
                <input
                  type="text"
                  value={form.color}
                  onChange={(e) => onFormChange({ ...form, color: e.target.value })}
                  placeholder="#8B0000"
                  className="flex-1 px-4 py-3 bg-[#1A1A1A] border border-[#8B0000]/30 focus:border-[#8B0000] text-[#F0F0F0] text-sm font-mono placeholder:text-[#808080] outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-[#8B0000] uppercase tracking-wide mb-2">
                Statut
              </label>
              <label className="flex items-center gap-3 p-3 bg-[#1A1A1A] border border-[#8B0000]/30 cursor-pointer hover:bg-[#1A1A1A]/80">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => onFormChange({ ...form, isActive: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm text-[#F0F0F0]">Actif</span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-3 p-6 border-t border-[#8B0000]/30">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="primary" size="sm" onClick={onSubmit}>
            <Save size={16} />
            {mode === 'create' ? 'Créer' : 'Enregistrer'}
          </Button>
        </div>
      </div>
    </div>
  );
}

interface DeleteConfirmModalProps {
  isOpen: boolean;
  item: Category | null;
  itemType: 'catégorie' | 'tag';
  onConfirm: () => void;
  onClose: () => void;
}

export function DeleteConfirmModal({ isOpen, item, itemType, onConfirm, onClose }: DeleteConfirmModalProps) {
  if (!isOpen || !item) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="w-full max-w-md bg-[#0A0A0A] border border-[#8B0000] shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-[#8B0000]/30">
          <div className="flex items-center gap-3">
            <AlertTriangle size={20} className="text-[#8B0000]" />
            <h2 className="text-lg font-bold text-[#8B0000] uppercase tracking-wider">
              Confirmer la suppression
            </h2>
          </div>
          <button onClick={onClose} className="text-[#808080] hover:text-[#F0F0F0] transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-sm text-[#F0F0F0] mb-4">
            Êtes-vous sûr de vouloir supprimer cette {itemType} ?
          </p>
          <div className="p-4 bg-[#1A1A1A] border border-[#8B0000]/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-4 h-4 border border-[#8B0000]/50" style={{ backgroundColor: item.color }} />
              <p className="text-[#F0F0F0] font-medium">{item.name}</p>
            </div>
            <p className="font-mono text-xs text-[#808080]">{item.slug}</p>
          </div>
          <p className="text-xs text-[#8B0000] mt-4">
            Cette action est irréversible.
          </p>
        </div>
        
        <div className="flex items-center justify-end gap-3 p-6 border-t border-[#8B0000]/30">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="danger" size="sm" onClick={onConfirm}>
            <Trash2 size={16} />
            Supprimer
          </Button>
        </div>
      </div>
    </div>
  );
}