import Vue from "vue";

//convert to title case
Vue.directive("titlecase", {
  bind(el, _, vnode) {
    el.addEventListener("input", (e) => {
      vnode.componentInstance.$emit(
        "input",
        e.target.value
          .toLowerCase()
          .replace(/(?:^|\s|-)\S/g, (x) => x.toUpperCase())
      );
    });
  },
});

//convert to upper case
Vue.directive("uppercase", {
  bind(el, _, vnode) {
    el.addEventListener("input", (e) => {
      vnode.componentInstance.$emit("input", e.target.value.toUpperCase());
    });
  },
});
//Numbers only
Vue.directive("numeric", {
  bind(el, binding, vnode) {
    el.addEventListener("keydown", (e) => {
      if (
        [46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)
      ) {
        // let it happen, don't do anything
        return;
      }
      // Ensure that it is a number and stop the keypress
      if (
        (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
        (e.keyCode < 96 || e.keyCode > 105)
      ) {
        e.preventDefault();
      }
    });
  },
});
