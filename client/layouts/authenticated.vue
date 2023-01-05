<script setup lang="ts">
import axios from "axios";
import { mdiAccount, mdiLogout, mdiLock } from '@mdi/js';
import {System} from '@/models/System'
axios.defaults.withCredentials = true;
const {$gates, provide} = useNuxtApp()
let drawer = ref(true);
const imgUrl = '/img/logo.png'
const bgUrl = '../img/bg.jpeg'
const maleImg = '/img/male.png'
const response = await axios.get('http://localhost:8000/api/user')
const system = await System.$query().find(1)
useNuxtApp().$system ?? provide('system', system)
useNuxtApp().$user ?? provide('user', response.data)
const $user = useNuxtApp().$user
$gates.setRoles($user.allRoles)
$gates.setPermissions($user.allPermissions)
useHead({
  titleTemplate: '%s - Boilerplate',
})



const logout =  () => {
    useApi('http://localhost:8000/logout', {method: 'POST'}).then(() => {
        navigateTo('/')
        useApi('http://localhost:8000/sanctum/csrf-cookie')
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
        :title="useNuxtApp().$system.$attributes.name"
        >
        
            <template v-slot:prepend>
            <v-avatar>
                <v-img width="80" :src="'http://localhost:8000/'+useNuxtApp().$system.$attributes.logo"></v-img>
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
    <v-app-bar-nav-icon class="bg-secondary rounded-lg"  @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

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