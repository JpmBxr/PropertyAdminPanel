import * as types from "../../../store/mutationTypes";
import { ApiService } from "../../../helpers/apiService";
import { Global } from "../../../helpers/global";
import router from "../../../router/router";
import SecureLS from "secure-ls";
var secureLS = new SecureLS({ encodingType: "aes" });
const state = {
  isLoaderActive: false,
  isLoggedIn: !!secureLS.get(Global.tokenKey),
};

const mutations = {
  [types.IS_LOADER_ACTIVE](state, value) {
    state.isLoaderActive = value;
  },

  [types.IS_LOGGED_IN](state, value) {
    state.isLoggedIn = value;
  },

  [types.IS_LOGGED_OUT](state, value) {
    state.isLoggedIn = value;
  },
};

const actions = {
  // validate login
  actionValidateLogin({ commit }, payload) {
    commit(types.IS_LOADER_ACTIVE, true);
    ApiService.post("webValidateLogin", payload)
      .then((response) => {
        commit(types.IS_LOADER_ACTIVE, false);
        if (response.data.result == "success") {
          console.log("Login API", response.data.roleData[0].name);
          secureLS.set(Global.tokenKey, response.data.token);
          secureLS.set(Global.firstNameKey, response.data.userData.first_name);
          secureLS.set(Global.lastNameKey, response.data.userData.last_name);
          secureLS.set(Global.fullNameKey, response.data.userData.full_name);
          secureLS.set(Global.userId, response.data.userData.user_id);
          secureLS.set(Global.roleName, response.data.roleData[0].name);
          secureLS.set(Global.roleId, response.data.roleData[0].role_id);

          commit(types.IS_LOGGED_IN, true);
          router.push({
            path: "/home/master/role/role-master",
          });
        } else if (response.data.result == "error") {
          Global.showErrorAlert(true, "error", response.data.message, null);
        } else if (response.data.result == "exception") {
          Global.showErrorAlert(true, "error", response.data.message, null);
        }
      })
      .catch((error) => {
        commit(types.IS_LOADER_ACTIVE, false);
        Global.showErrorAlert(true, "error", "Something went wrong", null);
      });
  },

  // Logout
  actionLogout({ commit }, payload) {
    commit(types.IS_LOADER_ACTIVE, true);
    ApiService.post("webLogout", payload)
      .then((response) => {
        commit(types.IS_LOADER_ACTIVE, false);
        if (response.data.result == "success") {
          commit(types.IS_LOGGED_OUT, false);
          secureLS.removeAll();
          router.push({
            name: "Login",
          });
        } else if (response.data.result == "exception") {
          Global.showErrorAlert(true, "error", response.data.message, null);
        }
      })
      .catch((error) => {
        commit(types.IS_LOADER_ACTIVE, false);
        Global.showErrorAlert(true, "error", "Something went wrong", error);
      });
  },

  //unauthorized logout
  actionUnauthorizedLogout({ commit }) {
    commit(types.IS_LOGGED_OUT, false);
    secureLS.removeAll();
    router.push({
      name: "Login",
    });
  },
};

export default {
  state,
  actions,
  mutations,
};
