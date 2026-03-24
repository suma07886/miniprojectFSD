// 1. Import Express
const express = require("express");

// 2. Create an Express app
const app = express();

// 3. Optional: parse JSON bodies (if needed)
app.use(express.json());

// 4. Define your /search route
app.get("/search", (req, res) => {
  const query = req.query.q || "Product"; // fallback if q is missing

  const data = [
    {
      title: `${query} - Amazon`,
      price: "₹25,000",
      site: "Amazon",
      image: "https://via.placeholder.com/150"
    },
    {
      title: `${query} - Flipkart`,
      price: "₹24,500",
      site: "Flipkart",
      image: "https://via.placeholder.com/150"
    }
  ];

  res.json(data);
});

// 5. Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});