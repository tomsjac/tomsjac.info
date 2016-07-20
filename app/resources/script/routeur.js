/**
 * Class de routage
 *
 * @author   Thomas
 * @version  1.0.0
 */
(function(){
	"use strict";
	
	/**
	 * Constructeur
	 * @returns
	 */
	function Router(typeUrl,activeHistory)
	{
		this.namedParam = /:\w+/g;
		this.splatParam = /\*\w+/g;
		
		if(typeUrl == null) this.typeUrl = 'path'; // ou anchor
		else this.typeUrl = typeUrl;
		
		this.routes = [];
		
		this.history = new historyNav(); // gestion de l'historique
	}
	
	Router.prototype = {
		/**
		 * Enregistre une route
		 * @param String route				Route a definir
		 * @param Function callback			Fonction de callback a appeler
		 */
		register: function(route, callback)
		{
			
			route = route.replace(this.namedParam, '([^\/]+)').replace(this.splatParam, '(.*?)');
			this.routes.push({
				route: route,
				callback: callback
			});
		},
		
		/**
		 * Retourne la bonne route et sa configuration selon l'url
		 * @param  String url		Route à traiter
		 * @return Array  Retourne en index 0, la configuration de la route, 
		 *                et en index 1 les variables dynamiques de la route
		 */
		getRoute: function(url)
		{
			if(this.routes.length > 0)
			{
				for(var index in this.routes)
				{
					//on test si le pattern est ok
					var regexRoute = new RegExp('^'+this.routes[index].route+'$');
					
					if (regexRoute.test(url)){
						return new Array(this.routes[index],regexRoute.exec(url).slice(1));
						break;
					}
				}
			}
			return false;
		},
				
		/**
		 * Lance la recherche de la bonne route 
		 * @param String url		Route à traiter
		 * @param Bool noHistory	si true, c'est que c'est un appel depuis onpopstate
		 */
		navigate: function(url,noHistory)
		{
			if(typeof(noHistory) == 'undefined') noHistory = false;
			
			var objRoute = this.getRoute(url);
			if(objRoute !== false){
				var callback = objRoute[0].callback;
				
				if (callback != null){
					callback.apply(window, new Array(url,objRoute[1]));
					if(this.history && this.history.active == true && noHistory == false){
						this.history.set('','',url);
					}
				}
			}
		},
		
				
		/**
		 * Lancement du routeur
		 * En mode ancre, active le routage en cas de modifcation de celle-ci
		 * Sinon fait un callback, si on trouve une correspondance
		 */
		launch: function()
		{
			if(this.typeUrl == 'path'){
				var segmentUrl = this.parse_url(window.location.href);				
				var url = segmentUrl.path;
				if(url) this.navigate(url);
			}else{
				var self = this;
				window.onhashchange = function(){self.hashchange()};
				this.hashchange(this);
			}
		},
		
		/**
		 * navigation en mode ancre
		*/
		hashchange: function()
		{
			var ancre = window.location.hash;
			if(ancre != ""){
				ancre = ancre.substr(1);
				this.navigate(ancre);
			}
		},		
		
		/**
		 * parse_url function
		 * From: http://phpjs.org/functions
		 */
		parse_url: function(str) {
			var query, key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'fragment'],
					ini = (this.php_js && this.php_js.ini) || {},
					mode = (ini['phpjs.parse_url.mode'] && ini['phpjs.parse_url.mode'].local_value) || 'php',
					parser = {
				php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
				strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
				loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-scheme to catch file:/// (should restrict this)
			};

			var m = parser[mode].exec(str), uri = {}, i = 14;

			while (i--) {
				if (m[i]) {
					uri[key[i]] = m[i];
				}
			}

			if (mode !== 'php') {
				var name = (ini['phpjs.parse_url.queryKey'] && ini['phpjs.parse_url.queryKey'].local_value) || 'queryKey';
				parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
				uri[name] = {};
				query = uri[key[12]] || '';
				query.replace(parser, function($0, $1, $2) {
					if ($1) {
						uri[name][$1] = $2;
					}
				});
			}

			delete uri.source;
			return uri;
		},	
	};
	
	
	/**
	 * Gestion de l'historique de naviagation avec history
	*/
	function historyNav(){
		this.active = false
		
		this.activate = function (callFunction){
			this.active = true;
			//lorsqu'on fait précédent.
			setTimeout(function(){
				window.onpopstate = function(event) {
					if(event.state){
						callFunction.apply(window,new Array(event));
					}
					/*
					else{
						callFunction.apply(window);
					}
					*/					
				};
			},1000); //merci chrome d'executer onpopstate au chargmement de la page
		}
			
		this.set = function(data,title,url){
			if(typeof(data) == 'undefined' || data == '') data = {};
			data.url = url;
			history.pushState(data,'',url);
		}
		
	}
	
	window.Router = Router;
})();