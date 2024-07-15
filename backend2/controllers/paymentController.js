import { Payment } from "../models/Payment.js";
import Razorpay from "razorpay";
// import dotenv from 'dotenv'

// dotenv.config()

const razorpay = new Razorpay({
  key_id: "rzp_test_1cagsZQpwRSozd",
  key_secret:"jTKDOHc7G3CHyJLGy1N01CdS",
}); 

// checkout
export const checkout = async (req, res) => {
  const { amount, cartItems, userId } = req.body;

  var options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  res.json({
    orderId: order.id,
    amount: amount,
    cartItems,
    userId,
    payStatus: "created",
  });
};


// verify , save to db
export const verify = async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
  } = req.body;

  let orderConfirm = await Payment.create({
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    payStatus: "paid",
  });

  res.json({ message: "payment successfull..", success: true, orderConfirm });
};

// user specificorder
export const userOrder = async (req,res) =>{
  let userId = req.user._id.toString();
  // console.log(userId)
  let orders = await Payment.find({ userId: userId }).sort({ orderDate :-1});
  res.json(orders)
}

// user specificorder
export const allOrders = async (req,res) =>{
 
  let orders = await Payment.find().sort({ orderDate :-1});
  res.json(orders)
}