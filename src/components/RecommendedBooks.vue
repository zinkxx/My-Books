<template>
  <section class="recommended-books container-fluid my-5">
    <h2 class="text-white mb-4 fw-bold">📚 Önerilen Kitaplar</h2>

    <div class="position-relative">
      <!-- Sol kaydırma butonu -->
      <button
        class="btn btn-dark position-absolute top-50 start-0 translate-middle-y z-3 rounded-circle p-2"
        @click="scrollLeft"
        style="opacity: 0.85"
      >
        <i class="fas fa-chevron-left"></i>
      </button>

      <!-- Scroll edilebilir kart alanı -->
      <div class="scroll-container overflow-auto px-2" ref="swiper">
        <div class="d-flex flex-nowrap gap-4 pb-3">
          <div
            v-for="(book, index) in books"
            :key="index"
            class="card bg-dark text-white border-0 shadow-lg flex-shrink-0 book-card rounded-3"
          >
            <a :href="'/book-details/' + book.title" class="text-decoration-none text-white">
              <img
                :src="getImage(book.cover)"
                :alt="book.title"
                class="card-img-top rounded-3"
                style="height: 280px; object-fit: cover"
              />
              <div class="card-body px-3 pb-3 d-flex flex-column justify-content-between">
                <h5 class="card-title fs-6 mb-1 text-white">{{ book.title }}</h5>
                <p class="card-text author-name text-white small">{{ book.author }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- Sağ kaydırma butonu -->
      <button
        class="btn btn-dark position-absolute top-50 end-0 translate-middle-y z-3 rounded-circle p-2"
        @click="scrollRight"
        style="opacity: 0.85"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </section>
</template>

<script>
import { books } from '../data/books.js'

export default {
  name: 'RecommendedBooks',
  data() {
    return {
      books,
    }
  },
  methods: {
    getImage(filename) {
      return new URL(`../assets/bookimg/${filename}`, import.meta.url).href
    },
    scrollLeft() {
      this.$refs.swiper.scrollBy({ left: -400, behavior: 'smooth' })
    },
    scrollRight() {
      this.$refs.swiper.scrollBy({ left: 400, behavior: 'smooth' })
    },
  },
}
</script>

<style scoped>
/* Ana container rengini uygulama */
.recommended-books {
  background-color: #2a7453; /* Ana renk olarak yeşil */
  border-radius: 16px;
  padding: 32px 24px;
  position: relative;
}

/* Kaydırma alanını gizlemek için stil */
.scroll-container {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.scroll-container::-webkit-scrollbar {
  display: none;
}

/* Kitap kartlarının şıklığını arttırma */
.book-card {
  min-width: 180px;
  max-width: 180px;
  transition:
    transform 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
  border-radius: 12px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.1); /* Şeffaf arka plan */
}
.book-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 10px rgba(0, 128, 128, 0.5);
}

/* Kitap görselinin kenarlarını yuvarlama */
.card-img-top {
  border-radius: 12px;
}

/* Card body'ye şeffaf bir arka plan verme */
.card-body {
  padding: 16px 12px;
  background-color: rgba(0, 0, 0, 0.6); /* Saydam arka plan */
}

/* Kitap başlığını stilize etme */
.card-title {
  font-size: 1rem;
  font-weight: 600;
}

/* Yazar adı beyaz renk yapılacak */
.author-name {
  font-size: 0.9rem;
  color: #ffffff; /* Beyaz renk */
}

/* Buton stilini ayarlama */
.btn {
  background-color: #2a7453; /* Yeşil buton rengi */
  border: none;
  font-size: 1.2rem;
}

.btn:hover {
  background-color: #1e5a3f; /* Buton hover rengi */
}

/* Sol ve sağ kaydırma butonları */
.fas {
  color: #ffffff;
}

.fas:hover {
  color: #2a7453; /* Buton ikonu hover rengi */
}
</style>
