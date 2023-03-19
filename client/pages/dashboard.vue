<script setup lang="ts">
import { User } from '@/models/User';

definePageMeta({
  layout: "authenticated"
});

useHead({
	title: 'Tableau de bord'
})

const header = [
  {title: '#', value: 'id', class: ''},
  {title: 'Name', value: 'name', class: '', sortable: true},
  {title: 'Email', value: 'email', class: '', sortable: true},
]
const colors = [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ]
const slides = [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ]
</script>

<template>
  
<AppToolbar title="Tableau de bord" :breadcrumbs="[]" icon="mdi-view-dashboard" prepend-icon=""/>


</template>