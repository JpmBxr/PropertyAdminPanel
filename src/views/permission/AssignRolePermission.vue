<template>
  <v-container fluid class="pa-4">
    <v-overlay :value="isLoaderActive" color="primary">
      <v-progress-circular
        indeterminate
        size="50"
        color="primary"
      ></v-progress-circular>
    </v-overlay>
    <v-card class="mb-10">
      <v-row class="ml-4 mr-4 mt-1 mb-4">
        <v-toolbar-title dark color="primary">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5">
                <strong>{{ entity }}</strong>
              </v-list-item-title>
              <v-list-item-subtitle
                >Home <v-icon>mdi-chevron-right</v-icon> Settings
                <v-icon>mdi-chevron-right</v-icon>
                {{ entity }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          class="ma-2 mt-4 rounded"
          tile
          color="primary"
          :disabled="isPermissionDataProcessing || tableDataLoading"
          @click="assignPermissionRoleWise"
          >{{
            isPermissionDataProcessing == true ? "Processing" : "Save"
          }}</v-btn
        >
        <v-btn
          class="ma-2 mt-4 rounded"
          outlined
          tile
          color="warning"
          :disabled="tableDataLoading || isPermissionDataProcessing"
          dark
          >Reset</v-btn
        >
      </v-row>
      <transition name="fade" mode="out-in">
        <v-data-table
          :headers="tableHeaders"
          :items="tableItems"
          dense
          group-by="Module"
          item-key="permission_id"
          groupable
          fixed-header
          height="500"
          class="elevation-1"
          hide-default-footer
          disable-pagination
          :loading="tableDataLoading"
          :loading-text="tableLoadingDataText"
        >
          <template v-slot:no-data>
            <p class="font-weight-black bold title" style="color: red">
              No data found
            </p>
          </template>

          <template v-slot:item.is_permission_assigned="{ item }">
            <v-row class="p-0">
              <v-col class="p-0">
                <v-switch
                  class="ma-0"
                  color="info"
                  v-model="item.is_permission_assigned"
                  @change="assignPermissionRoleWise(item, $event)"
                ></v-switch>
              </v-col>

              <v-col class="p-0">
                <v-checkbox
                  class="ma-0"
                  color="primary"
                  @change="setSelectedPermission(item, $event)"
                  v-model="item.is_permission_assigned"
                ></v-checkbox>
              </v-col>
            </v-row>
          </template>
        </v-data-table>
      </transition>
    </v-card>
  </v-container>
</template>

<script>
import { assignRolePermission } from "../permission/assignRolePermission";
export default assignRolePermission;
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
