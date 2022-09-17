import store from "../store/store";
import Swal from "sweetalert2";
import { ApiService } from "../helpers/apiService";
export const Global = {
  appBaseUrl: "https://mgtspe.dreamplesk.com/public/api/",
  profileImageUrl:
    "https://mgtspe.dreamplesk.com/public/storage/profile_images/",
  propertyImageUrl:
    "https://mgtspe.dreamplesk.com/public/uploads/featuredproperty/images/",
  getBaseUrl() {
    return this.appBaseUrl;
  },
  getAll(endPoint, payload) {
    return new ApiService.get(endPoint, payload)
      .then((response) => {
        return response.data.resultData;
      })
      .catch((error) => {
        if (error.response.status != 401 && error.response.status != 403) {
          this.showErrorAlert(true, "error", "Something went wrong");
        }
      });
  },
  showErrorAlert(isToast, icon, title) {
    var content = "<strong><font color='white'>" + title + "</font></strong>";
    Swal.fire({
      toast: isToast,
      showCloseButton: true,
      position: "top-end",
      icon: icon,
      html: content,
      iconColor: "white",
      showConfirmButton: false,
      background: "red",
    });
  },

  showSuccessAlert(isToast, icon, title) {
    var content = "<strong><font color='white'>" + title + "</font></strong>";
    Swal.fire({
      toast: isToast,
      showCloseButton: true,
      position: "top-end",
      icon: icon,
      html: content,
      iconColor: "white",
      showConfirmButton: false,
      background: "green",
    });
  },

  async showConfirmationAlert(title, text, icon) {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    });
  },
  async showAlert(title, text, icon) {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cancel",
    });
  },
  tokenKey: "tokenKey",
  firstNameKey: "firstNameKey",
  lastNameKey: "lastNameKey",
  fullNameKey: "fullNameKey",
  profilePicKey: "profilePicKey",
  userId: "userId",
  roleName: "roleName",
  roleId: "roleId",

  //Global props
  CompanyName: "RealEstateList.ph",
  menuColor: "#6200EE",
  menuClass: "mb-1 pl-4",
  loggedInUser: 1,
  yesNo: ["Yes", "No"],
  monthDays: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ],
  birthMonth: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  birthDays: [],
  populateBirthDay(Month) {
    this.birthDays = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
    ];
    if (Month == "February") {
      this.birthDays.splice(29, 3);
      return this.birthDays;
    } else if (
      Month == "April" ||
      Month == "June" ||
      Month == "September" ||
      Month == "November"
    ) {
      this.birthDays.splice(30, 1);
      return this.birthDays;
    }
    return this.birthDays;
  },
};
