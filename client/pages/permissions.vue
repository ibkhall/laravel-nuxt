<script setup lang="ts">
import { Permission } from '@/models/Permission';
import {mdiSecurity} from '@mdi/js'

definePageMeta({
    layout: "authenticated"
});
useHead({
	title: 'Liste permissions'
})
const items = [
        {
          title: 'Permissions',
          disabled: false,
          to: '/permissions',
        },
       
      ]
const headers = [
  {title: '#', value: 'id', class: ''},
  {title: 'Nom', value: 'name', class: '', sortable: true},
  {title: 'Description', value: 'description', class: '', sortable: true},
]
</script>

<template>
  
  <AppToolbar title="Liste permissions" :icon="mdiSecurity" :prepend-icon="mdiSecurity" :breadcrumbs="items"></AppToolbar>
<TableComponent :headers="headers" :model="Permission"/>


</template>