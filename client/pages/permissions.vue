<script setup lang="ts">
import UserRepository from '@/repositories/UserRepository'


definePageMeta({
    layout: "authenticated"
});

UserRepository.all().then(l => l)

</script>

<template>
  
<h5 class="text-h5">Permissions</h5>


</template>