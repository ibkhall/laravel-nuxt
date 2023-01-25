<script setup lang="ts">
import { mdiChevronRight } from '@mdi/js';
const props = defineProps<{
    icon: string,
    title: string,
    prependIcon: string,
    breadcrumbs: Array<{title: string, disabled: boolean, to: {name: string, params?: {id?: unknown}} | string}>
}>()


</script>
<template>
<v-toolbar elevation="10" border density="compact" class="px-5 rounded-t-lg border-primary border-t-md border-b-md">
   <v-card elevation="3" class="px-4 py-1 border-md  border-primary">
    <v-icon color="primary" :icon="props.icon"></v-icon>
   </v-card>
    <v-toolbar-title class="h-1 font-weight-bold text-primary">{{ props.title }}</v-toolbar-title>
    
</v-toolbar>
<v-toolbar elevation="1" color="white" border height="30" class="px-5 mb-3 border-primary border-opacity-25 border-md border-t-0 rounded-b-lg">
   <v-spacer/>
    <v-breadcrumbs active-color="primary" color="blue-grey" :items="props.breadcrumbs">
        <template v-slot:prepend>
        <v-icon color="primary" :icon="props.prependIcon"></v-icon>
      </template>
      <template v-slot:divider>
        <v-icon :icon="mdiChevronRight"></v-icon>
      </template>
    </v-breadcrumbs>
    
</v-toolbar>

</template>