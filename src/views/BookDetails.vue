<template>
  <div class="book-details">
    <button @click="goBack" class="back-button">Geri Dön</button>
    <h2>{{ book.title }}</h2>
    <div class="book-info">
      <img :src="getImage(book.cover)" :alt="book.title" class="book-cover" />
      <div class="details">
        <p><strong>Yazar:</strong> {{ book.author }}</p>
        <p><strong>Açıklama:</strong> {{ book.description }}</p>
        <p><strong>Yayınevi:</strong> {{ book.publisher }}</p>
        <p><strong>Yıl:</strong> {{ book.year }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { books } from '../data/books.js' // books.js dosyasından kitaplar verisini import ediyoruz

export default {
  name: 'BookDetails',
  data() {
    return {
      books, // Kitapları data içinde saklıyoruz
      book: {}, // Detaylı gösterilecek tek kitap
    }
  },
  created() {
    const bookTitle = this.$route.params.title // URL parametrelerinden kitap başlığını alıyoruz
    this.book = this.books.find((b) => b.title === bookTitle) || {} // Başlıkla eşleşen kitabı bulup `book` objesine atıyoruz
  },
  methods: {
    getImage(filename) {
      return new URL(`../assets/bookimg/${filename}`, import.meta.url).href // Kitap kapakları için dinamik yol
    },
    goBack() {
      this.$router.go(-1) // Geri butonuna tıklanınca önceki sayfaya yönlendiriyoruz
    },
  },
}
</script>

<style scoped>
.book-details {
  padding: 20px;
}

.book-details h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

.book-info {
  display: flex;
  gap: 20px;
}

.book-cover {
  width: 200px;
  height: auto;
  border-radius: 12px;
}

.details {
  max-width: 600px;
}

.details p {
  font-size: 1rem;
  color: #555;
  margin: 5px 0;
}

.details p strong {
  font-weight: bold;
}

.book-details {
  padding: 20px;
  position: relative;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #42b883;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  z-index: 10;
}

.back-button:hover {
  background-color: #2a7453;
}

.book-details h2 {
  font-size: 2rem;
  color: #333;
  margin-top: 60px;
  margin-bottom: 20px;
}
</style>
