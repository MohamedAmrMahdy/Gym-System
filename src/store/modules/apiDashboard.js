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
      let myObj = {};
      myObj.dayCheckins = {};
      myObj.monthlyEarnings = {};
      myObj.subscriptions = {};
      myObj.totalCustomers = data.totalCustomers;
      myObj.totalCheckinsToday = data.totalCheckinsToday;
      myObj.earningsToday = data.earningsToday;
      myObj.totalEarnings = data.totalEarnings;
      data.dayCheckins.forEach((e)=>{
        myObj.dayCheckins[e.day] = e.totalCheckins;
        })
      data.monthlyEarnings.forEach((e)=>{
        myObj.monthlyEarnings[e.month] = e.amount;
        })
      data.subscriptions.forEach((e)=>{
        myObj.subscriptions[e.name] = e.totalSubscribers;
        })
      JSON.stringify(myObj.dayCheckins);
      JSON.stringify(myObj.monthlyEarnings);
      JSON.stringify(myObj.subscriptions);
      state.dashboardData = myObj;
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
