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
    addCustomer({ commit }, CustomerData) {
      return new Promise((resolve, reject) => {
        commit("addCustomer_request");
        axios({
          url: "https://localhost:44307/api/customers",
          data: CustomerData,
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
      { commit },
      { id, firstName, lastName, userName, phoneNumber }
    ) {
      let data = { Id: id, firstName, lastName, userName, phoneNumber };
      return new Promise((resolve, reject) => {
        commit("editCustomer_request");
        axios({
          url: "https://localhost:44307/api/customer/" + id,
          data: data,
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
          url: "https://localhost:44307/user",
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
