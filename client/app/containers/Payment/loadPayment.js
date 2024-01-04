import axios from 'axios';
const url = 'http://localhost:3000/api';

export const loadRazorpay = (price) => {
  const orderAmount = price + "00";
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.onerror = () => {
    alert('Razorpay SDK failed to load. Are you online?');
  };
  script.onload = async () => {
    try {
      const result = await axios.post(`${url}/createorder`, {
        amount: orderAmount,
      });
      const { amount, id: order_id, currency } = result.data;
      const {
        data: { key: razorpayKey },
      } = await axios.get(`${url}/getrazorpaykey`);

      const options = {
        key: razorpayKey,
        amount: orderAmount.toString(),
        currency: currency,
        name: 'example name',
        description: 'example transaction',
        order_id: order_id,
        handler: async function (response) {
          const result = await axios.post(`${url}/payorder`, {
            amount: orderAmount,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          });

          alert(result.data.msg);
          fetchOrders();
        },
        prefill: {
          name: 'example name',
          email: 'email@example.com',
          contact: '111111',
        },
        notes: {
          address: 'example address',
        },
        theme: {
          color: '#00AB55',
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      alert(err);
    }
  };
  document.body.appendChild(script);
}
