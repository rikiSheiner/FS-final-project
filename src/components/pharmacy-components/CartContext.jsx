/*import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.medicineID !== id));
  };
  
  // פונקציה לריקון הסל
  const clearCart = () => {
    setCart([]);
  };

  // חישוב סכום הסל
  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + Number(item.price), 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, getTotalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
*/



import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex(cartItem => cartItem.medicineID === item.medicineID);
      if (itemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[itemIndex].amount += item.amount; // Increase the quantity if the item is already in the cart
        return updatedCart;
      } else {
        return [...prevCart, { ...item, amount: item.amount }]; // Add new item with the specified amount
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.medicineID !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart((prevCart) => {
      return prevCart.map(item =>
        item.medicineID === id
          ? { ...item, amount: Math.max(1, item.amount + amount) }
          : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };
  
  const getTotalAmount = () => {
    return parseFloat(cart.reduce((total, item) => total + (Number(item.price) * item.amount), 0).toFixed(2));
  };
  

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
