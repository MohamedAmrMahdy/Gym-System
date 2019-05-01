import axios from "axios";

export default {
  state: {
    status: "",
    dashboardData: {}
  },
  getters: {
    dashboardData: state => state.dashboardData,
    status: state => state.status
  },
  mutations: {
    addCashier_request(state) {
      state.status = "loading";
    },
    addCashier_success(state, data) {
      state.dashboardData = data;
      state.status = "success";
    },
    addCashier_error(state) {
      state.status = "error";
    }
  },
  actions: {
    getDashboardData({ commit }) {
        return new Promise((resolve, reject) => {
            commit("addCashier_request");
            axios({
                url: "https://localhost:44307/user/DashboardData",
                method: "GET"
            })
                .then(resp => {
                commit("addCashier_success", resp.data);
                resolve(resp);
                })
                .catch(err => {
                commit("addCashier_error");
                reject(err);
                });
        });
    }
  }
};
