<script setup lang="ts">
import {Permission} from '@/models/Permission'
import {Role} from '@/models/Role'
import {User} from '@/models/User'
import { mdiCardAccountDetails,mdiAccountMultiple, mdiStore, mdiCancel } from '@mdi/js';

definePageMeta({
    layout: "authenticated"
});

useHead({
	title: 'Détails utilisateur'
})

const user = (await User.$query().with(['permissions', 'roles']).find(useRoute().params.id as string)).$response?.data.data

const items = [
        {
          title: 'Utlisateurs',
          disabled: false,
          to: '/users',
        },
        {
          title: 'Profil utilisateur',
          disabled: true,
          to: ''
        },
       
      ]

</script>

<template>
<AppToolbar title="Profil utilisateur" :icon="mdiCardAccountDetails" :prepend-icon="mdiAccountMultiple" :breadcrumbs="items"/>

<v-row>
  <v-col md="4">
    <v-card variant="tonal" color="primary">
      <v-card-text class="text-center">
        <v-avatar image="/img/male.png" size="150"></v-avatar>
        <h5 class="mt-4 text-body-1">{{ user.name }}</h5>
      </v-card-text>
    </v-card>
    <v-card>
        <v-list density="compact">
          <v-list-subheader>Rôles</v-list-subheader>

          <v-list-item
            v-for="(item, i) in user.roles"
            :key="i"
            :value="item"
            active-color="primary"
          >

            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
  </v-col>
  <v-col md="8">

  </v-col>
</v-row>
        

</template>