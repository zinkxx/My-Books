<template>
  <div class="home animate-page">
    <h1>📚 My Books</h1>
    <p>
      Manage your books with ease. Keep track of your progress, organize your library, and enjoy
      your reading experience.
    </p>

    <!-- 🔽 Banner Animasyonu -->
    <div class="banner">
      <svg viewBox="0 0 1440 320">
        <path
          fill="#42b883"
          fill-opacity="1"
          d="M0,160L40,176C80,192,160,224,240,224C320,224,400,192,480,165.3C560,139,640,117,720,133.3C800,149,880,203,960,208C1040,213,1120,171,1200,149.3C1280,128,1360,128,1400,128L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
        ></path>
      </svg>
    </div>

    <!-- 🔘 Giriş / Kayıt Butonları -->
    <div class="buttons">
      <button
        @click="setActiveForm('login')"
        :class="{ active: activeForm === 'login' }"
        class="action-btn"
      >
        Giriş Yap
      </button>
      <button
        @click="setActiveForm('register')"
        :class="{ active: activeForm === 'register' }"
        class="action-btn"
      >
        Kayıt Ol
      </button>
    </div>

    <!-- 🔐 Giriş Formu -->
    <transition name="form-slide">
      <div v-if="activeForm === 'login'" class="form-container">
        <Login />
      </div>
    </transition>

    <!-- 📝 Kayıt Formu -->
    <transition name="form-slide">
      <div v-if="activeForm === 'register'" class="form-container">
        <Register />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Login from '@/views/BookLogin.vue'
import Register from '@/views/BookRegister.vue'

const activeForm = ref('')

const setActiveForm = (form) => {
  activeForm.value = form
}
</script>

<style scoped>
/* Tam Sayfa Görünüm */
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  text-align: center;
  background: linear-gradient(to bottom, #ffffff, #e6f4f1);
  padding: 20px;
}

/* Sayfa ilk açıldığında yumuşak fade-slide efekti */
.animate-page {
  animation: fadeInSlide 0.8s ease-out;
}

@keyframes fadeInSlide {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Başlık ve Açıklama */
h1 {
  font-size: 3rem;
  color: #42b883;
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 30px;
  max-width: 600px;
  padding: 0 15px;
  line-height: 1.5;
}

/* Animasyonlu Banner */
.banner {
  width: 100%;
  max-width: 800px;
  margin-bottom: 30px;
}

.banner svg {
  width: 100%;
  height: 100px;
  animation: wave 6s infinite ease-in-out;
}

@keyframes wave {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateX(0);
  }
}

/* Butonlar */
.buttons {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  justify-content: center; /* Butonları ortalamak için ekledik */
}

.action-btn {
  padding: 15px 25px;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  background-color: #42b883;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.action-btn:hover {
  background-color: #367f60;
  transform: scale(1.05);
}

.action-btn.active {
  background-color: #2d6f53;
}

/* Formlar */
.form-container {
  width: 100%;
  max-width: 500px;
  animation: slide-in 0.5s ease;
  margin-top: 30px; /* Formu başlık ve butonların altına yerleştirecek şekilde */
  display: flex;
  justify-content: center; /* Formu yatayda ortalıyoruz */
}

/* Formlar arası geçiş animasyonu */
@keyframes slide-in {
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Formlar arası geçiş animasyonu */
.form-slide-enter-active,
.form-slide-leave-active {
  transition: all 0.4s ease;
}
.form-slide-enter-from,
.form-slide-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
</style>
