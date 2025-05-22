<template>
  <div class="book-categories container-fluid my-5 px-3 px-md-5">
    <h3 class="section-heading">📚 Kitap Kategorileri</h3>

    <!-- Kategori Seçimi Butonu ve Mini Metin -->
    <div class="category-filter mb-4 text-center">
      <button class="btn btn-lg btn-custom" data-bs-toggle="modal" data-bs-target="#categoryModal">
        Kategori Seç
        <small class="text-muted ms-2">Kategori seçmek için tıklayın</small>
      </button>
    </div>

    <!-- Kategori Modal -->
    <div
      class="modal fade"
      id="categoryModal"
      tabindex="-1"
      aria-labelledby="categoryModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header">
            <h5 class="modal-title" id="categoryModalLabel">Tüm Kategoriler</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- Kategori Seçim Alanı -->
            <div class="categories-container">
              <ul class="categories-list">
                <li
                  class="category-item"
                  v-for="category in allCategories"
                  :key="category"
                  @click="selectCategory(category)"
                  :class="{ 'active-category': selectedCategory === category }"
                >
                  <div class="category-icon">
                    <i class="bi bi-book"></i>
                    <!-- İkonlar eklenebilir -->
                  </div>
                  <span>{{ category }}</span>
                </li>
              </ul>
            </div>
            <!-- Tüm Kategorileri Göster Butonu -->
            <div v-if="selectedCategory" class="text-center mt-3">
              <button class="btn btn-outline-light btn-sm" @click="resetCategory">
                Tüm Kategorileri Göster
              </button>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Kitaplar -->
    <div class="category mb-5" v-for="(category, index) in filteredCategories" :key="index">
      <div class="ps-2 ps-md-3 mb-4">
        <h4 class="category-title">{{ category.name }}</h4>
      </div>

      <div class="row g-4">
        <div
          class="col-6 col-sm-4 col-md-3 col-lg-2"
          v-for="(book, idx) in category.books"
          :key="idx"
        >
          <div class="card book-card h-100 bg-dark text-white shadow-sm">
            <router-link
              :to="{ name: 'book-details', params: { title: book.title } }"
              class="text-decoration-none"
            >
              <img
                :src="getBookCover(book.cover)"
                :alt="book.title"
                class="card-img-top rounded-top book-image"
              />
            </router-link>
            <div class="card-body text-center py-2 px-2">
              <h6 class="card-title mb-1 fw-semibold text-white">{{ book.title }}</h6>
              <p class="card-text author-name">{{ book.author }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { books as booksData } from '@/data/books.js'

export default {
  name: 'BookCategories',
  data() {
    return {
      books: booksData,
      selectedCategory: '', // Seçilen kategori
    }
  },
  computed: {
    // Tüm kategorileri almak
    allCategories() {
      const categories = []
      this.books.forEach((book) => {
        book.categories.forEach((category) => {
          if (!categories.includes(category)) {
            categories.push(category)
          }
        })
      })
      return categories
    },

    // Seçilen kategoriye göre kitapları filtreleme
    filteredCategories() {
      if (!this.selectedCategory) {
        return this.groupedCategories
      }

      return this.groupedCategories.filter(
        (category) => category.name.toLowerCase() === this.selectedCategory.toLowerCase(),
      )
    },

    // Kitapları kategorilere göre gruplamak
    groupedCategories() {
      const categoriesMap = {}

      this.books.forEach((book) => {
        book.categories.forEach((category) => {
          if (!categoriesMap[category]) {
            categoriesMap[category] = []
          }
          categoriesMap[category].push(book)
        })
      })

      return Object.keys(categoriesMap).map((categoryName) => ({
        name: categoryName,
        books: categoriesMap[categoryName],
      }))
    },
  },
  methods: {
    getBookCover(filename) {
      return new URL(`../assets/bookimg/${filename}`, import.meta.url).href
    },
    selectCategory(category) {
      this.selectedCategory = category
      const modal = bootstrap.Modal.getInstance(document.getElementById('categoryModal'))
      modal.hide() // Modalı kapat
    },
    resetCategory() {
      this.selectedCategory = ''
    },
  },
}
</script>

<style scoped>
/* Kategori başlıkları */
.section-heading {
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 3rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  display: inline-block;
  padding-bottom: 10px;
}

.category-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  border-left: 4px solid #2a7453;
  padding-left: 12px;
}

/* Modal İçeriği */
.categories-container {
  max-height: 400px;
  overflow-y: auto;
}

.categories-list {
  padding-left: 0;
  list-style: none;
}

.category-item {
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.category-item:hover {
  background-color: #2a7453;
}

.category-item .category-icon {
  margin-right: 10px;
}

.category-item span {
  font-size: 1.1rem;
}

.active-category {
  background-color: #2a7453 !important;
  color: white !important;
}

.category-item i {
  font-size: 1.5rem;
  color: #ffffff;
}

/* Kitap Kartı */
.book-card {
  border-radius: 12px;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: #1e1e2f;
  display: flex;
  flex-direction: column;
}

/* Kitap Resmi Ayarı */
.book-image {
  width: 100%;
  height: auto;
  max-height: 350px; /* Kitap resminin maksimum yüksekliği */
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;
  object-position: center;
}

/* Kitap Kartının Hover Efekti */
.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(13, 202, 240, 0.2);
}

/* Mobilde kitap resminin boyutunu sabitlemek */
@media (max-width: 767px) {
  .book-image {
    max-height: 250px; /* Mobilde kitap resminin yüksekliği */
    height: auto;
  }
}

/* Masaüstü (desktop) ekranlarında, görsellerin düzgün şekilde sığmasını sağlamak */
@media (min-width: 992px) {
  .book-image {
    max-height: 400px;
    object-fit: cover;
  }
}

/* Kitap Kartı İçeriği */
.card-body {
  text-align: center;
  padding: 12px;
}

.card-title {
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.author-name {
  font-size: 0.85rem;
  color: #ffffff;
  margin-bottom: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Button Customization */
.btn-custom {
  background-color: #2a7453;
  color: white;
  border-radius: 12px;
  padding: 0.8rem 1.5rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-custom:hover {
  background-color: #1f5d3d;
}

.btn-custom small {
  font-size: 0.9rem;
}

/* Tüm Kategorileri Göster Butonu */
.btn-outline-light {
  border-radius: 12px;
  font-weight: 600;
  padding: 0.6rem 1rem;
}
</style>
