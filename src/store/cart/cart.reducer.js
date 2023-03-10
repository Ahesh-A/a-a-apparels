import { CART_ACTION_TYPES } from "./cart.types";

export const CART_INITIAL_STATE = {
  isOpen: false,
  items: [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        items: payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isOpen: payload,
      };
    default:
      return state;
  }
};
