import { Global } from "../../../helpers/global";
import { validationMixin } from "../../../mixins/validationMixin.js";
import { ApiService } from "../../../helpers/apiService";
export const userList = {
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
                    text: "Full Name",
                    value: "full_name",
                    width: "20%",
                    sortable: true,
                    align: "start",
                },
                {
                    text: "Role Name",
                    value: "role_name",
                    width: "20%",
                    sortable: true,
                    align: "start",
                },
                {
                    text: "Primary Phone",
                    value: "primary_phone",
                    width: "15%",
                    sortable: true,
                    align: "start",
                }, 
                {
                    text: "Secondary Person",
                    value: "secondary_phone",
                    width: "20%",
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
            entity: "User List",
            endPoint: "UserReport",

            // search
            searchText: "",

            //excel
            excelFields: {
                full_name: "full_name",
                role_name: "role_name",
                primary_phone: "primary_phone",
                secondary_phone: "secondary_phone",
                user_email: "user_email",    
            },
            excelFileName:
                "UserList" + "_" + moment().format("DD/MM/YYYY") + ".xls",
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
