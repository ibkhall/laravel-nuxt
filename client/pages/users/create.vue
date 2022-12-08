<script setup lang="ts">
import UserRepository from '@/repositories/UserRepository'


definePageMeta({
    layout: "authenticated"
});

UserRepository.all().then(l => l)
console.log(useRoute().name)
</script>

<template>
  
<h5 class="text-h5">Create User</h5>


</template>