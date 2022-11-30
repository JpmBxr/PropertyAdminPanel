import { validationMixin } from "../../mixins/validationMixin";
import { Global } from "../../helpers/global";
import { ApiService } from "../../helpers/apiService";
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

      item:{},
      forgetPassDialog: false,
      isFormForgetPassValid: false,
      isDialogLoaderActive: false,
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

     // forgetPassItem
     forgetPassItem(item) {
          // save
          let payload = {
            forget_email: item.forget_email,
          };
          this.isDialogLoaderActive = true;
          ApiService.post(`forget_password`, payload)
            .then((response) => {
              this.isDialogLoaderActive = false;
              Global.showSuccessAlert(true, "success", response.data.message);
              this.close();
             
            })
            .catch((error) => {
              this.isDialogLoaderActive = false;
              if (
                error.response.status != 401 ||
                error.response.status != 403
              ) {
                Global.showErrorAlert(true, "error", "Something went wrong");
              }
            });
     },

    //#region  show forget Pass Dialog
    showforgetPassDialog(item) {
      if (item == null && this.isforgetPass == true) {
        this.forgetPassText = `Change Password `
        this.forgetPassDialog = true;
      } else {
        this.item = Object.assign({}, item);
        this.forgetPassText = `Forget Password `
        this.forgetPassDialog = true;
      }
    },
    //#endregion

     //#region  to close the dialog
    close() {
      this.forgetPassDialog = false;
      setTimeout(() => {
        this.item = Object.assign({}, {});
      }, 300);
    },
    //#endregion
  },

  //#endregion
};
