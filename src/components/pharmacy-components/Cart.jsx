/*import React from "react";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom"; 
import styles from "../../styles/pharmacy-styles/Cart.module.css";

const Cart = () => {
  const { cart, removeFromCart, getTotalAmount } = useCart();

  return (
    <div className={styles.cart}>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>The cart is empty</p>
      ) : (
        <div>
          <ul>
            {cart.map(item => (
              <li key={item.medicineID} className={styles.cartItem}>
                <img src={item.imagePath} alt={item.name} className={styles.cartItemImage} />
                <div className={styles.cartItemDetails}>
                  <span className={styles.cartItemName}>
                    {item.name} - Quantity: {item.amount}
                  </span>
                  <span className={styles.cartItemPrice}>{item.price} ₪</span>
                </div>
                <button onClick={() => removeFromCart(item.medicineID)} className={styles.removeButton}>Remove</button>
              </li>
            ))}
          </ul>
          <div className={styles.total}>
            <span>Total Amount:</span>
            <span>{getTotalAmount()} ₪</span>
          </div>
          <div className={styles.checkoutButtonContainer}>
            <Link to="/checkout" className={styles.checkoutButton}>
              Proceed to Payment
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
*/
import React from "react";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import styles from "../../styles/pharmacy-styles/Cart.module.css";

const Cart = () => {
  const { cart, removeFromCart, getTotalAmount } = useCart();

  return (
    <div className={styles.cart}>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>The cart is empty</p>
      ) : (
        <div>
          <ul>
            {cart.map(item => (
              <li key={item.medicineID} className={styles.cartItem}>
                <img src={item.imagePath} alt={item.name} className={styles.cartItemImage} />
                <div className={styles.cartItemDetails}>
                  <span className={styles.cartItemName}>{item.name}</span>
                  <span className={styles.cartItemPrice}>{item.price} ₪</span>
                  <div className={styles.cartItemQuantity}>
                    Quantity: {item.amount}
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.medicineID)} className={styles.removeButton}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.total}>
            <span>Total Amount:</span>
            <span>{getTotalAmount()} ₪</span>
          </div>
          <div className={styles.checkoutButtonContainer}>
            <Link to="/checkout" className={styles.checkoutButton}>
              Proceed to Payment
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

