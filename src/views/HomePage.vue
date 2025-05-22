<template>
  <div
    class="home container-fluid d-flex flex-column justify-content-center align-items-center text-center"
  >
    <h1 class="display-3 text-theme mb-4 animate-fade-in">📚 Bitekyal</h1>

    <!-- Dil Seçimi Butonları -->
    <div class="language-selector mb-4">
      <button
        @click="changeLanguage('tr')"
        class="btn btn-sm"
        :class="{ active: selectedLanguage === 'tr' }"
      >
        Türkçe
      </button>
      <button
        @click="changeLanguage('en')"
        class="btn btn-sm"
        :class="{ active: selectedLanguage === 'en' }"
      >
        English
      </button>
    </div>

    <!-- Açıklama Metni - Animasyon -->
    <transition name="fade" mode="out-in">
      <div class="row w-100 d-flex justify-content-center" :key="selectedLanguage">
        <!-- Türkçe Açıklama -->
        <div class="col-md-6 mb-4 mb-md-0" v-if="selectedLanguage === 'tr'">
          <p class="lead text-muted text-center animate-fade-in">
            Bitekyal, kitap tutkunlarının bir araya geldiği bir platformdur. Burada kullanıcılar
            kendi kitaplıklarını oluşturabilir, kitaplarını sergileyebilir, kitaplar hakkında notlar
            paylaşabilir ve öneriler alabilir. Kitaplarınızı keşfedin ve kitaplarla dolu bir sosyal
            medya deneyimi yaşayın!
          </p>
        </div>

        <!-- İngilizce Açıklama -->
        <div class="col-md-6" v-if="selectedLanguage === 'en'">
          <p class="lead text-muted text-center animate-fade-in">
            Bitekyal is a platform where book lovers come together. Here, users can create their own
            libraries, showcase their books, share notes on books, and receive recommendations.
            Discover your books and experience a social media platform filled with books!
          </p>
        </div>
      </div>
    </transition>

    <!-- 🔽 Banner Animasyonu -->
    <div class="banner w-100 mb-5">
      <svg viewBox="0 0 1440 320">
        <path
          fill="#42b883"
          fill-opacity="1"
          d="M0,160L40,176C80,192,160,224,240,224C320,224,400,192,480,165.3C560,139,640,117,720,133.3C800,149,880,203,960,208C1040,213,1120,171,1200,149.3C1280,128,1360,128,1400,128L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
        ></path>
      </svg>
    </div>

    <!-- 🔘 Giriş / Kayıt Butonları -->
    <div class="buttons d-flex gap-3 mb-5">
      <button
        @click="setActiveForm('login')"
        :class="{ active: activeForm === 'login' }"
        class="btn btn-lg custom-btn border-theme"
        data-bs-toggle="modal"
        data-bs-target="#loginModal"
      >
        {{ selectedLanguage === 'tr' ? 'Giriş Yap' : 'Log In' }}
      </button>
      <button
        @click="setActiveForm('register')"
        :class="{ active: activeForm === 'register' }"
        class="btn btn-lg custom-btn border-theme"
        data-bs-toggle="modal"
        data-bs-target="#registerModal"
      >
        {{ selectedLanguage === 'tr' ? 'Kayıt Ol' : 'Register' }}
      </button>
    </div>

    <!-- 🔐 Giriş Formu Modal -->
    <div
      class="modal fade"
      id="loginModal"
      tabindex="-1"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="loginModalLabel">
              {{ selectedLanguage === 'tr' ? 'Giriş Yap' : 'Log In' }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <Login />
          </div>
        </div>
      </div>
    </div>

    <!-- 📝 Kayıt Formu Modal -->
    <div
      class="modal fade"
      id="registerModal"
      tabindex="-1"
      aria-labelledby="registerModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="registerModalLabel">
              {{ selectedLanguage === 'tr' ? 'Kayıt Ol' : 'Register' }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <Register />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Login from '@/views/BookLogin.vue'
import Register from '@/views/BookRegister.vue'

const activeForm = ref('')
const selectedLanguage = ref('tr') // Başlangıç dili Türkçe olarak ayarlandı

const setActiveForm = (form) => {
  activeForm.value = form
}

const changeLanguage = (lang) => {
  selectedLanguage.value = lang
}
</script>

<style scoped>
/* Temaya uygun renkler ve stil */
.home {
  background: linear-gradient(to bottom, #ffffff, #e6f4f1);
  padding: 20px;
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: fadeIn 1s ease-out;
}

/* Sayfa açılışı için animasyon */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Başlık - Temaya uygun renk kullanıldı */
h1 {
  font-size: 3rem;
  color: #367f60; /* Temaya uygun renk */
  font-weight: bold;
  animation: slideIn 0.8s ease-out;
}

@keyframes slideIn {
  0% {
    transform: translateY(-30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Açıklama metni animasyonu */
p {
  font-size: 1.2rem;
  color: #555;
  line-height: 1.5;
  max-width: 700px;
  margin: 0 auto;
  animation: fadeInText 1s ease-out;
}

@keyframes fadeInText {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Dil Seçimi Butonları */
.language-selector {
  margin-top: 20px;
}

.language-selector .btn {
  background-color: #42b883;
  color: white;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.language-selector .btn.active {
  background-color: #367f60;
}

.language-selector .btn:hover {
  background-color: #367f60;
  transform: scale(1.05);
}

/* Animasyonlu Banner */
.banner svg {
  width: 80%;
  height: 80px;
  animation: wave 6s infinite ease-in-out;
}

/* Butonlar */
.buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.custom-btn {
  padding: 15px 25px;
  font-size: 1.1rem;
  border-radius: 8px;
  background-color: #42b883;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid #42b883; /* Tema rengiyle uyumlu çerçeve */
}

.custom-btn:hover {
  background-color: #367f60;
  transform: scale(1.05);
}

.custom-btn.active {
  background-color: #2d6f53;
  border: 2px solid #2d6f53; /* Aktif butonun çerçevesi */
}

/* Modal içerikleri */
.modal-content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
  background-color: #42b883;
  color: white;
}

.modal-footer {
  background-color: #f8f9fa;
}
</style>
