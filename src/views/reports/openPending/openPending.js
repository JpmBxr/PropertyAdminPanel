import { Global } from "../../../helpers/global";
import { validationMixin } from "../../../mixins/validationMixin.js";
import { ApiService } from "../../../helpers/apiService";
export const openPending = {
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
                    text: "Seller Name",
                    value: "seller_name",
                    width: "20%",
                    sortable: true,
                    align: "start",
                },
                {
                    text: "Agent Name",
                    value: "agent_name",
                    width: "15%",
                    sortable: false,
                    align: "start",
                },
                {
                    text: "Broker Associated",
                    value: "broker_associated",
                    width: "15%",
                    sortable: false,
                    align: "start",
                }, 
                {
                    text: "Property Name",
                    value: "property_name",
                    width: "15%",
                    sortable: false,
                    align: "start",
                },
                {
                    text: "months",
                    value: "months",
                    width: "15%",
                    sortable: false,
                    align: "start",
                },
                {
                    text: "Pending Month",
                    value: "pending",
                    width: "15%",
                    sortable: false,
                    align: "start",
                },
                {
                    text: "Status",
                    value: "status",
                    width: "15%",
                    sortable: false,
                    align: "end",
                },
                
            ],
            show: false,
            skillsItems: [],
            userSkills: null,
            pagination: {},
            module: "Reports",
            entity: "List of Open/Pending Properties",
            

            // search
            searchText: "",

            //excel
            excelFields: {
                seller_name: "seller_name",
                agent_name: "agent_name",
                broker_associated: "broker_associated",
                property_name: "property_name",
                months:"months",
                pending:"pending",
                status: "status",   
            },
            excelFileName:
                "ListofOpen/PendingProperties" + "_" + moment().format("DD/MM/YYYY") + ".xls",
            //end
        };
    },
    created() {
        this.isItemLoading = true;
        this.isItemLoading = false;
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
        // fetch GetAgencies
        get() {
            let { page, itemsPerPage, sortDesc, sortBy } = this.pagination;
            sortDesc = sortDesc.length > 0 && sortDesc[0] ? "desc" : "asc";
            sortBy = sortBy.length == 0 ? `broker_association_id` : sortBy[0];
            let payload = {
                sortColumn: sortBy,
                sortOrder: sortDesc,
                itemsPerPage: itemsPerPage,
                searchText: this.searchText,
                page: page,
            };
            this.isLoaderActive = true;
            ApiService.get("getOpenPendingPropertyReport", payload)
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
    },
};
