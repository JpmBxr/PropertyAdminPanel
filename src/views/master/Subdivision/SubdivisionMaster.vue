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
    <v-card class="mb-10">
      <v-row class="ml-4 mr-4 mt-1 mb-0">
        <v-toolbar-title dark color="primary">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5">
                <strong>{{ entity }}</strong>
              </v-list-item-title>
              <v-list-item-subtitle
                >Home <v-icon>mdi-chevron-right</v-icon> Master
                <v-icon>mdi-chevron-right</v-icon>
                {{ entity }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          v-permission="'Add Master'"
          :disabled="tableDataLoading"
          class="white--text primary-button mx-0 d-none d-md-block mt-4 mr-4"
          @click="
            isAddEdit = true;
            showAddEditDialog(null);
          "
        >
          Add {{ entity }}
          <v-icon right dark> mdi-plus </v-icon>
        </v-btn>
      </v-row>

      <transition name="fade" mode="out-in">
        <v-data-table
          :headers="tableHeader"
          :items="dataTableRowNumbering"
          item-key="id"
          fixed-header
          height="450"
          :options.sync="pagination"
          class="elevation-0"
          :loading="tableDataLoading"
          :loading-text="tableLoadingDataText"
          :server-items-length="totalItemsInDB"
          :items-per-page="7"
          :footer-props="{
            itemsPerPageOptions: [7, 15, 25, 50],
          }"
        >
          <template v-slot:no-data>
            <p class="font-weight-black bold title" style="color: red">
              No Data Found
            </p>
          </template>

          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                class="mt-4"
                v-model="searchText"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                @input="searchInfo"
              ></v-text-field>
              <v-spacer></v-spacer>
              <span class="text-right mx-1 d-none d-md-block">
                <strong class="primary--text">
                  {{ totalItemsInDB }}
                </strong>
                Records Found
              </span>
              <v-btn
                class="mx-md-4 mx-sm-1"
                icon
                small
                color="success"
                size="24"
                v-if="!tableDataLoading"
              >
                <download-excel
                  :data="tableItems"
                  :fields="excelFields"
                  :name="excelFileName"
                >
                  <v-icon dark>mdi-cloud-download</v-icon>
                </download-excel>
              </v-btn>

              <v-btn
                v-permission="'Add Master'"
                icon
                small
                size="24"
                :disabled="tableDataLoading"
                color="primary"
                class="white--text my-auto mr-1 ml-3 d-md-none"
                @click="
                  isAddEdit = true;
                  showAddEditDialog(null);
                "
              >
                <v-icon>mdi-plus-circle</v-icon>
              </v-btn>
            </v-toolbar>
          </template>

          <template v-slot:item.subdivision_status="{ item }">
            <v-switch
              v-permission="'Enable Master'"
              :color="item.subdivision_status == 'Active' ? 'green' : 'red'"
              inset
              dense
              false-value="Inactive"
              true-value="Active"
              v-model="item.subdivision_status"
              @change="enableDisableItem(item)"
            >
            </v-switch>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon
              v-permission="'Edit Master'"
              size="22"
              class="mx-1 fitPotPrimaryIcon"
              @click="
                isAddEdit = false;
                showAddEditDialog(item);
              "
              >mdi-square-edit-outline</v-icon
            >

            <v-icon
              v-permission="'Delete Master'"
              size="22"
              class="mr-0 ml-1 fitPotErrorIcon"
              @click="deleteItem(item)"
              >mdi-delete-outline</v-icon
            >
          </template>
        </v-data-table>
      </transition>


      <!--start of Add / edit -->
      <v-dialog
        transition="dialog-top-transition"
        v-model="addEditDialog"
        max-width="600"
        scrollable
        :fullscreen="$vuetify.breakpoint.smAndDown"
      >
        <template v-slot:default="dialog">
          <v-overlay :value="isDialogLoaderActive" color="primary">
            <v-progress-circular
              indeterminate
              size="50"
              color="primary"
            ></v-progress-circular>
          </v-overlay>
          <v-card id="mydivheader">
            <v-toolbar
              color="primary"
              dark
              :max-height="$vuetify.breakpoint.smAndDown ? 56 : '20vh'"
            >
              <v-toolbar-title>{{ addEditText }}</v-toolbar-title>
              <v-spacer></v-spacer><v-spacer></v-spacer>
              <v-btn icon dark @click="addEditDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text class="py-4 px-2">
              <v-form
                ref="holdingFormAddEdit"
                v-model="isFormAddEditValid"
                lazy-validation
              >
                <v-row class="mx-auto d-flex">
                  <v-col cols="12" md="6" class="pt-5">
                    <v-text-field
                      v-model="item.subdivision_name"
                      dense
                      :rules="validationRulesRequired"
                    >
                      <template #label>
                        Name
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template>
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" class="pt-5">
                    <v-select
                      v-model="item.town_id"
                      :items="townItems"
                      label="Select Town"
                      item-text="town_name"
                      item-value="town_id"
                      :rules="validationRulesRequired"
                      dense
                      @change="getProvinceWithoutPagination(item)"
                    >
                      <template #label>
                        Select Town
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template></v-select
                    >
                  </v-col>
                </v-row>

                <v-row class="mx-auto d-flex">
                  <v-col cols="6" md="6" class="pb-1">
                    <v-autocomplete
                      v-model="item.province_id"
                      :items="provinceItems"
                      label="Select Province"
                      :rules="validationRulesRequired"
                      item-text="province_name"
                      item-value="province_id"
                      dense
                      @change="getBarangayWithoutPagination(item)"
                      ><template #label>
                        Select Province
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template></v-autocomplete
                    >
                  </v-col>
                    <v-col cols="6" md="6" class="pb-1">
                      <v-select
                      v-model="item.barangay_id"
                      :items="barangayItems"
                      label="Select Barangay"
                      item-text="barangay_name"
                      item-value="barangay_id"
                      dense
                      @change="getAdjacentSubdivisionWithoutPagination(item)"
                      ><template #label>
                        Select Barangay
                        <span class="red--text">
                          <strong>*</strong>
                        </span>
                      </template></v-select
                    >
                    </v-col>
                </v-row>
                <v-row class="mx-auto d-flex">
                  <v-col cols="12" md="12" class="pb-1">
                    <v-autocomplete
                      v-model="item.adjacent_subdivision_id"
                      :items="adjacentSubdivisionsItems"
                      label=" Select Adjacent Subdivisions"
                      item-text="adjacentSubdivision"
                      item-value="subdivision_id"
                      multiple
                      chips
                      small-chips
                      @keypress="acceptNotCharacter"
                    ></v-autocomplete>

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
                @click="addEditItem()"
                :disabled="!isFormAddEditValid"
              >
                {{ addUpdateButtonText }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      <!--end of add/edit -->
      <!-- Card End -->
    </v-card>
  </v-container>
</template>
<script>
import { subdivisionMaster } from "../Subdivision/subdivisionMaster";
export default subdivisionMaster;

(function() {
  // make vuetify dialogs movable
  const d = {};
  document.addEventListener("mousedown", (e) => {
    const closestDialog = e.target.closest(".v-dialog.v-dialog--active");
    if (
      e.button === 0 &&
      closestDialog != null &&
      e.target.classList.contains("v-toolbar__content")
    ) {
      // element which can be used to move element
      d.el = closestDialog; // element which should be moved
      d.mouseStartX = e.clientX;
      d.mouseStartY = e.clientY;
      d.elStartX = d.el.getBoundingClientRect().left;
      d.elStartY = d.el.getBoundingClientRect().top;
      d.el.style.position = "fixed";
      d.el.style.margin = 0;
      d.oldTransition = d.el.style.transition;
      d.el.style.transition = "none";
    }
  });
  document.addEventListener("mousemove", (e) => {
    if (d.el === undefined) return;
    d.el.style.left =
      Math.min(
        Math.max(d.elStartX + e.clientX - d.mouseStartX, 0),
        window.innerWidth - d.el.getBoundingClientRect().width
      ) + "px";
    d.el.style.top =
      Math.min(
        Math.max(d.elStartY + e.clientY - d.mouseStartY, 0),
        window.innerHeight - d.el.getBoundingClientRect().height
      ) + "px";
  });
  document.addEventListener("mouseup", () => {
    if (d.el === undefined) return;
    d.el.style.transition = d.oldTransition;
    d.el = undefined;
  });
  setInterval(() => {
    // prevent out of bounds
    const dialog = document.querySelector(".v-dialog.v-dialog--active");
    if (dialog === null) return;
    dialog.style.left =
      Math.min(
        parseInt(dialog.style.left),
        window.innerWidth - dialog.getBoundingClientRect().width
      ) + "px";
    dialog.style.top =
      Math.min(
        parseInt(dialog.style.top),
        window.innerHeight - dialog.getBoundingClientRect().height
      ) + "px";
  }, 100);
})();
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
