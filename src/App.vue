<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter();
const isLoggedIn = ref(localStorage.getItem('accessToken') !== null);
// Function to logout
const logout = () => {
  // Remove access token from localStorage
  localStorage.removeItem('accessToken');

  // Update isLoggedIn flag
  isLoggedIn.value = false;

  // redirect to admin login form
  router.push('/admin');
}
</script>

<template>
  <header>

    <div class="wrapper">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <RouterLink class="navbar-brand" to="/">ALPHV</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <RouterLink class="nav-link" to="/">Home</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/user">User Panel</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/admin">Admin Panel</RouterLink>
              </li>
               <!-- Render logout button only if user is logged in -->
               <li v-if="isLoggedIn" class="nav-item">
                <button @click="logout" class="nav-link btn btn-link">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
