import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const totalItems = useSelector(state => state.cart.items.reduce((total, item) => total + item.quantity, 0));


  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
        const itemCost = parseFloat(item.cost.replace('$', '')); // Remove the dollar sign and convert to float
        return total + (itemCost * item.quantity); // Multiply cost by quantity and add to total
    }, 0); // Start reducing with an initial total of 0
 
  };
  const handleCheckoutShopping = (e) => {
  alert('Functionality to be added for future reference');
};

  const handleContinueShopping = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    onContinueShopping(); // Call the function passed from the parent component
   
  };



  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
  } else {
    dispatch(removeItem(item)); // Or remove the item if quantity goes to 0
  }
   
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item)); // Dispatch the removeItem action
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const unitCost = parseFloat(item.cost.replace('$', '')); // assuming cost is a string like "$15"
    return (unitCost * item.quantity).toFixed(2); // ensures the result is a string with two decimal places
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1"onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


