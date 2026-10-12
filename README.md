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
## Correctifs locaux des alertes élevées

Les 13 alertes élevées de l’audit remontent à deux dépendances indirectes dont
les dernières versions npm sont toujours signalées. `npm ci` exécute également
`scripts/patch-security-dependencies.mjs` pour appliquer ces correctifs ciblés :

- `braces` 3.0.3 ([GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)) : limite de profondeur de 128 dans le parseur et les trois parcours récursifs de l’AST, y compris lorsque l’appelant fournit directement un AST. Les motifs excessivement imbriqués lèvent une `SyntaxError` au lieu d’épuiser la pile.
- `node-forge` 1.4.0 ([GHSA-86w9-cpqp-85rv](https://github.com/advisories/GHSA-86w9-cpqp-85rv)) : reprise du contrôle du nombre d’éléments ASN.1 proposé dans [forge#1152](https://github.com/digitalbazaar/forge/pull/1152), commit `ceba34402e329f0365134f23fe19898756527d65`. Les éléments superflus dans `DigestAlgorithm` sont rejetés ; les signatures valides avec ou sans paramètres NULL restent acceptées.

```bash
npm run test:security
```

Les six tests couvrent les motifs normaux, les entrées profondément imbriquées,
les AST fournis directement, les signatures valides, les messages modifiés et
les éléments ASN.1 superflus. Quatre tests échouent sur les paquets non corrigés.
Les scripts vérifient les versions et les fragments attendus, sont idempotents
et échouent si une mise à jour exige de revoir le correctif.

**L’audit npm reste à 13 alertes élevées et zéro critique.** Il ne prend pas en
compte les modifications locales des sources installées. Aucun avertissement
n’est masqué et aucune version n’est falsifiée. Ces correctifs devront être
retirés ou réévalués lorsque des versions corrigées seront publiées en amont.

----------------------
## Tests navigateur et de rendu

La suite Playwright couvre le portfolio sur ordinateur (1280 × 900) et mobile
(Pixel 7 émulé) : sections et illustrations visibles, chargement des 16 icônes
SVG, titres et icônes contenus dans la largeur de l’écran, affichage et fermeture
des infobulles, et ouverture du CV avec le geste adapté au terminal. Elle couvre
également les traductions françaises et anglaises, les titres, la préférence
enregistrée et le changement de langue avec `setLocale` et sa persistance.
Le portfolio ne possède pas de sélecteur de langue : le test appelle l’API du module.

```bash
npm ci
npx playwright install chromium
npm run test:e2e
```

Pour lancer toute la validation (sécurité et navigateur), utilisez `npm test`.
Pour filtrer les tests de traduction :

```bash
npm run test:i18n
```

Les tests démarrent et arrêtent leur propre serveur Nuxt sur le port 3100.
Les polices externes sont bloquées et le lien du CV est intercepté pour éviter
une dépendance au réseau. En cas d’échec, Playwright conserve une capture d’écran
et une trace ; le rapport HTML peut être ouvert avec `npx playwright show-report`.
La CI lance toute la suite et joint ces diagnostics en cas d’échec.
Pour utiliser un Chromium déjà installé :

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
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
