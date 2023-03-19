
export const useDeleteConfirmation = async () => {

    return new Promise((resolve, reject) => {
        useConfirm().value.open('Etes-vous sur ?', 'Vous allez supprimer cet enregistrement', {}).then((r: boolean) => {
            if(r) {
                resolve(r)
            }else {
                reject(r)
            }
        })

    })

}

export const useConfirmation = async (message: string) => {

    return new Promise((resolve, reject) => {
        useConfirm().value.open('Etes-vous sur ?', message, {}).then((r: boolean) => {
            if(r) {
                resolve(r)
            }else {
                reject(r)
            }
        })

    })

}