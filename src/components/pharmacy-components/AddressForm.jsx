import React, { useState, useEffect } from 'react';
import styles from '../../styles/pharmacy-styles/Checkout.module.css';

const AddressForm = ({
  existingAddresses,
  useExistingAddress,
  setUseExistingAddress,
  selectedAddress,
  setSelectedAddress,
  onContinue,
}) => {
  const [formState, setFormState] = useState({
    city: '',
    street: '',
    buildingNumber: '',
    apartmentNumber: '',
  });
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false); // This will be used to track form submission

  const validateForm = () => {
    const errors = {};
    if (!formState.city) errors.city = 'Please enter a city';
    if (!formState.street) errors.street = 'Please enter a street';
    if (!formState.buildingNumber) errors.buildingNumber = 'Please enter a building number';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newAddress = {
        City: formState.city,
        Street: formState.street,
        BuildingNumber: formState.buildingNumber,
        ApartmentNumber: formState.apartmentNumber || '',
      };
      console.log("New address submitted:", newAddress);
      setSelectedAddress(newAddress); // Update the selected address
      setFormSubmitted(true); // Mark the form as submitted
    }
  };

  useEffect(() => {
    if (formSubmitted && selectedAddress) {
      onContinue(); // Call the function only after the address is updated and the form is submitted
    }
  }, [selectedAddress, formSubmitted]);

  return (
    <div className={styles.checkoutDetails}>
      <h3>Shipping Details</h3>
      {existingAddresses.length > 0 && (
        <div className={styles.formGroup}>
          <label>
            <input
              type="checkbox"
              checked={useExistingAddress}
              onChange={(e) => setUseExistingAddress(e.target.checked)}
            />
            Use existing address
          </label>
          {useExistingAddress && (
            <select
              onChange={(e) => {
                const selected = existingAddresses.find(addr => addr.AddressID === parseInt(e.target.value));
                console.log("Existing address selected:", selected);
                setSelectedAddress(selected);
              }}
              className={styles.addressSelect}
            >
              <option value="">Select an address</option>
              {existingAddresses.map((address) => (
                <option key={address.AddressID} value={address.AddressID}>
                  {`${address.Street}, ${address.BuildingNumber}, ${address.City}`}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
      {!useExistingAddress && (
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>City *</label>
            <input
              type="text"
              name="city"
              value={formState.city}
              onChange={(e) => setFormState({ ...formState, city: e.target.value })}
              required
            />
            {errors.city && <p className={styles.error}>{errors.city}</p>}
          </div>
          <div className={styles.formGroup}>
            <label>Street *</label>
            <input
              type="text"
              name="street"
              value={formState.street}
              onChange={(e) => setFormState({ ...formState, street: e.target.value })}
              required
            />
            {errors.street && <p className={styles.error}>{errors.street}</p>}
          </div>
          <div className={styles.formGroup}>
            <label>Building Number *</label>
            <input
              type="text"
              name="buildingNumber"
              value={formState.buildingNumber}
              onChange={(e) => setFormState({ ...formState, buildingNumber: e.target.value })}
              required
            />
            {errors.buildingNumber && <p className={styles.error}>{errors.buildingNumber}</p>}
          </div>
          <div className={styles.formGroup}>
            <label>Apartment Number</label>
            <input
              type="text"
              name="apartmentNumber"
              value={formState.apartmentNumber}
              onChange={(e) => setFormState({ ...formState, apartmentNumber: e.target.value })}
            />
          </div>
          <button type="submit" className={styles.submitButton}>Continue to Payment</button>
        </form>
      )}
      {useExistingAddress && selectedAddress && (
        <button onClick={onContinue} className={styles.submitButton}>Continue to Payment</button>
      )}
    </div>
  );
};

export default AddressForm;
