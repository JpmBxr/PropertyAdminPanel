
import { Global } from "../../helpers/global";
import { validationMixin } from "../../mixins/validationMixin.js";
import { ApiService } from "../../helpers/apiService";
export const property = {
         components: {
         },
         props: ["userPermissionDataProps"],
         mixins: [validationMixin],
         data() {
           return {
             // Property listing
             isLoaderActive: false,
             propertyListItem: [],
             propertyImageUrl: null,
             socials: [
               {
                 icon: "mdi-facebook",
                 color: "indigo",
               },
               {
                 icon: "mdi-linkedin",
                 color: "cyan darken-1",
               },
               {
                 icon: "mdi-instagram",
                 color: "red lighten-3",
               },
             ],

             //Property Search
             searchText: "",
             propertyItem: {},

             // add edit
             entity: "Property Listing",

             //end
           };
         },

         created() {
           this.propertyImageUrl = Global.propertyImageUrl;
           this.getPropertyList();
         },

         methods: {
           //#region Get Property List
           getPropertyList() {
             this.isLoaderActive = true;
             ApiService.get(
               `allproperty?searchText=${
                 this.searchText
               }&user_id=${secureLS.get(Global.userId)}`,
               {}
             )
               .then((response) => {
                 this.isLoaderActive = false;
                 this.propertyListItem = response.data.resultData.data;
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

           //#endregion

           //Add Edit Image
           addEditImage(item) {
             this.$router.push({
               name: "AddPropertyImage",
               params: { propertyDataProps: item },
             });
           },

           // search
           searchInfo() {
             clearTimeout(this._timerId);
             this._timerId = setTimeout(() => {
               this.getPropertyList();
             }, 500);
           },

           //Go to add property
           goToAddProperty() {
             this.$router.push({
               name: "AddProperty",
             });
           },

           //Go to edit property
           goToEditProperty(item) {
           
             this.$router.push({
               name: "AddProperty",
               params: { propertyDataProps: item },
             });
           },

          

           // Show Agent Phone Number
           async showAgentPhoneNumber(item) {
             await Global.showAlert(
               `Primary Phone Number : ${item.phone_1}`,
               `Secondary Phone Number : ${item.phone_2}`,
               "success"
             );
           },
         },
       };
