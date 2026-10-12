<a name="readme-top"></a>
<!-- TECHONOLOGIES -->
<!--
*** Voir en fin de fichier pour les références
-->
[![Nuxt][Nuxt.com]][Nuxt-url]
[![Vue][Vue.js]][Vue-url]
[![Typescript][Typescript.org]][Typescript-url]


<!-- INFORMATION PROJET -->
# Tomsjac.info 

----------------------
<!-- DETAILS -->
## A propos du projet

Page de présentation de Thomas Jacquey

----------------------
<!-- DEMARRAGE -->
## Démarrage du projet

### Installation

#### 1/ Cloner le projet

A partir de la branche : `main-2_x`

```
git clone --branch main-2_x https://github.com/tomsjac/tomsjac.info.git tomsjac
```

#### 2/ Initialisation

Lancer les commandes
```bash
npm install
npm run dev
```

Allez sur l'url 
```
http://localhost:3000
```



----------------------
## Correctif de sécurité des dépendances Git

`simple-git` est forcé à la version 4.0.2 via `overrides` pour corriger les
vulnérabilités critiques de la branche 3.x et de son analyseur d’arguments.
Nuxt DevTools stable 3.4.2 utilise encore l’export par défaut supprimé en v4.
Le script `scripts/patch-devtools.mjs`, exécuté avant `nuxt prepare` lors de
l’installation, remplace cet import par l’export nommé officiel `simpleGit`.
Le correctif est idempotent et refuse une version de DevTools ou un contenu
inattendus, afin d’obliger à revoir la compatibilité lors d’une mise à jour.
Il peut être retiré avec l’override lorsque DevTools stable adoptera la v4.

----------------------
## Tests de traduction

Les tests Playwright vérifient les traductions françaises et anglaises, les titres
et les infobulles, la priorité de la préférence enregistrée sur la langue du
navigateur, ainsi que le changement de langue avec `setLocale` et sa persistance.
Le portfolio ne possède pas de sélecteur de langue : le test appelle l’API du module.

```bash
npm ci
npx playwright install chromium
npm run test:i18n
```

Les tests démarrent et arrêtent leur propre serveur Nuxt sur le port 3100.
Les polices externes sont bloquées pendant les tests pour éviter une dépendance
au réseau. Pour utiliser un Chromium déjà installé :

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:i18n
```

----------------------
<!-- USAGE EXAMPLES -->
## Utilisation

### Recommandation

- Language de nommage : [![EN][I18nEn-logo]][I18nEn-url]
- Language de commentaire : [![EN][I18nEn-logo]][I18nEn-url]
- Language de documentation : [![FR][I18nFr-logo]][I18nFr-url]


----------------------
<!-- CONTACT -->
## Contact

| Qui                            | Contact              | Fonction    |
|:-------------------------------|:---------------------|:------------|
| Thomas jacquey                 | contact@tomsjac.info | Developpeur |   

<!-- MARKDOWN LINKS & IMAGES 
     *** https://github.com/simple-icons/simple-icons/blob/develop/slugs.md 
     *** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- Technologies -->
[Nuxt.com]: https://img.shields.io/badge/Nuxt_3-002E3B?style=for-the-badge&logo=nuxtdotjs&logoColor=#00DC82
[Nuxt-url]: https://nuxt.com/docs/getting-started/introduction
[Vue.js]: https://img.shields.io/badge/Vue.js_3-35495E?style=for-the-badge&logo=vuedotjs
[Vue-url]: https://vuejs.org/guide/introduction.html
[Typescript.org]: https://img.shields.io/badge/Typescript-FFF?style=for-the-badge&logo=typescript
[Typescript-url]: https://www.typescriptlang.org/

<!-- Recommandation -->
[I18nFr-logo]: https://flagcdn.com/20x15/fr.png
[I18nFr-url]: #recommandation
[I18nEn-logo]: https://flagcdn.com/20x15/gb.png
[I18nEN-url]: #recommandation
