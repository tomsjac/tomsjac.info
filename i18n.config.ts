export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'fr',
    messages: {
        fr: {
            welcome: 'Bienvenue',
            layout: {
                title: 'Jacquey Thomas - Chef de projet - Lead Dev - Dev',
                seo: {
                    'description': 'amazing',
                },
            },
            section: {
                about: {
                    lastname: 'Jacquey',
                    firstname: 'Thomas',
                    jobs: {lead: 'Lead dev.', dev: 'Développeur.', projectManager: 'Chef de projet.'}
                },
                resume: {
                    title: 'Pour mieux me',
                    titleImportantItem: 'connaitre',
                    icons: {
                        'linkedin': {title:'Profil linkedin', desc:'Découvrez mon parcours, mes formations et mes perspectives professionnelles.'},
                        'resume': {title:'Curriculum vitae', desc:'N\'oubliez pas d\'enregistrez ce PDF.'},
                        'twitter': {title:'Twitter', desc:'Pour rester informé des dernières tendances tech et dev.'},
                        'github': {title:'GitHub', desc:'Découvrez mon espace : expérimentations, tests et bien d\'autres.'},
                    }
                },
                skill: {
                    title: 'Quelques une de mes',
                    titleImportantItem: 'compétences',
                    icons: {
                        'plan': {title:'Réflexion', desc:'Avant le code : Stratégie, Conception, Anticipation.'},
                        'php': {title:'PHP', desc:'Mon allié de toujours : le langage avec lequel je chemine depuis le début.'},
                        'laravel': {title:'Laravel', desc:'Mon atout majeur pour développer des applications : Laravel en action.'},
                        'gitlab': {title:'GitLab', desc:'L\'outil essentiel pour déployer les projets et superviser les avancées techniques.'},
                        'docker': {title:'Docker', desc:'Un environnement harmonisé pour une collaboration de développement sans faille.'},
                        'vuejs': {title:'VueJS', desc:'Comme il n\'y as pas que le backend qui compte, Faissons un peu de front'},
                        'ninja': {title:'Ninja', desc:'Adaptable en toute situation, toujours en quête de solutions et résolument en faveur de l\'apprentissage.'},
                    }
                },
            }
        }
    }
}))