import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, X, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';

const gradientPlaceholderImage =
  'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22800%22%20height%3D%22420%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23c084fc%22/%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%231d1836%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22url(%23g)%22/%3E%3C/svg%3E';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Digital Creator',
      category: 'Full-Stack',
      description: 'Plateforme SaaS d\'automatisation marketing: création d\'avatars IA, création de produits digitaux et de vidéos de vente.',
      longDescription:
        'Digital Creator est une plateforme SaaS complète dédiée à l\'automatisation marketing pour les infopreneurs et entrepreneurs. Elle permet de créer des produits digitaux, générer des avatars IA personnalisés, créer automatiquement des scripts marketing, ajouter des voix IA réalistes à vos avatars, produire des vidéos de vente professionnelles, et monter automatiquement le contenu généré. Intégration Stripe pour la monétisation, FirstPromoter pour les programmes d\'affiliation, et API HeyGen pour la génération d\'avatars. Solution clé-en-main pour automatiser la vente de produits digitaux via vidéos.',
      tags: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Stripe', 'FirstPromoter'],
      image: new URL('../img/digitalCreator_couverture.png', import.meta.url).toString(),
      link: 'https://www.digitalcreator.app',
      github: '#',
      features: [
        'Création d\'une boutique digitale complète et scalable',
        'Génération d\'avatars IA personnalisés',
        'Création automatisée de scripts marketing vidéo',
        'Génération de voix IA pour vos avatars',
        'Production vidéo automatisée avec avatars générés',
        'Montage vidéo automatisé et publication en un clic'
      ]
    },
    {
      id: 2,
      title: 'BullGpt',
      category: 'Full-Stack',
      description: 'Plateforme SaaS d\'analyse IA pour le trading : analysez n\'importe quel graphique en 7 secondes et obtenez des recommandations de trading claires.',
      longDescription:
        'BullGpt est une plateforme SaaS révolutionnaire qui démocratise l\'analyse technique du trading grâce à l\'IA. En 7 secondes, le système analyse n\'importe quel graphique et fournit des insights professionnels : identification des niveaux support/résistance, analyse des indicateurs techniques, et deux scénarios avec probabilités (haussier/baissier). ' +
        'La plateforme intègre un apprentissage adaptatif qui personnalise les recommandations selon votre style de trading (scalping, swing trading, etc.) après environ 10 analyses. ' +
        'Un coaching personnel via WhatsApp (avec un vrai trader) complète le service pour une guidance adaptée. ' +
        'Intégration Stripe pour la monétisation et les plans d\'abonnement. Solution clé-en-main pour transformer le trading en automatisant les décisions basées sur des données.',
      tags: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Stripe'],
      image: new URL('../img/Bullgpt_couverture.png', import.meta.url).toString(),
      link: 'https://www.bullgpt.io',
      github: '#',
      features: [
        'Analyse de graphique IA en 7 secondes avec identification support/résistance',
        'Apprentissage adaptatif personnalisé selon votre style de trading',
        'Scénarios haussiers/baissiers avec probabilités et niveaux clés',
        'Coaching personnel via WhatsApp avec des traders expérimentés',
        'Suivi d\'historique de trades et analyse du win rate',
        'Monétisation via plans d\'abonnement flexibles avec Stripe'
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
        "De l'idée à un SaaS opérationnel en un week‑end: un kit complet prêt à cloner comprenant authentification (password, magic link, OAuth Google, reset, vérification email), " +
        "un dashboard moderne, la facturation Stripe (plans, webhooks, portail client), une API publique (clés, quotas, endpoint d'exemple), " +
        "un panneau d'admin (utilisateurs, rôles, logs d'audit) et un pack marketing (docs et listings). Démo en ligne et mode démo.",
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
      title: 'Site vitrine Fitness coaching',
      category: 'Frontend',
      description: 'site vitrine realisé pour Amir, coach sportif independant, présentant son activité et ses services avec formulaire de contact.',
      longDescription: 'Site vitrine moderne pour un coach sportif indépendant. Intégration du formulaire de contact, mise en avant des offres et témoignages, CTA clairs. Déployé sur GitHub Pages avec SEO de base et performances optimisées.',
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
      id: 6,
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
      id: 8,
      title: 'League Of Perpignan',
      category: 'Discord Bot / Backend',
      description: 'Bot Discord de gestion de recrutement esport : tournois, équipes, dashboard temps réel et système de tickets intégré.',
      longDescription:
        'League Of Perpignan est un bot Discord complet pour la gestion de tournois et du recrutement esport. Il permet aux organisateurs de créer des tournois avec limite de slots, aux capitaines de poster des annonces "Cherche Joueurs" et aux joueurs individuels de poster des annonces "Cherche Équipe". ' +
        'Le bot automatise l\'ensemble du workflow : candidatures, acceptation/refus avec notifications DM, renommage automatique des membres avec préfixe d\'équipe, création de canaux privés par équipe, et attribution du rôle "Compétiteur". ' +
        'Un dashboard mis à jour en temps réel affiche la progression des équipes et les places disponibles. Le système inclut également des logs d\'audit configurables, des panels de self-rôle, un builder d\'embeds, un système de tickets et des salons vocaux temporaires. Déployé sur Railway avec SQLite pour la persistance des données.',
      tags: ['Node.js', 'Discord.js v14', 'SQLite', 'Railway', 'JavaScript'],
      image: new URL('../img/lop_couv_portfolio.png', import.meta.url).toString(),
      link: 'https://discord.gg/T7ujE3uSMY',
      github: '#',
      features: [
        'Gestion de tournois avec slots configurables et boutons interactifs',
        'Double système de recrutement : "Cherche Joueurs" (capitaine) et "Cherche Équipe" (solo)',
        'Dashboard temps réel mis à jour automatiquement (équipes, slots, joueurs libres)',
        'Canaux privés par équipe créés automatiquement avec notifications join/leave',
        'Flux de candidature atomique : application → acceptation/refus → rôles et pseudos auto',
        'Système de tickets avec questions personnalisées et transcription automatique',
        'Salons vocaux temporaires, self-rôle panels, builder d\'embeds et audit logs'
      ]
    },
    {
      id: 7,
      title: 'Shiloh Technologies',
      category: 'Full-Stack / 3D Web',
      description: 'Site web immersif pour Shiloh Technologies, cabinet indépendant de conseil en sécurisation des décisions financières critiques.',
      longDescription: 'Plateforme web développée pour Shiloh Technologies, un cabinet indépendant dédié à la sécurisation des décisions financières critiques et à l\'analyse de risques. Le site, conçu avec Next.js et React Three Fiber, offre une expérience utilisateur premium grâce à un globe terrestre 3D interactif (react-globe.gl) conçu pour illustrer leur approche. L\'intégration complète avec Stripe assure une gestion sécurisée des services. Le design global reflète le positionnement haut de gamme du cabinet, alliant rigueur institutionnelle et modernité technologique.',
      tags: ['Next.js', 'React', 'Three.js', 'Stripe', 'Tailwind CSS'],
      image: new URL('../img/shiloh_couverture.png', import.meta.url).toString(),
      link: 'https://www.shiloh-technologies.com/',
      github: '#',
      features: [
        'Présentation haut de gamme des services de conseil en investissement',
        'Expérience utilisateur immersive avec globe interactif 3D (Three.js)',
        'Système de paiement sécurisé via Stripe',
        'Architecture performante avec Next.js',
        'Design premium et responsive pour cibler une clientèle de dirigeants'
      ]
    }
  ];

  type ProjectItem = (typeof projects)[number];

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

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
                    alt={`Capture d'écran du projet ${project.title} — ${project.category} réalisé par Louis Iguercha`}
                    loading="lazy"
                    decoding="async"
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
                      aria-label={`Voir les détails du projet ${project.title}`}
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

        <div className="mt-16 flex flex-col items-center gap-5">
          <div className="flex items-center space-x-5 rounded-full bg-gradient-to-r from-primary/80 to-secondary/80 px-6 py-4 text-foreground dark:text-white shadow-[0_10px_60px_rgba(138,43,226,0.55)] ring-1 ring-primary/50">
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
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
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
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
                    aria-label="Fermer la fenêtre"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                <div className="relative">
                  <ImageWithFallback
                    src={selectedProject.image}
                    alt={`Aperçu détaillé du projet ${selectedProject.title} — ${selectedProject.category}`}
                    loading="lazy"
                    decoding="async"
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