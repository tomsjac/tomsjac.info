/**
 * Controller JS de la page Portfolio
 * Javascript object
 *
 * @author   Thomas
 * @version  1.1.0
 */
function portfolio() {
	var that = this;
	var frontController;
	var router;
	
	//**************************
	//init
	//* @param object  oFrontC	instance du frontController
	//**************************
	this.init = function(oFrontC) {
		if(oFrontC.getModeDebug() == true) console.debug('Controller Portfolio');
		frontController = oFrontC;
		myTools = new tools();
		router = oFrontC.getRoute();

		//init du slider
		initSliderProjet();
		
		//lien pour le détails des projets
		var itemLink = document.querySelectorAll("#circle #listProj a");
		myTools.navigation(itemLink,
			function(itemClick){
				that.loadDetailsProjet(itemClick);
			}
		);	
	};
	
	
	//**************************
	// Récupération du détails d'un projet
	// Via template mustache
	//**************************
	var loadProjetTemplateType = null;
	var loadProjetTemplate = new Array();
	this.loadDetailsProjet = function(el){
		//on récupére le projet à charger
		var segmentUrl = router.parse_url(el.href);
		var detailsRoute = router.getRoute(segmentUrl.path);
		var projetSelect = detailsRoute[1];
		
		//on verifie si le projet existe
		if(JsonProjet[projetSelect] && !loadProjetTemplate[projetSelect]){
			
			//on recupére le template
			if(loadProjetTemplateType == null){ 
				loadProjetTemplateType = document.getElementById('templateDetailsProjet').innerHTML;
			}

			//on altére le Json pour la partie slider des images
			var jsonSliderImgSet = [];
			for(var key in JsonProjet[projetSelect].imgSlide){
				jsonSliderImgSet.push(
					{
						'key' : key,
						'val' : JsonProjet[projetSelect].imgSlide[key]
					}
				);
								
			}		
			JsonProjet[projetSelect].imgSlide = jsonSliderImgSet;

			//On crée le json à injecter au template
			var view = {
				"infosProjet" : JsonProjet[projetSelect],
				"classView"   : 'liveView',
				"infosEnv"    : {"SCRIPT_NAME" : rewriteBase}
			};

			loadProjetTemplate[projetSelect] = Mustache.render(loadProjetTemplateType, view);
		}
		
		//si le contenu HTML existe, et qu'une page n'est pas déja affiché
		if(loadProjetTemplate[projetSelect] && !document.getElementById('dt-projet')){
			//on ajoute le template dans le contenu
			var contenairTmp = document.createElement("div");
  			contenairTmp.innerHTML = loadProjetTemplate[projetSelect];

  			//on ajoute le contenu,
  			document.getElementById("content").appendChild(contenairTmp.querySelector('section'));
	
			//on appel le controlleur de cette partie
			var controllerDtProjet = new portfolioProjet();
			controllerDtProjet.init(frontController);


			//on ajoute l'appel en historique de navigation
			if(router.history && router.history.active == true){
				router.history.set('','',segmentUrl.path);
			}
		}else{
			return false;
		}
	}

	//**************************
	// Initialisation du slide des projets
	//**************************
	var initSliderProjet = function() {
		//Ini
        new Swiper('#listProj', {
            pagination: '#paginationSlideP',
            paginationClickable: true,
            nextButton: '#nextSlideP',
            prevButton: '#prevSlideP',
            spaceBetween: 30
        });       
	};
	return this;
}


/**************************
 * Gestion pour le détails d'un projet
 **************************/
