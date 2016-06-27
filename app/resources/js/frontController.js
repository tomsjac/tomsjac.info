/**
 * Front controller
 *
 * @author   Thomas
 * @version  1.0.0
 */
(function(){
	"use strict";
	//appel lors du chargement du fichier
	var fcontroller = new frontController();
	fcontroller.init(rewriteBase);
})();
 
 
//**************************
//Front Controller du site
//**************************
function frontController() {
	var that = this;
	var ajaxContent = false;
	var modeDebug = false;
	var cacheContentAjax = new Array();
	var rewriteBase;
	var router;
	var myTools;
	
	//**************************
	//initialisation de celle-ci
	//**************************
	this.init = function(urlBase) {
		if(typeof(urlBase) == 'undefined') rewriteBase = '';
		else rewriteBase = urlBase;
		
        //en dev mode Debug
		if(typeof(inDevelopment) != 'undefined' && inDevelopment == true){
			modeDebug = true;
		}

		//configuration de require
		require.config({
	        urlArgs: "ver=" + ((typeof(inDevelopment) != 'undefined' && inDevelopment == true)
            ? (new Date()).getTime()
            : versionApp)
	    });


		//init de la classe outils
		myTools = new tools();
		
		//init du routage
		router = new Router();
		routes(router,this,rewriteBase); //initialisation des routes

		//on lance le routeur, et affiche la page courante
		router.launch();
        
		//on active le menu navigation
		//on récupére les éléments cliquables du menu
		var itemMenu = document.getElementById('navigation').getElementsByTagName('a');
		myTools.navigation(itemMenu,
			function(itemClick){
				that.callbackRouteMenu(itemClick,itemMenu)
			}
		);	

        var itemCloud = document.getElementById('cloud').getElementsByTagName('a');
        myTools.navigation(itemCloud,
            function(itemClick){
                that.callbackRouteMenu(itemClick);
                var itemSelectProfil = document.getElementById('nav-profil').getElementsByTagName('a')['0'];
                myTools.activItemMenu(itemSelectProfil,itemMenu);
            }
        ); 

		//Pour que Gregre soit sous son meilleur angle tout le temps
		if(!Modernizr.svg) {
			var imgs = document.querySelectorAll('img[data-fallback]');
			for (var i = 0; i < imgs.length; i++) {
				imgs[i].attr('src', imgs[i].data('fallback'));
			}
		}

	};

	this.test = function(){ return 'c\'est moi le frontController' };
	
	//**************************
	//Récupération de l'objet route
	//**************************
	this.getRoute = function(){ return router; };
	
	//**************************
	// Récupération de la variable Ajax pour le contenu
	//**************************
	this.getAjaxContent = function(){ return ajaxContent; };	
	
	//**************************
	// Récupération du mode Debug
	//**************************
	this.getModeDebug = function(){ return modeDebug; };

	//**************************
	// Modification de la variable Ajax
	//**@param Bool  	type	True ou false
	//**************************
	this.setAjaxContent = function(type){ ajaxContent = type; };
		
	
	//**************************
	//Chargmement du controller de la partie
	// Soit un simple appel à la classe JS, ou chargement du contenu Ajax et appel de la classe
	//* @param Json  data	Données Json pour le chargement du controller de la partie afficher
	//***** Détails des entrées dans le json "data"
	//*****   str  		urlAjax	    Url pour l'appel ajax
	//*****   Json 		dataJson	Json envoyé en Post à l'ajax
	//*****   Array  	jsLoad		Fichier à charger par requireJS
	//*****   str  	   controller	Class controller à appeler
	//**************************
	this.loadController = function(data) {
		if(this.getAjaxContent() == true){
			//fonction d'appel
			var callback = function(respAjax){
				var elemContent = document.getElementById('content');
				elemContent.innerHTML = respAjax;
				
				//on met le contenu en cache
				cacheContentAjax[data.urlAjax] = respAjax;

				//on active le js dans le contenu de la modale
				var allscript = elemContent.getElementsByTagName('script');
				for(var i=0;i< allscript.length;i++){               
					if(allscript[i].type !='text/template' ){
						if (window.execScript) window.execScript(allscript[i].text,"JavaScript");
						else window.eval(allscript[i].text,"JavaScript");
					}
				}

				launchController(data.jsLoad,data.controller);
				//on coupe l'animation de load
				loaderContent('end');
			}

			//On va chercher le contenu
			if(!cacheContentAjax[data.urlAjax] || this.getModeDebug() == true){
				//on active l'animation de load
				loaderContent('start');
				myTools.MSCallMe(data.urlAjax,data.dataJson,callback);
			}else{
				callback(cacheContentAjax[data.urlAjax]);
			}
			
			this.setAjaxContent(false);
		}else{
			launchController(data.jsLoad,data.controller);
		}
	};


	//**************************
	// Action des Hrefs pour les menus
	//* @param Object  el			Object sélectionné
	//* @param Array   itemMenu		Liste des noeuds à parcourir
	//**************************
	this.callbackRouteMenu = function(el,itemMenu){
		this.setAjaxContent(true); 						 //on précise que c'est un appel ajax

		var segmentUrl = router.parse_url(el.href); //on recupére la bonne url
		router.navigate(segmentUrl.path); 			 // on appel le controller
		
		if(itemMenu) myTools.activItemMenu(el,itemMenu);			 // Activation de l'item dans le contenu
	}
	
	
	//**************************
	// Redirige vers l'acceuil si c'est un mobile
	//**************************
	this.tempRedirectMobile = function(){
		var divVersionMobile = document.getElementById('versionMobile');

		if(divVersionMobile && divVersionMobile.offsetHeight != 0){
			var segmentUrl = router.parse_url(document.location.href); //on recupére la bonne url

			if(segmentUrl.path != rewriteBase+"/") document.location.href= rewriteBase+"/";
			return false;
		}
	}

	
	//**************************
	// Gére l'affiche du loading de contenu principal
	//* @param Str  action			action (start / end) on affiche le loader, ou on le cache
	//**************************
	var loaderContent = function(action){
		if(typeof(action) == 'undefined') action = 'start';

		var divLoad = document.getElementById('loadingPage');
		
		if(action == 'start'){ //on l'affiche
			divLoad.style.display = 'block';
			divLoad.classList.add("animate");
			//on attend 20ms avant d'animer le tout
			/*
			setTimeout(
				function(){
					divLoad.classList.add("animate");
				}
			,20);
			*/
		}else{ //on le cache
			divLoad.classList.remove("animate");
			//petite tempo le temps de l'anim pour recacher la div
			myTools.prefixedEvent(divLoad, "AnimationEnd",
				function() {
			 		divLoad.style.display = 'none';
			 	}
			);
			/*
			setTimeout(
				function(){
					divLoad.style.display = 'none';
				}
			,600);
			*/
		}	
	}
	
	//**************************
	// Appel le controller de la partie
	// En chargeant les Js qu'il a besoin
	//* @param array jsLoad			Liste des fichiers Js a charger
	//* @param Str	 classControl	Nom de la class à initialiser
	//**************************
	var launchController = function(jsLoad,classControl) {
		if(jsLoad != null && jsLoad != ''){
			require(jsLoad, function(){
				if(window[classControl]){
					var module = new window[classControl]();
					module.init(that);
				}
			});
		}else{
			if(window[classControl]){
				var module = new window[classControl]();
				module.init(that);
			}
		}
	};
	

	return this;
}


