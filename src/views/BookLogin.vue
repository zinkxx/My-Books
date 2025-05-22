<template>
  <div class="book-login-container">
    <h2>Giriş Yap</h2>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <input
          type="text"
          v-model="username"
          class="form-control"
          placeholder="Kullanıcı adı"
          required
        />
      </div>

      <div class="form-group">
        <input
          type="password"
          v-model="password"
          class="form-control"
          placeholder="Şifre"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary submit-btn">Giriş Yap</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const loginUser = () => {
  if (username.value === 'user' && password.value === 'password123') {
    errorMessage.value = ''
    localStorage.setItem('isLoggedIn', 'true') // Giriş durumu kaydedilir
    router.push({ name: 'book-library' }) // Giriş sonrası yönlendirme
  } else {
    errorMessage.value = 'Geçersiz kullanıcı adı veya şifre.'
  }
}
</script>

<style scoped>
.book-login-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  font-size: 1.8rem;
  color: #42b883; /* Temanın ana rengini kullandık */
  margin-bottom: 15px;
}

.form-group {
  width: 100%;
  margin-bottom: 15px;
}

input.form-control {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
}

button.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #42b883; /* Temanın ana rengini kullandık */
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.submit-btn:hover {
  background-color: #367f60;
}

.error-message {
  color: red;
  font-size: 1rem;
  text-align: center;
  margin-top: 10px;
}
</style>
