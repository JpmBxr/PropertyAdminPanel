import { Global } from "@/helpers/global";
import { validationMixin } from "../../../mixins/validationMixin.js";
import { ApiService } from "@/helpers/apiService";
export const userCountProperty = {
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
                    text: "User Type",
                    value: "user_type",
                    width: "20%",
                    sortable: true,
                    align: "start",
                },
                {
                    text: "Full Name",
                    value: "full_name",
                    sortable: true,
                    width: "20%",
                    align: "start",
                },
                {
                    text: "Status",
                    value: "status",
                    sortable: false,
                    width: "15%",
                    align: "start",
                },
                {
                    text: "Total Properties",
                    value: "totalProperties",
                    sortable: false,
                    width: "20%",
                    align: "end",
                },

            ],
            tableItems: [],
            item:{},
            isLoaderActive: false,
            isItemLoading: false,
            userTypeItems: [],
            totalItemsInDB: 0,
            tableDataLoading: false,

            show: true,
            isLoaderActive: false,
            pagination: {},
            module: "Reports",
            entity: "User Count Property",


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

    //#region mounted
    mounted() {
        this.getUserTypeItemWithoutPagination();
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
            ApiService.get("getCountOfPropertiesReport", {
                user_id: secureLS.get(Global.userId),
                user_type: this.item.role_id,
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

        //#region getUserTypeItemWithoutPagination
        getUserTypeItemWithoutPagination() {
            this.isLoaderActive = true;
            ApiService.get("webGetRolesWithoutPagination", {})
              .then((response) => {
                this.isLoaderActive = false;
                this.userTypeItems = response.data.resultData;
              })
              .catch((error) => {
                this.isLoaderActive = false;
                if (error.response.status != 401 && error.response.status != 403) {
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
