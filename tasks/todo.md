# Portfolio — Plan de corrections (retours d'un reviewer)

> **But de ce fichier** : spec exécutable pour `/goal`. Chaque item a : la **cause réelle dans le code**, le **fichier:ligne**, le **changement précis**, et un **critère d'acceptation** vérifiable. On reprend l'existant, on touche au minimum, jamais en vrac.
>
> **Stack** : Vite + React 18 + TS, Tailwind v4 (`@theme inline` dans `globals.css`, **pas** de `tailwind.config`), Radix/shadcn, Framer Motion (`motion/react`). Pas de tsc / lint / tests. Déploiement GitHub Pages (`npm run deploy` → branche `gh-pages`). Live : https://iguerchal.github.io/portfolio-iguercha-louis/

## Décisions validées (par Louis)
1. **Mode clair = vrai mode clair** (on garde le toggle Soleil/Lune, on construit une palette claire cohérente). PAS de suppression du toggle.
2. **Mentions légales = modal ouverte depuis le footer** (composant `Dialog` existant, zéro nouvelle dépendance, zéro routing).
3. **Statut légal = Micro-entreprise / Auto-entrepreneur** → SIRET + adresse à mettre en `[À COMPLÉTER]` (Louis fournira les valeurs exactes).

## Info pour Louis (pas une tâche)
- L'outil que le reviewer a utilisé pour détecter la stack = **Wappalyzer** (extension navigateur). Rien à corriger.
- Points positifs du reviewer à NE PAS toucher : la **constellation de compétences** (graph.png, "bonne idée originale") et la **photo** du hero. On les garde.

## ⚠️ RÈGLE D'OR — ZÉRO RÉGRESSION (priorité absolue)
Le site est **déjà visuellement réussi**. Aucune de ces modifs ne doit casser ou retirer un élément visible.
- On ne **supprime AUCUNE fonctionnalité ni section visible** (hero, photo, constellation, projets, services, contact, animations, dégradés de titres, néons…). Le mode SOMBRE doit rester **pixel pour pixel identique** à aujourd'hui.
- La quasi-totalité des modifs passe par les **variables CSS** (`globals.css`) et des classes utilitaires ciblées → risque faible et réversible. On ne réécrit pas de composant.
- Le **mode clair s'ajoute** au sombre, il ne le remplace pas. Le défaut reste **sombre**.
- Toute modif est **scopée** : on ne touche pas aux variantes globales de `ui/button.tsx` ni `ui/badge.tsx` (régressions possibles ailleurs) — on corrige au site d'usage.
- Avant suppression de "code mort" (Tâche 8) : **prouver** que c'est inutilisé (grep) ; si le moindre doute → on garde.
- Vérif obligatoire après chaque tâche : `npm run dev` + comparer visuellement avec l'existant en **mode sombre** (doit être inchangé), puis tester le **mode clair**. En cas de souci visuel → STOP et re-planifier, ne pas forcer.

## ⚠️ CONTRAINTE — NE PAS DÉGRADER LIGHTHOUSE (viser le max)
Le site vise un Lighthouse maximal (Performance / Accessibilité / Best Practices / SEO). Les 4 scores doivent rester ≥ à l'existant, idéalement 100.
- **Performance** : ne RIEN ajouter de lourd. Pas de nouvelle dépendance (ni `next-themes` ni routeur). Le mode clair = uniquement des variables CSS (coût nul). LegalNotice = composant local léger réutilisant `Dialog` déjà inclus. Conserver `loading="lazy"` / `decoding="async"` sur les images, `fetchPriority="high"` sur le portrait, et les dimensions d'images existantes (pas de CLS).
- **Accessibilité (WCAG AA)** : le contraste texte/fond doit passer AA **dans les DEUX thèmes**. Vérifier en particulier en mode clair : `--foreground (#1a1424)` sur `--background (#f7f7fb)` ✓, `.text-primary (#7c22ce)` sur fonds clairs ✓, `--muted-foreground (#5b5470)` ✓, texte blanc sur boutons `--primary (#8a2be2)` ✓. La modale mentions légales : `DialogTitle` présent (déjà géré par le composant), trigger avec libellé accessible. Ne pas casser les `aria-label` ajoutés au commit précédent.
- **Best Practices** : zéro erreur console. Éviter le flash de thème au chargement (FOUC/flash blanc) qui peut nuire à l'UX et au CLS → appliquer la classe de thème **avant** le rendu via un mini-script inline dans `index.html` (lit `localStorage.theme`, défaut sombre). Garder ce script minuscule.
- **SEO** : ne toucher à AUCUNE balise meta / Open Graph / `sitemap.xml` / `robots.txt` / `manifest.json` existants.
- **Vérification** : lancer Lighthouse (DevTools, mode mobile) **avant** (baseline sur la version actuelle) et **après**, sur le build de prod (`npm run build` + preview), comparer les 4 scores. Si un score baisse → corriger avant push.

