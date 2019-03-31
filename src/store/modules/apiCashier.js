import axios from "axios";

export default {
  state: {
    status: "",
    cashiers: []
  },
  getters: {
    cashiers: state => state.cashiers,
    status: state => state.status
  },
  mutations: {
    addCashier_request(state) {
      state.status = "loading";
    },
    addCashier_success(state) {
      state.status = "success";
    },
    addCashier_error(state) {
      state.status = "error";
    },
    getCashier_request(state) {
      state.status = "loading";
    },
    getCashier_success(state, data) {
      state.cashiers = data;
      state.status = "success";
    },
    getCashier_error(state) {
      state.status = "error";
    },
    editCashier_request(state) {
      state.status = "loading";
    },
    editCashier_success(state) {
      state.status = "success";
    },
    editCashier_error(state) {
      state.status = "error";
    },
    deleteCashier_request(state) {
      state.status = "loading";
    },
    deleteCashier_success(state) {
      state.status = "success";
    },
    deleteCashier_error(state) {
      state.status = "error";
    }
  },
  actions: {
    addCashier({ commit }, CashierData) {
      return new Promise((resolve, reject) => {
        commit("addCashier_request");
        axios({
          url: "https://localhost:44307/user/registerCashier",
          data: CashierData,
          method: "POST"
        })
          .then(resp => {
            commit("addCashier_success");
            resolve(resp);
          })
          .catch(err => {
            commit("addCashier_error");
            reject(err);
          });
      });
    },
    editCashier(
      { commit },
      { id, firstName, lastName, userName, phoneNumber }
    ) {
      let data = { Id: id, firstName, lastName, userName, phoneNumber };
      return new Promise((resolve, reject) => {
        commit("editCashier_request");
        axios({
          url: "https://localhost:44307/user/" + id,
          data: data,
          method: "PUT"
        })
          .then(resp => {
            commit("editCashier_success");
            resolve(resp);
          })
          .catch(err => {
            commit("editCashier_error");
            reject(err);
          });
      });
    },
    deleteCashier({ commit }, { id }) {
      let Id = id;
      return new Promise((resolve, reject) => {
        commit("deleteCashier_request");
        axios({
          url: "https://localhost:44307/user",
          data: { Id },
          method: "DELETE"
        })
          .then(resp => {
            commit("deleteCashier_success");
            resolve(resp);
          })
          .catch(err => {
            commit("deleteCashier_error");
            reject(err);
          });
      });
    },
    getCashiers({ commit }) {
      return new Promise((resolve, reject) => {
        commit("getCashier_request");
        axios({
          url: "https://localhost:44307/user",
          method: "GET"
        })
          .then(resp => {
            commit("getCashier_success", resp.data);
            resolve(resp);
          })
          .catch(err => {
            commit("getCashier_error");
            reject(err);
          });
      });
    }
  }
};
