<template>
    <main>

        <div id="app">

        <div class="login-page">
        <transition name="fade">
            <div class="wallpaper-login"></div>
        </transition>
        <div class="wallpaper-register"></div>

        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
                    <div class="card login" v-bind:class="{ error: emptyFields }">
                    <h1>Sign In</h1>
                    <form class="form-group" @submit.prevent="doLogin">
                        <input v-model="emailLogin" type="email" class="form-control" placeholder="Email" required>
                        <input v-model="passwordLogin" type="password" class="form-control" placeholder="Password" required>
                        <button type="submit" class="btn btn-primary">Submit</button>
                     </form>
                    </div>
                </div>
            </div>

        </div>
        </div>

        </div>
    </main>
</template>

<style>
p {
   line-height: 1rem;
}

.card {
   padding: 20px;
}

.form-group {
   input {
      margin-bottom: 20px;
   }
}

.login-page {
   align-items: center;
   display: flex;
   height: 100vh;
   
   .fade-enter-active,
   .fade-leave-active {
  transition: opacity .5s;
}
   .fade-enter,
   .fade-leave-to {
      opacity: 0;
   }

   h1 {
      margin-bottom: 1.5rem;
   }
}

.error {
   animation-name: errorShake;
   animation-duration: 0.3s;
}

@keyframes errorShake {
   0% {
      transform: translateX(-25px);
   }
   25% {
      transform: translateX(25px);
   }
   50% {
      transform: translateX(-25px);
   }
   75% {
      transform: translateX(25px);
   }
   100% {
      transform: translateX(0);
   }
}

</style>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { API_LOCATION } from '@/config/index.js';

export default {
  name: 'login',
  setup() {
    const emailLogin = ref('');
    const passwordLogin = ref('');
    const emptyFields = ref(false);
    const router = useRouter();
    const isLoggedIn = ref(false);

    const doLogin = async () => {
      if (emailLogin.value === '' || passwordLogin.value === '') {
        emptyFields.value = true;
      } else {
        try {
          const response = await axios.post(API_LOCATION + '/login', {
            email: emailLogin.value,
            password: passwordLogin.value
          });
          
          // Assuming your API returns the access token in the response
          const accessToken = response.data.access_token;
          
          // Store the access token in local storage
          localStorage.setItem('accessToken', accessToken);

          isLoggedIn.value = true;
          // Redirect to another page upon successful login
          router.push('/admin/shapes');
        } catch (error) {
          console.error(error);
        }
      }
    };

    onMounted(() => {
      if (localStorage.getItem('accessToken')) {
        isLoggedIn.value = true;
      }
    });
     // Check if access token exists in localStorage
   if (localStorage.getItem('accessToken')) {
      // Redirect to /admin/shapes route
      router.push('/admin/shapes');
   }
    return { emailLogin, passwordLogin, emptyFields, doLogin };
  }
}
</script>
