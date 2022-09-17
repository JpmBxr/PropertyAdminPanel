import { Global } from "../../../helpers/global";
import { validationMixin } from "../../../mixins/validationMixin.js";
import { ApiService } from "../../../helpers/apiService";
export const userBasedSkill = {
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
          value: "user_skills",
          width: "50%",
          sortable: true,
          align: "start",
        },
      ],
      show: false,
      skillsItems: [],
      userSkills: null,
      pagination: {},
      module: "Reports",
      entity: "User Based Skills",
      endPoint: "UserSkills",

      // search
      searchText: "",
      //excel
      excelFields: {
        ID: "id",
        Name: "name",
      },
      excelFileName:
        "UserSkillsMaster" + "_" + moment().format("DD/MM/YYYY") + ".xls",
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
      sortBy = sortBy.length == 0 ? `user_skills` : sortBy[0];
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
