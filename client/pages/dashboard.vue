<script setup lang="ts">
import UserRepository from '@/repositories/UserRepository'

definePageMeta({
  layout: "authenticated"
});

const users = await UserRepository.all()

console.log(useRoute())
</script>

<template>
  
<h5 class="text-h5">Tableau de bord</h5>
<div>
  <TableComponent/>
{{users}}
</div>

</template>