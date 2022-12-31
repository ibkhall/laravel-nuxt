<script lang="ts" setup>
import { useField } from 'vee-validate';

const props = defineProps({
  name: {
    type: String,
    requird: true,
  }
});


const { value, handleBlur, errors } = useField(toRef(props as any, 'name'), undefined);
</script>

<template>
  <v-text-field
    v-model="value"
    @blur="handleBlur"
    :error-messages="errors"
    v-bind="$attrs"
  />
</template>
