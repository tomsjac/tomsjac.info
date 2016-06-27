/**
 * Controller JS de la page d'acceuil
 *
 * @author   Thomas
 * @version  1.0.0
 */
function accueil() {
	var that = this;

	//**************************
	//init de l'acceuil
	//**************************
	this.init = function(oFrontC) {
		if(oFrontC.getModeDebug() == true) console.debug('Controller Accueil');
		

	};
	
	return this;
}
