export default {
  state: {
    active: false,
    snackbarText: "",
    snackbarTimeout: 5000,
    color: "",
    left: true,
    right: false,
    top: false,
    bottom: true,
    multiline: false,
    vertical: false
  },
  getters: {
    snackbarState: state => state,
  },
  mutations: {
    showSnackbar(state, {snackbarText, snackbarTimeout, color, left, right, top, bottom, multiline, vertical}) {
        state.active = true;
        state.snackbarText = snackbarText;
        state.snackbarTimeout = snackbarTimeout;
        state.color = color;
        state.left = left;
        state.right = right;
        state.top = top;
        state.bottom = bottom;
        state.multiline = multiline;
        state.vertical = vertical;
    },
    hideSnackbar(state){
        state.active = false;
        state.snackbarText = "",
        state.snackbarTimeout = 5000;
        state.color = "";
        state.left = true;
        state.right = false;
        state.top = false;
        state.bottom = true;
        state.multiline = false;
        state.vertical = false;
    }
  },
  actions: {
    fire({ commit }, data) {
        commit('hideSnackbar')
        commit("showSnackbar", data);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
              commit('hideSnackbar')
              resolve()
            }, data.snackbarTimeout)
        })
    }
  }
};
