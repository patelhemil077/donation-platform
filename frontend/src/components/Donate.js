import React from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

// Use quotes around the publishable key to make it a string
const stripePromise = loadStripe('pk_test_51QDhaBDUOblDPwstMGpAEJiTJKixIA8VVHGKHV0SG2s3fHzkBoWiBbxzc00GGF8D4YpxGgA4n1pikhDi6WoCvZ9800rO6CuXWc');

function Donate() {
  const handleDonate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/payment/create-checkout-session', {
        name: 'Donation',
        amount: 5000, // Amount in cents ($50)
      });
      const { id } = response.data;

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: id,
      });

      if (error) {
        console.error('Stripe Checkout error:', error);
      }
    } catch (error) {
      console.error('Error initiating checkout:', error);
    }
  };

  React.useEffect(() => {
    const styles = `
      .donation-page {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: linear-gradient(to bottom right, #6db3f2, #1e69de);
        font-family: 'Poppins', sans-serif;
      }
      
      .donation-container {
        width: 80%;
        max-width: 800px;
        background: #ffffff;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        border-radius: 16px;
        padding: 20px;
        text-align: center;
      }
      
      .banner {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 40px;
      }
      
      .banner-image {
        width: 40%;
        height: auto;
        border-radius: 16px;
      }
      
      .banner-text {
        flex: 1;
        color: white;
        text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
      }
      
      .banner-title {
        font-size: 2em;
        font-weight: bold;
      }
      
      .banner-subtitle {
        font-size: 1.2em;
      }
      
      .section-title {
        font-size: 1.8em;
        font-weight: 600;
        margin: 20px 0;
      }
      
      .families-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: center;
        margin-bottom: 40px;
      }
      
      .family-card {
        background: #e0f7fa;
        padding: 20px;
        border-radius: 8px;
        border: 1px solid #00796b;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        text-align: left;
      }
      
      .family-description {
        font-size: 1em;
        margin-top: 10px;
      }
      
      .donate-section {
        margin-top: 30px;
        text-align: center;
      }
      
      .donation-text {
        font-size: 1.2em;
        margin-bottom: 20px;
      }
      
      .donate-button {
        background: #ff6f61;
        color: white;
        font-size: 1.2em;
        font-weight: bold;
        border: none;
        padding: 12px 20px;
        border-radius: 30px;
        cursor: pointer;
        transition: all 0.3s;
      }
      
      .donate-button:hover {
        background: #e0554e;
        box-shadow: 0 8px 16px rgba(255, 111, 97, 0.3);
      }
    `;

    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="donation-page">
      {/* Banner Section */}
      <div className="banner">
        <img src="/assets/images/flood-banner.jpg" alt="Flood Banner" className="banner-image" />
        <div className="banner-text">
          <h1 className="banner-title">Help Families Affected by the Flood</h1>
          <p className="banner-subtitle">Your donation can provide food, shelter, and support to those in urgent need.</p>
        </div>
      </div>

      {/* Affected Families Section */}
      <div className="families-section">
        <h2 className="section-title">Meet the Families in Need</h2>
        <div className="families-container">
          <div className="family-card">
            <p className="family-description">The Johnsons lost their home during the flood and need urgent help to rebuild their lives.</p>
          </div>
          <div className="family-card">
            <p className="family-description">The Smiths are currently staying in a temporary shelter. Your support can provide them with food and medical aid.</p>
          </div>
          <div className="family-card">
            <p className="family-description">The Williams family is struggling to find clean water and essentials. Your contribution will make a big difference.</p>
          </div>
        </div>
      </div>

      {/* Donation Section */}
      <div className="donate-section">
        <h2 className="section-title">Make a Difference Today</h2>
        <p className="donation-text">Click the button below to make a donation and help these families recover.</p>
        <button onClick={handleDonate} className="donate-button">Donate $50</button>
      </div>
    </div>
  );
}

export default Donate;
