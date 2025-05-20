<template>
  <div class="book-categories">
    <h3>Kitap Kategorileri</h3>
    <div class="category" v-for="(category, index) in groupedCategories" :key="index">
      <h4 class="category-title">{{ category.name }}</h4>
      <div class="books">
        <div class="book" v-for="(book, index) in category.books" :key="index">
          <!-- Kitap kapakları tıklanabilir hale getirildi -->
          <router-link :to="{ name: 'book-details', params: { title: book.title } }">
            <img :src="getBookCover(book.cover)" :alt="book.title" class="book-cover" />
          </router-link>

          <!-- Başlık ve yazar adı, tıklanamaz ve renkleri düzeltildi -->
          <p class="book-title">{{ book.title }}</p>
          <p class="book-author">{{ book.author }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// books.js'den verileri alıyoruz
import { books as booksData } from '@/data/books.js'

export default {
  name: 'BookCategories',
  data() {
    return {
      books: booksData,
    }
  },
  computed: {
    groupedCategories() {
      // Kitapları kategorilere göre gruplayacağız
      const categoriesMap = {}

      // Kitapları kategoriye göre grupla
      this.books.forEach((book) => {
        book.categories.forEach((category) => {
          if (!categoriesMap[category]) {
            categoriesMap[category] = []
          }
          categoriesMap[category].push(book)
        })
      })

      // Kategorileri bir diziye dönüştür
      return Object.keys(categoriesMap).map((categoryName) => ({
        name: categoryName,
        books: categoriesMap[categoryName],
      }))
    },
  },
  methods: {
    getBookCover(filename) {
      // Kapak görselleri için URL oluştur
      return new URL(`../assets/bookimg/${filename}`, import.meta.url).href
    },
  },
}
</script>

<style scoped>
.book-categories {
  margin-bottom: 30px;
}

.book-categories h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.category {
  margin-bottom: 20px;
}

.category-title {
  font-size: 1.3rem;
  color: #555;
  margin-bottom: 10px;
  text-align: center;
}

.books {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.book {
  text-align: center;
  width: 150px;
}

.book-cover {
  width: 150px;
  height: 200px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Başlık ve yazar adı için renk ayarları */
.book-title {
  margin-top: 10px;
  font-weight: bold;
  color: #333; /* Burada başlık rengini normal yapıyoruz */
}

.book-author {
  font-size: 0.85rem;
  color: #777; /* Yazar adı rengini de normal yapıyoruz */
}

/* Linklerin rengini engellemek için */
.book-title a,
.book-author a {
  color: inherit; /* Linklerin varsayılan rengini iptal ediyoruz */
  text-decoration: none; /* Linklerin altını çizmesini de iptal ediyoruz */
}
</style>
