import Button from "../button/Button.component";
import '/media/ahesh/D4A801FFA801E13A/React/A&A_apparels/src/components/product-card/product-card.styles.scss';
import { useContext } from 'react'
import { CartContext } from "../../contexts/cart.context";

const ProductCard = ({ product }) => {
    const { addItemsToCart } = useContext(CartContext);
    const { name, price, imageUrl} = product;
    return (
        <div className="product-card-container">
            <img
                src={imageUrl}
                alt={`${name}`}
            />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>

            </div>
            <Button buttonType='inverted' onClick = {()=>addItemsToCart(product)}>Add item</Button>
        </div>
    );
};

export default ProductCard;