---

## TÂCHE 1 — Vrai mode clair (le gros morceau)
**Cause** : dans `src/styles/globals.css`, le bloc `:root` contient EXACTEMENT les mêmes valeurs sombres que `.dark`. Le toggle retire la classe `.dark` mais la palette reste sombre, tandis que les utilitaires `dark:` des composants shadcn s'éteignent → état incohérent / illisible (= les fonds clairs + boîtes blanches vides des screenshots survol.png / survol2.png). De plus `App.tsx` force `dark` à chaque montage et le choix n'est pas persisté.

### 1a. `src/styles/globals.css` — remplir `:root` avec une vraie palette CLAIRE
Remplacer les valeurs du bloc `:root` (lignes ~3-49) par une palette claire. Garder `.dark` (lignes ~51-86) tel quel pour le sombre. Valeurs cibles pour `:root` :
```
--background: #f7f7fb;
--foreground: #1a1424;
--card: rgba(255, 255, 255, 0.75);
--card-foreground: #1a1424;
--popover: #ffffff;
--popover-foreground: #1a1424;
--primary: #8a2be2;            /* inchangé : fond des boutons violets */
--primary-foreground: #ffffff; /* texte blanc sur boutons violets */
--secondary: #ff6bff;
--secondary-foreground: #2a0a3a;
--muted: #ece8f5;
--muted-foreground: #5b5470;
--accent: #8a2be2;
--accent-foreground: #ffffff;
--destructive: #e11d48;
--destructive-foreground: #ffffff;
--border: rgba(138, 43, 226, 0.25);
--input: #ffffff;
--input-background: #ffffff;
--switch-background: #cbd5e1;
--ring: #8a2be2;
/* charts : inchangés */
/* sidebar : versions claires (background clair, foreground sombre) */
```
- Glass + néon **doivent devenir dépendants du thème**. Aujourd'hui `--glass-bg`, `--glass-border`, `--neon-glow`, `--neon-primary`, `--neon-secondary` ne sont définis QUE dans `:root`. 
  - Dans `:root` (clair) : `--glass-bg: rgba(255,255,255,0.6); --glass-border: rgba(138,43,226,0.25); --neon-glow: rgba(138,43,226,0.22);` (néon atténué sur fond clair). `--neon-primary` / `--neon-secondary` inchangés.
  - **Ajouter** ces mêmes variables dans le bloc `.dark` avec les valeurs SOMBRES actuelles : `--glass-bg: rgba(26,26,36,0.4); --glass-border: rgba(138,43,226,0.3); --neon-glow: rgba(138,43,226,0.5);`.

### 1b. `src/styles/globals.css` — overrides du bas (lignes ~231-241) à rendre théme-aware
Aujourd'hui `.text-primary { color:#c084fc }` (violet clair) est calibré pour fond SOMBRE ; sur fond clair il est illisible. Remplacer par :
```css
/* clair par défaut : violet plus profond pour le contraste sur fond clair */
.text-primary { color: #7c22ce; }
.hover\:text-primary:hover { color: #7c22ce; }
.border-primary\/50 { border-color: rgba(124,34,206,0.5); }
/* sombre : violet clair lumineux */
.dark .text-primary { color: #c084fc; }
.dark .hover\:text-primary:hover { color: #c084fc; }
.dark .border-primary\/50 { border-color: rgba(192,132,252,0.6); }
```

### 1c. Persistance du thème (sinon retombe en sombre au reload)
- `src/App.tsx` (lignes 12-15) : au lieu de toujours ajouter `dark`, lire `localStorage.getItem('theme')` ; défaut = `dark` si absent.
  ```ts
  const saved = localStorage.getItem('theme');
  const isDark = saved ? saved === 'dark' : true;
  document.documentElement.classList.toggle('dark', isDark);
  ```
- `src/components/Navigation.tsx` : initialiser `isDark` depuis `localStorage` (défaut `true`) et, dans `toggleTheme`, faire `localStorage.setItem('theme', next ? 'dark' : 'light')`.
- (Optionnel anti-FOUC) un petit script inline dans `index.html` avant le rendu qui applique la classe. Faire seulement si simple.

