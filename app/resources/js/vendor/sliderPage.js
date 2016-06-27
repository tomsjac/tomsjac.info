/**************************
 * Slider de contenu
 * Permet d'afficher des contenus par slide
 * Javascript object
 * 
 * Variables utilisées par la modale en JSON
 * idSlider : id de la zone du slider
 * idMenuSlider : id du menu pour le slider
 * prefixMenu : préfix pour le menu du slider pour les retrouver. (par défaut : -tab)
 * prefixSlide : préfix pour le slide, qui permet de retrouver les divs concernées. (par défaut : -pane)	
 * idSlideDepart : id de la page de départ du slider
 * dureeSlide : durée du slide entre chaque page en seconde (par defaut : 20) 
 * direction : direction du slider ('horizontal','vertical') (par defaut : horizontal)
 * decalageSlider : en pixel, decalage qu'on applique si le slide n'est pas a 0px du bord du conteneur
 * cssMenuActif : css pour le menu quand on se trouve sur la page
 * cssMenuNormal : css pour le menu normal (par defaut : '')
 * autoScroll : si on veut que le slider change automatiquement mettre chiffre en seconde (exemple : 3000)
 * ajaxSlide : tableau avec le id du slide et la page a charger en ajax : 'ajaxSlide': {'div1':'?action=contenu1','div2':'?action=contenu2'},
 * cacheAjaxPage : si on veut faire du cache ou pas sur les appels ajax  (defaut : false) choix : true / false
 *
 * Exemple d'utilisation : 
 * var slide1 = new sliderPage({'idSlider':'zoneSlide','idMenuSlider':'zoneMenuSlider','idSlideDepart':'slide1-pane','cssMenuActif':'active','autoScroll':3000,'balisePane' : 'div'});
 *
 *	slide1.scrollSection('slide2-pane'); // allez au slide 2
 *	slide1.scrollDirection('prev'); // allez au slide précédent
 *	slide1.scrollDirection('next'); // allez au slide suivant
 *
 * Exemple avec chargement des pages en ajax
 *
 *	var slide1 = new sliderPage(
 *		{
 *		    'idSlider':'zoneSlide',
 *			'ajaxSlide': {'slide1-pane':'?action=chargeContenu1','slide2-pane':'?action=chargeContenu2'},
 *			'idSlideDepart':'slide1-pane',
 *		}
 *	);
 *
 * Exemple HTML Defaut :
 *
 *	<ul id="menuSlide">
 *      <li> <a href="#slide1-pane" alt='' >slide1</a> </li>
 *      <li> <a href="#slide2-pane" alt='' >slide2</a> </li>
 *  </ul>
 *
 *	<div id="contenuSlider">
 *		<div class='zoneScrollSlide'>
 *			<div id="slide1-pane"> new slide 1 </div>
 *			<div id="slide2-pane"> new slide 2 </div>
 *			<hr class='spacer'/>
 *		</div>
 *	</div>
 *
 * Exemple CSS Defaut :
 *
 *	#contenuSlider{
 *		width: 600px;
 *		overflow: hidden;
 *		height: 343px;
 *	}
 *	
 *	.zoneScrollSlide{
 *		width: 7250px;
 * 		clear:both;
 *	}
 *
 *	#contenuSlider .zoneScrollSlide div{
 *	  float:left;
 *	  width: 700px;
 *	  height:343px;
 *	}
 *	
 *	#menuSlide a.active{
 *		font-weight:bold;
 *	}
 *
 * @author   Thomas
 * @version  2.0.0
 */
