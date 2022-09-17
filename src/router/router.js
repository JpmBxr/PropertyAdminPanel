//  This file contains all route contain
import Vue from "vue";
import Router from "vue-router";
import store from "../store/store";
import { Global } from "../helpers/global";
Vue.use(Router);

const router = new Router({
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
  routes: [
    {
      path: "/",
      redirect: {
        name: "Login",
      },
    },
    {
      path: "/login",
      name: "Login",
      component: require("../views/login/Login.vue").default,
    },

    {
      path: "/home",
      component: require("../views/home/Home.vue").default,
      name: "Home",
      meta: {
        requiresAuth: true,
      },
      children: [
        // Role Master
        {
          path: "master/role/role-master",
          component: require("../views/master/role/RoleMaster.vue").default,
          name: "RoleMaster",
          meta: {
            requiresAuth: true,
          },
        },

        {
          path: "master/province/province-master",
          component: require("../views/master/Province/ProvinceMaster.vue")
            .default,
          name: "ProvinceMaster",
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "master/town/town-master",
          component: require("../views/master/Town/TownMaster.vue").default,
          name: "TownMaster",
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "master/barangay/barangay-master",
          component: require("../views/master/Barangay/BarangayMaster.vue")
            .default,
          name: "BarangayMaster",
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "master/subdivision/subdivision-master",
          component: require("../views/master/Subdivision/SubdivisionMaster.vue")
            .default,
          name: "SubdivisionMaster",
          meta: {
            requiresAuth: true,
          },
        },
        //capability
        {
          path: "master/capability/capability-master",
          component: require("../views/master/Capability/CapabilityMaster.vue")
            .default,
          name: "CapabilityMaster",
          meta: {
            requiresAuth: true,
          },
        },

        //category
        {
          path: "master/category/category-master",
          component: require("../views/master/Category/CategoryMaster.vue")
            .default,
          name: "CategoryMaster",
          meta: {
            requiresAuth: true,
          },
        },

        //productMode
        {
          path: "master/productMode/productMode-master",
          component: require("../views/master/ProductMode/ProductModeMaster.vue")
            .default,
          name: "ProductModeMaster",
          meta: {
            requiresAuth: true,
          },
        },
        //propertyType
        {
          path: "master/propertyType/propertyType-master",
          component: require("../views/master/PropertyType/PropertyTypeMaster.vue")
            .default,
          name: "PropertyTypeMaster",
          meta: {
            requiresAuth: true,
          },
        },
        //AgriType
        {
          path: "master/agriType/agriType-master",
          component: require("../views/master/AgriType/AgriTypeMaster.vue")
            .default,
          name: "AgriTypeMaster",
          meta: {
            requiresAuth: true,
          },
        },

        //propertyClassification
        {
          path: "master/propertyClassification/propertyClassification-master",
          component: require("../views/master/PropertyClassification/PropertyClassificationMaster.vue")
            .default,
          name: "PropertyClassificationMaster",
          meta: {
            requiresAuth: true,
          },
        },

        //zonningCode
        {
          path: "master/zonningCode/zonningCode-master",
          component: require("../views/master/ZonningCode/ZonningCodeMaster.vue")
            .default,
          name: "zonningCodeMaster",
          meta: {
            requiresAuth: true,
          },
        },
        //specialization
        {
          path: "master/specialization/specialization-master",
          component: require("../views/master/Specialization/SpecializationMaster.vue")
            .default,
          name: "SpecializationMaster",
          meta: {
            requiresAuth: true,
          },
        },

        //userSkillsMaster
        {
          path: "master/userSkills/userSkills-master",
          component: require("../views/master/UserSkills/UserSkillsMaster.vue")
            .default,
          name: "UserSkillsMaster",
          meta: {
            requiresAuth: true,
          },
        },
       

        //--------------------------- Users Start-----------------------------------------

        //AgentOperator
        {
          path: "users/AgentOperator/agent-operator",
          component: require("../views/users/AgentOperator/AgentOperatorUsers.vue")
            .default,
          name: "AgentOperator",
          meta: {
            requiresAuth: true,
          },
        },

        //AddAgentOperator
        {
          path: "users/AgentOperator/add-agent-operator",
          component: require("../views/users/AgentOperator/AddAgentOperatorUsers.vue")
            .default,
          name: "AddAgentOperator",
          meta: {
            requiresAuth: true,
          },
          props:true
        },
        //ApproveUser
        {
          path: "users/ApproveUser/approve-user",
          component: require("../views/users/ApproveUser/ApproveUser.vue")
            .default,
          name: "ApproveUser",
          meta: {
            requiresAuth: true,
          },
        },
        //--------------------------- Users End ------------------------------------------

        //--------------------------- Agency Start-----------------------------------------

        //Agency
        {
          path: "Agency/agency",
          component: require("../views/agency/Agency.vue").default,
          name: "Agency",
          meta: {
            requiresAuth: true,
          },
        },

        //AddAgency
        {
          path: "Agency/add-agency/:agencyId",
          component: require("../views/agency/AddAgency.vue").default,
          name: "AddAgency",
          meta: {
            requiresAuth: true,
          },
          // props:true
        },

        //--------------------------- Agency End ------------------------------------------

        //--------------------------- Broker Start-----------------------------------------

        //Broker
        {
          path: "Broker/broker",
          component: require("../views/broker/Broker.vue").default,
          name: "Broker",
          meta: {
            requiresAuth: true,
          },
        },

        //AddBroker
        {
          path: "Broker/add-broker",
          component: require("../views/broker/AddBroker.vue").default,
          name: "AddBroker",
          meta: {
            requiresAuth: true,
          },
        },

        //BrokerAssociation
        {
          path: "Broker/broker-association",
          component: require("../views/broker/brokerAssociation/BrokerAssociation.vue")
            .default,
          name: "BrokerAssociation",
          meta: {
            requiresAuth: true,
          },
        },

        //AddBrokerAssociation
        {
          path: "Broker/add-broker-association/:brokerAssociationId",
          component: require("../views/broker/brokerAssociation/AddBrokerAssociation.vue")
            .default,
          name: "AddBrokerAssociation",
          meta: {
            requiresAuth: true,
          },
        },
        //Seller
        {
          path: "Seller/seller",
          component: require("../views/seller/Seller.vue")
            .default,
          name: "Seller",
          meta: {
            requiresAuth: true,
          },
        },

        //AddSeller
        {
          path: "Broker/add-seller/:sellerId",
          component: require("../views/seller/AddSeller.vue")
            .default,
          name: "AddSeller",
          meta: {
            requiresAuth: true,
          },
        },
        

        //--------------------------- Broker End ------------------------------------------

        //--------------------------- Property Start-----------------------------------------

        //Property List
        {
          path: "Property/property-list",
          component: require("../views/property/Property.vue").default,
          name: "PropertyList",
          meta: {
            requiresAuth: true,
          },
        },

        //Add Property
        {
          path: "Property/add-property",
          component: require("../views/property/AddProperty.vue").default,
          name: "AddProperty",
          meta: {
            requiresAuth: true,
          },
          props:true
        },

        //Add Property Image
        {
          path: "Property/add-property-image",
          component: require("../views/property/AddPropertyImage.vue").default,
          name: "AddPropertyImage",
          meta: {
            requiresAuth: true,
          },
          props:true
        },
 
   
        //--------------------------- Property End ------------------------------------------

        //--------------------------- Permission Start-----------------------------------------

        //Role Permission
        {
          path: "permission/role-permission-list",
          component: require("../views/permission/RolePermission.vue").default,
          name: "RolePermissionList",
          meta: {
            requiresAuth: true,
          },
        },
        //Role Permission
        {
          path: "permission/assign-role-permission-list/:roleId",
          component: require("../views/permission/AssignRolePermission.vue")
            .default,
          name: "AssignRolePermission",
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "notification/notification-list",
          component: require("../views/notification/NotificationList.vue")
            .default,
          name: "NotificationList",
          meta: {
            requiresAuth: true,
          },
        },

        //--------------------------- Permission End ------------------------------------------

        //---------------------------REPORTS-----------------------------------------

        //user Based Skill
        {
          path: "reports/user-based-skill",
          component: require("../views/reports/userBasedSkill/UserBasedSkill.vue")
            .default,
          name: "UserBasedSkillReport",
          meta: {
            requiresAuth: true,
          },
        },
        //Agents
        {
          path: "reports/agents",
          component: require("../views/reports/agents/Agents.vue")
            .default,
          name: "AgentsReport",
          meta: {
            requiresAuth: true,
          },
        },
        //Agencies
        {
          path: "reports/agencies",
          component: require("../views/reports/agencies/Agencies.vue")
            .default,
          name: "Agencies",
          meta: {
            requiresAuth: true,
          },
        },
        //Brokers
        {
          path: "reports/brokers",
          component: require("../views/reports/brokers/Brokers.vue")
            .default,
          name: "Brokers",
          meta: {
            requiresAuth: true,
          },
        },
        //Broker Associations
        {
          path: "reports/broker-associations",
          component: require("../views/reports/brokerAssociations/BrokerAssociations.vue")
            .default,
          name: "Broker Associations",
          meta: {
            requiresAuth: true,
          },
        },
        //Agents Based Agency
        {
          path: "reports/agents-based-agency",
          component: require("../views/reports/agentsBasedAgency/AgentsBasedAgency.vue")
            .default,
          name: "Agents Based Agency",
          meta: {
            requiresAuth: true,
          },
        },
         //User List
         {
          path: "reports/user-list",
          component: require("../views/reports/userList/UserList.vue")
            .default,
          name: "User List",
          meta: {
            requiresAuth: true,
          },
        },
         //User to Activated
         {
          path: "reports/user-to-activated",
          component: require("../views/reports/userToActivated/UserToActivated.vue")
            .default,
          name: "User To Activated",
          meta: {
            requiresAuth: true,
          },
        },
        //Sellers
        {
          path: "reports/sellers",
          component: require("../views/reports/sellers/Sellers.vue")
            .default,
          name: "Sellers",
          meta: {
            requiresAuth: true,
          },
        },
        //Broker linked Broker Associations
        {
          path: "reports/broker-linked-broker-associations",
          component: require("../views/reports/brokerLinkedBrokerAssociations/BrokerLinkedBrokerAssociations.vue")
            .default,
          name: "Broker Linked Broker Associations",
          meta: {
            requiresAuth: true,
          },
        },
        //Individuals
        {
          path: "reports/individuals",
          component: require("../views/reports/individuals/Individuals.vue")
            .default,
          name: "Individuals",
          meta: {
            requiresAuth: true,
          },
        },
         //Sold Rent
        {
          path: "reports/sold-rent",
          component: require("../views/reports/soldRent/SoldRent.vue")
            .default,
          name: "Sold Rent",
          meta: {
            requiresAuth: true,
          },
        },
         //User Count Property
         {
          path: "reports/user-count-property",
          component: require("../views/reports/userCountProperty/UserCountProperty.vue")
            .default,
          name: "User Count Property",
          meta: {
            requiresAuth: true,
          },
        },
        //Property Based Broker
        {
          path: "reports/property-based-broker",
          component: require("../views/reports/propertyBasedBroker/PropertyBasedBroker.vue")
            .default,
          name: "Property Based Broker",
          meta: {
            requiresAuth: true,
          },
        },
         //List of Open/Pending Properties
         {
          path: "reports/open-pending",
          component: require("../views/reports/openPending/OpenPending.vue")
            .default,
          name: "List of Open/Pending Properties",
          meta: {
            requiresAuth: true,
          },
        },
        //Property Attachments
        {
          path: "reports/property-attachments",
          component: require("../views/reports/propertyAttachments/PropertyAttachments.vue")
            .default,
          name: "Property Attachments",
          meta: {
            requiresAuth: true,
          },
        },


        //--------------------------- REPORTS End ------------------------------------------
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  // check if the route requires authentication and user is not logged in console.log(secureLS.get(Global.userId));
  console.log(secureLS.get(Global.tokenKey));

  if (
    to.matched.some((route) => route.meta.requiresAuth) &&
    !store.state.login.isLoggedIn
  ) {
    // redirect to login page
    next({
      name: "Login",
    });
    return;
  }

  // if logged in redirect to dashboard
  if (to.path === "/login" && store.state.login.isLoggedIn) {
    next({
      name: "RoleMaster",
    });
    return;
  }

  next();
});
export default router;
