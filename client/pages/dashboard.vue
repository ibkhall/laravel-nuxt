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
  
<h5 class="text-h5">Tableau de bord</h5>
<v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows="hover"
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
        :color="colors[i]"
        height="100%"
      >
        <div class="d-flex fill-height justify-center align-center">
          <div class="text-h2">
            {{ slide }} Slide
          </div>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>

</template>