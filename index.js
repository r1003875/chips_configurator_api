const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

/*const mongoURI = config.get('db.uri')|| process.env.MONGODB_URI;*/
mongoose.connect("mongodb://localhost:27017/chips")
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});