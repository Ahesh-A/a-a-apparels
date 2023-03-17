import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";
import CartItem from "../cart-item/cart-item.component.jsx";
import Button from "../button/Button.component";
// import { CartContext } from "../../contexts/cart.context";
// import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
const CartDropdown = () => {
  const navigate = useNavigate();
  const goToCheckoutHandler = () => {
    navigate("/check-out");
  };
  const items = useSelector(selectCartItems)
  //const { items } = useContext(CartContext);
  return (
    <CartDropdownContainer>
      <CartItems>
        {items.length ? (
          items.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
