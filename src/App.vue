<template>
  <div id="app">
    <!-- NavBar sadece giriş yapıldıysa ve anasayfada değilsek gösterilir -->
    <NavBar v-if="showNavBar" />

    <!-- Sayfa içerikleri -->
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

const route = useRoute()

// localStorage'dan giriş kontrolü ve route adı ile NavBar gösterme mantığı
const showNavBar = computed(() => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const isHomePage = route.name === 'home'
  return isLoggedIn && !isHomePage
})
</script>

<style>
/* Genel stiller */
body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
}
</style>
