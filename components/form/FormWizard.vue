<script setup lang="ts">
import { ref } from 'vue';
import type { Booking } from '@/types';
import TravelStep from './TravelStep.vue';
import CustomerStep from './CustomerStep.vue';
import PaymentStep from './PaymentStep.vue';

const props = defineProps({
  booking: Object as PropType<Booking>,
});

const emit = defineEmits(['created']);
const { booking } = toRefs(props);
const currentStep = ref<number>(1);

type Step = {
  name: string
}

const steps: Step[] = [
  { name: 'Travel' },
  { name: 'Customer' },
  { name: 'Payment' }
];

const firstStepSubmitted = ref<boolean>(false)
const customerFormHasError = ref<boolean>(false)
const paymentFormHasError = ref<boolean>(false)
const errorTravel = computed(() => firstStepSubmitted.value && !booking?.value?.travel && currentStep.value === 1)

const customerFormUpdated = (hasError: boolean) => customerFormHasError.value = hasError
const paymentFormUpdated = (hasError: boolean) => paymentFormHasError.value = hasError

const nextStep = () => {
  if (currentStep.value === 1) {
    firstStepSubmitted.value = true
  }
  if ((currentStep.value === 1 && !errorTravel.value) || (currentStep.value === 2 && !customerFormHasError.value)) {
    currentStep.value++
  }
}

const prevStep = () =>
  currentStep.value--

const submitForm = () => {
  if (!paymentFormHasError.value) {
    emit('created')
  }
}
</script>

<template>
  <div class="mb-8">
    <ol class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
      <li v-for="(step, index) in   steps  " :key="index" class="flex  items-center "
        :class="{ 'text-blue-600 dark:text-blue-500': index === currentStep - 1, 'after:content-[\'\'] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700 md:w-full': index !== 2 }">
        <span class="flex items-center"
          :class="{ 'after:content-[\'/\'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500': index !== 2 }">
          <span v-if="index + 1 > currentStep" class="mr-1">{{ index + 1 }}</span>
          <svg v-else class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          {{ step.name }}
        </span>
      </li>
    </ol>
  </div>
  <form @submit.prevent="submitForm" class="min-h-[50vh] ">
    <template v-if="currentStep === 1">
      <TravelStep :booking="booking" @next="nextStep" :hasError="errorTravel" />
    </template>
    <template v-else-if="currentStep === 2">
      <CustomerStep :booking="booking" @next="nextStep" @prev="prevStep" @updated="customerFormUpdated" />
    </template>
    <template v-else-if="currentStep === 3">
      <PaymentStep :booking="booking" @submit="submitForm" @prev="prevStep" @updated="paymentFormUpdated" />
    </template>
  </form>
  <div class="flex mt-8 justify-between">
    <NuxtLink to="/bookings"
      class="btn btn-outline-primary border  hover:bg-slate-100 font-bold py-2 px-4 mr-4 rounded">
      Cancel
    </NuxtLink>
    <div class="">
      <!-- <div class="flex mt-8" :class="currentStep === 1 ? 'justify-end' : 'justify-between'"> -->
      <button v-if="currentStep > 1" @click="prevStep"
        class="btn bg-white hover:bg-gray-100 text-gray-800 px-3 py-2 mr-3 border font-medium rounded">Previous</button>
      <button v-if="currentStep < steps.length" @click="nextStep"
        class="btn bg-black hover:bg-red-600 text-white px-3 py-2 rounded font-medium min-w-20">Next</button>
      <button v-else @click="submitForm" type="submit"
        class="btn bg-black hover:bg-red-600 text-white px-3 py-2 rounded font-medium min-w-20">Submit</button>
    </div>
  </div>
</template>
