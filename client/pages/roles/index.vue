<script setup lang="ts">
import { Role } from '@/models/Role';
import {mdiPencil, mdiDelete, mdiShieldLock, mdiPlusCircle} from '@mdi/js'

definePageMeta({
  layout: "authenticated"
});

useHead({
	title: 'Liste rôles'
})

const {$sweetalert, $emitter} = useNuxtApp()


const onDelete = (item: {id: string}) => {
  $sweetalert.deleteConfirmation(() => {
    Role.$query().destroy(item.id)
    $emitter.emit('onDelete')

  })
}

const header = [
  {title: '#', value: 'id', class: ''},
  {title: 'Nom', value: 'name', class: '', sortable: true},
  {title: 'Description', value: 'description', class: '', sortable: true},
  {title: 'Permissions', value: 'permissions', class: 'text-center', sortable: false, width: '350'},
  {title: 'Date création', value: 'created_at', class: 'text-center', sortable: true},
  {title: 'Date Modification', value: 'updated_at', class: 'text-center', sortable: true},
  {title: 'Actions', value: 'actions', class: 'text-center', width: '150'},
]
const items = [
        {
          title: 'Rôles',
          disabled: false,
          to: '/roles',
        },
       
      ]
</script>

<template>
<AppToolbar title="Liste rôles" :icon="mdiShieldLock" :prepend-icon="mdiShieldLock" :breadcrumbs="items"></AppToolbar>

<div>
  <v-row justify="end">
    <v-col md="2" cols="4">
      <v-btn exact :to="{name: 'roles-create'}" theme="dark" class="ml-md-15 text-white" size="small" color="success">
        <v-icon start :icon="mdiPlusCircle"></v-icon>
        Ajouter
      </v-btn>
    </v-col>
  </v-row>
  <TableComponent :headers="header" :model="Role" :relations="['permissions']">
    <template v-slot:actions="{item}">
     
      <v-btn :to="{name: 'roles-id', params: {id: item.id as number}}" :icon="mdiPencil" size="small" variant="text" color="warning">
      
      </v-btn>

      <v-btn @click="onDelete(item)" :icon="mdiDelete" size="small" variant="text" color="error">
      </v-btn>
    </template>
    <template v-slot:permissions="{item}">
      <div class="text-center">
        <v-chip
          size="small"
          v-for="permission in item.permissions"
          color="success"
          class="ma-2"
        >
        {{ permission.description}}
        </v-chip>
  </div>
   </template>
  </TableComponent>

</div>

</template>