import { Global } from "../../helpers/global";
import { validationMixin } from "../../mixins/validationMixin.js";
import { ApiService } from "../../helpers/apiService";
import SecureLS from "secure-ls";
var secureLS = new SecureLS({ encodingType: "aes" });
export const addPropertyImage = {
         props: ["userPermissionDataProps", "propertyDataProps"],
         mixins: [validationMixin],
         data() {
           return {
             propertyId: null,
             isAddEdit: false,
             propertyName: null,
             propertyAgent: null,
             isFormAddEditValid: false,
             description: null,
             videoDescription: null,
             pnlSettings: null,
             tab: null,
             entity: "Property Image",
             propertyAmeneties: [],
             ameneties: [],
             //Photos & Videos
             imageVideoList: [],
             propertyImageUrl: null,
             selectedPropertyImage: null,
             imageRule: [],
             videoUrl: null,
             isLoaderActive: false,
           };
         },
         created() {
           if (this.propertyDataProps != null) {
             this.propertyId = this.propertyDataProps.id;
             this.propertyName = this.propertyDataProps.property_name;
             this.propertyAgent = this.propertyDataProps.agent_name;
             this.propertyImageUrl = Global.propertyImageUrl;
             this.getAllImagesVideo();
             this.getMasterAmeneties();
             this.getPropertyMasterAmeneties();
           } else {
             this.$router.push({
               name: "PropertyList",
             });
           }
         },

         mounted() {},
         watch: {
           //  selectedPropertyImage(val) {
           //    this.selectedPropertyImage = val;
           //    this.imageRule =
           //      this.selectedPropertyImage != null
           //        ? [
           //            (v) =>
           //              !v ||
           //              v.size <= 1048576 ||
           //              this.$t("label_file_size_criteria_1_mb"),
           //          ]
           //        : [];
           //  },
         },
         methods: {
           uploadImage() {
             if (this.$refs.holdingFormAddEditImage.validate()) {
               this.isLoaderActive = true;
               let postData = new FormData();
               if (this.selectedPropertyImage != null) {
                 postData.append("images_video", this.selectedPropertyImage);
               }

               postData.append("type", "Image");
               postData.append("property_id", this.propertyId);
               postData.append("isDefault", 0);
               postData.append("description", this.description);
               postData.append("created_by", secureLS.get(Global.userId));

               ApiService.post("saveimagesupload", postData)

                 .then((response) => {
                   this.isLoaderActive = false;
                   Global.showSuccessAlert(
                     true,
                     "success",
                     response.data.message
                   );
                   this.selectedPropertyImage = null;
                   this.imageVideoList = this.getAllImagesVideo();
                 })
                 .catch((error) => {
                   this.isLoaderActive = false;
                   if (
                     error.response.status != 401 &&
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
           },

           uploadVideo() {
             if (this.$refs.holdingFormAddEditVideo.validate()) {
               this.isLoaderActive = true;
               let payload = {
                 type: "Video",
                 property_id: this.propertyId,
                 isDefault: 0,
                 description: this.videoDescription,
                 video_link: this.videoUrl,
                 created_by: secureLS.get(Global.userId),
               };

               ApiService.post("saveimagesupload", payload)

                 .then((response) => {
                   this.isLoaderActive = false;
                   Global.showSuccessAlert(
                     true,
                     "success",
                     response.data.message
                   );

                   this.imageVideoList = this.getAllImagesVideo();
                 })
                 .catch((error) => {
                   console.log(error);
                   this.isLoaderActive = false;
                   if (
                     error.response.status != 401 &&
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
           },

           async deleteImageVideo(id) {
             const result = await Global.showConfirmationAlert(
               `Delete Image`,
               "Are you sure to delete",
               "warning"
             );
             if (result.isConfirmed) {
               this.isLoaderActive = true;
               let payload = {
                 image_id: id,
                 property_id: this.propertyId,
               };

               ApiService.post("deletepropertyimages", payload)

                 .then((response) => {
                   this.isLoaderActive = false;
                   Global.showSuccessAlert(
                     true,
                     "success",
                     response.data.message
                   );

                   this.imageVideoList = this.getAllImagesVideo();
                 })
                 .catch((error) => {
                   this.isLoaderActive = false;
                   if (
                     error.response.status != 401 &&
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
           },

           getAllImagesVideo() {
             this.isLoaderActive = true;
             ApiService.get("showallimagesvideo", {
               property_id: this.propertyId,
             })
               .then((response) => {
                 this.isLoaderActive = false;
                 this.imageVideoList = response.data.resultdata;
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

           getMasterAmeneties() {
             this.isLoaderActive = true;
             ApiService.get("GetMasterAmenitiesWithoutPagination", {})
               .then((response) => {
                 this.isLoaderActive = false;
                 this.ameneties = response.data.resultData;
               })
               .catch((error) => {
                 this.isLoaderActive = false;
                 console.log(error);
                 if (
                   error.response.status != 401 &&
                   error.response.status != 403
                 ) {
                   Global.showErrorAlert(true, "error", "Something went wrong");
                 }
               });
           },

           getPropertyMasterAmeneties() {
             this.isLoaderActive = true;
             ApiService.get("getSelectedPropertyAmenities", {
               propertyId: this.propertyId,
             })
               .then((response) => {
                 this.isLoaderActive = false;
                 for (let x = 0; x < response.data.resultData.length; x++) {
                   this.propertyAmeneties.push(
                     response.data.resultData[x].amenities_id
                   );
                 }
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

           saveAmeneties() {
             this.isLoaderActive = true;

             ApiService.post("savePropertyMappingAmenities", {
               ammentiesId: this.propertyAmeneties.toString(),
               propertyId: this.propertyId,
               created_by: secureLS.get(Global.userId),
             })

               .then((response) => {
                 this.isLoaderActive = false;
                 Global.showSuccessAlert(
                   true,
                   "success",
                   response.data.message
                 );
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
          

           async makeDefault(item) {
            console.log(item)
             const result = await Global.showConfirmationAlert(
               `Make Default`,
               "Are you sure to mark the image as default",
               "warning"
             );
             if (result.isConfirmed) {
               this.isLoaderActive = true;
               let payload = {
                 image_id: item.id,
                 property_id: item.property_id,
                 isDefault: 1,
               };

               ApiService.post("propertyimagesisDefault", payload)

                 .then((response) => {
                   this.isLoaderActive = false;
                   Global.showSuccessAlert(
                     true,
                     "success",
                     response.data.message
                   );

                   this.imageVideoList = this.getAllImagesVideo();
                 })
                 .catch((error) => {
                   this.isLoaderActive = false;
                   if (
                     error.response.status != 401 &&
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
           },
         },
       };
