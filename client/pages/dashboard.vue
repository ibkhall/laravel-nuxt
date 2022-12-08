<script setup lang="ts">
import { Permission } from '../models/Permission';
import { User } from '../models/User';
definePageMeta({
  layout: "authenticated"
});

const permissions = await Permission.$query().get()
const users = await User.$query().get()

</script>

<template>
  
<h5 class="text-h5">Tableau de bord</h5>
<div>
  <TableComponent/>
{{permissions}}
{{users}}
</div>

</template>