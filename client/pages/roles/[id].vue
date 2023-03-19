<script setup lang="ts">
import {Permission} from '@/models/Permission'
import {Role} from '@/models/Role'
import { Form, SubmissionContext } from 'vee-validate';
definePageMeta({
    layout: "authenticated"
});
useHead({
	title: 'Edition rôle'
})
const schema = useRoleRules()
const {$sweetalert} = useNuxtApp()
const role = (await Role.$query().with(['permissions']).find(useRoute().params.id as string)).$response?.data.data


const save = async (values: any, {setErrors}: SubmissionContext) => {

    try {
        const role = await Role.$query().update(useRoute().params.id as string,{
            name: values.name,
            description: values.description
        })
        await role.permissions().sync(values.permissions)

        navigateTo('/roles')
        $sweetalert.updated()
    }catch(e: any) {
        setErrors(e.response.data.errors)
    }

    
}

const initialValues = {name: role.name, description: role.description, permissions: role.permissions.map((el: {id: number}) => el.id), errors: {} as {[key: string]: string}}

const  permissions = await Permission.$query().get(500)

const items = [
        {
          title: 'Rôles',
          disabled: false,
          to: '/roles',
        },
        {
          title: 'Edition rôle',
          disabled: true,
          to: '/roles/id',
        },
       
      ]
</script>

<template>
<AppToolbar title="Edition rôle" icon="mdi-shield-lock" prepend-icon="mdi-shield-lock" :breadcrumbs="items"></AppToolbar>


        
<Form v-slot="{values}" :initial-values="initialValues" :validation-schema="schema" is="v-form" @submit="save">
    <v-card color="surface">
    <v-card-text>
        <div class="w-50 mx-md-auto">
            <text-field label="Nom rôle" name="name" id="name"></text-field>
        </div>
        <div class="w-50 mx-md-auto">
            <text-field label="Description rôle" name="description" id="nadescriptionme"></text-field>
        </div>
        <div class="w-50 mx-auto">
            <AutocompleteField label="Permissions" v-model="values.permissions" chips multiple item-title="description" item-value="id" :items="permissions[0].$response?.data.data" id="permissions"></AutocompleteField>
        
        </div>
        <div class="mx-md-auto w-50">
            <v-btn type="submit"  theme="dark" class="mr-md-2" variant="elevated" color="success">
                <v-icon start icon="mdi-store"></v-icon>
                Enregistrer
            </v-btn>
            <v-btn :to="{name: 'roles'}" variant="elevated" color="grey">
                <v-icon start icon="mdi-cancel"></v-icon>
                Annuler
            </v-btn>
        </div>
</v-card-text>
</v-card>
</Form>

</template>