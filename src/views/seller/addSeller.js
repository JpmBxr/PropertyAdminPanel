import { Global } from "../../helpers/global";
import { validationMixin } from "../../mixins/validationMixin";
import { ApiService } from "../../helpers/apiService";
export const addSeller = {
  props: ["userPermissionDataProps", "addAgentOperatorDataProps"],
  mixins: [validationMixin],
  data() {
    return {
      //newly added
      agencyisvisible: true,
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
  async created() {
    this.setAgencyVisible();
    this.getAgencyWithoutPagination();
    await this.getSellerProvinceItems();

    if (this.$route.params.sellerId != 0) {
      this.isAddEdit = false;
      await this.getSellerById(this.$route.params.sellerId);
      this.changeProvince();
      this.changeTown();
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
     //#region getAgencyWithoutPagination
     getAgencyWithoutPagination() {
      this.isLoaderActive = true;
      ApiService.get("GetAgencyWithoutPagination", {
      
      })
        .then((response) => {
          this.isLoaderActive = false;

          this.agencyItems = response.data.resultData;
        })
        .catch((error) => {
          this.isLoaderActive = false;
          if (error.response.status != 401 && error.response.status != 403) {
            Global.showErrorAlert(true, "error", "Something went wrong");
          }
        });
    },
    //#endregion

    setAgencyVisible() {
      
      if (
        secureLS.get(Global.roleName) === "Operator" ||
        secureLS.get(Global.roleName) === "Super Admin" ||
        secureLS.get(Global.roleName) === "Admin" 
  
      ) {
        this.agencyisvisible = true;
       
      } else  {
        this.agencyisvisible = false;
     
      }
    },
    
     //#region getBrokerProvinceItems
     async getSellerProvinceItems() {
      this.isLoaderActive = true;
      try {
        const response = await ApiService.get("GetProvinceWithoutPagination", {})
        this.provinceItems = response.data.resultData;
        this.isLoaderActive = false;
      } catch (error) {
        this.isLoaderActive = false;
        if (error.response.status != 401 && error.response.status != 403) {
          Global.showErrorAlert(true, "error", "Something went wrong");
        }
      }
    },
    //#endregion

    //#region getTownWithoutPagination
    async getTownWithoutPagination() {
      this.isLoaderActive = true;
      try {
        const response = await ApiService.get("GetTownWithoutPagination", {
          provinceId: this.item.province_id,
        })
        this.townItems = response.data.resultData;
        this.isLoaderActive = false;
      } catch (error) {
        this.isLoaderActive = false;
        if (error.response.status != 401 && error.response.status != 403) {
          Global.showErrorAlert(true, "error", "Something went wrong");
        }
      }
    },
    //#endregion

    //#region getBarangayWithoutPagination
    async getBarangayWithoutPagination() {
      this.isLoaderActive = true;
      try {
        const response = await ApiService.get("GetBarangayWithoutPagination", {
          townId: this.item.town_id
        })
        this.barangayItems = response.data.resultData;
        this.isLoaderActive = false;
      } catch (error) {
        this.isLoaderActive = false;
        if (error.response.status != 401 && error.response.status != 403) {
          Global.showErrorAlert(true, "error", "Something went wrong");
        }
      }
    },
    //#endregion

    //#region getSubdivisionWithoutPagination
    async getSubdivisionWithoutPagination() {
      this.isLoaderActive = true;
      try {
        const response = await ApiService.get("GetSubdivisionWithoutPagination", {
          barangayId: this.item.barangay_id,
        })
        this.subdivisionItems = response.data.resultData;
        this.isLoaderActive = false;
      } catch (error) {
        this.isLoaderActive = false;
        if (error.response.status != 401 && error.response.status != 403) {
          Global.showErrorAlert(true, "error", "Something went wrong");
        }
      }
    },
    //#endregion

    //#region Change
    async changeProvince() {
      await this.getTownWithoutPagination();
    },
    async changeTown() {
      await this.getBarangayWithoutPagination();
    },
    async changeBarangay() {
      await this.getSubdivisionWithoutPagination();
    },
    //#endregion

    //#region getBrokerById
    async getSellerById(sellerId) {
      this.isLoaderActive = true;
      try {
        const response = await ApiService.get("getSellerById", {
          seller_id: sellerId,
        })
        this.isLoaderActive = false;
        this.item_s = this.item = response.data.resultData[0];
        this.item = this.item_s;
      }
      catch (error) {
        this.isLoaderActive = false;
          if (error.response.status != 401 && error.response.status != 403) {
            Global.showErrorAlert(true, "error", "Something went wrong");
          }
      }
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
            agency_id:this.item.agency_id,
            user_id: secureLS.get(Global.userId),
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
            user_id: secureLS.get(Global.userId),
            agency_id:this.item.agency_id,

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
