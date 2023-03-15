<script setup lang="ts">
import { Permission } from '@/models/Permission';

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
  
  <AppToolbar title="Liste permissions" icon="mdi-security" prepend-icon="mdi-security" :breadcrumbs="items"></AppToolbar>
<TableComponent :headers="headers" :model="Permission"/>


</template>