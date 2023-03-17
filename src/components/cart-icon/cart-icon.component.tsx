import {  CartIconContainer, ItemCount } from "./cart-icon.styles";
// import { CartContext } from "../../contexts/cart.context";
// import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
 import { setIsCartOpen } from "../../store/cart/cart.action";
const CartIcon = () => {
  const dispatch = useDispatch();
  //const { isopen, setIsopen, count } = useContext();
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  const clilckHandler = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={clilckHandler}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
