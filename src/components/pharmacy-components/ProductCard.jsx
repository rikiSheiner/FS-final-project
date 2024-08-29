import React, { useState, useEffect } from 'react';
import styles from '../../styles/pharmacy-styles/ProductCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useCart } from './CartContext';

const ProductCard = ({ MedicineID, Name, ImagePath, Price, hasPrescription = true }) => {
  const { addToCart, updateQuantity, removeFromCart, cart } = useCart();
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    // Checking if the item is in the cart
    const cartItem = cart.find(item => item.medicineID === MedicineID);
    if (cartItem && quantity === 0) {
      // Only update state if necessary to avoid unnecessary re-renders
      setQuantity(cartItem.amount);
    }
  }, [MedicineID, cart, quantity]);

  const handleAddToCart = () => {
    const item = {
      medicineID: MedicineID,
      name: Name,
      imagePath: ImagePath,
      price: Price,
      amount: 1,
    };
    addToCart(item);
    setQuantity(1); // Set initial quantity to 1
    setMessage('Product added to cart successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleIncreaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(MedicineID, 1); // Add 1 to the cart
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(MedicineID, -1); // Remove 1 from the cart
    } else if (quantity === 1) {
      setQuantity(0);
      removeFromCart(MedicineID); // Remove item from the cart
    }
  };

  const requestPrescriptionRenewal = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));

      if (!MedicineID) {
        alert("Please select a medicine");
        return;
      }

      const requestData = {
        PatientID: currentUser.UserID,
        MedicineID: MedicineID,
        Approved: 0, // Not approved
      };

      const response = await fetch(`http://localhost:3001/api/patients/prescription-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setMessage('Prescription request sent successfully!');
        setRequestSent(true);

        // Store the request status in localStorage
        const prescriptionRequests = JSON.parse(localStorage.getItem('prescriptionRequests')) || {};
        prescriptionRequests[MedicineID] = true;
        localStorage.setItem('prescriptionRequests', JSON.stringify(prescriptionRequests));
      } else {
        throw new Error("Failed to request prescription renewal");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.card}>
      <img src={ImagePath} alt={Name} className={styles.image} />
      <h3 className={styles.name}>{Name}</h3>
      <div className={styles.pricing}>
        <span className={styles.price}>{Price} ₪</span>
      </div>
      {hasPrescription ? (
        quantity === 0 ? (
          <button className={styles.addToCart} onClick={handleAddToCart}>
            <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
          </button>
        ) : (
          <div className={styles.quantityControl}>
            <button onClick={handleDecreaseQuantity}>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncreaseQuantity}>+</button>
          </div>
        )
      ) : requestSent ? (
        <button className={styles.requestSent} disabled>
          You can purchase once the prescription is approved
        </button>
      ) : (
        <button className={styles.requestPrescription} onClick={requestPrescriptionRenewal}>
          Request Prescription
        </button>
      )}
      {message && <div className={styles.message}>{message}</div>}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
  
};

export default ProductCard;
