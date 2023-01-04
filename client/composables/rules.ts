import {object,string,array} from 'yup'

export const useLoginRules = () => {
	return object({
		name: string().required().min(3),
		password: string().required().min(6),
	  });
};




export const useRoleRules = () => {
	return object({
		name: string().required().min(3),
		description: string().required().min(3),
		permissions: array()
	  });
}


export const useUserRules = () => {
	return object({
		name: string().required().min(3),
		email: string().email().required(),
		roles: array(),
		permissions: array(),
	  });
}


export const usePasswordResetRules = () => {
	return object({
		old_password: string().required(),
		password: string().required().min(6),
		password_confirmation: string().min(6)
	  });
}

export const useSystemRules = () => {
	return object({
		name: string().required().min(3),
		file: object().nullable(),
		address: string().required().min(3),
		telephone1:string().matches(
			/^(6|7|8|9)\d{7}$/,
			'Numéro de téléphone non valide'
		  ),
		telephone2: string().matches(
			/^$|^(6|7|8|9)\d{7}$/,
			'Numéro de téléphone non valide'
		  ).transform(value => value || '')
		 ,
		telephone3: string().matches(
			/^$|^(6|7|8|9)\d{7}$/,
			'Numéro de téléphone non valide'
		  ).transform(value => value || '')
		  ,
		telephone4: string().matches(
			/^$|^(6|7|8|9)\d{7}$/,
			'Numéro de téléphone non valide'
		  ).transform(value => value || '')
		  ,
	  });
}
  
  