import { useState } from 'react';
import { AdminSidebar } from '@/app/components/Admin/AdminSidebar';
import { AdminHeader } from '@/app/components/Admin/AdminHeader';
import { Button } from '@/app/components/Button';
import { Database, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export function AdminInitDataPage() {
  const [loading, setLoading] = useState(false);
  const [seedLoading, setSeedLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [seedResult, setSeedResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [seedError, setSeedError] = useState<string | null>(null);
  const [checkResult, setCheckResult] = useState<any>(null);
  const [checkError, setCheckError] = useState<string | null>(null);
  const [checkLoading, setCheckLoading] = useState(false);

  async function handleInitData() {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d462d5d8/init-data`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Erreur lors de l\'initialisation');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }

  async function handleSeedData() {
    setSeedLoading(true);
    setSeedError(null);
    setSeedResult(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d462d5d8/init/seed`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors du seed');
      }

      const data = await response.json();
      setSeedResult(data);
    } catch (err) {
      setSeedError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setSeedLoading(false);
    }
  }

  async function handleCheckData() {
    setCheckLoading(true);
    setCheckError(null);
    setCheckResult(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d462d5d8/init/check`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la vérification');
      }

      const data = await response.json();
      setCheckResult(data);
    } catch (err) {
      setCheckError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setCheckLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col">
        <AdminHeader 
          title="Initialisation des Données"
          breadcrumbs={[{ label: 'Système' }, { label: 'Init Data' }]}
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Info Card */}
            <div className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
              <div className="flex items-start gap-4">
                <Database size={24} className="text-[#8B0000] mt-1" />
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-[#8B0000] uppercase tracking-wider mb-3">
                    Initialisation des Données Système
                  </h2>
                  <p className="text-sm text-[#F0F0F0] mb-4">
                    Cette action va créer l'utilisateur administrateur, les catégories et tags par défaut, et associer tous les articles à l'administrateur.
                  </p>
                  
                  <div className="bg-[#1A1A1A] border border-[#8B0000]/20 p-4 mb-4">
                    <p className="text-xs text-[#8B0000] font-mono uppercase mb-2">Utilisateur Admin :</p>
                    <ul className="text-xs text-[#F0F0F0] font-mono space-y-1">
                      <li>• Username: <span className="text-[#8B0000]">Jon</span></li>
                      <li>• Email: <span className="text-[#8B0000]">jonathan@untouchables.fr</span></li>
                      <li>• Rôle: <span className="text-[#8B0000]">Administrateur</span></li>
                      <li className="text-[#808080] mt-2">✓ Sera assigné comme auteur de tous les articles</li>
                    </ul>
                  </div>
                  
                  <div className="bg-[#1A1A1A] border border-[#8B0000]/20 p-4 mb-4">
                    <p className="text-xs text-[#8B0000] font-mono uppercase mb-2">Catégories à créer (4) :</p>
                    <ul className="text-xs text-[#F0F0F0] font-mono space-y-1">
                      <li>• News (actualités et nouveautés)</li>
                      <li>• Interview (interviews exclusives)</li>
                      <li>• Chronique (chroniques et analyses)</li>
                      <li>• Concerts (tournées et événements)</li>
                    </ul>
                  </div>
                  <div className="bg-[#1A1A1A] border border-[#8B0000]/20 p-4">
                    <p className="text-xs text-[#8B0000] font-mono uppercase mb-2">Tags à créer (12) :</p>
                    <ul className="text-xs text-[#F0F0F0] font-mono space-y-1">
                      <li>• Tournée • Concert • Europe • 2026 • 2027</li>
                      <li>• Interview • Jonathan Davis • Album</li>
                      <li>• Chronique • Issues • Anniversaire • Analyse</li>
                    </ul>
                    <p className="text-xs text-[#808080] font-mono mt-3 italic">
                      ✓ Correspond aux articles existants en base de données
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Card */}
            <div className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={handleInitData}
                disabled={loading}
              >
                <Database size={20} />
                {loading ? 'Initialisation en cours...' : 'Initialiser les Données'}
              </Button>
            </div>

            {/* Result Success */}
            {result && (
              <div className="bg-[#0A0A0A] border border-[#00FF00]/30 p-6">
                <div className="flex items-start gap-4">
                  <CheckCircle size={24} className="text-[#00FF00] mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#00FF00] uppercase tracking-wider mb-3">
                      ✓ Initialisation réussie
                    </h3>
                    <div className="bg-[#1A1A1A] border border-[#00FF00]/20 p-4 mb-4">
                      <p className="text-sm text-[#F0F0F0] font-mono mb-2">
                        {result.message}
                      </p>
                      <p className="text-xs text-[#00FF00] font-mono">
                        Admin: {result.adminUserCreated ? 'Créé' : 'Existant'} - {result.adminUsername} ({result.adminEmail})
                      </p>
                      <p className="text-xs text-[#00FF00] font-mono">
                        Articles mis à jour : {result.articlesUpdated}
                      </p>
                      <p className="text-xs text-[#00FF00] font-mono">
                        Catégories créées : {result.categoriesCreated}
                      </p>
                      <p className="text-xs text-[#00FF00] font-mono">
                        Tags créés : {result.tagsCreated}
                      </p>
                    </div>
                    
                    {/* Categories List */}
                    <div className="bg-[#1A1A1A] border border-[#8B0000]/20 p-4 mb-4">
                      <p className="text-xs text-[#8B0000] font-mono uppercase mb-3">Catégories créées :</p>
                      <div className="space-y-2">
                        {result.categories?.map((cat: any) => (
                          <div key={cat.id} className="flex items-center gap-3 text-xs">
                            <div 
                              className="w-3 h-3 border border-[#8B0000]/50" 
                              style={{ backgroundColor: cat.color }}
                            />
                            <span className="text-[#F0F0F0] font-medium">{cat.name}</span>
                            <span className="text-[#808080] font-mono">({cat.slug})</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tags List */}
                    <div className="bg-[#1A1A1A] border border-[#8B0000]/20 p-4">
                      <p className="text-xs text-[#8B0000] font-mono uppercase mb-3">Tags créés :</p>
                      <div className="space-y-2">
                        {result.tags?.map((tag: any) => (
                          <div key={tag.id} className="flex items-center gap-3 text-xs">
                            <div 
                              className="w-3 h-3 border border-[#8B0000]/50" 
                              style={{ backgroundColor: tag.color }}
                            />
                            <span className="text-[#F0F0F0] font-medium">{tag.name}</span>
                            <span className="text-[#808080] font-mono">({tag.slug})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Result Error */}
            {error && (
              <div className="bg-[#0A0A0A] border border-[#FF0000]/30 p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle size={24} className="text-[#FF0000] mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-[#FF0000] uppercase tracking-wider mb-2">
                      Erreur
                    </h3>
                    <p className="text-sm text-[#F0F0F0] font-mono">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Seed Data Card */}
            <div className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
              <div className="flex items-start gap-4">
                <Sparkles size={24} className="text-[#8B0000] mt-1" />
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-[#8B0000] uppercase tracking-wider mb-3">
                    Seed Complet de la Base de Données
                  </h2>
                  <p className="text-sm text-[#F0F0F0] mb-4">
                    Cette action va ajouter toutes les données de démonstration : utilisateurs, articles, commentaires, albums, concerts, médias, contributions fans et fanzines.
                  </p>
                  
                  <div className="bg-[#1A1A1A] border border-[#8B0000]/20 p-4 mb-4">
                    <p className="text-xs text-[#8B0000] font-mono uppercase mb-2">Données qui seront créées :</p>
                    <ul className="text-xs text-[#F0F0F0] font-mono space-y-1">
                      <li>• Utilisateurs de test (admin + membres)</li>
                      <li>• Articles (news, interviews, chroniques)</li>
                      <li>• Commentaires sur articles</li>
                      <li>• Albums & Singles (discographie complète)</li>
                      <li>• Concerts (passés et à venir)</li>
                      <li>• Médias (YouTube, TikTok, Instagram)</li>
                      <li>• Contributions fans (tattoos, fan-arts, collections)</li>
                      <li>• Fanzines (numéros publiés)</li>
                    </ul>
                  </div>

                  <div className="bg-[#FF0000]/10 border border-[#FF0000]/30 p-4">
                    <p className="text-xs text-[#FF0000] font-mono uppercase mb-2">⚠️ Attention :</p>
                    <p className="text-xs text-[#F0F0F0] font-mono">
                      Cette action peut prendre 10-15 secondes. Lancez l'initialisation des données système d'abord si vous ne l'avez pas encore fait.
                    </p>
                    <p className="text-xs text-[#F0F0F0] font-mono mt-2">
                      Le seed s'exécute en arrière-plan. Utilisez le bouton "Vérifier les Données" ci-dessous pour confirmer que toutes les données ont bien été créées.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Card */}
            <div className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={handleSeedData}
                disabled={seedLoading}
              >
                <Sparkles size={20} />
                {seedLoading ? 'Seed en cours...' : 'Seed les Données'}
              </Button>
            </div>

            {/* Result Success */}
            {seedResult && (
              <div className="bg-[#0A0A0A] border border-[#00FF00]/30 p-6">
                <div className="flex items-start gap-4">
                  <CheckCircle size={24} className="text-[#00FF00] mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#00FF00] uppercase tracking-wider mb-3">
                      ✓ Seed lancé
                    </h3>
                    <div className="bg-[#1A1A1A] border border-[#00FF00]/20 p-4 mb-4">
                      <p className="text-sm text-[#F0F0F0] font-mono mb-4">
                        {seedResult.message}
                      </p>
                      <p className="text-xs text-[#808080] font-mono">
                        Statut : {seedResult.status === 'processing' ? '⏳ En cours d\'exécution en arrière-plan' : seedResult.status}
                      </p>
                    </div>

                    <div className="bg-[#1A1A1A] border border-[#8B0000]/20 p-4">
                      <p className="text-xs text-[#8B0000] font-mono uppercase mb-2">📋 Prochaines étapes :</p>
                      <ul className="text-xs text-[#F0F0F0] font-mono space-y-1">
                        <li>• Attendez 10-15 secondes pour que le seed se termine</li>
                        <li>• Utilisez le bouton "Vérifier les Données" ci-dessous</li>
                        <li>• Vérifiez que tous les compteurs affichent des données</li>
                        <li>• Si les compteurs sont à 0, relancez le seed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Result Error */}
            {seedError && (
              <div className="bg-[#0A0A0A] border border-[#FF0000]/30 p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle size={24} className="text-[#FF0000] mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-[#FF0000] uppercase tracking-wider mb-2">
                      Erreur
                    </h3>
                    <p className="text-sm text-[#F0F0F0] font-mono">
                      {seedError}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Check Data Card */}
            <div className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
              <div className="flex items-start gap-4">
                <Database size={24} className="text-[#8B0000] mt-1" />
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-[#8B0000] uppercase tracking-wider mb-3">
                    Vérification des Données
                  </h2>
                  <p className="text-sm text-[#F0F0F0] mb-4">
                    Cette action va vérifier l'état actuel de la base de données et afficher les informations sur les données existantes.
                  </p>
                  
                  <div className="bg-[#1A1A1A] border border-[#8B0000]/20 p-4 mb-4">
                    <p className="text-xs text-[#8B0000] font-mono uppercase mb-2">Données à vérifier :</p>
                    <ul className="text-xs text-[#F0F0F0] font-mono space-y-1">
                      <li>• Utilisateurs (admin + membres)</li>
                      <li>• Articles (news, interviews, chroniques)</li>
                      <li>• Commentaires sur articles</li>
                      <li>• Albums & Singles (discographie complète)</li>
                      <li>• Concerts (passés et à venir)</li>
                      <li>• Médias (YouTube, TikTok, Instagram)</li>
                      <li>• Contributions fans (tattoos, fan-arts, collections)</li>
                      <li>• Fanzines (numéros publiés)</li>
                    </ul>
                  </div>

                  <div className="bg-[#FF0000]/10 border border-[#FF0000]/30 p-4">
                    <p className="text-xs text-[#FF0000] font-mono uppercase mb-2">⚠️ Attention :</p>
                    <p className="text-xs text-[#F0F0F0] font-mono">
                      Cette action peut prendre quelques secondes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Card */}
            <div className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={handleCheckData}
                disabled={checkLoading}
              >
                <Database size={20} />
                {checkLoading ? 'Vérification en cours...' : 'Vérifier les Données'}
              </Button>
            </div>

            {/* Result Success */}
            {checkResult && (
              <div className="bg-[#0A0A0A] border border-[#00FF00]/30 p-6">
                <div className="flex items-start gap-4">
                  <CheckCircle size={24} className="text-[#00FF00] mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#00FF00] uppercase tracking-wider mb-3">
                      ✓ Vérification réussie
                    </h3>
                    <div className="bg-[#1A1A1A] border border-[#00FF00]/20 p-4 mb-4">
                      <p className="text-sm text-[#F0F0F0] font-mono mb-4">
                        {checkResult.message}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-[#00FF00] font-mono mb-1">Base de données :</p>
                          <p className="text-xs text-[#F0F0F0] font-mono">
                            Articles : {checkResult.stats?.articles || 0} ({checkResult.details?.publishedArticles || 0} publiés, {checkResult.details?.draftArticles || 0} brouillons)
                          </p>
                          <p className="text-xs text-[#F0F0F0] font-mono">
                            Commentaires : {checkResult.stats?.comments || 0}
                          </p>
                          <p className="text-xs text-[#F0F0F0] font-mono">
                            Utilisateurs : {checkResult.stats?.users || 0}
                          </p>
                          <p className="text-xs text-[#F0F0F0] font-mono">
                            Albums : {checkResult.stats?.albums || 0}
                          </p>
                          <p className="text-xs text-[#F0F0F0] font-mono">
                            Singles : {checkResult.stats?.singles || 0}
                          </p>
                          <p className="text-xs text-[#F0F0F0] font-mono">
                            Concerts : {checkResult.stats?.concerts || 0} ({checkResult.details?.upcomingConcerts || 0} à venir, {checkResult.details?.pastConcerts || 0} passés)
                          </p>
                          <p className="text-xs text-[#F0F0F0] font-mono">
                            Membres : {checkResult.stats?.members || 0}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#00FF00] font-mono mb-1">Médias & Contributions :</p>
                          <p className="text-xs text-[#F0F0F0] font-mono">
                            Contributions : {checkResult.stats?.contributions || 0}
                          </p>
                          <p className="text-xs text-[#F0F0F0] font-mono">
                            Fanzines : {checkResult.stats?.fanzines || 0}
                          </p>
                        </div>
                      </div>
                    </div>

                    {checkResult.stats?.articles === 0 && (
                      <div className="bg-[#FF0000]/10 border border-[#FF0000]/30 p-4 mb-4">
                        <p className="text-xs text-[#FF0000] font-mono uppercase mb-2">⚠️ Aucune donnée trouvée :</p>
                        <p className="text-xs text-[#F0F0F0] font-mono">
                          La base de données est vide. Lancez le seed complet pour ajouter les données de démonstration.
                        </p>
                      </div>
                    )}

                    <div className="bg-[#1A1A1A] border border-[#00FF00]/20 p-4">
                      <p className="text-xs text-[#00FF00] font-mono uppercase mb-2">✓ Actions possibles :</p>
                      <ul className="text-xs text-[#F0F0F0] font-mono space-y-1">
                        {checkResult.stats?.articles === 0 ? (
                          <>
                            <li>• Lancez le seed complet ci-dessus</li>
                            <li>• Puis rechargez la homepage pour voir les données</li>
                          </>
                        ) : (
                          <>
                            <li>• Visitez la homepage pour voir les sections</li>
                            <li>• Consultez la discographie complète</li>
                            <li>• Vérifiez les widgets sociaux (sidebar)</li>
                            <li>• Testez la galerie des contributions fans</li>
                            <li>• Explorez le dernier numéro du fanzine</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Result Error */}
            {checkError && (
              <div className="bg-[#0A0A0A] border border-[#FF0000]/30 p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle size={24} className="text-[#FF0000] mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-[#FF0000] uppercase tracking-wider mb-2">
                      Erreur
                    </h3>
                    <p className="text-sm text-[#F0F0F0] font-mono">
                      {checkError}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}