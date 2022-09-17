import { Global } from "../../../helpers/global";
import { validationMixin } from "../../../mixins/validationMixin.js";
import { ApiService } from "../../../helpers/apiService";
export const townMaster = {
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
          value: "town_name",
          width: "20%",
          sortable: true,
          align: "start",
        },
        {
          text: "Town/City",
          value: "is_town_city",
          sortable: false,
          width: "10%",
          align: "start",
        },
        {
          text: "Province",
          value: "province_name",
          sortable: false,
          width: "10%",
          align: "start",
        },
        {
          text: "Adjacent Town",
          value: "adjacent_town",
          sortable: false,
          width: "30%",
          align: "start",
        },
        {
          text: "Status",
          value: "town_status",
          sortable: false,
          width: "10%",
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
      entity: "Town",
      endPoint: "Town",
      townItems: ["City", "Town"],
      province_id: null,
      adjacent_town_id: [],
      provinceItems: [],
      CityTown: null,
      adjacentTownsItems: [],

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
        // town_id: 1,
        // town_name: "Town-1",
        // town_status: "Active",
        // is_town_city: "Town",
        // adjacent_town: "Town-1,Town-2",
        // created_at: "19-03-2022",
        // province_id: 1,
        // province_name: "Province-1",
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

          this.adjacentTownsItems = response.data.resultData;
        })
        .catch((error) => {
          this.isLoaderActive = false;
          if (error.response.status != 401 && error.response.status != 403) {
            Global.showErrorAlert(true, "error", "Something went wrong");
          }
        });
    },

    // fetch
    get() {
      let { page, itemsPerPage, sortDesc, sortBy } = this.pagination;
      sortDesc = sortDesc.length > 0 && sortDesc[0] ? "desc" : "asc";
      sortBy = sortBy.length == 0 ? "town_name" : sortBy[0];
      let payload = {
        sortColumn: sortBy,
        sortOrder: sortDesc,
        itemsPerPage: itemsPerPage,
        searchText: this.searchText,
        page: page,
      };
      this.isLoaderActive = true;
      ApiService.get("GetTown", payload)
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
      this.getTownWithoutPagination();

      if (item == null && this.isAddEdit == true) {
        this.addEditText = `Add New ${this.entity}`;
        this.addEditDialog = true;
        this.addUpdateButtonText = " Add ";
      } else {
        if (typeof item.adjacent_town_id == "string") {
          item.adjacent_town_id = item.adjacent_town_id
            .split(",")
            .map((item) => parseInt(item, 10));
        }
        this.item = Object.assign({}, item);
        this.addEditText = `Edit ${this.entity} : ` + this.item.town_name;
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
            townName: this.item.town_name,
            isTownCity: this.item.is_town_city,
            provinceId: this.item.province_id,
            adjacentTown:
              this.item.adjacent_town_id != null
                ? this.item.adjacent_town_id.join()
                : null,
            createdBy: Global.loggedInUser,
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
            townId: this.item.town_id,
            townName: this.item.town_name,
            isTownCity: this.item.is_town_city,
            provinceId: this.item.province_id,
            status: this.item.town_status,
            adjacentTown:
              this.item.adjacent_town_id != null
                ? this.item.adjacent_town_id.join()
                : null,
            updatedBy: Global.loggedInUser,
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
        `Change  ${this.entity} : ${item.town_name} Status`,
        "Are you sure to change the status",
        "warning"
      );
      if (result.isConfirmed) {
        let payload = {
          townId: item.town_id,
          townName: item.town_name,
          isTownCity: item.is_town_city,
          provinceId: item.province_id,
          status: item.town_status == "Active" ? "Active" : "Inactive",
          adjacentTown: item.adjacent_town_id,
          updatedBy: Global.loggedInUser,
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
        if (item.town_status == "Inactive") {
          item.town_status = "Active";
        } else {
          item.town_status = "Inactive";
        }
      }
    },

    // delete role
    async deleteItem(item) {
      const result = await Global.showConfirmationAlert(
        `Delete Capability ${item.user_skills}`,
        "Are you sure to delete",
        "warning"
      );
      if (result.isConfirmed) {
        let payload = {
          townId: item.town_id,
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
