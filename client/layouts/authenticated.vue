<script setup lang="ts">
import {System} from '@/models/System'



useNuxtApp().vueApp.config.errorHandler = async (error: any, context) => {
    if(error.message=== 'Request failed with status code 401') {
        await navigateTo('/')
        window.location.reload()
    }
  }
const confirm = ref(null)

onMounted(() => {
    useConfirm().value = confirm.value
})

const {$gates} = useNuxtApp()
let drawer = ref(true);
const bgUrl = '/img/bg.jpeg'
const maleImg = '/img/male.png'
const {data} = await useApi('/user')
useUser().value = data.value as {id: number, name: string, email: string, allRoles: string[], allPermissions: string[]}

useSystem().value =(await System.$query().find(1)).$attributes as {id: number, name: string, logo: string}

const user = useUser().value
const system = useSystem().value
$gates.setRoles(user.allRoles)
$gates.setPermissions(user.allPermissions)
useHead({
  titleTemplate: '%s - '+system.name,
})



const logout =  () => {
    useApi(`${useRuntimeConfig().public.apiBase}/logout`, {method: 'POST'}).then(() => {
        navigateTo('/')
        useApi(`${useRuntimeConfig().public.apiBase}/sanctum/csrf-cookie`)
    })
}
</script>

<template>
  <VApp>
    <Confirm ref="confirm"/>
    <NuxtLoadingIndicator :color="$vuetify.theme.current.colors.secondary" /> <!-- here -->
        <VMain>
            
    <v-navigation-drawer rounded="10" app v-model="drawer">
    <v-toolbar elevation="3" dense color="primary" class="rounded-ts-xl">
        <v-list-item
        
        >
        <template v-slot:title>
            <span class="font-weight-bold text-uppercase">{{ system.name }}</span>
        </template>
        
            <template v-slot:prepend>
            <v-avatar size="60">
                <v-img :src="`${useRuntimeConfig().public.apiBase}/`+system.logo"></v-img>
            </v-avatar>
            </template>
        </v-list-item>
    </v-toolbar>
    <v-card class="rounded-0" variant="elevated" :image="bgUrl" height="150">
        <v-list-item
        class="mt-10"
        color="black"
        :title="user.name"
        :subtitle="user.allRoles.join(',')"
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
            <template v-slot:activator="{  props }">
            <v-btn
            color="primary"
            v-bind="props"
            >
            <v-avatar item size="32px">
                <Icon size="2rem" name="flat-color-icons:businessman"/>
                </v-avatar>
            </v-btn>
        </template>
    
        <v-card outlined color="primary-darken-3" tile>
            <v-card-text>
            <v-row align="center" justify="center">
                <v-col md="12" cols="12">
                    <v-avatar class="profile" size="80" >
                        <Icon size="4rem" name="flat-color-icons:businessman"/>
                    </v-avatar>
                </v-col>
                <v-col cols="12">
                        <v-list-item>
                            <v-list-item-title>{{ user.name }}</v-list-item-title>

                            <v-list-item-subtitle>
                                {{ user.allRoles.join(', ') }}
                            </v-list-item-subtitle>
                        </v-list-item>
                    
                </v-col>
            </v-row>
            </v-card-text>
        </v-card>

        <v-list dense color="primary">
            <v-list-item :to="{name: 'users-show-id', params: {id: user.id}}" rounded v-ripple prepend-icon="mdi-account" title="Mon Profil"></v-list-item>
            <v-list-item :to="{name: 'users-password-reset'}" rounded v-ripple prepend-icon="mdi-lock" title="Changement de mot de passe"></v-list-item>
            <v-list-item @click="logout" rounded v-ripple prepend-icon="mdi-logout" title="Déconnexion"></v-list-item>
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