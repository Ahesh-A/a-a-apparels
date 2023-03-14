import { createSelector } from "reselect";

import { CartState } from "./cart.reducer";

import { RootState } from "../store";

const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.items
);

export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity * item.price, 0)
);

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isOpen
  );

// const newCartCount = selectCartItems.reduce(
//   (accumulator, currentValue) => accumulator + currentValue.quantity,
//   0
// );

// const newCartTotal = selectCartItems.reduce(
//   (total, cartItem) => total + cartItem.quantity * cartItem.price,
//   0
// );

//export const selectCurrentItems = (state) => state.cart.items;
