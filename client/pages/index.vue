<template>
	<VContainer fluid class="fill-height">
		<VRow no-gutters align="center" justify="center" class="fill-height">
			<VCol cols="12" md="6" lg="5" sm="6">
				<VRow no-gutters align="center" justify="center">
					<VCol cols="12" md="6">
						<h1>Se connecter</h1>
						<p class="text-medium-emphasis">Entrer vos identifiants</p>

						<Form :validation-schema="schema" @submit="submit" class="mt-7">
							<div class="mt-1">
								<label class="label text-grey-darken-2" for="name">Nom d'utilisateur</label>
								<TextField
									id="name"
									name="name"
								>
								<template v-slot:prepend-inner>
									<Icon class="text-primary" name="mdi:account" size="1.5rem"/>
								</template>
								</TextField>
							</div>
							<div class="mt-1">
								<label class="label text-grey-darken-2" for="password">Mot de passe</label>
								<TextField
									id="password"
									name="password"
									type="password"
								>
								<template v-slot:prepend-inner>
									<Icon class="text-primary" name="mdi:lock" size="1.5rem"/>
								</template>
								</TextField>
							</div>
							<div class="mt-5">
								<VBtn type="submit" block min-height="50" color="primary">
									<Icon size="1.3rem" class="mr-1" name="mdi:login"/>
									Connexion
								</VBtn>
							</div>
						</Form>
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
import { Form, SubmissionContext } from 'vee-validate';


useHead({
	title: 'Authentification',
	titleTemplate: '%s - Boilerplate',
})
const submit = async (values: any, {setErrors}: SubmissionContext) => {
    useApi(`${useRuntimeConfig().public.apiBase}/sanctum/csrf-cookie`).then(async (r) => {
		useApi(`${useRuntimeConfig().public.apiBase}/login`, {body: values, method: 'post', onResponse: (res: any) => {
			if(res.response.status=== 200) {
				navigateTo({
				path: '/dashboard'
				})
			}else {
				setErrors(res.response._data.errors)
			}
			
		}})
		
    })
}
const schema = useLoginRules()

</script>
