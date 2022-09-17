import { Global } from "../../../helpers/global";
import { validationMixin } from "../../../mixins/validationMixin.js";
import { ApiService } from "../../../helpers/apiService";
export const subdivisionMaster = {
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
          value: "subdivision_name",
          width: "20%",
          sortable: true,
          align: "start",
        },
        {
          text: "Barangay",
          value: "barangay_name",
          sortable: false,
          width: "15%",
          align: "start",
        },
        {
          text: "Town",
          value: "town_name",
          sortable: false,
          width: "15%",
          align: "start",
        },
        {
          text: "Province",
          value: "province_name",
          sortable: false,
          width: "15%",
          align: "start",
        },
        {
          text: "Zip",
          value: "zip_code",
          sortable: false,
          width: "10%",
          align: "start",
        },
        {
          text: "Status",
          value: "subdivision_status",
          sortable: false,
          width: "5%",
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

      pagination: {},
      entity: "Subdivisions",
      endPoint: "Subdivision",
      townItems: [],
      provinceItems: [],
      barangayItems: [],

      adjacentSubdivisionsItems: [],

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
  created() {
    this.getProvinceWithoutPagination();
    this.getTownWithoutPagination();
    this.getBarangayWithoutPagination();
    this.getSubdivisionWithoutPagination();
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
console.log(response.data.resultData);
          this.barangayItems = response.data.resultData;
        })
        .catch((error) => {
          this.isLoaderActive = false;
          if (error.response.status != 401 && error.response.status != 403) {
            Global.showErrorAlert(true, "error", "Something went wrong");
          }
        });
    },

    getSubdivisionWithoutPagination() {
      this.isLoaderActive = true;
      ApiService.get("GetSubdivisionWithoutPagination", {})
        .then((response) => {
          this.isLoaderActive = false;

          this.adjacentSubdivisionsItems = response.data.resultData;
        })
        .catch((error) => {
          this.isLoaderActive = false;
          if (error.response.status != 401 && error.response.status != 403) {
            Global.showErrorAlert(true, "error", "Something went wrong");
          }
        });
    },


    // fetch roles
    get() {
      let { page, itemsPerPage, sortDesc, sortBy } = this.pagination;
      sortDesc = sortDesc.length > 0 && sortDesc[0] ? "desc" : "asc";
      sortBy = sortBy.length == 0 ? "subdivision_name" : sortBy[0];
      let payload = {
        sortColumn: sortBy,
        sortOrder: sortDesc,
        itemsPerPage: itemsPerPage,
        searchText: this.searchText,
        page: page,
      };
      this.isLoaderActive = true;
      ApiService.get("GetSubdivision", payload)
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
      this.getSubdivisionWithoutPagination();
      if (item == null && this.isAddEdit == true) {
        this.addEditText = `Add New ${this.entity}`;
        this.addEditDialog = true;
        this.addUpdateButtonText = " Add ";
      } else {
        console.log(item);
        if (typeof item.adjacent_subdivision_id == "string") {
          item.adjacent_subdivision_id = item.adjacent_subdivision_id
            .split(",")
            .map((item) => parseInt(item, 10));
        }
        this.item = Object.assign({}, item);
        this.addEditText = `Edit ${this.entity} : ` + item.subdivision_name;
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
      if (this.$refs.holdingFormAddEdit.validate()) {
        if (this.isAddEdit) {
          // save
          let payload = {
            subdivision_name: this.item.subdivision_name,
            barangay_id: this.item.barangay_id,
            town_id: this.item.town_id,
            province_id: this.item.province_id,
            zip_code: this.item.zip_code,
            adjacent_subdivision: this.item.adjacent_subdivision_id.join(),
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
            subdivision_id: this.item.subdivision_id,
            subdivision_name: this.item.subdivision_name,
            barangay_id: this.item.barangay_id,
            town_id: this.item.town_id,
            province_id: this.item.province_id,
            zip_code: this.item.zip_code,
            adjacent_subdivision: this.item.adjacent_subdivision_id.join(),
            subdivision_status: "Active",
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
        `Change  ${this.entity} : ${item.subdivision_name} Status`,
        "Are you sure to change the status",
        "warning"
      );
      if (result.isConfirmed) {
        let payload = {
          subdivision_id: item.subdivision_id,
          subdivision_name: item.subdivision_name,
          barangay_id: item.barangay_id,
          town_id: item.town_id,
          province_id: item.province_id,
          zip_code: item.zip_code,
          adjacent_subdivision: item.adjacent_subdivision_id,
          subdivision_status:
            item.subdivision_status == "Active" ? "Active" : "Inactive",
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
        if (item.subdivision_status == "Inactive") {
          item.subdivision_status = "Active";
        } else {
          item.subdivision_status = "Inactive";
        }
      }
    },

    // delete role
    async deleteItem(item) {
      const result = await Global.showConfirmationAlert(
        `Delete ${this.entity} :  ${item.subdivision_name}`,
        "Are you sure to delete",
        "warning"
      );
      if (result.isConfirmed) {
        let payload = {
          subdivision_id: item.subdivision_id,
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
