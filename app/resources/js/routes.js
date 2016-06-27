/**
 * Définition des routes du projet
 *
 * @author   Thomas
 * @version  1.0.0
 */
function routes(router,fController,rewriteBase)
{
    //Path ressource => redirigé par Htaccess
	var pathResource = rewriteBase+'/loadAsset/';
    var pathPackage = rewriteBase+'/loadPackage/';    
    
	//**************************
	//initialisation des routes
	//**************************
	if(typeof(rewriteBase) == 'undefined') rewriteBase = '';
	
	//route : A propos
	router.register(rewriteBase+"/apropos/", function(urlBase){
		if(fController.getModeDebug() == true) console.debug('Route A propos');

		var data = {
			'urlAjax'    : 	urlBase,
			'jsLoad'     :  new Array(pathResource+'controller/apropos.js'),
			'controller' :  'apropos',
		};
		fController.loadController(data);
	});
	
	//route : Profil
	router.register(rewriteBase+"/profil/", function(urlBase){
		if(fController.getModeDebug() == true) console.debug('Route profil');
		
		var data = {
			'urlAjax'    : 	urlBase,
			'jsLoad'     :  new Array(pathResource+'controller/profil.js'),
			'controller' :  'profil',
		};
		fController.loadController(data);
	});
	
	//route : Profil details
	router.register(rewriteBase+"/profil/:competence/", function(urlBase,competence){
		if(fController.getModeDebug() == true) console.debug('Route profil details');

		var data = {
			'urlAjax'    : 	urlBase,
			'dataJson'   :  {"competence" : competence},
			'jsLoad'     :  new Array(pathResource+'controller/profil.js'),
			'controller' :  'profil',
		};
		fController.loadController(data);
	});
			
	
	//route : Portfolio Accueil
	router.register(rewriteBase+"/portfolio/", function(urlBase){
		if(fController.getModeDebug() == true) console.debug('Route portfolio');

		var data = {
			'urlAjax'    : 	urlBase,
			'jsLoad'     :  new Array(
								pathResource+'controller/portfolio.js',
								pathResource+'vendor/sliderPage.js'
							),
			'controller' :  'portfolio',
		};
		fController.loadController(data);
	});
	
	//route : Portfolio Détails projet
	router.register(rewriteBase+"/portfolio/:projet/", function(urlBase,projet){
		if(fController.getModeDebug() == true) console.debug('Route portfolio : ouvre projet :'+ projet);
		
		var data = {
			'urlAjax'    : 	urlBase,
			'dataJson'   :  {"projet" : projet},
			'jsLoad'     :  new Array(
								pathResource+'controller/portfolio.js',
								pathResource+'vendor/sliderPage.js'
							),
			'controller' :  'portfolioProjet',
		};
		fController.loadController(data);
	});
	
	//route : Contact
	router.register(rewriteBase+"/contact/", function(urlBase){
		if(fController.getModeDebug() == true) console.debug('Route contact');
		
		var data = {
			'urlAjax'    : 	urlBase,
			'jsLoad'     :  new Array(
								pathResource+'controller/contact.js'
							),
			'controller' :  'contact',
		};
		fController.loadController(data);
	});
			
	//route : Accueil
	router.register(rewriteBase+"/", function(urlBase){
		if(fController.getModeDebug() == true) console.debug('Route Accueil');
		var data = {
			'urlAjax'    : 	urlBase,
			'jsLoad'     :  new Array(pathResource+'controller/accueil.js'),
			'controller' :  'accueil',
		};
		fController.loadController(data);
	});
	
	//route : Page d'error
	router.register(rewriteBase+"/:path/", function(urlBase){
		if(fController.getModeDebug() == true) console.debug('Route Error');
		var data = {
			'urlAjax'    : 	urlBase,
			'jsLoad'     :  '',
			'controller' :  '',
		};
		fController.loadController(data);
	});
	
	
	//On active l'historique de navigation
	var callBackHisto = function(event){
		fController.setAjaxContent(true); //on active l'ajax
		if(event) router.navigate(event.state.url,true);
		else router.navigate(rewriteBase+'/',true);
	}
	
	router.history.activate(callBackHisto);
	
}