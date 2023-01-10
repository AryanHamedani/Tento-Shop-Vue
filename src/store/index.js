import { createStore } from "vuex";

export default createStore({
  state: {
    cart: {
      items: [],
    },
    isAuthenticated: false,
    token: "",
    isLoading: false,
  },
  getters: {},
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem("cart")) {
        state.cart = JSON.parse(localStorage.getItem("cart"));
      } else {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    addToCart(state, item) {
      const exists = state.cart.items.filter(
        (i) => i.product.id === item.product.id
      );
      if (exists.length) {
        if (
          parseInt(exists[0].quantity) + parseInt(item.quantity) >
          parseInt(exists[0].product.quantity)
        ) {
          console.log("Out of Stock");
        } else {
          exists[0].quantity =
            parseInt(exists[0].quantity) + parseInt(item.quantity);
        }
      } else {
        if (parseInt(item.quantity) > parseInt(item.product.quantity)) {
          console.log("Out of Stock");
        } else {
          state.cart.items.push(item);
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    setIsLoading(state, status){
      state.isLoading = status
    }
  },
  actions: {},
  modules: {},
});
