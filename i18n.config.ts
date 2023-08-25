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
                }
            }
        }
    }
}))