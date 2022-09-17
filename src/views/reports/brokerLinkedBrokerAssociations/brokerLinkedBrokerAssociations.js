import { Global } from "../../../helpers/global";
import { validationMixin } from "../../../mixins/validationMixin.js";
import { ApiService } from "../../../helpers/apiService";
export const brokerLinkedBrokerAssociations = {
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
                    text: "License_Number",
                    value: "broker_license_number",
                    width: "20%",
                    sortable: true,
                    align: "start",
                },
                {
                    text: "Associations",
                    value: "associations",
                    width: "15%",
                    sortable: true,
                    align: "start",
                }, 
                {
                    text: "Primary Phone",
                    value: "phone_1",
                    width: "15%",
                    sortable: true,
                    align: "start",
                }, 
                {
                    text: "Secondary Person",
                    value: "phone_2",
                    width: "20%",
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
            ],
            show: false,
            skillsItems: [],
            userSkills: null,
            pagination: {},
            module: "Reports",
            entity: "Broker Linked Broker Associations",
            

            // search
            searchText: "",

            //excel
            excelFields: {
                broker_name: "broker_name",
                broker_license_number: "broker_license_number",
                associations: "associations",
                primary_phone: "phone_1",
                secondary_phone: "phone_2",
                email_address: "email_address",    
            },
            excelFileName:
                "BrokerLinkedBrokerAssociations" + "_" + moment().format("DD/MM/YYYY") + ".xls",
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
        // fetch GetUserToActivated
        get() {
            let { page, itemsPerPage, sortDesc, sortBy } = this.pagination;
            sortDesc = sortDesc.length > 0 && sortDesc[0] ? "desc" : "asc";
            sortBy = sortBy.length == 0 ? `broker_name` : sortBy[0];
            let payload = {
                sortColumn: sortBy,
                sortOrder: sortDesc,
                itemsPerPage: itemsPerPage,
                searchText: this.searchText,
                page: page,
            };
            this.isLoaderActive = true;
            ApiService.get("getBrokerLinkedAssociationReport", payload)
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
