<script setup lang="ts">
import {Permission} from '@/models/Permission'
import {Role} from '@/models/Role'
import {User} from '@/models/User'
import { mdiAccountEdit,mdiAccountMultiple, mdiStore, mdiCancel } from '@mdi/js';
import { Form, SubmissionContext } from 'vee-validate';
const schema = useUserRules()
definePageMeta({
    layout: "authenticated"
});

useHead({
	title: 'Editer utilisateur'
})

const {$sweetalert} = useNuxtApp()
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
        $sweetalert.updated()
    }catch(e: any) {
        setErrors(e.response.data.errors)
    }
    
}

const initialValues = {name: user.name, email: user.email, permissions: user.permissions.map((el: {id: number}) => el.id), roles: user.roles.map((el: {id: number}) => el.id), errors: {} as {[key:string]: string}}
</script>

<template>
<AppToolbar title="Edition utilisateur" :icon="mdiAccountEdit" :prepend-icon="mdiAccountMultiple" :breadcrumbs="items"></AppToolbar>


        
<Form v-slot="{values}" is="v-form" :initial-values="initialValues" :validation-schema="schema" @submit="save">
    <v-card color="surface">
    <v-card-text>
    <v-row>
        <v-col  md="6">
            <label for="name">Nom d'utilisateur</label>
            <text-field name="name" id="name"></text-field>
        </v-col>
        <v-col md="6">
            <label for="email">Email</label>
            <text-field type="email" name="email" id="email"></text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col md="6">
            <v-card variant="tonal" color="blue-grey">
                <v-card-title class="text-blue-grey">Rôles</v-card-title>
                <v-card-text>
                    <v-checkbox color="primary"
                        class="d-inline-block" 
                        v-for="role in roles[0].$response?.data.data" 
                        :value="role.id" 
                        :label="role.description" 
                        name="roles" 
                        v-model="values.roles"
                        multiple
                    />
                </v-card-text>
            </v-card>
           
        </v-col>
        <v-col md="6">
          <v-card variant="tonal" color="blue-grey">
            <v-card-title class="text-blue-grey">Permissions</v-card-title>
            <v-card-text>
                <v-checkbox color="success"
                    class="d-inline-block" 
                    v-for="permission in permissions[0].$response?.data.data" 
                    :value="permission.id" 
                    :label="permission.description" 
                    name="permissions" 
                    v-model="values.permissions"
                    multiple
            
                />
            </v-card-text>
          </v-card>

        
        </v-col>
    </v-row>
    
    
</v-card-text>
<v-card-actions>
    <v-spacer/>
    <v-btn type="submit" theme="dark" variant="elevated" color="success">
        <v-icon start :icon="mdiStore"></v-icon>
        Enregistrer
    </v-btn>
    <v-btn :to="{name: 'users'}" variant="elevated" color="grey">
        <v-icon start :icon="mdiCancel"></v-icon>
        Annuler
    </v-btn>
</v-card-actions>
</v-card>
</Form>

</template>