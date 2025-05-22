<template>
  <div class="library-page bg-dark text-white py-5 px-3 px-md-5">
    <!-- Uygulama Başlığı ve Açıklama -->
    <div class="mb-5 text-center">
      <h2 class="display-4 fw-bold">📚 Bitekyal</h2>
      <p class="lead">
        Bitekyal, kitap tutkunlarının bir araya geldiği bir platformdur. Burada kullanıcılar kendi
        kitaplıklarını oluşturabilir, kitaplarını sergileyebilir, kitaplar hakkında notlar
        paylaşabilir ve öneriler alabilir. Kitaplarınızı keşfedin ve kitaplarla dolu bir sosyal
        medya deneyimi yaşayın!
      </p>
    </div>

    <!-- Önerilen Kitaplar -->
    <section class="mb-5">
      <RecommendedBooks />
    </section>

    <!-- Kitap Kategorileri -->
    <section>
      <BookCategories />
    </section>
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
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
}

.library-page .display-4 {
  margin-top: 80px; /* Navbar altı boşluk */
}

.library-page .lead {
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}
</style>
