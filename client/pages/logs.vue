<script setup lang="ts">
import { Activity } from '@/models/Activity';


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
  {title: '#', key: 'id', class: ''},
  {title: 'Date', key: 'created_at', class: '', sortable: true},
  {title: 'Action', key: 'description', class: '', sortable: true},
  {title: 'Sujet', key: 'subject_type', class: '', sortable: true},
  {title: 'Causeur', key: 'causer', class: '', sortable: true},
  
]
</script>

<template>
  
  <AppToolbar title="Logs" icon="mdi-list-box" prepend-icon="mdi-list-box" :breadcrumbs="items"></AppToolbar>
<AppTable density="compact" :headers="headers" :model="Activity">
  <template v-slot:item.causer="{item}">{{ item.raw.causer?.name }}</template>
  <template v-slot:item.description="{item}">
    <v-chip v-if="item.raw.description==='created'" size="small" color="primary">{{ item.raw.description }}</v-chip>
    <v-chip v-else-if="item.raw.description==='updated'" size="small" color="warning">{{ item.raw.description }}</v-chip>
    <v-chip v-else-if="item.raw.description==='deleted'" size="small" color="error">{{ item.raw.description }}</v-chip>
    <v-chip v-else size="small" color="blue-grey">{{ item.raw.description }}</v-chip>
  </template>
  </AppTable>


</template>