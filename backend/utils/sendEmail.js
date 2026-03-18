import nodemailer from "nodemailer";

export const sendAppointmentEmail = async (appointment) => {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: appointment.email,
    subject: "Appointment Confirmation",
    html: `
      <h2>Appointment Confirmed</h2>

      <p>Dear ${appointment.patientName},</p>

      <p>Your appointment has been successfully booked.</p>

      <p><strong>Date:</strong> ${appointment.date}</p>

      <p>Thank you for choosing our clinic.</p>
    `
  };

  await transporter.sendMail(mailOptions);

};