import {createSlice} from "@reduxjs/toolkit";

const initialCartState = {
  quantity: JSON.parse(window.localStorage.getItem('cartTotalQuantity')) || 0,
  availableMovies: [],
  cartMovies: JSON.parse(window.localStorage.getItem('cartMovies')) || [],
  favMovies: []
}

const updateCartMoviesInLocalStorage = (state) => {
  window.localStorage.setItem('cartMovies', JSON.stringify(state.cartMovies));
  window.localStorage.setItem('cartTotalQuantity', JSON.stringify(state.quantity));
}

const movieSlice = createSlice({
  name: 'movie-slice',
  initialState: initialCartState,
  reducers: {
    totalQuantity(state) {
      state.quantity = +state.quantity;
    },
    addItem(state, action) {
      state.quantity++;
      const newItem = action.payload;
      const existItem = state.cartMovies.find(i => i.id === newItem.title);
      if (existItem !== undefined) {
        existItem.quantity++;
        existItem.totalPrice += existItem.price;
      } else {
        state.cartMovies.push({
          id: newItem.id,
          title: newItem.title,
          name: newItem.name,
          description: newItem.description,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price
        });
      }
      updateCartMoviesInLocalStorage(state);
    },
    removeItem(state, action) {
      state.quantity--;
      const id = action.payload;
      const existingItem = state.cartMovies.find(i => i.id === id);
      if (existingItem.quantity === 1) {
        state.cartMovies = state.cartMovies.filter(i => i.id !== action.payload);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      updateCartMoviesInLocalStorage(state);
    },
    addFavItem(state, action) {
      const newItem = action.payload;
      state.favMovies.push({
        id: newItem.id,
        title: newItem.title,
        name: newItem.name,
        description: newItem.description,
        price: newItem.price,
        quantity: 1,
        totalPrice: newItem.price
      });
    },
    removeFavItem(state, action) {
      const id = action.payload;
      state.favMovies = state.favMovies.filter(i => i.id !== id);
    },
    clearFavorites(state) {
      state.favMovies = initialCartState.favMovies;
    },
    clearCart(state) {
      window.localStorage.removeItem('cartMovies');
      window.localStorage.removeItem('cartTotalQuantity');
      state.quantity = 0;
      state.cartMovies = [];
    },
    setMovies(state, action) {
      state.availableMovies = action.payload;
    },
    setFavoriteMovies(state, action) {
      state.favMovies = action.payload.filter(i => i.favorites === true);
    }
  }
})

export default movieSlice;


