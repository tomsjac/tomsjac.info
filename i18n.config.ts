export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'fr',
    messages: {
        fr: {
            welcome: 'Bienvenue',
            layout: {
                title: 'Jacquey Thomas - Chef de projet - Lead Dev - Dev',
                seo: {
                    description: 'Lead développeur PHP spécialisé dans les Extranets, Intranets et Applications Spécifiques. Expert en création, développement et intégration de projets web avancés. Apporte une approche stratégique et technique de pointe pour concrétiser vos idées.',
                    keywords:'développement d\'applications web, programmation backend, gestion de projets web, expertise en développement, solutions personnalisées, technologies web avancées, gestionnaire de projet technique, architecture de site web, intégration de technologies web, applications spécifiques aux besoins, création d\'Extranet, conception d\'Intranet, applications pour entreprise, solutions web sur mesure, développeur senior, expert en technologies web, stratégies de développement web, optimisation de performance web, intégration front-end et back-end',
                    author: 'Tomsjac',
                    ogTitle : 'Portfolio de Thomas Jacquey - Lead développeur PHP'
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
                hobbie: {
                    title: 'Pour me vider',
                    titleImportantItem: 'l\'esprit',
                    icons: {
                        'movie': {title:'Cinéma', desc:'Passionné par les films et les séries, j\'adore m\'immerger dans une scène captivante avec un son Dolby Atmos et un écran géant.'},
                        'mountainbike': {title:'VTT', desc:'Idéal pour se vider l\'esprit et se faire plaisir en pleine nature'},
                        'cook': {title:'Cuisiner', desc:'Je ne peux le nier, savourer de délicieuses créations culinaires est un plaisir coupable.'},
                        'travel': {title:'Voyage', desc:'Explorer de nouvelles cultures, goûter des saveurs inédites et découvrir des recoins insolites du globe.'},
                        'lego': {title:'Légo', desc:'Parce qu\'aimer les petites briques, c\'est pour les esprits jeunes de tous âges !'},
                    }
                },
            },
            tooltip: {
                mobile: 'Veuillez double-cliquer pour accéder au lien'
            }
        }
    }
}))