//**************************
//Outils disponible pour le frontController et les controllers
//**************************
function tools() {
    var pathResourceXhr = rewriteBase+'/loadPackage/reqwest/reqwest.js';
    
	//**************************
	//  (Mister Server Call Me) Recupération des données en ajax
	//* @param String 	url			Url a appeler
	//* @param Json 	data		Données Json envoyées
	//* @param Object 	callback	Function callback appelé à la récupération du contenu
	//* @param String 	typeData	Type de données récupérées (html / json)
	//* @param String 	method		method d'envoi des données au serveur (get / post)
	//**************************
	this.MSCallMe =  function(url,data,callback,typeData,method){
		if(typeof(method) == 'undefined' || method == '' ) method = 'post';
		if(typeof(typeData) == 'undefined' || typeData == '') typeData = 'html';
		
		if(typeof(data) == 'undefined' || data == '') data = {};
		data.ajaxLoad = true;
		
		//on charge la ressource si ce n'est pas déjà fait
		require([pathResourceXhr], function(reqwest){
			reqwest({
				url		: url, 
				type	: typeData,
				method  : method,
				data    : data,
				success : function (respAjax) {
					if(callback) callback.apply(window,new Array(respAjax));
				}
			});
		});
	}
	

	//**************************
	// Activation des actions sur le menu 
	//* @param Object domParse		Objet Dom a parcourir pour activer les liens JS 
	//* @param str 	  callback		Function à appeler en plus, lors du click
	//**************************
	this.navigation = function(domParse,callback) {
		for(var i in domParse){
			if(domParse[i].nodeType == 1 && domParse[i].nodeName == 'A'){ //on prend que les Hrefs
				domParse[i].onclick = function(e){
					e.preventDefault(); 						 //on arréte l'action par défaut du Href
					if(callback) callback.apply(this,new Array(this));
					return false;
				}
			}
		}
	};
	
	//**************************
	// Active l'item dans le menu
	//* @param Objet elem			objet de l'item à selectionner
	//* @param Object domParse		Objet Dom a parcourir
	//**************************
	this.activItemMenu = function(elem,domParse,className) {
		if(typeof(className) == 'undefined') className = 'active';

		for(var i in domParse){
			if(domParse[i].nodeType == 1){
				if(domParse[i] == elem){
					domParse[i].classList.add(className);
				}else{
					domParse[i].classList.remove(className);
				}
			}
		}
	};


	//**************************
	// Préfix les events pour les différents navigateurs
	// Ex : prefixedEvent(divDom, "AnimationEnd", ActionCallBack);
	//* @param Objet  element		Objet Dom à ajouter l'event
	//* @param str    type			Type event
	//* @param Object callback		Function callBack
	//**************************
	this.prefixedEvent = function(element, type, callback) {
		var pfx = ["webkit", "moz", "MS", "o", ""];
		for (var p = 0; p < pfx.length; p++) {
			if (!pfx[p]) type = type.toLowerCase();
			element.addEventListener(pfx[p]+type, callback, false);
		}
	}

}
