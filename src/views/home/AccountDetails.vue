<template>
    <!-- Card Start -->
    <v-container fluid class="pa-4 mb-8">
      <v-overlay :value="isLoaderActive" color="primary">
        <v-progress-circular
          indeterminate
          size="50"
          color="primary"
        ></v-progress-circular>
      </v-overlay>
      <v-card class="mb-10">
        <v-form
          ref="holdingFormAddEdit"
          v-model="isFormAddEditValid"
          lazy-validation
        >
          <v-row class="ml-4 mr-4 mt-1 mb-4">
            <v-toolbar-title dark color="primary">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h5">
                    <strong>{{ entity }}</strong>
                  </v-list-item-title>
                  <v-list-item-subtitle
                    >Home <v-icon>mdi-chevron-right</v-icon>
                    {{ entity }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn
              class="white--text primary-button mx-0 mr-4 mt-4"
              @click="
                isAddEdit = true;
                addEditItem();
              "
            >
              Save {{ entity }}
              <v-icon right dark> mdi-plus </v-icon>
            </v-btn> -->
            <v-btn
              class="white--text primary-button mx-0 mr-4 mt-4"
              @click="isAddOtp = true;
              showAddPassDialog(item);"
            >
              Save {{ entity }}
              <v-icon right dark> mdi-plus </v-icon>
            </v-btn>
          </v-row>
          <transition name="fade" mode="out-in">
            <v-expansion-panels class="px-4 pb-4" v-model="pnlSettings">
              <v-expansion-panel>
                <v-expansion-panel-header class="grey lighten-3">
                  <div>
                    <v-icon color="success" class="mr-4"
                      >mdi-account-circle</v-icon
                    >
                    <strong>Basic Information</strong>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content eager>
                  <v-row class="mt-4">
                    <v-col cols="12" md="3" sm="12">
                      <v-autocomplete
                      v-if="false"
                        v-model="UserType"
                        :items="userTypeItems"
                        :disabled="isItemLoading"
                        item-text="name"
                        item-value="id"
                        dense
                        chips
                        :rules="validationRulesRequired"
                        small-chips
                        label="Select User Type"
                        @change="changeUserType"
                        return-object
                      >
                        <template #label>
                          Select User Type
                          <span class="red--text">
                            <strong>*</strong>
                          </span>
                        </template>
                      </v-autocomplete>
                    </v-col>

                    <v-col cols="12" md="2" sm="12"  v-if="false">
                      <v-switch
                      
                        v-if="AccountDetailsDataProps!=null"
                        class="p-0 m-0"
                        dense
                        color="primary"
                        v-model="inactiveUser"
                        flat
                        label="Inactive User"
                        true-value="Inactive"
                        false-value="Active"
                      ></v-switch>
                    </v-col>
  
                    <v-col
                      cols="12"
                      md="7"
                      sm="12"
                      v-if="inactiveUser == 'Inactive'"
                    >
                      <v-text-field
                        dense
                        label="Reason for Inactive"
                        v-model="reasonInactive"
                        :rules="validationRulesRequired"
                        hide-details="auto"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" sm="12">
                    <v-file-input
                      v-model="ProfileImage"
                      prepend-icon="mdi-camera"
                      color="primary"
                      dense
                      show-size
                      accept=".jpg , .png, .jpeg"
                      :rules="imageRule"
                    >
                      <template #label>
                       Select Profile Image
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template>

                      <template v-slot:selection="{ index, text }">
                        <v-chip
                          v-if="index < 2"
                          color="primary"
                          dark
                          label
                          small
                          >{{ text }}</v-chip
                        >
                      </template>
                    </v-file-input>
                  </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="4" sm="12">
                      <v-text-field
                        dense
                        label="First Name"
                        v-model="firstName"
                        :rules="validationRulesRequired"
                        hide-details="auto"
                      >
                        <template #label>
                          First Name
                          <span class="red--text">
                            <strong>*</strong>
                          </span>
                        </template></v-text-field
                      >
                    </v-col>
                    <v-col cols="12" md="4" sm="12">
                      <v-text-field
                        dense
                        label="Last Name"
                        v-model="lastName"
                        :rules="validationRulesRequired"
                        hide-details="auto"
                      >
                        <template #label>
                          Last Name
                          <span class="red--text">
                            <strong>*</strong>
                          </span>
                        </template></v-text-field
                      >
                    </v-col>
                    <v-col cols="12" md="4" sm="12">
                      <v-text-field
                        dense
                        label="Nick Name"
                        v-model="nickName"
                        hide-details="auto"
                      ></v-text-field>
                    </v-col>
                  </v-row>
  
                  <v-row>
                    <v-col cols="12" md="4" sm="12">
                      <v-text-field
                        dense
                        label="Email"
                        v-model="email"
                        :rules="validationRules_email"
                        hide-details="auto"
                      >
                        <template #label>
                          Email
                          <span class="red--text">
                            <strong>*</strong>
                          </span>
                        </template></v-text-field
                      >
                    </v-col>
                    <v-col cols="12" md="4" sm="12">
                      <v-text-field
                        dense
                        v-numeric
                        label="Primary Phone"
                        v-model="phone1"
                        :rules="validationRules_mobile"
                        hide-details="auto"
                      >
                        <template #label>
                          Primary Phone
                          <span class="red--text">
                            <strong>*</strong>
                          </span>
                        </template></v-text-field
                      >
                    </v-col>
                    <v-col cols="12" md="4" sm="12">
                      <v-text-field
                        dense
                        v-numeric
                        label="Secondary Phone"
                        v-model="phone2"
                        hide-details="auto"
                        :rules="validationRules_alternatecontact"
                      ></v-text-field>
                    </v-col>
                  </v-row>
  
                  <v-row>
                    <v-col cols="12" md="3" sm="12">
                      <v-switch
                      v-if="false"
                        class="p-0 m-0"
                        dense
                        color="primary"
                        v-model="sameAsAgency"
                        flat
                        label="Same as Agency"
                        true-value="1"
                        false-value="0"
                      ></v-switch>
                    </v-col>
                    
                    <v-col cols="12" md="4" sm="12">
                      <v-combobox
                      v-if="false"
                        v-model="selectBirthMonth"
                        :items="birthMonthItems"
                        label="Select Birth Month"
                        :rules="validationRulesRequired"
                        @change="populateBirthDay"
                        dense
                      >
                        <template #label>
                          Select Birth Month
                          <span class="red--text">
                            <strong>*</strong>
                          </span>
                        </template></v-combobox
                      >
                    </v-col>
                    <v-col cols="12" md="4" sm="12">
                      <v-combobox
                      v-if="false"
                        v-model="selectBirthDay"
                        :items="birthDaysItems"
                        :rules="validationRulesRequired"
                        label="Select Birth Day"
                        dense
                      >
                        <template #label>
                          Select Birth Day
                          <span class="red--text">
                            <strong>*</strong>
                          </span>
                        </template></v-combobox
                      >
                    </v-col>
                   
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
  
              <v-expansion-panel v-if="false">
                <v-expansion-panel-header class="grey lighten-4">
                  <div>
                    <v-icon color="success" class="mr-4"
                      >mdi-home-map-marker</v-icon
                    >
                    <strong>Address Details</strong>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content eager>
                  <v-row class="mt-4">
                    <v-col cols="12" md="3" sm="12">
                      <v-text-field
                        dense
                        label="Unit Number"
                        v-model="unitNumber"
                        hide-details="auto"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" sm="12">
                      <v-text-field
                        dense
                        label="House/Lot Number"
                        v-model="houseLotNumber"
                        hide-details="auto"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="12">
                      <v-text-field
                        dense
                        label="Street Name"
                        v-model="streetName"
                        hide-details="auto"
                      >
                        <template #label>
                          Street Name
                          <span class="red--text">
                            <strong>*</strong>
                          </span>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>
  
                  <v-row>
                    <v-col cols="12" md="4" sm="12">
                      <v-text-field
                        dense
                        label="Property/Building Name"
                        v-model="propertyBuildingName"
                        hide-details="auto"
                      ></v-text-field>
                    </v-col>
                    
                    <v-col cols="12" md="4" sm="12">
                      <v-autocomplete
                        :disabled="isItemLoading"
                        v-model="town"
                        :items="townItems"
                        item-text="town_name"
                        item-value="town_id"
                        dense
                        chips
                        small-chips
                        label="Select Town"
                        @keypress="acceptNotCharacter"
                      >
                        <template #label>
                          Select Town
                          <span class="red--text">
                            <strong>*</strong>
                          </span>
                        </template>
                      </v-autocomplete>
                    </v-col>

                    <v-col cols="12" md="4" sm="12">
                      <v-autocomplete
                        :disabled="isItemLoading"
                        v-model="province"
                        :items="provinceItems"
                        item-text="province_name"
                        item-value="province_id"
                        dense
                        chips
                        @change="changeProvince"
                        small-chips
                        label="Select Province"
                        @keypress="acceptNotCharacter"
                      >
                        <template #label>
                          Select Province
                          <span class="red--text">
                            <strong>*</strong>
                          </span>
                        </template>
                      </v-autocomplete>
                    </v-col>
                  </v-row>
  
                  <v-row>
                    <v-col cols="12" md="3" sm="12">
                      <v-autocomplete
                        :disabled="isItemLoading"
                        v-model="barangay"
                        :items="barangayItems"
                        item-text="barangay_name"
                        item-value="barangay_id"
                        @change="changeBarangay"
                        dense
                        chips
                        small-chips
                        label="Select Barangay"
                        @keypress="acceptNotCharacter"
                      >
                        <template #label>
                          Select Barangay
                          <span class="red--text">
                            <strong>*</strong>
                          </span>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="3" sm="12">
                      <v-autocomplete
                        :disabled="isItemLoading"
                        v-model="subdivision"
                        :items="subdivisionItems"
                        item-text="subdivision_name"
                        item-value="subdivision_id"
                        dense
                        chips
                        small-chips
                        label="Select Subdivision"
                        @keypress="acceptNotCharacter"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="3" sm="12">
                    <v-text-field
                    v-numeric
                      dense
                      label="Zip Code"
                      v-model="zipCode"
                      hide-details="auto"
                    >
                    <template #label>
                      Zip Code
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="12">
                    <v-autocomplete
                      v-model="floorLevel"
                      :items="floorLevelItems"
                      dense
                      chips
                      small-chips
                      label="Select Floor or Level"
                    >
                    <template #label>
                      Select Floor or Level
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template>
                    </v-autocomplete>
                  </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
  
              <v-expansion-panel v-if="false">
                <v-expansion-panel-header class="grey lighten-3">
                  <div>
                    <v-icon color="success" class="mr-4"
                      >mdi-account-circle</v-icon
                    >
                    <strong>Other Details</strong>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content eager>
                  <v-row class="mt-4">
                    <v-col cols="12" md="4" sm="12">
                      <v-text-field
                        dense
                        label="User Website"
                        v-model="userWebsite"
                        hide-details="auto"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" sm="12">
                      <v-text-field
                        dense
                        label="Open Property Limit"
                        v-model="openPropertyLimit"
                        :disabled="openPropertyLimitIsDisabled"
                        v-numeric
                        maxlength="3"
                        :rules="validationRulesRequired"
                        hide-details="auto"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="5" sm="12">
                      <v-autocomplete
                        :disabled="isItemLoading"
                        v-model="userSkills"
                        :items="userSkillsItems"
                        item-text="user_skills"
                        item-value="user_skills_id"
                        dense
                        chips
                        multiple
                        small-chips
                        label="Select User Skills"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
  
                  <v-row>
                    <v-col cols="12" md="12" sm="12">
                      <v-textarea
                        v-model="profileStatement"
                        filled
                        label="Profile Statement"
                        auto-grow
                        placeholder="Profile Statement - Up to 100 words"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
  
              <v-expansion-panel v-if="false">
                <v-expansion-panel-header class="grey lighten-4">
                  <div>
                    <v-icon color="success" class="mr-4">mdi-account-cog</v-icon>
                    <strong>{{ entity }} Settings</strong>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content eager>
                  <v-row class="mt-4">
                    <v-col cols="12" md="3" sm="12">
                      <v-text-field
                        dense
                        ref="chkRe"
                        label="RE Licence"
                        v-model="rELicence"
                        :rules="validationRulesRequired"
                        hide-details="auto"
                      ></v-text-field>
                    </v-col>
  
                    <v-col cols="12" md="9" sm="12">
                      <v-autocomplete
                        v-model="AssociatedAgency"
                        :items="associatedAgencyItems"
                        item-text="agency_name"
                        item-value="agency_id"
                        dense
                        chips
                        :rules="validationRulesRequired"
                        small-chips
                        multiple
                        label="Associated Agency"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="3" sm="12">
                      <v-switch
                        class="p-0 m-0"
                        dense
                        color="primary"
                        v-model="selfBroker"
                        flat
                        label="Self-Broker"
                        true-value="1"
                        false-value="0"
                      ></v-switch>
                    </v-col>
  
                    <v-col cols="12" md="9" sm="12">
                      <v-autocomplete
                        v-model="associatedBroker"
                        :items="associatedBrokerItems"
                        item-text="broker_name"
                        item-value="broker_id"
                        dense
                        chips
                        multiple
                        :rules="validationRulesRequired"
                        small-chips
                        label="Select Associated Broker"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
  
                  <v-row> </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </transition>

          <!--start of Add Otp -->
       <v-dialog
        transition="dialog-top-transition"
        v-model="addPassDialog"
        max-width="400"
        scrollable
        :fullscreen="$vuetify.breakpoint.smAndDown"
        persistent
      >
        <template v-slot:default="dialog">
          <v-overlay :value="isDialogLoaderActive" color="primary">
            <v-progress-circular
              indeterminate
              size="50"
              color="primary"
            ></v-progress-circular>
          </v-overlay>
          <v-card>
            <v-toolbar
              color="primary"
              dark
              :max-height="$vuetify.breakpoint.smAndDown ? 56 : '20vh'"
            >
              <v-toolbar-title class="popup-header">{{
                addPassText
              }}</v-toolbar-title>
              <v-spacer></v-spacer><v-spacer></v-spacer>
              <v-btn icon dark @click="addPassDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text class="py-4 px-2">
              <v-form
                ref="holdingFormAddPass"
                v-model="isFormAddPassValid"
                lazy-validation
              >
                <v-row class="mx-auto d-flex">
                  <v-col cols="12" md="12" class="pt-5 pb-2">
                    <v-text-field
                      v-model="item.verify_password"
                      type="password"
                      dense
                      outlined
                      :rules="validationRulesRequired"
                    >
                      <template #label>
                       Enter Current Password 
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-end pt-4 pb-6">
              <v-btn class="mx-2 secondary-button" @click="close()"
                >Close</v-btn
              >
              <v-btn
                class="mx-2 primary-button"
                @click="
                isAddEdit = true;
                addEditItem();
              "
              >
                Update Account Details
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      <!--end of add Pass -->


        </v-form>
        <!-- Card End -->
      </v-card>
    </v-container>
  </template>
  <script>
  import { accountDetails } from "../home/accountDetails";
  export default accountDetails;
  </script>
  
  <style scoped>
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
 
  </style>