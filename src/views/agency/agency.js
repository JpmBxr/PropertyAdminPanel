import { Global } from "../../helpers/global";
import { validationMixin } from "../../mixins/validationMixin.js";
import { ApiService } from "../../helpers/apiService";
export const agency = {
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
          text: "Agency Name",
          value: "agency_name",
          width: "20%",
          sortable: true,
          align: "start",
        },
        {
          text: "Owner Name",
          value: "owner_name",
          width: "15%",
          sortable: true,
          align: "start",
        },
        {
          text: "Contact Person",
          value: "contact_person",
          sortable: false,
          width: "20%",
          align: "start",
        },
        {
          text: "Phone",
          value: "phone_1",
          width: "10%",
          sortable: true,
          align: "start",
        },
        {
          text: "Email",
          value: "email_address",
          width: "15%",
          sortable: true,
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
      entity: "Agency",

      // search
      searchText: "",

      //excel
      excelFields: {
        agency_name: "agency_name",
        owner_name: "owner_name",
        contact_person:"contact_person",
        phone_1:"phone_1",
        email_address: "email_address",
        actions:"actions",
        
      },
      excelFileName:
        "Agency" + "_" + moment().format("DD/MM/YYYY") + ".xls",
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
      sortBy = sortBy.length == 0 ? `agency_id` : sortBy[0];
      let payload = {
        sortColumn: sortBy,
        sortOrder: sortDesc,
        itemsPerPage: itemsPerPage,
        searchText: this.searchText,
        page: page,
      };
      this.isLoaderActive = true;
      ApiService.get("getagency", payload)
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
          name: "AddAgency",
          params: { agencyId: 0 },
        });
      } else {
        this.$router.push({
          name: "AddAgency",
          params: { agencyId: item.agency_id },
        });
      }
    },
  },
};
