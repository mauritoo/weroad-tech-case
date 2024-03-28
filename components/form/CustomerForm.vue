<script setup lang="ts">
import { ref } from 'vue';
import type { Booking, Customer } from '@/types';
import { Gender } from '~/types/enum';
import { required, helpers, email } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

const props = defineProps({
  booking: Object as PropType<Booking>,
});

const emit = defineEmits(['updated']);

const { booking } = toRefs(props);
let genderOptions: { [key in Gender]: string } = {
  [Gender.Male]: Gender.Male,
  [Gender.Female]: Gender.Female,
  [Gender.Other]: Gender.Other,
}
const customerFormData = ref<Customer>({
  name: '',
  email: '',
  phoneNumber: '',
  birthDate: '',
  gender: undefined
});

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage('The name is required', required),
    },
    email: {
      required: helpers.withMessage('Email is required', required),
      email: helpers.withMessage('Invalid email format', email),
    },
    phoneNumber: {
      required: helpers.withMessage('Phone number is required', required),
    },
    birthDate: {
      required: helpers.withMessage('Birthdate is required', required),
    },
    gender: {},
  };
});

const $v = useVuelidate(rules, customerFormData);

onMounted(() => {
  if (booking?.value?.customer) {
    customerFormData.value = booking?.value?.customer
  }
  emit('updated', $v.value.$silentErrors.length > 0)
})

const inputClass = 'appearance-none border rounded w-full p-2.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
const inputChanged = (): void => {
  booking.value.customer = customerFormData
  $v.value.$validate();
  emit('updated', $v.value.$error)
}

</script>

<template>
  <FormControl label="Name" inputName="name" :has-error="$v.name.$error"
    :error-message="$v.name.$errors[0]?.$message as string">
    <input v-model="customerFormData.name" @input="inputChanged" type="text" name="name" :class="inputClass">
  </FormControl>
  <FormControl label="Email" inputName="email" :has-error="$v.email.$error"
    :error-message="$v.email.$errors[0]?.$message as string">
    <input v-model="customerFormData.email" @input="inputChanged" type="email" name="email" :class="inputClass">
  </FormControl>
  <FormControl label="Phone number" inputName="phone_number" :has-error="$v.phoneNumber.$error"
    :error-message="$v.phoneNumber.$errors[0]?.$message as string">
    <input v-model="customerFormData.phoneNumber" @input="inputChanged" type="tel" name="phone_number"
      :class="inputClass">
  </FormControl>
  <FormControl label="Birthdate" inputName="birthdate" :has-error="$v.birthDate.$error"
    :error-message="$v.birthDate.$errors[0]?.$message as string">
    <input v-model="customerFormData.birthDate" @input="inputChanged" type="date" name="birthdate" :class="inputClass">
  </FormControl>
  <FormControl label="Gender" inputName="gender">
    <div class="relative">
      <select v-model="customerFormData.gender" @input="inputChanged"
        class="border text-gray-700 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
        <option v-for="genderOption in genderOptions" :key="genderOption">{{ genderOption }}</option>
      </select>
    </div>
  </FormControl>
</template>