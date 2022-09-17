import { mapActions, mapGetters } from "vuex";
import { Global } from "../../helpers/global";
import { validationMixin } from "../../mixins/validationMixin.js";
import { TimeAgo } from "vue2-timeago";
import "vue2-timeago/dist/vue2-timeago.css";
export const notificationList = {
  props: ["userPermissionDataProps"],
  mixins: [validationMixin],
  components: {
    TimeAgo,
  },
  data() {
    return {
      // Data Table
      tableLoadingDataText: "Loading data",
      tableHeader: [
        {
          text: "Type",
          value: "notification_type_icon",
          width: "10%",
          sortable: false,
          align: "start",
        },
        {
          text: "Notification",
          value: "notification_type",
          width: "75%",
          sortable: false,
          align: "start",
        },

        {
          text: "Created",
          value: "created_at",
          sortable: false,
          width: "10%",
          align: "start",
        },

        {
          text: "Actions",
          value: "actions",
          sortable: false,
          width: "5%",
          align: "end",
        },
      ],

      pagination: {},
      entity: "Notification",
      endPoint: "Notification",
      // search
      searchText: "",

      // add edit
      defaultItem: {},
      item: {},
      addEditDialog: false,
      isFormAddEditValid: false,
      isAddEdit: true,
      addUpdateButtonText: "Add ",
      addEditText: "Add",
      //end

      //excel
      excelFields: {
        ID: "notification_id",
        Type: "notification_type",
        Subject: "notification_subject",
        Status: "notification_status",
        Date: "created_at",
      },
      excelFileName:
        "notificationList" + "_" + moment().format("DD/MM/YYYY") + ".xls",
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
        this.get();
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions([
      "actionGet",
      "actionSave",
      "actionUpdate",
      "actionEnableDisable",
      "actionDelete",
    ]),

    // fetch
    get() {
      let { page, itemsPerPage, sortDesc, sortBy } = this.pagination;
      sortDesc = sortDesc.length > 0 && sortDesc[0] ? "asc" : "desc";
      sortBy = sortBy.length == 0 ? "created_at" : sortBy[0];
      let payload = {
        sortColumn: sortBy,
        sortOrder: sortDesc,
        itemsPerPage: itemsPerPage,
        searchText: this.searchText,
        page: page,
        user_id: secureLS.get(Global.userId),
        endPoint: "getNotification",
      };
      this.actionGet(payload);
    },
    // search
    searchInfo() {
      clearTimeout(this._timerId);
      this._timerId = setTimeout(() => {
        this.get();
      }, 500);
    },

    // //show add edit dialog
    // showAddEditDialog(item) {
    //   if (item == null && this.isAddEdit == true) {
    //     this.addEditText = `Add New ${this.entity}`;
    //     this.addEditDialog = true;
    //     this.addUpdateButtonText = " Add ";
    //   } else {
    //     this.item = Object.assign({}, item);
    //     this.addEditText = `Edit ${this.entity} : ` + this.item.name;
    //     this.addEditDialog = true;
    //     this.addUpdateButtonText = "Update";
    //   }
    // },

    close() {
      this.addEditDialog = false;
      setTimeout(() => {
        this.item = Object.assign({}, this.defaultItem);
      }, 300);
    },

    // // add edit
    // async addEditItem() {
    //   if (this.$refs.holdingFormAddEdit.validate()) {
    //     if (this.isAddEdit) {
    //       // save
    //       let payload = {
    //         product_mode: this.item.product_mode,
    //         created_by: Global.loggedInUser,
    //         endPoint: `Save${this.endPoint}`,
    //       };
    //       await this.actionSave(payload);
    //       this.close();
    //       this.get();
    //     } else {
    //       // update
    //       let payload = {
    //         product_mode: this.item.product_mode,
    //         product_mode_id: this.item.product_mode_id,
    //         product_mode_status: this.item.product_mode_status,
    //         updated_by: Global.loggedInUser,
    //         endPoint: `Update${this.endPoint}`,
    //       };
    //       await this.actionUpdate(payload);
    //       this.close();
    //       this.get();
    //     }
    //   }
    // },

    // enable disable
    async enableDisableItem(item) {
      let payload = {
        status: "Inactive",
        Id: item.notification_id,

        endPoint: `setNotificationStatus`,
      };
      await this.actionUpdate(payload);
      this.get();
    },

    // delete role
    async deleteItem(item) {
      const result = await Global.showConfirmationAlert(
        `Delete  ${this.entity} `,
        "Are you sure to delete",
        "warning"
      );
      if (result.isConfirmed) {
        let payload = {
          Id: item.notification_id,
          endPoint: `deleteNotification`,
        };
        await this.actionDelete(payload);
        this.get();
      }
    },
  },
};
