# [Tomsjac Portfolio](http://www.tomsjac.info)

## Préambule
Ce repository  est le code source du site tomsjac.info, il est composé :
 - d'un mini framework PHP réalisé de A à Z spécialement pour ce projet utilisant des librairies externes comme Mustache
 - d'un mini framework JS réalisé de A à Z spécialement pour ce projet

Le site est en full Ajax, mais reste fonctionnellement si le JavaScript est désactivé ou pour le référencement naturel de chaque page.

 
**Mais Pourquoi avoir fait un mini framework Php Ou Js ? Alors que ca existe déjà ?**
A quoi cela sert de faire un portfolio de développeur, si on ne montre pas un minimum comment on code !
  

## Design
Ne voulant pas partir sur une style graphique conventionnel pour un portfolio (Material design, parallaxe, single Page ...)
J'ai voulu me lancer un défi, pourquoi ne pas faire un site ne respectant pas les codes habituels et utiliser pour zone de 
contenu un cercle tout en essayant de garder une cohérence avec le thème graphique. 
J’espère que le challenge est relevé et que cela vous plaira. 


## Framework PHP

**Configuration**

        - Version  :  7.0
        - Template : Mustache
        - Composer : MobileDetect / JsMin / LessPhp / Css minify / Mustache / HttpFoundation ...
   
**Fonctionnalités**

        - Controller principal
        - Controller pour chaque page
        - Système de routage simple basé sur les url
        - Gestion des assets (Script & Style)
        - Gestion de rendu interfacé avec Mustache

## Framework JS

**Configuration**

        - Template : Mustache
        - Librairies externes : Require / Modernizr / Reqwest

**Fonctionnalités**

        - Controller principal
        - Controller pour chaque page
        - Système de routage simple basé sur les url

## Style

**Configuration**

        - Préprocesseur : Less
        - Icônes : Fontello
        - Librairies externes : normalize