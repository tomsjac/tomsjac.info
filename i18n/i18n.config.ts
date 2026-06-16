export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'fr',
    fallbackLocale: 'fr',
    messages: {
        fr: {
            welcome: 'Bienvenue',
            layout: {
                title: 'Jacquey Thomas - Chef de projet - Lead Dev - Dev',
                seo: {
                    description: 'Spécialisé dans les Extranets, Intranets et Applications Spécifiques. Expert en création, développement et intégration de projets web avancés. Apporte une approche stratégique et technique de pointe pour concrétiser vos idées.',
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
        },
        en: {
            welcome: 'Welcome',
            layout: {
                title: 'Thomas Jacquey - Project Manager - Lead Dev - Dev',
                seo: {
                    description: 'Specialized in Extranets, Intranets and bespoke applications. Expert in the design, development and integration of advanced web projects. Brings a strategic, cutting-edge technical approach to turn your ideas into reality.',
                    keywords:'web application development, backend programming, web project management, development expertise, custom solutions, advanced web technologies, technical project manager, website architecture, web technology integration, application-specific needs, Extranet creation, Intranet design, enterprise applications, tailor-made web solutions, senior developer, web technology expert, web development strategies, web performance optimization, front-end and back-end integration',
                    author: 'Tomsjac',
                    ogTitle : 'Portfolio of Thomas Jacquey - PHP Lead Developer'
                },
            },
            section: {
                about: {
                    lastname: 'Jacquey',
                    firstname: 'Thomas',
                    jobs: {lead: 'Lead dev.', dev: 'Developer.', projectManager: 'Project manager.'}
                },
                resume: {
                    title: 'To get to',
                    titleImportantItem: 'know me',
                    icons: {
                        'linkedin': {title:'LinkedIn profile', desc:'Discover my career path, training and professional outlook.'},
                        'resume': {title:'Resume', desc:'Don\'t forget to save this PDF.'},
                        'twitter': {title:'Twitter', desc:'To stay up to date with the latest tech and dev trends.'},
                        'github': {title:'GitHub', desc:'Explore my space: experiments, tests and much more.'},
                    }
                },
                skill: {
                    title: 'A few of my',
                    titleImportantItem: 'skills',
                    icons: {
                        'plan': {title:'Thinking', desc:'Before the code: Strategy, Design, Anticipation.'},
                        'php': {title:'PHP', desc:'My lifelong ally: the language I have been working with from the start.'},
                        'laravel': {title:'Laravel', desc:'My main asset for building applications: Laravel in action.'},
                        'gitlab': {title:'GitLab', desc:'The essential tool to deploy projects and oversee technical progress.'},
                        'docker': {title:'Docker', desc:'A consistent environment for seamless development collaboration.'},
                        'vuejs': {title:'VueJS', desc:'Since the backend is not all that matters, let\'s do some front-end too.'},
                        'ninja': {title:'Ninja', desc:'Adaptable in any situation, always looking for solutions and firmly committed to learning.'},
                    }
                },
                hobbie: {
                    title: 'To clear',
                    titleImportantItem: 'my mind',
                    icons: {
                        'movie': {title:'Cinema', desc:'Passionate about films and series, I love immersing myself in a captivating scene with Dolby Atmos sound and a giant screen.'},
                        'mountainbike': {title:'Mountain biking', desc:'Perfect to clear my mind and have fun out in nature.'},
                        'cook': {title:'Cooking', desc:'I can\'t deny it, savoring delicious culinary creations is a guilty pleasure.'},
                        'travel': {title:'Travel', desc:'Exploring new cultures, tasting unusual flavors and discovering hidden corners of the globe.'},
                        'lego': {title:'Lego', desc:'Because loving little bricks is for young minds of all ages!'},
                    }
                },
            },
            tooltip: {
                mobile: 'Please double-click to open the link'
            }
        }
    }
}))
