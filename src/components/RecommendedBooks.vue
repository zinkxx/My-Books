<template>
  <div class="recommended-books">
    <h3>Önerilen Kitaplar</h3>
    <div class="swiper-container-wrapper">
      <button class="scroll-button left" @click="scrollLeft">&#10094;</button>
      <div class="swiper-container" ref="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(book, index) in books" :key="index">
            <a :href="'/book-details/' + book.title" class="book-link">
              <img :src="getImage(book.cover)" :alt="book.title" class="book-cover" />
              <p class="book-title">{{ book.title }}</p>
              <p class="book-author">{{ book.author }}</p>
            </a>
          </div>
        </div>
      </div>
      <button class="scroll-button right" @click="scrollRight">&#10095;</button>
    </div>
  </div>
</template>

<script>
import { books } from '../data/books.js' // books.js dosyasından veri import ediyoruz

export default {
  name: 'RecommendedBooks',
  data() {
    return {
      books, // books verisini data içinde kullanıyoruz
    }
  },
  methods: {
    getImage(filename) {
      return new URL(`../assets/bookimg/${filename}`, import.meta.url).href // kitap kapağına doğru yolu sağlıyoruz
    },
    scrollLeft() {
      this.$refs.swiper.scrollBy({ left: -300, behavior: 'smooth' }) // sola kaydırma işlevi
    },
    scrollRight() {
      this.$refs.swiper.scrollBy({ left: 300, behavior: 'smooth' }) // sağa kaydırma işlevi
    },
  },
}
</script>

<style scoped>
.recommended-books {
  margin: 30px 0;
}

.recommended-books h3 {
  font-size: 1.8rem;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.swiper-container-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.swiper-container {
  overflow: hidden;
  padding: 10px 0;
  flex: 1;
}

.swiper-wrapper {
  display: flex;
  gap: 24px;
}

.swiper-slide {
  min-width: 160px;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.book-cover {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  object-fit: cover;
  -webkit-user-drag: none;
  user-drag: none;
  pointer-events: none;
}

.book-title {
  text-align: center;
  font-weight: 600;
  margin-top: 10px;
  font-size: 1rem;
  color: #555;
}

.book-author {
  text-align: center;
  font-size: 0.9rem;
  color: #777;
  margin-top: 5px;
}

.scroll-button {
  background-color: #42b883;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 50%;
  margin: 0 8px;
  transition: background 0.2s;
  z-index: 2;
}

.scroll-button:hover {
  background-color: #36a76d;
}

.left {
  margin-right: -10px;
}

.right {
  margin-left: -10px;
}

.swiper-container::-webkit-scrollbar {
  display: none;
}

.book-link {
  text-decoration: none;
  display: block;
  color: inherit;
}
</style>
