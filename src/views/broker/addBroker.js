import { Global } from "../../helpers/global";
import { validationMixin } from "../../mixins/validationMixin.js";
import { ApiService } from "../../helpers/apiService";
export const addBroker = {
  props: ["userPermissionDataProps", "addAgentOperatorDataProps"],
  mixins: [validationMixin],
  data() {
    return {
      //newly added
      isLoaderActive: false,
      totalItemsInDB: 0,
      tableItems: [],
      tableDataLoading: false,
     
      // Data
      pnlSettings: null,

      brokerAssociationItems: [],
      brokerProvinceItems: [],
      brokerCapabilitiesItems: [],
      brokerSpecializationItems: [],
     
      provinceItems: [],
      townItems: [],
      barangayItems: [],
      subdivisionItems: [],

      pagination: {},
      entity: "Add Broker",
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
  async created() {
   await this.getBrokerAssociationWithoutPagination();
   await this.getAgencySpecilizationWithoutPagination();
   await this.getProvinceWithoutPagination();
   await this.getCapabilityWithoutPagination();

   
   await this.getBrokerProvinceItems();
  // await this.getTownWithoutPagination();
  //  await this.getBarangayWithoutPagination();
  //  await this.getSubdivisionWithoutPagination();
   

    if (this.$route.params.brokerId != 0) {
      this.isSwitchVisible = true;
      this.isAddEdit = false;
      this.getBrokerById(this.$route.params.brokerId);
      this.changeProvince();
      this.changeTown();
      this.changeBarangay();
    }
  },
  //#region methods
  methods: {
    //#region getAgencySpecilizationWithoutPagination
    async getBrokerAssociationWithoutPagination() {
      this.isLoaderActive = true;
      try {
        const response = await ApiService.get("GetBrokerAssociationWithoutPagination", {})
        this.brokerAssociationItems = response.data.resultData;
        this.isLoaderActive = false;
      } catch (error) {
        this.isLoaderActive = false;
        if (error.response.status != 401 && error.response.status != 403) {
          Global.showErrorAlert(true, "error", "Something went wrong");
        }
      }
    },
    //#endregion

    //#region getAgencySpecilizationWithoutPagination
    async getAgencySpecilizationWithoutPagination() {
      this.isLoaderActive = true;
      try {
        const response = await ApiService.get("GetSpecializationWithoutPagination", {})
        this.brokerSpecializationItems = response.data.resultData;
        this.isLoaderActive = false;
      } catch (error) {
        this.isLoaderActive = false;
        if (error.response.status != 401 && error.response.status != 403) {
          Global.showErrorAlert(true, "error", "Something went wrong");
        }
      }
    },
    //#endregion

    //#region getProvinceWithoutPagination
    async getProvinceWithoutPagination() {
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

    //#region getCapabilityWithoutPagination
    async getCapabilityWithoutPagination() {
      this.isLoaderActive = true;
      try {
        const response = await ApiService.get("GetCapabilityWithoutPagination", {})
        this.brokerCapabilitiesItems = response.data.resultData;
        this.isLoaderActive = false;
      } catch (error) {
        this.isLoaderActive = false;
        if (error.response.status != 401 && error.response.status != 403) {
          Global.showErrorAlert(true, "error", "Something went wrong");
        }
      }
    },
    //#endregion

    //#region getBrokerProvinceItems
    async getBrokerProvinceItems() {
      this.isLoaderActive = true;
      try {
        const response = await ApiService.get("GetProvinceWithoutPagination", {})
        this.brokerProvinceItems = response.data.resultData;
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
          provinceId: this.item.address_province_id,
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
    async getBrokerById(brokerId) {
      this.isLoaderActive = true;
      try {
        const response = await ApiService.get("getBrokerById", {
          broker_id: brokerId,
        })
        this.isLoaderActive = false;
        this.item_s = response.data.resultData;

        console.log("item_s--------->" , this.item_s);
        
        const { broker_association_id, specialization_id, capability_id, province_id, ...rest } = response.data.resultData[0]

        const _res = {
          ...rest,
          broker_association_id: broker_association_id ? this.brokerAssociationItems.filter((c) => broker_association_id.split(",").includes(String(c.broker_association_id))).map(v => v) : "",
          specialization_id: specialization_id ? this.brokerSpecializationItems.filter((c) => specialization_id.split(",").includes(String(c.specialization_id))).map(v => v) : "",
          capability_id: capability_id ? this.brokerCapabilitiesItems.filter((c) => capability_id.split(",").includes(String(c.capability_id))).map(v => v) : "",
          province_id: province_id ? this.provinceItems.filter((c) => province_id.split(",").includes(String(c.province_id))).map(v => v) : ""
        }
        this.item = _res;

        console.log("item------>", this.item);
        // this.isLoaderActive = false;
      } catch (error) {
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
            broker_name: this.item.broker_name,
            broker_license_number: this.item.broker_license_number,
            phone_1: this.item.phone_1,
            phone_2: this.item.phone_2,
            email_address: this.item.email_address,

            broker_association_id:this.item.broker_association_id!= null? this.item.broker_association_id.toString():null,
            specialization_id:this.item.specialization_id!= null? this.item.specialization_id.toString():null,
            province_id: this.item.province_id!= null?this.item.province_id.toString():null,
            capability_id: this.item.capability_id!= null?this.item.capability_id.toString():null,

            status: this.item.status,
            reason_for_inactive: this.item.reason_for_inactive,
            notes_about_broker: this.item.notes_about_broker,

            unit_number: this.item.unit_number,
            house_number: this.item.house_number,
            street_name: this.item.street_name,
            building_name: this.item.building_name,

            address_province_id: this.item.address_province_id,
            town_id: this.item.town_id,
            barangay_id: this.item.barangay_id,
            subdivision_id: this.item.subdivision_id,

            zip_code: this.item.zip_code,
            floor: this.item.floor,

            created_by: Global.loggedInUser,
          };
          this.isLoaderActive = true;
          ApiService.post("savebroker", payload)
            .then((response) => {
              this.isLoaderActive = false;
              this.$router.push({
                name: "Broker",
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
          let broker_association_id = Array.isArray(this.item.broker_association_id) && this.item.broker_association_id.length ? ["number", "string"].includes(typeof this.item.broker_association_id[0]) ? this.item.broker_association_id.join(",") : this.item.broker_association_id.map(v => v.broker_association_id).join(",") : ""
          let specialization_id = Array.isArray(this.item.specialization_id) && this.item.specialization_id.length ? ["number", "string"].includes(typeof this.item.specialization_id[0]) ? this.item.specialization_id.join(",") : this.item.specialization_id.map(v => v.specialization_id).join(",") : ""
          let province_id = Array.isArray(this.item.province_id) && this.item.province_id.length ? ["number", "string"].includes(typeof this.item.province_id[0]) ? this.item.province_id.join(",") : this.item.province_id.map(v => v.province_id).join(",") : ""
          let capability_id = Array.isArray(this.item.capability_id) && this.item.capability_id.length ? ["number", "string"].includes(typeof this.item.capability_id[0]) ? this.item.capability_id.join(",") : this.item.capability_id.map(v => v.capability_id).join(",") : ""

          let payload = {
            broker_name: this.item.broker_name,
            broker_license_number: this.item.broker_license_number,
            phone_1: this.item.phone_1,
            phone_2: this.item.phone_2,
            email_address: this.item.email_address,

            broker_association_id,
            specialization_id,
            province_id,
            capability_id,

            status: this.item.status,
            reason_for_inactive: this.item.reason_for_inactive,
            notes_about_broker: this.item.notes_about_broker,

            unit_number: this.item.unit_number,
            house_number: this.item.house_number,
            street_name: this.item.street_name,
            building_name: this.item.building_name,

            address_province_id: this.item.address_province_id,
            town_id: this.item.town_id,
            barangay_id: this.item.barangay_id,
            subdivision_id: this.item.subdivision_id,

            zip_code: this.item.zip_code,
            floor: this.item.floor,

            broker_id: this.item.broker_id,
            created_by: Global.loggedInUser,
          };
          this.isLoaderActive = true;
          ApiService.post("updatebroker", payload)
            .then((response) => {
              this.isLoaderActive = false;
              this.$router.push({
                name: "Broker",
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
  //#endregion
};
