<script setup lang="ts">
import { User } from '../models/User';

definePageMeta({
  layout: "authenticated"
});

const header = [
  {title: '#', value: 'id', class: ''},
  {title: 'Name', value: 'name', class: '', sortable: true},
  {title: 'Email', value: 'email', class: '', sortable: true},
]
const heh = 'hdhzjd'
</script>

<template>
  
<h5 class="text-h5">Tableau de bord</h5>
<div>
  <TableComponent v-model="heh" :headers="header" :model="User"/>

</div>

</template>