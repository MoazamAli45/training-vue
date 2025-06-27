<script setup>
import AppHero from '@/components/AppHero.vue'
import HomeCards from '@/components/HomeCards.vue'
import JobListings from '@/components/JobListings.vue'
</script>

<template>
  <AppHero />
  <HomeCards />
  <JobListings :limit="3" :showButton="true" />
</template>
