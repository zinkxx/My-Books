<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="logo">
        <router-link to="/">📚 My Books</router-link>
      </div>

      <div class="hamburger" @click="toggleMobileMenu">
        <i class="fas fa-bars"></i>
      </div>

      <ul :class="['nav-links', { open: isMobileMenuOpen }]">
        <li>
          <router-link :to="'/book-library'" :class="{ active: isActive('/book-library') }">
            <i class="fas fa-book"></i>
            <span>Kitaplık</span>
          </router-link>
        </li>
        <li>
          <router-link :to="'/my-library'" :class="{ active: isActive('/my-library') }">
            <i class="fas fa-bookmark"></i>
            <span>Benim Kitaplığım</span>
          </router-link>
        </li>
        <li>
          <router-link :to="'/user-profile'" :class="{ active: isActive('/user-profile') }">
            <i class="fas fa-user"></i>
            <span>Profilim</span>
          </router-link>
        </li>
        <li>
          <button @click="logout" class="logout-btn">
            <i class="fas fa-sign-out-alt"></i>
            <span>Çıkış Yap</span>
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
const isActive = (path) => route.path.startsWith(path)
const logout = () => {
  localStorage.removeItem('isLoggedIn')
  router.push({ name: 'home' })
}
</script>

<style scoped>
/* Ana navbar full genişlik */
.navbar {
  background-color: #42b883;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 999;
}

/* İçerik konteyneri */
.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.8rem 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo */
.logo a {
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: 600;
  text-decoration: none;
}

/* Hamburger menü */
.hamburger {
  display: none;
  font-size: 1.6rem;
  color: #ffffff;
  cursor: pointer;
}

/* Menü öğeleri */
.nav-links {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-links li a,
.logout-btn {
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.45rem 0.8rem;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.nav-links li a:hover,
.nav-links li a.active {
  background-color: #2a7453;
}

.logout-btn {
  background-color: #ef4444;
  border: none;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #dc2626;
}

/* Mobil görünüm */
@media (max-width: 768px) {
  .hamburger {
    display: block;
  }

  .nav-links {
    position: absolute;
    top: 60px;
    right: 1rem;
    background-color: #42b883;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.8rem 1rem;
    border-radius: 12px;
    display: none;
    width: max-content;
  }

  .nav-links.open {
    display: flex;
  }
}
</style>
