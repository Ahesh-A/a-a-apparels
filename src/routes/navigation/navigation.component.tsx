import { Fragment } from "react";
import { Outlet } from "react-router-dom";
//import { UserContext } from "../../contexts/user.context";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

//import { CartContext } from "../../contexts/cart.context";
import {
  NavLink,
  NavigationContainer,
  NavLinksContainer,
  LogoContainer,
} from "./navigation.styles";
import { selectCurrentUser } from "../../store/user/user.selector";
import { signOutStart } from "../../store/user/user.action";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  //  const { isopen } = useContext(CartContext);
  const signOutClickHandler = () => {
    dispatch(signOutStart());
  };
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo />
        </LogoContainer>

        <NavLinksContainer>
          <NavLink to={"/shop"}>Shop</NavLink>
          {currentUser ? (
            <NavLink
              as="span"
              onClick={
                signOutClickHandler

                //  googleSignOut();onSignOutStart
                // dispatch(setCurrentUser(null));
              }
            >
              Sign Out
            </NavLink>
          ) : (
            <NavLink to={"/auth"}>Sign In</NavLink>
          )}
          <CartIcon />
        </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default NavigationBar;
