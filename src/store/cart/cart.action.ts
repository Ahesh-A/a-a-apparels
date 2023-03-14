import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { createAction,  ActionWithPayload, withMatcher} from "../../utils/reducer/reducer.util";
import { CategoryItem } from "../categories/category.types";

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS,CartItem[] >;



const addCartItem = (items: CartItem[], productToAdd: CategoryItem) => {
  const existingCartItem = items.find((item) => item.id === productToAdd.id);
  if (existingCartItem) {
    return items.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...items, { ...productToAdd, quantity: 1 }];
};

const decreaseCartItem = (cartItems:CartItem[], cartItemToRemove: CartItem) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem &&  existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};


const removeCartItem = (cartItems: CartItem[], cartItemToClear: CartItem) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));


export const addItemsToCart = (items:CartItem[], productToAdd: CategoryItem) => {
  const newCartItems = addCartItem(items, productToAdd);
  
  return setCartItems(newCartItems);
};

export const removeItemsFromCart = (items:CartItem[], productToRemove: CartItem) => {
  const newCartItems = removeCartItem(items, productToRemove);
  return setCartItems(newCartItems);
};

export const decreaseItemsFromCart = (items: CartItem[], productToDecrease: CartItem) => {
  const newCartItems = decreaseCartItem(items, productToDecrease);
  return setCartItems(newCartItems);
};
