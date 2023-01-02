<script setup lang="ts">
import { Activity } from '@/models/Activity';
import {mdiSecurity, mdiListBox} from '@mdi/js'

definePageMeta({
    layout: "authenticated"
});
useHead({
	title: 'Logs'
})
const items = [
        {
          title: 'Logs',
          disabled: false,
          to: '/logs',
        },
       
      ]
const headers = [
  {title: '#', value: 'id', class: ''},
  {title: 'Date', value: 'created_at', class: '', sortable: true},
  {title: 'Action', value: 'description', class: '', sortable: true},
  {title: 'Sujet', value: 'subject_type', class: '', sortable: true},
  {title: 'Causeur', value: 'causer', class: '', sortable: true},
  
]
</script>

<template>
  
  <AppToolbar title="Logs" :icon="mdiListBox" :prepend-icon="mdiListBox" :breadcrumbs="items"></AppToolbar>
<TableComponent density="compact" :headers="headers" :model="Activity">
  <template v-slot:causer="{item}">{{ item.causer?.name }}</template>
  <template v-slot:description="{item}">
    <v-chip v-if="item.description==='created'" size="small" color="primary">{{ item.description }}</v-chip>
    <v-chip v-else-if="item.description==='updated'" size="small" color="warning">{{ item.description }}</v-chip>
    <v-chip v-else-if="item.description==='deleted'" size="small" color="error">{{ item.description }}</v-chip>
    <v-chip v-else size="small" color="blue-grey">{{ item.description }}</v-chip>
  </template>
  </TableComponent>


</template>