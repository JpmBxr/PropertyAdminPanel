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
                >Home <v-icon>mdi-chevron-right</v-icon> Entity
                <v-icon>mdi-chevron-right</v-icon>
                {{ entity }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          v-permission="'Add Agency'"
          :disabled="tableDataLoading"
          class="white--text primary-button mx-0 d-none d-md-block mr-4 mt-4"
          @click="
            isAddEdit = true;
            showAddEditPage(null);
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
          class="elevation-0 mb-10"
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
            </v-toolbar>
          </template>

          <template v-slot:item.status="{ item }">
            <v-chip x-small :color="setStatusColor(item.status)" dark>{{
              item.status
            }}</v-chip>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon
              v-permission="'Edit Agency'"
              size="22"
              class="mx-1 fitPotPrimaryIcon"
              @click="
                isAddEdit = false;
                showAddEditPage(item);
              "
              >mdi-square-edit-outline</v-icon
            >

            <v-icon
              size="22"
              class="mr-0 ml-1 fitPotErrorIcon"
              @click="deleteItem(item)"
              >mdi-delete-outline</v-icon
            >
          </template>
        </v-data-table>
      </transition>
      <!-- Card End -->
    </v-card>
  </v-container>
</template>
<script>
import { agency } from "../agency/agency";
export default agency;
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
