<template>
  <v-app>
    <v-container>
      
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-layout>
            <v-flex xs2>
              <v-btn color="blue" class="white--text" v-on="on">
                Add Cashier
                <v-icon right dark>add</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="First name *" v-model="editedItem.firstName" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="Last name *" v-model="editedItem.lastName" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="Phone Number *" v-model="editedItem.phoneNumber" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="Username *" v-model="editedItem.userName" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-if="editedID == '-1'" label="Password *" v-model="editedItem.Password" type="password" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" flat @click="close">Close</v-btn>
            <v-btn color="blue" flat :loading="this.$store.getters['apiCashier/status'] == 'loading'" :disabled="!this.$store.getters['apiCashier/status']" @click="pushCashier">{{formButton}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-data-table
        :headers="headers"
        :items="cashiers"
        :loading="this.$store.getters['apiCashier/status'] == 'loading'"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.firstName }}</td>
          <td>{{ props.item.lastName }}</td>
          <td>{{ props.item.userName }}</td>
          <td>{{ props.item.phoneNumber }}</td>
          <td >
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </v-container>
  </v-app>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      dialog: false,
      loading: false,
      headers: [
      {
        text: 'Cashier ID',
        align: 'left',
        sortable: false,
        value: 'id'
      },
      {
        text: 'First Name',
        align: 'left',
        sortable: false,
        value: 'firstName'
      },
      {
        text: 'Last Name',
        align: 'left',
        sortable: false,
        value: 'lastName'
      },
      {
        text: 'Username',
        align: 'left',
        sortable: false,
        value: 'userName'
      },
      {
        text: 'Phone Number',
        align: 'left',
        sortable: false,
        value: 'phoneNumber'
      },
      { text: 'Actions',
        align: 'left', 
        value: 'name', 
        sortable: false 
        }
    ],
      editedID: "-1",
      editedItem: {
        id: "",
        firstName: "",
        lastName: "",
        userName: "",
        Password: "",
        phoneNumber: "",
      },
      defaultItem: {
        id: "",
        firstName: "",
        lastName: "",
        userName: "",
        Password: "",
        phoneNumber: "",
      }
    };
  },
  computed: {
    formTitle () {
      return this.editedID === "-1" ? 'Add Cashier' : 'Edit Cashier'
    },
    formButton () {
      return this.editedID === "-1" ? 'Add' : 'Edit'
    },
    cashiers: function() {
      return this.$store.getters['apiCashier/cashiers'];
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize: function(){
      this.$store
        .dispatch('apiCashier/getCashiers')
        .then(() => this.close())
        .catch(err => console.log(err));
    },
    close: function(){
      this.dialog = false;
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedID = "-1";
    },
    pushCashier: function() {
      this.loading = true;
      if(this.editedID === "-1"){
        this.$store
          .dispatch('apiCashier/addCashier', this.editedItem)
          .then(() => {
            this.close();
            this.initialize();
            this.$store.dispatch("snackbar/fire", {
              snackbarText: "Added Cashier Successfully",
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
            console.log(err)
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
          });
      }else{
        this.$store
          .dispatch('apiCashier/editCashier', this.editedItem)
          .then(() => {
            this.close()
            this.initialize()
            this.$store.dispatch("snackbar/fire", {
              snackbarText: "Edited Cashier Successfully",
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
            console.log(err)
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
          });
      }
    },
    deleteCashier: function() {
      this.$store
          .dispatch('apiCashier/deleteCashier', this.editedItem)
          .then(() => {
            this.initialize()
            this.$store.dispatch("snackbar/fire", {
              snackbarText: "Deleted Cashier Successfully",
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
            console.log(err)
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
          });
    },
    editItem: function(item) {
      this.editedID = item.id
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem: function(item) {
      this.editedID = item.id
      this.editedItem = Object.assign({}, item)
      confirm('Are you sure you want to delete this item?')? this.deleteCashier():null;
    },
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
