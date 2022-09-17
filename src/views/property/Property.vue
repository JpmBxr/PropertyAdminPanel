<template>
  <!-- Card Start -->
  <v-container fluid class="pa-4">
    <v-overlay :value="isLoaderActive" color="primary">
      <v-progress-circular
        indeterminate
        size="50"
        color="primary"
      ></v-progress-circular>
    </v-overlay>
    <v-card>
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
          :disabled="isLoaderActive"
          class="white--text primary-button mx-0 d-none d-md-block mr-4 mt-4"
          @click="goToAddProperty"
        >
          Add {{ entity }}
          <v-icon right dark> mdi-plus </v-icon>
        </v-btn>
      </v-row>

      <v-row class="ml-4 mr-4 mt-1 mb-4">
        <v-text-field
          class="mt-4"
          v-model="searchText"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          @input="searchInfo"
        ></v-text-field>
      </v-row>

      <transition name="fade" mode="out-in">
        <v-list two-line class="pb-16">
          <v-list-item-group active-class="pink--text">
            <template v-for="(item, index) in propertyListItem">
              <v-card :key="item.id">
                <v-list-item>
                  <template v-slot:default="{ active }">
                    <v-list-item-avatar
                      tile
                      height="auto"
                      width="250"
                      color="grey darken-3"
                    >
                      <v-img
                        :src="propertyImageUrl + item.images_video"
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.property_name"
                        class="text-h6"
                      ></v-list-item-title>

                      <v-list-item-subtitle
                        class="text--primary font-weight-medium"
                        v-text="item.property_headline"
                      ></v-list-item-subtitle>

                      <v-list-item-subtitle
                        v-text="item.property_description"
                      ></v-list-item-subtitle>

                      <v-chip-group
                        active-class="deep-purple accent-4 white--text"
                        column
                      >
                        <v-chip
                          @click="showAgentPhoneNumber(item)"
                          color="primary"
                          outlined
                          >Contact Agent</v-chip
                        >
                        <v-chip color="primary" v-if="false"
                          >View Phone No</v-chip
                        >
                      </v-chip-group>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-list-item-action-text
                        v-text="item.action"
                      ></v-list-item-action-text>
                      <v-btn
                        color="primary"
                        class="white--text"
                        fab
                        icon
                        small
                        @click="addEditImage(item)"
                      >
                        <v-icon>mdi-image-area-close</v-icon>
                      </v-btn>

                      <v-btn
                        color="info"
                        class="white--text"
                        fab
                        icon
                        small
                        @click="goToEditProperty(item)"
                      >
                        <v-icon>mdi-pencil-circle</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </template>
                </v-list-item>
                <v-divider
                  v-if="index < propertyListItem.length - 1"
                  :key="index"
                ></v-divider>
                <v-card-actions class="p-0">
                  <v-list-item class="grow">
                    <v-list-item-avatar color="grey darken-3">
                      <v-img
                        class="elevation-6"
                        alt=""
                        src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                      ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title
                        ><strong>Seller : </strong>
                        {{ item.seller_name }}</v-list-item-title
                      >
                    </v-list-item-content>
                    <v-row class="d-none d-md-flex d-lg-non">
                      <v-col cols="12" md="3" class="p-0">
                        <v-row align="center" justify="center">
                          <v-icon class="mr-1"> mdi-bed </v-icon>
                        </v-row>
                        <v-row align="center" justify="center">
                          <v-divider inset class="mx-2"></v-divider>
                        </v-row>
                        <v-row align="center" justify="center">
                          <span class="subheading"
                            >Bedroom : {{ item.no_bedrooms }}</span
                          >
                        </v-row>
                      </v-col>

                      <v-col class="p-0" cols="12" md="3">
                        <v-row align="center" justify="center">
                          <v-icon class="mr-1"> mdi-scale-bathroom </v-icon>
                        </v-row>
                        <v-row align="center" justify="center">
                          <v-divider inset class="mx-2"></v-divider>
                        </v-row>
                        <v-row align="center" justify="center">
                          <span class="subheading"
                            >Bathroom : {{ item.no_toilets }}</span
                          >
                        </v-row>
                      </v-col>

                      <v-col class="p-0" cols="12" md="3">
                        <v-row align="center" justify="center">
                          <v-icon class="mr-1"> mdi-home-floor-3</v-icon>
                        </v-row>
                        <v-row align="center" justify="center">
                          <v-divider inset class="mx-2"></v-divider>
                        </v-row>
                        <v-row align="center" justify="center">
                          <span class="subheading"
                            >Floor : {{ item.select_floor_level }}</span
                          >
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-spacer></v-spacer>
                    <v-icon class="mr-1"> mdi-heart </v-icon>
                    <span class="subheading mr-2">256</span>
                    <span class="mr-1">·</span>
                    <v-icon class="mr-1"> mdi-share-variant </v-icon>
                    <span class="subheading">45</span>
                  </v-list-item>
                </v-card-actions>
              </v-card>
            </template>
          </v-list-item-group>
        </v-list>
      </transition>

      <!-- Card End -->
    </v-card>
  </v-container>
</template>
<script>
import { property } from "../property/property";
export default property;
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
