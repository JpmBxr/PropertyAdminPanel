import { Global } from "../../helpers/global";
import { validationMixin } from "../../mixins/validationMixin.js";
import { ApiService } from "../../helpers/apiService";
export const broker = {
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
          value: "broker_name",
          width: "15%",
          sortable: true,
          align: "start",
          class:"active"
        },
        {
          text: "Email",
          value: "email_address",
          sortable: true,
          width: "15%",
          align: "start",
          class:"active"
        },
        {
          text: "Phone",
          value: "phone_1",
          sortable: true,
          width: "15%",
          align: "start",
          class:"active"
        },
        {
          text: "Broker License",
          value: "broker_license_number",
          sortable: false,
          width: "15%",
          align: "start",
          
        },
        {
          text: "Status",
          value: "status",
          sortable: false,
          width: "10%",
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
      entity: "Broker",

      // search
      searchText: "",

      //excel
      excelFields: {
        Broker_name: "broker_name",
        Email_address: "email_address",
        Phone_1: "phone_1",
        Broker_license_number: "broker_license_number",
        Status: "status",
      },
      excelFileName:
        "Broker" + "_" + moment().format("DD/MM/YYYY") + ".xls",
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
        this.getBroker();
      },
      deep: true,
    },
  },
  methods: {
   // fetch roles
   getBroker() {
      let { page, itemsPerPage, sortDesc, sortBy } = this.pagination;
      sortDesc = sortDesc.length > 0 && sortDesc[0] ? "desc" : "asc";
      sortBy = sortBy.length == 0 ? "broker_name" : sortBy[0];
      let payload = {
        sortColumn: sortBy,
        sortOrder: sortDesc,
        itemsPerPage: itemsPerPage,
        searchText: this.searchText,
        page: page,
      };
      this.isLoaderActive = true;
      ApiService.get("getbroker", payload)
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

    // Change Status Color
      setStatusColor(is_active) {
         return Global.getStatusColor(is_active);
       },

    // search
    searchInfo() {
      clearTimeout(this._timerId);
      this._timerId = setTimeout(() => {
        this.getBroker();
      }, 500);
    },

     //show add edit dialog
     showAddEditPage(item) {
      if (item == null && this.isAddEdit == true) {
        this.$router.push({
          name: "AddBroker",
          params: { brokerId: 0 },
        });
      } else {
        this.$router.push({
          name: "AddBroker",
          params: { brokerId: item.broker_id },
        });
      }
    },
  },
};
