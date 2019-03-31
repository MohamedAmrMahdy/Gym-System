import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    expiration: "",
    user: "",
    cashiers: [],
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    cashiers: state => state.cashiers,
    status: state => state.status,
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, {token, expiration, user}) {
      state.status = "success";
      state.token = token;
      state.expiration = expiration;
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.expiration = "";
    },
    addCashier_request(state){
      state.status = "loading";
    },
    addCashier_success(state) {
      state.status = "success";
    },
    addCashier_error(state) {
      state.status = "error";
    },
    getCashier_request(state){
      state.status = "loading";
    },
    getCashier_success(state, data) {
      state.cashiers = data;
      state.status = "success";
    },
    getCashier_error(state) {
      state.status = "error";
    },
    editCashier_request(state){
      state.status = "loading";
    },
    editCashier_success(state) {
      state.status = "success";
    },
    editCashier_error(state) {
      state.status = "error";
    },
    deleteCashier_request(state){
      state.status = "loading";
    },
    deleteCashier_success(state) {
      state.status = "success";
    },
    deleteCashier_error(state) {
      state.status = "error";
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "https://localhost:44307/login",
          data: user,
          method: "POST"
        })
          .then(resp => {
            const token = resp.data.token;
            const expiration = resp.data.expiration;
            const user = JSON.parse(atob(token.split('.')[1])).Username;
            localStorage.setItem("token", "bearer " + token);
            axios.defaults.headers.common["Authorization"] = "bearer " +  token;
            const commitData = {token, expiration, user};
            commit("auth_success", commitData);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("logout");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
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
    editCashier({ commit }, {id, firstName, lastName, userName, phoneNumber}) {
      let data = {Id:id, firstName, lastName, userName, phoneNumber};
      return new Promise((resolve, reject) => {
        commit("editCashier_request");
        axios({
          url: "https://localhost:44307/user",
          data: data,
          method: "POST"
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
          data: {Id},
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
    getCashiers({ commit }){
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
});
