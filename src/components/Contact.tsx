import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MessageSquare, Github, Send, MapPin, Phone, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

// Instagram multicolor icon
const InstagramColorIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="igGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f58529" />
        <stop offset="30%" stopColor="#feda77" />
        <stop offset="50%" stopColor="#dd2a7b" />
        <stop offset="70%" stopColor="#8134af" />
        <stop offset="100%" stopColor="#515bd4" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#igGradient)" />
    <rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="#ffffff" strokeWidth="2" />
    <circle cx="12" cy="12" r="3.5" fill="none" stroke="#ffffff" strokeWidth="2" />
    <circle cx="16.5" cy="7.5" r="1.2" fill="#ffffff" />
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setStatus('Envoi en cours…');
      const serviceId = 'service_m1p59ug';
      const templateId = 'template_ch93vju';
      const publicKey = 'sqzU0CzsWmk3sEXjk';
      const payload = {
        from_name: formData.name,
        reply_to: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'louis.leborgne2@gmail.com'
      };
      await emailjs.send(serviceId, templateId, payload, { publicKey });
      setStatus('Message envoyé. Merci !');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(true);
    } catch (err) {
      setStatus('Échec de l’envoi. Vérifiez la configuration EmailJS.');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const socialLinks = [
    {
      name: 'Email',
      icon: <Mail className="h-5 w-5" />,
      href: 'mailto:louis.leborgne2@gmail.com',
      color: 'from-red-500 to-pink-500'
    },
    {
      name: 'Instagram',
      icon: <InstagramColorIcon className="h-6 w-6" />,
      href: 'https://www.instagram.com/louigch',
      color: 'from-pink-500 to-purple-500'
    },
    {
      name: 'GitHub',
      icon: <Github className="h-5 w-5" />,
      href: 'https://github.com/iguerchal',
      color: 'from-gray-700 to-gray-900'
    },
    {
      name: 'WhatsApp',
      icon: <MessageSquare className="h-5 w-5" />,
      href: 'https://wa.me/33783719705',
      color: 'from-green-500 to-green-600'
    }
  ];

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5" />,
      label: 'Localisation',
      value: 'Montpellier, France'
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: 'Téléphone',
      value: '+33 7 83 71 97 05'
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: 'Email',
      value: 'louis.leborgne2@gmail.com'
    }
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Travaillons ensemble
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Prêt à concrétiser votre vision ? Parlons de votre projet et créons quelque chose d’exceptionnel.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="glass-morphism p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Envoyer un message</h3>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="contact-form"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                  >
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nom</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="glass-morphism border-primary/20 focus:border-primary"
                            placeholder="Votre nom"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="glass-morphism border-primary/20 focus:border-primary"
                            placeholder="votre@email.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Sujet</Label>
                        <Select onValueChange={(value) => handleInputChange('subject', value)}>
                          <SelectTrigger className="glass-morphism border-primary/20 focus:border-primary">
                            <SelectValue placeholder="Sélectionnez un sujet" />
                          </SelectTrigger>
                          <SelectContent className="glass-morphism border-primary/20">
                            <SelectItem value="web-development">Développement web</SelectItem>
                            <SelectItem value="ui-ux-design">Design UI/UX</SelectItem>
                            <SelectItem value="consultation">Consultation</SelectItem>
                            <SelectItem value="maintenance">Maintenance de site</SelectItem>
                            <SelectItem value="other">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          className="glass-morphism border-primary/20 focus:border-primary min-h-[120px]"
                          placeholder="Parlez-moi de votre projet..."
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full neon-glow bg-primary hover:bg-primary/90 text-primary-foreground"
                        size="lg"
                      >
                        <Send className="mr-2 h-5 w-5" />
                        Envoyer le message
                      </Button>
                    </form>

                    {status && (
                      <div className="mt-4 text-sm text-muted-foreground" aria-live="polite">{status}</div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="contact-success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.28 }}
                    className="space-y-4 text-center"
                  >
                    <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="h-8 w-8 text-green-500" />
                    </div>
                    <h4 className="text-2xl font-semibold text-foreground">Merci, votre message a bien été envoyé !</h4>
                    <p className="text-muted-foreground">Je vous réponds rapidement à l’adresse indiquée.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <Card className="glass-morphism p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Informations de contact</h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-primary-foreground">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{info.label}</div>
                      <div className="font-medium text-foreground">{info.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Social Links */}
            <Card className="glass-morphism p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Réseaux & contact</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className={`glass-morphism p-6 rounded-xl hover:neon-glow-sm transition-all duration-300 border-2 border-transparent hover:border-primary/30`}>
                      <div className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-full flex items-center justify-center text-white mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        {social.icon}
                      </div>
                      <div className="text-center font-medium text-foreground group-hover:text-primary transition-colors">
                        {social.name}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </Card>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-morphism p-6 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-500 font-medium">Disponible pour des projets</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Actuellement disponible pour de nouveaux projets
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-48 h-48 bg-secondary/10 rounded-full blur-2xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;