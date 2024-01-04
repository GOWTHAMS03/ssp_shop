import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Common/Button';
import Checkbox from '../../components/Common/Checkbox';

const PaymentForm = props => {

  const { addressFormData, cartItems, placeOrder,finalamount,orderitems } =props;
  const [loading, setLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [captcha, setCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');
  const [orderAmount, setOrderAmount] = useState(0);
  const [orders, setOrders] = useState([]);
  const location = useLocation();


  

  const url = 'http://localhost:3000/api';

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const newCaptcha = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedCaptcha(newCaptcha);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${url}/payres`);
        if (isMounted) {
          setOrders(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();

    return () => {
      isMounted = false;
    };
  }, [orderAmount]);

 
const getTotalOrderAmount = (cartItems) => {
  // Assuming each cart item has a 'price' property
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
  return totalAmount;
};

   // Replace 0 with the calculated total amount
  

   const loadRazorpay = async () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onerror = () => {
      alert('Razorpay SDK failed to load. Are you online?');
    };

    // Convert total amount to cents (assuming the amount is in dollars)
const amountInCents = Math.round(finalamount * 100);

    script.onload = async () => {
      try {
        setLoading(true);
        const result = await axios.post(`${url}/createorder`, {
          amount: amountInCents,
          address: addressFormData,
          items: orderitems,
        });

      
  
        const { amount,  id, currency } = result.data;
        const { data: { key: razorpayKey }} = await axios.get(`${url}/getrazorpaykey`);


        const options = {
          key: razorpayKey,
          amount: amount, 
          currency: currency, 
          name: 'SSP TRENDS',
          description: 'Thank you for your order',
          order_id: id,
          handler: async function (response) {
            try {

              const result = await axios.post(`${url}/payorder`, {
               amount:amount,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              });
  

              placeOrder(addressFormData, cartItems,finalamount, 'Online Payment');
            } catch (error) {
              alert('Payment failed. Please try again later.');
            }
          },
         
          theme: {
            color: '#00AB55',
          },
          netbanking: {
            hide: true,
          },
        };
  
        setLoading(false);
        const paymentObject = new Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert('Failed to initiate payment. Please try again later.');
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  };
  
  

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const totalAmount = searchParams.get('total');
    if (totalAmount) {
      setOrderAmount(parseInt(totalAmount));
    } else {
      const calculatedTotalAmount = getTotalOrderAmount(cartItems);
      setOrderAmount(calculatedTotalAmount);
    }
  }, [location.search, cartItems]);

  const handlePayment = async () => {
    setLoading(true);

    if (paymentMethods.length === 0) {
      // No payment method selected, show an alert or update state to inform the user
      alert('Please choose a payment method');
      setLoading(false);
      return;
    }

    if (paymentMethods.includes('cod') && captcha === generatedCaptcha) {
      try {
        placeOrder(addressFormData, cartItems,finalamount, 'Cash on Delivery');
      } catch (error) {
        console.log(error);
      }
    } else if (paymentMethods.includes('online')) {
      try {
        loadRazorpay();
      } catch (err) {
        alert(err);
      }
    }

    setLoading(false);
  };

  const isProceedEnabled =
    paymentMethods.length > 0 &&
    (paymentMethods.includes('online') ||
      (paymentMethods.includes('cod') && captcha === generatedCaptcha));

  const handleCheckboxChange = (method) => {
    const updatedMethods = paymentMethods.includes(method)
      ? paymentMethods.filter((m) => m !== method)
      : [...paymentMethods, method];
    setPaymentMethods(updatedMethods);
  };

  return (
    <div>
      <h3>Select Payment Method:</h3>
      <div>
        <label>
          <Checkbox
            type="checkbox"
            value="cod"
            checked={paymentMethods.includes('cod')}
            onChange={() => handleCheckboxChange('cod')}
          />
          Cash on Delivery
        </label>
      </div>
      {paymentMethods.includes('cod') && (
        <div>
          <p>Enter the Captcha: (Hint: {generatedCaptcha})</p>
          <input
            type="text"
            value={captcha}
            onChange={(e) => {
              setCaptcha(e.target.value);
              setCaptchaError('');
            }}
          />
          {captchaError && <p>{captchaError}</p>}
        </div>
      )}
      <div>
        <label>
          <Checkbox
            type="checkbox"
            value="online"
            checked={paymentMethods.includes('online')}
            onChange={() => handleCheckboxChange('online')}
          />
          Online Payment
        </label>
      </div>
      <div>
        <Button
          type="submit"
          disabled={loading || !isProceedEnabled}
          text={paymentMethods.includes('online') ? 'Proceed to Payment' : 'Proceed'}
          onClick={handlePayment}
        />
      </div>
    </div>
  );
  
};

export default PaymentForm;