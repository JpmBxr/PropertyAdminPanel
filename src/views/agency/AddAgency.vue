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
    <v-card>
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
                  >Home <v-icon>mdi-chevron-right</v-icon> Entity
                  <v-icon>mdi-chevron-right</v-icon>Add
                  <v-icon>mdi-chevron-right</v-icon>
                  {{ entity }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text primary-button mx-0 mr-4 mt-4"
            @click="addEditItem()"
          >
            Save Agencies
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
                  <v-col cols="12" md="4" sm="12">
                    <v-text-field
                      dense
                      label="Agency Name"
                      v-model="item.agency_name"
                      :rules="validationRulesRequired"
                      hide-details="auto"
                    >
                      <template #label>
                        Agency Name
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="12">
                    <v-text-field
                      dense
                      label="Owner Name"
                      v-model="item.owner_name"
                      :rules="validationRulesRequired"
                      hide-details="auto"
                    >
                      <template #label>
                        Owner Name
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="12">
                    <v-text-field
                      dense
                      label="Contact Person"
                      v-model="item.contact_person"
                      :rules="validationRulesRequired"
                      hide-details="auto"
                    >
                      <template #label>
                        Contact Person
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="3" sm="12">
                    <v-text-field
                      dense
                      label="Email"
                      v-model="item.email_address"
                      :rules="validationRules_email"
                      hide-details="auto"
                    >
                      <template #label>
                        Email
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="12">
                    <v-text-field
                      dense
                      label="Secondary Email"
                      v-model="item.email_address_secondary"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="12">
                    <v-text-field
                      dense
                      v-numeric
                      label="Primary Phone"
                      v-model="item.phone_1"
                      :rules="validationRulesRequired"
                      hide-details="auto"
                    >
                      <template #label>
                        Primary Phone
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="12">
                    <v-text-field
                      dense
                      v-numeric
                      label="Secondary Phone"
                      v-model="item.phone_2"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="4" sm="12">
                    <v-autocomplete
                      v-model="item.specialization_id"
                      :items="agencySpecializationItems"
                      label="Select Specialization"
                      item-text="specialization"
                      item-value="specialization_id"
                      dense
                      multiple
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="4" sm="12">
                    <v-autocomplete
                      v-model="item.province_id"
                      :items="agencyProvinceItems"
                      item-text="province_name"
                      item-value="province_id"
                      :rules="validationRulesRequired"
                      dense
                      multiple
                      ><template #label>
                        Select Provinces of Operations
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template></v-autocomplete
                    >
                  </v-col>
                  <v-col cols="12" md="4" sm="12">
                    <v-autocomplete
                      v-model="item.capability_id"
                      :items="agencyCapabilitiesItems"
                      label="Select Capabilities"
                      item-text="capability_name"
                      item-value="capability_id"
                      dense
                      multiple
                    ></v-autocomplete>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="3" sm="12">
                    <v-switch
                    v-if="isSwitchVisible"
                      class="p-0 m-0"
                      dense
                      color="primary"
                      v-model="item.status"
                      :value="item.status == 'Active' ? true : false"
                      flat
                      label="Inactive Agency"
                      false-value="Active"
                      true-value="Inactive"
                    ></v-switch>
                  </v-col>

                  <v-col cols="12" md="9" sm="12" v-if="item.status=='Inactive'">
                    <v-text-field
                      dense
                      label="Reason for Inactive"
                      v-model="item.reason_for_inactive"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
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
                      v-model="item.unit_number"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="12">
                    <v-text-field
                      dense
                      label="House/Lot Number"
                      v-model="item.house_number"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" sm="12">
                    <v-text-field
                      dense
                      label="Street Name"
                      v-model="item.street_name"
                      :rules="validationRulesRequired"
                      hide-details="auto"
                    >
                      <template #label>
                        Contact Person
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
                      v-model="item.building_name"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4" sm="12">
                    <v-autocomplete
                      :disabled="isItemLoading"
                      v-model="item.address_province_id"
                      :items="provinceItems"
                      item-text="province_name"
                      item-value="province_id"
                      dense
                      chips
                      :rules="validationRulesRequired"
                      @change="changeProvince"
                      small-chips
                      label="Select Province"
                    >
                      <template #label>
                        Select Provinces of Operations
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="4" sm="12">
                    <v-autocomplete
                      :disabled="isItemLoading"
                      v-model="item.town_id"
                      :items="townItems"
                      item-text="town_name"
                      item-value="town_id"
                      dense
                      chips
                      :rules="validationRulesRequired"
                      small-chips
                      label="Select Town"
                    >
                      <template #label>
                        Select Town
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
                      v-model="item.barangay_id"
                      :items="barangayItems"
                      item-text="barangay_name"
                      item-value="barangay_id"
                      @change="changeBarangay"
                      dense
                      chips
                      :rules="validationRulesRequired"
                      small-chips
                      label="Select Barangay"
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
                      v-model="item.subdivision_id"
                      :items="subdivisionItems"
                      item-text="subdivision_name"
                      item-value="subdivision_id"
                      dense
                      chips
                      small-chips
                      label="Select Subdivision"
                    >
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="3" sm="12">
                    <v-text-field
                      dense
                      label="Zip Code"
                      v-model="item.zip_code"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="12">
                    <v-text-field
                      v-model="item.floor"
                      dense
                      label="Floor or Level"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </transition>
      </v-form>
      <!-- Card End -->
    </v-card>
  </v-container>
</template>
<script>
import { addAgency } from "../agency/addAgency";
export default addAgency;
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
