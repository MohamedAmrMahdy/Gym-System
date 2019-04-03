import axios from "axios";

export default {
  state: {
    status: "",
    customers: []
  },
  getters: {
    customers: state => state.customers,
    status: state => state.status
  },
  mutations: {
    addCustomer_request(state) {
      state.status = "loading";
    },
    addCustomer_success(state) {
      state.status = "success";
    },
    addCustomer_error(state) {
      state.status = "error";
    },
    getCustomers_request(state) {
      state.status = "loading";
    },
    getCustomers_success(state, data) {
      state.customers = data;
      state.status = "success";
    },
    getCustomers_error(state) {
      state.status = "error";
    },
    editCustomer_request(state) {
      state.status = "loading";
    },
    editCustomer_success(state) {
      state.status = "success";
    },
    editCustomer_error(state) {
      state.status = "error";
    },
    deleteCustomer_request(state) {
      state.status = "loading";
    },
    deleteCustomer_success(state) {
      state.status = "success";
    },
    deleteCustomer_error(state) {
      state.status = "error";
    }
  },
  actions: {
    addCustomer(
      { commit },
      {
        firstName,
        middleName,
        lastName,
        gender,
        address,
        dob,
        phoneNumber,
        emergencyPhoneNumbr
      }
    ) {
      return new Promise((resolve, reject) => {
        commit("addCustomer_request");
        axios({
          url: "https://localhost:44307/api/customers",
          data: {
            firstName,
            middleName,
            lastName,
            gender,
            address,
            dob,
            phoneNumber,
            emergencyPhoneNumbr
          },
          method: "POST"
        })
          .then(resp => {
            commit("addCustomer_success");
            resolve(resp);
          })
          .catch(err => {
            commit("addCustomer_error");
            reject(err);
          });
      });
    },
    editCustomer(
      { commit }, {address,
      age,
      dob,
      emergencyPhoneNumbr,
      firstName,
      gender,
      id,
      lastName,
      middleName,
      phoneNumber
      }
    ) {
      return new Promise((resolve, reject) => {
        commit("editCustomer_request");
        axios({
          url: "https://localhost:44307/api/customers/" + id,
          data: {address,
            age,
            dob,
            emergencyPhoneNumbr,
            firstName,
            gender,
            id,
            lastName,
            middleName,
            phoneNumber
            },
          method: "PUT"
        })
          .then(resp => {
            commit("editCustomer_success");
            resolve(resp);
          })
          .catch(err => {
            commit("editCustomer_error");
            reject(err);
          });
      });
    },
    deleteCustomer({ commit }, { id }) {
      let Id = id;
      return new Promise((resolve, reject) => {
        commit("deleteCustomer_request");
        axios({
          url: "https://localhost:44307/api/customers/" + id,
          data: { Id },
          method: "DELETE"
        })
          .then(resp => {
            commit("deleteCustomer_success");
            resolve(resp);
          })
          .catch(err => {
            commit("deleteCustomer_error");
            reject(err);
          });
      });
    },
    getCustomers({ commit }) {
      return new Promise((resolve, reject) => {
        commit("getCustomers_request");
        axios({
          url: "https://localhost:44307/api/customers",
          method: "GET"
        })
          .then(resp => {
            commit("getCustomers_success", resp.data);
            resolve(resp);
          })
          .catch(err => {
            commit("getCustomers_error");
            reject(err);
          });
      });
    }
  }
};
