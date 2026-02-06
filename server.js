require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
const path = require('path');
const fs = require('fs'); // Require the 'fs' module
const ReactDOMServer = require('react-dom/server');
const React = require('react');
const { Container } = require('reactstrap');

const requiredEnv = [
  "MONGO_URI",
  "EMAIL_HOST",
  "EMAIL_PORT",
  "EMAIL_USER",
  "EMAIL_PASS",
  "EMAIL_FROM",
  "EMAIL_TO"
];

dotenv.config({ quiet: true });

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ ${key} is not defined. Please check your .env file.`);
    process.exit(1);
  }
});

// (Optional but recommended)
const PORT = process.env.PORT || 3005;

// ✅ Mongo connection only happens AFTER validation
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

const app = express();
const port = process.env.PORT || 3005;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  checkin: Date,
  checkout: Date,
  guests: Number,
  children: Number,
});

const Booking = mongoose.model('Booking', bookingSchema);

// ✅ EMAIL ENV VALIDATION
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ Email credentials are not defined. Please check your .env file.");
  process.exit(1);
}

const smtpTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/submit_booking', async (req, res) => {
  try {
    const formData = req.body;

    const booking = new Booking(formData);
    await booking.save();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: 'New Booking',
      text: JSON.stringify(formData, null, 2),
    };

    await smtpTransporter.sendMail(mailOptions);

    // Log a success message
    console.log('Form submitted successfully');

    // Read the HTML content from thankyou.html (assuming it's in the root directory)
    const thankyouHtml = fs.readFileSync('./thankyou.html', 'utf8');

    // Send the HTML content as a response
    res.send(thankyouHtml);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});