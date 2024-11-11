const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' folder

// Routes

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/projects', (req, res) => res.sendFile(path.join(__dirname, 'public', 'projects.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'public', 'about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'public', 'contact.html')));

// Handle form submission
  app.post('/send-message', async (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter object with your email service configuration
 const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure:true,
  port: 465,
  auth: {
    user: "juwonsamuel398@gmail.com",
    pass: "iaiaeimlvnjayqfs"
  }
});

  // Set up the email options
  const mailOptions = {
  from: 'juwonsamuel398@gmail.com',
  to: 'juwonsamuel398@gmail.com', // or another recipient
  subject: `New message from ${name}`,
  text: `You have received a new message from ${name} (${email}):\n\n${message}`
};

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Message sent: ${name} (${email}): ${message}`);

    // Send a response after processing the form
    res.sendFile(__dirname + '/public/contact.html', { successMessage: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('An error occurred while sending your message.');
  }
});
// app.post('/send-message', (req, res) => {
//   const { name, email, message } = req.body;
//   console.log(`Message received from ${name} (${email}): ${message}`);
  
//   // Here, you can add code to send the data to your email, save it in a database, etc.
  
//   // Send a response or redirect after processing the form
//   res.sendFile(__dirname + '/public/contact.html', { successMessage: 'Your message has been sent successfully!' });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
