<script setup lang="ts">
import type { Booking } from '@/types';
import { PaymentType } from '@/types/enum';
import { required, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

const props = defineProps({
  booking: Object as PropType<Booking>,
});

const emit = defineEmits(['updated']);

const { booking } = toRefs(props);
const paymentType = ref<PaymentType>();
const notes = ref<string>();

let paymentOptions: { [key in PaymentType]: string } = {
  [PaymentType.CreditTransfer]: PaymentType.CreditTransfer,
  [PaymentType.Paypal]: PaymentType.Paypal,
  [PaymentType.Revolut]: PaymentType.Revolut,
}

const inputChanged = (e: Event) => {
  booking.value.paymentType = paymentType.value
  booking.value.notes = notes.value
  $v.value.$validate();
  emit('updated', $v.value.$error)
}

const rules = computed(() => {
  return {
    paymentType: {
      required: helpers.withMessage('Payment type is required', required),
    },
  };
});

const $v = useVuelidate(rules, { paymentType });


onMounted(() => {
  paymentType.value = booking?.value?.paymentType
  notes.value = booking?.value?.notes
  emit('updated', $v.value.$silentErrors.length > 0)
})

</script>

<template>
  <div>
    <FormControl label="Payment type" inputName="payment" :has-error="$v.paymentType.$error"
      :error-message="$v.paymentType.$errors[0]?.$message as string">
      <div class="relative">
        <select v-model="paymentType" @change="inputChanged" name="payment"
          class="border text-gray-700 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
          <option v-for="paymentOption in paymentOptions" :key="paymentOption">{{ paymentOption }}</option>
        </select>
      </div>
    </FormControl>
    <FormControl label="Notes" inputName="notes">
      <textarea v-model="notes" name="notes" @input="inputChanged" rows="6"
        class="border text-gray-700 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "></textarea>
    </FormControl>
  </div>
</template>
