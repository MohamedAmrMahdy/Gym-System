import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    expiration: "",
    user: ""
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
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
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] ="bearer " +  token;
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
          url: "https://localhost:44307/registerCashier",
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
    }
  }
});
