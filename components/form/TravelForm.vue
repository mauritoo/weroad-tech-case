<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Travel } from '@/types';
import { required, helpers, minLength, minValue, maxValue } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

const props = defineProps<{
  travel: Travel | undefined;
}>()

const emit = defineEmits(['created', 'updated']);

const previewUrl = ref<string>('');
const travelFormData = ref<Travel>({
  id: undefined,
  name: '',
  departure_date: '',
  return_date: '',
  picture: '',
  description: '',
  price: 0,
  rating: 0
});

const rules = computed(() => {
  const today: string = new Date().toISOString().slice(0, 10);
  return {
    id: {},
    name: {
      required: helpers.withMessage('The name is required', required),
      minLength: helpers.withMessage('Name must be at least 10 characters', minLength(10)),
    },
    departure_date: {
      required: helpers.withMessage('Departure date is required', required),
      biggerThanToday: helpers.withMessage('Departure date must be bigger than today', (value: string) => {
        return value > today;
      }),
    },
    return_date: {
      required: helpers.withMessage('Return date is required', required),
      biggerThanDeparture: helpers.withMessage('Return date should be bigger than departure date', (value: string, allValues: any) => {
        return value > allValues.departure_date;
      }),
    },
    picture: {
      required: helpers.withMessage('Picture is required', required),
    },
    price: {
      required: helpers.withMessage('Price is required', required),
      minValue: helpers.withMessage('Price must be at least 1', minValue(1)),
    },
    rating: {
      maxValue: helpers.withMessage('Max rating is 5', maxValue(5)),
    },
    description: {
      required: helpers.withMessage('Description is required', required),
      minLength: helpers.withMessage('Description must be at least 10 characters', minLength(10)),
    },
  };
});

const $v = useVuelidate(rules, travelFormData);

onMounted(() => {
  if (props.travel) {
    Object.assign(travelFormData.value, props.travel);
    travelFormData.value.departure_date = props.travel.departure_date.slice(0, 10)
    travelFormData.value.return_date = props.travel.return_date.slice(0, 10)
    if (props.travel.picture) {
      previewUrl.value = props.travel.picture;
    }
  }
});

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    travelFormData.value.picture = file.name
    const reader: FileReader = new FileReader();
    reader.onload = (e) => {
      previewUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    previewUrl.value = '';
  }
};

const handleSubmit = () => {
  $v.value.$validate();
  if (!$v.value.$error) {
    emit((travelFormData.value.id === undefined) ? 'created' : 'updated');
  }
};

const inputClass = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
const errorClass = "border-red-500 focus:border-red-500"

</script>

<template>
  <form @submit.prevent="handleSubmit" class="mt-8">
    <div class="grid grid-cols-1 md:grid-cols-6 md:gap-4">
      <div class="md:col-span-4">
        <FormControl label="Name" inputName="name" :has-error="$v.name.$error"
          :error-message="$v.name.$errors[0]?.$message as string">
          <input v-model="travelFormData.name" type="text" id="name" name="name"
            :class="[inputClass, { errorClass: $v.name.$error }]">
        </FormControl>
      </div>
      <FormControl label="Departure date" inputName="departure_date" :has-error="$v.departure_date.$error"
        :error-message="$v.departure_date.$errors[0]?.$message as string">
        <input v-model="travelFormData.departure_date" type="date" id="departure_date"
          :class="[inputClass, { errorClass: $v.name.$error }]">
      </FormControl>
      <FormControl label="Return date" inputName="return_date" :has-error="$v.return_date.$error"
        :error-message="$v.return_date.$errors[0]?.$message as string">
        <input v-model="travelFormData.return_date" type="date" id="return_date"
          :class="[inputClass, { errorClass: $v.return_date.$error }]">
      </FormControl>
      <div class="md:col-span-4">
        <FormControl label="Description" inputName="description" :has-error="$v.description.$error"
          :error-message="$v.description.$errors[0]?.$message as string">
          <textarea v-model="travelFormData.description" id="description" rows="8"
            :class="[inputClass, { errorClass: $v.description.$error }]"></textarea>
        </FormControl>
      </div>
      <div class="md:col-span-2">
        <FormControl label="Picture" inputName="picture" :has-error="$v.picture.$error"
          :error-message="$v.picture.$errors[0]?.$message as string">
          <input @change="handleFileChange" accept="image/*"
            class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
            type="file" name="picture" :has-error="$v.picture.$error"
            :error-message="$v.picture.$errors[0]?.$message as string" />
          <img v-if="previewUrl" :src="previewUrl" alt="Preview" class="mt-2 h-32 object-cover w-full rounded">
        </FormControl>
      </div>
      <FormControl label="Price" inputName="price" :has-error="$v.price.$error"
        :error-message="$v.price.$errors[0]?.$message as string">
        <input v-model="travelFormData.price" type="number" id="price"
          :class="[inputClass, { errorClass: $v.price.$error }]">
      </FormControl>
      <FormControl label="Rating" inputName="rating" :has-error="$v.rating.$error"
        :error-message="$v.rating.$errors[0]?.$message as string">
        <input v-model="travelFormData.rating" type="number" id="rating"
          :class="[inputClass, { errorClass: $v.name.$error }]">
      </FormControl>
    </div>
    <div class="flex justify-end">
      <NuxtLink to="/travels"
        class="btn btn-outline-primary border  hover:bg-slate-100 font-bold py-2 px-4 mr-4 rounded">
        Cancel
      </NuxtLink>
      <button type="submit"
        class="btn btn-outline-primary bg-black hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Save</button>
    </div>
  </form>
</template>