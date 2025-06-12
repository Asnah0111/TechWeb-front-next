# TechWeb Frontend

Ce dépôt contient le code source du **frontend** de TechWeb, développé avec [Next.js](https://nextjs.org/) et React.  
Il s’agit de la partie visible du site, qui dialogue avec une API backend pour afficher les produits, gérer le panier, etc.

---

## Installation rapide

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/Asnah0111/TechWeb-front-next.git
   cd TechWeb-front-next
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou : yarn install
   ```

3. **Lancer l’application**
   ```bash
   npm run dev
   # ou : yarn dev
   ```
   L’application sera accessible par défaut sur [http://localhost:3000](http://localhost:3000)

---

## Détails de développement

- **Structure du projet**
  - Les pages principales sont dans `/app` (Next.js App Router).
  - Les composants réutilisables sont dans `/components`.
  - Les fichiers CSS sont en modules (`*.module.css`) pour un style encapsulé.
  - Les images statiques sont dans `/public/img`.

- **Appels API**
  - Les données produits sont récupérées depuis un backend local (par défaut `http://localhost:3001/products`).
  - Les appels se font via `fetch` dans les hooks React (`useEffect`).

- **Gestion du panier**
  - Le panier est géré côté client, sauvegardé dans le `localStorage`.
  - Ajout au panier via la fonction utilitaire dans `utils/cart.js`.

- **Responsivité**
  - Les styles sont adaptés pour une expérience mobile et desktop.
  - Les médias queries dans les fichiers CSS ajustent la disposition selon la taille de l’écran.

- **Notifications**
  - L’ajout au panier affiche un toast de confirmation (`<Toast />`).

---

## Scripts utiles

- `npm run dev` : Démarre le serveur de développement
- `npm run build` : Build pour la production
- `npm start` : Sert l’app Next.js en production

---

## Contribuer

1. Fork le repo et clone-le sur ta machine.
2. Crée une branche de fonctionnalité (`git checkout -b ma-fonctionnalite`)
3. Commits tes changements (`git commit -am 'Ajoute une fonctionnalité'`)
4. Push la branche (`git push origin ma-fonctionnalite`)
5. Ouvre une Pull Request sur GitHub.

---

## Notes

- Assure-toi que le backend est lancé et accessible sur le port 3001 pour tester toutes les fonctionnalités.
- Pour les soucis de fins de ligne (LF/CRLF), tu peux configurer le fichier `.gitattributes` pour uniformiser sur tous les postes.

---
