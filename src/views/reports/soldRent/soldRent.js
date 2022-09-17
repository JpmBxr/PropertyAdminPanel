import { Global } from "@/helpers/global";
import { validationMixin } from "../../../mixins/validationMixin.js";
import { ApiService } from "@/helpers/apiService";
export const soldRent = {
  props: ["userPermissionDataProps"],
  mixins: [validationMixin],
  data() {
    return {
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
          text: "Seller Name",
          value: "seller_name",
          width: "20%",
          sortable: true,
          align: "start",
        },
        {
          text: "Date",
          value: "date_sold",
          sortable: true,
          width: "20%",
          align: "start",
        },
        {
          text: "Street Name",
          value: "street_name",
          sortable: false,
          width: "20%",
          align: "start",
        },
        {
          text: "Building Name",
          value: "property_building_name",
          sortable: false,
          width: "20%",
          align: "start",
        },
        {
            text: "Broker Associated",
            value: "broker_associated",
            sortable: false,
            width: "20%",
            align: "start",
          },
        {
          text: "Status",
          value: "status",
          sortable: false,
          width: "15%",
          align: "end",
        },
        
      ],
      tableItems: [],
      totalItemsInDB: 0,
      tableDataLoading: false,
    
      show: true,
      isLoaderActive: false,
      pagination: {},
      module: "Reports",
      entity: "Sold Rent",

      date_sold_from_date: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      menu_date_sold_from_date: false,

      date_sold_to_date: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      menu2_date_sold_to_date: false,
      
      // search
      searchText: "",

      //excel
      excelFields: {
        seller_name: "seller_name",
        date_sold: "date_sold",
        street_name: "street_name",
        property_building_name: "property_building_name",
        Status: "status",
      },
      excelFileName: "SoldRent" + moment().format("DD/MM/YYYY") + ".xls",
      //end
    };
  },
  //#region created
  created() {
    // To get Details in List
    this.getDetails();
  },
  //#endregion

  //#region computed
  computed: {
    // For numbering the Data Table Rows
    dataTableRowNumbering() {
      return this.tableItems.map((items, index) => ({
        ...items,
        index: index + 1,
      }));
    },
  },
  //#endregion

  //#region watch
  watch: {
    pagination: {
      handler() {
        this.getDetails();
      },
      deep: true,
    },
  },
  //#endregion  
  //#region methods
  methods: {
    //#region To get the Details list
    getDetails() {
      this.isLoaderActive = true;
      let { page, itemsPerPage, sortDesc, sortBy } = this.pagination;
      sortDesc = sortDesc.length > 0 && sortDesc[0] ? "desc" : "asc";
      sortBy =
        sortBy.length == 0
          ? `date_sold`
          : sortBy[0];
      ApiService.get("getSoldRentReport", {
        date_sold_from_date: this.date_sold_from_date,
        date_sold_to_date: this.date_sold_to_date,
       
        itemsPerPage: itemsPerPage,
        sortColumn: sortBy,
        sortOrder: sortDesc,
        page: page,
        searchText: this.searchText,
      })
        .then((response) => {
          this.isLoaderActive = false;
          this.tableItems = response.data.resultData.data;
          this.totalItemsInDB = response.data.resultData.total;
        })
        .catch((error) => {
          this.isLoaderActive = false;
          if (error.response.status != 401 || error.response.status != 403) {
            Global.showErrorAlert(true, "error", "Something went wrong");
          }
        });
    },
    //#endregion

    //#region searchInfo
    searchInfo() {
      clearTimeout(this._timerId);
      this._timerId = setTimeout(() => {
        this.getDetails();
      }, 500);
    },
    //#endregion
  },
  //#endregion
};
