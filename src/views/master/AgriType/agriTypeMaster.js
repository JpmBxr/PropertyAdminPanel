import { Global } from "../../../helpers/global";
import { validationMixin } from "../../../mixins/validationMixin.js";
import { ApiService } from "@/helpers/apiService";
export const agriTypeMaster = {
  props: ["userPermissionDataProps"],
  mixins: [validationMixin],
  data() {
    return {
      //newly added
      isLoaderActive: false,
      isDialogLoaderActive: false,
      totalItemsInDB: 0,
      tableItems: [],
      tableDataLoading: false,
      //end
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
          value: "agri_type_name",
          width: "50%",
          sortable: true,
          align: "start",
        },
        {
          text: "Status",
          value: "agri_type_status",
          sortable: false,
          width: "20%",
          align: "start",
        },

        {
          text: "Actions",
          value: "actions",
          sortable: false,
          width: "25%",
          align: "end",
        },
      ],

      pagination: {},
      entity: "Agri Type",
      endPoint: "AgriType",
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
        ID: "agri_type_id",
        Name: "agri_type_name",
        Status: "agri_type_status",
      },
      excelFileName:
        "agryTypeMaster" + "_" + moment().format("DD/MM/YYYY") + ".xls",
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
    addEditDialog(value) {
      return value ? true : this.close();
    },
    pagination: {
      handler() {
        this.get();
      },
      deep: true,
    },
  },
  methods: {
    // fetch
    get() {
      let { page, itemsPerPage, sortDesc, sortBy } = this.pagination;
      sortDesc = sortDesc.length > 0 && sortDesc[0] ? "desc" : "asc";
      sortBy = sortBy.length == 0 ? "agri_type_name" : sortBy[0];
      let payload = {
        sortColumn: sortBy,
        sortOrder: sortDesc,
        itemsPerPage: itemsPerPage,
        searchText: this.searchText,
        page: page,
      };
      this.isLoaderActive = true;
      ApiService.get("GetAgriType", payload)
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
        this.get();
      }, 500);
    },

    //show add edit dialog
    showAddEditDialog(item) {
      if (item == null && this.isAddEdit == true) {
        this.addEditText = `Add New ${this.entity}`;
        this.addEditDialog = true;
        this.addUpdateButtonText = " Add ";
      } else {
        this.item = Object.assign({}, item);
        this.addEditText = `Edit ${this.entity} : ` + this.item.name;
        this.addEditDialog = true;
        this.addUpdateButtonText = "Update";
      }
    },

    close() {
      this.addEditDialog = false;
      setTimeout(() => {
        this.item = Object.assign({}, this.defaultItem);
      }, 300);
    },

    // add edit
    addEditItem() {
      if (this.$refs.holdingFormAddEdit.validate()) {
        if (this.isAddEdit) {
          // save
          let payload = {
            agri_type_name: this.item.agri_type_name,
          };
          this.isDialogLoaderActive = true;
          ApiService.post(`Save${this.endPoint}`, payload)
            .then((response) => {
              this.isDialogLoaderActive = false;

              Global.showSuccessAlert(true, "success", response.data.message);
              this.close();
              this.get();
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
          // update
          let payload = {
            agri_type_name: this.item.agri_type_name,
            agri_type_id: this.item.agri_type_id,
            agri_type_status: this.item.agri_type_status
          };

          this.isDialogLoaderActive = true;
          ApiService.post(`Update${this.endPoint}`, payload)
            .then((response) => {
              this.isDialogLoaderActive = false;

              Global.showSuccessAlert(true, "success", response.data.message);
              this.close();
              this.get();
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

    // enable disable
    async enableDisableItem(item) {
      const result = await Global.showConfirmationAlert(
        `Change ${this.entity} : ${item.agri_type_name} Status`,
        "Are you sure to change the status",
        "warning"
      );
      if (result.isConfirmed) {
        let payload = {
          agri_type_name: item.agri_type_name,
          agri_type_id: item.agri_type_id,
          agri_type_status: item.agri_type_status == "Active" ? 1 : 0,
        };
        this.isLoaderActive = true;
        ApiService.post(`Update${this.endPoint}`, payload)
          .then((response) => {
            this.isLoaderActive = false;

            Global.showSuccessAlert(true, "success", response.data.message);

            this.get();
          })
          .catch((error) => {
            this.isLoaderActive = false;
            if (error.response.status != 401 || error.response.status != 403) {
              Global.showErrorAlert(true, "error", "Something went wrong");
            }
          });
      } else {
        if (item.agri_type_status == "Inactive") {
          item.agri_type_status = "Active";
        } else {
          item.agri_type_status = "Inactive";
        }
      }
    },

    // delete
    async deleteItem(item) {
      const result = await Global.showConfirmationAlert(
        `Delete  ${this.entity} : ${item.agri_type_name}`,
        "Are you sure to delete",
        "warning"
      );
      if (result.isConfirmed) {
        let payload = {
          agri_type_id: item.agri_type_id,
        };
        this.isLoaderActive = true;
        ApiService.post(`Delete${this.endPoint}`, payload)
          .then((response) => {
            this.isLoaderActive = false;

            Global.showSuccessAlert(true, "success", response.data.message);

            this.get();
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
