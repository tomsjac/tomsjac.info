<section id='content-portfolio'>
	<header>
		<h1>Portfolio</h1>
		<h2>Quelques-unes de mes réalisations</h2>
		
		<section>
			Dans le domaine des :
			<ul>
				<li>Extranet</li>
				<li>FrameWork</li>
				<li>CMS</li>
				<li>Site Web</li>
				<li>Personnel</li>
			</ul>
		</section>
	</header>

	<article>
        <div class="swiper-container"  id='listProj'>
            <div class="swiper-wrapper">
                {{# projetList }}
					<div class="swiper-slide">
						{{# details }}
							<figure data-type='{{ type }}'>
								<a href='{{&infosEnv.SCRIPT_NAME}}/portfolio/{{ id }}/'>
									<img src="{{& infosEnv.SCRIPT_NAME }}{{& imgMiniature }}"  alt="" />
									<figcaption>
										<p>{{ categorie }} {{^ categorie }} - {{/ categorie }}</p>
										<h3>{{ nom }}</h3>
									</figcaption>
								</a>
							</figure>
						{{/ details }}
					</div>
				{{/ projetList }}
            </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination" id='paginationSlideP'></div>

        <!-- Add Arrows -->
        <nav>
            <a class="swiper-button-next" id='nextSlideP' data-direction='right'></a>
            <a class="swiper-button-prev" id='prevSlideP' data-direction='left'> </a>
        </nav>
	</article>
</section>

<!-- Template JS pour le détails du projet -->
<script id="templateDetailsProjet" type="text/template">
	{{ templateDetailsProjet }}
</script>

<script type="text/javascript" charset="utf-8">
	/* Json des projets */
	var JsonProjet = {{& projetJson }};
</script>


