import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

export default defineNuxtPlugin((NuxtApp) => {
  
    return {
      provide: {
        sweetalert: {
            confirm: (obj: {title: string,text: string}, callback: Function) => {

                Swal.fire({
                    title: obj.title,
                    text: obj.text,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Oui',
                    cancelButtonText: 'Non'
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      await callback()
                      Swal.fire(
                        'Succès!',
                        'Opération effectuée !',
                        'success'
                      ).then(() => {
                        
                      })
                    }
                  })
            },
            deleteConfirmation: (callback: Function) => {

              Swal.fire({
                  title: 'Etes-vous sûr ?',
                  text: 'Vous allez supprimer cet enregistrement',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Oui',
                  cancelButtonText: 'Non'
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    await callback()
                    Swal.fire(
                      'Succès!',
                      'Opération effectuée !',
                      'success'
                    )
                  }
                })
          },
          created: () => {
            Swal.fire(
              'Succès!',
              'Enregistrement effectué !',
              'success'
            )
          },
          updated: () => {
            Swal.fire(
              'Succès!',
              'Mise à jour effectuée !',
              'success'
            )
          },
        }
      }
    }
  })