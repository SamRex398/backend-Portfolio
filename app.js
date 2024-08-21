const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/projects', (req, res) => res.sendFile(path.join(__dirname, 'public', 'projects.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'public', 'about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'public', 'contact.html')));

// Handle form submission
app.post('/send-message', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Message received from ${name} (${email}): ${message}`);
  
  // Here, you can add code to send the data to your email, save it in a database, etc.
  
  // Send a response or redirect after processing the form
  res.sendFile(__dirname + '/views/contact.html', { successMessage: 'Your message has been sent successfully!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
