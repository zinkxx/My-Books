<template>
  <div class="container mt-5">
    <!-- Geri Dön Butonu -->
    <div class="row">
      <div class="col-12 text-end mb-4">
        <button @click="goBack" class="btn custom-btn">Geri Dön</button>
      </div>
    </div>

    <div class="row">
      <!-- Sol Taraf: Kitap Kapağı -->
      <div class="col-md-4 d-flex justify-content-center">
        <img
          :src="getImage(book.cover)"
          :alt="book.title"
          class="img-fluid rounded shadow book-cover"
        />
      </div>

      <!-- Sağ Taraf: Kitap Bilgileri, Açıklamalar ve Uyarlamalar -->
      <div class="col-md-8">
        <h2>{{ book.title }}</h2>
        <p><strong>Yazar:</strong> {{ book.author }}</p>
        <p><strong>Açıklama:</strong> {{ book.description }}</p>
        <p><strong>Yayınevi:</strong> {{ book.publisher }}</p>
        <p><strong>Yıl:</strong> {{ book.year }}</p>

        <!-- Uyarlamalar Bölümü -->
        <div v-if="hasAdaptations" class="mt-4">
          <h3 class="text-dark">Uyarlamalar</h3>
          <div class="row">
            <div class="col-12 d-flex flex-wrap">
              <!-- Film Uyarlaması -->
              <div
                v-if="book.adaptations.movie?.available"
                class="card mb-3 me-2"
                style="width: 250px"
              >
                <div class="card-body p-2">
                  <i class="fa fa-film"></i>
                  <strong>Film:</strong>
                  <div v-for="platform in book.adaptations.movie.platforms" :key="platform.name">
                    <a :href="platform.url" target="_blank" class="d-block">{{ platform.name }}</a>
                  </div>
                </div>
              </div>

              <!-- Dizi Uyarlaması -->
              <div
                v-if="book.adaptations.series?.available"
                class="card mb-3 me-2"
                style="width: 250px"
              >
                <div class="card-body p-2">
                  <i class="fa fa-tv"></i>
                  <strong>Dizi:</strong>
                  <div v-for="platform in book.adaptations.series.platforms" :key="platform.name">
                    <a :href="platform.url" target="_blank" class="d-block">{{ platform.name }}</a>
                  </div>
                </div>
              </div>

              <!-- Sesli Kitap Uyarlaması -->
              <div
                v-if="book.adaptations.audiobook?.available"
                class="card mb-3 me-2"
                style="width: 250px"
              >
                <div class="card-body p-2">
                  <i class="fa fa-headphones"></i>
                  <strong>Sesli Kitap:</strong>
                  <div
                    v-for="platform in book.adaptations.audiobook.platforms"
                    :key="platform.name"
                  >
                    <a :href="platform.url" target="_blank" class="d-block">{{ platform.name }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Kitap Ekleme ve Favorilere Ekleme Butonları -->
        <div class="btn-group-vertical mt-4">
          <button @click="addToLibrary" class="btn btn-success mb-2">📚 Kitaplığıma Ekle</button>
          <button @click="createNewLibrary" class="btn btn-info mb-2">
            ➕ Yeni Kitaplık Oluştur
          </button>
          <button @click="addToFavorites" class="btn btn-danger mb-2">❤️ Favorilere Ekle</button>
        </div>
      </div>
    </div>

    <!-- Yorumlar Bölümü -->
    <div class="comments-section mt-4">
      <h3>Yorumlar</h3>
      <div v-if="bookComments.length" class="row">
        <div v-for="(comment, index) in bookComments" :key="index" class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <p>
                <strong>{{ comment.username }}</strong> ({{ comment.date }})
              </p>
              <div class="stars">
                <span
                  v-for="star in 5"
                  :key="star"
                  class="star"
                  :class="{ active: star <= comment.rating }"
                >
                  ★
                </span>
                <span class="rating">{{ comment.rating }}/5</span>
              </div>
              <p>{{ comment.text }}</p>
            </div>
          </div>
        </div>
      </div>
      <p v-else>Henüz yorum yapılmamış.</p>
    </div>

    <!-- Yorum Yapma Formu -->
    <div class="comment-form mt-4">
      <h4>Yorum Yap</h4>
      <div class="mb-3">
        <input
          v-model="newComment.username"
          type="text"
          class="form-control"
          placeholder="Adınızı girin"
        />
      </div>
      <div class="mb-3">
        <textarea
          v-model="newComment.text"
          class="form-control"
          placeholder="Yorumunuzu yazın"
        ></textarea>
      </div>

      <div class="stars-rating mb-3">
        <span
          v-for="star in 5"
          :key="star"
          class="star"
          :class="{ active: star <= newComment.rating }"
          @click="setRating(star)"
        >
          ★
        </span>
        <span class="rating-label">Puanla</span>
      </div>

      <button @click="submitComment" class="btn btn-primary">Yorum Yap</button>
    </div>
  </div>
</template>

<script>
import { books } from '../data/books.js'
import { comments } from '../data/comments.js'

export default {
  name: 'BookDetails',
  props: ['title'],
  data() {
    return {
      books,
      comments,
      book: {},
      newComment: {
        username: '',
        text: '',
        rating: 0,
      },
    }
  },
  created() {
    const bookTitle = this.title
    this.book = this.books.find((b) => b.title === bookTitle)

    if (!this.book) {
      this.$router.push({ name: 'NotFound' })
    } else {
      this.loadComments(this.book.id)
    }
  },
  computed: {
    bookComments() {
      return this.comments.find((c) => c.bookId === this.book.id)?.comments || []
    },
    hasAdaptations() {
      return (
        this.book.adaptations?.movie?.available ||
        this.book.adaptations?.series?.available ||
        this.book.adaptations?.audiobook?.available
      )
    },
  },
  methods: {
    getImage(filename) {
      return new URL(`../assets/bookimg/${filename}`, import.meta.url).href
    },
    goBack() {
      this.$router.go(-1)
    },
    loadComments(bookId) {
      const bookComments = this.comments.find((c) => c.bookId === bookId)
      if (!bookComments) {
        console.log('Yorum bulunamadı.')
      }
    },
    setRating(rating) {
      this.newComment.rating = rating
    },
    submitComment() {
      if (this.newComment.username && this.newComment.text && this.newComment.rating > 0) {
        const comment = {
          username: this.newComment.username,
          text: this.newComment.text,
          rating: this.newComment.rating,
          date: new Date().toLocaleDateString(),
        }

        const bookComments = this.comments.find((c) => c.bookId === this.book.id)
        if (bookComments) {
          bookComments.comments.push(comment)
        } else {
          this.comments.push({
            bookId: this.book.id,
            comments: [comment],
          })
        }

        this.newComment.username = ''
        this.newComment.text = ''
        this.newComment.rating = 0
      } else {
        alert('Lütfen kullanıcı adı, yorum ve yıldız derecelendirmesi girin.')
      }
    },
    addToLibrary() {
      alert(`${this.book.title} kitaplığınıza eklendi!`)
    },
    createNewLibrary() {
      const newLibraryName = prompt('Yeni kitaplık adı girin:')
      if (newLibraryName) {
        alert(`"${newLibraryName}" adında yeni kitaplık oluşturuldu!`)
      }
    },
    addToFavorites() {
      alert(`${this.book.title} favorilere eklendi!`)
    },
  },
}
</script>

<style scoped>
/* Uyarlama Kartları */
.adaptation-card {
  border-radius: 10px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Hafif gölge */
  padding: 15px;
}

.card-body {
  padding: 1.25rem;
}

.card-body a {
  color: #2a7453;
  font-weight: bold;
  text-decoration: none;
}

.card-body a:hover {
  color: #23663f;
  text-decoration: underline;
}

/* Uyarlama İkonları */
.film-icon {
  color: #ff6f61;
  font-size: 1.5rem;
}

.series-icon {
  color: #7b9bff;
  font-size: 1.5rem;
}

.audiobook-icon {
  color: #f1c40f;
  font-size: 1.5rem;
}

/* Uyarlamalar Başlığı */
h3.text-dark {
  font-size: 1.75rem;
  color: #333;
  font-weight: bold;
  margin-bottom: 20px;
  border-bottom: 2px solid #2a7453;
  padding-bottom: 10px;
}

/* Kitap Başlığına Çizgi Ekleme */
h2 {
  font-size: 2rem;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
  border-bottom: 2px solid #2a7453; /* Çizgi rengi */
  padding-bottom: 5px; /* Çizgi ile başlık arasındaki boşluk */
}

.card-body strong {
  font-size: 1.25rem;
  color: #2a7453;
}

/* Genel Stil Düzenlemeleri */
.container {
  padding-top: 80px;
}

.custom-btn {
  background-color: #2a7453;
  border-color: #2a7453;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  padding: 10px 15px;
  margin-top: -10px;
}

.custom-btn:hover {
  background-color: #23663f;
  border-color: #23663f;
}

/* Butonlar için düzenlemeler */
.btn-group-vertical button {
  width: 100%;
}

/* Yorumlar Bölümü */
.comments-section h3 {
  font-size: 1.75rem;
  color: #333;
  margin-bottom: 20px;
  border-top: 2px solid #2a7453; /* Çizgi rengi */
  padding-top: 10px; /* Çizgi ile başlık arasındaki boşluk */
}

/* Uyarlamalar Başlığı */
h3.text-dark {
  font-size: 1.75rem;
  color: #333;
  font-weight: bold;
  margin-bottom: 20px;
  border-bottom: 2px solid #2a7453;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
}

/* Uyarlama İkonları ile Başlık Arasındaki Boşluk */
h3.text-dark i {
  font-size: 1.5rem;
  margin-right: 10px; /* İkon ile başlık arasındaki boşluk */
}

/* Uyarlama Kartları */
.card-body {
  padding: 1.25rem;
}

.card-body i {
  font-size: 1.5rem;
  margin-right: 10px; /* İkon ile metin arasındaki boşluk */
}

/* Uyarlama Kartları ve Metin İçeriği */
.card-body strong {
  font-size: 1.25rem;
  color: #2a7453;
}

/* İkonların Renkleri */
.film-icon {
  color: #ff6f61;
}

.series-icon {
  color: #7b9bff;
}

.audiobook-icon {
  color: #f1c40f;
}

/* Yorum Yapma Alanı */
.comment-form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.comment-form h4 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
}

