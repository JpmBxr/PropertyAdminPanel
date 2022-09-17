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
      </v-row>

      <v-row class="ml-4 mr-4 mt-1 mb-4">
        <v-toolbar-title dark color="primary">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                <strong>Name: {{ propertyName }}</strong>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        Agent: {{ propertyAgent }}
      </v-row>

      <transition name="fade" mode="out-in">
        <v-expansion-panels class="px-4 pb-4" v-model="pnlSettings">
          <v-expansion-panel>
            <v-expansion-panel-header class="grey lighten-4">
              <div>
                <v-icon color="success" class="mr-4"
                  >mdi-home-map-marker</v-icon
                >
                <strong>Media - Photos & Videos</strong>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content eager>
              <v-container fluid>
                <v-card>
                  <v-tabs
                    v-model="tab"
                    background-color="deep-purple accent-4"
                    centered
                    dark
                    icons-and-text
                  >
                    <v-tabs-slider></v-tabs-slider>

                    <v-tab href="#tab-1">
                      Image
                      <v-icon>mdi-image-area</v-icon>
                    </v-tab>

                    <v-tab href="#tab-2">
                      Videos
                      <v-icon>mdi-video</v-icon>
                    </v-tab>
                  </v-tabs>

                  <v-tabs-items v-model="tab">
                    <v-form
                      ref="holdingFormAddEditImage"
                      v-model="isFormAddEditValid"
                      lazy-validation
                    >
                      <v-tab-item value="tab-1">
                        <v-card flat>
                          <v-row dense class="mt-4">
                            <v-col cols="5">
                              <v-file-input
                                class="px-4"
                                v-model="selectedPropertyImage"
                                color="primary"
                                outlined
                                dense
                                show-size
                                accept=".jpg,.png,.jpeg"
                                :rules="validationRulesRequired"
                              >
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
                            <v-col cols="5">
                              <v-text-field
                                outlined
                                dense
                                label="Description"
                                v-model="description"
                                :rules="validationRulesRequired"
                                hide-details="auto"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="2">
                              <v-btn
                                color="blue-grey"
                                class="mt-1 white--text"
                                @click="uploadImage"
                              >
                                Upload
                                <v-icon right dark> mdi-cloud-upload </v-icon>
                              </v-btn>

                              <!-- <v-btn icon class="d-none d-lg-block">
                                <v-icon color="blue-grey">
                                  mdi-cloud-upload</v-icon
                                >
                              </v-btn> -->
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-tab-item>
                    </v-form>
                    <v-form
                      ref="holdingFormAddEditVideo"
                      v-model="isFormAddEditValid"
                      lazy-validation
                    >
                      <v-tab-item value="tab-2">
                        <v-card flat>
                          <v-row dense class="mt-4">
                            <v-col cols="5">
                              <v-text-field
                                outlined
                                dense
                                label="URL"
                                v-model="videoUrl"
                                :rules="validationRulesRequired"
                                hide-details="auto"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="5">
                              <v-text-field
                                outlined
                                dense
                                label="Description"
                                v-model="videoDescription"
                                :rules="validationRulesRequired"
                                hide-details="auto"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="2">
                              <v-btn
                                color="blue-grey"
                                class="mb-1 white--text"
                                @click="uploadVideo"
                              >
                                Upload
                                <v-icon right dark> mdi-cloud-upload </v-icon>
                              </v-btn>

                              <!-- <v-btn icon class="d-none d-lg-block">
                                <v-icon color="blue-grey">
                                  mdi-cloud-upload</v-icon
                                >
                              </v-btn> -->
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-tab-item>
                    </v-form>
                  </v-tabs-items>
                </v-card>
              </v-container>
              <v-container fluid>
                <v-row dense>
                  <v-col v-for="card in imageVideoList" :key="card.id" cols="4">
                    <v-card>
                      <v-img
                        :src="
                          card.type == 'Image'
                            ? propertyImageUrl + card.images_video
                            : card.images_video
                        "
                        class="white--text align-end"
                        height="200px"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      >
                        <v-card-title v-text="card.description"></v-card-title>
                      </v-img>

                      <v-card-actions>
                        <v-btn
                          icon
                          v-if="card.isDefault == 0 && card.type == 'Image'"
                          @click="makeDefault(card)"
                        >
                          <v-icon>mdi-bookmark-check</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>

                        <v-btn icon v-if="card.type == 'Image'">
                          <v-icon color="info">mdi-image-area</v-icon>
                        </v-btn>
                        <v-btn icon v-if="card.type == 'Video'">
                          <v-icon color="info">mdi-video</v-icon>
                        </v-btn>

                        <v-btn
                          icon
                          v-if="card.isDefault == 1 && card.type == 'Image'"
                        >
                          <v-icon color="success"
                            >mdi-check-circle-outline</v-icon
                          >
                        </v-btn>

                        <v-btn icon @click="deleteImageVideo(card.id)">
                          <v-icon color="error">mdi-delete-outline</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header class="grey lighten-4">
              <div>
                <v-icon color="success" class="mr-4"
                  >mdi-home-map-marker</v-icon
                >
                <strong>Ameneties</strong>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content eager>
              <v-container fluid>
                <v-row dense>
                  <v-col cols="12">
                    <v-autocomplete
                      v-model="propertyAmeneties"
                      :items="ameneties"
                      dense
                      chips
                      small-chips
                      label="Select Aminities"
                      multiple
                      item-value="id"
                      item-text="name"
                      solo
                    ></v-autocomplete>
                  </v-col>
                  <v-col>
                    <v-btn
                      :disabled="isLoaderActive"
                      class="white--text primary-button mx-0 d-none d-md-block mr-4 mt-4"
                      @click="saveAmeneties"
                    >
                      Save Ameneties
                      <v-icon right dark> mdi-plus </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </transition>

      <!-- Card End -->
    </v-card>
  </v-container>
</template>
<script>
import { addPropertyImage } from "../property/addPropertyImage";
export default addPropertyImage;
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