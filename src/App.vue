<template>
  <v-app>
    <v-slide-y-transition mode="out-in">
    <router-view/>
    </v-slide-y-transition>
  </v-app>
</template>
<script>
export default {
  name: "App",
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout)
        }
        throw err;
      });
    });
  },
};
</script>
