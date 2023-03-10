import './checkout.styles.scss';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';
// import { CartContext } from '../../contexts/cart.context';
// import { useContext } from 'react';

const Checkout = () => {
  const items = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  //const { items, cartTotal } = useContext(CartContext);

  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      {items.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}
      <div className='total'>TOTAL: ${cartTotal}</div>
    </div>
  );
};

export default Checkout;