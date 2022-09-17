import Vue from "vue";
import Vuex from "vuex";
import login from "../store/modules/login/login";
import home from "../store/modules/home/home";

import role from "../store/modules/master/role";
import master from "../store/modules/master/master";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    home,
    role,
    master,
  },
});
