<section id='content-contact'>
	<header>
		<h1>Contact</h1>
		<h2>Convaincu ??</h2>
		<div>N'hésitez pas à me contacter</div>
	</header>
				
	<article>
		<form action='' method='post' id='formContact' > 
			<label for='nomContact' ></label>
			<input type='text' name='nomContact' id='nomContact' value='' placeholder='Votre nom / prénom' />
			
			<label for='mailContact' ></label>
			<input type='text' name='mailContact' id='mailContact' value='' placeholder='Votre adresse mail' />
			
			<label for='msgContact' ></label>
			<textarea name='msgContact' id='msgContact' placeholder='Votre message' ></textarea>
			
			<input type='text' name='cestkikilerobot' id='cestkikilerobot' placeholder='' />

			{{^ statutMail.send}}
				<input type='submit' name='sendMsg' id='sendMsg' value='Envoyer' /> 
			{{/ statutMail.send}}
			
			{{# statutMail.send}}
				<div class='msgOk'>Merci, votre message a bien été envoyé</div>
			{{/ statutMail.send}}

			{{# statutMail.nosend}}
				<div class='msgNo'>Une erreur est survenu lors de l'envoi, veuillez réessayer, merci</div>
			{{/ statutMail.nosend}}

			<div id='noJs'>Le javascript doit être activé pour envoyer un message</div>
		</form>
		
		<ul>
			<li data-role='local'>
				<span>Localisation : </span>
	  			<div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
			     	<span itemprop="addressCountry">{{linkData.localisation.Region}}</span>,
			     	<span itemprop="addressLocality">{{linkData.localisation.Ville}}</span>
			     	(<span itemprop="postalCode">{{linkData.localisation.Cp}}</span>)
			     	<span itemprop="addressRegion">FR</span>
			   	</div>
			</li>
			
			<li data-role='twitter'>
				<span>Twitter : </span> <a href='{{linkData.linkTwitter}}'>@tomsjac</a>
			</li>
			
			{{#linkData.linkViadeo}}
				<li data-role='viadeo'>
					<a href='{{linkData.linkViadeo}}'>Viadéo</a>
				</li>
			{{/linkData.linkViadeo}}
			
			{{#linkData.linkLinkedin}}
				<li data-role='linkedin'>
					<a href='{{linkData.linkLinkedin}}'>LinkedIn</a>
				</li>
			{{/linkData.linkLinkedin}}
			
			<li data-role='cvPdf'>
				<a href='{{infosEnv.SCRIPT_NAME}}{{linkData.linkPdfCV}}'>Cv au format Pdf</a>
			</li>
		</ul>
	</article>
</section>