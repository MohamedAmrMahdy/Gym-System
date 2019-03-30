<template>
  <v-app>
    <v-container>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="blue" class="white--text" v-on="on">
            Add Cashier
            <v-icon right dark>add</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Add Cashier Account</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="First name *" v-model="firstname" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="Last name *" v-model="lastname" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="Phone Number *" v-model="phonenumber" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="Username *" v-model="username" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Password *" v-model="password" type="password" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" flat @click="dialog = false">Close</v-btn>
            <v-btn color="blue" flat :loading="loading" :disabled="loading" @click="AddCashier">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      phonenumber: "",
      dialog: false,
      loading: false
    };
  },
  methods: {
    AddCashier: function() {
      this.loading = true;
      let FirstName = this.firstname;
      let LastName = this.lastname;
      let UserName = this.username;
      let Password = this.password;
      let PhoneNumber = this.phonenumber;
      this.$store
        .dispatch("addCashier", { UserName, Password, FirstName, LastName, PhoneNumber })
        .then(() => this.dialog = false)
        .catch(err => console.log(err));
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
