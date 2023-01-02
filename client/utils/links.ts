import { mdiAccountMultiple, mdiSquareMedium, mdiViewDashboard, mdiCogs,mdiShieldAccount,mdiListBox } from '@mdi/js';

interface Item {
    title: string,
    icon: string,
    to?: object | string,
    children?: this[]
}

const items: Item[] = [
    {
        title: 'Tablea de bord',
        icon: mdiViewDashboard,
        to: {name: 'dashboard'}
    },
    {
        title: 'Utilisateurs',
        icon: mdiAccountMultiple,
        children: [
            {
                title: 'Ajouter un utilisateur',
                icon: mdiSquareMedium,
                to: {name: 'users-create'}
            },
            {
                title: 'Liste utilisateurs',
                icon: mdiSquareMedium,
                to: {name: 'users'}
            }
        ]
    },
    {
        title: 'Sytème',
        icon: mdiCogs,
        children: [
            {
                title: 'Droits d\'accès',
                icon: mdiShieldAccount,
                children: [
                    {
                        title: 'Permissions',
                        icon: mdiSquareMedium,
                        to: {name: 'permissions'}
                    },
                    {
                        title: 'Rôles',
                        icon: mdiSquareMedium,
                        to: {name: 'roles'}
                    }
                ]
                
            },
            {
                title: 'Logs',
                icon: mdiListBox,
                to: {name: 'logs'}
            }
        ]
    }
   
]

export default items