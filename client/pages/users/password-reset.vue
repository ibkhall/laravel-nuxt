<script setup lang="ts">

import { Form, SubmissionContext } from 'vee-validate';

definePageMeta({
    layout: "authenticated"
});

useHead({
	title: 'Changement de mot de passe'
})

const schema = usePasswordResetRules()
const {$sweetalert} = useNuxtApp()


const items = [
        {
          title: 'Profil',
          disabled: false,
          to: '/users',
        },
        {
          title: 'Changement de mot de passe',
          disabled: true,
          to: '/users/password-reset',
        },
       
      ]

const save = async (values: any, {setErrors}: SubmissionContext) => {
    useApi('/password/reset', {body: {...values,_method: 'put'}, method: 'post', onResponse: (res) => {
			if(res.response.status=== 200) {
				navigateTo({
				path: '/dashboard'
				})
                $sweetalert.updated()
			}else {
				setErrors(res.response._data.errors)
			}
			
		}})
   
}

</script>

<template>
<AppToolbar title="Changement de mot de passe" icon="mdi-account" prepend-icon="mdi-account" :breadcrumbs="items"></AppToolbar>


        
<Form is="v-form" :validation-schema="schema" @submit="save">
    <v-card color="surface">
    <v-card-text>
    <v-row justify="center" align="center">
        <v-col  md="6">
            <label for="old_password">Ancien mot de passe</label>
            <text-field type="password" name="old_password" id="old_password"></text-field>

            <label for="name">Nouveau mot de passe</label>
            <text-field type="password" name="password" id="password"></text-field>

            <label for="password_confirmation">Confirmation de mot de passe</label>
            <text-field type="password" name="password_confirmation" id="password_confirmation"></text-field>
            <v-btn class="mr-2" type="submit" theme="dark" variant="elevated" color="success">
                <v-icon start icon="mdi-store"></v-icon>
                Changer
            </v-btn>
            <v-btn :to="{name: 'dashboard'}" variant="elevated" color="grey">
                <v-icon start icon="mdi-cancel"></v-icon>
                Annuler
            </v-btn>
        </v-col>
    </v-row>
    
    
</v-card-text>
</v-card>
</Form>

</template>