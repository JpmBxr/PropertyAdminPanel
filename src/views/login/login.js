import { validationMixin } from "../../mixins/validationMixin";
import { Global } from "../../helpers/global";
import { mapActions } from "vuex";
export const login = {
  mixins: [validationMixin],

  //#region -  Data Section
  data() {
    return {
      //  Login Data
      isholdingFormValid: true,
      email: "",
      password: "",
      isPasswordVisible: false,
      CompanyName: Global.CompanyName,
    };
  },
  //#endregion
  //#region - Function Created
  created() {
    // get the vuetify dark theme false
    this.$vuetify.theme.dark = false;
  },
  //#endregion
  //#region - Computed
  computed: {
    isLoaderActive() {
      return this.$store.state.login.isLoaderActive;
    },
  },
  //#endregion

  //#region - Function Methods
  methods: {
    ...mapActions(["actionValidateLogin"]),
    //#region - Function validate login
    validateLogin() {
      //Internet checking
      if (navigator.onLine) {
        // Form Validation Checking
        if (this.$refs.holdingForm.validate()) {
          this.actionValidateLogin({
            email: this.email,
            password: this.password,
          });
        }
      } else {
        // Internet not found
        Global.showErrorAlert(true, "error", "Internet not found", null);
      }
    },
    //#endregion
  },

  //#endregion
};
