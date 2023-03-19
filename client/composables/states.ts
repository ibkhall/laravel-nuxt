export const useLoading = () => useState<boolean>('loading', () => false)

export const useSystem = () => useState<{id: number, name: string, logo: string}>('system')

export const useUser = () => useState<{id: number, name: string, email: string, allRoles: string[], allPermissions: string[]}>('user')

export const useConfirm = () => useState<any>('confirm')