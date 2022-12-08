<script setup lang="ts">
import { mdiAccount } from '@mdi/js';

let drawer = ref(true);
const imgUrl = new URL('../img/logo.png', import.meta.url).href
const bgUrl = new URL('../img/bg.jpeg', import.meta.url).href
const maleImg = new URL('../img/male.png', import.meta.url).href

</script>

<template>
  <VApp>
        <VMain>
    <v-navigation-drawer rounded="10" app v-model="drawer">
    <v-toolbar elevation="3" dense color="primary" class="rounded-ts-xl">
        <v-list-item
        title="Boilerplate"
        >
        
            <template v-slot:prepend>
            <v-avatar>
                <v-img width="80" :src="imgUrl"></v-img>
            </v-avatar>
            </template>
        </v-list-item>
    </v-toolbar>
    <v-card class="rounded-0" variant="text" :image="bgUrl" height="150">
        <v-list-item
        class="mt-10"
        color="black"
        title="John Doe"
        subtitle="Administrateur"
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
    <v-app-bar-nav-icon class="bg-pink-lighten-1" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

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
                            <v-list-item-title>Content filtering</v-list-item-title>

                            <v-list-item-subtitle>
                            Administrateur
                            </v-list-item-subtitle>
                        </v-list-item>
                    
                </v-col>
            </v-row>
            </v-card-text>
        </v-card>

        <v-list dense>
            <v-list-item rounded v-ripple class="text-grey-darken-3" :prepend-icon="mdiAccount" title="Mon Profil"></v-list-item>
            <v-list-item rounded v-ripple class="text-grey-darken-3" :prepend-icon="mdiAccount" title="Changement de mot de passe"></v-list-item>
            <v-list-item rounded v-ripple class="text-grey-darken-3" :prepend-icon="mdiAccount" title="Déconnexion"></v-list-item>
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