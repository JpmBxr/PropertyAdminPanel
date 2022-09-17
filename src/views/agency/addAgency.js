import { Global } from "../../helpers/global";
import { validationMixin } from "../../mixins/validationMixin.js";
import { ApiService } from "../../helpers/apiService";
export const addAgency = {
  props: ["userPermissionDataProps", "addAgentOperatorDataProps"],
  mixins: [validationMixin],
  //#region data
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

      agencyProvinceItems: [],
      agencyCapabilitiesItems: [],
      agencySpecializationItems: [],
      townItems: [],
      provinceItems: [],
      barangayItems: [],
      subdivisionItems: [],
      pagination: {},
      entity: "Add Agency",
      isFormAddEditValid: false,
      isItemLoading: false,
      // search
      searchText: "",

      // add edit
      defaultItem: {},
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
  //#endregion

  //#region created
  async created() {
    await this.getAgencySpecilizationWithoutPagination();
    await this.getProvinceWithoutPagination();
    await this.getCapabilityWithoutPagination();

    await this.getAgencyProvinceItems();
    await this.getTownWithoutPagination();

    if (this.$route.params.agencyId != 0) {
      this.isSwitchVisible = true;
      this.isAddEdit = false;
      await this.getAgencyById(this.$route.params.agencyId);
      this.changeProvince();
      this.changeBarangay();
    }
  },
  //#endregion

  //#region computed
  computed: {
    // For numbering the Data Table Rows
    dataTableRowNumbering() {
      return this.tableItems.map((items, index) => ({
        ...items,
        index: index + 1,
      }));
    },
  },
  //#endregion

  methods: {
    //#region getAgencySpecilizationWithoutPagination
    async getAgencySpecilizationWithoutPagination() {
      this.isLoaderActive = true;

      try {
        const response = await ApiService.get("GetSpecializationWithoutPagination", {})
        this.agencySpecializationItems = response.data.resultData;
        this.isLoaderActive = false;
      }
      catch (error) {
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
      }
      catch (error) {
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
        this.agencyCapabilitiesItems = response.data.resultData;
        this.isLoaderActive = false;
      }
      catch (error) {
        this.isLoaderActive = false;
        if (error.response.status != 401 && error.response.status != 403) {
          Global.showErrorAlert(true, "error", "Something went wrong");
        }
      }


    },
    //#endregion

    //#region getAgencyProvinceItems
    getAgencyProvinceItems() {
      this.isLoaderActive = true;
      ApiService.get("GetProvinceWithoutPagination", {})
        .then((response) => {
          this.isLoaderActive = false;

          this.agencyProvinceItems = response.data.resultData;
        })
        .catch((error) => {
          this.isLoaderActive = false;
          if (error.response.status != 401 && error.response.status != 403) {
            Global.showErrorAlert(true, "error", "Something went wrong");
          }
        });
    },
    //#region 

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

    //#region getAgencyById
    async getAgencyById(agencyId) {

      this.isLoaderActive = true;
      try {
        const response = await ApiService.get("GetAgencyById", {
          agency_id: agencyId,
        })
        this.isLoaderActive = false;
        this.item_s = response.data.resultData;

        const { specialization_id, capability_id, province_id, ...rest } = response.data.resultData[0]

        const _res = {
          ...rest,
          specialization_id: specialization_id ? this.agencySpecializationItems.filter((c) => specialization_id.split(",").includes(String(c.specialization_id))).map(v => v) : "",
          capability_id: capability_id ? this.agencyCapabilitiesItems.filter((c) => capability_id.split(",").includes(String(c.capability_id))).map(v => v) : "",
          province_id: province_id ? this.provinceItems.filter((c) => province_id.split(",").includes(String(c.province_id))).map(v => v) : ""
        }
        this.item = _res;

      }
      catch (error) {
        this.isLoaderActive = false;
        if (error.response?.status != 401 && error.response?.status != 403) {
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
            agency_name: this.item.agency_name,
            owner_name: this.item.owner_name,
            contact_person: this.item.contact_person,
            email_address: this.item.email_address,
            email_address_secondary: this.item.email_address_secondary,
            phone_1: this.item.phone_1,
            phone_2: this.item.phone_2,
            specialization_id: this.item.specialization_id.toString(),
            province_id: this.item.province_id.toString(),
            capability_id: this.item.capability_id.toString(),
            status: this.item.status,
            reason_for_inactive: this.item.reason_for_inactive,

            unit_number: this.item.unit_number,
            house_number: this.item.house_number,
            street_name: this.item.street_name,
            building_name: this.item.building_name,
            town_id: this.item.town_id,
            address_province_id: this.item.address_province_id,
            barangay_id: this.item.barangay_id,
            subdivision_id: this.item.subdivision_id,

            zip_code: this.item.zip_code,
            floor: this.item.floor,

            created_by: Global.loggedInUser,
          };
          this.isLoaderActive = true;
          ApiService.post("saveagency", payload)
            .then((response) => {
              this.isLoaderActive = false;
              this.$router.push({
                name: "Agency",
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
            agency_id: this.item.agency_id,
            agency_name: this.item.agency_name,
            owner_name: this.item.owner_name,
            contact_person: this.item.contact_person,
            email_address: this.item.email_address,
            email_address_secondary: this.item.email_address_secondary,
            phone_1: this.item.phone_1,
            phone_2: this.item.phone_2,
            specialization_id,
            province_id,
            capability_id,

            status: this.item.status,
            reason_for_inactive: this.item.reason_for_inactive,
            unit_number: this.item.unit_number,
            house_number: this.item.house_number,
            street_name: this.item.street_name,
            building_name: this.item.building_name,
            town_id: this.item.town_id,
            address_province_id: this.item.address_province_id,
            barangay_id: this.item.barangay_id,
            subdivision_id: this.item.subdivision_id,
            zip_code: this.item.zip_code,
            floor: this.item.floor,
            created_by: Global.loggedInUser,
          };
          this.isLoaderActive = true;
          ApiService.post("updateagency", payload)
            .then((response) => {
              this.isLoaderActive = false;
              this.$router.push({
                name: "Agency",
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
