<script setup lang="ts">
import { Role } from '@/models/Role';

definePageMeta({
  layout: "authenticated"
});

useHead({
	title: 'Liste rôles'
})

const {$emitter} = useNuxtApp()


const onDelete = (item: {id: string}) => {
  useDeleteConfirmation().then(() => {
    Role.$query().destroy(item.id)
    $emitter.emit(CONSTANT.REFRESH_DATATABLE as never)

  })
}

const headers = [
  {title: '#', key: 'id', class: ''},
  {title: 'Nom', key: 'name', class: '', sortable: true},
  {title: 'Description', key: 'description', class: '', sortable: true},
  {title: 'Permissions', key: 'permissions', class: 'text-center', sortable: false, width: '350'},
  {title: 'Date création', key: 'created_at', class: 'text-center', sortable: true},
  {title: 'Date Modification', key: 'updated_at', class: 'text-center', sortable: true},
  {title: 'Actions', key: 'actions', class: 'text-center', width: '150'},
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
<AppToolbar title="Liste rôles" icon="mdi-shield-lock" prepend-icon="mdi-shield-lock" :breadcrumbs="items"></AppToolbar>

<div>
  <v-row justify="end">
    <v-col md="2" cols="4">
      <v-btn exact :to="{name: 'roles-create'}" theme="dark" class="ml-md-15 text-white" size="small" color="success">
        <v-icon start icon="mdi-plus-circle"></v-icon>
        Ajouter
      </v-btn>
    </v-col>
  </v-row>
  <AppTable :headers="headers" :model="Role" :relations="['permissions']">
    <template v-slot:item.actions="{item}">
     
      <v-btn :to="{name: 'roles-id', params: {id: item.raw.id as number}}" icon="mdi-pencil" size="small" variant="text" color="warning">
      
      </v-btn>

      <v-btn @click="onDelete(item.raw)" icon="mdi-delete" size="small" variant="text" color="error">
      </v-btn>
    </template>
    <template v-slot:item.permissions="{item}">
      <div class="text-center">
        <v-chip
          size="small"
          v-for="permission in item.raw.permissions"
          color="success"
          class="ma-2"
        >
        {{ permission.description}}
        </v-chip>
  </div>
   </template>
  </AppTable>

</div>

</template>