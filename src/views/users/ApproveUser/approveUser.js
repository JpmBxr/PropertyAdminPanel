import { Global } from "../../../helpers/global";
import { validationMixin } from "../../../mixins/validationMixin.js";
import { ApiService } from "@/helpers/apiService";
export const approveUser = {
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
        },
        {
          text: "Phone",
          value: "phone_1",
          width: "15%",
          sortable: true,
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
    addEditDialog(value) {
      return value ? true : this.close();
    },
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
  },
};
