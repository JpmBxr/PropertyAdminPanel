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
          width: "20%",
          sortable: true,
          align: "start",
        },
        {
          text: "Email",
          value: "email_address",
          sortable: false,
          width: "20%",
          align: "start",
        },
        {
          text: "Phone",
          value: "phone_1",
          sortable: false,
          width: "15%",
          align: "start",
        },
        {
          text: "Broker License",
          value: "broker_license_number",
          sortable: false,
          width: "15%",
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
      entity: "Broker",

      // search
      searchText: "",

      //excel
      excelFields: {
        broker_name: "broker_name",
        email_address: "email_address",
        phone_1: "phone_1",
        broker_license_number: "broker_license_number",
      },
      excelFileName:
        "Broker" + "_" + moment().format("DD/MM/YYYY") + ".xls",
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
