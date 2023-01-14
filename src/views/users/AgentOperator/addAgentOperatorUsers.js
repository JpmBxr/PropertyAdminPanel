import { Global } from "../../../helpers/global";
import { validationMixin } from "../../../mixins/validationMixin.js";
import { ApiService } from "../../../helpers/apiService";
export const addAgentOperatorUsers = {
  props: ["userPermissionDataProps", "addAgentOperatorDataProps"],
  mixins: [validationMixin],
  data() {
    return {
     
      isLoaderActive: false,
      // Data
      openPropertyLimitIsDisabled: true,
      pnlSettings: null,
      UserType:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.role_id != null
          ? this.addAgentOperatorDataProps.role_id
          : null,
      AssociatedAgency:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.associated_agency_id != null
          ? this.addAgentOperatorDataProps.associated_agency_id
          : null,
      firstName:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.first_name != null
          ? this.addAgentOperatorDataProps.first_name
          : null,
      lastName:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.last_name != null
          ? this.addAgentOperatorDataProps.last_name
          : null,
      nickName:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.nick_name != null
          ? this.addAgentOperatorDataProps.nick_name
          : null,
      phone1:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.phone_1 != null
          ? this.addAgentOperatorDataProps.phone_1
          : null,
      phone2:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.phone_2 != null
          ? this.addAgentOperatorDataProps.phone_2
          : null,
      email:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.user_email != null
          ? this.addAgentOperatorDataProps.user_email
          : null,
      selectDate: null,
      sameAsAgency:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.is_address_same_as_agency != null
          ? this.addAgentOperatorDataProps.is_address_same_as_agency
          : null,
          
      unitNumber:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.unit_number != null
          ? this.addAgentOperatorDataProps.unit_number
          : null,
      houseLotNumber:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.house_number != null
          ? this.addAgentOperatorDataProps.house_number
          : null,
      streetName:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.street_name != null
          ? this.addAgentOperatorDataProps.street_name
          : null,
      propertyBuildingName:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.building_name != null
          ? this.addAgentOperatorDataProps.building_name
          : null,
      subdivision:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.subdivision_id != null
          ? this.addAgentOperatorDataProps.subdivision_id
          : null,
      barangay:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.barangay_id != null
          ? this.addAgentOperatorDataProps.barangay_id
          : null,
      town:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.town_id != null
          ? this.addAgentOperatorDataProps.town_id
          : null,
      province:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.province_id != null
          ? this.addAgentOperatorDataProps.province_id
          : null,
      zipCode:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.zip_code != null
          ? this.addAgentOperatorDataProps.zip_code
          : null,
      floorLevel:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.floor != null
          ? this.addAgentOperatorDataProps.floor
          : null,

      selectBirthDay:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.birth_day != null
          ? this.addAgentOperatorDataProps.birth_day
          : null,
      selectBirthMonth:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.birth_month != null
          ? this.addAgentOperatorDataProps.birth_month
          : null,
      selectBirthYear:
          this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.birth_year != null
            ? this.addAgentOperatorDataProps.birth_year
            : null,
      rELicence:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.re_license != null
          ? this.addAgentOperatorDataProps.re_license
          : null,
      userWebsite:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.website != null
          ? this.addAgentOperatorDataProps.website
          : null,
      userSkills:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.user_skills != null
          ? this.addAgentOperatorDataProps.user_skills.split(",").map(Number)
          : null,
      profileStatement:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.profile_statement != null
          ? this.addAgentOperatorDataProps.profile_statement
          : null,
      selfBroker:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.self_broker != null
          ? this.addAgentOperatorDataProps.self_broker
          : null,
      // associatedBroker:
      //   this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.associated_broker_id != null
      //     ? this.addAgentOperatorDataProps.associated_broker_id
      //     : null,
      associatedBroker:[],
      reasonInactive: null,
      inactiveUser: this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.user_status != null
        ? this.addAgentOperatorDataProps.user_status
        : 'Active',
      openPropertyLimit:
        this.addAgentOperatorDataProps != null && this.addAgentOperatorDataProps.open_property_limit != null
          ? this.addAgentOperatorDataProps.open_property_limit
          : 5,
      associatedAgencyItems: [],
      associatedBrokerItems: [],
      floorItems: ["Basement", "Ground", "First", "Second"],
      userTypeItems: ["Agent", "Operator"],
      birthMonthItems: Global.birthMonth,
      birthYearItems: Global.birthYear,
      birthDaysItems: [],
      townItems: [],
      provinceItems: [],
      barangayItems: [],
      subdivisionItems: [],
      userSkillsItems: [],
      pagination: {},
      entity: "User",
      isFormAddEditValid: false,
      isItemLoading: false,
      isAgentOperator: false,
     
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
      
    };
  },
 created() {
  
    this.setOpenProperty();
    
      this.getProvinceWithoutPagination();
      this.getTownWithoutPagination();
      this.getBarangayWithoutPagination();
      this.getSubdivisionWithoutPagination();
      this.getUserSkillWithoutPagination();
      this.getUserTypeItemWithoutPagination();
     this.getAgencyWithoutPagination();
     this.getBrokerWithoutPagination();
   
    this.removeItemFromArray(this.userTypeItems, secureLS.get(Global.roleName));
    if (this.addAgentOperatorDataProps != null) {
      this.getBrokerWithoutPagination();
      let x=this.addAgentOperatorDataProps.associated_broker_id;
      let y=x.replace(/, +/g, ",").split(",").map(Number); 
      console.log("yy-------",y);
     
      console.log("-------",this.addAgentOperatorDataProps.associated_broker_id);
      for(let i=0;i<y.length;i++)
      {
        console.log("-------",y[i]);
        this.associatedBroker.push(y[i]);
      }
      // this.associatedBroker=[20,21];
      console.log("pppppppppppppppp",this.associatedBroker);
      if(this.addAgentOperatorDataProps.role_id == 26 )
      {
        this.sameAsAgency=true;
        this.isAgentOperator = true;
      }
      else
      {
        this.sameAsAgency=false;
        this.isAgentOperator = false;
      }


    }
  },
  computed: {


  },
  mounted() { },
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
   
  fetchAgencyAddress(){
    this.isLoaderActive = true;
     ApiService.get("GetAssociatedAgencyAddressWithoutPagination", {
        associated_agency_id:this.AssociatedAgency
      })
      .then((response) => {

        this.isLoaderActive = false;

        this.unitNumber = response.data.resultData.unit_number;
        this.houseLotNumber=response.data.resultData.house_number;
        this.streetName=response.data.resultData.street_name;
        this.propertyBuildingName=response.data.resultData.building_name;
        this.province=response.data.resultData.address_province_id;
        this.town=response.data.resultData.town_id;
        this.barangay=response.data.resultData.barangay_id;  
        this.subdivision=response.data.resultData.subdivision_id;
        this.zipCode=response.data.resultData.zip_code;
        this.floorLevel=response.data.resultData.floor;
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
  
    getBarangayWithoutPagination() {
      this.isLoaderActive = true;
      ApiService.get("GetBarangayWithoutPagination", {})
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

    getSubdivisionWithoutPagination() {
      this.isLoaderActive = true;
      ApiService.get("GetSubdivisionWithoutPagination", {})
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
        secureLS.get(Global.roleName) === "Admin" ||
        secureLS.get(Global.roleName) === "Super Admin" 
  
      ) {
        this.openPropertyLimitIsDisabled = false;
        this.openPropertyLimit = 5;
      } else  {
        this.openPropertyLimitIsDisabled = true;
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
      this.userTypeItems = array;
    },


    changeProvince() {
      this.isLoaderActive = true;
      ApiService.get("GetBarangayWithoutPagination", {
        townId: this.town,
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
    changeTown() {
      this.isLoaderActive = true;
      ApiService.get("GetTownWithoutPagination", {
      
        provinceId: this.province,
      })
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

    changeBarangay() {

      this.isLoaderActive = true;
      ApiService.get("GetBarangayWithoutPagination", {
        townId: this.town,
  
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
    changeSubdivision() {

      this.isLoaderActive = true;
      ApiService.get("GetSubdivisionWithoutPagination", {
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
      if(this.UserType.name == "Agent" )
      {
        this.sameAsAgency=true;
        this.isAgentOperator = true;
      }
      else
      {
        this.sameAsAgency=false;
        this.isAgentOperator = false;
      }
    },


    // add edit role
    addEditItem() {
      if (this.$refs.holdingFormAddEdit.validate()) {
     
        if (this.isAddEdit && this.addAgentOperatorDataProps == null) {
          // save
          let payload = {
            UserType: this.UserType.id,
            AssociatedAgency:
              this.AssociatedAgency != null
                ? this.AssociatedAgency.toString()
                : null,
            firstName: this.firstName,
            lastName: this.lastName,
            nickName: this.nickName,
            selectDate: this.selectDate,
            sameAsAgency: this.sameAsAgency,
            unitNumber: this.unitNumber,
            houseLotNumber: this.houseLotNumber,
            streetName: this.streetName,
            propertyBuildingName: this.propertyBuildingName,
            subdivision: this.subdivision,
            barangay: this.barangay,
            town: this.town,
            province: this.province,
            zipCode: this.zipCode,
            floorLevel: this.floorLevel,
            subdivision: this.subdivision,
            selectBirthDay: this.selectBirthDay,
            selectBirthMonth: this.selectBirthMonth,
            selectBirthYear: this.selectBirthYear,
            rELicence: this.rELicence,
            userWebsite: this.userWebsite,
            userSkills:
              this.userSkills != null ? this.userSkills.toString() : null,
            profileStatement: this.profileStatement,
            selfBroker: this.selfBroker,

            associatedBroker:
              this.associatedBroker != null
                ? this.associatedBroker.toString()
                : null,
            reasonInactive: this.reasonInactive,
            inactiveUser: this.inactiveUser,
            created_by: this.created_by,
            phone1: this.phone1,
            phone2: this.phone2,
            openPropertyLimit: this.openPropertyLimit,
            activeUserDateLimit: this.activeUserDateLimit,
            email: this.email,
            created_by: Global.loggedInUser,
            user_info: secureLS.get(Global.userId),
          };
          this.isLoaderActive = true;
          ApiService.post(`SaveUser`, payload)
            .then((response) => {
              this.isLoaderActive = false;

              Global.showSuccessAlert(true, "success", response.data.message);
              this.$router.push({
                name: "AgentOperator",
              });
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
          let payload = {
            user_id: this.addAgentOperatorDataProps.user_id,
            UserType: this.UserType,
            AssociatedAgency: this.AssociatedAgency != null ? this.AssociatedAgency.toString() : null,
            firstName: this.firstName,
            lastName: this.lastName,
            nickName: this.nickName,
            selectDate: this.selectDate,
            sameAsAgency: this.sameAsAgency,
            unitNumber: this.unitNumber,
            houseLotNumber: this.houseLotNumber,
            streetName: this.streetName,
            propertyBuildingName: this.propertyBuildingName,
            subdivision: this.subdivision,
            barangay: this.barangay,
            town: this.town,
            province: this.province,
            zipCode: this.zipCode,
            floorLevel: this.floorLevel,
            subdivision: this.subdivision,
            selectBirthDay: this.selectBirthDay,
            selectBirthMonth: this.selectBirthMonth,
            selectBirthYear: this.selectBirthYear,
            rELicence: this.rELicence,
            userWebsite: this.userWebsite,
            userSkills: this.userSkills != null ? this.userSkills.toString() : null,
            profileStatement: this.profileStatement,
            selfBroker: this.selfBroker,

            associatedBroker: this.associatedBroker != null ? this.associatedBroker.toString() : null,
            reasonInactive: this.reasonInactive,
            inactiveUser: this.inactiveUser,
            created_by: this.created_by,
            phone1: this.phone1,
            phone2: this.phone2,
            openPropertyLimit: this.openPropertyLimit,
            activeUserDateLimit: this.activeUserDateLimit,
            email: this.email,
            created_by: Global.loggedInUser,
          };
          this.isLoaderActive = true;
          ApiService.post(`UpdateUser`, payload)
            .then((response) => {
              this.isLoaderActive = false;
              this.$router.push({
                name: "AgentOperator",
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
  }
};
