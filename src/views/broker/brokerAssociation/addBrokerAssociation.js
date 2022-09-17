import { Global } from "../../../helpers/global";
import { validationMixin } from "../../../mixins/validationMixin";
import { ApiService } from "../../../helpers/apiService";
export const addBrokerAssociation = {
  props: ["userPermissionDataProps", "addAgentOperatorDataProps"],
  mixins: [validationMixin],
  data() {
    return {
      //newly added
      isLoaderActive: false,
      totalItemsInDB: 0,
      tableItems: [],
      tableDataLoading: false,

      //end
      // Data
      pnlSettings: null,
      brokerProvinceItems: [],
      brokerCapabilitiesItems: [],
      brokerSpecializationItems: [],
      broker_association_name: null,
      brokerAssociationItems: [],
      townItems: [],
      provinceItems: [],
      barangayItems: [],
      subdivisionItems: [],
      pagination: {},
      entity: "Broker Association",
      isItemLoading: false,

      // search
      searchText: "",

      // add edit
      item: {},
      addEditDialog: false,
      isFormAddEditValid: false,
      isAddEdit: true,
      addUpdateButtonText: "Add Role",
      addEditText: "Add",

      isSwitchVisible: false,
      //end
    };
  },
  created() {
    this.getBrokerProvinceItems();
    this.getTownWithoutPagination();

    if (this.$route.params.brokerAssociationId != 0) {
      this.isSwitchVisible = true;
      this.isAddEdit = false;
      this.getBrokerAssociationById(this.$route.params.brokerAssociationId);
      this.changeProvince();
      this.changeBarangay();
    }
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

  methods: {
    //#region getBrokerProvinceItems
    getBrokerProvinceItems() {
      this.isLoaderActive = true;
      ApiService.get("GetProvinceWithoutPagination", {})
        .then((response) => {
          this.isLoaderActive = false;

          this.provinceItems = response.data.resultData;
        })
        .catch((error) => {
          this.isLoaderActive = false;
          if (error.response.status != 401 && error.response.status != 403) {
            Global.showErrorAlert(true, "error", "Something went wrong");
          }
        });
    },
    //#endregion

    //#region getTownWithoutPagination
    getTownWithoutPagination() {
      this.isLoaderActive = true;
      ApiService.get("GetTownWithoutPagination", {})
        .then((response) => {
          this.isLoaderActive = false;

          this.townItems = response.data.resultData;
        })
        .catch((error) => {
          this.isLoaderActive = false;
          if (error.response.status != 401 && error.response.status != 403) {
            Global.showErrorAlert(true, "error", "Something went wrong");
          }
        });
    },
    //#endregion 

    //#region getBarangayWithoutPagination
    getBarangayWithoutPagination() {
      this.isLoaderActive = true;
      ApiService.get("GetBarangayWithoutPagination", {
        townId: this.town,
        provinceId: this.province,
      })
        .then((response) => {
          this.isLoaderActive = false;

          this.barangayItems = response.data.resultData;
        })
        .catch((error) => {
          this.isLoaderActive = false;
          if (error.response.status != 401 && error.response.status != 403) {
            Global.showErrorAlert(true, "error", "Something went wrong");
          }
        });
    },
    //#endregion

    //#region getSubdivisionWithoutPagination
    getSubdivisionWithoutPagination() {
      this.isLoaderActive = true;
      ApiService.get("GetSubdivisionWithoutPagination", {
        townId: this.town,
        provinceId: this.province,
        barangayId: this.barangay,
      })
        .then((response) => {
          this.isLoaderActive = false;

          this.subdivisionItems = response.data.resultData;
        })
        .catch((error) => {
          this.isLoaderActive = false;
          if (error.response.status != 401 && error.response.status != 403) {
            Global.showErrorAlert(true, "error", "Something went wrong");
          }
        });
    },
    //#endregion

    //#region Change
    changeProvince() {
      this.getBarangayWithoutPagination();
    },

    changeBarangay() {
      this.getSubdivisionWithoutPagination();
    },
    //#endregion

    //#region getBrokerById
    getBrokerAssociationById(brokerAssociationId) {
      this.isLoaderActive = true;
      ApiService.get("getBrokerAssociationById", {
        broker_association_id: brokerAssociationId,

      })
        .then((response) => {
          this.isLoaderActive = false;
          this.item_s = this.item = response.data.resultData[0];
          this.item = this.item_s;

        })
        .catch((error) => {
          this.isLoaderActive = false;
          if (error.response.status != 401 && error.response.status != 403) {
            Global.showErrorAlert(true, "error", "Something went wrong");
          }
        });
    },
    //#endregion

    //#region add edit 
    addEditItem() {
      if (this.$refs.holdingFormAddEdit.validate()) {
        if (this.isAddEdit == true) {
          // save
          let payload = {
            broker_association_name: this.item.broker_association_name,
            contact_person: this.item.contact_person,
            phone_1: this.item.phone_1,
            phone_2: this.item.phone_2,
            email_address: this.item.email_address,

            province_id: this.item.province_id,

            unit_number: this.item.unit_number,
            house_number: this.item.house_number,
            street_name: this.item.street_name,
            building_name: this.item.building_name,
            status: this.item.status,
            address_province_id: this.item.address_province_id,
            town_id: this.item.town_id,
            barangay_id: this.item.barangay_id,
            subdivision_id: this.item.subdivision_id,

            zip_code: this.item.zip_code,
            floor: this.item.floor,

            created_by: Global.loggedInUser,
          };
          this.isLoaderActive = true;
          ApiService.post("savebrokerassociation", payload)
            .then((response) => {
              this.isLoaderActive = false;
              this.$router.push({
                name: "BrokerAssociation",
              });
              Global.showSuccessAlert(true, "success", response.data.message);
            })
            .catch((error) => {
              this.isLoaderActive = false;
              if (
                error.response.status != 401 ||
                error.response.status != 403
              ) {
                Global.showErrorAlert(true, "error", "Something went wrong");
              }
            });

        } else {
          // update
          let payload = {

            broker_association_name: this.item.broker_association_name,
            contact_person: this.item.contact_person,
            phone_1: this.item.phone_1,
            phone_2: this.item.phone_2,
            email_address: this.item.email_address,
            province_id: this.item.province_id,
            unit_number: this.item.unit_number,
            house_number: this.item.house_number,
            street_name: this.item.street_name,
            building_name: this.item.building_name,
            status: this.item.status,
            address_province_id: this.item.address_province_id,
            town_id: this.item.town_id,
            barangay_id: this.item.barangay_id,
            subdivision_id: this.item.subdivision_id,
            zip_code: this.item.zip_code,
            floor: this.item.floor,

            broker_association_id: this.item.broker_association_id,

            created_by: Global.loggedInUser,
          };
          this.isLoaderActive = true;
          ApiService.post("updatebrokerassociation", payload)
            .then((response) => {
              this.isLoaderActive = false;
              this.$router.push({
                name: "BrokerAssociation",
              });
              Global.showSuccessAlert(true, "success", response.data.message);
            })
            .catch((error) => {
              this.isLoaderActive = false;
              if (
                error.response.status != 401 ||
                error.response.status != 403
              ) {
                Global.showErrorAlert(true, "error", "Something went wrong");
              }
            });
        }
      }
    },
    //#endregion
  },
};
