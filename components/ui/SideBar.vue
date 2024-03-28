<script setup lang="ts">
import MyLink from './MyLink.vue';
const linkClass = "flex items-center p-2 text-gray-900 rounded dark:text-white hover:bg-slate-100 dark:hover:bg-gray-700 group ms-3" 
</script>

<template>
  <aside id="default-sidebar" class="w-64 h-[calc(100vh-56px)] transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li>
          <MyLink to="/travels" title="Travels" :class="linkClass" />
        </li>
        <li>
          <MyLink to="/bookings" title="Bookings" :class="linkClass" />
        </li>
      </ul>
    </div>
  </aside>
</template>