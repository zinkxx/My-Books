<template>
  <header class="app-navbar bg-white shadow-sm py-2 px-3 border-bottom fixed-top">
    <div class="container-fluid d-flex align-items-center justify-content-between">
      <!-- Sol: Logo -->
      <router-link to="/" class="navbar-brand d-flex align-items-center gap-2 fw-bold text-success">
        <i class="fas fa-book-open-reader fs-4"></i>
        <span class="fs-5">Bitekyal</span>
      </router-link>

      <!-- Orta: Menü (Desktop) -->
      <nav class="d-none d-md-flex align-items-center gap-3">
        <router-link
          to="/book-library"
          class="nav-item-link"
          :class="{ active: isActive('/book-library') }"
        >
          <i class="fas fa-book"></i> Kitaplık
        </router-link>
        <router-link
          to="/my-library"
          class="nav-item-link"
          :class="{ active: isActive('/my-library') }"
        >
          <i class="fas fa-bookmark"></i> Benim Kitaplığım
        </router-link>
        <router-link
          to="/user-profile"
          class="nav-item-link"
          :class="{ active: isActive('/user-profile') }"
        >
          <i class="fas fa-user"></i> Profilim
        </router-link>
      </nav>

      <!-- Sağ: Kullanıcı ve Menü -->
      <div class="d-flex align-items-center gap-3">
        <button @click="logout" class="btn btn-outline-danger rounded-pill">
          <i class="fas fa-sign-out-alt"></i> Çıkış Yap
        </button>

        <!-- Hamburger (Mobil) -->
        <button class="btn d-md-none" type="button" @click="toggleMobileMenu">
          <i class="fas fa-bars fs-4"></i>
        </button>
      </div>
    </div>

    <!-- Mobil Menü -->
    <transition name="slide-fade">
      <div
        v-if="isMobileMenuOpen"
        class="mobile-menu bg-light p-3 mt-2 rounded-3 shadow-sm d-md-none"
      >
        <router-link
          to="/book-library"
          class="nav-item-link d-block mb-2"
          @click="toggleMobileMenu"
          :class="{ active: isActive('/book-library') }"
        >
          <i class="fas fa-book"></i> Kitaplık
        </router-link>
        <router-link
          to="/my-library"
          class="nav-item-link d-block mb-2"
          @click="toggleMobileMenu"
          :class="{ active: isActive('/my-library') }"
        >
          <i class="fas fa-bookmark"></i> Benim Kitaplığım
        </router-link>
        <router-link
          to="/user-profile"
          class="nav-item-link d-block"
          @click="toggleMobileMenu"
          :class="{ active: isActive('/user-profile') }"
        >
          <i class="fas fa-user"></i> Profilim
        </router-link>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const router = useRouter()
const route = useRoute()
const isActive = (path) => route.path.startsWith(path)

const logout = () => {
  localStorage.removeItem('isLoggedIn')
  router.push({ name: 'home' })
}
</script>

<style scoped>
.app-navbar {
  z-index: 1050;
}

.nav-item-link {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
}

.nav-item-link:hover {
  background-color: #f0f0f0;
  color: #2a7453;
}

.nav-item-link.active {
  background-color: #2a7453;
  color: white;
}

.mobile-menu {
  animation: fadeIn 0.3s ease;
}

/* Geçiş efekti */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
