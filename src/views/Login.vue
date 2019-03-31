<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="person"
                    name="username"
                    label="Username"
                    type="text"
                    v-model="username"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  :loading="this.$store.getters['apiAuth/status'] == 'loading'"
                  :disabled="this.$store.getters['apiAuth/status'] == 'loading'"
                  @click="login"
                >Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-snackbar
            v-model="snackbar"
            :bottom="true"
            :left="true"
            :multi-line="false"
            :right="false"
            :timeout="snackbarTimeout"
            :top="false"
            :vertical="false"
          >
            {{ snackbarText }}
            <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
          </v-snackbar>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  mounted() {},
  data: () => ({
    drawer: null,
    snackbar: false,
    snackbarTimeout: 5000,
    snackbarText: "",
    username: "",
    password: ""
  }),
  props: {
    source: String
  },
  methods: {
    login: function() {
      let username = this.username;
      let password = this.password;
      this.$store
        .dispatch('apiAuth/login', { username, password })
        .then(() => {
          this.$router.push("/")
        })
        .catch(err => {
          if(err.message == "Network Error"){
            this.snackbarText = "Unable to reach server";
          }else if(err.message == "Request failed with status code 401"){
            this.snackbarText = "Wrong Username / Password"
          }else{
            this.snackbarText = "Unkown error occured"
          }
            this.snackbar = true;
            console.log(err.message);
        });
    }
  }
};
</script>
<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>