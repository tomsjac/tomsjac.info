<!-- Apercu des projets -->
<section id='dt-projet' class='{{classView}}'>
	<header>
		<h1>{{ infosProjet.nom }} </h1>
		<h2>
			<a href='{{& infosProjet.urlSite.0.link }}' rel="nofollow">
				{{ infosProjet.urlSite.0.intitule }} 
			</a>
		</h2>
		<h3>{{ infosProjet.slogan }}</h3>
		<ul>
			<li class='where'>{{ infosProjet.localisation }}</li>
			<li class='date'>{{ infosProjet.dateRealisation }}</li>
			<li class='code'>{{ infosProjet.languageOutils }}</li>
		</ul>
	</header>
	
	<figure>
		<div id='slideImgDProj'>
			<ul>
				{{# infosProjet.imgSlide }}
					<li id="img{{ key }}-pane">
						<a href="#imageZoom-{{ key }}">
							<img src="{{& infosEnv.SCRIPT_NAME }}{{& val.img }}" width='447' height='289'  alt="" />
							{{#  val.msgImgSlide }} 
								<div class='msgImgSlide'>{{& val.msgImgSlide }}</div>
							{{/  val.msgImgSlide }}
						</a>	
						<div class="lb-overlay" id="imageZoom-{{ key }}">
							<a href='#' class='lb-close'>X</a>
							<a href='#' class='lb-left'>&nbsp;</a>
							<a href='#' class='lb-right'>&nbsp;</a>
							<img src="{{& infosEnv.SCRIPT_NAME }}{{& val.imgZoom }}" alt="" />
							<div>{{ val.details }}</div>
						</div>
					</li>
				{{/ infosProjet.imgSlide }}
			</ul>
		</div>

		<ul id="menuImgSlide">
			{{#  infosProjet.imgSlide }}
				<li> 
					<a href="#img{{ key }}-pane" >&nbsp;</a> 
				</li>
			{{/  infosProjet.imgSlide }}
		</ul>
		
		<figcaption>
			<hr class='degradContent left bloc1'/><hr class='degradContent right bloc1'/>
			<hr class='degradContent left bloc2'/><hr class='degradContent right bloc2'/>
			<hr class='degradContent left bloc3'/><hr class='degradContent right bloc3'/>
			<hr class='degradContent left bloc4'/><hr class='degradContent right bloc4'/>
			<p>{{ infosProjet.description }}</p>
		</figcaption>
	</figure>	

	<nav>
		<div id='arrowSlide' >
			<a href='javascript:void(0)' data-direction='left' id='navImgSlideLeft'>&nbsp;</a>
			<a href='javascript:void(0)' data-direction='right' id='navImgSlideRight'>&nbsp;</a>
		</div>

		<div id='close' >
			<a href='{{& infosEnv.SCRIPT_NAME }}/portfolio/' data-type='left'>&nbsp;</a>
			<a href='{{& infosEnv.SCRIPT_NAME }}/portfolio/' data-type='right'>&nbsp;</a>
		</div>
	<nav>
</section>