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
                  >Home <v-icon>mdi-chevron-right</v-icon> Property
                  <v-icon>mdi-chevron-right</v-icon>
                  {{ entity }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text primary-button mx-0 mr-4 mt-4"
            @click="
              isAddEdit = true;
              addEditItem();
            "
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
                  <v-col cols="12">
                    <v-autocomplete
                      v-model="agentId"
                      :items="agentItems"
                      label="Agent"
                      item-text="full_name"
                      item-value="user_id"
                      dense
                      :rules="validationRulesRequired"
                     
                    >
                    <template #label>
                      Agent
                      <span class="red--text">
                        <strong>*</strong>
                      </span>
                    </template>
                    </v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-autocomplete
                      v-model="sellerId"
                      :items="sellerItems"
                      label="Select Seller"
                      item-text="seller_name"
                      item-value="seller_id"
                      dense
                      :rules="validationRulesRequired"
                      @keypress="acceptNotCharacter"
                    >
                    <template #label>
                      Select Seller
                      <span class="red--text">
                        <strong>*</strong>
                      </span>
                    </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="6">
                    <v-autocomplete
                      v-model="isFeatured"
                      :items="featureItems"
                      label="Featured Property"
                      dense
                      :rules="validationRulesRequired"
                      @keypress="acceptNotCharacter"
                    >
                    <template #label>
                      Featured Property
                      <span class="red--text">
                        <strong>*</strong>
                      </span>
                    </template>
                    </v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <v-text-field
                      dense
                      label="Price Asked"
                      v-numeric
                      v-model="priceAsked"
                      :rules="validationRulesRequired"
                      hide-details="auto"
                    >
                    <template #label>
                      Price Asked
                      <span class="red--text">
                        <strong>*</strong>
                      </span>
                    </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      dense
                      label="Land Area"
                      v-model="landArea"
                      v-numeric
                      :rules="validationRulesRequired"
                      hide-details="auto"
                    >
                    <template #label>
                      Land Area
                      <span class="red--text">
                        <strong>*</strong>
                      </span>
                    </template>
                    </v-text-field>
                  </v-col>

                  <v-col cols="4">
                    <v-text-field
                      dense
                      v-numeric
                      label="Building Area"
                      v-model="buildingArea"
                      hide-details="auto"
                      :rules="validationRulesRequired"
                    >
                    <template #label>
                      Building Area
                      <span class="red--text">
                        <strong>*</strong>
                      </span>
                    </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      dense
                      label="Property Name"
                      v-model="propertyName"
                      :rules="validationRulesRequired"
                      hide-details="auto"
                    >
                    <template #label>
                      Property Name
                      <span class="red--text">
                        <strong>*</strong>
                      </span>
                    </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      dense
                      label="Property Headline"
                      v-model="propertyHeadline"
                      :rules="validationRulesRequired"
                      hide-details="auto"
                    >
                    <template #label>
                      Property Headline
                      <span class="red--text">
                        <strong>*</strong>
                      </span>
                    </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      rows="3"
                      dense
                      label="Property Description"
                      v-model="propertyDescription"
                      hide-details="auto"
                      :rules="validationRulesRequired"
                    >
                    <template #label>
                      Property Description
                      <span class="red--text">
                        <strong>*</strong>
                      </span>
                    </template>
                    </v-textarea>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="4">
                    <v-autocomplete
                      v-model="propertyClassification"
                      :items="propertyClassificationItems"
                      label="Property Classification"
                      item-text="property_classification"
                      item-value="property_classification_id"
                      dense
                      :rules="validationRulesRequired"
                      @keypress="acceptNotCharacter"
                    >
                    <template #label>
                      Property Classification
                      <span class="red--text">
                        <strong>*</strong>
                      </span>
                    </template>
                    </v-autocomplete>
                  </v-col>

                  <v-col cols="4">
                    <v-autocomplete
                      v-model="productCategory"
                      :items="productCategoryItems"
                      label="Select Category"
                      item-text="product_category_name"
                      item-value="product_category_id"
                      dense
                      :rules="validationRulesRequired"
                      @keypress="acceptNotCharacter"
                    >
                    <template #label>
                      Select Category
                      <span class="red--text">
                        <strong>*</strong>
                      </span>
                    </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="4">
                    <v-autocomplete
                      v-model="propertyType"
                      :items="propertyTypeItems"
                      label="Select Property Type"
                      item-text="property_type"
                      item-value="property_type_id"
                      dense
                      :rules="validationRulesRequired"
                      @keypress="acceptNotCharacter"
                    >
                    <template #label>
                      Select Property Type
                      <span class="red--text">
                        <strong>*</strong>
                      </span>
                    </template>
                    </v-autocomplete>
                  </v-col>
                </v-row>

                <v-row >
                  <v-col cols="4" v-if="propertyClassification == 3">
                    <v-autocomplete
                      v-model="agryId"
                      :items="agryItems"
                      label="Select Agri Type"
                      item-text="agri_type_name"
                      item-value="agri_type_id"
                      dense
                      :rules="validationRulesRequired"
                      @keypress="acceptNotCharacter"
                    >
                    <template #label>
                      Select Agri Type
                      <span class="red--text">
                        <strong>*</strong>
                      </span>
                    </template>
                    </v-autocomplete>
                  </v-col>

                  <v-col cols="4">
                    <v-autocomplete
                    v-if="propertyDataProps!=null"
                      v-model="status"
                      :items="statusItems"
                      label="Select Status"
                      item-text="text"
                      item-value="value"
                      dense
                    ></v-autocomplete>
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
                  <v-col cols="3">
                    <v-text-field
                      dense
                      label="Unit Number"
                      v-model="unitNumber"
                      hide-details="auto"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      dense
                      label="House/Lot Number"
                      v-model="houseLotNumber"
                      hide-details="auto"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      dense
                      label="Address Line – Street Name and District"
                      v-model="streetName"
                      :rules="validationRulesRequired"
                      hide-details="auto"
                    >
                    <template #label>
                      Address Line – Street Name and District
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="4">
                    <v-text-field
                      dense
                      label="Property/Building Name"
                      v-model="propertyBuildingName"
                      hide-details="auto"
                    >
                    </v-text-field>
                  </v-col>

                  <v-col cols="4">
                    <v-autocomplete
                      v-model="province"
                      :items="provinceItems"
                      item-text="province_name"
                      item-value="province_id"
                      dense
                      chips
                      :rules="validationRulesRequired"
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

                  <v-col cols="4">
                    <v-autocomplete
                      v-model="town"
                      :items="townItems"
                      item-text="town_name"
                      item-value="town_id"
                      dense
                      chips
                      :rules="validationRulesRequired"
                      small-chips
                      label="Select Town"
                      @change="changeTown"
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
                </v-row>

                <v-row>
                  <v-col cols="3">
                    <v-autocomplete
                      v-model="barangay"
                      :items="barangayItems"
                      item-text="barangay_name"
                      item-value="barangay_id"
                      dense
                      chips
                      :rules="validationRulesRequired"
                      small-chips
                      label="Select Barangay"
                      @change="changeBarangay"
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
                  <v-col cols="3">
                    <v-autocomplete
                      v-model="subdivision"
                      :items="subdivisionItems"
                      item-text="subdivision_name"
                      item-value="subdivision_id"
                      dense
                      chips
                      :rules="validationRulesRequired"
                      small-chips
                      label="Select Subdivision"
                      @keypress="acceptNotCharacter"
                    >
                    <template #label>
                      Select Subdivision
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      dense
                      label="Zip Code"
                      v-model="zipCode"
                      :rules="validationRules_zipCode4DigitOptional"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                    v-model="floorLevel"
                      dense
                      chips
                      small-chips
                      label="Floor or Level"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      dense
                      label="Longitude"
                      v-model="longitude"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      dense
                      label="Latitude"
                      v-model="latitude"
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
                  <strong
                    >Property : House | Apartment | Townhouse | Condo</strong
                  >
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content eager>
                <v-row class="mt-4">
                  <v-col cols="3">
                    <v-autocomplete
                      v-model="numberBedrooms"
                      :items="numberBedroomsItems"
                      dense
                      chips
                      :rules="validationRulesRequired"
                      small-chips
                      label="Number of Bedrooms"
                      @keypress="acceptNotCharacter"
                    >
                    <template #label>
                      Number of Bedrooms
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="3">
                    <v-autocomplete
                      v-model="numberToilets"
                      :items="numberToiletsItems"
                      dense
                      chips
                      :rules="validationRulesRequired"
                      small-chips
                      label="Number of Toilets"
                      @keypress="acceptNotCharacter"
                    >
                    <template #label>
                      Number of Toilets
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="6">
                    <v-autocomplete
                      v-model="carSpacesUncovered"
                      :items="carSpacesUncoveredItems"
                      dense
                      chips
                      small-chips
                      label="Car Spaces Uncovered"
                      @keypress="acceptNotCharacter"
                    ></v-autocomplete>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="3">
                    <v-autocomplete
                      v-model="garageSpacesCovered"
                      :items="garageSpacesCoveredItems"
                      dense
                      chips
                      small-chips
                      label="Garage Spaces Covered"
                      @keypress="acceptNotCharacter"
                    ></v-autocomplete>
                  </v-col>

                  <v-col cols="3">
                    <v-autocomplete
                      v-model="furnishing"
                      :items="furnishingItems"
                      dense
                      chips
                      small-chips
                      label="Select Furnishing"
                      @keypress="acceptNotCharacter"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel v-if="productCategory == 1">
              <v-expansion-panel-header class="grey lighten-4">
                <div>
                  <v-icon color="success" class="mr-4"
                    >mdi-home-map-marker</v-icon
                  >
                  <strong>Product Category = For Rent</strong>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content eager>
                <v-row class="mt-4">
                  <v-col cols="3">
                    <v-text-field
                      dense
                      label="Rental Price Asked"
                      v-model="rentalPriceAsked"
                      :rules="validationRulesRequired"
                      @keypress="acceptNotCharacter"
                      
                      hide-details="auto"
                    >
                    <template #label>
                      Rental Price Asked
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-autocomplete
                      v-model="minimumRentalPeriod"
                      :items="minimumRentalPeriodItems"
                      dense
                      chips
                      @keypress="acceptNotCharacter"
                      small-chips
                      label="Minimum Rental Period"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="3">
                    <v-autocomplete
                      v-model="maximumRentalPeriod"
                      :items="maximumRentalPeriodItems"
                      dense
                      chips
                      @keypress="acceptNotCharacter"
                      small-chips
                      label="Maximum Rental Period"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="3">
                    <v-autocomplete
                      v-model="dayMonthRentDue"
                      :items="dayMonthRentDueItems"
                      dense
                      chips
                      @keypress="acceptNotCharacter"
                      small-chips
                      label="Day of Month Rent Due"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3">
                    <v-autocomplete
                      v-model="periodCanExtend"
                      :items="periodCanExtendItems"
                      dense
                      chips
                      @keypress="acceptNotCharacter"
                      small-chips
                      label="Period Can Extend"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="3">
                    <v-menu
                      ref="menuCurrentRentalExpires"
                      v-model="menuCurrentRentalExpires"
                      :close-on-content-click="false"
                      :return-value.sync="currentRentalExpires"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="currentRentalExpires"
                          label="Date Rental Started"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          dense
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="currentRentalExpires"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="menuCurrentRentalExpires = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="
                            $refs.menuCurrentRentalExpires.save(
                              currentRentalExpires
                            )
                          "
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="3">
                    <v-menu
                      ref="menuDateRentalStarted"
                      v-model="menuDateRentalStarted"
                      :close-on-content-click="false"
                      :return-value.sync="dateRentalStarted"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dateRentalStarted"
                          label="Current Rental Expires"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          dense
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="dateRentalStarted"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="menuDateRentalStarted = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="
                            $refs.menuDateRentalStarted.save(dateRentalStarted)
                          "
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="3">
                    <v-menu
                      ref="menuRentalSwitchOn"
                      v-model="menuRentalSwitchOn"
                      :close-on-content-click="false"
                      :return-value.sync="rentalSwitchOn"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="rentalSwitchOn"
                          label="View Rental Switch ON"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          dense
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="rentalSwitchOn"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="menuRentalSwitchOn = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menuRentalSwitchOn.save(rentalSwitchOn)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel v-if="productCategory == 3">
              <v-expansion-panel-header class="grey lighten-4">
                <div>
                  <v-icon color="success" class="mr-4"
                    >mdi-home-map-marker</v-icon
                  >
                  <strong>Product Category = For Sale</strong>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content eager>
                <v-row class="mt-4">
                  <v-col cols="3">
                    <v-text-field
                      dense
                      label="Sale Price Asked"
                      v-model="salePriceAsked"
                      :rules="validationRulesRequired"
                      hide-details="auto"
                    >
                    <template #label>
                      Sale Price Asked
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template>
                    </v-text-field>
                  </v-col>

                  <v-col cols="3">
                    <v-text-field
                      dense
                      label="Price/SqM"
                      v-model="pricePerSqm"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-autocomplete
                      v-model="productMode"
                      :items="productModeItems"
                      dense
                      chips
                      :rules="validationRulesRequired"
                      @keypress="acceptNotCharacter"
                      small-chips
                      label="Product Mode"
                    >
                    <template #label>
                      Product Mode
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="3">
                    <v-menu
                      ref="menuSaleSwitchOn"
                      v-model="menuSaleSwitchOn"
                      :close-on-content-click="false"
                      :return-value.sync="saleSwitchOn"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="saleSwitchOn"
                          label="Sale Switch ON"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          dense
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="saleSwitchOn" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="menuSaleSwitchOn = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menuSaleSwitchOn.save(saleSwitchOn)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row> </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header class="grey lighten-4">
                <div>
                  <v-icon color="success" class="mr-4"
                    >mdi-home-map-marker</v-icon
                  >
                  <strong>Detail & Features</strong>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content eager>
                <v-container fluid>
                  <v-row class="mt-4">
                    <v-col cols="3">
                      <v-autocomplete
                        v-model="heatingtype"
                        :items="heatingTypeItems"
                        dense
                        chips
                        @keypress="acceptNotCharacter"
                        small-chips
                        label="Heating Type"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="3">
                      <v-autocomplete
                        v-model="exteriour"
                        :items="exteriorItems"
                        dense
                        chips
                        small-chips
                        label="Exterior"
                        @keypress="acceptNotCharacter"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="3">
                      <v-autocomplete
                        v-model="kitchen"
                        :items="kitchenFeaturesItems"
                        dense
                        chips
                        @keypress="acceptNotCharacter"
                        small-chips
                        label="Kitchen Features"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="3">
                      <v-autocomplete
                        v-model="cooling"
                        :items="coolingItems"
                        dense
                        chips
                        @keypress="acceptNotCharacter"
                        small-chips
                        label="Cooling"
                      >
                      </v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="3">
                      <v-checkbox
                        v-model="garage"
                        label="Garage"
                        color="primary"
                        value="Yes"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="3">
                      <v-checkbox
                        v-model="elevator"
                        label="Elevator"
                        color="primary"
                        value="Yes"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="3">
                      <v-checkbox
                        v-model="freewifi"
                        label="Free Wi-Fi"
                        color="primary"
                        value="Yes"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="3">
                      <v-checkbox
                        v-model="fireplace"
                        label="Fireplace"
                        color="primary"
                        value="Yes"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="3">
                      <v-checkbox
                        v-model="swimmingPool"
                        label="Swimming Pool"
                        color="primary"
                        value="Yes"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-container>
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
import { addProperty } from "../property/addProperty";
export default addProperty;
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