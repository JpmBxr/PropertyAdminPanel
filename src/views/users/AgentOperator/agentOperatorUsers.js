import { ApiService } from "@/helpers/apiService";
import { Global } from "../../../helpers/global";
import { validationMixin } from "../../../mixins/validationMixin.js";
export const agentOperatorUsers = {
  props: ["userPermissionDataProps"],
  mixins: [validationMixin],
  data() {
    return {
      isLoaderActive: false,
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
          width: "30%",
          sortable: true,
          align: "start",
          class:"active"
        },
        {
          text: "Role",
          value: "role_name",
          width: "10%",
          sortable: true,
          align: "start",
          class:"active"
        },

        {
          text: "Phone",
          value: "phone_1",
          width: "15%",
          sortable: true,
          align: "start",
          class:"active"
        },
        {
          text: "Email",
          value: "user_email",
          width: "20%",
          sortable: true,
          align: "start",
          class:"active"
        },

        {
          text: "Status",
          value: "user_status",
          sortable: false,
          width: "10%",
          align: "start",
          
        },

        {
          text: "Actions",
          value: "actions",
          sortable: false,
          width: "15%",
          align: "end",
        },
      ],
      loggedInUserID: null,
      loggedInUserRole: null,
      pagination: {},
      entity: "Users",

      // search
      searchText: "",

      // add edit
      defaultItem: {},
      item: {},
      addEditDialog: false,
      isFormAddEditValid: false,
      isAddEdit: true,
      addUpdateButtonText: "Add Role",
      addEditText: "Add",
      //end

      //excel
      excelFields: {
        full_name: "full_name",
        role_name: "role_name",
        Primary_Phone:"phone_1",
        user_email:"user_email",
        user_status:"user_status"
      },
      excelFileName:
        "User" + "_" + moment().format("DD/MM/YYYY") + ".xls",
      //end
    };
  },

  computed: {
    // For numbering the Data Table Rows
    dataTableRowNumbering() {
      return this.tableItems.map((items, index) => ({
        ...items,
        index: index + 1,
      }));
    },
  },
  watch: {
    pagination: {
      handler() {
        this.getUsers();
      },
      deep: true,
    },
  },

  // Change Status Color
    setStatusColor(is_active) {
      return Global.getStatusColor(is_active);
    },

  created() {
    this.loggedInUserRole = secureLS.get(Global.roleName);
    this.loggedInUserID = secureLS.get(Global.userId);

    console.log(this.loggedInUserRole, "   ", this.loggedInUserID);
   
    this.$laravel.setPermissions(this.userPermissionDataProps);
  },

  methods: {
    // fetch roles
    getUsers() {
      let { page, itemsPerPage, sortDesc, sortBy } = this.pagination;
      sortDesc = sortDesc.length > 0 && sortDesc[0] ? "desc" : "asc";
      sortBy = sortBy.length == 0 ? "full_name" : sortBy[0];
      let payload = {
        sortColumn: sortBy,
        sortOrder: sortDesc,
        itemsPerPage: itemsPerPage,
        searchText: this.searchText,
        page: page,
        loggedInUserID: secureLS.get(Global.userId)
      };
      this.isLoaderActive = true;
      ApiService.get("GetUser", payload)
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

    //show add edit dialog
    showAddEditPage(item) {
      this.$router.push({
        name: "AddAgentOperator",
        params: { addAgentOperatorDataProps: item },
      });
    },

    // enable disable role
    async enableDisableItem(item) {
      console.log(item);
      const result = await Global.showConfirmationAlert(
        `Change ${this.entity} : ${item.full_name} Status`,
        "Are you sure to change the status",
        "warning"
      );
      if (result.isConfirmed) {
        let payload = {
          user_id: item.user_id,
          status: item.user_status,
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
        if (item.user_status == "Inactive") {
          item.user_status = "Active";
        } else {
          item.user_status = "Inactive";
        }
      }
    },
    async deleteItem(item) {
      console.log(item);
      const result = await Global.showConfirmationAlert(
        `${this.entity} : ${item.full_name} `,
        "Are you sure to Delete the User",
        "warning"
      );
      if (result.isConfirmed) {
        let payload = {
          user_id: item.user_id,
       
        };

        this.isLoaderActive = true;
        ApiService.post(`deleteUser`, payload)
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
      }
    },
  },
};