.comment-form .form-control {
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
}

.comment-form .form-control:focus {
  border-color: #2a7453;
  box-shadow: 0 0 0 0.25rem rgba(42, 116, 83, 0.25);
}

.comment-form .stars-rating {
  display: flex;
  align-items: center;
}

.comment-form .stars-rating .star {
  font-size: 1.5rem;
  cursor: pointer;
  color: #ddd;
}

.comment-form .stars-rating .star.active {
  color: #f1c40f;
}

.comment-form .rating-label {
  margin-left: 10px;
  font-size: 1rem;
  color: #333;
}

/* Yorum Yap Butonu */
.comment-form button {
  background-color: #2a7453;
  border-color: #2a7453;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
}

.comment-form button:hover {
  background-color: #23663f;
  border-color: #23663f;
}

/* Yorumlar Bölümü */
.comments-section {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.comments-section h3 {
  font-size: 1.75rem;
  color: #333;
  margin-bottom: 20px;
  border-bottom: 2px solid #2a7453;
  padding-bottom: 10px;
}

/* Yorum Kartları */
.card {
  border-radius: 10px;
  border: 1px solid #ddd;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 15px;
}

.card-body strong {
  font-size: 1.25rem;
  color: #2a7453;
}

.card-body .stars {
  display: flex;
  align-items: center;
}

.card-body .stars .star {
  font-size: 1.2rem;
  color: #ddd;
}

.card-body .stars .star.active {
  color: #f1c40f;
}

.card-body .rating {
  margin-left: 10px;
  font-size: 1rem;
  color: #333;
}

.card-body p {
  color: #555;
  font-size: 1rem;
}

.book-cover {
  width: auto; /* Genişlik orantılı olarak ayarlanır */
  height: 500px; /* Daha büyük bir yükseklik verelim */
  max-width: 300px; /* Genişliği biraz daha artırarak daha uzun hale getirebiliriz */
  object-fit: cover; /* Görselin kesilmeden düzgün şekilde alana sığmasını sağlar */
}
</style>
