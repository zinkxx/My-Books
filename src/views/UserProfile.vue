<template>
  <div class="profile-container">
    <h1>Profil</h1>
    <p>Merhaba, {{ userEmail }}</p>
    <button @click="logout">Çıkış Yap</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const userEmail = ref(localStorage.getItem('user'))

const logout = () => {
  localStorage.removeItem('user')
}
</script>

<style scoped>
.profile-container {
  text-align: center;
  margin-top: 50px;
}
</style>
