<script setup lang="ts">
import {mdiCog} from '@mdi/js'
import { Form, SubmissionContext } from 'vee-validate';


definePageMeta({
    layout: "authenticated"
});
useHead({
	title: 'Logs'
})

const schema = useSystemRules()
const $system = useNuxtApp().$system
const items = [
        {
          title: 'Configuration',
          disabled: false,
          to: '/system',
        },
       
      ]

const save = async (values: any, context: SubmissionContext) => {
    const logo = values.file ? values?.file[0] : values.logo
    const data = new FormData()
    data.append('name', values.name)
    data.append('logo', logo)
    data.append('address', values.address)
    data.append('telephone1', values.telephone1)
    data.append('telephone2', values.telephone2 ?? '')
    data.append('telephone3', values.telephone3 ?? '')
    data.append('telephone4', values.telephone4 ?? '')
    data.append('_method', 'PUT')
    await useApi('/system/1',{method: 'POST', body: data})
    //await $system.$save(d)
    useNuxtApp().$sweetalert.updated()
    //setTimeout(() => window.location.reload(), 1000)
    
}
const logo = ref('http://localhost:8000/'+$system.$attributes.logo)

const onChange = (e: any) => {
    logo.value = URL.createObjectURL(e.target?.files[0])
}

</script>

<template>
  
  <AppToolbar title="Configuration" :icon="mdiCog" :prepend-icon="mdiCog" :breadcrumbs="items"></AppToolbar>


<Form @submit="save" v-slot="{values, errors}" :validation-schema="schema" :initial-values="$system.$attributes">
    <v-card>
    <v-card-text>
        <v-row>
            <v-col md="4">
                <v-card variant="plain" class="mb-1 text-center">
                   <v-card-text>
                    <v-img class="d- mx-auto" width="200" :src="logo"/>
                   </v-card-text>
                </v-card>
                <v-file-input label="Choisir le logo" :error-messages="errors.file" @change="onChange" v-model="values.file" variant="outlined"></v-file-input>
            </v-col>
            <v-col md="4">
                <label for="name">Nom de la socièté</label>
                <TextField id="name" name="name"></TextField>
                <label for="address">Adresse</label>
                <TextField id="address" name="address"></TextField>
                <label for="telephone1">Téléphone 1</label>
                <TextField id="telephone1" name="telephone1"></TextField>
            </v-col>
            <v-col md="4">
                <label for="telephone2">Téléphone 2</label>
                <TextField placeholder="optionel" id="telephone2" name="telephone2"></TextField>
                <label for="telephone3">Téléphone 3</label>
                <TextField placeholder="optionel" id="telephone3" name="telephone3"></TextField>
                <label for="telephone4">Téléphone 4</label>
                <TextField placeholder="optionel" id="telephone4" name="telephone4"></TextField>
            </v-col>
        </v-row>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey">Annuler</v-btn>
        <v-btn type="submit" color="success">Enregistrer</v-btn>
    </v-card-actions>
</v-card>
</Form>
</template>