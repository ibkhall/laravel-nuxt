<script setup lang="ts">
import {Permission} from '@/models/Permission'
import {Role} from '@/models/Role'
import { Form, SubmissionContext } from 'vee-validate';

const schema = useRoleRules()

definePageMeta({
    layout: "authenticated"
});

useHead({
	title: 'Ajouter un rôle'
})

const {$sweetalert} = useNuxtApp()

const onSubmit = async (values: any, {setErrors}: SubmissionContext) => {
    try {
        const role = await Role.$query().store({
            name: values.name,
            description: values.description,
        })
        await role.permissions().sync(values.permissions)
        navigateTo('/roles')
        $sweetalert.created()
    }catch(e: any) {
      setErrors(e.response.data.errors)
    }
  
}


const  permissions = await Permission.$query().get(500)

const items = [
        {
          title: 'Rôles',
          disabled: false,
          to: '/roles',
        },
        {
          title: 'Ajouter un rôle',
          disabled: true,
          to: '/roles/create',
        },
       
      ]
</script>

<template>
<AppToolbar title="Ajouter un rôle" icon="mdi-shield-lock" prepend-icon="mdi-shield-lock" :breadcrumbs="items"></AppToolbar>


       
<Form v-slot="{values}"  is="v-form" :initial-values="{permissions: []}" :validation-schema="schema" @submit="onSubmit">
    <v-card color="surface">
    <v-card-text>
        <div class="w-50 mx-md-auto">
            <label class="label" for="name"></label>
            <text-field label="Nom du rôle" id="name" name="name"/>
            
        </div>
        <div class="w-50 mx-md-auto">
            <text-field label="Description du rôle" id="description" name="description"/>
        </div>
        <div class="w-50 mx-auto">
            <AutocompleteField label="Permissions"  v-model="values.permissions" chips multiple item-title="description" item-value="id" :items="permissions[0].$response?.data.data" id="permissions"></AutocompleteField>
        
        </div>
        
        <div class="mx-md-auto w-50">
            <v-btn type="submit" theme="dark" variant="elevated" color="success">
            <Icon name="mdi:store"></Icon>
            Enregistrer
            </v-btn>
            <v-btn :to="{name: 'roles'}" variant="elevated" color="grey">
                <Icon name="mdi:cancel"></Icon>
                Annuler
            </v-btn>
        </div>
</v-card-text>
</v-card>
</Form>

</template>