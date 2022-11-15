import { Global } from "../../helpers/global";
import { validationMixin } from "../../mixins/validationMixin.js";
import { ApiService } from "../../helpers/apiService";
import SecureLS from "secure-ls";
var secureLS = new SecureLS({ encodingType: "aes" });
export const addProperty = {
         props: ["userPermissionDataProps", "propertyDataProps"],
         mixins: [validationMixin],
         data() {
           return {
             //General
             isLoaderActive: false,
             pnlSettings: null,
             // Basic Information

             agentId:
               this.propertyDataProps != null
                 ? this.propertyDataProps.agent_id
                 : null,
             agentItems: [],

             sellerId:
               this.propertyDataProps != null
                 ? this.propertyDataProps.seller_id
                 : null,
             sellerItems: null,

             isFeatured:
               this.propertyDataProps != null
                 ?this.propertyDataProps.isFeatured=="1"?"Yes":"No"
                 : null,
             featureItems: ["Yes", "No"],
             furnishing:  this.propertyDataProps != null
             ? this.propertyDataProps.furnishing
             : null,

             priceAsked:
               this.propertyDataProps != null
                 ? this.propertyDataProps.price_asked
                 : null,
             landArea:
               this.propertyDataProps != null
                 ? this.propertyDataProps.land_area
                 : null,
             propertyDescription:
               this.propertyDataProps != null
                 ? this.propertyDataProps.property_description
                 : null,
             propertyHeadline:
               this.propertyDataProps != null
                 ? this.propertyDataProps.property_headline
                 : null,
             propertyName:
               this.propertyDataProps != null
                 ? this.propertyDataProps.property_name
                 : null,
             buildingArea:
               this.propertyDataProps != null
                 ? this.propertyDataProps.building_area
                 : null,
             productCategory:
               this.propertyDataProps != null
                 ? this.propertyDataProps.product_category_id
                 : null,
             propertyClassification:
               this.propertyDataProps != null
                 ? this.propertyDataProps.property_classification_id
                 : null,
             propertyType:
               this.propertyDataProps != null
                 ? this.propertyDataProps.property_type_id
                 : null,
             agryId:
               this.propertyDataProps != null
                 ? this.propertyDataProps.agri_type
                 : null,
             agryItems: [],
             priceRented:
                this.propertyDataProps != null
                 ? this.propertyDataProps.price_rented
                 : null,
             priceSoldFor:
                this.propertyDataProps != null
                 ? this.propertyDataProps.price_sold_for
                 : null,
             zonalValue:
                this.propertyDataProps != null
                 ? this.propertyDataProps.zonal_value
                 : null,
             zonningCode:
                this.propertyDataProps != null
                 ? this.propertyDataProps.zonning_code
                 : null,



             selectDate: null,
             //Address
             unitNumber:
               this.propertyDataProps != null
                 ? this.propertyDataProps.unit_no
                 : null,
             houseLotNumber:
               this.propertyDataProps != null
                 ? this.propertyDataProps.house_lot_no
                 : null,
             streetName:
               this.propertyDataProps != null
                 ? this.propertyDataProps.street_name
                 : null,
             propertyBuildingName:
               this.propertyDataProps != null
                 ? this.propertyDataProps.property_building_name
                 : null,
             subdivision:
               this.propertyDataProps != null
                 ? this.propertyDataProps.subdivision_id
                 : null,
             barangay:
               this.propertyDataProps != null
                 ? this.propertyDataProps.barangay_id
                 : null,
             town:
               this.propertyDataProps != null
                 ? this.propertyDataProps.town_id
                 : null,
             province:
               this.propertyDataProps != null
                 ? this.propertyDataProps.province_id
                 : null,
             zipCode:
               this.propertyDataProps != null
                 ? this.propertyDataProps.zipcode
                 : null,
             floorLevel:
               this.propertyDataProps != null
                 ? this.propertyDataProps.select_floor_level
                 : null,

             //Property Type
             numberBedrooms:
               this.propertyDataProps != null
                 ? this.propertyDataProps.no_bedrooms
                 : null,
             numberToilets:
               this.propertyDataProps != null
                 ? this.propertyDataProps.no_toilets
                 : null,
             carSpacesUncovered:
               this.propertyDataProps != null
                 ? this.propertyDataProps.car_spaces_uncovered_property
                 : null,
             garageSpacesCovered:
               this.propertyDataProps != null
                 ? this.propertyDataProps.garage_spaces_covered_property
                 : null,

             longitude:
               this.propertyDataProps != null
                 ? this.propertyDataProps.longitude
                 : null,
             latitude:
               this.propertyDataProps != null
                 ? this.propertyDataProps.latitude
                 : null,

             //For Rent
             rentalPriceAsked:
               this.propertyDataProps != null
                 ? this.propertyDataProps.rental_price_asked
                 : null,
             minimumRentalPeriod:
               this.propertyDataProps != null
                 ? this.propertyDataProps.minimum_rental_period_rent
                 : 6,
             maximumRentalPeriod:
               this.propertyDataProps != null
                 ? this.propertyDataProps.car_spaces_rent
                 : 12,
             dayMonthRentDue:
               this.propertyDataProps != null
                 ? this.propertyDataProps.date_of_month_rent_due
                 : null,
             periodCanExtend:
               this.propertyDataProps != null
                 ? this.propertyDataProps.period_can_extend
                 : null,
             picker: null,
             currentRentalExpires:
               this.propertyDataProps != null
                 ? this.propertyDataProps.current_rental_expires
                 : new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                     .toISOString()
                     .substr(0, 10),
             menuCurrentRentalExpires: false,
             menuDateRentalStarted: false,
             menuDateSoldSwitchOn:false,
             menuActiveDateSwitchOn:false,
             dateRentalStarted:
               this.propertyDataProps != null
                 ? this.propertyDataProps.date_rental_started
                 : new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                     .toISOString()
                     .substr(0, 10),
             menuRentalSwitchOn: false,
             rentalSwitchOn:
               this.propertyDataProps != null
                 ? this.propertyDataProps.rental_switch_on
                 : new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                     .toISOString()
                     .substr(0, 10),

             //Sale
             salePriceAsked:
               this.propertyDataProps != null
                 ? this.propertyDataProps.sale_price
                 : null,
             pricePerSqm:
               this.propertyDataProps != null
                 ? this.propertyDataProps.price_per_sq_m
                 : null,
             productMode:
               this.propertyDataProps != null
                 ? this.propertyDataProps.minimum_rental_period_sale
                 : null,
             dateFirstAdded:
                this.propertyDataProps != null
                   ? this.propertyDataProps.date_first_added
                   : null,
             dateLastModified:
                this.propertyDataProps != null
                   ? this.propertyDataProps.date_last_modified
                   : null,
             dateLastStatusChange:
                this.propertyDataProps != null
                   ? this.propertyDataProps.date_last_status_change
                   : null,
             dateSuspended:
                this.propertyDataProps != null
                   ? this.propertyDataProps.date_suspended
                   : null,
             suspendedReason:
                this.propertyDataProps != null
                   ? this.propertyDataProps.suspended_reason
                   : null,
             userType:
                this.propertyDataProps != null
                   ? this.propertyDataProps.user_type
                   : null,
             dateModifiedOperator:
                this.propertyDataProps != null
                   ? this.propertyDataProps.date_modified_operator
                   : null,
             operatorName:
                this.propertyDataProps != null
                   ? this.propertyDataProps.operator_name
                   : null,
             rentalPricingUnit:
               this.propertyDataProps != null
             ? this.propertyDataProps.rental_pricing_unit
             : "Month",
            dateSold:
             this.propertyDataProps != null
           ? this.propertyDataProps.date_sold
           : null,
             associatedBroker:
             this.propertyDataProps != null
               ? this.propertyDataProps.associated_broker_id
               : null,
             //Items
             propertyClassificationItems: [],
             productCategoryItems: [],
             propertyTypeItems: [],
             floorLevelItems: ["Basement", "Ground", "First", "Second"],
             agencyProvinceItems: [],
             associatedBrokerItems: [],
             status:  this.propertyDataProps != null
             ? this.propertyDataProps.status
             : null,

             statusItems: [
              {
                "text": "Open",
                "value": "Open"
              },
              {
                "text": "Sold",
                "value": "Sold"
              },
              {
                "text": "Pending",
                "value": "Pending"
              },
              {
                "text": "Archived",
                "value": "Archived"
              },
              {
                "text": "Suspended",
                "value": "Suspended"
              },
             ],

             townItems: [],
             provinceItems: [],
             barangayItems: [],
             subdivisionItems: [],

             //Property Type Items
             numberBedroomsItems: ["0","1", "2", "3", "4", "5","6","7","8","9","99"],
             numberToiletsItems:["0","1", "2", "3", "4", "5","6","7","8","9","99"],
             carSpacesUncoveredItems: ["0","1", "2", "3", "4", "5","6","7","8","9","99"],
             garageSpacesCoveredItems: ["0","1", "2", "3", "4", "5","6","7","8","9","99"],
             furnishingItems: [
               "None",
               "Fully Furnished",
               "Semi Furnished",
               "Basic Furnishing",
             ],

             //For Rent
             rentalPricingUnitItems:[ "Month","Day", "Week","Session","Hour"],
             minimumRentalPeriodItems: ["Day", "Week", "Month", "Negotiable"],
             maximumRentalPeriodItems: ["Day", "Week", "Month"],
             dayMonthRentDueItems: Global.monthDays,
             garageSpacesCoveredItems:  ["0","1", "2", "3", "4", "5","6","7","8","9","99"],
             periodCanExtendItems: Global.yesNo,
             //Sale
             productModeItems: ["Newly Built", "Renovated", "For Resale"],
             saleSwitchOn:
               this.propertyDataProps != null
                 ? this.propertyDataProps.sale_switch_on
                 : new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                     .toISOString()
                     .substr(0, 10),
             dateSoldSwitchOn:   this.propertyDataProps != null
             ? this.propertyDataProps.date_sold
             : new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                 .toISOString()
                 .substr(0, 10),
             activedateSwitchOn:   this.propertyDataProps != null
                 ? this.propertyDataProps.active_property_date_limit
                 : new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                     .toISOString()
                     .substr(0, 10),
            nowDate: new Date().toISOString().slice(0,10),
            date: new Date(), 
           
            landscape: false,
            reactive: false,


             menuSaleSwitchOn: false,
             //Details & Features
             heatingTypeItems: ["Forced Air"],
             exteriorItems: ["Finish Brick"],
             kitchenFeaturesItems: ["Modern Kitchen"],
             coolingItems: ["Central AC"],

             garage:
               this.propertyDataProps != null
                 ? this.propertyDataProps.garage
                 : false,
             cooling:
               this.propertyDataProps != null
                 ? this.propertyDataProps.cooling
                 : null,
             heatingtype:
               this.propertyDataProps != null
                 ? this.propertyDataProps.heatingtype
                 : null,
             elevator:
               this.propertyDataProps != null
                 ? this.propertyDataProps.elevator
                 : false,
             freewifi:
               this.propertyDataProps != null
                 ? this.propertyDataProps.freewifi
                 : false,
             exteriour:
               this.propertyDataProps != null
                 ? this.propertyDataProps.exteriour
                 : null,
             kitchen:
               this.propertyDataProps != null
                 ? this.propertyDataProps.kitchen
                 : null,
             fireplace:
               this.propertyDataProps != null
                 ? this.propertyDataProps.fireplace
                 : false,
             swimmingPool:
               this.propertyDataProps != null
                 ? this.propertyDataProps.swimming_pool
                 : false,

             tab: null,

             pagination: {},
             entity: "Add Property",
             isFormAddEditValid: false,
             isItemLoading: false,

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

         computed: {
          getEndDate() {
           var endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 12, 10);
           return endDate.toISOString().slice(0,10)
          }
        },

         async created() {
        
          //get broker
           this.getBroker();
           //get agent
        
           this.getAgent();
           //get seller
           this.getSeller();
         
           //get province
           await this.getProvince();

           //get property classification
           this.getPropertyClassification();

           //get property type
           this.getPropertyType();
           //get product category
           this.getProductCategory();

           //get agri type
           this.getAgriType();
           if(this.propertyDataProps!=null)
           {
            this.changeProvince();
            this.changeTown();
            this.changeBarangay();
           }
           //get Status
          
        
         },

         methods: {
          //get broker without pagination
          getBroker() {
         
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
      
           //get agent
           getAgent() {
             this.isLoaderActive = true;
             ApiService.get("allagents", {})
               .then((response) => {
                 this.isLoaderActive = false;

                 this.agentItems = response.data.data;
               })
               .catch((error) => {
                 this.isLoaderActive = false;
                 if (
                   error.response.status != 401 &&
                   error.response.status != 403
                 ) {
                   Global.showErrorAlert(true, "error", "Something went wrong");
                 }
               });
           },

           //get seller
           getSeller() {
             this.isLoaderActive = true;
             ApiService.get("GetSellerWithoutPagination", {})
               .then((response) => {
                 this.isLoaderActive = false;

                 this.sellerItems = response.data.resultData;
               })
               .catch((error) => {
                 this.isLoaderActive = false;
                 if (
                   error.response.status != 401 &&
                   error.response.status != 403
                 ) {
                   Global.showErrorAlert(true, "error", "Something went wrong");
                 }
               });
           },
          
           // get property classification
           getPropertyClassification() {
             this.isLoaderActive = true;
             ApiService.get("GetPropertyClassificationWithoutPagination", {})
               .then((response) => {
                 this.isLoaderActive = false;

                 this.propertyClassificationItems = response.data.resultData;
               })
               .catch((error) => {
                 this.isLoaderActive = false;
                 if (
                   error.response.status != 401 &&
                   error.response.status != 403
                 ) {
                   Global.showErrorAlert(true, "error", "Something went wrong");
                 }
               });
           },
           // get property type
           getPropertyType() {
             this.isLoaderActive = true;
             ApiService.get("GetPropertyTypeWithoutPagination", {})
               .then((response) => {
                 this.isLoaderActive = false;

                 this.propertyTypeItems = response.data.resultData;
               })
               .catch((error) => {
                 this.isLoaderActive = false;
                 if (
                   error.response.status != 401 &&
                   error.response.status != 403
                 ) {
                   Global.showErrorAlert(true, "error", "Something went wrong");
                 }
               });
           },
           // get product category
           getProductCategory() {
             this.isLoaderActive = true;
             ApiService.get("GetProductCategoryWithoutPagination", {})
               .then((response) => {
                 this.isLoaderActive = false;

                 this.productCategoryItems = response.data.resultData;
               })
               .catch((error) => {
                 this.isLoaderActive = false;
                 if (
                   error.response.status != 401 &&
                   error.response.status != 403
                 ) {
                   Global.showErrorAlert(true, "error", "Something went wrong");
                 }
               });
           },

           // get agri type ;
           getAgriType() {
             this.isLoaderActive = true;
             ApiService.get("GetAgriTypeWithoutPagination", {})
               .then((response) => {
                 this.isLoaderActive = false;

                 this.agryItems = response.data.resultData;
               })
               .catch((error) => {
                 this.isLoaderActive = false;
                 if (
                   error.response.status != 401 &&
                   error.response.status != 403
                 ) {
                   Global.showErrorAlert(true, "error", "Something went wrong");
                 }
               });
           },
         

            //#region getBrokerProvinceItems
    async getProvince() {
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
          provinceId: this.province,
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
          townId: this.town
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
          barangayId: this.barangay,
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

           // add Property
           addEditItem() {
             console.log(this.$refs.holdingFormAddEdit.validate());
             if (this.$refs.holdingFormAddEdit.validate()) {
               if (this.isAddEdit && this.propertyDataProps==null) {
                 // save
                 let payload = {
                   seller_id: this.sellerId,
                   user_type: secureLS.get(Global.roleId),
                   user_id: secureLS.get(Global.userId),
                   price_asked: this.priceAsked,
                   land_area: this.landArea,
                   building_area: this.buildingArea,
                   property_name: this.propertyName,
                   property_headline: this.propertyHeadline,
                   property_description: this.propertyDescription,
                   property_classification_id: this.propertyClassification,
                   property_type_id: this.propertyType,
                   product_category_id: this.productCategory,
                   unit_no: this.unitNumber,
                   house_lot_no: this.houseLotNumber,
                   street_name: this.streetName,
                   property_building_name: this.propertyBuildingName,
                   barangay_id: this.barangay,
                   town_id: this.town,
                   province_id: this.province,
                   subdivison_id: this.subdivision,
                   zipcode: this.zipCode,
                   no_bedrooms: this.numberBedrooms,
                   no_toilets: this.numberToilets,
                   longitude: this.longitude,
                   latitude: this.latitude,
                   garage: this.garage ? "Yes" : "No",
                   cooling: this.cooling,
                   heatingtype: this.heatingtype,
                   elevator: this.elevator ? "Yes" : "No",
                   freewifi: this.freewifi ? "Yes" : "No",
                   exteriour: this.exteriour,
                   kitchen: this.kitchen,
                   year: moment().format("YYYY"),
                   isFeatured: this.isFeatured == "Yes" ? 1 : 0,
                   agent_id: this.agentId,
                   rental_price_asked: this.rentalPriceAsked,
                   minimum_rental_period_rent: this.minimumRentalPeriod,
                   car_spaces_rent: this.maximumRentalPeriod,
                   date_of_month_rent_due: this.dayMonthRentDue,
                   period_can_extend: this.periodCanExtend,
                   date_rental_started: this.dateRentalStarted,
                   sale_price: this.salePriceAsked,
                   sale_switch_on: this.saleSwitchOn,
                   price_per_sq_m: this.pricePerSqm,
                   select_floor_level: this.floorLevel,
                   current_rental_expires: this.currentRentalExpires,
                   rental_switch_on: this.rentalSwitchOn,
                   car_spaces_uncovered_property: this.carSpacesUncovered,
                   garage_spaces_covered_property: this.garageSpacesCovered,
                   minimum_rental_period_sale: this.productMode,
                   fireplace: this.fireplace ? "Yes" : "No",
                   swimming_pool: this.swimmingPool ? "Yes" : "No",
                   created_by: secureLS.get(Global.userId),
                   agri_type: this.agryId,
                   furnishing: this.furnishing,
                 };

                 this.isLoaderActive = true;
                 ApiService.post(`saveproperty`, payload)
                   .then((response) => {
                     this.isLoaderActive = false;

                     Global.showSuccessAlert(
                       true,
                       "success",
                       response.data.message
                     );
                     this.$router.push({
                       name: "PropertyList",
                     });
                   })
                   .catch((error) => {
                     this.isLoaderActive = false;
                     if (
                       error.response.status != 401 ||
                       error.response.status != 403
                     ) {
                       Global.showErrorAlert(
                         true,
                         "error",
                         "Something went wrong"
                       );
                     }
                   });
               } else {
                 console.log(this.status);
                  let payload = {
                    id:this.propertyDataProps.id,
                    seller_id: this.sellerId,
                    user_type: secureLS.get(Global.roleId),
                    user_id: secureLS.get(Global.userId),
                    price_asked: this.priceAsked,
                    land_area: this.landArea,
                    building_area: this.buildingArea,
                    property_name: this.propertyName,
                    property_headline: this.propertyHeadline,
                    property_description: this.propertyDescription,
                    property_classification_id: this.propertyClassification,
                    property_type_id: this.propertyType,
                    product_category_id: this.productCategory,
                    unit_no: this.unitNumber,
                    house_lot_no: this.houseLotNumber,
                    street_name: this.streetName,
                    property_building_name: this.propertyBuildingName,
                    barangay_id: this.barangay,
                    town_id: this.town,
                    province_id: this.province,
                    subdivison_id: this.subdivision,
                    zipcode: this.zipCode,
                    no_bedrooms: this.numberBedrooms,
                    no_toilets: this.numberToilets,
                    longitude: this.longitude,
                    latitude: this.latitude,
                    garage: this.garage ? "Yes" : "No",
                    cooling: this.cooling,
                    heatingtype: this.heatingtype,
                    elevator: this.elevator ? "Yes" : "No",
                    freewifi: this.freewifi ? "Yes" : "No",
                    exteriour: this.exteriour,
                    kitchen: this.kitchen,
                    year: moment().format("YYYY"),
                    isFeatured: this.isFeatured == "Yes" ? 1 : 0,
                    agent_id: this.agentId,
                    rental_price_asked: this.rentalPriceAsked,
                    minimum_rental_period_rent: this.minimumRentalPeriod,
                    car_spaces_rent: this.maximumRentalPeriod,
                    date_of_month_rent_due: this.dayMonthRentDue,
                    period_can_extend: this.periodCanExtend,
                    date_rental_started: this.dateRentalStarted,
                    sale_price: this.salePriceAsked,
                    sale_switch_on: this.saleSwitchOn,
                    price_per_sq_m: this.pricePerSqm,
                    select_floor_level: this.floorLevel,
                    current_rental_expires: this.currentRentalExpires,
                    rental_switch_on: this.rentalSwitchOn,
                    car_spaces_uncovered_property: this.carSpacesUncovered,
                    garage_spaces_covered_property: this.garageSpacesCovered,
                    minimum_rental_period_sale: this.productMode,
                    fireplace: this.fireplace ? "Yes" : "No",
                    swimming_pool: this.swimmingPool ? "Yes" : "No",
                    created_by: secureLS.get(Global.userId),
                    agri_type: this.agryId,
                    furnishing: this.furnishing,
                    status: this.status,
                    suspendedReason: this.suspendedReason,
                    priceRented:this.priceRented,
                    priceSoldFor:this.priceSoldFor,
                    zonalValue:this.zonalValue,
                    zonningCode:this.zonningCode,
                    active_date:this.activedateSwitchOn
                  };

                  this.isLoaderActive = true;
                  ApiService.post(`updateproperty`, payload)
                    .then((response) => {
                      this.isLoaderActive = false;

                      Global.showSuccessAlert(
                        true,
                        "success",
                        response.data.message
                      );
                      this.$router.push({
                        name: "PropertyList",
                      });
                    })
                    .catch((error) => {
                      this.isLoaderActive = false;
                      if (
                        error.response.status != 401 ||
                        error.response.status != 403
                      ) {
                        Global.showErrorAlert(
                          true,
                          "error",
                          "Something went wrong"
                        );
                      }
                    });
               }
             }
           },
         },
       };
