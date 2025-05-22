<template>
  <div class="profile-container container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 text-center">
        <h1 class="display-4 text-dark mb-4">Profil</h1>
        <p class="lead text-muted">
          Merhaba, <strong>{{ userEmail }}</strong>
        </p>
        <button @click="logout" class="btn btn-danger btn-lg">Çıkış Yap</button>
      </div>
    </div>
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
  padding: 20px;
}

h1.display-4 {
  font-size: 2.5rem;
  font-weight: bold;
}

p.lead {
  font-size: 1.25rem;
  color: #6c757d;
}

button {
  width: 100%;
}
</style>
