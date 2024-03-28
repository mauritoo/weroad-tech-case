<script lang="ts" setup>
import type { Customer } from '~/types';
import { formatDate } from '@/helpers/utils';

defineProps<{
  customer: Customer,
}>()

</script>

<template>
  <div v-if="customer" class="">
    <div v-if="customer.name" class="">Name: {{ customer.name }}</div>
    <div v-if="customer.phoneNumber" class="text-sm">Phone: {{ customer.phoneNumber }}</div>
    <div v-if="customer.email" class="text-sm">Email: {{ customer.email }}</div>
    <div v-if="customer.birthDate" class="text-sm">Birth date: {{ formatDate(customer.birthDate) }}</div>
    <div v-if="customer.gender" lass="text-sm">Gender: {{ customer.gender }}</div>
  </div>
</template>