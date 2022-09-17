import { Global } from "../../../helpers/global";
import { validationMixin } from "../../../mixins/validationMixin.js";
import { ApiService } from "../../../helpers/apiService";
export const specializationMaster = {
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
          value: "specialization",
          width: "50%",
          sortable: true,
          align: "start",
        },
        {
          text: "Status",
          value: "specialization_status",
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
      entity: "Specialization",
      endPoint: "Specialization",

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
        "SpecializationMaster" + "_" + moment().format("DD/MM/YYYY") + ".xls",
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
    // fetch roles
    get() {
      let { page, itemsPerPage, sortDesc, sortBy } = this.pagination;
      sortDesc = sortDesc.length > 0 && sortDesc[0] ? "desc" : "asc";
      sortBy = sortBy.length == 0 ? `specialization` : sortBy[0];
      let payload = {
        sortColumn: sortBy,
        sortOrder: sortDesc,
        itemsPerPage: itemsPerPage,
        searchText: this.searchText,
        page: page,
      };
      this.isLoaderActive = true;
      ApiService.get(`Get${this.endPoint}`, payload)
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
    async addEditItem() {
      if (this.$refs.holdingFormAddEdit.validate()) {
        if (this.isAddEdit) {
          // save
          let payload = {
            Name: this.item.specialization,
            created_by: Global.loggedInUser,
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
            Name: this.item.specialization,
            Id: this.item.specialization_id,
            isActive: this.item.specialization_status,
            updated_by: Global.loggedInUser,
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
        `Change  ${this.entity} : ${item.name} Status`,
        "Are you sure to change the status",
        "warning"
      );
      if (result.isConfirmed) {
        let payload = {
          Name: item.specialization,
          Id: item.specialization_id,
          isActive:
            item.specialization_status == "Active" ? "Active" : "InActive",
          updated_by: Global.loggedInUser,
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
        if (item.specialization_status == "Inactive") {
          item.specialization_status = "Active";
        } else {
          item.specialization_status = "Inactive";
        }
      }
    },

    // delete
    async deleteItem(item) {
      const result = await Global.showConfirmationAlert(
        `Delete Specialization ${item.specialization}`,
        "Are you sure to delete",
        "warning"
      );
      if (result.isConfirmed) {
        let payload = {
          Id: item.specialization_id,
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
