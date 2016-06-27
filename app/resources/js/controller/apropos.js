/**
 * Controller JS de la page A propos
 * Javascript object
 *
 * @author   Thomas
 * @version  1.0.0
 */
function apropos() {
	var that = this;
	var myTools;

	//**************************
	// init
	//* @param object  oFrontC	instance du frontController
	//**************************
	this.init = function(oFrontC) {
		if(oFrontC.getModeDebug() == true) console.debug('Controller A propos');
		myTools = new tools();
		
		//navigation dans le contenu
		var itemLink = document.querySelectorAll("#circle article>ul>li>a");
		
		//selection menu principal
		var itemNavigationP = document.getElementById('navigation').getElementsByTagName('a');
		var itemProfilP = document.querySelector("#nav-profil>a");
		
		myTools.navigation(itemLink,
			function(itemClick){
				oFrontC.callbackRouteMenu(itemClick) //on utilise la navigation principale
				myTools.activItemMenu(itemProfilP,itemNavigationP);
			}
		);	
	};
	return this;
}
