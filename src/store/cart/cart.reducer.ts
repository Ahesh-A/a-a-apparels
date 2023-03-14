import { CartItem } from "./cart.types";
import { AnyAction } from "redux";
import { setCartItems, setIsCartOpen } from "./cart.action";

export type CartState = {
  readonly isOpen: boolean;
  readonly items: CartItem[];

}
export const CART_INITIAL_STATE: CartState = {
  isOpen: false,
  items: [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action: AnyAction): CartState => {

  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isOpen: action.payload,
    };
  }

  if (setCartItems.match(action)) {
    return {
      ...state,
      items: action.payload,
    };
  }
  return state;
  // switch (action.type) {
  //   case CART_ACTION_TYPES.SET_CART_ITEMS:
  //     return {
  //       ...state,
  //       items: action.payload,
  //     };
  //   case CART_ACTION_TYPES.SET_IS_CART_OPEN:
  //     return {
  //       ...state,
  //       isOpen: action.payload,
  //     };
  //   default:
  //     return state;
  // }
};
