<template>
  <v-app id="inspire">
    <v-overlay :value="isLoaderActive" color="primary">
      <v-progress-circular
        indeterminate
        size="50"
        color="primary"
      ></v-progress-circular>
    </v-overlay>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="12" md="4">
            <v-card class="mx-auto">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                  Login
                </v-toolbar-title>

                <v-spacer></v-spacer>
              </v-toolbar>

              <v-card-text>
                <v-form
                  ref="holdingForm"
                  v-model="isholdingFormValid"
                  lazy-validation
                >
                  <v-text-field
                    label="Email"
                    prepend-inner-icon="mdi-cellphone"
                    outlined
                    clearable
                    autofocus
                    type="text"
                    color="primary"
                    v-model="email"
                    :rules="validationRules_email"
                  ></v-text-field>

                  <v-text-field
                    label="Password"
                    prepend-inner-icon="mdi-lock"
                    outlined
                    clearable
                    color="primary"
                    v-model="password"
                    :append-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    @click:append="isPasswordVisible = !isPasswordVisible"
                    @keyup.enter="validateLogin"
                    :rules="validationRulesRequired"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn 
                text 
                small 
                color="primary" 
                @click="isAddOtp = true;
                showforgetPassDialog(item);"
               >
              Forgot Password</v-btn>
                <v-divider></v-divider>

                <div class="text-center">
                  <v-btn
                    class="ma-2"
                    filled
                    color="primary"
                    :disabled="!isholdingFormValid"
                    @click="validateLogin"
                  >
                    Login</v-btn
                  >
                </div>
              </v-card-actions>
              <!--start of Add Otp -->
             <v-dialog
        transition="dialog-top-transition"
        v-model="forgetPassDialog"
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
                forgetPassText
              }}</v-toolbar-title>
              <v-spacer></v-spacer><v-spacer></v-spacer>
              <v-btn icon dark @click="forgetPassDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text class="py-4 px-2">
              <v-form
                ref="holdingFormForgetPass"
                v-model="isFormForgetPassValid"
                lazy-validation
              >
                <v-row class="mx-auto d-flex">
                  <v-col cols="12" md="12" class="pt-5 pb-2">
                    <v-text-field
                      v-model="item.forget_email"
                      dense
                      outlined
                      :rules="validationRulesRequired"
                    >
                      <template #label>
                        Enter a valid email
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
                isforgetPass = true;
                forgetPassItem(item);
              "
              >
                Send
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
             </v-dialog>
            <!--end of add Pass -->
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer color="primary" padless>
      <v-row justify="center" no-gutters>
        <v-col class="primary py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} —
          <strong>{{ CompanyName }}</strong>|
        <strong> Version: 1.0.1.7 </strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { login } from "../login/login";
export default login;
</script>
