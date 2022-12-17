import store from "../store/store";
import Swal from "sweetalert2";
import { ApiService } from "../helpers/apiService";
export const Global = {
  //Development Url Environment
  appBaseUrl: "https://mgtspe.dreamplesk.com/public/api/",
  profileImageUrl:
    "https://mgtspe.dreamplesk.com/public/storage/profile_images/",
  propertyImageUrl:
    "https://mgtspe.dreamplesk.com/public/uploads/featuredproperty/images/",
  previewProperty: "https://pecustomer.dreamplesk.com/public/singleproperty/",
  featuredagent: "https://mgtspe.dreamplesk.com/public/uploads/featuredagent/images/",


  // Testing Url Environment
    // appBaseUrl: "https://peapiuat.dreamplesk.com/public/api/",
    // profileImageUrl:
    //   "https://peapiuat.dreamplesk.com/public/storage/profile_images/",
    // propertyImageUrl:
    //   "https://peapiuat.dreamplesk.com/public/uploads/featuredproperty/images/",
    // featuredagent: "https://peapiuat.dreamplesk.com/public/uploads/featuredagent/images/",
    // previewProperty: "https://pecustomeruat.dreamplesk.com/public/singleproperty/",
    

    //Client env

    // appBaseUrl: "https://prodpea.mgts.co.in/api/",
    // profileImageUrl:
    //   "https://prodpea.mgts.co.in/storage/profile_images/",
    // propertyImageUrl:
    //   "https://prodpea.mgts.co.in/uploads/featuredproperty/images/",
    // featuredagent: "https://prodpea.mgts.co.in/uploads/featuredagent/images/",
    // previewProperty: "https://prodpe.mgts.co.in/singleproperty/",

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
      timer:7000
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
      timer:7000
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
  //Change status color of Status
  getStatusColor(is_active) {
    console.log(is_active);
    if (is_active == "Active") return "success";
    else return "error";
  },
  tokenKey: "tokenKey",
  firstNameKey: "firstNameKey",
  lastNameKey: "lastNameKey",
  fullNameKey: "fullNameKey",
  profilePicKey: "profilePicKey",
  userId: "userId",
  roleName: "roleName",
  roleId: "roleId",
  coverImage:"coverImage",

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
  birthYear: [
    "1980",
    "1981",
    "1982",
    "1983",
    "1984",
    "1985",
    "1986",
    "1987",
    "1988",
    "1989",
    "1990",
    "1991",
    "1992",
    "1993",
    "1994",
    "1995",
    "1996",
    "1997",
    "1998",
    "1999",
    "2000",
    "2001",
    "2002",
    "2003",
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2020",
    "2031",
    "2032",
    "2033",
    "2034",
    "2035",
    "2036",
    "2037",
    "2038",
    "2039",
    "2040",
    "2041",
    "2042",
    "2043",
    "2044",
    "2045",
    "2046",
    "2047",
    "2048",
    "2049",
    "2050",
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
