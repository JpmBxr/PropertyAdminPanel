import Vue from "vue";
import App from "./App.vue";

// Secure LS
import SecureLS from "secure-ls";
const secureLS = new SecureLS({ encodingType: "aes" });
window.secureLS = secureLS;

// For Router
import router from "./router/router";
// For Vuex Store
import store from "./store/store";

//For vuetify
import vuetify from "./plugins/vuetify";

// Perfect Scroll Bar
import PerfectScrollbar from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";

Vue.use(PerfectScrollbar);

// Excel Export
import JsonExcel from "vue-json-excel";
Vue.component("downloadExcel", JsonExcel);

// Moment for JS Date time
import moment from "moment";
window.moment = moment;

// For directives
import directive from "./directives/directive";

//Sweet alert
import VueSweetalert2 from "vue-sweetalert2";
Vue.use(VueSweetalert2);

// Vue permission
import LaravelPermissions from "laravel-permissions";
Vue.use(LaravelPermissions);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
