<template>
	<VContainer fluid class="fill-height">
		<VRow no-gutters align="center" justify="center" class="fill-height">
			<VCol cols="12" md="6" lg="5" sm="6">
				<VRow no-gutters align="center" justify="center">
					<VCol cols="12" md="6">
						<h1>Se connecter</h1>
						<p class="text-medium-emphasis">Enter your details to get started</p>

						<VForm @submit.prevent="submit" class="mt-7">
							<div class="mt-1">
								<label class="label text-grey-darken-2" for="email">Email</label>
								<VTextField
									:rules="[ruleRequired, ruleEmail]"
									v-model="form.email"
									:prepend-inner-icon="mdiEmail"
									id="email"
									name="email"
									type="email"
								/>
							</div>
							<div class="mt-1">
								<label class="label text-grey-darken-2" for="password">Password</label>
								<VTextField
									:rules="[ruleRequired, rulePassLen]"
									v-model="form.password"
									:prepend-inner-icon="mdiFormTextboxPassword"
									id="password"
									name="password"
									type="password"
								/>
							</div>
							<div class="mt-5">
								<VBtn type="submit" block min-height="44" color="primary">Sign In</VBtn>
							</div>
						</VForm>
					</VCol>
				</VRow>
			</VCol>
			<VCol class="hidden-md-and-down fill-height" md="6" lg="7">
				<VImg
					src="https://wallpaper.dog/large/5558117.png"
					cover
					class="h-100 rounded-xl d-flex align-center justify-center"
				>
					<div class="text-center w-50 text-white mx-auto">
						
					</div>
				</VImg>
			</VCol>
		</VRow>
	</VContainer>
</template>

<script setup lang="ts">
import { mdiFormTextboxPassword, mdiEmail } from '@mdi/js';
import axios from "axios";

axios.defaults.withCredentials = true;

const form = reactive({email: '', password: ''})
useHead({
	title: 'Authentification',
	titleTemplate: '%s - Boilerplate',
})
const submit = async () => {
    axios.get('http://localhost:8000/sanctum/csrf-cookie').then(r => {
        axios.post('http://localhost:8000/login', form).then(() =>{
            navigateTo({
                path: '/dashboard'
            })
        })
    })
}
const { ruleEmail, rulePassLen, ruleRequired } = useFormRules()

</script>
