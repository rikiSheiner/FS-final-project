import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import SuccessMessage from './SuccessMessage';
import styles from '../../styles/pharmacy-styles/Checkout.module.css';

const Checkout = () => {
  const { getTotalAmount, clearCart, cart } = useCart();
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [shippingDetails, setShippingDetails] = useState({});
  const [orderDetails, setOrderDetails] = useState({});
  const [useExistingAddress, setUseExistingAddress] = useState(false);
  const [existingAddresses, setExistingAddresses] = useState([]);
  const [existingAccountDetails, setExistingAccountDetails] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedAccountDetails, setSelectedAccountDetails] = useState(null);
  const [totalAmount, setTotalAmount] = useState(getTotalAmount());

  useEffect(() => {
    //const userId = JSON.parse(localStorage.getItem('user')).UserID;

    const userId = JSON.parse(localStorage.getItem('user')).id;

    // Fetch existing addresses
    fetch(`http://localhost:3001/api/patients/users/${userId}/addresses`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          setExistingAddresses(data);
          setUseExistingAddress(true);
        } else {
          setUseExistingAddress(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching addresses:', error);
        setExistingAddresses([]);
      });

    // Fetch existing account details
    fetch(`http://localhost:3001/api/patients/users/${userId}/account-details`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          setExistingAccountDetails(data);
          setSelectedAccountDetails(data[0]); // Set the first account by default if exists
        }
      })
      .catch((error) => {
        console.error('Error fetching account details:', error);
        setExistingAccountDetails([]);
      });
  }, []);

  const handleContinueToPayment = () => {
    console.log("Selected address in handleContinueToPayment:", selectedAddress);

    if (!selectedAddress) {
      alert("Please select or enter a shipping address.");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem('user'));

    console.log(currentUser);
    console.log("Selected address in handleContinueToPayment:", selectedAddress);
    setShippingDetails({
      //firstName: currentUser.FirstName,
      //lastName: currentUser.LastName,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      street: selectedAddress.Street,
      city: selectedAddress.City,
      houseNumber: selectedAddress.BuildingNumber,
      apartmentNumber: selectedAddress.ApartmentNumber,
      phoneNumber: currentUser.phone,
    });

    setCheckoutStep(2);
  };

  const handlePayment = async (paymentDetails) => {
    const subtotal = getTotalAmount();
    const userId = JSON.parse(localStorage.getItem('user')).UserID;
  
    console.log("Cart:", cart); // Check the cart contents
    console.log("Total Amount:", subtotal); // Check the calculated total amount
  
    try {
      const response = await fetch('http://localhost:3001/api/patients/medicines/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          addressDetails: selectedAddress?.AddressID ? null : selectedAddress,
          accountDetails: selectedAccountDetails?.AccountID
            ? null // If an existing account is used, do not send new account details
            : {
              cardNumber: paymentDetails.cardNumber,
              expirationDate: paymentDetails.expiryDate,
              cvv: paymentDetails.cvv,
              isDefault: paymentDetails.isDefault || false,
            },
          orderDetails: {
            patientID: userId,
            totalPrice: subtotal,
            addressID: selectedAddress?.AddressID || null,
            accountID: selectedAccountDetails?.AccountID || null,
            items: cart.map(item => ({
              medicineID: item.medicineID,
              amount: item.amount,
              price: item.price
            }))
          },
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      setOrderDetails({
        subtotal: subtotal,
        shippingCost: 0.00,
        total: subtotal,
        paymentDetails,
      });
  
      setCheckoutStep(3);
      clearCart();
    } catch (error) {
      console.error('Error creating order:', error);
      alert('An error occurred while creating the order. Please try again.');
    }
  };
  

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (checkoutStep === 3) {
        clearCart();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [checkoutStep, clearCart]);

  const renderContent = () => {
    switch (checkoutStep) {
      case 1:
        return (
          <AddressForm
            existingAddresses={existingAddresses}
            useExistingAddress={useExistingAddress}
            setUseExistingAddress={setUseExistingAddress}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            onContinue={handleContinueToPayment}
          />
        );
      case 2:
        console.log("Rendering PaymentForm");
        return (
          <PaymentForm
            existingAccountDetails={existingAccountDetails}
            selectedAccountDetails={selectedAccountDetails}
            setSelectedAccountDetails={setSelectedAccountDetails}
            onPayment={handlePayment}
          />
        );
      case 3:
        return <SuccessMessage orderDetails={orderDetails} selectedAddress={selectedAddress} shippingDetails={shippingDetails} />;
        default:
        return null;
    }
  };
  

  return (
    <div className={styles.checkout}>
      {checkoutStep !== 3 && (
        <div className={styles.orderSummary}>
          <h3>Order Summary</h3>
          <div className={styles.orderBox}>
            <p>Subtotal: <strong>{totalAmount} ₪</strong></p>
            <p>Shipping: <strong>0.00 ₪</strong></p>
            <p><strong>Total: {totalAmount} ₪</strong></p>
          </div>
        </div>
      )}
      {renderContent()}
    </div>
  );
};

export default Checkout;
