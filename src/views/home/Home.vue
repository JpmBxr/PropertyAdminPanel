<template>
  <v-app>
    <v-overlay :value="isLoaderActive" color="primary">
      <v-progress-circular
        indeterminate
        size="50"
        color="primary"
      ></v-progress-circular>
    </v-overlay>

    <v-navigation-drawer
      height="100%"
      class="sidepanel"
      v-model="sideMenu"
      :mini-variant.sync="toggleMini"
      app
      clipped
      hide-overlay
      :style="{ top: $vuetify.application.top + 'px', zIndex: 6 }"
    >
      <v-list dense class="sidepanel">
        <v-list-item class="px-2">
          <v-avatar size="40" class="ml-1 mr-2" color="primary">
            <span class="white--text text-h6">{{ loggedUserInitials }}</span>
          </v-avatar>

          <v-list-item link class="pl-0">
            <v-list-item-content>
              <v-list-item-title>
                <h3>{{ loggedUserFullName }}</h3>
              </v-list-item-title>
              <v-list-item-subtitle> {{ roleName }} </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item>
      </v-list>

      <v-divider class="mt-0 mb-0"></v-divider>
      <perfect-scrollbar>
        <!-- Entity -->
        <v-list shaped dense class="sidepanel">
          <v-list-group prepend-icon="mdi-account-group" :value="false">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Entity</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-permission="'Users'"
              to="/home/users/AgentOperator/agent-operator"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Users</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Agency'"
              to="/home/Agency/agency"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Agency</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Broker'"
              to="/home/Broker/broker"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Broker</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Broker Association'"
              to="/home/Broker/broker-association"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Broker Association</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Seller'"
              to="/home/Seller/seller"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Seller</v-list-item-title>
            </v-list-item>

          </v-list-group>
        </v-list>

         <!-- Approvals -->
        <v-list shaped dense class="sidepanel">
          <v-list-group prepend-icon="mdi-account-check " :value="false">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Approvals</v-list-item-title>
              </v-list-item-content>
            </template>
            
            <v-list-item
              v-permission="'Approve User'"
              to="/home/users/ApproveUser/approve-user"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Approve User</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'List of Open/Pending Properties'"
              to="/home/reports/open-pending"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-chevron-double-right</v-icon>
              </v-list-item-icon>
              <v-list-item-title>List of Open/Pending Properties</v-list-item-title>
            </v-list-item>

          </v-list-group>
        </v-list>
        
        <!-- Master -->
        <v-list shaped dense class="sidepanel">
          <v-list-group prepend-icon="mdi-view-dashboard" :value="false">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Master</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-permission="'Role Menu'"
              to="/home/master/role/role-master"
              :class="menuClass"
              :color="menuColor"
              ><v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Role</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Province Menu'"
              to="/home/master/province/province-master"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-account-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Province</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Town Menu'"
              to="/home/master/town/town-master"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-city</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Town</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Barangay Menu'"
              to="/home/master/barangay/barangay-master"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-home-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Barangay</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Subdivision Menu'"
              to="/home/master/subdivision/subdivision-master"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-office-building</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Subdivision</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Capability Menu'"
              to="/home/master/capability/capability-master"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-file-video</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Capability</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Category Menu'"
              to="/home/master/category/category-master"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-point-of-sale</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Category</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Product Mode Menu Menu'"
              to="/home/master/propertyType/propertyType-master"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-newspaper-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Product Mode Menu</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Property Type Menu'"
              to="/home/master/propertyType/propertyType-master"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-newspaper-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Property Type</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Agri Type Menu'"
              to="/home/master/agriType/agriType-master"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-island</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Agri Type</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Property Classification Menu'"
              to="/home/master/propertyClassification/propertyClassification-master"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-newspaper-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Property Classification</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Zoning Code Menu'"
              to="/home/master/zonningCode/zonningCode-master"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-newspaper-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Zoning Code</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Specialization Menu'"
              to="/home/master/specialization/specialization-master"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-newspaper-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Specialization</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'User Skills Menu'"
              to="/home/master/userSkills/userSkills-master"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-point-of-sale</v-icon>
              </v-list-item-icon>
              <v-list-item-title>User Skills</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list>
        
        <!-- Property -->
        <v-list shaped dense class="sidepanel">
          <v-list-group prepend-icon="mdi-home-city" :value="false">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Property</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-permission="'Property List'"
              to="/home/Property/property-list"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-home-analytics</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Property List</v-list-item-title>
            </v-list-item>

          </v-list-group>
        </v-list>
         
        <!-- Reports -->
        <v-list shaped dense class="sidepanel">
          <v-list-group prepend-icon="mdi-form-select" :value="false">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Reports</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-permission="'Skill Based User Reports'"
              to="/home/reports/user-based-skill"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-chevron-double-right</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Skill Based User</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Agents Reports'"
              to="/home/reports/agents"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-chevron-double-right</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Agents</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Agencies Reports'"
              to="/home/reports/agencies"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-chevron-double-right</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Agencies</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Brokers Reports'"
              to="/home/reports/brokers"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-chevron-double-right</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Brokers</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Broker Associations Reports'"
              to="/home/reports/broker-associations"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-chevron-double-right</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Broker Associations</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Agents Based Agency Reports'"
              to="/home/reports/agents-based-agency"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-chevron-double-right</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Agents Based Agency</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Property Based Broker Reports'"
              to="/home/reports/property-based-broker"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-chevron-double-right</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Property Based Broker</v-list-item-title>
            </v-list-item>

            <!-- <v-list-item
              v-permission="'Agency linked Broker Reports'"
              to="/home/permission/role-permission-list"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-chevron-double-right</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Agency linked Broker</v-list-item-title>
            </v-list-item> -->

            <v-list-item
              v-permission="'BrokerLinkedBrokerAssociationReports'"
              to="/home/reports/broker-linked-broker-associations"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-chevron-double-right</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Broker Linked Broker Associations</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Sellers Reports'"
              to="/home/reports/sellers"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-chevron-double-right</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Sellers</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'User List Reports'"
              to="/home/reports/user-list"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-chevron-double-right</v-icon>
              </v-list-item-icon>
              <v-list-item-title>User List</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'User To Activated Reports'"
              to="/home/reports/user-to-activated"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-chevron-double-right</v-icon>
              </v-list-item-icon>
              <v-list-item-title>User To Activated</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Individuals Reports'"
              to="/home/reports/individuals"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-chevron-double-right</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Individuals</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Sold Rent Reports'"
              to="/home/reports/sold-rent"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-chevron-double-right</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Sold Rent</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Property attachments Reports'"
              to="/home/reports/property-attachments"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-chevron-double-right</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Property attachments</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'User Count Property Reports'"
              to="/home/reports/user-count-property"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-chevron-double-right</v-icon>
              </v-list-item-icon>
              <v-list-item-title>User Count Property</v-list-item-title>
            </v-list-item>

          </v-list-group>
        </v-list>
        
        <!-- Settings -->
        <v-list shaped dense class="sidepanel">
          <v-list-group prepend-icon="mdi-cog" :value="false">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-permission="'Role Permissions'"
              to="/home/permission/role-permission-list"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-account-cog</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Role Permissions</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-permission="'Notification'"
              to="/home/notification/notification-list"
              :class="menuClass"
              :color="menuColor"
            >
              <v-list-item-icon>
                <v-icon>mdi-bell-ring</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Notification</v-list-item-title>
            </v-list-item>

          </v-list-group>
        </v-list>
      </perfect-scrollbar>

      <v-col class="text-center" cols="12">
        <strong> Version: 1.0.0.9 </strong></v-col
      >
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="appbar"
      dark
      height="70"
      elevation="0"
      class="fitPotAppBar"
    >
      <v-app-bar-nav-icon
        @click.stop="toggleMiniBar"
        color="appbarcontent"
      ></v-app-bar-nav-icon>

      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="appbarcontent--text">
          <strong>{{ CompanyName }}</strong>
        </span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            color="white"
            class="mr-4"
            large
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-badge
              color="green"
              :content="unreadNotifiction"
              overlap
              v-if="unreadNotifiction > 0"
            >
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-card max-width="550" class="mx-auto" v-if="unreadNotifiction > 0">
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  ><strong>Notification</strong></v-list-item-title
                >
                <v-list-item-subtitle
                  >Total {{ unreadNotifiction }} unread
                  notification(s)</v-list-item-subtitle
                >
              </v-list-item-content>

              <v-list-item-action>
                <v-btn
                  :class="fav ? 'red--text' : ''"
                  icon
                  @click="fav = !fav"
                  v-if="false"
                >
                  <v-icon>mdi-notification-clear-all</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>
          <perfect-scrollbar>
            <v-list three-line max-height="400">
              <template v-for="(item, index) in items_notification">
                <v-divider v-if="index != 0" :key="index" inset></v-divider>

                <v-list-item :key="item.title">
                  <v-list-item-avatar>
                    <v-icon>{{ item.notification_type_icon }}</v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content
                    v-if="item.notification_status == 'Active'"
                    class="fitPotInfoIcon"
                  >
                    <v-list-item-title>
                      <strong> {{ item.notification_type }}</strong
                      ><br />
                      {{ item.notification_subject }}</v-list-item-title
                    >
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn
                      :class="
                        item.notification_status == 'Active'
                          ? 'blue--text'
                          : 'red--text'
                      "
                      icon
                      @click="fav = !fav"
                    >
                      <v-icon small v-if="item.notification_status == 'Active'"
                        >mdi-email-outline</v-icon
                      >
                      <v-icon
                        small
                        v-if="item.notification_status == 'Inactive'"
                        >mdi-email-open-outline</v-icon
                      >
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </template>
            </v-list>
          </perfect-scrollbar>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text @click="menu = false"> Cancel </v-btn>
            <v-btn color="primary" text @click="showAll(), (menu = false)">
              Show All
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>

      <v-menu transition="slide-y-transition" bottom max-width="250px">
        <template v-slot:activator="{ on }">
          <v-btn icon large v-on="on">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-avatar size="60" class="ml-1 mr-2" color="primary">
                <span class="white--text text-h5">{{
                  loggedUserInitials
                }}</span>
              </v-avatar>

              <v-list-item-content>
                <v-list-item-title class="m-0 p-o">
                  <h5>{{ loggedUserFullName }}</h5>
                </v-list-item-title>
                <v-list-item-subtitle> {{ roleName }} </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider class="p-0 m-0"></v-divider>

          <v-list dense>
            <v-list-item-group>
              <!-- put other options before the divider -->
              <v-list-item @click="showAccountDetails">
                <v-list-item-icon>
                  <v-icon>mdi-account-convert</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Account Details</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="logout">
                <v-list-item-icon>
                  <v-icon>mdi-exit-to-app</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">
                    {{ isDarkMode ? "Light Mode" : "Dark Mode" }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-switch
                    v-model="isDarkMode"
                    @change="toggleLightDarkMode"
                  />
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>

    <transition name="fade" mode="out-in">
      <router-view
        :userPermissionDataProps="userPermission"
        v-if="userPermission != null"
      ></router-view>
    </transition>
    <v-footer padless fixed class="text-center">
      <v-col class="text-center" cols="12">
        Powered by <strong>{{ CompanyName }}</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { home } from "../home/home.js";
export default home;
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.9s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.ps {
  height: 80%;
  position: relative;
  overflow: auto;
}

.theme--dark.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: #151a30 !important;
}

.theme--light .fitPotAppBar {
  box-shadow: 0 0.5rem 1rem 0 rgb(44, 51, 73, 0.1) !important;
}

.theme--dark .fitPotAppBar {
  box-shadow: 0 0.5rem 1rem 0 #1a1f33 !important;
}

.v-data-table > .v-data-table__wrapper .v-data-table__mobile-row {
  min-height: 32px !important;
  padding: 8px !important;
}

.backToMaster:hover {
  color: var(--v-primary-base) !important;
  cursor: pointer;
}

.primary-button {
  padding: 0 16px !important;
  color: var(--v-textBtn-base) !important;
  background-image: linear-gradient(
    to left,
    var(--v-primaryBtn-base),
    var(--v-primary-base)
  );
}
button.v-btn[disabled] {
  background-image: none !important;
}

.secondary-button {
  padding: 0 16px !important;
  color: var(--v-textBtn-base) !important;
  background-image: linear-gradient(
    to left,
    var(--v-secondaryBtn-base),
    var(--v-secondary-base)
  );
}
</style>
