<script setup lang="ts">
import { mdiAccount, mdiLogout, mdiLock } from '@mdi/js';
import {System} from '@/models/System'
import axios from 'axios';
import {Orion} from "@tailflow/laravel-orion/lib/orion";
Orion.makeHttpClientUsing(() => {
  const client = axios.create();

  client.interceptors.request.use(function (config) {
    // Do something before request is sent
    useLoading().value = true
    return config;
  }, function (error) {
    // Do something with request error
    useLoading().value = false
    return Promise.reject(error);
  });

// Add a response interceptor
client.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        useLoading().value = false
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        useLoading().value = false
        return Promise.reject(error);
    });

  return client;
});


useNuxtApp().vueApp.config.errorHandler = async (error: any, context) => {
    if(error.message=== 'Request failed with status code 401') {
        await navigateTo('/')
        window.location.reload()
    }
  }

const {$gates, provide} = useNuxtApp()
let drawer = ref(true);
const bgUrl = '/img/bg.jpeg'
const maleImg = '/img/male.png'
const {data} = await useApi('/user')
const system = await System.$query().find(1)
useNuxtApp().$system ?? provide('system', system)
useNuxtApp().$user ?? provide('user', data.value)
const $user = useNuxtApp().$user
$gates.setRoles($user.allRoles)
$gates.setPermissions($user.allPermissions)
useHead({
  titleTemplate: '%s - '+useNuxtApp().$system.$attributes.name,
})


const loading = useLoading()


const logout =  () => {
    useApi(`${useRuntimeConfig().public.apiBase}/logout`, {method: 'POST'}).then(() => {
        navigateTo('/')
        useApi(`${useRuntimeConfig().public.apiBase}/sanctum/csrf-cookie`)
    })
}
</script>

<template>
  <VApp>
    <NuxtLoadingIndicator :color="$vuetify.theme.current.colors.secondary" /> <!-- here -->
        <VMain>
    <v-navigation-drawer rounded="10" app v-model="drawer">
    <v-toolbar elevation="3" dense color="primary" class="rounded-ts-xl">
        <v-list-item
        
        >
        <template v-slot:title>
            <span class="font-weight-bold text-uppercase">{{ useNuxtApp().$system.$attributes.name }}</span>
        </template>
        
            <template v-slot:prepend>
            <v-avatar size="60">
                <v-img :src="`${useRuntimeConfig().public.apiBase}/`+useNuxtApp().$system.$attributes.logo"></v-img>
            </v-avatar>
            </template>
        </v-list-item>
    </v-toolbar>
    <v-card class="rounded-0" variant="elevated" :image="bgUrl" height="150">
        <v-list-item
        class="mt-10"
        color="black"
        :title="$user.name"
        :subtitle="$user.allRoles"
        >
        
            <template v-slot:prepend>
            <v-avatar>
                <v-img alt="profile"
                width="30"
                    :src="maleImg">
                </v-img>
            </v-avatar>
            </template>
        </v-list-item>
        
    </v-card>
  <NavigationLinks/>
</v-navigation-drawer>

<v-app-bar elevation="3" app color="primary" class="rounded-be-xl">
    <v-app-bar-nav-icon size="small" class="bg-secondary p-0 rounded-circle"  @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <v-spacer></v-spacer>

    <v-menu>
            <template v-slot:activator="{ on, props }">
            <v-btn
            color="primary"
            v-bind="props"
            >
            <v-avatar item size="32px">
                    <v-img alt="user" :src="maleImg"></v-img>
                </v-avatar>
            </v-btn>
        </template>
    
        <v-card outlined color="primary-darken-3" tile>
            <v-card-text>
            <v-row align="center" justify="center">
                <v-col md="12" cols="12">
                    <v-avatar class="profile" color="grey" size="80" >
                        <v-img class="mx-auto" :src="maleImg"></v-img>
                    </v-avatar>
                </v-col>
                <v-col cols="12">
                        <v-list-item>
                            <v-list-item-title>{{ $user.name }}</v-list-item-title>

                            <v-list-item-subtitle>
                                {{ $user.allRoles.join(', ') }}
                            </v-list-item-subtitle>
                        </v-list-item>
                    
                </v-col>
            </v-row>
            </v-card-text>
        </v-card>

        <v-list dense color="primary">
            <v-list-item :to="{name: 'users-show-id', params: {id: useNuxtApp().$user.id}}" rounded v-ripple :prepend-icon="mdiAccount" title="Mon Profil"></v-list-item>
            <v-list-item :to="{name: 'users-password-reset'}" rounded v-ripple :prepend-icon="mdiLock" title="Changement de mot de passe"></v-list-item>
            <v-list-item @click="logout" rounded v-ripple :prepend-icon="mdiLogout" title="Déconnexion"></v-list-item>
        </v-list>
    </v-menu>
</v-app-bar>
    <v-container fluid>
        <div class="text-center">
         <v-overlay
            persistent
            :model-value="loading"
            class="align-center justify-center"
            >
            <v-progress-circular
                color="secondary"
                indeterminate
                size="64"
             ></v-progress-circular>
        </v-overlay>
        </div>
        <slot />
    </v-container>

<v-footer app absolute dark color="primary" class="font-weight-medium">

    {{ new Date().getFullYear() }} © <small class="d-inline-block ml-2"> Boilerplate</small>
    <v-spacer></v-spacer>
    <span class="font-weight-light">Made with ❤️ by Khall</span>
</v-footer>
</VMain>
</VApp>
</template>