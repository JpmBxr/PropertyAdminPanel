import { validationMixin } from "../../mixins/validationMixin";
import { Global } from "../../helpers/global";
import SecureLS from "secure-ls";
import { ApiService } from "@/helpers/apiService";
import router from "../../router/router";
const secureLS = new SecureLS({ encodingType: "aes" });
import { mapActions, mapGetters } from "vuex";
export const home = {
  mixins: [validationMixin],
  //#region - Data Section
  data() {
    return {
      //#region - Notification
      fav: true,
      menu: false,
      message: false,
      hints: true,
      unreadNotifiction: 0,
      items_notification: [],
      divider: true,
      items: [],

      //#endregion
      //#region - Side Bar Data
      sideMenu: true,
      toggleMini: false,
      toggleNavbar: true,
      CompanyName: Global.CompanyName,
      //#endregion

      //#region - Logged User Data
      loggedUserFullName: secureLS.get(Global.fullNameKey),
      loggedUserInitials:
        secureLS.get(Global.firstNameKey).substring(0, 1) +
        secureLS.get(Global.lastNameKey).substring(0, 1),

      //#endregion
      menuClass: Global.menuClass,
      menuColor: Global.menuColor,
      menuItems: [
        {
          text: "Role",
          icon: "mdi-account",
          to: "/home/master/role/role-master",
        },
        {
          text: "Province",
          icon: "mdi-account-multiple",
          to: "/home/master/province/province-master",
        },
        {
          text: "Town",
          icon: "mdi-city",
          to: "/home/master/town/town-master",
        },
        {
          text: "Barangay",
          icon: "mdi-home-account",
          to: "/home/master/barangay/barangay-master",
        },
        {
          text: "Subdivision",
          icon: "mdi-office-building",
          to: "/home/master/subdivision/subdivision-master",
        },
        {
          text: "Capability",
          icon: "mdi-file-video",
          to: "/home/master/capability/capability-master",
        },
        {
          text: "Category",
          icon: "mdi-point-of-sale",
          to: "/home/master/category/category-master",
        },
        {
          text: "Product Mode",
          icon: "mdi-newspaper-variant",
          to: "/home/master/productMode/productMode-master",
        },
        {
          text: "Property Type",
          icon: "mdi-newspaper-variant",
          to: "/home/master/propertyType/propertyType-master",
        },
        {
          text: "Agri Type",
          icon: "mdi-island",
          to: "/home/master/agriType/agriType-master",
        },
        {
          text: "Property Classification",
          icon: "mdi-newspaper-variant",
          to:
            "/home/master/propertyClassification/propertyClassification-master",
        },
        {
          text: "Zonning Code",
          icon: "mdi-newspaper-variant",
          to: "/home/master/zonningCode/zonningCode-master",
        },
        {
          text: "Specialization",
          icon: "mdi-newspaper-variant",
          to: "/home/master/specialization/specialization-master",
        },
        {
          text: "User Skills",
          icon: "mdi-newspaper-variant",
          to: "/home/master/userSkills/userSkills-master",
        },
      ],

      menuItemsUsers: [
        {
          text: "Users",
          icon: "mdi-account-circle",
          to: "/home/users/AgentOperator/agent-operator",
        },
        {
          text: "Approve User",
          icon: "mdi-account-circle",
          to: "/home/users/ApproveUser/approve-user",
        },
        {
          text: "Agency",
          icon: "mdi-account-circle",
          to: "/home/Agency/agency",
        },
        {
          text: "Broker",
          icon: "mdi-account-circle",
          to: "/home/Broker/broker",
        },
        {
          text: "Broker Association",
          icon: "mdi-account-circle",
          to: "/home/Broker/broker-association",
        },
        {
          text: "Seller",
          icon: "mdi-account-circle",
          to: "/home/Seller/seller",
        },
      ],

      menuItemsProperty: [
        {
          text: "Property List",
          icon: "mdi-home-analytics",
          to: "/home/Property/property-list",
        },
        // {
        //   text: "Add Property",
        //   icon: "mdi-home-plus-outline",
        //   to: "/home/Agency/agency",
        // },
        // {
        //   text: "Property Search",
        //   icon: "mdi-home-search-outline",
        //   to: "/home/Broker/broker",
        // },
        // {
        //   text: "Property Settings",
        //   icon: "mdi-message-cog-outline",
        //   to: "/home/Broker/broker",
        // },
      ],
      menuItemsSettings: [
        {
          text: "Role Permissions",
          icon: "mdi-account-cog",
          to: "/home/permission/role-permission-list",
        },
        {
          text: "Notification",
          icon: "mdi-bell-ring-outline",
          to: "/home/notification/notification-list",
        },
      ],
      menuItemsReports: [
        {
          text: "Skill Based User",
          icon: "mdi-chevron-double-right",
          to: "/home/reports/user-based-skill",
        },
        {
          text: "Agents",
          icon: "mdi-chevron-double-right",
          to: "/home/reports/agents",
        },
        {
          text: "Agencies",
          icon: "mdi-chevron-double-right",
          to: "/home/reports/agencies",
        },
        {
          text: "Brokers",
          icon: "mdi-chevron-double-right",
          to: "/home/reports/brokers",
        },
        {
          text: "Broker Associations",
          icon: "mdi-chevron-double-right",
          to: "/home/reports/broker-associations",
        },
        {
          text: "Agents Based Agency",
          icon: "mdi-chevron-double-right",
          to: "/home/reports/agents-based-agency",
        },
        {
          text: "Property Based Broker",
          icon: "mdi-chevron-double-right",
          to: "/home/reports/property-based-broker",
        },
        {
          text: "Agency linked Broker",
          icon: "mdi-chevron-double-right",
          to: "/home/permission/role-permission-list",
        },
        {
          text: "Broker Linked Broker Associations",
          icon: "mdi-chevron-double-right",
          to: "/home/reports/broker-linked-broker-associations",
        },
        {
          text: "Sellers",
          icon: "mdi-chevron-double-right",
          to: "/home/reports/sellers",
        },
        {
          text: "User List",
          icon: "mdi-chevron-double-right",
          to: "/home/reports/user-list",
        },
        {
          text: "User To Activated",
          icon: "mdi-chevron-double-right",
          to: "/home/reports/user-to-activated",
        },
        {
          text: "Individuals",
          icon: "mdi-chevron-double-right",
          to: "/home/reports/individuals",
        },
        {
          text: "Sold Rent",
          icon: "mdi-chevron-double-right",
          to: "/home/reports/sold-rent",
        },
        {
          text: "Property attachments",
          icon: "mdi-chevron-double-right",
          to: "/home/reports/property-attachments",
        },
        {
          text: "User Count Property",
          icon: "mdi-chevron-double-right",
          to: "/home/reports/user-count-property",
        },
        {
          text: "List of Open/Pending Properties",
          icon: "mdi-chevron-double-right",
          to: "/home/reports/open-pending",
        },
      ],
      //#region - Theme Data
      isDarkMode: false,
      themeId: "",
      themeName: "",
      themes: [
        {
          themeData: {
            Id: 2,
            name: "Blue",
            dark: {
              primary: "#3366FF",
              accent: "#e83e8c",
              secondary: "#425761",
              success: "#00d68f",
              info: "#0095ff",
              warning: "#ffaa00",
              error: "#ff3d71",
              background: "#151a30",
              cardbackground: "#222b45",
              appbar: "#222B45",
              appbarcontent: "#fff",
              sidepanel: "#222B45",
              primaryBtn: "#598bff",
              secondaryBtn: "#607d8b",
              textBtn: "#fff",
            },
            light: {
              primary: "#3366FF",
              accent: "#e83e8c",
              secondary: "#33393e",
              success: "#00d68f",
              info: "#0095ff",
              warning: "#ffaa00",
              error: "#ff3d71",
              background: "#edf1f7",
              cardbackground: "#FFFFFF",
              appbar: "#fff",
              appbarcontent: "#212121",
              sidepanel: "#FFFFFF",
              primaryBtn: "#598bff",
              secondaryBtn: "#6c757d",
              textBtn: "#fff",
            },
          },
        },
        {
          themeData: {
            Id: 6,
            name: "Orange",
            dark: {
              primary: "#ffa450",
              accent: "#FFCA28",
              secondary: "#425761",
              success: "#00d68f",
              info: "#0095FF",
              warning: "#FFAA00",
              error: "#ff3d71",
              background: "#161B30",
              cardbackground: "#222B45",
              appbar: "#222B45",
              appbarcontent: "#fff",
              sidepanel: "#222B45",
              primaryBtn: "#ffc94d",
              secondaryBtn: "#607d8b",
              textBtn: "#fff",
            },
            light: {
              primary: "#ffa450",
              accent: "#a1e754",
              secondary: "#33393e",
              success: "#00d68f",
              info: "#0095FF",
              warning: "#FFAA00",
              error: "#ff3d71",
              background: "#EBEFF5",
              cardbackground: "#FFFFFF",
              appbar: "#6200EE",
              appbarcontent: "#fff",
              sidepanel: "#D3D3D3",
              primaryBtn: "#ffc94d",
              secondaryBtn: "#6c757d",
              textBtn: "#fff",
            },
          },
        },

        {
          themeData: {
            Id: 1,
            name: "Purple",
            dark: {
              primary: "#6200EE",
              accent: "#FFCA28",
              secondary: "#425761",
              success: "#00d68f",
              info: "#0095ff",
              warning: "#ffaa00",
              error: "#ff4c51",
              background: "#161B30",
              cardbackground: "#222B45",
              appbar: "#222B45",
              appbarcontent: "#fff",
              sidepanel: "#222B45",
              primaryBtn: "#ff7b9e",
              secondaryBtn: "#607d8b",
              textBtn: "#fff",
            },
            light: {
              primary: "#6200EE",
              accent: "#ffe063",
              secondary: "#33393e",
              success: "#00d68f",
              info: "#0095ff",
              warning: "#ffaa00",
              error: "#ff4c51",
              background: "#EDF1F7",
              cardbackground: "#fff",
              appbar: "#6200EE",
              appbarcontent: "#fff",
              sidepanel: "#fff",
              primaryBtn: "#903df4",
              secondaryBtn: "#6c757d",
              textBtn: "#fff",
            },
          },
        },
      ],
      //#endregion
    };
  },
  //#endregion
  //#region - Mounted Section
  mounted() {
    window.onpopstate = (event) => {
      if (this.$router.history.current.path == "/home") {
        this.$router.push({
          path: "home/master/role/role-master",
        });
      }
    };
  },
  //#endregion

  //#region - Computed Section
  computed: {
    ...mapGetters(["userPermission"], ["noti_items"]),

    mini() {
      return this.toggleMini;
    },
    isLoaderActive() {
      return this.$store.state.login.isLoaderActive;
    },
  },
  //#endregion
  //#region - Created Section
  created() {
    this.setTheme("Purple");
    this.getLoggedUserRolePermission();
    this.get();
  },
  //#endregion
  //#region - Method Section
  methods: {
    ...mapActions([
      "actionLogout",
      "actionGetLoggedUserDetailsWithRolesPermission",
    ]),

    // fetch
    get() {
      this.apiCallPost("unreadNotifications", {
        user_id: secureLS.get(Global.userId),
      });
    },

    //#region - Toggle Mini Bar
    toggleMiniBar() {
      if (!this.$vuetify.breakpoint.lgAndUp) {
        this.sideMenu = !this.sideMenu;
      } else if (this.$vuetify.breakpoint.mdAndUp) {
        this.toggleMini = !this.toggleMini;
      }
    },
    //#endregion

    //#region -Logout
    logout() {
      if (navigator.onLine) {
        this.actionLogout({});
      } else {
        // Internet not found
        Global.showErrorAlert(true, "error", "Internet not found", null);
      }
    },
    //#endregion
    //#region -Logged User Permission
    async getLoggedUserRolePermission() {
      if (navigator.onLine) {
        await this.actionGetLoggedUserDetailsWithRolesPermission({});
        this.$laravel.setPermissions(this.userPermission);
        console.log("Permission111", this.userPermission);
      } else {
        // Internet not found
        Global.showErrorAlert(true, "error", "Internet not found", null);
      }
    },
    //#endregion

    //#region - Toggle Theme
    toggleLightDarkMode() {
      this.$vuetify.theme.dark = this.isDarkMode;
    },
    //#endregion

    apiCallPost(endPoint, parameter) {
      ApiService.get(endPoint, parameter)
        .then((response) => {
          this.items_notification = response.data.resultData;
          this.unreadNotifiction = response.data.count;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status != 401 || error.response.status != 403) {
            Global.showErrorAlert(true, "error", "Something went wrong");
          }
        });
    },
    showAll() {
      router.push({
        name: "NotificationList",
      });
    },
    //#region - Set Theme
    setTheme(themeName) {
      this.$vuetify.theme.dark = this.isDarkMode;
      Object.keys(this.themes).forEach((i) => {
        if (
          this.themes[i].themeData.name.toUpperCase() == themeName.toUpperCase()
        ) {
          let dark = this.themes[i].themeData.dark;
          let light = this.themes[i].themeData.light;
          this.themeId = this.themes[i].themeData.Id;
          Object.keys(dark).forEach((j) => {
            this.$vuetify.theme.themes.dark[j] = dark[j];
          });
          Object.keys(light).forEach((j) => {
            this.$vuetify.theme.themes.light[j] = light[j];
          });
        }
      });
    },
    //#endregion
  },
  //#endregion
};
