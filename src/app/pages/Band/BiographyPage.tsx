import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { PageHeader } from '@/app/components/PageHeader';

export function BiographyPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader
        title="KORN : L'HÉRITAGE NU METAL"
        description="L'histoire complète de Korn, de Bakersfield à la légende mondiale.<br />Trois décennies de révolution musicale et d'influence culturelle."
        backgroundImage="https://images.unsplash.com/photo-1739051261848-fdf6c43fe0d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5kJTIwYmlvZ3JhcGh5JTIwZGFyayUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTE5MzU1MXww&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[
          { label: 'ACCUEIL', path: '/' },
          { label: 'LE GROUPE', path: '/band' },
          { label: 'BIOGRAPHIE' }
        ]}
        glitchIntensity="low"
      />

      <div className="px-4 pb-24 bg-[#0A0A0A]">
        <div className="max-w-[1920px] mx-auto">
          {/* Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-[#E0E0E0] space-y-12"
          >
            {/* Section 1: Origins */}
            <section>
              <h2
                className="text-4xl font-black text-[#E0E0E0] uppercase mb-6 tracking-tight"
                style={{ fontFamily: 'Arial Black, sans-serif' }}
              >
                <span className="text-[#8B0000]">&gt;&gt;</span> LES ORIGINES // BAKERSFIELD, 1993
              </h2>
              <div className="space-y-4 text-sm leading-relaxed">
                <p>
                  Tout commence à **Bakersfield, Californie**, ville ouvrière loin des paillettes de Los Angeles. Cinq jeunes musiciens en colère contre le monde se rencontrent : Jonathan Davis (chant), James "Munky" Shaffer (guitare), Brian "Head" Welch (guitare), Reginald "Fieldy" Arvizu (basse) et David Silveria (batterie).
                </p>
                <p>
                  Leur vision ? **Créer quelque chose de nouveau**. Fusionner la lourdeur du metal, le groove du funk, l'agressivité du punk et la noirceur du hip-hop. Un son jamais entendu, brut, viscéral, terrifiant.
                </p>
                <p>
                  Le groupe adopte le nom **"Korn"** (orthographe enfantine volontaire) et développe une approche révolutionnaire : guitares 7 cordes accordées en drop A, basse slappée percussive, batterie groove-oriented, voix oscillant entre murmures et hurlements primal.
                </p>
              </div>
            </section>

            {/* Section 2: The Breakthrough */}
            <section>
              <h2
                className="text-4xl font-black text-[#E0E0E0] uppercase mb-6 tracking-tight"
                style={{ fontFamily: 'Arial Black, sans-serif' }}
              >
                <span className="text-[#8B0000]">&gt;&gt;</span> L'EXPLOSION // 1994-1999
              </h2>
              <div className="space-y-4 text-sm leading-relaxed">
                <p>
                  **1994** : Sortie de l'album éponyme "Korn", produit par Ross Robinson. Enregistré en 3 semaines, l'album capture une rage authentique. "Blind", "Shoots and Ladders", "Daddy" deviennent des hymnes underground. Le nu metal est né.
                </p>
                <p>
                  **1996** : "Life Is Peachy" confirme que Korn n'est pas un accident. Plus agressif, plus sombre, l'album propulse le groupe dans les charts alternatifs. "A.D.I.D.A.S." et "Good God" deviennent des classiques.
                </p>
                <p>
                  **1998** : "Follow the Leader" change TOUT. L'album débute #1 au Billboard, "Freak on a Leash" devient un phénomène planétaire. MTV diffuse le clip en boucle. Korn passe du statut de groupe culte à celui de **superstar mondiale**. 14 millions de copies vendues.
                </p>
                <p>
                  **1999** : "Issues" plonge dans les traumatismes personnels de Jonathan Davis. L'album le plus sombre, le plus intime. 573,000 copies vendues la première semaine. #1 Billboard. Korn règne sur le nu metal.
                </p>
              </div>
            </section>

            {/* Section 3: Experimentation */}
            <section>
              <h2
                className="text-4xl font-black text-[#E0E0E0] uppercase mb-6 tracking-tight"
                style={{ fontFamily: 'Arial Black, sans-serif' }}
              >
                <span className="text-[#8B0000]">&gt;&gt;</span> EXPÉRIMENTATION // 2002-2007
              </h2>
              <div className="space-y-4 text-sm leading-relaxed">
                <p>
                  **2002** : "Untouchables" repousse les limites. Album-fleuve de 74 minutes, production monumentale. "Here to Stay" remporte le **Grammy Award 2003**. Le nom de cet album inspirera plus tard notre communauté.
                </p>
                <p>
                  **2003** : "Take a Look in the Mirror" marque un retour brutal aux racines. Dernier album avec la formation originale.
                </p>
                <p>
                  **2005** : CHOC. Head quitte le groupe suite à sa conversion religieuse. Korn continue en quartet. "See You on the Other Side" explore des territoires électro-indus avec The Matrix à la production.
                </p>
                <p>
                  **2006** : David Silveria quitte à son tour. Ray Luzier (ex-Army of Anyone) le remplace en 2007.
                </p>
              </div>
            </section>

            {/* Section 4: Renaissance */}
            <section>
              <h2
                className="text-4xl font-black text-[#E0E0E0] uppercase mb-6 tracking-tight"
                style={{ fontFamily: 'Arial Black, sans-serif' }}
              >
                <span className="text-[#8B0000]">&gt;&gt;</span> RENAISSANCE // 2013-PRÉSENT
              </h2>
              <div className="space-y-4 text-sm leading-relaxed">
                <p>
                  **2013** : Retour triomphal de Head ! "The Paradigm Shift" réunit les guitares iconiques de Munky et Head. L'émotion est palpable. Le groupe retrouve son identité.
                </p>
                <p>
                  **2016** : "The Serenity of Suffering" prouve que Korn est toujours une force créative majeure. Retour au heavy, collaborations inattendues (Corey Taylor de Slipknot).
                </p>
                <p>
                  **2019** : "The Nothing", album déchirant écrit après la mort tragique de la femme de Jonathan. Douleur brute, catharsis totale.
                </p>
                <p>
                  **2022** : "Requiem", album compact (33 minutes) et brutal. Korn revient à l'essentiel : la rage, la noirceur, l'authenticité.
                </p>
                <p>
                  **2026** : Un 15e album studio est en cours d'enregistrement avec Ross Robinson. Le cycle complet. Retour aux sources avec 30+ ans d'expérience.
                </p>
              </div>
            </section>

            {/* Section 5: Legacy */}
            <section>
              <h2
                className="text-4xl font-black text-[#E0E0E0] uppercase mb-6 tracking-tight"
                style={{ fontFamily: 'Arial Black, sans-serif' }}
              >
                <span className="text-[#8B0000]">&gt;&gt;</span> L'HÉRITAGE
              </h2>
              <div className="space-y-4 text-sm leading-relaxed">
                <p>
                  Korn a **révolutionné le metal moderne**. Inventeurs du nu metal, ils ont ouvert la voie à Limp Bizkit, Linkin Park, Slipknot, Deftones, et des centaines d'autres groupes.
                </p>
                <p>
                  Au-delà du son, Korn a libéré l'expression émotionnelle dans le metal. Parler de trauma, d'abus, de santé mentale n'était pas acceptable dans les années 90. Korn a brisé ce tabou.
                </p>
                <p>
                  **40+ millions d'albums vendus** // **2 Grammy Awards** // **7 albums #1 Billboard** // **Tournées mondiales incessantes**
                </p>
                <p className="text-[#8B0000] font-bold">
                  KORN N'EST PAS UN GROUPE. KORN EST UN MOUVEMENT.
                </p>
              </div>
            </section>

            {/* Timeline visual */}
            <section className="border-t-2 border-[#8B0000] pt-12">
              <h2
                className="text-4xl font-black text-[#E0E0E0] uppercase mb-8 tracking-tight"
                style={{ fontFamily: 'Arial Black, sans-serif' }}
              >
                <span className="text-[#8B0000]">&gt;&gt;</span> TIMELINE
              </h2>
              <div className="space-y-4 text-xs">
                {[
                  { year: '1993', event: 'Formation du groupe à Bakersfield' },
                  { year: '1994', event: 'Sortie de "Korn" - Naissance du nu metal' },
                  { year: '1998', event: '"Follow the Leader" - Phénomène mondial' },
                  { year: '2002', event: '"Untouchables" - Grammy Award' },
                  { year: '2005', event: 'Départ de Head' },
                  { year: '2013', event: 'Retour de Head - The Paradigm Shift' },
                  { year: '2021', event: 'Pause de Fieldy' },
                  { year: '2026', event: 'Nouvel album avec Ross Robinson' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <span className="text-[#8B0000] font-bold min-w-[60px]">{item.year}</span>
                    <span className="text-[#E0E0E0]/70 group-hover:text-[#E0E0E0] transition-colors">
                      {item.event}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </motion.article>
        </div>
      </div>
    </div>
  );
}