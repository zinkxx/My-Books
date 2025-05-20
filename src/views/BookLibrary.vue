<template>
  <div class="library-page">
    <h2>Kitaplık</h2>
    <p>Hoş geldiniz! Burada kitaplarınızı görebilirsiniz.</p>

    <!-- Önerilen Kitaplar Bileşeni -->
    <RecommendedBooks />

    <!-- Kitap Kategorileri Bileşeni -->
    <BookCategories />
  </div>
</template>

<script>
import RecommendedBooks from '@/components/RecommendedBooks.vue'
import BookCategories from '@/components/BookCategories.vue'

export default {
  name: 'BookLibrary',
  components: {
    RecommendedBooks,
    BookCategories,
  },
}
</script>

<style scoped>
.library-page {
  text-align: center;
  padding: 20px;
}

.library-page h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

.library-page p {
  font-size: 1rem;
  color: #666;
}
</style>
