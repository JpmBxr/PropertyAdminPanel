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
                  <v-col cols="12" md="6" sm="12">
                    <v-text-field
                      dense
                      v-model="item.seller_name"
                      :rules="validationRulesRequired"
                      hide-details="auto"
                    >
                      <template #label>
                        Seller Name
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template>
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" sm="12">
                    <v-text-field
                      dense
                      v-model="item.property_owner_name"
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
                </v-row>

                <v-row>
                  <v-col cols="12" md="4" sm="12">
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

                  <v-col cols="12" md="4" sm="12">
                    <v-text-field
                      dense
                      v-numeric
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

                  <v-col cols="12" md="4" sm="12">
                    <v-text-field
                      dense
                      v-numeric
                      v-model="item.phone_2"
                      :rules="validationRulesRequired"
                      hide-details="auto"
                    >
                      <template #label>
                        Secondary Phone
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template>
                    </v-text-field>
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
                      v-model="item.house_no"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" sm="12">
                    <v-text-field
                      dense
                      v-model="item.street_name"
                      :rules="validationRulesRequired"
                      hide-details="auto"
                    >
                      <template #label>
                        Address Line – Street Name and District
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template></v-text-field
                    >
                  </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="4" sm="12">
                    <v-text-field
                      dense
                      label="Zip Code"
                      v-model="item.zipcode"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4" sm="12">
                    <v-autocomplete
                      :disabled="isItemLoading"
                      v-model="item.province_id"
                      :items="provinceItems"
                      item-text="province_name"
                      item-value="province_id"
                      dense
                      chips
                      :rules="validationRulesRequired"
                      @change="changeProvince"
                      small-chips
                      label="Select Provinces of Operations"
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
                      ><template #label>
                        Select Town
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template></v-autocomplete
                    >
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
                      ><template #label>
                        Select Barangay
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template></v-autocomplete
                    >
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
                    ></v-autocomplete>
                  </v-col>
                  
                  <v-col cols="12" md="6" sm="12">
                    <v-text-field
                      v-model="item.notes_about_seller"
                      dense
                      chips
                      small-chips
                      label="Notes About Seller"
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
import { addSeller } from "../seller/addSeller";
export default addSeller;
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
