import * as types from "../../../store/mutationTypes";
import { ApiService } from "../../../helpers/apiService";
import { Global } from "../../../helpers/global";

const state = {
  isLoaderActive: false,
  userPermission: null,
};

const mutations = {
  [types.IS_LOADER_ACTIVE](state, value) {
    state.isLoaderActive = value;
  },

  [types.USER_PERMISSION](state, value) {
    state.userPermission = value;
  },
};

const getters = {
  userPermission: (state) => state.userPermission,
};

const actions = {
  // Logged user details with roles and permissions
  actionGetLoggedUserDetailsWithRolesPermission({ commit }, payload) {
    commit(types.IS_LOADER_ACTIVE, true);
    return new ApiService.get(
      "webGetLoggedUserDetailsWithRolesPermission",
      payload
    )
      .then((response) => {
        commit(types.IS_LOADER_ACTIVE, false);
        if (response.data.result == "success") {
          commit(types.USER_PERMISSION, response.data.userPermission);
        } else if (response.data.result == "exception") {
          Global.showErrorAlert(true, "error", response.data.message, null);
        }
      })
      .catch((error) => {
        commit(types.IS_LOADER_ACTIVE, false);
        Global.showErrorAlert(true, "error", "Something went wrong", error);
      });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
