import { mapActions, mapGetters } from "vuex";
import { Global } from "../../helpers/global";
import { validationMixin } from "../../mixins/validationMixin.js";
export const assignRolePermission = {
  props: ["userPermissionDataProps"],
  mixins: [validationMixin],
  data() {
    return {
      // Data Table
      tableLoadingDataText: "Loading Data",
      tableHeaders: [
        { text: "#", value: "sno", width: "10%" },
        {
          text: "Module",
          value: "Module",
          width: "90%",
        },
        {
          text: "Name",
          value: "permission_name",
          width: "60%",
        },
        {
          text: "Actions",
          value: "is_permission_assigned",
          width: "20%",
          align: "End",
        },
      ],
      selectedPermissionId: [],
      isPermissionDataProcessing: false,
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

  created() {
    // Call Assigned Unassigned permission
    this.assignPermission();
  },
  methods: {
    ...mapActions([
      "actionGetRoles",
      "actionSaveRole",
      "actionUpdateRole",
      "actionEnableDisableRole",
      "actionDeleteRole",
      "actionSavePermission",
    ]),
    // Set selected permission
    setSelectedPermission(item, $event) {
      if ($event) {
        this.selectedPermissionId.push(item.permission_id);
      } else {
        this.selectedPermissionId.pop(item.permission_id);
      }
    },

    // fetch roles
    assignPermissionRoleWise() {
      let payload = {
        roleId: this.$route.params.roleId,
        permissionId: this.selectedPermissionId,
        endPoint: "webAssignPermissionRoleWise",
      };
      this.actionSavePermission(payload);
    },

    // fetch roles
    assignPermission() {
      console.log("roleid", this.$route.params.roleId);
      let payload = {
        roleId: this.$route.params.roleId,
        endPoint: "getAssignedUnAssignedPermission",
      };
      this.actionGetRoles(payload);
      this.tableItems.map((val) => {
        if (val.is_permission_assigned == 1) {
          this.selectedPermissionId.push(val.permission_id);
        }
      });
      console.log("rrr", this.tableItems);
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
