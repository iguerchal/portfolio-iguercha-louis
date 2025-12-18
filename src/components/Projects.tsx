import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, X, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const projects = [
    {
      id: 1,
      title: 'Site vitrine Fitness coaching',
      category: 'Frontend',
      description: 'site vitrine realisé pour Amir, coach sportif independant, présentant son activité et ses services avec formulaire de contact.',
      longDescription: 'Site vitrine moderne pour un coach sportif indépendant. Stack: React + TypeScript avec Vite et Tailwind CSS. Intégration du formulaire de contact, mise en avant des offres et témoignages, CTA clairs. Déployé sur GitHub Pages avec SEO de base et performances optimisées.',
      tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'GitHub Pages'],
      image: new URL('../img/amir-fitness-site-vitrine.png', import.meta.url).toString(),
      link: 'https://iguerchal.github.io/amir-fitness-site-vitrine',
      github: 'https://github.com/iguerchal/amir-fitness-site-vitrine',
      features: [
        'Héros clair avec proposition de valeur',
        'Présentation des offres de coaching',
        'Témoignages clients',
        'Formulaire de contact',
        'Design responsive (mobile‑first)',
        'SEO de base (métadonnées, balises sémantiques)',
        'Déploiement GitHub Pages'
      ]
    },
    {
      id: 2,
      title: 'MoodBoard Studio — Outil de moodboards UI/UX',
      category: 'Frontend',
      description: 'Création de moodboards UI/UX avec export image/PDF, IA (mock), layouts et QA.',
      longDescription:
        'MoodBoard Studio est un outil React/TypeScript permettant de composer rapidement des moodboards pour des projets UI/UX. ' +
        'Il intègre une IA simulée pour générer palettes, typographies et éléments, des arrangeurs de layout (Grid, Masonry, Circle Pack, Editorial) et un auto‑arrange. ' +
        'L’export avancé prend en charge PNG/JPG/WebP/SVG et PDF (pages palette/assets). Les Google Fonts sont chargées dynamiquement et l’app persiste thème, layout et éléments localement. ' +
        'Un Contrast Checker (WCAG) facilite l’accessibilité, une Command Palette (Cmd/Ctrl+K) accélère les actions et un Story Mode permet de présenter le board sous forme de timeline.',
      tags: ['React', 'TypeScript', 'Vite', 'shadcn/ui', 'Radix UI', 'Framer Motion', 'Tailwind CSS', 'html-to-image', 'jsPDF'],
      image: new URL('../img/moodboard_studio_thumbnail.PNG', import.meta.url).toString(),
      link: 'https://iguerchal.github.io/Moodboard_Studio',
      github: 'https://github.com/iguerchal/Moodboard_Studio',
      features: [
        'Drag & Drop (texte, couleurs, formes)',
        'IA (mock) Prompt‑to‑Board et suggestions (palettes, typos, éléments)',
        'Arrangeurs: Grid, Masonry, Circle Pack, Editorial, Auto‑arrange',
        'Export image (PNG/JPG/WebP/SVG) et PDF (palette + assets)',
        'Google Fonts dynamiques; changement de police par bloc',
        'Persistance locale (thème, layout, éléments) et Command Palette',
        'Contrast Checker (WCAG) avec correction auto',
        'Story Mode: timeline et lecture auto'
      ]
    },
    {
      id: 3,
      title: 'RoCart Boutique – Catalogue produits',
      category: 'Frontend',
      description: 'Catalogue e‑commerce avec barre Hot Items défilante et filtres par rareté/prix.',
      longDescription:
        'Mise en avant d’un catalogue e‑commerce performant avec une barre « Hot Items » défilante (best‑sellers & nouveautés) et un système de filtres multi‑critères (rareté, prix, catégorie). ' +
        'L’interface est responsive et orientée conversion, avec cartes produit, CTA clairs et SEO de base pour le trafic organique. ' +
        'Architecture front propre en HTML/CSS/JavaScript, animations légères pour la mise en valeur des produits et structure scalable pour enrichir le catalogue.',
      tags: ['HTML', 'CSS', 'JavaScript', 'Carousel', 'Filtrage', 'Responsive', 'SEO'],
      image: new URL('../img/rocart shop.PNG', import.meta.url).toString(),
      link: 'https://iguerchal.github.io/test_landing_page',
      github: 'https://github.com/iguerchal/test_landing_page',
      features: [
        'Barre « Hot Items » défilante',
        'Filtres par rareté, prix et catégorie',
        'Cartes produit visuelles avec highlights',
        'CTA orientés conversion (voir/acheter)',
        'Design responsive mobile‑first',
        'Bonnes pratiques SEO de base'
      ]
    },
    {
      id: 4,
      title: 'SaaS Starter Kit Factory',
      category: 'Full‑Stack',
      description: 'Starter kit SaaS complet: Auth, dashboard, billing Stripe, API, admin, docs.',
      longDescription:
        'De l’idée à un SaaS opérationnel en un week‑end: un kit complet prêt à cloner comprenant authentification (password, magic link, OAuth Google, reset, vérification email), ' +
        'un dashboard moderne, la facturation Stripe (plans, webhooks, portail client), une API publique (clés, quotas, endpoint d’exemple), ' +
        'un panneau d’admin (utilisateurs, rôles, logs d’audit) et un pack marketing (docs et listings). ' +
        'Stack moderne: Next.js 15, TypeScript, Prisma, Auth.js, Stripe, Resend. Démo en ligne et mode démo.',
      tags: ['Next.js', 'TypeScript', 'Prisma', 'Auth.js', 'Stripe', 'Resend'],
      image: new URL('../img/landing.png', import.meta.url).toString(),
      link: 'https://ssk-demo.vercel.app',
      github: 'https://louigch.gumroad.com/l/rrddn',
      features: [
        'Auth complète (password, magic link, OAuth Google, reset, vérification email)',
        'Dashboard moderne prêt à brander',
        'Billing Stripe (plans, webhooks, portail client)',
        'API publique (clés API, quotas, endpoint d’exemple)',
        'Admin panel (utilisateurs, rôles, logs d’audit)',
        'Docs & marketing (guides, listings, captures) et mode démo'
      ]
    },
    {
      id: 5,
      title: 'Projet en attente',
      category: 'Template',
      description: 'Carte tampon pour la page 2, détails à renseigner plus tard.',
      longDescription:
        'Placeholder en attendant les informations du prochain projet. Tu pourras remplacer l’image, les textes et les liens sans toucher au layout existant.',
      tags: ['Template'],
      image: new URL('../img/amir-fitness-site-vitrine.png', import.meta.url).toString(),
      link: '#',
      github: '#',
      features: [
        'Page 2 prête à être remplie',
        'CTA désactivés (#)',
        'Structure identique aux autres cartes',
        'Parfait pour recevoir un vrai projet bientôt'
      ]
    }
  ];

  type ProjectItem = (typeof projects)[number];
  const projectsPerPage = 4;
  const projectPages: ProjectItem[][] = [];

  const isHttpUrl = (url?: string) => typeof url === 'string' && /^https?:\/\//.test(url);

  for (let i = 0; i < projects.length; i += projectsPerPage) {
    projectPages.push(projects.slice(i, i + projectsPerPage));
  }

  const currentProjects = projectPages[currentPage] ?? [];

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Projets mis en avant
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Présentation de solutions innovantes et d’implémentations créatives
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {currentProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="glass-morphism overflow-hidden h-full hover:neon-glow-sm transition-all duration-300">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 text-primary-foreground">
                      {project.category}
                    </Badge>
                  </div>

                  {/* Quick action buttons */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="glass-morphism"
                      onClick={() => setSelectedProject(project)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs border-primary/50 text-primary hover:bg-primary/10"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <Button
                      onClick={() => setSelectedProject(project)}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Voir les détails
                    </Button>
                    
                    <div className="flex space-x-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-muted-foreground hover:text-primary"
                        onClick={() => isHttpUrl(project.link) && window.open(project.link!, '_blank')}
                        disabled={!isHttpUrl(project.link)}
                        aria-label="Ouvrir la démo"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-muted-foreground hover:text-primary"
                        onClick={() => isHttpUrl(project.github) && window.open(project.github!, '_blank')}
                        disabled={!isHttpUrl(project.github)}
                        aria-label="Voir le code"
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4">
          <div className="flex items-center space-x-5 rounded-full bg-gradient-to-r from-primary/70 to-secondary/70 px-4 py-3 text-foreground shadow-[0_8px_40px_rgba(138,43,226,0.45)] ring-1 ring-primary/40 dark:text-white">
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={(event) => {
                event.preventDefault();
                setCurrentPage((prev) => Math.max(0, prev - 1));
              }}
              disabled={currentPage === 0}
              className="text-foreground hover:bg-white/10 data-[disabled]:text-muted-foreground/50 dark:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-semibold tracking-wide">
              Page {currentPage + 1} / {projectPages.length}
            </span>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={(event) => {
                event.preventDefault();
                setCurrentPage((prev) => Math.min(projectPages.length - 1, prev + 1));
              }}
              disabled={currentPage === projectPages.length - 1}
              className="text-foreground hover:bg-white/10 data-[disabled]:text-muted-foreground/50 dark:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-3 text-xs uppercase tracking-[0.6em] text-muted-foreground">
            {projectPages.map((_, pageIndex) => (
              <div
                key={pageIndex}
                className={`h-1 w-8 rounded-full transition-all duration-300 ${
                  pageIndex === currentPage ? 'bg-gradient-to-r from-secondary to-primary' : 'bg-muted/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-morphism border-primary/20">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{selectedProject.title}</h3>
                    <Badge className="mt-2 bg-primary/90 text-primary-foreground">
                      {selectedProject.category}
                    </Badge>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setSelectedProject(null)}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                <div className="relative">
                  <ImageWithFallback
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">À propos de ce projet</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedProject.longDescription}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Fonctionnalités clés</h4>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature, index) => (
                          <motion.li
                            key={feature}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-center text-muted-foreground"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="border-primary/50 text-primary hover:bg-primary/10"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground neon-glow-sm"
                        onClick={() => isHttpUrl(selectedProject.link) && window.open(selectedProject.link, '_blank')}
                        disabled={!isHttpUrl(selectedProject.link)}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Démo en ligne
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-primary/50 text-primary hover:bg-primary/10"
                        onClick={() => isHttpUrl(selectedProject.github) && window.open(selectedProject.github, '_blank')}
                        disabled={!isHttpUrl(selectedProject.github)}
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Voir le code
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;