import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import BookLogin from '@/views/BookLogin.vue'
import MyLibrary from '@/views/MyLibrary.vue'
import BookLibrary from '@/views/BookLibrary.vue'
import UserProfile from '@/views/UserProfile.vue'
import BookDetails from '@/views/BookDetails.vue' // Kitap Detay Sayfası Eklendi

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/login', name: 'login', component: BookLogin },
  {
    path: '/my-library',
    name: 'my-library',
    component: MyLibrary,
    meta: { requiresAuth: true },
  },
  {
    path: '/book-library',
    name: 'book-library',
    component: BookLibrary,
    meta: { requiresAuth: true },
  },
  {
    path: '/user-profile',
    name: 'user-profile',
    component: UserProfile,
    meta: { requiresAuth: true },
  },
  // Kitap Detay Sayfası Rotası Eklendi
  {
    path: '/book-details/:title',
    name: 'book-details',
    component: BookDetails,
    props: true, // URL parametrelerini props olarak geç
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 👇 Giriş yapılmadıysa korumalı sayfalara erişimi engelle
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'login' }) // Giriş yapılmamışsa login sayfasına yönlendir
  } else {
    next()
  }
})

export default router
