import { Global } from "../../../helpers/global";
import { validationMixin } from "../../../mixins/validationMixin.js";
import { ApiService } from "@/helpers/apiService";
export const approveUser = {
  props: ["userPermissionDataProps"],
  mixins: [validationMixin],
  data() {
    return {
      isLoaderActive: false,
      isDialogLoaderActive: false,
      totalItemsInDB: 0,
      tableItems: [],
      tableDataLoading: false,
  
      // Data Table
      tableLoadingDataText: "Loading data",
      tableHeader: [
        {
          text: "#",
          value: "index",
          width: "5%",
          sortable: false,
          align: "start",
        },
        {
          text: "Name",
          value: "full_name",
          width: "20%",
          sortable: true,
          align: "start",
        },
        {
          text: "Role",
          value: "role_name",
          width: "20%",
          sortable: true,
          align: "start",
        },
        {
          text: "Phone",
          value: "phone_1",
          width: "15%",
          sortable: false,
          align: "start",
        },
        {
          text: "Email",
          value: "user_email",
          width: "20%",
          sortable: true,
          align: "start",
        },
        {
          text: "OTP",
          value: "otp",
          sortable: false,
          width: "10%",
          align: "end",
        },
        {
          text: "Approve",
          value: "user_status",
          sortable: false,
          width: "10%",
          align: "start",
        }, 
      ],

      pagination: {},
      entity: "Approve Users",

      // search
      searchText: "",

      //OTP
      defaultItem: {},
      item: {},
      addOtpDialog: false,
      isFormAddOtpValid: false,
      isAddOtp: true,

      //excel
      excelFields: {
        ID: "id",
        Name: "name",
      },
      excelFileName:
        "productModeMaster" + "_" + moment().format("DD/MM/YYYY") + ".xls",
      //end
    };
  },

  computed: {
    dataTableRowNumbering() {
      return this.tableItems.map((items, index) => ({
        ...items,
        index: index + 1,
      }));
    },
  },
  watch: {
    addOtpDialog(value) {
      return value ? true : this.close();
    },
    //#endregion
    pagination: {
      handler() {
        this.getUsers();
      },
      deep: true,
    },
  },

  created() {},

  methods: {
    // fetch roles
    getUsers() {
      let { page, itemsPerPage, sortDesc, sortBy } = this.pagination;
      sortDesc = sortDesc.length > 0 && sortDesc[0] ? "desc" : "asc";
      sortBy = sortBy.length == 0 ? "user_id" : sortBy[0];
      let payload = {
        sortColumn: sortBy,
        sortOrder: sortDesc,
        itemsPerPage: itemsPerPage,
        searchText: this.searchText,
        page: page,
        endPoint: "GetNewUser",
      };
      this.isLoaderActive = true;
      ApiService.get("GetNewUser", payload)
        .then((response) => {
          this.isLoaderActive = false;

          this.tableItems = response.data.resultData.data;

          this.totalItemsInDB = response.data.resultData.total;
        })
        .catch((error) => {
          this.isLoaderActive = false;
          if (error.response.status != 401 && error.response.status != 403) {
            Global.showErrorAlert(true, "error", "Something went wrong");
          }
        });
      
    },
    // search
    searchInfo() {
      clearTimeout(this._timerId);
      this._timerId = setTimeout(() => {
        this.getUsers();
      }, 500);
    },

    // Approve User
    async enableDisableItem(item) {
      const result = await Global.showConfirmationAlert(
        `Change ${this.entity} : ${item.full_name} Status`,
        "Are you sure to change the status",
        "warning"
      );
      if (result.isConfirmed) {
        let payload = {
          user_id: item.user_id,
          status: item.user_status == "New" ? "Active" : "Active",
        };
        this.isLoaderActive = true;
        ApiService.post(`changeUserStatus`, payload)
          .then((response) => {
            this.isLoaderActive = false;

            Global.showSuccessAlert(true, "success", response.data.message);

            this.getUsers();
          })
          .catch((error) => {
            this.isLoaderActive = false;
            if (error.response.status != 401 || error.response.status != 403) {
              Global.showErrorAlert(true, "error", "Something went wrong");
            }
          });
      } else {
        if (item.user_status == "New") {
          item.user_status = "Active";
        } else {
          item.user_status = "New";
        }
      }
    },

    //#region  show add Service dialog
    showAddOtpDialog(item) {
      if (item == null && this.isAddOtp == true) {
        this.addOtpText = `Add  ${this.entity}`;
        this.addOtpDialog = true;
      } else {
        this.item = Object.assign({}, item);
        this.addOtpText = `Enter OTP `
        this.addOtpDialog = true;
      }
    },
    //#endregion

    //#region  to close the dialog
    close() {
      this.addOtpDialog = false;
      setTimeout(() => {
        this.item = Object.assign({}, {});
      }, 300);
    },
    //#endregion

     //#region  add Otp item
     addOtpItem(item) {
      if (this.$refs.holdingFormAddOtp.validate()) {
        if (this.isAddOtp) {
          // save
          let payload = {
            user_id: this.item.user_id,
            verify_otp: this.item.verify_otp,
          };
          this.isDialogLoaderActive = true;
          ApiService.post("WebVerifyOTP",payload)
            .then((response) => {
              this.isDialogLoaderActive = false;
              this.close();
              if (response.data.result == "success") {
                Global.showSuccessAlert(true, "success", response.data.message);
                this.getUsers();
              } else if (response.data.result == "error") {
                Global.showErrorAlert(true, "error", response.data.message);
              }
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
        } else {
          //update
          this.isDialogLoaderActive = true;
          let payload = {
            user_id: this.item.user_id,
            verify_otp: this.item.verify_otp,
          };
          ApiService.post("WebVerifyOTP",payload)
            .then((response) => {
              this.isDialogLoaderActive = false;
              this.close();
              if (response.data.result == "success") {
                Global.showSuccessAlert(true, "success", response.data.message);
                this.getUsers();
              } else if (response.data.result == "error") {
                Global.showErrorAlert(true, "error", response.data.message);
              }
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
        }
      }
    },
    //#endregion
  },
};
