<template>
  <v-app dark>
    <v-slide-y-transition mode="out-in">
    <router-view/>
    </v-slide-y-transition>
    <v-snackbar
            v-model="this.$store.getters['snackbar/snackbarState'].active"
            :timeout="this.$store.getters['snackbar/snackbarState'].snackbarTimeout"
            :color="this.$store.getters['snackbar/snackbarState'].color"
            :left="this.$store.getters['snackbar/snackbarState'].left"
            :right="this.$store.getters['snackbar/snackbarState'].right"
            :bottom="this.$store.getters['snackbar/snackbarState'].bottom"
            :top="this.$store.getters['snackbar/snackbarState'].top"
            :multi-line="this.$store.getters['snackbar/snackbarState'].multiline"
            :vertical="this.$store.getters['snackbar/snackbarState'].vertical"
          >
            {{ this.$store.getters['snackbar/snackbarState'].snackbarText }}
          </v-snackbar>
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
          this.$store.dispatch('apiAuth/logout')
        }
        throw err;
      });
    });
  },
};
</script>
