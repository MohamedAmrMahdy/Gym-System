<template>
  <v-app>
    <v-container>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-layout>
            <v-flex xs2>
              <v-btn color="blue" class="white--text" v-on="on">
                Add Customer
                <v-icon right dark>add</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </template>
        <v-card dark>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    prepend-icon="person"
                    label="First name *"
                    v-model="editedItem.firstName"
                    required
                    box
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Middle name" v-model="editedItem.middleName" box></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Last name *" v-model="editedItem.lastName" required box></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field
                    prepend-icon="local_phone"
                    label="Phone Number *"
                    v-model="editedItem.phoneNumber"
                    required
                    box
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field
                    label="Emergency Phone Number"
                    v-model="editedItem.emergencyPhoneNumbr"
                    box
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="location_city"
                    label="Address"
                    v-model="editedItem.address"
                    box
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md9>
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="date"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        prepend-icon="cake"
                        v-model="date"
                        label="Day of Birth"
                        v-on="on"
                        box
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm6 md3>
                  <v-text-field label="Age" v-model="editedItem.age" box></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-select
                    prepend-icon="face"
                    :items="genders"
                    item-text="gender"
                    item-value="code"
                    label="Gender *"
                    v-model="selectedGender"
                    v-on:change="editedItem.gender = selectedGender.code"
                    required
                    return-object
                    box
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-select
                    prepend-icon="assignment"
                    :items="memberShipTypes"
                    item-text="name"
                    item-value="membershipTypeId"
                    label="Member Ship Types"
                    v-model="selectedMemberShipTypes"
                    v-on:change="editedItem.membershipTypeId = selectedMemberShipTypes.membershipTypeId"
                    return-object
                    box
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" flat @click="close">Close</v-btn>
            <v-btn
              color="blue"
              flat
              :loading="this.$store.getters['apiCustomers/status'] == 'loading'"
              :disabled="!this.$store.getters['apiCustomers/status']"
              @click="pushCustomer"
            >{{formButton}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-data-table
        :headers="headers"
        :items="customers"
        :loading="this.$store.getters['apiCustomers/status'] == 'loading'"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ '#'+props.item.id }}</td>
          <td>{{ `${props.item.firstName} ${props.item.middleName} ${props.item.lastName}`}}</td>
          <td>{{ props.item.age }}</td>
          <td>{{ props.item.address }}</td>
          <td>{{ props.item.phoneNumber }}</td>
          <td>{{ props.item.dob.substr(0, 10) }}</td>
          <td>{{ props.item.gender==1? '👦' : '👧'}}</td>
          <td>{{ props.item.emergencyPhoneNumbr }}</td>
          <td>{{ memberShipTypes.find(memberShipType => memberShipType.membershipTypeId == props.item.membershipTypeId).name}}</td>
          <td>
            <v-btn small color="green" dark>
              Check-In
              <v-icon small dark right>check_circle</v-icon>
            </v-btn>
            <v-btn small color="blue" @click="editItem(props.item)" dark>
              Edit
              <v-icon small dark right>edit</v-icon>
            </v-btn>
            <v-btn small color="red" @click="deleteItem(props.item)" dark>
              Delete
              <v-icon small dark right>delete</v-icon>
            </v-btn>
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
          text: "Customer ID",
          align: "left",
          sortable: false,
          value: "id"
        },
        {
          text: "Full Name",
          align: "left",
          sortable: false,
          value: "fullName"
        },
        {
          text: "Age",
          align: "left",
          sortable: false,
          value: "age"
        },
        { text: "Address", align: "left", value: "address", sortable: false },
        {
          text: "Phone Number",
          align: "left",
          value: "phoneNumber",
          sortable: false
        },
        { text: "Date Of Birth", align: "left", value: "dob", sortable: false },
        { text: "Gender", align: "left", value: "gender", sortable: false },
        {
          text: "Emergency Phone",
          align: "left",
          value: "emergencyPhoneNumbr",
          sortable: false
        },
        {
          text: "Membership Type",
          align: "left",
          value: "membershipType",
          sortable: false
        },
        { text: "Actions", align: "center", value: "name", sortable: false }
      ],
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      editedID: "-1",
      selectedGender: { gender: "Male", code: 1 },
      genders: [
        { gender: "Unknown", code: 0 },
        { gender: "Male", code: 1 },
        { gender: "Female", code: 2 },
        { gender: "Not Applicable", code: 9 }
      ],
      editedItem: {
        id: "",
        firstName: "",
        middleName: "",
        lastName: "",
        age: "0",
        gender: "1",
        address: "",
        membershipTypeId: "1",
        dob: new Date().toISOString().substr(0, 10),
        phoneNumber: "",
        emergencyPhoneNumbr: ""
      },
      defaultItem: {
        id: "",
        firstName: "",
        middleName: "",
        lastName: "",
        age: "0",
        gender: "1",
        address: "",
        membershipTypeId: "1",
        dob: new Date().toISOString().substr(0, 10),
        phoneNumber: "",
        emergencyPhoneNumbr: ""
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedID === "-1" ? "Add Customer" : "Edit Customer";
    },
    formButton() {
      return this.editedID === "-1" ? "Add" : "Edit";
    },
    customers: function() {
      return this.$store.getters["apiCustomers/customers"];
    },
    memberShipTypes: function() {
      return this.$store.getters["apiMemberships/memberships"];
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize: function() {
      console.log(this.customers);
      this.$store
        .dispatch("apiCustomers/getCustomers")
        .then(() => {
          this.$store
        .dispatch("apiMemberships/getMemberships")
        .then(() => this.close())
        .catch(err => console.log(err));
          this.close();})
        .catch(err => console.log(err));
    },
    close: function() {
      this.dialog = false;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedID = "-1";
    },
    pushCustomer: function() {
      this.loading = true;
      if (this.editedID === "-1") {
        this.$store
          .dispatch("apiCustomers/addCustomer", this.editedItem)
          .then(() => {
            this.close();
            this.initialize();
            this.$store.dispatch("snackbar/fire", {
              snackbarText: "Added Customers Successfully",
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
            console.log(err);
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
      } else {
        this.$store
          .dispatch("apiCustomers/editCustomer", this.editedItem)
          .then(() => {
            this.close();
            this.initialize();
            this.$store.dispatch("snackbar/fire", {
              snackbarText: "Edited Customer Successfully",
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
            console.log(err);
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
    deleteCustomer: function() {
      this.$store
        .dispatch("apiCustomers/deleteCustomer", this.editedItem)
        .then(() => {
          this.initialize();
          this.$store.dispatch("snackbar/fire", {
            snackbarText: "Deleted Customer Successfully",
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
          console.log(err);
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
      this.editedID = item.id;
      this.editedItem = Object.assign({}, item);
      this.selectedGender = this.genders.find(
        gender => gender.code == this.editedItem.gender
      );
      this.selectedMemberShipTypes = this.memberShipTypes.find(
        memberShipType =>
          memberShipType.membershipTypeId == this.editedItem.membershipTypeId
      );
      this.dialog = true;
    },

    deleteItem: function(item) {
      this.editedID = item.id;
      this.editedItem = Object.assign({}, item);
      confirm("Are you sure you want to delete this item?")
        ? this.deleteCustomer()
        : null;
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
