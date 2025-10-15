import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Dialog, DialogContent, DialogOverlay, DialogTrigger, DialogClose, DialogTitle } from './ui/dialog';
import { Download, Star, Maximize2, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

const About = () => {
  const timelineData = [
    {
      year: '2020',
      title: 'Débuts en développement web',
      description: "Début de mon parcours en développement web avec HTML, CSS et JavaScript"
    },
    {
      year: '2021',
      title: 'Maîtrise de React',
      description: 'Maîtrise de React et des frameworks frontend modernes'
    },
    {
      year: '2022',
      title: 'Développement Full-Stack',
      description: "Extension des compétences aux technologies backend ,bases de données et prise en charge de differents projets d'applications, jeux, SaaS"
    },
    {
      year: '2023',
      title: 'Succès en freelance',
      description: 'Lancement d’une carrière freelance réussie avec 50+ projets réalisés'
    },
    {
      year: '2024',
      title: 'Innovation créative',
      description: 'Spécialisation en solutions web créatives et expériences utilisateur'
    },
    {
      year: '2025',
      title: 'Continuation de la carrière freelance',
      description: "..."
    }
  ];

  // Unifier la constellation avec toutes les compétences listées dans "Compétences & Expertise"
  const allSkills = [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Next.js', level: 88 },
    { name: 'Vue.js', level: 75 },
    { name: 'Tailwind CSS', level: 92 },
    { name: 'Framer Motion', level: 85 },
    { name: 'Vite', level: 88 },
    { name: 'Node.js', level: 87 },
    { name: 'Express', level: 85 },
    { name: 'GraphQL', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'Java', level: 72 },
    { name: 'PostgreSQL', level: 82 },
    { name: 'MongoDB', level: 88 },
    { name: 'Git', level: 90 },
    { name: 'GitHub Pages', level: 85 },
    { name: 'Docker', level: 78 },
    { name: 'AWS', level: 75 },
    { name: 'Figma', level: 85 },
    { name: 'Adobe Creative Suite', level: 80 },
    { name: 'Three.js', level: 70 }
  ];

  const getSkillId = (name: string) => `skill-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  // Small presentational surface for the constellation; reused in card and modal
  const ConstellationSurface: React.FC<{
    nodeSizeMultiplier?: number;
    interactive?: boolean;
    full?: boolean;
  }> = ({ nodeSizeMultiplier = 1, interactive = true, full = false }) => (
    <div className={`relative ${full ? 'h-full' : 'h-80'} bg-gradient-to-br from-muted/50 to-background rounded-lg overflow-hidden`}>
      {/* Lignes de connexion */}
      <svg className="absolute inset-0 w-full h-full">
        {constellation.edges.map(([a, b], i) => (
          <motion.line
            key={`edge-${i}`}
            x1={`${constellation.nodes[a].x}%`}
            y1={`${constellation.nodes[a].y}%`}
            x2={`${constellation.nodes[b].x}%`}
            y2={`${constellation.nodes[b].y}%`}
            stroke="rgba(138, 43, 226, 0.25)"
            strokeWidth="1"
            {...(full
              ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6, delay: i * 0.01 } }
              : { initial: { pathLength: 0, opacity: 0 }, whileInView: { pathLength: 1, opacity: 1 }, transition: { duration: 1.2, delay: i * 0.01 }, viewport: { once: true } }
            )}
          />
        ))}
      </svg>

      {/* Nœuds */}
      {constellation.nodes.map((n, index) => (
        <motion.button
          key={n.name}
          style={{ left: `${n.x}%`, top: `${n.y}%`, width: n.size * 4 * nodeSizeMultiplier, height: n.size * 4 * nodeSizeMultiplier }}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full neon-glow-sm bg-gradient-to-r from-primary to-secondary text-primary-foreground flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 group"
          {...(full
            ? { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.3, delay: index * 0.02 } }
            : { initial: { opacity: 0, scale: 0 }, whileInView: { opacity: 1, scale: 1 }, transition: { duration: 0.4, delay: index * 0.03 }, viewport: { once: true } }
          )}
          onClick={interactive ? () => {
            const el = document.getElementById(getSkillId(n.name));
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } : undefined}
          onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); const el = document.getElementById(getSkillId(n.name)); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } } : undefined}
          aria-label={`Voir la compétence ${n.name}`}
        >
          <Star className="text-primary-foreground" size={Math.min(n.size, 14)} />
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-background rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity shadow-md border border-border">
            {n.name}
          </span>
        </motion.button>
      ))}

      {/* Note */}
      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
        <span className="bg-primary/20 px-2 py-1 rounded">
          💡 Survolez ou cliquez sur les étoiles pour naviguer
        </span>
      </div>
    </div>
  );

  const constellation = useMemo(() => {
    const nodes = allSkills.map((s, index) => {
      const ring = index % 3; // anneaux 0..2
      const radius = 28 + ring * 12;
      const angle = (index / allSkills.length) * Math.PI * 2;
      const cx = 50 + radius * Math.cos(angle) * 0.9;
      const cy = 50 + radius * Math.sin(angle) * 0.7;
      const size = Math.max(8, Math.round((s.level / 100) * 14));
      return {
        name: s.name,
        x: Math.max(6, Math.min(94, cx)),
        y: Math.max(6, Math.min(94, cy)),
        size
      };
    });
    const edges: Array<[number, number]> = [];
    for (let i = 0; i < nodes.length; i++) {
      edges.push([i, (i + 1) % nodes.length]);
      edges.push([i, (i + 5) % nodes.length]);
    }
    return { nodes, edges };
  }, [allSkills]);

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            À propos de moi
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Développeur passionné avec la mission de créer des expériences numériques qui inspirent et engagent
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card className="glass-morphism p-8 space-y-6">
              <h3 className="text-2xl text-primary mb-4">Présentation professionnel</h3>
              <p className="text-muted-foreground leading-relaxed">
                Je suis un développeur créatif qui fait le lien entre design, technologie et interactivité. Fort de plus de 4 ans d’expérience, je conçois des applications, des jeux et des expériences web immersives, à la fois esthétiques, performantes et intuitives.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Ma passion est d’explorer l’intersection entre créativité, code et expérience utilisateur, en repoussant sans cesse les limites du possible — que ce soit sur le web, dans une app ou dans un jeu.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Je crois qu’un excellent produit numérique doit être fonctionnel, fluide et plaisant à utiliser, quelle que soit sa plateforme.
              </p>
              
              {/* Bouton CV retiré à la demande: on conserve uniquement le texte du parcours */}
            </Card>

            {/* Timeline */}
            <Card className="glass-morphism p-8">
              <h3 className="text-2xl text-primary mb-8">Parcours</h3>
              <div className="space-y-6">
                {timelineData.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center neon-glow-sm">
                        <span className="text-primary-foreground font-bold text-sm">
                          {item.year}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 pb-8">
                      <h4 className="text-lg font-semibold text-foreground">{item.title}</h4>
                      <p className="text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Skills Constellation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Dialog>
              <Card className="glass-morphism p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl text-primary">Constellation de compétences</h3>
                  <DialogTrigger asChild>
                    <button type="button" aria-label="Plein écran" className="inline-flex items-center justify-center size-9 rounded-md hover:bg-accent">
                      <Maximize2 size={18} />
                    </button>
                  </DialogTrigger>
                </div>
                <ConstellationSurface />
              </Card>
              <DialogContent
                className="h-[70vh] w-[75vw] max-w-none sm:max-w-none overflow-hidden rounded-xl p-0 bg-transparent ring-1 ring-black/15 dark:ring-black/40 shadow-[0_24px_80px_rgba(0,0,0,0.55)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
                style={{ width: '75vw', height: '70vh' }}
              >
                <motion.div
                  className="h-full w-full rounded-xl p-[2px] bg-gradient-to-r from-primary/70 via-secondary/70 to-primary/70 dark:from-primary/90 dark:via-secondary/90 dark:to-primary/90 drop-shadow-xl"
                  style={{ backgroundSize: '200% 200%' }}
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="h-full w-full rounded-[calc(theme(borderRadius.xl)-2px)] bg-background border border-border flex flex-col min-h-0">
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-6">
                        <DialogTitle className="text-2xl text-primary">Constellation de compétences</DialogTitle>
                        <DialogClose asChild>
                          <Button size="icon" variant="ghost" aria-label="Fermer">
                            <X size={18} />
                          </Button>
                        </DialogClose>
                      </div>
                    </div>
                    <div className="flex-1 min-h-0 p-3">
                      <div className="h-full w-full rounded-lg bg-gradient-to-br from-muted/50 to-background">
                        <div className="relative h-full rounded-lg overflow-hidden">
                          <svg className="absolute inset-0 w-full h-full">
                            {constellation.edges.map(([a, b], i) => (
                              <motion.line
                                key={`fs-edge-${i}`}
                                x1={`${constellation.nodes[a].x}%`}
                                y1={`${constellation.nodes[a].y}%`}
                                x2={`${constellation.nodes[b].x}%`}
                                y2={`${constellation.nodes[b].y}%`}
                                stroke="rgba(138, 43, 226, 0.35)"
                                strokeWidth="1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: i * 0.01 }}
                              />
                            ))}
                          </svg>
                          {constellation.nodes.map((n, index) => (
                            <motion.button
                              key={`fs-node-${n.name}`}
                              style={{ left: `${n.x}%`, top: `${n.y}%`, width: n.size * 5.6, height: n.size * 5.6 }}
                              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full neon-glow-sm bg-gradient-to-r from-primary to-secondary text-primary-foreground flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 group"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.02 }}
                              aria-label={`Voir la compétence ${n.name}`}
                            >
                              <Star className="text-primary-foreground" size={Math.min(n.size + 6, 18)} />
                              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-background/90 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity shadow-md border border-border">
                                {n.name}
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </DialogContent>
            </Dialog>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { number: '50+', label: 'Projets' },
                { number: '4+', label: 'Années' },
                { number: '100%', label: 'Passion' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                  viewport={{ once: true }}
                  className="glass-morphism p-6 text-center"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;