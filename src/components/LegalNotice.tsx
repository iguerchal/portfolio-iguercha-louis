import React from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from './ui/dialog';

const LegalNotice = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md px-3 py-1 transition-colors duration-300"
        >
          Mentions légales
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-morphism border-primary/20">
        <div className="flex items-start justify-between gap-4">
          <DialogTitle className="text-2xl font-bold text-primary">
            Mentions légales
          </DialogTitle>
          <DialogClose asChild>
            <button
              type="button"
              aria-label="Fermer"
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md p-1 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogClose>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
          <section className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">Éditeur du site</h3>
            <p>
              Louis Iguercha — Micro-entreprise (auto-entrepreneur). SIRET :{' '}
              <span className="text-foreground">99230872600015</span>. Siège : Montpellier,
              France — adresse du siège communiquée sur demande (siège au domicile, non publié
              pour raisons de confidentialité, conformément au droit applicable aux entrepreneurs
              individuels). Email :{' '}
              <a href="mailto:louis.leborgne2@gmail.com" className="text-primary hover:underline">
                louis.leborgne2@gmail.com
              </a>
              . Tél :{' '}
              <a href="tel:+33783719705" className="text-primary hover:underline">
                +33 7 83 71 97 05
              </a>
              .
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">Directeur de la publication</h3>
            <p>Louis Iguercha.</p>
          </section>

          <section className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">Hébergeur</h3>
            <p>
              GitHub Pages — GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107,
              USA.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">Propriété intellectuelle</h3>
            <p>
              L'ensemble du contenu (textes, images, code, design) est la propriété de l'éditeur,
              sauf mention contraire ; toute reproduction sans autorisation est interdite.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">Données personnelles (RGPD)</h3>
            <p>
              Le formulaire de contact transmet nom, email et message via le service EmailJS
              (sous-traitant) directement vers la boîte email de l'éditeur ; aucune base de données
              ni revente. Droits d'accès, rectification et suppression en écrivant à{' '}
              <a href="mailto:louis.leborgne2@gmail.com" className="text-primary hover:underline">
                louis.leborgne2@gmail.com
              </a>
              .
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">Cookies</h3>
            <p>Site statique sans cookies de suivi / traçage publicitaire.</p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LegalNotice;
