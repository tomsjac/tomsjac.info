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
                }
            }
        }
    }
}))