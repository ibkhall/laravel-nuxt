
interface Item {
    title: string,
    icon: string,
    to?: object | string,
    children?: this[]
}

const items: Item[] = [
    {
        title: 'Tablea de bord',
        icon: 'mdi-view-dashboard',
        to: {name: 'dashboard'}
    },
    {
        title: 'Utilisateurs',
        icon: 'mdi-account-multiple',
        children: [
            {
                title: 'Ajouter un utilisateur',
                icon: 'mdi-square-medium',
                to: {name: 'users-create'}
            },
            {
                title: 'Liste utilisateurs',
                icon: 'mdi-square-medium',
                to: {name: 'users'}
            }
        ]
    },
    {
        title: 'Système',
        icon: 'mdi-cogs',
        children: [
            {
                title: 'Droits d\'accès',
                icon: 'mdi-shield-account',
                children: [
                    {
                        title: 'Permissions',
                        icon: 'mdi-square-medium',
                        to: {name: 'permissions'}
                    },
                    {
                        title: 'Rôles',
                        icon: 'mdi-square-medium',
                        to: {name: 'roles'}
                    }
                ]
                
            },
            {
                title: 'Configuration',
                icon: 'mdi-cog',
                to: {name: 'system'}
            },
            {
                title: 'Logs',
                icon: 'mdi-list-box',
                to: {name: 'logs'}
            }
        ]
    }
   
]

export default items