<script setup lang="ts">
import { Permission } from '@/models/Permission';

definePageMeta({
    layout: "authenticated"
});


const headers = [
  {title: '#', value: 'id', class: ''},
  {title: 'Name', value: 'name', class: '', sortable: true},
]
</script>

<template>
  
<h5 class="text-h5">Permissions</h5>
<TableComponent :headers="headers" :model="Permission"/>


</template>