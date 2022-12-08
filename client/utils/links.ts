import { mdiAccount, mdiSquareMedium, mdiViewDashboard, mdiSecurity, mdiShieldLock,mdiShieldAccount } from '@mdi/js';

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
        icon: mdiAccount,
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
        title: 'Droits d\'accès',
        icon: mdiShieldAccount,
        children: [
            {
                title: 'Rôles',
                icon: mdiShieldLock,
                children: [
                    {
                        title: 'Ajouter un rôle',
                        icon: mdiSquareMedium,
                        to: {name: 'roles-create'}
                    },
                    {
                        title: 'Liste rôles',
                        icon: mdiSquareMedium,
                        to: {name: 'roles'}
                    }
                ]
                
            },
            {
                title: 'Permissions',
                icon: mdiSecurity,
                to: {name: 'permissions'}
            }
        ]
    },
   
]

export default items