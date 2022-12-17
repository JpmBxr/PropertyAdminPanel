import { Global } from "../../../helpers/global";
import { validationMixin } from "../../../mixins/validationMixin.js";
import { ApiService } from "../../../helpers/apiService";
export const brokerAssociation = {
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
          value: "broker_association_name",
          width: "20%",
          sortable: true,
          align: "start",
          class:"active"
        },
        {
          text: "Contact Person",
          value: "contact_person",
          sortable: true,
          width: "20%",
          align: "start",
          class:"active"
        },
        {
          text: "Email",
          value: "email_address",
          sortable: true,
          width: "20%",
          align: "start",
          class:"active"
        },
        {
          text: "Phone",
          value: "phone_1",
          sortable: true,
          width: "20%",
          align: "start",
          class:"active"
        },
        {
          text: "Status",
          value: "broker_association_status",
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
      entity: "Broker Association",

      // search
      searchText: "",

      // add edit
      defaultItem: {},
      item: {},
      addEditDialog: false,
      isFormAddEditValid: false,
      isAddEdit: true,
      addUpdateButtonText: "Add Broker Association",
      addEditText: "Add",
      //end

      //excel
      excelFields: {
        Name: "broker_association_name",
        Contact_person: "contact_person",
        Email_address: "email_address",
        Phone: "phone_1",
        Status: "broker_association_status",
      },
      excelFileName:
        "BrokerAssociation" + "_" + moment().format("DD/MM/YYYY") + ".xls",
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
      sortBy = sortBy.length == 0 ? "broker_association_name" : sortBy[0];
      let payload = {
        sortColumn: sortBy,
        sortOrder: sortDesc,
        itemsPerPage: itemsPerPage,
        searchText: this.searchText,
        page: page,
      };
      this.isLoaderActive = true;
      ApiService.get("getbrokerassociation", payload)
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
        this.get();
      }, 500);
    },

     //show add edit dialog
     showAddEditPage(item) {
      if (item == null && this.isAddEdit == true) {
        this.$router.push({
          name: "AddBrokerAssociation",
          params: { brokerAssociationId: 0 },
        });
      } else {
        this.$router.push({
          name: "AddBrokerAssociation",
          params: { brokerAssociationId: item.broker_association_id },
        });
      }
    },
  },
};
