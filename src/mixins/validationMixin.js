export const validationMixin = {
  data() {
    return {
      validationRulesRequired: [(v) => !!v || "Field is required"],
      validationRules_mobile: [
        (v) => !!v || "Provide valid Mobile number",
        (v) => (v && v.length >= 10) || "Mobile number must be of 10 digits",
        (v) =>
          /^[6-9]\d{9}$/.test(v) || "Mobile number must start with 6/7/8/9",
      ],
      validationRules_otpWithMax6Char: [
        (v) => !!v || "Provide valid OTP",
        (v) => (v && v.length > 5) || "OTP must be of 6 characters",
      ],

      validationRules_passwordRuleWithOneNumberAndOneChar: [
        (v) => !!v || "Provide valid Password",
        (v) =>
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v) ||
          "Password length must have 8 with atleast one number and one character",
      ],

      validationRules_passwordRulesWithMinEightChar: [
        (v) => !!v || "Provide valid password",
        (v) => (v && v.length > 7) || "Password must be of 8 characters",
      ],

      validationRulesAutocomplete_required: [
        (v) => !!(v && v.length) || "Field is required",
      ],
      validationRules_email: [
        (v) => !!v || "Email is required",
        (v) =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "Provide valid email",
      ],

      validationRules_companywebsite: [
        (v) => {
          if (v) {
            return (
              /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/.test(
                v
              ) || "Provide valid website"
            );
          } else {
            return true;
          }
        },
      ],

      validationRules_companywebsitemandatory: [
        (v) => !!v || "Domain name required",
        (v) =>
          /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/.test(
            v
          ) || "Provide valid domain",
      ],

      validationRules_pin: [
        (v) => !!v || "Provide valid Pin",
        (v) => (v && v.length > 5) || "Pin must be of 6 characters",
      ],

      validationRules_image1Mb: [
        (v) => !!v || "Select image",
        (v) => !v || v.size <= 1048576 || "Maximum upload limit is 1Mb",
      ],

      validationRules_alternatecontact: [
        (v) => {
          if (v) {
            return (
              /^[6-9]\d{9}$/.test(v) ||
              "Mobile number must start with 6/7/8/9 and contain 10 digits"
            );
          } else {
            return true;
          }
        },
      ],

      validationRules_optionalemail: [
        (v) => {
          if (v) {
            return (
              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
              "Provide valid Email"
            );
          } else {
            return true;
          }
        },
      ],

      validationRules_pan: [
        (v) => !!v || "Pan no required",
        (v) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v) || "Provide valid Pan no",
      ],

      validationRules_aadhar: [
        (v) => !!v || "Aadhar no required",
        (v) =>
          /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/.test(v) ||
          "Provide valid Aadhar no",
      ],

      validationRules_gst: [
        (v) => !!v || "GST no required",
        (v) =>
          /^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/.test(
            v
          ) || "Provide valid GST no",
      ],

      validationRules_cin: [
        (v) => !!v || "CIN no required",
        (v) =>
          /^([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/.test(
            v
          ) || "Provide valid CIN no",
      ],

      validationRules_optionalIfsc: [
        (v) => {
          if (v) {
            return (
              /^[A-Z]{4}0[A-Z0-9]{6}$/.test(v) || "Provide valid IFSC Code"
            );
          } else {
            return true;
          }
        },
      ],

      validationRules_ifsc: [
        (v) => !!v || "IFSC Code required",
        (v) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(v) || "Provide valid IFSC Code",
      ],

      validationRules_nbin: [
        (v) => !!v || "NBIN Code required",
        (v) => /^[0-9]{6}$/.test(v) || "Provide valid NBIN Code",
      ],

      validationRules_bankcode: [
        (v) => !!v || "Bank Code required",
        (v) => /^[A-Za-z]{4}$/.test(v) || "Provide valid Bank Code",
      ],

      validationRules_doc1Mb: [
        (v) => !!v || "Select document",
        (v) => !v || v.size <= 1048576 || "Maximum upload limit is 1Mb",
      ],
    };
  },
  methods: {
    // Only digit in text field
    isDigit(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
      }
    },

    // To ensure name is character with space only
    isCharactersWithSpace(evt) {
      var regex = new RegExp("^[a-zA-Z ]+$");
      var key = String.fromCharCode(!evt.charCode ? evt.which : evt.charCode);
      if (!regex.test(key)) {
        evt.preventDefault();
        return false;
      }
    },

    isCharactersWithoutSpace(evt) {
      var regex = new RegExp("^[a-zA-Z]+$");
      var key = String.fromCharCode(!evt.charCode ? evt.which : evt.charCode);
      if (!regex.test(key)) {
        evt.preventDefault();
        return false;
      }
    },

    isDigitWithDecimal(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },
};
