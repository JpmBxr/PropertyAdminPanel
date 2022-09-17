import { Global } from "../../helpers/global";
import { validationMixin } from "../../mixins/validationMixin";
import { ApiService } from "../../helpers/apiService";
export const addSeller = {
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
      entity: "Seller",
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
      //end
    };
  },
  created() {
    this.getBrokerProvinceItems();
    this.getTownWithoutPagination();

    if (this.$route.params.sellerId != 0) {
      this.isAddEdit = false;
      this.getSellerById(this.$route.params.sellerId);
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
    getSellerById(sellerId) {
      this.isLoaderActive = true;
      ApiService.get("getSellerById", {
        seller_id: sellerId,

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
            seller_name: this.item.seller_name,
            property_owner_name: this.item.property_owner_name,
            phone_1: this.item.phone_1,
            phone_2: this.item.phone_2,
            email_address: this.item.email_address,

            unit_number: this.item.unit_number,
            house_no: this.item.house_no,
            street_name: this.item.street_name,
            zipcode: this.item.zipcode,
           
            province_id: this.item.province_id,
            barangay_id: this.item.barangay_id,
            town_id: this.item.town_id,
            subdivision_id: this.item.subdivision_id,
            notes_about_seller:this.item.notes_about_seller,
          };
          this.isLoaderActive = true;
          ApiService.post("saveSeller", payload)
            .then((response) => {
              this.isLoaderActive = false;
              this.$router.push({
                name: "Seller",
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
            seller_id: this.item.seller_id,
            seller_name: this.item.seller_name,
            property_owner_name: this.item.property_owner_name,
            phone_1: this.item.phone_1,
            phone_2: this.item.phone_2,
            email_address: this.item.email_address,

            unit_number: this.item.unit_number,
            house_no: this.item.house_no,
            street_name: this.item.street_name,
            zipcode: this.item.zipcode,
           
            province_id: this.item.province_id,
            barangay_id: this.item.barangay_id,
            town_id: this.item.town_id,
            subdivision_id: this.item.subdivision_id,
            notes_about_seller:this.item.notes_about_seller,

          };
          this.isLoaderActive = true;
          ApiService.post("updateSeller", payload)
            .then((response) => {
              this.isLoaderActive = false;
              this.$router.push({
                name: "Seller",
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
