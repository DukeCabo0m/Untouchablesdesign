import { useState } from 'react';
import { AdminSidebar } from '@/app/components/Admin/AdminSidebar';
import { AdminHeader } from '@/app/components/Admin/AdminHeader';
import { Button } from '@/app/components/Button';
import { Settings, Globe, Mail, Shield, Bell, Save } from 'lucide-react';

export function AdminSettingsPage() {
  const [siteName, setSiteName] = useState('Untouchables - Communauté Korn France');
  const [siteUrl, setSiteUrl] = useState('https://untouchables.fr');
  const [adminEmail, setAdminEmail] = useState('admin@untouchables.fr');
  const [registrationOpen, setRegistrationOpen] = useState(true);
  const [moderationEnabled, setModerationEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader title="Configuration" breadcrumbs={[{ label: 'Système' }, { label: 'Configuration' }]} />
        <main className="flex-1 p-6 space-y-6">
          {/* General Settings */}
          <section className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
            <h3 className="text-[#F0F0F0] font-bold text-sm uppercase mb-6 flex items-center gap-2">
              <Globe size={16} className="text-[#8B0000]" />
              Paramètres généraux
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-[#808080] uppercase mb-2">Nom du site</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#8B0000]/30 focus:border-[#8B0000] text-[#F0F0F0] text-sm outline-none"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-[#808080] uppercase mb-2">URL du site</label>
                <input
                  type="text"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#8B0000]/30 focus:border-[#8B0000] text-[#F0F0F0] text-sm outline-none"
                />
              </div>
            </div>
          </section>

          {/* Email Settings */}
          <section className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
            <h3 className="text-[#F0F0F0] font-bold text-sm uppercase mb-6 flex items-center gap-2">
              <Mail size={16} className="text-[#8B0000]" />
              Email
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-[#808080] uppercase mb-2">Email administrateur</label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#8B0000]/30 focus:border-[#8B0000] text-[#F0F0F0] text-sm outline-none"
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-[#1A1A1A] border border-[#8B0000]/20">
                <span className="text-[#F0F0F0] text-sm">Notifications par email</span>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`w-12 h-6 border ${emailNotifications ? 'bg-[#8B0000] border-[#8B0000]' : 'bg-[#1A1A1A] border-[#808080]'}`}
                >
                  <div className={`w-4 h-4 bg-[#F0F0F0] ${emailNotifications ? 'ml-auto' : ''}`} />
                </button>
              </div>
            </div>
          </section>

          {/* Security Settings */}
          <section className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
            <h3 className="text-[#F0F0F0] font-bold text-sm uppercase mb-6 flex items-center gap-2">
              <Shield size={16} className="text-[#8B0000]" />
              Sécurité
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#1A1A1A] border border-[#8B0000]/20">
                <div>
                  <p className="text-[#F0F0F0] text-sm font-medium">Inscriptions ouvertes</p>
                  <p className="font-mono text-xs text-[#808080] mt-1">Autoriser les nouvelles inscriptions</p>
                </div>
                <button
                  onClick={() => setRegistrationOpen(!registrationOpen)}
                  className={`w-12 h-6 border ${registrationOpen ? 'bg-[#8B0000] border-[#8B0000]' : 'bg-[#1A1A1A] border-[#808080]'}`}
                >
                  <div className={`w-4 h-4 bg-[#F0F0F0] ${registrationOpen ? 'ml-auto' : ''}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#1A1A1A] border border-[#8B0000]/20">
                <div>
                  <p className="text-[#F0F0F0] text-sm font-medium">Modération automatique</p>
                  <p className="font-mono text-xs text-[#808080] mt-1">Les nouveaux contenus requièrent une validation</p>
                </div>
                <button
                  onClick={() => setModerationEnabled(!moderationEnabled)}
                  className={`w-12 h-6 border ${moderationEnabled ? 'bg-[#8B0000] border-[#8B0000]' : 'bg-[#1A1A1A] border-[#808080]'}`}
                >
                  <div className={`w-4 h-4 bg-[#F0F0F0] ${moderationEnabled ? 'ml-auto' : ''}`} />
                </button>
              </div>
            </div>
          </section>

          {/* Save Button */}
          <section className="flex justify-end">
            <Button variant="primary" size="md">
              <Save size={16} />
              Enregistrer les modifications
            </Button>
          </section>
        </main>
      </div>
    </div>
  );
}
