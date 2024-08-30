import React from 'react';
import styles from '../../styles/pharmacy-styles/Checkout.module.css';

const SuccessMessage = ({ orderDetails, selectedAddress, shippingDetails }) => {
  console.log("Selected Address in SuccessMessage:", selectedAddress);

  return (
    <div className={styles.successMessage}>
      <h2>Payment Successful!</h2>
      <p>Thank you for your purchase.</p>

      <div className={styles.orderSummary}>
        <h3>Order Details</h3>
        <p>Subtotal: {orderDetails.subtotal} ₪</p>
        <p>Shipping: {orderDetails.shippingCost} ₪</p>
        <p>Total: {orderDetails.total} ₪</p>
      </div>

      <div className={styles.shippingDetails}>
        <h3>Shipping Details</h3>
        <p>Name: {shippingDetails.firstName} {shippingDetails.lastName}</p>
        <p>Address: {selectedAddress.Street}, {selectedAddress.City}, {selectedAddress.BuildingNumber}, {selectedAddress.apartmentNumber || ''}</p>
        <p>Phone: {shippingDetails.phoneNumber}</p>
      </div>

      <button onClick={() => window.location.href = '/home'} className={styles.backButton}>Back to Home</button>
    </div>
  );
};

export default SuccessMessage;
