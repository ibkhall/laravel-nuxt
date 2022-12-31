import {object,string,array} from 'yup'

export const useFormRules = () => {
	return {
		ruleRequired: (v: any) => !!v || "Required",
		ruleEmail: (value: any) => {
			const pattern =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return pattern.test(value) || "Enter a valid email";
		},
		rulePassLen: (v: string) => (!!v && v.length >= 6) || "Password must be 6 chars or more",
	};
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
  
  