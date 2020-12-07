import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let cart = localStorage.getItem('cart');
let favorite = localStorage.getItem('favorite');

export default new Vuex.Store({
  state: {
    cart: cart ? JSON.parse(cart) : [],
    favorite: favorite ? JSON.parse(favorite) : [],
    token: localStorage.token || null,
    product_dialog: false,
    showSearchBox: false,
    product_images: [],
    product_info: {}
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },

    SAVE_PRODUCT(state, payload) {
      state.cart.push(payload)
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    FAVORITE_PRODUCT(state, payload) {
      state.favorite.push(payload);
      localStorage.setItem('favorite', JSON.stringify(state.favorite));
    },

    REMOVE_PRODUCTS_FROM_CART(state, index) {
      state.cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    
    REMOVE_PRODUCTS_FROM_FAVORITE(state, index) {
      state.favorite.splice(index, 1);
      localStorage.setItem('favorite', JSON.stringify(state.favorite));
    },

    INCREASE_QTY(state, index) {
      let quantity = state.cart[index].product.quantity;
      if(state.cart[index].qty >= quantity) {
        state.cart[index].qty = quantity;
      } else {
        state.cart[index].qty++;
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    DECREASE_QTY(state, index) {
      let quantity = state.cart[index].product.quantity;
      if(state.cart[index].qty <= 1) {
        state.cart[index].qty = 1;
      } else {
        state.cart[index].qty--;
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    TOGGLE_PRODUCT_DIALOG(state) {
      return state.product_dialog = !state.product_dialog
    },

    TOGGLE_SEARCH(state) {
      return state.showSearchBox = !state.showSearchBox
    },

    SET_PRODUCT_INFO(state, product) {
      return state.product_info = product
    }
  },
  getters: {
    product_count(state) {
      return state.cart.length
    },

    total_price(state) {
      let total = 0;

      state.cart.forEach(item => {
        total += item.product.price * item.qty
      })

      return total
    },

    getToken(state) {
      return state.token
    },

    isAuthenticated(state) {
      return state.token !== null
    },

    products(state) {
      return state.cart
    },
    
    favorite_products(state) {
      return state.favorite
    }
  },
  actions: {
    save_product(context, {product, qty}) {
      return new Promise((resolve, reject) => {
        let inCart = this.state.cart.find(item => {
          return item.product.idProduct === product.idProduct
        });

        if(!inCart) {
          resolve({product, qty});
          context.commit('SAVE_PRODUCT', {product, qty})
        } else {
          reject(new Error('Item In Cart'));
        }
      });
    },

    favorite_product(context, product) {
      return new Promise((resolve, reject) => {
        let inFavorite = this.state.favorite.find(item => {
          return item.idProduct === product.idProduct
        });

        let inCart = this.state.cart.find(item => {
          return item.product.idProduct === product.idProduct
        });

        if(!inFavorite) {
          if(!inCart) {
            resolve(product);
            context.commit('FAVORITE_PRODUCT', product);
          } else {
            reject(new Error('Item In Cart'));
          }
        } else {
          reject(new Error('Item In Cart'));
        }
      });
    },

    remove_from_favorite(context, index) {
      return new Promise((resolve, reject) => {
        let check = true;
        if(check) {
          context.commit('REMOVE_PRODUCTS_FROM_FAVORITE', index);
          resolve(index)
        } else {
          reject(new Error('Cant Remove'));
        }
      })
    },

    remove_from_cart(context, index) {
      return new Promise((resolve, reject) => {
        let check = true;
        if(check) {
          context.commit('REMOVE_PRODUCTS_FROM_CART', index);
          resolve(index)
        } else {
          reject(new Error('Cant Remove'));
        }
      })
    },

    increase_qty(context, index) {
      context.commit('INCREASE_QTY', index);
    },

    decrease_qty(context, index) {
      context.commit('DECREASE_QTY', index);
    },

    toggleProductDialog({commit}) {
      commit('TOGGLE_PRODUCT_DIALOG');
    },

    setProductInfo({commit}, product) {
      commit('SET_PRODUCT_INFO', product);
    }
  },
  modules: {
  }
})