function portfolioProjet() {
	var that = this;
	var myTools;
	var frontController;
	var router;

	//**************************
	//init
	//**************************
	this.init = function(oFrontC) {
		if(oFrontC.getModeDebug() == true) console.debug('Controller Portfolio Détails Projet');
		
		frontController = oFrontC;
		myTools = new tools();
		router = oFrontC.getRoute();
		
		if(document.getElementById('dt-projet')){
			//init du slider
			initSliderImg();
			
			//init de l'apercu des images
			initZoomImg();
            
			//Init des boutons close
			var itemClose = document.getElementById('close').getElementsByTagName('a');
			
			myTools.navigation(itemClose,
				function(itemClick){
					closeProjet(itemClick);
				}
			);	
		}
	};

	
	//**************************
	// Initialisation du slide des images du projet
	//**************************
	var initSliderImg = function() {
		//Ini
        new Swiper('#slideImgDProj', {
            pagination: '#paginationSlideIP',
            paginationClickable: true,
            nextButton: '#nextSlideIP',
            prevButton: '#prevSlideIP',
            spaceBetween: 30
        }); 
	};


	//**************************
	// Initialisation des zooms sur les images
	//**************************
	var initZoomImg = function() {
		//on rend le fond cliquable pour cacher le zoom
		//on annule cette action si on clique sur l'image ou le text
		var listObjImgZoom = document.getElementById('overviewProject').querySelectorAll(
			".lb-overlay,  .lb-overlay img , .lb-overlay div, .lb-overlay .lb-left, .lb-overlay .lb-right"
		);
		
		for(var i in listObjImgZoom){
			//si on click sur m'importe quel élément on cache le zoom
			if(listObjImgZoom[i].nodeType == 1 && listObjImgZoom[i].className == 'lb-overlay'){
				listObjImgZoom[i].onclick = function(e){
					e.preventDefault(); 
					document.location.href='#';
					return false;
				}
			}else if(listObjImgZoom[i].nodeType == 1){
				//A part si on click sur l'image ou la description
				listObjImgZoom[i].onclick = function(e){
					e.preventDefault();
					e.stopPropagation();
					return false;
				}
			}
		}

		//Pour chaque clique sur un zoom on init la navigation
		var listObjImgSlideA = document.getElementById('slideImgDProj').querySelectorAll("#slideImgDProj > div > div > a");
		for(var i in listObjImgSlideA){
			if(listObjImgSlideA[i].nodeType == 1){
				listObjImgSlideA[i].onclick= function(){
					var segementUrl = router.parse_url(this.href);
					initNavZoom(segementUrl.fragment);
				}
			}
		}

	};
	
	//**************************
	// Initialisation la navigation dans les Zooms
	//**************************
	var initNavZoom = function(zoomSelect) {
		//on récupére tous les zooms dispo
		var elementSlide = document.getElementById('overviewProject');
		var listZoom = elementSlide.querySelectorAll(".lb-overlay");
		
		for(var i in listZoom){
			if(listZoom[i].nodeType == 1){
				
				if(listZoom[i].id == zoomSelect){
					var zoomPrec = (i*1)-1;
					var zoomSuiv = (i*1)+1;
					var elBtnPrev = elementSlide.querySelector('#'+listZoom[i].id+' .lb-left');
					var elBtnSuiv = elementSlide.querySelector('#'+listZoom[i].id+' .lb-right');


					if(listZoom[zoomPrec]){
						elBtnPrev.style.display = 'block';
						
						elBtnPrev.onclick = function(e){
							e.preventDefault();
							e.stopPropagation();
							document.location.href= '#'+listZoom[zoomPrec].id;
							initNavZoom(listZoom[zoomPrec].id);
							return false;
						}

					}else{
						elBtnPrev.style.display = 'none';
					}

					if(listZoom[zoomSuiv]){
						elBtnSuiv.style.display = 'block';
						
						elBtnSuiv.onclick = function(e){
							e.preventDefault();
							e.stopPropagation();
							document.location.href= '#'+listZoom[zoomSuiv].id;
							initNavZoom(listZoom[zoomSuiv].id);
							return false;
						}

					}else{
						elBtnSuiv.style.display = 'none';
					}
				}
			}
		}
	}

	//**************************
	// Ferme le projet, pour retourner sur le listing des projets
	//**************************
	var closeProjet = function(el) {
		var elemDtProjet = document.getElementById('dt-projet');

		//si c'est un affichage, en live
		if(elemDtProjet.classList.contains("liveView") && elemDtProjet){
			
			//on ajoute la classe d'animation
			elemDtProjet.classList.add('closeDp');
			var directionLink = el.dataset.type;
			if(directionLink == null ){
				elemDtProjet.classList.add('left');
			}else{
				elemDtProjet.classList.add(directionLink);
			}

			//une fois l'animation terminé, on détruit le contenu
			myTools.prefixedEvent(elemDtProjet, "AnimationEnd",
				function() {
			 		if(elemDtProjet) elemDtProjet.parentNode.removeChild(elemDtProjet);
			 	}
			);

			//on ajoute l'appel en historique de navigation
			if(router.history && router.history.active == true){
				var segmentUrl = router.parse_url(el.href);
				router.history.set('','',segmentUrl.path);
			}


		}else{
			//on est arrivé directement sur un projet
			//on appel le contenu qui liste les projets
			frontController.callbackRouteMenu(el); 
		}

		return false;
	}
	
	
	
	return this;
}