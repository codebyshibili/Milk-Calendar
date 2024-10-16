import React, { useState, useEffect } from 'react';
import './milk.css';
import Delete from '/src/assets/Delete.png'


function MilkSupplyTracker() {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [supplies, setSupplies] = useState([]);

  // Load supplies from localStorage when the component mounts
  useEffect(() => {
    const storedSupplies = JSON.parse(localStorage.getItem('supplies')) || [];
    setSupplies(storedSupplies);
  }, []);

  // Update localStorage whenever supplies change
  useEffect(() => {
    localStorage.setItem('supplies', JSON.stringify(supplies));
  }, [supplies]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add new supply to the state
    const newSupply = { date, amount: parseFloat(amount), price: parseFloat(price) };
    setSupplies([...supplies, newSupply]);

    // Reset form fields
    setDate('');
    setAmount('');
    setPrice('');
  };

  const handleClear = () => {
    setSupplies([]); // Clear the supplies in state
    localStorage.removeItem('supplies'); // Clear localStorage
  };

  const totalDays = supplies.length;
  const totalMilk = supplies.reduce((total, supply) => total + supply.amount, 0);
  const totalPrice = supplies.reduce((total, supply) => total + (supply.amount * supply.price), 0).toFixed(2);

  return (
    <div className="container">
      <h1>Milk-Calendar</h1>

      <form onSubmit={handleSubmit} id="milk-form">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount (liters)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price per liter ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Add Supply</button>
      </form>

      <h2>Monthly Summary</h2>
      <div id="summary">
        <p>Total Days Supplied: <span id="totalDays">{totalDays}</span></p>
        <p>Total Milk Supplied: <span id="totalMilk">{totalMilk} liters</span></p>
        <p>Total Price: $<span id="totalPrice">{totalPrice}</span></p>
      </div>

      <h2>Supplied Days</h2>
      <ul id="supply-list">
        {supplies.map((supply, index) => (
          <li key={index}>
            Date: {supply.date}, Amount: {supply.amount} liters, Price: ${(
              supply.amount * supply.price
            ).toFixed(2)}
          </li>
        ))}
      </ul>

      <button id="clear-button" onClick={handleClear}> All Clear <img src={Delete} alt="" /></button>
    </div>
  );
}

export default MilkSupplyTracker;
