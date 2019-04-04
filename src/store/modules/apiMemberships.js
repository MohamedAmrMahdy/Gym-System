import axios from "axios";

export default {
  state: {
    status: "",
    memberships: []
  },
  getters: {
    memberships: state => state.memberships,
    status: state => state.status
  },
  mutations: {
    addMembership_request(state) {
      state.status = "loading";
    },
    addMembership_success(state) {
      state.status = "success";
    },
    addMembership_error(state) {
      state.status = "error";
    },
    getMemberships_request(state) {
      state.status = "loading";
    },
    getMemberships_success(state, data) {
      state.memberships = data;
      state.status = "success";
    },
    getMemberships_error(state) {
      state.status = "error";
    },
    editMembership_request(state) {
      state.status = "loading";
    },
    editMembership_success(state) {
      state.status = "success";
    },
    editMembership_error(state) {
      state.status = "error";
    },
    deleteMembership_request(state) {
      state.status = "loading";
    },
    deleteMembership_success(state) {
      state.status = "success";
    },
    deleteMembership_error(state) {
      state.status = "error";
    }
  },
  actions: {
    addMembership(
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
        commit("addMembership_request");
        axios({
          url: "https://localhost:44307/api/Memberships",
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
            commit("addMembership_success");
            resolve(resp);
          })
          .catch(err => {
            commit("addMembership_error");
            reject(err);
          });
      });
    },
    editMembership(
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
        commit("editMembership_request");
        axios({
          url: "https://localhost:44307/api/Memberships/" + id,
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
            commit("editMembership_success");
            resolve(resp);
          })
          .catch(err => {
            commit("editMembership_error");
            reject(err);
          });
      });
    },
    deleteMembership({ commit }, { id }) {
      let Id = id;
      return new Promise((resolve, reject) => {
        commit("deleteMembership_request");
        axios({
          url: "https://localhost:44307/api/Memberships/" + id,
          data: { Id },
          method: "DELETE"
        })
          .then(resp => {
            commit("deleteMembership_success");
            resolve(resp);
          })
          .catch(err => {
            commit("deleteMembership_error");
            reject(err);
          });
      });
    },
    getMemberships({ commit }) {
      return new Promise((resolve, reject) => {
        commit("getMemberships_request");
        axios({
          url: "https://localhost:44307/api/MembershipTypes",
          method: "GET"
        })
          .then(resp => {
            commit("getMemberships_success", resp.data);
            resolve(resp);
          })
          .catch(err => {
            commit("getMemberships_error");
            reject(err);
          });
      });
    }
  }
};
