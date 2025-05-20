<template>
  <div class="book-register-container">
    <h2>Kayıt Ol</h2>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <input type="text" v-model="username" placeholder="Kullanıcı adı" required />
      </div>

      <div class="form-group">
        <input type="email" v-model="email" placeholder="E-posta adresi" required />
      </div>

      <div class="form-group">
        <input type="password" v-model="password" placeholder="Şifre" required />
      </div>

      <div class="form-group">
        <input type="password" v-model="confirmPassword" placeholder="Şifreyi onayla" required />
      </div>

      <button type="submit" class="submit-btn">Kayıt Ol</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Form verileri
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// Kayıt işlemi
const registerUser = () => {
  // Kayıt işlemi yapılacak
  console.log('Kayıt işlemi yapıldı:', username.value, email.value, password.value)
}
</script>

<style scoped>
.book-register-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  font-size: 1.8rem;
  color: #42b883;
  margin-bottom: 15px;
}

.form-group {
  width: 100%;
  margin-bottom: 15px;
}

input {
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
  background-color: #42b883;
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
</style>
