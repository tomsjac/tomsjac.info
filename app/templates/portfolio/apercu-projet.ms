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
        <div class="swiper-container" id='slideImgDProj'>
            <div class="swiper-wrapper">
                {{# infosProjet.imgSlide }}
					<div class="swiper-slide">
						<a href="#imageZoom-{{ key }}">
							<img src="{{& infosEnv.SCRIPT_NAME }}{{& val.img }}" width='447' height='289'  alt="" />
							{{#  val.msgImgSlide }} 
								<div class='msgImgSlide'>{{& val.msgImgSlide }}</div>
							{{/  val.msgImgSlide }}
						</a>	
					</div>
				{{/ infosProjet.imgSlide }}
            </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination" id='paginationSlideIP' ></div>

		<figcaption>
			<hr class='degradContent left bloc1'/><hr class='degradContent right bloc1'/>
			<hr class='degradContent left bloc2'/><hr class='degradContent right bloc2'/>
			<hr class='degradContent left bloc3'/><hr class='degradContent right bloc3'/>
			{{! <hr class='degradContent left bloc4'/><hr class='degradContent right bloc4'/> }}
			<p>{{ infosProjet.description }}</p>
		</figcaption>
        
        <!-- detailed project overview -->
        <section id='overviewProject' >
            {{# infosProjet.imgSlide }}
                <div class="lb-overlay" id="imageZoom-{{ key }}">
                    <a href='#' class='lb-close'>X</a>
                    <a href='#' class='lb-left'>&nbsp;</a>
                    <a href='#' class='lb-right'>&nbsp;</a>
                    <img src="{{& infosEnv.SCRIPT_NAME }}{{& val.imgZoom }}" alt="" />
                    <div>{{ val.details }}</div>
                </div>
            {{/ infosProjet.imgSlide }}
        </section>
	</figure>	

	<nav>
        <!-- Add Arrows -->
        <div id='arrowSlide'>
            <a class="swiper-button-next" id='nextSlideIP' data-direction='right'></a>
            <a class="swiper-button-prev" id='prevSlideIP' data-direction='left'> </a>
        </div>

		<div id='close' >
			<a href='{{& infosEnv.SCRIPT_NAME }}/portfolio/' data-type='left'>&nbsp;</a>
			<a href='{{& infosEnv.SCRIPT_NAME }}/portfolio/' data-type='right'>&nbsp;</a>
		</div>
	<nav>
</section>