<!DOCTYPE html>
<!--[if lt IE 7 ]> <html class="no-js lt-ie10 lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7 ]> <html lang="fr-FR" class="no-js lt-ie10 lt-ie9 lt-ie8 "> <![endif]-->
<!--[if IE 8 ]> <html lang="fr-FR" class="no-js lt-ie10 lt-ie9"> <![endif]-->
<!--[if IE 9 ]> <html lang="fr-FR" class="no-js lt-ie10"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="fr-FR" class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <!-- SEO HEAD -->
		<title>{{metaContent.title}}</title>
		<meta name="description" content="{{metaContent.description}}" />
		<meta name="author" content="{{metaContent.author}}">
		<meta name="geo.placename" content="{{metaContent.geo.placename}}" />
		<meta name="geo.region" content="{{metaContent.geo.region}}" />

		<!-- Open Graph protocol -->
		<meta property='og:locale' content='{{metaContent.og.locale}}'/>
		<meta property="og:type" content="{{metaContent.og.type}}" />
		<meta property="og:title" content="{{metaContent.og.title}}" />
		<meta property="og:url" content="{{infosEnv.url_web}}" />
		<meta property="og:image" content="{{infosEnv.url_web}}{{metaContent.og.image}}" />
		<meta property="og:site_name" content="{{metaContent.og.site_name}}" />
		<meta property="og:description" content="{{metaContent.og.description}}" />
		
		<!-- twitter -->
		<meta name="twitter:card" content="{{metaContent.twitter.card}}">
		<meta name="twitter:site" content="{{metaContent.twitter.site}}">
		<meta name="twitter:url" content="{{infosEnv.url_web}}">
		<meta name="twitter:title" content="{{metaContent.twitter.title}}">
		<meta name="twitter:description" content="{{metaContent.twitter.description}}">
		<meta name="twitter:image" content="{{infosEnv.url_web}}{{metaContent.twitter.image}}">
		
		<!-- Respond / Mobile -->
		<!-- <meta name="viewport" content="width=device-width">-->
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes"/>
		<meta name="apple-mobile-web-app-capable" content="yes" />

		<!--Icon -->
		<link rel="apple-touch-icon" sizes="57x57" href="{{infosEnv.SCRIPT_NAME}}/img/icon/apple-touch-icon-57x57.png">
		<link rel="apple-touch-icon" sizes="114x114" href="{{infosEnv.SCRIPT_NAME}}/img/icon/apple-touch-icon-114x114.png">
		<link rel="apple-touch-icon" sizes="72x72" href="{{infosEnv.SCRIPT_NAME}}/img/icon/apple-touch-icon-72x72.png">
		<link rel="apple-touch-icon" sizes="144x144" href="{{infosEnv.SCRIPT_NAME}}/img/icon/apple-touch-icon-144x144.png">
		<link rel="apple-touch-icon" sizes="60x60" href="{{infosEnv.SCRIPT_NAME}}/img/icon/apple-touch-icon-60x60.png">
		<link rel="apple-touch-icon" sizes="120x120" href="{{infosEnv.SCRIPT_NAME}}/img/icon/apple-touch-icon-120x120.png">
		<link rel="apple-touch-icon" sizes="76x76" href="{{infosEnv.SCRIPT_NAME}}/img/icon/apple-touch-icon-76x76.png">
		<link rel="apple-touch-icon" sizes="152x152" href="{{infosEnv.SCRIPT_NAME}}/img/icon/apple-touch-icon-152x152.png">
		<link rel="icon" type="image/png" href="{{infosEnv.SCRIPT_NAME}}/img/icon/favicon-196x196.png" sizes="196x196">
		<link rel="icon" type="image/png" href="{{infosEnv.SCRIPT_NAME}}/img/icon/favicon-160x160.png" sizes="160x160">
		<link rel="icon" type="image/png" href="{{infosEnv.SCRIPT_NAME}}/img/icon/favicon-96x96.png" sizes="96x96">
		<link rel="icon" type="image/png" href="{{infosEnv.SCRIPT_NAME}}/img/icon/favicon-16x16.png" sizes="16x16">
		<link rel="icon" type="image/png" href="{{infosEnv.SCRIPT_NAME}}/img/icon/favicon-32x32.png" sizes="32x32">
		<meta name="msapplication-TileColor" content="#00a300">
		<meta name="msapplication-TileImage" content="{{infosEnv.SCRIPT_NAME}}/img/icon/mstile-144x144.png">


		<!-- CSS -->
		{{#listAsset.style.top}}
			<link rel="stylesheet" type="text/css" href="{{infosEnv.SCRIPT_NAME}}/{{.}}?ver={{version}}" media="all" />
		{{/listAsset.style.top}}

		<!-- JS Head -->
		{{#listAsset.script.top}}
			<script src="{{infosEnv.SCRIPT_NAME}}/{{.}}?ver={{version}}"></script>
		{{/listAsset.script.top}}
    </head>
	
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

		<!-- entete et menu -->
		<header>
			<nav id="navigation"> <!-- Menu -->
				<ul>
					<li id='nav-apropos'>
						<a href='{{infosEnv.SCRIPT_NAME}}/apropos/' {{#itemSelect.apropos}} class='active' {{/itemSelect.apropos}}>
							A propos
						</a>
					</li>
					<li id='nav-profil'>
						<a href='{{infosEnv.SCRIPT_NAME}}/profil/' {{#itemSelect.profil}} class='active' {{/itemSelect.profil}}>
							Profil
						</a>
					</li>
					<li id='nav-portfolio'>
						<a href='{{infosEnv.SCRIPT_NAME}}/portfolio/' {{#itemSelect.portfolio}} class='active' {{/itemSelect.portfolio}}>
							Portfolio
						</a>
					</li>
					<li id='nav-contact'>
						<a href='{{infosEnv.SCRIPT_NAME}}/contact/' {{#itemSelect.contact}} class='active' {{/itemSelect.contact}}>
							Contact
						</a>
					</li>
				</ul>
			</nav>
		</header>
		
		<!-- Contenu 'cercle' -->
		<div id='circle' >
			<div id='loadingPage'> <!-- Chargement contenu -->
				<div class="circleBounce"></div>	
				<div class='wait'></div>
			</div>
			<div id='content'>{{template}}</div>
		</div>

		<!-- Nuage -->
		<aside id='cloud'>
			<a href="{{infosEnv.SCRIPT_NAME}}/profil/gestion-projet/" >
				<ul id='reflection'>
					<li><h3>Réflexion</h3></li>
					<li><span class='icon-beaker'>L'idée</span></li>
					<li><span class='icon-beaker'>Elaboration des besoins</span></li>
					<li><span class='icon-beaker'>Création Zoming / Maquettage</span></li>
				</ul>
			</a>
			
			<a href="{{infosEnv.SCRIPT_NAME}}/profil/integration/" >
				<ul id='integration'>
					<li><h3>Intégration</h3></li>
					<li><span class='icon-desktop'>Structuration HTML</span></li>
					<li><span class='icon-desktop'>Mise en forme Css</span></li>
					<li><span class='icon-desktop'>Interaction et fonctionnalitée JS</span></li>
				</ul>
			</a>
			
			<a href="{{infosEnv.SCRIPT_NAME}}/profil/dev/" >
				<ul id='developpement'>
					<li><h3>Développement</h3></li>
					<li><span class='icon-tools'>MLD / MCD / Creation de la DataBase</span></li>
					<li><span class='icon-tools'>Développement de l'application</span></li>
					<li><span class='icon-tools'>Phase de test / Mise en production</span></li>
				</ul>
			</a>
			
			<a href="{{infosEnv.SCRIPT_NAME}}/" >
				<ul id='gregre'>
					<li><h3>Thomas Jacquey</h3></li>
					<li>
						<img src="{{infosEnv.SCRIPT_NAME}}/img/Gregre.svg" data-fallback="{{infosEnv.SCRIPT_NAME}}/img/Gregre.png"  alt="Gregre, la mascotte qui va de l'avant" />
					</li>
				</ul>
			</a>
		</aside>
			
		<footer>
		    <div class='madeIn'>
		    	Made with
				<svg class="heart" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 92.515 73.161" enable-background="new 0 0 92.515 73.161" xml:space="preserve">
			      <g>
			        <path fill="#010101" d="M82.32,7.888c-8.359-7.671-21.91-7.671-30.271,0l-5.676,5.21l-5.678-5.21c-8.357-7.671-21.91-7.671-30.27,0
			          c-9.404,8.631-9.404,22.624,0,31.255l35.947,32.991L82.32,39.144C91.724,30.512,91.724,16.52,82.32,7.888z"/>
			      </g>
			    </svg>
		 	  	in Alsace
			</div>
		</footer>
		
		<!-- link Github -->
		<a href="https://github.com/tomsjac/tomsjac.info---Portfolio" class='flagRepoGithub'>
			<img src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png">
		</a>

		<!-- JS Footer -->
        <script>
			{{# modeProd}}
	            var _gaq=[['_setAccount','UA-51078850-1'],['_trackPageview']];
	            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
	            g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
	            s.parentNode.insertBefore(g,s)}(document,'script'));
			{{/ modeProd}}
			<!-- on definit la racine pour le routage -->
			var rewriteBase = '{{infosEnv.SCRIPT_NAME}}';
			var versionApp = '{{version}}';
			{{# modeDev}}
				var inDevelopment = true;
			{{/ modeDev}}
        </script>
		
		{{#listAsset.script.bottom}}
			<script src="{{infosEnv.SCRIPT_NAME}}/{{.}}?ver={{version}}"></script>
		{{/listAsset.script.bottom}}
    </body>
</html>