var tabObjectSlide = new Array(); // tableau des objets slide ouverts pour les appels externe 
var sliderPage=(
	function(option){
		var that = this;
		this.option = option; //on passe l'option à l'objet
		this.currentSection; //section afficher actuellement
		
		this.scrollAnimTempo = {
			debutTempo:0, 
			begin:0, 
			change:0.0,
			timer:null
		}; // tempo pour le setintervall du scroll 
		
		this.arraySlide = new Array(); // tableau des slides dispo
		this.arrayMenuSlide = new Array(); // tableau des menu slides dispo
		this.aninScrollAction = true; //action du scroll auto, si true on défile, si false on arréte le défilement
		this.tableauCacheAjax = new Array(); // tableau de cache pour les chargement en ajax
		
		//**************************
		//initialisation de celle-ci
		//**************************
		this.initialize = function() {
			
			//on verifie si le id slider existe
			if(typeof(this.option.idSlider) == 'undefined' || this.option.idSlider==''){
				alert("L'identifiant du slider est obligatoire. Veuillez le préciser par la variable `idSlider`");
				return false;
			}
			
			//console.dir(this.option);
			//on initialise les donnees par defaut si elle existe pas
			if(typeof(this.option.prefixMenu) == 'undefined' || this.option.prefixMenu=='') this.option.prefixMenu = '-tab';
			if(typeof(this.option.prefixSlide) == 'undefined' || this.option.prefixSlide=='' ) this.option.prefixSlide = '-pane';
			if(typeof(this.option.dureeSlide) == 'undefined' || this.option.dureeSlide=='' ) this.option.dureeSlide = 20;
			if(typeof(this.option.direction) == 'undefined' || this.option.direction=='' ) this.option.direction = 'horizontal';
			if(typeof(this.option.cssMenuNormal) == 'undefined' || this.option.cssMenuNormal=='' ) this.option.cssMenuNormal = '';
			if(typeof(this.option.cssMenuActif) == 'undefined' || this.option.cssMenuActif=='' ) this.option.cssMenuActif = '';
			if(typeof(this.option.cacheAjaxPage) == 'undefined') this.option.cacheAjaxPage = false;
			if(typeof(this.option.balisePane) == 'undefined') this.option.balisePane = 'div';
			//console.dir(this.option);
			
			//on ajoute l'objet dans le tableau
			tabObjectSlide[this.option.idSlider] = this; //on injecte l'object dans le tableau
			
			//on crée le tableau des slides disponibles...
			var listeDivSlide = document.getElementById(this.option.idSlider).getElementsByTagName(this.option.balisePane);
			var posSlideBoucle = 0;
			for (var iSlide = 0; iSlide < listeDivSlide.length; iSlide++) {
				if (listeDivSlide[iSlide].id.search(this.option.prefixSlide) != -1){
					this.arraySlide[listeDivSlide[iSlide].id] = posSlideBoucle;
					posSlideBoucle++;
				}
			}
			
			//on verifie si on a un menu ...
			if(typeof(this.option.idMenuSlider) != 'undefined' && this.option.idMenuSlider!='' && document.getElementById(this.option.idMenuSlider) != null){
				//on initialise le menu 
				var listeMenuSlide = document.getElementById(this.option.idMenuSlider).getElementsByTagName('A');
				for (var iMenuS = 0; iMenuS < listeMenuSlide.length; iMenuS++) {
					var reg1 = new RegExp("[\#][0-9,a-z,A-Z,\-\_]+","g");
					var lienMenuA = listeMenuSlide[iMenuS].href.match(reg1)
					lienMenuA = lienMenuA[0].replace("#",""); // on ajoute le préf
					
					if (this.arraySlide[lienMenuA] != null){ //on verifie si le slide existe
						listeMenuSlide[iMenuS].onclick = function(){
							return that.scrollSection(this);
						}
						listeMenuSlide[iMenuS].href= 'javascript:void(0)';
						var idMenuS = lienMenuA.replace(this.option.prefixSlide,this.option.prefixMenu);
						listeMenuSlide[iMenuS].id = idMenuS;
						this.arrayMenuSlide[idMenuS] = idMenuS;
					}
				}
				
			}
	
			//on verifie si on doit aller quelque part
			if(typeof(this.option.idSlideDepart) != 'undefined' && this.option.idSlideDepart!=''){
				this.scrollSection(this.option.idSlideDepart);
			}
		
			//on verifie si on a le défilement auto
			if(typeof(this.option.autoScroll) != 'undefined' && this.option.autoScroll !='' ){
				this.scrollAutoSlide();
			}
		};

		//**************************
		//fonction Pour aller à une section prècise 
		//**************************
		this.scrollSection = function(link) {

			//on tue a chaque fois le timer du scroll
			if(that.scrollAnimTempo.debutTempo != 0){
				clearInterval(that.scrollAnimTempo.timer);
				that.scrollAnimTempo.debutTempo = 0;
			}
			
			//si link est un objet, cela vient du lien du menu
			// on verifie si le lien id est bien un slide, si oui on y va
			if(typeof(link) == 'object'){
				var linkObject = link.id.replace(this.option.prefixMenu,this.option.prefixSlide);
				if (this.arraySlide[linkObject] != null){
					link = linkObject;
				}
			}
						
			//on verifie si c'est pas la même section sinon on fait rien
			/*
			if (this.currentSection == link){
				return false;
			}
			*/
	 
			//sinon on va à la section souhaiter ...
			//on commence par verifier si la section existe
			if(this.arraySlide[link] != null){
					
				var zoneSlide = document.getElementById(this.option.idSlider);
				var postionZoneSlide = findElementPos(zoneSlide);
				
				//ensuite on verifie si on a une injection ajax ...
				if(typeof(this.option.ajaxSlide) != 'undefined' && this.option.ajaxSlide !='' && typeof(this.option.ajaxSlide[link]) !='undefined' ){
					//appel ajax pour le contenu
					this.injecteContenu(link);
				}
				
				
				//on recupére la position de la section souhaité
				var positionLink = findElementPos(document.getElementById(link));
				
				//on regarde dans quel sens aller pour ensuite se déplacer vers celle-ci
				if(this.option.direction == "horizontal"){ //direction horizontal
							
					if(typeof(this.option.decalageSlider) != 'undefined' && this.option.decalageSlider!=''){
						var positionFinalSlide = (positionLink[0] - postionZoneSlide[0]) - this.option.decalageSlider;
					}else{
						var positionFinalSlide = positionLink[0] - postionZoneSlide[0];
					}
						
					this.scrollAnimTempo.begin = zoneSlide.scrollLeft; //debut
					this.scrollAnimTempo.change = positionFinalSlide - this.scrollAnimTempo.begin; //fin
				}else{ //direction vertical
					if(typeof(this.option.decalageSlider) != 'undefined' && this.option.decalageSlider!=''){
						var positionFinalSlide = (positionLink[1] - postionZoneSlide[1]) - this.option.decalageSlider;
					}else{
						var positionFinalSlide = positionLink[1] - postionZoneSlide[1];
					}
					this.scrollAnimTempo.begin = zoneSlide.scrollTop;
					this.scrollAnimTempo.change = positionFinalSlide - this.scrollAnimTempo.begin;
				}
				
				this.scrollAnimTempo.timer = setInterval(scrollAnim,this.option.dureeSlide); //on l'ance l'animation
				this.currentSection = link; //On passe le lien en section courante	
				
				//si menu on selectionne le menu
				if(typeof(this.option.idMenuSlider) != 'undefined' && this.option.idMenuSlider!=''){
					this.selectCssMenu(link);
				}
			
			}

		//return false;
		};
		
		
		//**************************
		//Fonction pour trouver le slide suivant / précédent pour y aller
		// direction : soit 'prev' ou 'next'
		//**************************
		this.scrollDirection = function(direction) {

			//on verifie si la direction est bien rempli sinon on prend next par def
			if (typeof(direction) == 'undefined' && direction ==''){
				direction = 'next';
			}
			
			//on récupére les clé du tableau des slides 
			var slideArrayGo =  array_keys (this.arraySlide);
			
			
			//ensuite on retrouve le suivant ou le précédent slide
			if(direction == 'next'){
				//on va au suivant, si c'est le dernier on retourne au 1er
				var gotoSlide = slideArrayGo[this.arraySlide[this.currentSection]+1];

				if(typeof(gotoSlide) == 'undefined'){
					gotoSlide = slideArrayGo[0];
				}
			}else if(direction == 'prev'){
				//on va au précédent, si le 1er on va au dernier
				var gotoSlide = slideArrayGo[this.arraySlide[this.currentSection]-1];
				
				if(typeof(gotoSlide) == 'undefined'){
					gotoSlide = slideArrayGo[slideArrayGo.length-1];
				}
			}
					
			//on va à la section
			this.scrollSection(gotoSlide); 
		};
		
		
		//**************************
		//	Lance l'anim automatique du slider et permet la pause lorsque le
		//	curseur se situe dans la zone de celui ci.
		//**************************
		this.scrollAutoSlide = function() {
			if(typeof(this.option.autoScroll) != 'undefined' && this.option.autoScroll !='' ){
				//zone slider
				var zoneSlide = document.getElementById(this.option.idSlider);

				//on lance l'animation du scroll auto
				setInterval(function(){
					if(that.aninScrollAction == true){
						that.scrollDirection('next');
					}
				},this.option.autoScroll);
				
				//on ajoute un action sur le slide si on passe dessus ca bloque l'action
				
				
				zoneSlide.onmouseover = function(){
					that.aninScrollAction = false;
				}
				zoneSlide.onmouseout = function(){
					that.aninScrollAction = true;
				}
			}
		};
		
		
		
		//**************************
		//Pour injacter le contenu dans le slider
		// idSlider : id du slider concerné
		//**************************
		this.injecteContenu = function(idSlider){
			
			//chargement du contenu ....
			document.getElementById(idSlider).innerHTML = "<div class='chargeSlider'><?php echo $i18n->tr('general-txtChargementModal'); ?></div>";

			//on verifie si le fichier ajax est la
			if(typeof(sack) == 'undefined'){
				alert('Le js sack Ajax.js est obligatoire pour le chargement de contenu par url interne');
				return false;
			}
			
			//on verifie si on utilise le cache ajax et si on a bien le contneu
			if(this.option.cacheAjaxPage == true && this.tableauCacheAjax[idSlider]){
				document.getElementById(idSlider).innerHTML = this.tableauCacheAjax[idSlider];
				return false;
			}
			
			//requete ajax
			var ajaxSlideContenu = new sack();
			ajaxSlideContenu.method ="GET";
			ajaxSlideContenu.requestFile = this.option.ajaxSlide[idSlider];	// Specifying which file to get
			
			//pour la fonction ajax le this ne marche pas 
			ajaxSlideContenu.onCompletion = function(){ 
				//on injecte le contenu
				document.getElementById(idSlider).innerHTML = ajaxSlideContenu.response;

				//on active le js dans le contenu de la modale
				var allscript = document.getElementById(idSlider).getElementsByTagName('script');
				for(var i=0;i< allscript.length;i++){               
					if (window.execScript) window.execScript(allscript[i].text,"JavaScript");
					else window.eval(allscript[i].text,"JavaScript");
				}

				//si le cache est activé on le met en cache
				if(that.option.cacheAjaxPage == true){
					that.tableauCacheAjax[idSlider] = ajaxSlideContenu.response;
				}
			};
			
			ajaxSlideContenu.runAJAX();// Execute AJAX function
		};
		
		
		
		//**************************
		// Fonction pour l'animation du changement de page
		//**************************
		function scrollAnim() {
			
			//on verfie déja si l'animation n'est pas fini
			if (that.scrollAnimTempo.debutTempo > that.option.dureeSlide) {
				clearInterval(that.scrollAnimTempo.timer);
				that.scrollAnimTempo.debutTempo = 0;
			}else {
				var zoneSlide = document.getElementById(that.option.idSlider);
				//sinon animation
				var movePx = sineInOut(that.scrollAnimTempo.debutTempo, that.scrollAnimTempo.begin, that.scrollAnimTempo.change,that.option.dureeSlide);
				
				if(that.option.direction == "horizontal"){ 
					if(zoneSlide) zoneSlide.scrollLeft = movePx;
				}else{
					if(zoneSlide) zoneSlide.scrollTop = movePx;
				}
				
				that.scrollAnimTempo.debutTempo++;
			}
		};

		//**************************
		// Fonction pour selectionner le lien du menu en css
		//**************************
		this.selectCssMenu = function(linkMenu) {
			//on remplace pour rechercher le menu
			var linkMenu = linkMenu.replace(this.option.prefixSlide,this.option.prefixMenu);

			if(this.arrayMenuSlide){
				for (var idMenuSlide in this.arrayMenuSlide) {
					var lienMenuObj = document.getElementById(idMenuSlide);
					if(lienMenuObj != null && linkMenu == idMenuSlide){
						lienMenuObj.className = this.option.cssMenuNormal+" "+this.option.cssMenuActif;
					}else if(lienMenuObj != null){
						lienMenuObj.className = this.option.cssMenuNormal;
					}
				}
			}
		};
		
		//**************************
		// Fonction pour recupérer la position d'un element
		//**************************
		function findElementPos(elemFind){
			var elemX = 0;
			var elemY = 0;
			do {
				elemX += elemFind.offsetLeft;
				elemY += elemFind.offsetTop;
			} while ( elemFind = elemFind.offsetParent );
			return Array(elemX, elemY);
		};
		

		//**************************
		// gestion de l'effet de déplacement
		//From http://www.robertpenner.com/easing/
		//t = time, b = begin, c = change, d = duration
		//time = current frame, begin is fixed, change is basically finish - begin, duration is fixed (frames),
		//**************************
		function sineInOut(t, b, c, d){
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		};
		
		
		//**************************
		// Retourne les clés d'un array
		//**************************
		function array_keys (input) {
			var tmp_arr = new Array();
			var cnt=0;
			
			for (var key in input) { 
				tmp_arr[cnt] = key;
				cnt++;
			}
			
			return tmp_arr;
		};
			
		this.initialize();
	}
);