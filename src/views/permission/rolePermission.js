import { mapActions, mapGetters } from "vuex";
import { Global } from "../../helpers/global";
import { validationMixin } from "../../mixins/validationMixin.js";
export const rolePermission = {
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
          text: "Name",
          value: "name",
          width: "30%",
          sortable: true,
          align: "start",
        },
        {
          text: "Status",
          value: "is_role_active",
          sortable: false,
          width: "20%",
          align: "start",
        },

        {
          text: "Actions",
          value: "actions",
          sortable: false,
          width: "45%",
          align: "end",
        },
      ],

      pagination: {},
      entity: "Role Permission",

      // search
      searchText: "",

      // add edit
      defaultItem: {},
      item: {},
      addEditDialog: false,
      isFormAddEditValid: false,
      isAddEdit: true,
      addUpdateButtonText: "Add Role",
      addEditText: "Add",
      //end

      //excel
      excelFields: {
        ID: "id",
        Name: "name",
      },
      excelFileName:
        "RoleMaster" + "_" + moment().format("DD/MM/YYYY") + ".xls",
      //end
    };
  },

  computed: {
    ...mapGetters(["items"]),
    // For numbering the Data Table Rows
    dataTableRowNumbering() {
      return this.tableItems.map((items, index) => ({
        ...items,
        index: index + 1,
      }));
    },
    isLoaderActive() {
      return this.$store.state.login.isLoaderActive;
    },
    isDialogLoaderActive() {
      return this.$store.state.role.isDialogLoaderActive;
    },
    tableItems() {
      return this.$store.state.role.items;
    },
    totalItemsInDB() {
      return this.$store.state.role.totalItemsInDB;
    },
    tableDataLoading() {
      return this.$store.state.role.isTableDataLoading;
    },
  },
  watch: {
    addEditDialog(value) {
      return value ? true : this.close();
    },
    pagination: {
      handler() {
        this.getRoles();
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions([
      "actionGetRoles",
      "actionSaveRole",
      "actionUpdateRole",
      "actionEnableDisableRole",
      "actionDeleteRole",
    ]),
    // Assign permission
    assignPermission(item) {
      console.log(item);
      this.$router.push({
        name: "AssignRolePermission",
        params: { roleId: item.id },
      });
    },
    // fetch roles
    getRoles() {
      let { page, itemsPerPage, sortDesc, sortBy } = this.pagination;
      sortDesc = sortDesc.length > 0 && sortDesc[0] ? "desc" : "asc";
      sortBy = sortBy.length == 0 ? "name" : sortBy[0];
      let payload = {
        sortColumn: sortBy,
        sortOrder: sortDesc,
        itemsPerPage: itemsPerPage,
        searchText: this.searchText,
        page: page,
        endPoint: "webGetRoles",
      };
      this.actionGetRoles(payload);
    },
    // search
    searchInfo() {
      clearTimeout(this._timerId);
      this._timerId = setTimeout(() => {
        this.getRoles();
      }, 500);
    },

    //show add edit dialog
    showAddEditDialog(item) {
      if (item == null && this.isAddEdit == true) {
        this.addEditText = `Add New ${this.entity}`;
        this.addEditDialog = true;
        this.addUpdateButtonText = " Add ";
      } else {
        this.item = Object.assign({}, item);
        this.addEditText = `Edit ${this.entity} : ` + this.item.name;
        this.addEditDialog = true;
        this.addUpdateButtonText = "Update";
      }
    },

    close() {
      this.addEditDialog = false;
      setTimeout(() => {
        this.item = Object.assign({}, this.defaultItem);
      }, 300);
    },

    // add edit role
    async addEditItem() {
      if (this.$refs.holdingFormAddEdit.validate()) {
        if (this.isAddEdit) {
          // save
          let payload = { roleName: this.item.name };
          await this.actionSaveRole(payload);
          this.close();
          this.getRoles();
        } else {
          // update
          let payload = {
            roleName: this.item.name,
            roleId: this.item.id,
            isRoleActive: this.item.is_role_active,
            endPoint: "webUpdateRole",
          };
          await this.actionUpdateRole(payload);
          this.close();
          this.getRoles();
        }
      }
    },

    // enable disable role
    async enableDisableItem(item) {
      const result = await Global.showConfirmationAlert(
        `Change ${this.entity} : ${item.name} Status`,
        "Are you sure to change the status",
        "warning"
      );
      if (result.isConfirmed) {
        let payload = {
          roleName: item.name,
          roleId: item.id,
          isRoleActive: item.is_role_active == "Active" ? 1 : 0,
          endPoint: "webUpdateRoles",
        };
        await this.actionEnableDisableRole(payload);
        this.getRoles();
      } else {
        if (item.is_role_active == "Inactive") {
          item.is_role_active = "Active";
        } else {
          item.is_role_active = "Inactive";
        }
      }
    },

    // delete role
    async deleteItem(item) {
      const result = await Global.showConfirmationAlert(
        `Delete Role ${item.name}`,
        "Are you sure to delete",
        "warning"
      );
      if (result.isConfirmed) {
        let payload = { roleId: item.id, endPoint: "webDeleteRoles" };
        await this.actionDeleteRole(payload);
        this.getRoles();
      }
    },
  },
};
