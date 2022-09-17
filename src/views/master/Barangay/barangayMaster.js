import { Global } from "../../../helpers/global";
import { validationMixin } from "../../../mixins/validationMixin.js";
import { ApiService } from "../../../helpers/apiService";
export const barangayMaster = {
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
          value: "barangay_name",
          width: "20%",
          sortable: true,
          align: "start",
        },
        {
          text: "Town",
          value: "town_name",
          width: "10%",
          sortable: true,
          align: "start",
        },
        {
          text: "Province",
          value: "province_name",
          width: "10%",
          sortable: true,
          align: "start",
        },

        {
          text: "Zip",
          value: "zip_code",
          sortable: false,
          width: "5%",
          align: "start",
        },
        {
          text: "Adjacent Barangay",
          value: "adjacent_barangay",
          sortable: false,
          width: "15%",
          align: "start",
        },
        {
          text: "Status",
          value: "barangay_status",
          sortable: false,
          width: "5%",
          align: "start",
        },

        {
          text: "Actions",
          value: "actions",
          sortable: false,
          width: "10%",
          align: "end",
        },
      ],

      pagination: {},
      entity: "Barangay",
      endPoint: "Barangay",
      townItems: [],
      provinceItems: [],
      adjacentBarangaysItems: [],

      // search
      searchText: "",

      // add edit
      defaultItem: {},
      item: {},
      addEditDialog: false,
      isFormAddEditValid: false,
      isAddEdit: true,
      addUpdateButtonText: "Add " + this.entity,
      addEditText: "Add",
      //end

      //excel
      excelFields: {
        ID: "id",
        Name: "name",
      },
      excelFileName: "TownMaster_" + moment().format("DD/MM/YYYY") + ".xls",
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
   created() {
    this.getProvinceWithoutPagination();
    this.getTownWithoutPagination();
    this.getBarangayWithoutPagination();
  },
  methods: {
    // fetch roles

    getProvinceWithoutPagination() {
      this.isLoaderActive = true;
      ApiService.get("GetProvinceWithoutPagination", {})
        .then((response) => {
          this.isLoaderActive = false;

          this.provinceItems = response.data.resultData;
        })
        .catch((error) => {
          this.isLoaderActive = false;
          if (error.response.status != 401 && error.response.status != 403) {
            Global.showErrorAlert(true, "error", "Something went wrong");
          }
        });
    },
    getTownWithoutPagination() {
      this.isLoaderActive = true;
      ApiService.get("GetTownWithoutPagination", {})
        .then((response) => {
          this.isLoaderActive = false;

          this.townItems = response.data.resultData;
        })
        .catch((error) => {
          this.isLoaderActive = false;
          if (error.response.status != 401 && error.response.status != 403) {
            Global.showErrorAlert(true, "error", "Something went wrong");
          }
        });
    },
    getBarangayWithoutPagination() {
      this.isLoaderActive = true;
      ApiService.get("GetBarangayWithoutPagination", {})
        .then((response) => {
          this.isLoaderActive = false;

          this.adjacentBarangaysItems = response.data.resultData;
        })
        .catch((error) => {
          this.isLoaderActive = false;
          if (error.response.status != 401 && error.response.status != 403) {
            Global.showErrorAlert(true, "error", "Something went wrong");
          }
        });
    },

    get() {
      let { page, itemsPerPage, sortDesc, sortBy } = this.pagination;
      sortDesc = sortDesc.length > 0 && sortDesc[0] ? "desc" : "asc";
      sortBy = sortBy.length == 0 ? "barangay_name" : sortBy[0];
      let payload = {
        sortColumn: sortBy,
        sortOrder: sortDesc,
        itemsPerPage: itemsPerPage,
        searchText: this.searchText,
        page: page,
      };
      this.isLoaderActive = true;
      ApiService.get("GetBarangay", payload)
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

    console.log(item);
      this.getBarangayWithoutPagination();
      if (item == null && this.isAddEdit == true) {
        this.addEditText = `Add New ${this.entity}`;
        this.addEditDialog = true;
        this.addUpdateButtonText = " Add ";
      } else {
        if (typeof item.adjacent_barangay_id == "string") {
          item.adjacent_barangay_id = item.adjacent_barangay_id
            .split(",")
            .map((item) => parseInt(item, 10));
        }
        this.item = Object.assign({}, item);
        this.addEditText = `Edit ${this.entity} : ` + item.barangay_name;
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

    // add edit role
    addEditItem() {
      console.log(this.item.adjacent_barangay_id);
      if (this.$refs.holdingFormAddEdit.validate()) {
        if (this.isAddEdit) {
          // save
          let payload = {
            barangay_name: this.item.barangay_name,
            town_id: this.item.town_id,
            province_id: this.item.province_id,
            zip_code: this.item.zip_code,
            adjacent_barangay_id:
              this.item.adjacent_barangay_id != null
                ? this.item.adjacent_barangay_id.join()
                : null,
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
            barangay_id: this.item.barangay_id,
            barangay_name: this.item.barangay_name,
            town_id: this.item.town_id,
            province_id: this.item.province_id,
            zip_code: this.item.zip_code,
            adjacent_barangay_id:
              this.item.adjacent_barangay_id != null
                ? this.item.adjacent_barangay_id.join()
                : null,
            updated_by: Global.loggedInUser,
            barangay_status:
              this.item.barangay_status == "Active" ? "Active" : "Inactive",
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
        `Change  ${this.entity} : ${item.barangay_name} Status`,
        "Are you sure to change the status",
        "warning"
      );
      if (result.isConfirmed) {
        let payload = {
          barangay_id: item.barangay_id,
          barangay_name: item.barangay_name,
          town_id: item.town_id,
          province_id: item.province_id,
          zip_code: item.zip_code,
          adjacent_barangay_id: item.adjacent_barangay_id,
          barangay_status:
            item.barangay_status == "Active" ? "Active" : "Inactive",
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
        if (item.is_role_active == "Inactive") {
          item.is_role_active = "Active";
        } else {
          item.is_role_active = "Inactive";
        }
      }
    },

    // delete role
    async deleteItem(item) {
      const result = await Global.showConfirmationAlert(
        `Delete ${this.entity} :  ${item.barangay_name}`,
        "Are you sure to delete",
        "warning"
      );
      if (result.isConfirmed) {
        let payload = {
          barangay_id: item.barangay_id,
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
