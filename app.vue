<script setup lang="ts">
import Logo from './components/ui/Logo.vue';
import SideBar from './components/ui/SideBar.vue';
</script>

<template>
  <div class="flex flex-col">
    <header class="flex justify-between w-full h-14 px-8 border border-t-0 border-r-0 border-l-0">
      <div class="py-2">
        <NuxtLink to="/">
          <Logo />
        </NuxtLink>
      </div>
      <div class="flex h-full items-center"><button class="border border-black py-1 px-3 rounded">Logout</button></div>
    </header>
    <div class="flex">
      <SideBar />
      <div class="px-8 pt-8 md:ml-4 w-full flex flex-col flex-1 ">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </div>
  </div>
</template>
