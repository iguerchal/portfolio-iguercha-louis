import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="relative">
        <Hero />
        
        {/* Section divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <About />
        
        {/* Section divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
        
        <Skills />
        
        {/* Section divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <Projects />
        
        {/* Section divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
        
        <Services />
        
        {/* Section divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <Contact />
      </main>
      
      <Footer />
      
      {/* Global background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
    </div>
  );
}