**Critère d'acceptation T1** : toggler Soleil/Lune change réellement fond/texte/cartes de façon cohérente ; AUCUN texte ni icône invisible dans l'un OU l'autre thème ; le choix persiste après refresh ; `npm run dev` sans erreur.

---

## TÂCHE 2 — « Beaucoup de choses disparaissent au survol » (survol.png / survol2.png)
**Cause** : variante `ghost` du Button (`src/components/ui/button.tsx` l.20) applique `hover:bg-accent` ; `--accent` = `#8a2be2` (violet plein). Aux endroits où on surcharge avec `hover:text-primary` (violet clair), on obtient **violet clair sur violet plein → l'icône/texte disparaît** (le carré violet de survol2.png). Fix **scopé** aux sites concernés (ne PAS modifier la variante globale, sinon régression des ghosts qui marchent).

Ajouter `hover:bg-primary/10` à chaque bouton ghost ci-dessous (le tint clair remplace le violet plein, l'icône reste visible dans les 2 thèmes) :
- `src/components/Projects.tsx` l.~298-307 (bouton `ExternalLink`) et l.~308-317 (bouton `Github`).
- `src/components/Projects.tsx` l.~390-398 (bouton de fermeture `X` de la modale projet).
- `src/components/Footer.tsx` l.~43-51 (bouton « Haut de page » : sinon le texte vire violet sur violet).
- `src/components/Navigation.tsx` l.~93-101 (toggle thème) et l.~104-114 (bouton menu mobile).

**Critère d'acceptation T2** : survoler chaque bouton icône (projets, fermeture modale, footer, nav) → l'icône/texte reste parfaitement visible, en clair ET en sombre.

---

## TÂCHE 3 — Lisibilité des badges de compétences (contraste)
**Cause** : `src/components/Skills.tsx` l.126-131 — `Badge variant="secondary"` impose `text-secondary-foreground` (sombre #0f0f12) tandis que `glass-morphism` met un fond sombre transparent → texte sombre sur fond sombre, peu lisible en mode sombre.
**Fix** : ajouter `text-foreground` à la className du `Badge` (le nom de compétence prend la couleur de texte du thème). 

**Critère d'acceptation T3** : tous les noms de compétences du nuage sont nets en clair et en sombre.

---

## TÂCHE 4 — Padding manquant sur la carte « Le plus populaire » (padding.png)
**Cause** : `src/components/Services.tsx` — le bandeau « Le plus populaire » est en `absolute top-0` (l.122-128) et chevauche le contenu ; l'icône (rond avec étoile) démarre trop haut et se fait rogner par `overflow-hidden`.
**Fix** : sur le `<div className="p-8 space-y-6">` (l.130), ajouter un padding-top conditionnel pour la carte populaire :
```tsx
<div className={`p-8 space-y-6 ${service.popular ? 'pt-16' : ''}`}>
```

**Critère d'acceptation T4** : sur la carte « Pro », l'icône ronde est entièrement visible avec un espace net sous le bandeau ; pas de rognage.

---

## TÂCHE 5 — Hero sur mobile « discutable » (hero_tel.png)
**Causes** : portrait en taille fixe `w-80 h-80` (320px) trop gros sur petit écran ; l'icône du bouton « Me contacter » est un `Download` (trompeur : ça scrolle vers le contact, ça ne télécharge rien).
**Fix** dans `src/components/Hero.tsx` :
- Portrait l.138 `w-80 h-80` → `w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80`.
- Conteneur des éléments en orbite l.152 `w-80 h-80` → mêmes classes responsives `w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80` (doit matcher le portrait, sinon les points orbitent de travers).
- Bouton « Me contacter » l.123 : remplacer `<Download .../>` par `<Mail .../>` ; mettre à jour l'import l.3 (`Download` → `Mail`, retirer `Download` s'il n'est plus utilisé ailleurs).

**Critère d'acceptation T5** : à 375px de large, pas de scroll horizontal, portrait ~224px (équilibré), bouton « Me contacter » avec icône enveloppe (Mail).

---

## TÂCHE 6 — Tooltips de la constellation (contraste, lié au mode clair)
**Cause** : `src/components/About.tsx` l.120-122 et l.301-303 — le `<span>` tooltip utilise `bg-background` et hérite `text-primary-foreground` du bouton parent → couleurs non garanties contrastées selon le thème.
**Fix** : rendre explicite avec les couleurs popover :
- l.120 : `bg-background` → `bg-popover text-popover-foreground`.
- l.301 : `bg-background/90` → `bg-popover/95 text-popover-foreground`.

**Critère d'acceptation T6** : survoler une étoile affiche le nom de la compétence, lisible en clair et en sombre.

---

## TÂCHE 7 — Mentions légales (modal depuis le footer)
**Fix** : nouveau composant + lien footer. Aucune dépendance ni route ajoutée.

### 7a. Nouveau fichier `src/components/LegalNotice.tsx`
Composant auto-contenu rendant un `Dialog` (de `./ui/dialog`) avec un `DialogTrigger` stylé en lien de footer, et un `DialogContent` scrollable (`max-h-[85vh] overflow-y-auto glass-morphism`) contenant `DialogTitle` = « Mentions légales » et le texte ci-dessous. Style cohérent avec le thème (utiliser `text-foreground` / `text-muted-foreground`, titres en `text-primary`).

**Contenu (FR, auto-entrepreneur)** :
- **Éditeur du site** : Louis Iguercha — Micro-entreprise (auto-entrepreneur). SIRET : **99230872600015**. Siège : Montpellier, France — *adresse du siège communiquée sur demande* (siège au domicile, non publié pour raisons de confidentialité, conformément au droit applicable aux entrepreneurs individuels). Email : louis.leborgne2@gmail.com. Tél : +33 7 83 71 97 05.
- **Directeur de la publication** : Louis Iguercha.
- **Hébergeur** : GitHub Pages — GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.
- **Propriété intellectuelle** : l'ensemble du contenu (textes, images, code, design) est la propriété de l'éditeur, sauf mention contraire ; toute reproduction sans autorisation est interdite.
- **Données personnelles (RGPD)** : le formulaire de contact transmet nom, email et message via le service **EmailJS** (sous-traitant) directement vers la boîte email de l'éditeur ; aucune base de données ni revente. Droits d'accès, rectification et suppression en écrivant à louis.leborgne2@gmail.com.
- **Cookies** : site statique sans cookies de suivi / traçage publicitaire.

> Nom légal confirmé : **Louis Iguercha**. SIRET réel fourni. Adresse postale volontairement non publiée (vitrine sans vente en ligne). Contenu mentions légales = DÉFINITIF, aucun placeholder restant.

### 7b. `src/components/Footer.tsx`
Importer `LegalNotice` et insérer le lien dans la ligne du footer (ex. entre le copyright et « Haut de page », ou en élément central). Le trigger : lien discret `text-muted-foreground hover:text-primary` + `hover:bg-primary/10` (cohérent T2).

**Critère d'acceptation T7** : un lien « Mentions légales » est visible dans le footer ; au clic, une modale s'ouvre avec tout le contenu, scrollable, fermable (clic extérieur + croix), lisible dans les 2 thèmes.

---

## TÂCHE 8 — Nettoyage du code mort (prudent, vérifié)
Supprimer UNIQUEMENT ce qui est prouvé inutilisé (grep fait, aucun impact visuel ni fonctionnel) :
- `src/components/Projects.tsx` l.10-11 : constante `gradientPlaceholderImage` — jamais référencée. Supprimer.
- `src/components/Skills.tsx` l.~56-82 : le `useMemo` `constellation` (+ commentaire) — plus rendu (constellation déplacée dans About, cf. commentaire l.145). Supprimer. ⚠️ GARDER `getSkillId` (utilisé l.129) et `allSkills` (utilisé l.111). Retirer l'import `useMemo` SEULEMENT s'il n'est plus utilisé après coup.
- `src/components/About.tsx` l.4 : retirer `Download` de l'import lucide (jamais utilisé). GARDER `Star`, `Maximize2`, `X`.
- `src/components/Hero.tsx` : import `Download` déjà remplacé par `Mail` en Tâche 5 → s'assurer qu'aucun `Download` orphelin ne reste.
- Ne PAS toucher à la duplication `allSkills`/`constellation` entre About et Skills : ce sont deux usages distincts (constellation = About, nuage = Skills). Pas de refactor risqué.
Après suppression : `npm run dev` doit compiler sans warning d'import inutilisé et le rendu doit être identique.

**Critère d'acceptation T8** : build OK, aucune régression visuelle, aucun import/variable inutilisé restant parmi ceux listés.

## Vérification (obligatoire avant push)
1. `npm run dev` (port 3000). 
2. **Audit survol** : passer la souris sur TOUS les boutons icônes (projets, modale, footer, nav, étoiles constellation) → rien ne disparaît. À refaire **en mode clair ET en mode sombre** (toggle Soleil/Lune).
3. **Audit mode clair** : toggler → vérifier fonds, textes, cartes, badges, dégradés de titres, formulaire de contact, modale mentions légales. Aucun texte invisible. Refresh → le thème persiste.
4. **Mobile 375px** (DevTools responsive) : hero équilibré, pas de scroll horizontal, carte « Pro » non rognée.
5. Aucune erreur console / build.

## Build & déploiement
1. `npm run build` (sort dans `build/`).
2. Commit des sources + build sur `main` :
   - branche courante = `main` ; message type : `fix(ui): mode clair, contrastes survol, padding services, hero mobile, mentions légales`.
   - `git add -A && git commit && git push origin main`.
3. `npm run deploy` (→ `predeploy` rebuild + `gh-pages -d build` pousse sur la branche `gh-pages`).
4. Vérifier en live : https://iguerchal.github.io/portfolio-iguercha-louis/ (les changements peuvent prendre 1-2 min à apparaître ; hard refresh Ctrl+F5).
5. Terminer Co-Authored-By comme requis dans les commits.

---

## Section review (remplie par /goal)

### ⚠️ Découverte critique (corrige la prémisse du plan)
`src/styles/globals.css` **n'est importé NULLE PART** (mort). La vraie feuille de style est
`src/main.tsx → src/index.css`, un **Tailwind v4 PRÉ-COMPILÉ statiquement** (en-tête
`/*! tailwindcss v4.1.3 */`). **Aucun compilateur Tailwind ne tourne au build** (pas de plugin
vite, pas de dépendance tailwindcss). Conséquences :
- Le **mode clair existait déjà** dans `index.css` (bloc `:root` clair l.~2753 surchargé par `.dark`).
  La prémisse « :root = valeurs sombres » du plan visait le fichier mort. Toggle déjà fonctionnel.
- Le **vrai** bug de contraste : `.text-primary { color: var(--primary) }` (#8a2be2) dans index.css,
  jamais surchargé (le commit « WCAG AA » avait édité globals.css = mort) → échec contraste live.
- **Toute classe utilitaire NOUVELLE doit déjà être pré-compilée** sinon elle n'existe pas
  (`w-56`, `h-56`, `sm:/lg:` de taille, `pt-16` étaient absentes → photo géante/ovale signalée).
- Correctifs CSS réellement appliqués dans `src/index.css` (bloc commenté en fin de fichier) :
  override `.text-primary` theme-aware (clair #7c22ce / sombre #c084fc), `pt-16`, `w-56/h-56`,
  `sm:w-72/sm:h-72`, `lg:w-80/lg:h-80`, et `html,body{overflow-x:clip}` (anti-scroll horizontal mobile).
- `globals.css` restauré à HEAD (fichier mort, edits sans effet).

### Statut
- [x] T1 mode clair — vérifié clair (bg #fff) / sombre (bg #0f0f12), toggle **persiste** (localStorage + anti-FOUC)
- [x] T2 survol — `hover:bg-primary/10` (classe déjà compilée) sur projets/modale/footer/nav
- [x] T3 badges skills — `text-foreground` (gagne via twMerge)
- [x] T4 padding services — `pt-16` conditionnel ; icône carte « Pro » entièrement visible (vérifié capture)
- [x] T5 hero mobile — portrait cercle **224px** (375px) / 320px (desktop), icône **Mail**, **0 scroll horizontal**
- [x] T6 tooltip constellation — `bg-popover text-popover-foreground` (classes compilées)
- [x] T7 mentions légales — modale ouverte depuis footer, titre + SIRET + hébergeur, scrollable, fermable
- [x] T8 nettoyage code mort — `gradientPlaceholderImage`, `Download` (About/Hero), `useMemo`/constellation (Skills) ; build OK
- [x] Bonus a11y — aria-labels pagination (Projects) + `aria-label` Select (Contact) → corrige `button-name`
- [x] Vérif (clair + sombre + mobile 375) — cercle ratio 1.0 partout, **0 erreur console**, zéro régression sombre
- [x] Lighthouse (mobile, build prod) : **A11y 90→100**, **Best Practices 100**, **SEO 100** maintenus ;
      Performance bornée par les **images** (next-gen/sizing, préexistant) — diff CSS/JS neutre en poids (JS 451≈450KB)
- [x] Build + push main + deploy gh-pages + check live

### Note vérification
Vérification déterministe via Chrome headless + `puppeteer-core` (installé `--no-save`, non commité) :
mesure des dimensions du portrait, détection débordement, captures clair/sombre/mobile, écoute des erreurs console.
