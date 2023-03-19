<script setup lang="ts">
import { User } from '@/models/User';

definePageMeta({
  layout: "authenticated"
});
const {$emitter} = useNuxtApp()
const user = useUser().value
useHead({
	title: 'Liste utilisateurs'
})
const onDelete = (item: {id: string}) => {
  useDeleteConfirmation().then(() => {
    User.$query().destroy(item.id)
    $emitter.emit(CONSTANT.REFRESH_DATATABLE as never)

  })
}

const deleteAction = (ids: {}) => {
  useDeleteConfirmation().then(() => {
    useApi('/users/batch', {
      body: {
        "resources": Object.values(ids)
      },
      method: 'DELETE'
    }).then(d => {
        $emitter.emit(CONSTANT.REFRESH_DATATABLE as never)
    })
  })
}



const activateAction = (ids: {}, activate = true) => {
  let message = activate ? 'De voulloir activer' : 'De voulloir désactiver'

  useConfirmation(message).then(() => {
    
    const obj = {} as any
    Object.values(ids).map((el: any) => {
      obj[el] = {
        'is_active': activate
      }
    })
    useApi('/users/batch', {
      body: {
        "resources": obj
      },
      method: 'PATCH'
    }).then(d => {
        $emitter.emit(CONSTANT.REFRESH_DATATABLE as never)
    })
    
  })
  
}

const headers = [
  {title: '#', key: 'id', class: ''},
  {title: 'Nom', key: 'name', class: '', sortable: true},
  {title: 'Email', key: 'email', class: '', sortable: true},
  {title: 'Date création', key: 'created_at', class: 'text-center', sortable: true},
  {title: 'Date modification', key: 'updated_at', class: 'text-center', sortable: true},
  {title: 'Statut', key: 'is_active', class: 'text-center', sortable: false},
  {title: 'Actions', key: 'actions', class: 'text-center', width: '200', sortable: false},
]
const items = [
        {
          title: 'Utlisateurs',
          disabled: false,
          to: '/users',
        },
       
      ]
</script>

<template>
<AppToolbar title="Liste utilisateurs" icon="mdi-account-multiple" prepend-icon="mdi-account-multiple" :breadcrumbs="items"></AppToolbar>

<div>
  <v-row justify="end">
    <v-col md="2" cols="4">
      <v-btn v-permission="'user.create'" exact :to="{name: 'users-create'}" theme="dark" class="ml-md-15 text-white" size="small" color="success">
        <v-icon start icon="mdi-plus-circle"></v-icon>
        Ajouter
      </v-btn>
    </v-col>
  </v-row>
  <AppTable :headers="headers" :model="User" show-select>
    <template v-slot:actions="selected">
      <v-btn @click="deleteAction(selected)" color="error" size="small" variant="tonal">
          <v-icon start>mdi-delete-outline</v-icon>
          Supprimer
      </v-btn>
      <v-btn color="warning" @click="activateAction(selected, false)" size="small" class="ml-1" variant="tonal">
          <v-icon start>mdi-account-off-outline</v-icon>
          Désactiver
      </v-btn>
      <v-btn color="success" @click="activateAction(selected, true)" size="small" class="ml-1" variant="tonal">
          <v-icon start>mdi-account-reactivate</v-icon>
          Activer
      </v-btn>
     
    </template>
    <template v-slot:item.actions="{item}">
     
      <v-btn :to="{name: 'users-show-id', params: {id: item.raw.id as number}}" icon="mdi-account-details" size="small" variant="text" color="info"/>
      <v-btn :to="{name: 'users-id', params: {id: item.raw.id as number}}" icon="mdi-pencil" size="small" variant="text" color="warning"/>
      <v-btn :disabled="item.id==user.id" icon="mdi-delete" @click="onDelete(item)" size="small" variant="text" color="error"/>
    </template>

    <template v-slot:item.is_active="{item}">
     <v-chip label size="small" color="success" v-if="item.raw.is_active">activé</v-chip>
     <v-chip label size="small" color="warning" v-else>désactivé</v-chip>
   </template>
  </AppTable>

</div>

</template>