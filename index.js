const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const mongoURI = config.get('db.uri')|| process.env.MONGODB_URI;
mongoose.connect(mongoURI)
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

const app = express();
const port = 3000;

const usersRouter = require('./routers/v1/users');
/*
const bagsRouter = require('./routers/v1/bags');
const votesRouter = require('./routers/v1/votes');
*/

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", usersRouter);
/*
app.use("/api/v1/bags", bagsRouter);
app.use("/api/v1/votes", votesRouter);
*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});