import * as types from "../../../store/mutationTypes";
import { ApiService } from "../../../helpers/apiService";
import { Global } from "../../../helpers/global";

const state = {
  items: [],
  totalItemsInDB: 0,
  isTableDataLoading: false,
  isDialogLoaderActive: false,
};

const mutations = {
  [types.IS_TABLE_DATA_LOADING](state, value) {
    state.isTableDataLoading = value;
  },
  [types.ITEMS](state, data) {
    state.items = data;
  },
  [types.TOTAL_ITEMS](state, value) {
    state.totalItemsInDB = value;
  },
  [types.IS_DIALOG_LOADER_ACTIVE](state, value) {
    state.isDialogLoaderActive = value;
  },
};

const getters = {
  items: (state) => state.items,
  totalItems: (state) => state.totalItemsInDB,
};

const actions = {
  // get
  actionGet({ commit }, payload) {
    console.log(payload.endPoint);
    commit(types.IS_TABLE_DATA_LOADING, true);
    ApiService.get(`${payload.endPoint}?page=${payload.page}`, payload)
      .then((response) => {
        commit(types.IS_TABLE_DATA_LOADING, false);
        commit(types.ITEMS, response.data.resultData.data);
        commit(types.TOTAL_ITEMS, response.data.resultData.total);
      })
      .catch((error) => {
        commit(types.IS_TABLE_DATA_LOADING, false);
        if (error.response.status != 401 && error.response.status != 403) {
          Global.showErrorAlert(true, "error", "Something went wrong");
        }
      });
  },

  //save
  actionSave({ commit }, payload) {
    commit(types.IS_DIALOG_LOADER_ACTIVE, true);
    return new ApiService.post(payload.endPoint, payload)

      .then((response) => {
        commit(types.IS_DIALOG_LOADER_ACTIVE, false);
        Global.showSuccessAlert(true, "success", response.data.message);
      })
      .catch((error) => {
        commit(types.IS_DIALOG_LOADER_ACTIVE, false);
        if (error.response.status != 401 && error.response.status != 403) {
          Global.showErrorAlert(true, "error", "Something went wrong");
        }
      });
  },

  actionUpdate({ commit }, payload) {
    commit(types.IS_DIALOG_LOADER_ACTIVE, true);
    return new ApiService.post(payload.endPoint, payload)

      .then((response) => {
        commit(types.IS_DIALOG_LOADER_ACTIVE, false);

        Global.showSuccessAlert(true, "success", response.data.message);
      })
      .catch((error) => {
        commit(types.IS_DIALOG_LOADER_ACTIVE, false);
        if (error.response.status != 401 && error.response.status != 403) {
          Global.showErrorAlert(true, "error", "Something went wrong");
        }
      });
  },

  actionEnableDisable({ commit }, payload) {
    commit(types.IS_LOADER_ACTIVE, true);
    return new ApiService.post(payload.endPoint, payload)

      .then((response) => {
        commit(types.IS_LOADER_ACTIVE, false);

        Global.showSuccessAlert(true, "success", response.data.message);
      })
      .catch((error) => {
        commit(types.IS_LOADER_ACTIVE, false);
        if (error.response.status != 401 && error.response.status != 403) {
          Global.showErrorAlert(true, "error", "Something went wrong");
        }
      });
  },

  actionDelete({ commit }, payload) {
    commit(types.IS_LOADER_ACTIVE, true);
    return new ApiService.post(payload.endPoint, payload)

      .then((response) => {
        commit(types.IS_LOADER_ACTIVE, false);

        Global.showSuccessAlert(true, "success", response.data.message);
      })
      .catch((error) => {
        commit(types.IS_LOADER_ACTIVE, false);
        if (error.response.status != 401 && error.response.status != 403) {
          Global.showErrorAlert(true, "error", "Something went wrong");
        }
      });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
