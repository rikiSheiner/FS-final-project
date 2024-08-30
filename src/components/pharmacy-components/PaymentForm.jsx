import React, { useState } from 'react';
import styles from '../../styles/pharmacy-styles/Checkout.module.css';

const PaymentForm = ({
  existingAccountDetails,
  selectedAccountDetails,
  setSelectedAccountDetails,
  onPayment,
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    // Validate card number
    if (!cardNumber || cardNumber.length !== 16) errors.cardNumber = 'Please enter a valid card number';

    // Validate expiry date
    const [month, year] = expiryDate.split('/');
    if (!/^\d{2}$/.test(month) || parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
      errors.expiryDate = 'Please enter a valid month (01-12)';
    }
    if (!/^\d{2}$/.test(year) || parseInt(year, 10) < 0) {
      errors.expiryDate = 'Please enter a valid year (last two or next two years)';
    }

    // Validate CVV
    if (!cvv || cvv.length !== 3) errors.cvv = 'Please enter a valid CVV';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const [month, year] = expiryDate.split('/');
      const formattedExpiryDate = `20${year}-${month}-01`; // Convert MM/YY to YYYY-MM-DD with validation
  
      const newAccountDetails = {
        cardNumber,
        expiryDate: formattedExpiryDate,
        cvv,
        isDefault,
      };

      onPayment(newAccountDetails); // Call onPayment function with new card details
    }
  };

  const handleAccountSelection = (e) => {
    const selectedAccount = existingAccountDetails.find(account => account.AccountID === parseInt(e.target.value, 10));
    setSelectedAccountDetails(selectedAccount);
  };

  return (
    <div className={styles.paymentMethod}>
      <h3>Payment Details</h3>
      {existingAccountDetails.length > 0 && (
        <div className={styles.formGroup}>
          <label>
            <input
              type="checkbox"
              checked={!!selectedAccountDetails}
              onChange={(e) => {
                setSelectedAccountDetails(e.target.checked ? existingAccountDetails[0] : null);
                setCardNumber('');  // Reset fields if using an existing account
                setExpiryDate('');
                setCvv('');
              }}
            />
            Use existing account details
          </label>
          {selectedAccountDetails && (
            <select onChange={handleAccountSelection} value={selectedAccountDetails?.AccountID || ""}>
              <option value="">Select account details</option>
              {existingAccountDetails.map((account) => (
                <option key={account.AccountID} value={account.AccountID}>
                  {`Card ending in ${account.CardNumber.slice(-4)}`}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
      {!selectedAccountDetails && (
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Credit Card Number *</label>
            <input 
              type="text" 
              value={cardNumber} 
              onChange={(e) => setCardNumber(e.target.value)} 
              required 
            />
            {errors.cardNumber && <p className={styles.error}>{errors.cardNumber}</p>}
          </div>
          <div className={styles.formGroup}>
            <label>Expiry Date (MM/YY) *</label>
            <input 
              type="text" 
              value={expiryDate} 
              onChange={(e) => setExpiryDate(e.target.value)} 
              required 
            />
            {errors.expiryDate && <p className={styles.error}>{errors.expiryDate}</p>}
          </div>
          <div className={styles.formGroup}>
            <label>CVV *</label>
            <input 
              type="text" 
              value={cvv} 
              onChange={(e) => setCvv(e.target.value)} 
              required 
            />
            {errors.cvv && <p className={styles.error}>{errors.cvv}</p>}
          </div>
          <div className={styles.formGroup}>
            <label>
              <input
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
              />
              Set as default account
            </label>
          </div>
          <button type="submit" className={styles.submitButton}>Confirm Payment</button>
        </form>
      )}
      {selectedAccountDetails && (
        <button onClick={() => onPayment(selectedAccountDetails)} className={styles.submitButton}>Confirm Payment</button>
      )}
    </div>
  );
};

export default PaymentForm;
