const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set up EJS views
app.use(express.static(path.join(__dirname, 'views')));


// Routes
app.get('/index.html', (req, res) =>   res.sendFile(path.join(__dirname, 'index.html')));
app.get('/views/project.html', (req, res) => res.sendFile(path.join(__dirname,'views','project.html')));
app.get('/views/about.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});
app.get('/views/contact.html', (req, res) => res.sendFile(path.join(__dirname, 'views' ,'contact.html')));

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
