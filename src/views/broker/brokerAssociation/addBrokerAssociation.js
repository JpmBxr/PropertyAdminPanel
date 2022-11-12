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

      // Data
      pnlSettings: null,

      brokerAssociationProvinceItems: [],
      brokerCapabilitiesItems: [],
      brokerSpecializationItems: [],

    
      provinceItems: [],
      townItems: [],
      barangayItems: [],
      subdivisionItems: [],

      pagination: {},
      entity: "Broker Association",
      isItemLoading: false,
     
      // search
      searchText: "",

      // add edit
      item: {},
      item_s: {},
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
   await this.getAgencySpecilizationWithoutPagination();
   await this.getProvinceWithoutPagination();
   await this.getCapabilityWithoutPagination();


   await this.getBrokerAssociationProvinceItems();
  //  await this.getTownWithoutPagination();
  //  await this.getBarangayWithoutPagination();
  //  await this.getSubdivisionWithoutPagination();

    if (this.$route.params.brokerAssociationId != 0) {
      this.isSwitchVisible = true;
      this.isAddEdit = false;
      this.getBrokerAssociationById(this.$route.params.brokerAssociationId);
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
   async getBrokerAssociationProvinceItems() {
      this.isLoaderActive = true;
      try {
        const response = await  ApiService.get("GetProvinceWithoutPagination", {})
        this.brokerAssociationProvinceItems = response.data.resultData;
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
    async getBrokerAssociationById(brokerAssociationId) {
      this.isLoaderActive = true;
      try {
       const response = await ApiService.get("getBrokerAssociationById", {
          broker_association_id: brokerAssociationId,
        })
        this.isLoaderActive = false;
        this.item_s = response.data.resultData;
       
        console.log("item_s--------->" , this.item_s);
        const { specialization_id, capability_id, province_id, ...rest } = response.data.resultData[0]
        const _res = {
          ...rest,
          specialization_id: specialization_id ? this.brokerSpecializationItems.filter((c) => specialization_id.split(",").includes(String(c.specialization_id))).map(v => v) : "",
          capability_id: capability_id ? this.brokerCapabilitiesItems.filter((c) => capability_id.split(",").includes(String(c.capability_id))).map(v => v) : "",
          province_id: province_id ? this.provinceItems.filter((c) => province_id.split(",").includes(String(c.province_id))).map(v => v) : ""
        }
        this.item = _res;
        console.log("item------>", this.item);
        // this.isLoaderActive = false;
      } catch (error) {
        console.log(error);
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
          console.log(this.item.address_province_id);
          let payload = {
            broker_association_name: this.item.broker_association_name,
            contact_person: this.item.contact_person,
            phone_1: this.item.phone_1,
            phone_2: this.item.phone_2,
            email_address: this.item.email_address,

            specialization_id:this.item.specialization_id!= null? this.item.specialization_id.toString():null,
            province_id: this.item.province_id!= null?this.item.province_id.toString():null,
            capability_id: this.item.capability_id!= null?this.item.capability_id.toString():null,

            status: this.item.status,
            reason_for_inactive: this.item.reason_for_inactive,

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
          let specialization_id = Array.isArray(this.item.specialization_id) && this.item.specialization_id.length ? ["number", "string"].includes(typeof this.item.specialization_id[0]) ? this.item.specialization_id.join(",") : this.item.specialization_id.map(v => v.specialization_id).join(",") : ""
          let province_id = Array.isArray(this.item.province_id) && this.item.province_id.length ? ["number", "string"].includes(typeof this.item.province_id[0]) ? this.item.province_id.join(",") : this.item.province_id.map(v => v.province_id).join(",") : ""
          let capability_id = Array.isArray(this.item.capability_id) && this.item.capability_id.length ? ["number", "string"].includes(typeof this.item.capability_id[0]) ? this.item.capability_id.join(",") : this.item.capability_id.map(v => v.capability_id).join(",") : ""

          let payload = {

            broker_association_name: this.item.broker_association_name,
            contact_person: this.item.contact_person,
            phone_1: this.item.phone_1,
            phone_2: this.item.phone_2,
            email_address: this.item.email_address,

            specialization_id,
            province_id,
            capability_id,

            status: this.item.status,
            reason_for_inactive: this.item.reason_for_inactive,
            
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
