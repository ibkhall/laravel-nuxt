<script setup lang="ts">
import { User } from '@/models/User';
import {mdiPencil, mdiDelete, mdiAccountMultiple, mdiPlusCircle, mdiAccountDetails} from '@mdi/js'
definePageMeta({
  layout: "authenticated"
});
const {$sweetalert, $emitter} = useNuxtApp()
useHead({
	title: 'Liste utilisateurs'
})
const onDelete = (item: {id: string}) => {
  $sweetalert.deleteConfirmation(() => {
    User.$query().destroy(item.id)
    $emitter.emit('onDelete' as never)

  })
}
const header = [
  {title: '#', value: 'id', class: ''},
  {title: 'Nom', value: 'name', class: '', sortable: true},
  {title: 'Email', value: 'email', class: '', sortable: true},
  {title: 'Date création', value: 'created_at', class: 'text-center', sortable: true},
  {title: 'Date Modification', value: 'updated_at', class: 'text-center', sortable: true},
  {title: 'Actions', value: 'actions', class: 'text-center', width: '200'},
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
<AppToolbar title="Liste utilisateurs" :icon="mdiAccountMultiple" :prepend-icon="mdiAccountMultiple" :breadcrumbs="items"></AppToolbar>

<div>
  <v-row justify="end">
    <v-col md="2" cols="4">
      <v-btn v-permission="'user.create'" exact :to="{name: 'users-create'}" theme="dark" class="ml-md-15 text-white" size="small" color="success">
        <v-icon start :icon="mdiPlusCircle"></v-icon>
        Ajouter
      </v-btn>
    </v-col>
  </v-row>
  <TableComponent :headers="header" :model="User">
    <template v-slot:actions="{item}">
     
      <v-btn :to="{name: 'users-show-id', params: {id: item.id as number}}" :icon="mdiAccountDetails" size="small" variant="text" color="info"/>
      <v-btn :to="{name: 'users-id', params: {id: item.id as number}}" :icon="mdiPencil" size="small" variant="text" color="warning"/>
      <v-btn :disabled="item.id==useNuxtApp().$user.id" :icon="mdiDelete" @click="onDelete(item)" size="small" variant="text" color="error"/>
    </template>
  </TableComponent>

</div>

</template>