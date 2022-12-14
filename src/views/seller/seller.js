import { Global } from "../../helpers/global";
import { validationMixin } from "../../mixins/validationMixin.js";
import { ApiService } from "../../helpers/apiService";
export const seller = {
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
          value: "seller_name",
          width: "15%",
          sortable: true,
          align: "start",
          class: "active"
        },
        {
          text: "Owner Name",
          value: "property_owner_name",
          sortable: true,
          width: "15%",
          align: "start",
          class: "active"
        },
        {
          text: "Agency Associated With",
          value: "agency_name",
          sortable: true,
          width: "15%",
          align: "start",
          class: "active"
        },
        {
            text: "Phone",
            value: "phone_1",
            sortable: true,
            width: "15%",
            align: "start",
            class: "active"
          },
        {
          text: "Email",
          value: "email_address",
          sortable: true,
          width: "20%",
          align: "start",
          class: "active"
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
      entity: "Seller",

      // search
      searchText: "",

      // add edit
      defaultItem: {},
      item: {},
      addEditDialog: false,
      isFormAddEditValid: false,
      isAddEdit: true,
      addUpdateButtonText: "Add Seller",
      addEditText: "Add",
      //end

      //excel
      excelFields: {
        Seller_name: "seller_name",
        Property_owner_name: "property_owner_name",
        Phone: "phone_1",
        Email: "email_address",
      },
      excelFileName:
        "Seller" + "_" + moment().format("DD/MM/YYYY") + ".xls",
      //end
    };
  },

  created() {
    this.$laravel.setPermissions(this.userPermissionDataProps);
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
      sortBy = sortBy.length == 0 ? "seller_name" : sortBy[0];
      let payload = {
        sortColumn: sortBy,
        sortOrder: sortDesc,
        itemsPerPage: itemsPerPage,
        searchText: this.searchText,
        page: page,
        user_id: secureLS.get(Global.userId),
      };
      this.isLoaderActive = true;
      ApiService.get("GetSeller", payload)
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
     showAddEditPage(item) {
      if (item == null && this.isAddEdit == true) {
        this.$router.push({
          name: "AddSeller",
          params: { sellerId: 0 },
        });
      } else {
        this.$router.push({
          name: "AddSeller",
          params: { sellerId: item.seller_id },
        });
      }
    },

    async deleteItem(item) {
      console.log(item);
      const result = await Global.showConfirmationAlert(
        `${this.entity} : ${item.seller_name} `,
        "Are you sure to Delete the Seller",
        "warning"
      );
      if (result.isConfirmed) {
        let payload = {
          seller_id: item.seller_id,
       
        };

        this.isLoaderActive = true;
        ApiService.post(`deleteSeller`, payload)
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
