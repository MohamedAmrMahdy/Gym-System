<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-icon dark>fitness_center</v-icon>
                <v-toolbar-title>Gym System Login</v-toolbar-title>
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
                    box
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="password"
                    box
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <span>© 2018-2019 SW2 Project All Rights Reserved</span>
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
        .dispatch("apiAuth/login", { username, password })
        .then(() => {
          this.$router.push("/");
          this.$store.dispatch("snackbar/fire", {
              snackbarText: "Welcome Back " + username,
              snackbarTimeout: 5000,
              color: "success",
              left: true,
              right: false,
              top: false,
              bottom: true,
              multiline: false,
              vertical: false
            });
        })
        .catch(err => {
          if (err.message == "Network Error") {
            this.$store.dispatch("snackbar/fire", {
              snackbarText: "Unable to reach server",
              snackbarTimeout: 5000,
              color: "error",
              left: true,
              right: false,
              top: false,
              bottom: true,
              multiline: false,
              vertical: false
            });
          } else if (err.message == "Request failed with status code 401") {
            this.snackbarText = "Wrong Username / Password";
            this.$store.dispatch("snackbar/fire", {
              snackbarText: "Wrong Username / Password",
              snackbarTimeout: 5000,
              color: "error",
              left: true,
              right: false,
              top: false,
              bottom: true,
              multiline: false,
              vertical: false
            });
          } else {
            this.$store.dispatch("snackbar/fire", {
              snackbarText: "Unkown error occured",
              snackbarTimeout: 5000,
              color: "error",
              left: true,
              right: false,
              top: false,
              bottom: true,
              multiline: false,
              vertical: false
            });
          }
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