// File: backend/routes/payment.js
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
    try {
      console.log('Request Body:', req.body);
  
      const origin = req.headers.origin || 'http://localhost:3000';
      const { name, amount } = req.body;
  
      if (!name || !amount) {
        return res.status(400).json({ error: 'Name and amount must be provided.' });
      }
  
      if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: 'Amount must be a positive number in cents.' });
      }
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: name,
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${origin}/success`,
        cancel_url: `${origin}/cancel`,
      });
  
      console.log('Stripe Checkout Session ID:', session.id); // Debug line to check session ID
  
      res.json({ id: session.id });
    } catch (error) {
      console.error('Error creating checkout session:', error.message);
      res.status(500).json({ error: error.message });
    }
  });
  // Export the router so it can be used in server.js
  module.exports = router;