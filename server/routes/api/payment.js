const OrderSchema = require("../../models/order");
const Razorpay = require("razorpay");
const RefundSchema =require("../../models/refund")


const createOrder = (request, response) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

  
   

    const options = {
      amount: request.body.amount,
      currency: "INR",
    };
    instance.orders.create(options, (err, order) => {
      if (err) {
        console.error(err);
        return response.send("Some error occurred");
      }

     
      response.send(order);
    });
  } catch (error) {
    console.error(error);
    response.send(error);
  }
};

const payOrder = async (request, response) => {


  try {

   
    const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } = request.body;
    const newOrder = await OrderSchema.create({
      isPaid: true,
      amount: amount,
      razorpay: {
        order_id: razorpayOrderId,
        payment_id: razorpayPaymentId,
        signature: razorpaySignature,
      },
    });
    response.send({ msg: "Payment was successful" });
  } catch (error) {
    console.error(error);
    response.send(error);
  }
};

const paymentResponse = async (request, response) => {
  try {
    const orders = await OrderSchema.find();
    
    response.send(orders);
  } catch (error) {
    console.error(error);
    response.send(error);
  }
}

const refundPayment = async (request, response) => {
  try {

  
    const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } = request.body;

    // Verify Razorpay Signature (Optional, but recommended)
    // Implement your verification logic here using the Razorpay instance

    // Create a new refund in the Razorpay API
    const refundResponse = await instance.payments.refund(razorpayPaymentId, {
      amount: amount * 100, // Amount in paisa (convert to smallest currency unit)
    });

    // Save the refund details to your database (if needed)
    const newRefund = {
      payment_id: razorpayPaymentId,
      refund_id: refundResponse.id,
      amount: refundResponse.amount / 100, // Convert back to currency
      currency: refundResponse.currency,
      status: refundResponse.status,
      createdAt: refundResponse.created_at,
    };

    // Assuming you have a RefundSchema for the database model
    const refund = await RefundSchema.create(newRefund);

    

    res.json({ message: 'Refund successful', refund });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process refund request.' });
  }
}

module.exports = {
  createOrder,
  payOrder,
  paymentResponse,
  refundPayment
};