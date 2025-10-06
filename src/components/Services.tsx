import React from 'react';
import { motion } from 'motion/react';
import { Check, Star, Zap, Shield, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const Services = () => {
  const services = [
    {
      name: 'Starter',
      price: '200 – 400 €',
      description: 'Parfait pour les petites entreprises et startups',
      icon: <Zap className="h-8 w-8" />,
      features: [
        'Design de site personnalisé',
        'Développement responsive',
        'SEO de base',
        'Formulaire de contact',
        '3 mois de support',
        'Optimisation des performances'
      ],
      popular: false,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Pro',
      price: '1000 – 2000 €',
      description: 'Idéal pour les entreprises en croissance avec des besoins avancés',
      icon: <Star className="h-8 w-8" />,
      features: [
        'Tout le Starter',
        'Animations avancées',
        'Intégration CMS',
        'Fonctionnalités e-commerce',
        'Intégrations API',
        'SEO avancé',
        '6 mois de support',
        'Mise en place Analytics'
      ],
      popular: true,
      gradient: 'from-primary to-secondary'
    },
    {
      name: 'Maintenance',
      price: '200€ / mois',
      description: 'Support continu et mises à jour pour votre site web',
      icon: <Shield className="h-8 w-8" />,
      features: [
        'Mises à jour régulières',
        'Surveillance de sécurité',
        'Optimisation des performances',
        'Mises à jour de contenu',
        'Corrections de bugs',
        'Rapports mensuels',
        'Support prioritaire',
        'Gestion des sauvegardes'
      ],
      popular: false,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Sur-mesure',
      price: 'Sur devis',
      description: 'Solutions adaptées à vos besoins spécifiques',
      icon: <Sparkles className="h-8 w-8" />,
      features: [
        'Besoins personnalisés',
        'Architecture scalable',
        'Intégrations avancées',
        'Collaboration d’équipe',
        'Support étendu',
        'Fonctionnalités personnalisées',
        'Conseil inclus',
        'Révisions illimitées'
      ],
      popular: false,
      gradient: 'from-purple-500 to-pink-500',
      special: true
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Services & Forfaits
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choisissez la formule idéale pour votre projet
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <Card className={`glass-morphism h-full relative overflow-hidden ${
                service.popular ? 'neon-glow' : 'hover:neon-glow-sm'
              } transition-all duration-300`}>
                {service.popular && (
                  <div className="absolute top-0 left-0 right-0">
                    <div className="bg-gradient-to-r from-primary to-secondary text-center py-2">
                      <Badge className="bg-white text-primary">Le plus populaire</Badge>
                    </div>
                  </div>
                )}

                <div className="p-8 space-y-6">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${service.gradient} flex items-center justify-center text-white mb-4`}>
                    {service.icon}
                  </div>

                  {/* Header */}
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{service.name}</h3>
                    <p className="text-muted-foreground mt-2">{service.description}</p>
                  </div>

                  {/* Price */}
                  <div className="text-center">
                    <div className={`text-3xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                      {service.price}
                    </div>
                    {service.name !== 'Sur-mesure' && service.name !== 'Maintenance' && (
                      <p className="text-sm text-muted-foreground mt-1">Paiement unique</p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: (index * 0.1) + (featureIndex * 0.05) }}
                        viewport={{ once: true }}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="pt-6">
                    {service.special ? (
                      <Button
                        onClick={scrollToContact}
                        className="w-full neon-glow bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                        size="lg"
                      >
                        Discutons-en
                      </Button>
                    ) : (
                      <Button
                        onClick={scrollToContact}
                        className={`w-full ${
                          service.popular 
                            ? 'neon-glow bg-primary hover:bg-primary/90 text-primary-foreground' 
                            : 'variant-outline border-primary/50 text-primary hover:bg-primary/10'
                        }`}
                        variant={service.popular ? 'default' : 'outline'}
                        size="lg"
                      >
                        Commencer
                      </Button>
                    )}
                  </div>
                </div>

                {/* Animated background effect (non-interactive to allow clicks) */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass-morphism p-8 rounded-xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Pourquoi choisir mes services ?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-foreground">Livraison rapide</h4>
                <p className="text-sm text-muted-foreground">Délais courts sans compromis sur la qualité</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-foreground">Qualité assurée</h4>
                <p className="text-sm text-muted-foreground">Design pixel-perfect et code propre, optimisé</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-foreground">Support continu</h4>
                <p className="text-sm text-muted-foreground">Accompagnement même après la livraison</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;