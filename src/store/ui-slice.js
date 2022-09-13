import {createSlice} from "@reduxjs/toolkit";

const initialUIState = {
  cartVisible: false,
  notifications: {
    status: '',
    message: '',
    title: ''
  }
}
const uiSlice = createSlice({
  name: 'ui-slice',
  initialState: initialUIState,
  reducers: {
    showCart(state) {
      state.cartVisible = !state.cartVisible;
    },
    hideCart(state) {
      state.cartVisible = !state.cartVisible;
    },
    notifications(state, action) {
      state.notifications.status = action.payload.status;
      state.notifications.message = action.payload.message;
      state.notifications.title = action.payload.title;

    }
  }
});

export default uiSlice;