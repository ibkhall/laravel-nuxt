<script setup lang="ts">
import {Permission} from '@/models/Permission'
import {Role} from '@/models/Role'
import {User} from '@/models/User'
import { Form, SubmissionContext } from 'vee-validate';
const schema = useUserRules()
definePageMeta({
    layout: "authenticated"
});

useHead({
	title: 'Editer utilisateur'
})

const user = (await User.$query().with(['permissions', 'roles']).find(useRoute().params.id as string)).$response?.data.data
const  permissions = await Permission.$query().get(500)

const  roles = await Role.$query().get(500)
const items = [
        {
          title: 'Utlisateurs',
          disabled: false,
          to: '/users',
        },
        {
          title: 'Edition utilisateur',
          disabled: true,
          to: ''
        },
       
      ]

const save = async (values: any, {setErrors}: SubmissionContext) => {
    try {
        const user = await User.$query().update(useRoute().params.id as string,{
        name: values.name,
        email: values.email
        })
        await user.roles().sync(values.roles)
        await user.permissions().sync(values.permissions)

        navigateTo('/users')
       
    }catch(e: any) {
        setErrors(e.response.data.errors)
    }
    
}

const initialValues = {name: user.name, email: user.email, permissions: user.permissions.map((el: {id: number}) => el.id), roles: user.roles.map((el: {id: number}) => el.id), errors: {} as {[key:string]: string}}
</script>

<template>
<AppToolbar title="Edition utilisateur" icon="mdi-account-edit" prepend-icon="mdi-account-multiple" :breadcrumbs="items"></AppToolbar>


        
<Form v-slot="{values}" is="v-form" :initial-values="initialValues" :validation-schema="schema" @submit="save">
    <v-card color="surface">
    <v-card-text>
    <v-row>
        <v-col offset="3" md="6">
            <text-field label="Nom d'utilisateur" name="name" id="name"></text-field>
            <text-field label="Email" type="email" name="email" id="email"></text-field>
            <AutocompleteField label="Rôles"  v-model="values.roles" chips multiple item-title="description" item-value="id" :items="roles[0].$response?.data.data" id="roles"></AutocompleteField>
            <AutocompleteField label="Permissions"  v-model="values.permissions" chips multiple item-title="description" item-value="id" :items="permissions[0].$response?.data.data" id="permissions"></AutocompleteField>
        
        </v-col>
    </v-row>
    
    
</v-card-text>
<v-card-actions>
    <v-spacer/>
    <v-btn type="submit" theme="dark" variant="elevated" color="success">
        <Icon name="mdi:store"></Icon>
        Enregistrer
    </v-btn>
    <v-btn :to="{name: 'users'}" variant="elevated" color="grey">
        <Icon name="mdi:cancel"></Icon>
        Annuler
    </v-btn>
</v-card-actions>
</v-card>
</Form>

</template>