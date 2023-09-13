const express = require("express");
const app = express();
const port = 3000; // You can choose any available port

// Middleware to verify the time of the request
app.use((req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hourOfDay = now.getHours();

  // Check if it's a weekday (Monday to Friday) and between 9 AM and 5 PM (17:00)
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
    next(); // Continue processing the request
  } else {
    res.status(403).send("This site is only available during working hours.");
  }
});

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Define routes for each page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/home.html");
});

app.get("/services", (req, res) => {
  res.sendFile(__dirname +"/views/services.html");
});

app.get("/contact", (req, res) => {
  res.sendFile(__dirname +"/views/contact.html");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
