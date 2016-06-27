/**
 * Controller JS de la page Contact
 * Javascript object
 *
 * @author   Thomas
 * @version  1.0.0
 */
function contact() {
	var that = this;
	var frontController;
	var router;

	//**************************
	//init
	//* @param object  oFrontC	instance du frontController
	//**************************
	this.init = function(oFrontC) {
		if(oFrontC.getModeDebug() == true) console.debug('Controller Contact');
		frontController = oFrontC;
		myTools = new tools();
		router = oFrontC.getRoute();

		//on cache le message que le js n'est pas activé
		document.getElementById('noJs').style.display = 'none';

		//pour la validation du formulaire, il faut avoir au moins saissi un com et son Nom
		document.getElementById('formContact').onsubmit = function(){
			return submitFormContact();
		}
		
	};

	//**************************
	// Verification des données du formulaires
	//**************************
	var submitFormContact = function() {
		var submitForm = true;

		//on verifie si le nom est bien rempli
		var nomContact = document.getElementById('nomContact');
		var labelNomContact = document.getElementById('formContact').querySelector('label[for="'+nomContact.id+'"]');
		if(nomContact.value.trim() ==''){
			submitForm = false;
			nomContact.classList.add('error'); 
			labelNomContact.classList.add('error'); 
		}else{
			nomContact.classList.remove('error'); 
			labelNomContact.classList.remove('error'); 
		}

		//on verifie si le commentaire est bien rempli
		var msgContact = document.getElementById('msgContact');
		var labelMsgContact = document.getElementById('formContact').querySelector('label[for="'+msgContact.id+'"]');
		if(msgContact.value.trim() ==''){
			submitForm = false;
			msgContact.classList.add('error'); 
			labelMsgContact.classList.add('error'); 
		}else{
			msgContact.classList.remove('error'); 
			labelMsgContact.classList.remove('error'); 
		}

		if(submitForm == true){
			var btSubmit = document.getElementById('sendMsg');
			btSubmit.disabled = true;
			btSubmit.value = '  ...  ';
		}
		return submitForm;
	};	
	
	return this;
}
