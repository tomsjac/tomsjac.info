/**
 * Controller JS de la page Profil
 * Javascript object
 *
 * @author   Thomas
 * @version  1.0.0
 */
function profil() {
	var that = this;
	var myTools;
	
	//**************************
	//init
	//* @param Object  oFrontC	Front Controller
	//**************************
	this.init = function(oFrontC) {
		if(oFrontC.getModeDebug() == true) console.debug('Controller Profil');
		myTools = new tools();

		//navigation dans le contenu
		var itemLink = document.querySelectorAll("#circle header>nav>ul>li>a");
		//Navigation interne à la partie
		myTools.navigation(itemLink,
			function(itemClick){
				oFrontC.callbackRouteMenu(itemClick,itemLink)
			}
		);	
	};

	
	
	return this;
}

