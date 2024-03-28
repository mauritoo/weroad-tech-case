<script setup lang="ts">
import BaseModal from './BaseModal.vue';

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'result', value: boolean): void
}>()

function emitResult(value: boolean) {
  emit('result', value)
}
</script>

<template>
  <BaseModal :show="show">
    <slot :emit-result="emitResult">
      <div>
        <slot name="title" :emit-result="emitResult">
          <div class="text-lg font-medium mb-4">Please confirm</div>
        </slot>

        <slot name="body">
          <div class="py-2 text-sm mb-8">Do you really want to perform this action?</div>
        </slot>

        <slot name="actions" :emit-result="emitResult">
          <div class="flex justify-end gap-2">
            <button class="bg-white hover:bg-gray-100 text-gray-800 px-3 py-2 border font-medium rounded"
              @click="$emit('result', false)">
              No
            </button>

            <button class="bg-black hover:bg-red-600 text-white px-3 py-2 rounded font-medium"
              @click="$emit('result', true)">
              Yes
            </button>
          </div>
        </slot>
      </div>
    </slot>
  </BaseModal>
</template>