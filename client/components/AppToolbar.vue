<script lang="ts" setup>

const props = defineProps<{
    icon: string,
    title: string,
    prependIcon: string,
    breadcrumbs: Array<{title: string, disabled: boolean, to: {name: string, params?: {id?: unknown}} | string}>
}>()



</script>

<template>
<v-toolbar color="blue-grey-lighten-5" density="comfortable" elevation="2" border class="px-1 rounded-t-lg border-primary border-t-md border-b-md mb-2">
   <v-card color="inherit" elevation="1" class="px-3 mx-3 py-1 border-md  border-primary">
   <Icon size="1.6rem" class="text-primary" :name="props.icon"/>
   </v-card>
   <v-divider vertical></v-divider>
   <v-list lines="two" nav>
    <v-list-item >
      <v-toolbar-title class="text-h6 font-weight-medium text-blue-grey mt-3">{{ props.title }}</v-toolbar-title>
     <v-list-item-subtitle>
      <v-breadcrumbs density="compact" :items="props.breadcrumbs">
        <template v-slot:prepend>
          <Icon size="1rem" :name="props.prependIcon"/>
      </template>
      <template v-slot:divider>
        <Icon size="1rem" name="mdi:chevron-right"/>
      </template>
    </v-breadcrumbs>
     </v-list-item-subtitle>
    </v-list-item>
   </v-list>
    
</v-toolbar>

</template>