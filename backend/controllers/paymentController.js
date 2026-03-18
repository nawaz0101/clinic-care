// controllers/paymentController.js

import Razorpay from "razorpay";
import crypto from "crypto";
import Appointment from "../models/Appointment.js";
import { sendAppointmentEmail } from "../utils/sendEmail.js";

export const createOrder = async (req, res) => {
  try {

   const razorpay = new Razorpay({
   key_id: process.env.RAZORPAY_KEY_ID,
   key_secret: process.env.RAZORPAY_KEY_SECRET
   });

    // Fixed consultation fee
    const amount = 100;

    const options = {
      amount: amount * 100, // Razorpay uses paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (error) {

    console.error("Razorpay order error:", error);

    res.status(500).json({
      message: "Order creation failed"
    });

  }
};

//Verify Payment
export const verifyPayment = async (req, res) => {

  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      appointmentData
    } = req.body;


    // Generate expected signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");


    // Compare signatures
    if (razorpay_signature === expectedSign) {

      // Payment verified → create appointment
      const appointment = new Appointment({
        ...appointmentData,
        paymentId: razorpay_payment_id,
        paymentStatus: "paid"
      });

      await appointment.save();
        // email
      await sendAppointmentEmail(appointment);

      res.json({
        success: true,
        message: "Payment verified & appointment booked"
      });

    } else {

      res.status(400).json({
        success: false,
        message: "Payment verification failed"
      });

    }

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Payment verification error"
    });

  }

};