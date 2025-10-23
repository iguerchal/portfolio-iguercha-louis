import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, X, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

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
      title: 'Application de gestion de tâches',
      category: 'Full‑Stack',
      description: 'Gestion collaborative des tâches avec mises à jour en temps réel.',
      longDescription: 'Kanban collaboratif en temps réel: glisser‑déposer, mentions, notifications, pièces jointes et rôles. API sécurisée et performances maîtrisées.',
      tags: ['Next.js', 'Socket.io', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=60',
      link: '#',
      github: '#',
      features: [
        'Real-time collaboration',
        'Drag-and-drop interface',
        'Time tracking',
        'Team management',
        'Advanced reporting'
      ]
    },
    {
      id: 4,
      title: 'Dashboard IA – Data‑viz',
      category: 'Frontend',
      description: 'Tableau de bord data‑viz avec insights IA et analytique prédictive.',
      longDescription: 'Un tableau de bord intelligent exploitant l’IA pour fournir des insights actionnables à partir de jeux de données complexes. Graphiques interactifs, analytique prédictive, widgets personnalisables. Pensé pour l’échelle et le temps réel.',
      tags: ['Vue.js', 'D3.js', 'Python'],
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=60',
      link: '#',
      github: '#',
      features: [
        'AI-powered insights',
        'Interactive data visualization',
        'Predictive analytics',
        'Customizable widgets',
        'Real-time data processing'
      ]
    }
  ];

  const isHttpUrl = (url?: string) => typeof url === 'string' && /^https?:\/\//.test(url);

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
          {projects.map((project, index) => (
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