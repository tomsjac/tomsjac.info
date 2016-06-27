<section id='content-profil'>
	<header>
		<h1>Profil</h1>
		<h2>Parlons un peu de mes compétences</h2>
		<nav>
			<ul>
				<li>
					<a href='{{infosEnv.SCRIPT_NAME}}/profil/gestion-projet/' {{#selectItem_gestionP}}class='select'{{/selectItem_gestionP}}>
						Gestion de projet
					</a>
				</li>
				<li>
					<a href='{{infosEnv.SCRIPT_NAME}}/profil/dev/' {{#selectItem_dev}}class='select'{{/selectItem_dev}}>
						Développement
					</a>
				</li>
				<li>
					<a href='{{infosEnv.SCRIPT_NAME}}/profil/integration/' {{#selectItem_int}}class='select'{{/selectItem_int}}>
						Intégration
					</a>
				</li>
			</ul>
		</nav>
	</header>
				
	<article id='contentProfil'>
		{{templateProfil}}
	</article>

</section>