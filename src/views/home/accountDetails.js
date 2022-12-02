import { Global } from "../../helpers/global";
import { validationMixin } from "../../mixins/validationMixin.js";
import { ApiService } from "../../helpers/apiService";
import SecureLS from "secure-ls";
var secureLS = new SecureLS({ encodingType: "aes" });
export const accountDetails = {
  props: ["userPermissionDataProps", "AccountDetailsDataProps"],
  mixins: [validationMixin],
  data() {
    return {
      isLoaderActive: false,
      // Data
     
      openPropertyLimitIsDisabled: true,
      pnlSettings: null,
      UserType:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.role_id != null
          ? this.AccountDetailsDataProps.role_id
          : null,
      AssociatedAgency:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.associated_agency_id != null
          ? this.AccountDetailsDataProps.associated_agency_id
          : null,
      firstName:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.first_name != null
          ? this.AccountDetailsDataProps.first_name
          : null,
      lastName:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.last_name != null
          ? this.AccountDetailsDataProps.last_name
          : null,
      nickName:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.nick_name != null
          ? this.AccountDetailsDataProps.nick_name
          : null,
      phone1:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.phone_1 != null
          ? this.AccountDetailsDataProps.phone_1
          : null,
      phone2:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.phone_2 != null
          ? this.AccountDetailsDataProps.phone_2
          : null,
      email:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.user_email != null
          ? this.AccountDetailsDataProps.user_email
          : null,
      selectDate: null,
      sameAsAgency:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.is_address_same_as_agency != null
          ? this.AccountDetailsDataProps.is_address_same_as_agency
          : null,
      unitNumber:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.unit_number != null
          ? this.AccountDetailsDataProps.unit_number
          : null,
      houseLotNumber:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.house_number != null
          ? this.AccountDetailsDataProps.house_number
          : null,
      streetName:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.street_name != null
          ? this.AccountDetailsDataProps.street_name
          : null,
      propertyBuildingName:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.building_name != null
          ? this.AccountDetailsDataProps.building_name
          : null,
      subdivision:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.subdivision_id != null
          ? this.AccountDetailsDataProps.subdivision_id
          : null,
      barangay:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.barangay_id != null
          ? this.AccountDetailsDataProps.barangay_id
          : null,
      town:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.town_id != null
          ? this.AccountDetailsDataProps.town_id
          : null,
      province:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.province_id != null
          ? this.AccountDetailsDataProps.province_id
          : null,
      zipCode:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.zip_code != null
          ? this.AccountDetailsDataProps.zip_code
          : null,
      floorLevel:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.floor != null
          ? this.AccountDetailsDataProps.floor
          : null,

      selectBirthDay:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.birth_day != null
          ? this.AccountDetailsDataProps.birth_day
          : null,
      selectBirthMonth:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.birth_month != null
          ? this.AccountDetailsDataProps.birth_month
          : null,
      rELicence:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.re_license != null
          ? this.AccountDetailsDataProps.re_license
          : null,
      userWebsite:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.website != null
          ? this.AccountDetailsDataProps.website
          : null,
      userSkills:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.user_skills != null
          ? this.AccountDetailsDataProps.user_skills.split(",").map(Number)
          : null,
      profileStatement:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.profile_statement != null
          ? this.AccountDetailsDataProps.profile_statement
          : null,
      selfBroker:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.self_broker != null
          ? this.AccountDetailsDataProps.self_broker
          : null,
      associatedBroker:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.associated_broker_id != null
          ? this.AccountDetailsDataProps.associated_broker_id
          : null,
      reasonInactive: null,
      inactiveUser: this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.user_status != null
        ? this.AccountDetailsDataProps.user_status
        : 'Active',
      openPropertyLimit:
        this.AccountDetailsDataProps != null && this.AccountDetailsDataProps.open_property_limit != null
          ? this.AccountDetailsDataProps.open_property_limit
          : 5,
      imageRule: [],
      ProfileImage: null,
      associatedAgencyItems: [],
      associatedBrokerItems: [],
      floorLevelItems: ["Basement", "Ground", "First", "Second"],
      userTypeItems: ["Agent", "Operator"],
      birthMonthItems: Global.birthMonth,
      birthDaysItems: [],
      townItems: [],
      provinceItems: [],
      barangayItems: [],
      subdivisionItems: [],
      userSkillsItems: [],
      pagination: {},
      entity: "Account Details",
      isFormAddEditValid: false,
      isItemLoading: false,
      isAgentOperator: false,
      isDialogLoaderActive: false,

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
      
      addPassDialog: false,
      isFormAddPassValid: false,
      isAddPass: true,
    };
  },
  created() {
    this.setOpenProperty();
    this.getTownWithoutPagination();
    this.getProvinceWithoutPagination();
    this.getUserSkillWithoutPagination();
    this.getUserTypeItemWithoutPagination();
    this.getAgencyWithoutPagination();
    this.getBrokerWithoutPagination();

    this.removeItemFromArray(this.userTypeItems, secureLS.get(Global.userId));
    if (this.AccountDetailsDataProps != null) {
      this.changeProvince();
      this.changeBarangay();
    }
  },
  computed: {


  },
  mounted() { },
  watch: {
    addEditDialog(value) {
      return value ? true : this.close();
    },
    addPassDialog(value) {
        return value ? true : this.close();
      },
    pagination: {
      handler() {
        this.getRoles();
      },
      deep: true,
    },
  },

  ProfileImage(val) {
    this.ProfileImage = val;
    this.imageRule =
      this.ProfileImage != null
        ? [(v) => !v || v.size <= 1048576 || "File size should be 1MB"]
        : [];
  },

  methods: {
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
    getProvinceWithoutPagination() {
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

    getUserSkillWithoutPagination() {
      this.isLoaderActive = true;
      ApiService.get("GetUserSkillWithoutPagination", {})
        .then((response) => {
          this.isLoaderActive = false;

          this.userSkillsItems = response.data.resultData;
        })
        .catch((error) => {
          this.isLoaderActive = false;
          if (error.response.status != 401 && error.response.status != 403) {
            Global.showErrorAlert(true, "error", "Something went wrong");
          }
        });
    },

    getUserTypeItemWithoutPagination() {
      this.isLoaderActive = true;
      ApiService.get("webGetRolesWithoutPagination", {})
        .then((response) => {
          this.isLoaderActive = false;

          this.userTypeItems = response.data.resultData;

          this.removeItemFromArray(
            this.userTypeItems,
            secureLS.get(Global.roleName)
          );
        })
        .catch((error) => {
          this.isLoaderActive = false;
          if (error.response.status != 401 && error.response.status != 403) {
            Global.showErrorAlert(true, "error", "Something went wrong");
          }
        });
    },

    getAgencyWithoutPagination() {
      this.isLoaderActive = true;
      ApiService.get("GetAgencyWithoutPagination", {})
        .then((response) => {
          this.isLoaderActive = false;

          this.associatedAgencyItems = response.data.resultData;
        })
        .catch((error) => {
          this.isLoaderActive = false;
          if (error.response.status != 401 && error.response.status != 403) {
            Global.showErrorAlert(true, "error", "Something went wrong");
          }
        });
    },

    getBrokerWithoutPagination() {
      this.isLoaderActive = true;
      ApiService.get("GetBrokerWithoutPagination", {})
        .then((response) => {
          this.isLoaderActive = false;

          this.associatedBrokerItems = response.data.resultData;
        })
        .catch((error) => {
          this.isLoaderActive = false;
          if (error.response.status != 401 && error.response.status != 403) {
            Global.showErrorAlert(true, "error", "Something went wrong");
          }
        });
    },

    setOpenProperty() {
      if (
        secureLS.get(Global.roleName) === "Agent" ||
        secureLS.get(Global.roleName) === "Owner-Agent" ||
        secureLS.get(Global.roleName) === "Owner-Agent"
      ) {
        this.openPropertyLimitIsDisabled = true;
        this.openPropertyLimit = 5;
      } else if (secureLS.get(Global.roleName) === "Operator") {
        this.openPropertyLimitIsDisabled = true;
        this.openPropertyLimit = 999;
      } else if (
        secureLS.get(Global.roleName) === "Admin " ||
        secureLS.get(Global.roleName) === "Super Admin "
      ) {
        this.openPropertyLimitIsDisabled = false;
        this.openPropertyLimit = 999;
      }
    },

    removeItemFromArray(array, item) {
      if (secureLS.get(Global.roleName) === "Admin") {
        for (let i = 0; i < array.length; i++) {
          if (array[i].name === "Super Admin") {
            array.splice(array[i], 1);
          }
        }
      } else if (
        secureLS.get(Global.roleName) === "Operator" ||
        secureLS.get(Global.roleName) === "Agent" ||
        secureLS.get(Global.roleName) === "Owner-Agent" ||
        secureLS.get(Global.roleName) === "Admin"
      ) {
        for (let i = 0; i < array.length; i++) {
          if (array[i].name === "Super Admin") {
            array.splice(array[i], 2);
          }
        }
      }

      console.log(array);
      this.userTypeItems = array;
    },

    changeProvince() {
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

    changeBarangay() {
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
    populateBirthDay() {
      this.birthDaysItems = Global.populateBirthDay(this.selectBirthMonth);
    },

    changeUserType() {
      console.log(this.UserType.name);
      if (this.UserType.name == "Agent" || this.UserType.name == "Operator") {
        this.isAgentOperator = true;
      } else {
        this.isAgentOperator = false;
      }
    },
    //reloadPage
    reloadPage() {
      window.location.reload();
    },

    // add edit role
    addEditItem() {
      if (this.$refs.holdingFormAddEdit.validate()) {

        if (this.isAddEdit && this.AccountDetailsDataProps == null) {
          // save
          let postData = new FormData();
          if (this.ProfileImage != null) {
            postData.append("profile_image", this.ProfileImage);
          }
          postData.append("firstName", this.firstName);
          postData.append("lastName", this.lastName,);
          postData.append("nickName", this.nickName,);
          postData.append("unitNumber", this.unitNumber,);
          postData.append( "houseLotNumber", this.houseLotNumber,);
          postData.append( "streetName", this.streetName,);
          postData.append("propertyBuildingName", this.propertyBuildingName,);
          postData.append("subdivision", this.subdivision,);
          postData.append( "barangay", this.barangay,);
          postData.append("town", this.town,);
          postData.append("province", this.province,);
          postData.append("zipCode", this.zipCode,);
          postData.append("floorLevel", this.floorLevel,);
          postData.append( "selectBirthDay", this.selectBirthDay,);
          postData.append("selectBirthMonth", this.selectBirthMonth,);
          postData.append( "rELicence", this.rELicence,);
          postData.append("userWebsite", this.userWebsite,);
          postData.append("userSkills",
            this.userSkills != null ? this.userSkills.toString() : null,);
          postData.append( "profileStatement", this.profileStatement,);
          postData.append( "phone1", this.phone1,);
          postData.append( "phone2", this.phone2,);
          postData.append("openPropertyLimit", this.openPropertyLimit);
          postData.append( "email", this.email,);
          postData.append( "user_id", secureLS.get(Global.userId));
          postData.append( "verify_password",this.item.verify_password);
         
          this.isLoaderActive = true;
          ApiService.post(`SaveUser`, postData)
            .then((response) => {
              this.isLoaderActive = false;
              
              this.close();
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

        else {
          //update
         
          let postData = new FormData();
          if (this.ProfileImage != null) {
            postData.append("profile_image", this.ProfileImage);
          }
          postData.append("firstName", this.firstName);
          postData.append("lastName", this.lastName,);
          postData.append("nickName", this.nickName,);
          postData.append("unitNumber", this.unitNumber,);
          postData.append( "houseLotNumber", this.houseLotNumber,);
          postData.append( "streetName", this.streetName,);
          postData.append("propertyBuildingName", this.propertyBuildingName,);
          postData.append("subdivision", this.subdivision,);
          postData.append( "barangay", this.barangay,);
          postData.append("town", this.town,);
          postData.append("province", this.province,);
          postData.append("zipCode", this.zipCode,);
          postData.append("floor", this.floorLevel,);
          postData.append( "selectBirthDay", this.selectBirthDay,);
          postData.append("selectBirthMonth", this.selectBirthMonth,);
          postData.append( "rELicence", this.rELicence,);
          postData.append("userWebsite", this.userWebsite,);
          postData.append("userSkills",
            this.userSkills != null ? this.userSkills.toString() : null,);
          postData.append( "profileStatement", this.profileStatement,);
          postData.append( "phone1", this.phone1,);
          postData.append( "phone2", this.phone2,);
          postData.append("openPropertyLimit", this.openPropertyLimit);
          postData.append( "email", this.email,);
          postData.append( "user_id", secureLS.get(Global.userId));
          postData.append( "verify_password",this.item.verify_password);
        
          this.isLoaderActive = true;
          ApiService.post(`UpdateProfile`, postData)
            .then((response) => {
              console.log("response=========>", response);
              secureLS.set(Global.coverImage, response.data.coverImage);
              this.isLoaderActive = false;
              this.close();
              this.$router.push({
                name: "NotificationList",
              });
              let full=   this.firstName.concat("  ", this.lastName)
              secureLS.set(Global.fullNameKey,full);
              secureLS.get(Global.fullNameKey);
              Global.showSuccessAlert(true, "success", response.data.message);
              this.reloadPage();
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

    //#region  show Pass dialog
    showAddPassDialog(item) {
        if (item == null && this.isAddPass == true) {
          this.addPassText = `Add  ${this.entity}`;
          this.addPassDialog = true;
        } else {
          this.item = Object.assign({}, item);
          this.addPassText = `Enter Current Password `
          this.addPassDialog = true;
        }
      },
      //#endregion

       //#region  to close the dialog
    close() {
        this.addPassDialog = false;
        setTimeout(() => {
          this.item = Object.assign({}, {});
        }, 300);
      },
      //#endregion
  }
};
