<script setup>
import { RouterView } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
</script>

<template>
  <AppNavbar />
  <!--  JUST LIKE OUTLET IN REACT JS -->
  <RouterView />
</template>
