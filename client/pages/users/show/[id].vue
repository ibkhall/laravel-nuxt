<script setup lang="ts">

import {User} from '@/models/User'


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

const tab = ref('Activités')
  const elements =  ref([
    'Activités', 'Autre 1', 'Autre 2', 'Autre 3',
  ])
  const text = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')
      
</script>

<template>
<AppToolbar title="Profil utilisateur" icon="mdi-card-account-details" prepend-icon="mdi-account-multiple" :breadcrumbs="items"/>

<v-row>
  <v-col md="3">
    <v-card variant="tonal" color="primary">
      <v-card-text class="text-center">
        <v-avatar image="/img/male.png" size="150"></v-avatar>
        <h5 class="mt-4 text-body-1">{{ user.name }}</h5>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-text>
        <v-table density="compact" class="border-0">
        <tbody>
          <tr>
          <td class="font-weight-bold text-blue-grey">Nom:</td>
          <td>{{user.name}}</td>
        </tr>
        <tr>
          <td class="font-weight-bold text-blue-grey">Email:</td>
          <td>{{ user.email }}</td>
        </tr>
        <tr>
          <td class="font-weight-bold text-blue-grey">Rôles:</td>
          <td>
            <v-chip
                size="small"
                v-for="role in user.roles"
                color="success"
                class="ma-2"
              >
              {{ role.name}}
            </v-chip>
          </td>
        </tr>
        </tbody>
      </v-table>
      </v-card-text>
      </v-card>
  </v-col>
  <v-col md="9">

    <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h2 text-blue-grey">
        PROFIL
      </h1>
    </v-card-title>

    <v-tabs
      v-model="tab"
      bg-color="transparent"
      color="secondary"
      grow
    >
      <v-tab
        v-for="item in elements"
        :value="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item
        value="Activités"
      >
        <v-card
          color="basil"
          flat
        >
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-window-item>
      <v-window-item
        value="Autre 1"
      >
        <v-card
          color="basil"
          flat
        >
          <v-card-text>

          </v-card-text>
        </v-card>
      </v-window-item>
      <v-window-item
        value="Autre 2"
      >
        <v-card
          color="basil"
          flat
        >
          <v-card-text>

          </v-card-text>
        </v-card>
      </v-window-item>
      <v-window-item
        value="Autre 3"
      >
        <v-card
          color="basil"
          flat
        >
          <v-card-text>

          </v-card-text>
        </v-card>
      </v-window-item>
    </v-window>
  </v-card>
  </v-col>
</v-row>
        

</template>