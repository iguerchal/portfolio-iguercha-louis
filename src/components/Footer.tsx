import React from 'react';
import { motion } from 'motion/react';
import { Heart, ArrowUp } from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center space-x-2 text-muted-foreground"
          >
            <span>© {currentYear} Iguercha Louis. Fait avec</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-red-500"
            >
              <Heart className="h-4 w-4 fill-current" />
            </motion.div>
            <span>et beaucoup de café</span>
          </motion.div>

          {/* Back to top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button
              onClick={scrollToTop}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary group"
            >
              <span className="mr-2">Haut de page</span>
              <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        />
      </div>

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-48 bg-primary/5 rounded-full blur-3xl" />
      </div>
    </footer>
  );
};

export default Footer;