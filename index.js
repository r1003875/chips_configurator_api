const config = require('config');
const express = require('express');



const mongoose = require('mongoose');
const cors = require('cors');
const port = 3000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});