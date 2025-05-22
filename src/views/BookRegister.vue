<template>
  <div class="book-register-container">
    <h2 class="text-theme mb-4">{{ selectedLanguage === 'tr' ? 'Kayıt Ol' : 'Register' }}</h2>
    <form @submit.prevent="registerUser">
      <div class="form-group mb-3">
        <input
          type="text"
          v-model="username"
          class="form-control"
          :placeholder="selectedLanguage === 'tr' ? 'Kullanıcı adı' : 'Username'"
          required
        />
      </div>

      <div class="form-group mb-3">
        <input
          type="email"
          v-model="email"
          class="form-control"
          :placeholder="selectedLanguage === 'tr' ? 'E-posta adresi' : 'Email address'"
          required
        />
      </div>

      <div class="form-group mb-3">
        <input
          type="password"
          v-model="password"
          class="form-control"
          :placeholder="selectedLanguage === 'tr' ? 'Şifre' : 'Password'"
          required
        />
      </div>

      <div class="form-group mb-4">
        <input
          type="password"
          v-model="confirmPassword"
          class="form-control"
          :placeholder="selectedLanguage === 'tr' ? 'Şifreyi onayla' : 'Confirm password'"
          required
        />
      </div>

      <button type="submit" class="btn btn-lg custom-btn w-100">
        {{ selectedLanguage === 'tr' ? 'Kayıt Ol' : 'Register' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedLanguage = ref('tr') // Başlangıç dili Türkçe olarak ayarlandı
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const registerUser = () => {
  // Kayıt işlemi yapılacak
  console.log('Kayıt işlemi yapıldı:', username.value, email.value, password.value)
}
</script>

<style scoped>
.book-register-container {
  width: 100%;
  max-width: 500px;
  padding: 30px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
}

h2 {
  font-size: 1.8rem;
  color: #42b883;
  margin-bottom: 20px;
}

.form-group input {
  padding: 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
}

button.submit-btn {
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

/* Custom Button for theming */
.custom-btn {
  background-color: #42b883;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  padding: 15px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.custom-btn:hover {
  background-color: #367f60;
  transform: scale(1.05);
}
</style>
