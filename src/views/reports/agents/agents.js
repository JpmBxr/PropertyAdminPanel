import { Global } from "../../../helpers/global";
import { validationMixin } from "../../../mixins/validationMixin.js";
import { ApiService } from "../../../helpers/apiService";
export const agents = {
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
                    value: "full_name",
                    width: "20%",
                    sortable: true,
                    align: "start",
                },
                // {
                //     text: "Property Name",
                //     value: "property_name",
                //     width: "20%",
                //     sortable: true,
                //     align: "start",
                // },
                {
                    text: "Phone",
                    value: "primary_phone",
                    width: "15%",
                    sortable: true,
                    align: "start",
                },
                {
                    text: "Email",
                    value: "user_email",
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
            entity: "Agents",
            endPoint: "UserAgents",

            // search
            searchText: "",
            //excel
            excelFields: {
                Name: "full_name",
               
                Primary_phone: "primary_phone",
                user_email: "user_email",

            },
            excelFileName:
                "Agents" + "_" + moment().format("DD/MM/YYYY") + ".xls",
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
        // fetch skills
        get() {
            let { page, itemsPerPage, sortDesc, sortBy } = this.pagination;
            sortDesc = sortDesc.length > 0 && sortDesc[0] ? "desc" : "asc";
            sortBy = sortBy.length == 0 ? `user_id` : sortBy[0];
            let payload = {
                sortColumn: sortBy,
                sortOrder: sortDesc,
                itemsPerPage: itemsPerPage,
                searchText: this.searchText,
                page: page,
            };
            this.isLoaderActive = true;
            ApiService.get(`Get${this.endPoint}`, payload)
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
