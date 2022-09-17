import { Global } from "../../../helpers/global";
import { validationMixin } from "../../../mixins/validationMixin.js";
import { ApiService } from "../../../helpers/apiService";
export const capabilityMaster = {
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
          value: "capability_name",
          width: "50%",
          sortable: true,
          align: "start",
        },
        {
          text: "Status",
          value: "capability_status",
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
      entity: "Capability",
      endPoint: "Capability",

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

      //excel
      excelFields: {
        ID: "capability_id",
        Name: "capability_name",
      },
      excelFileName:
        "CapabilityMaster" + "_" + moment().format("DD/MM/YYYY") + ".xls",
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
        sortBy = sortBy.length == 0 ? `${this.endPoint}_name` : sortBy[0];
        let payload = {
          sortColumn: sortBy,
          sortOrder: sortDesc,
          itemsPerPage: itemsPerPage,
          searchText: this.searchText,
          page: page,
        };
        this.isLoaderActive = true;
        ApiService.get("GetCapability", payload)
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
          this.addEditText = `Edit ${this.entity} : ` + this.item.capability_name;
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
              Name: this.item.capability_name,
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
              Name: this.item.capability_name,
              Id: this.item.capability_id,
              isActive: this.item.capability_status,
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
          `Change  ${this.entity} : ${item.capability_name} Status`,
          "Are you sure to change the status",
          "warning"
        );
        if (result.isConfirmed) {
          let payload = {
            Name: item.capability_name,
            Id: item.capability_id,
            isActive: item.capability_status == "Active" ? "Active" : "InActive",
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
          if (item.capability_status == "Inactive") {
            item.capability_status = "Active";
          } else {
            item.capability_status = "Inactive";
          }
        }
      },

      // delete
      async deleteItem(item) {
        const result = await Global.showConfirmationAlert(
          `Delete Capability ${item.capability_name}`,
          "Are you sure to delete",
          "warning"
        );
        if (result.isConfirmed) {
          let payload = {
            Id: item.capability_id,

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
