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
		<div id='listProj'>
			<ul>
				{{# projetList }}
					<li id="block{{ block }}-pane">
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
					</li>
				{{/ projetList }}
			</ul>
		</div>
		
		<ul id="menuSlide">
			{{# projetList }}
				<li> 
					<a href="#block{{ block }}-pane" >&nbsp;</a> 
				</li>
			{{/ projetList }}
		</ul>

		<nav>
			<a href='javascript:void(0)' data-direction='left' id='navListPLeft'>&nbsp;</a>
			<a href='javascript:void(0)' data-direction='right' id='navListPRight' >&nbsp;</a>
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


