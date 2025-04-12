// seedUser.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/Users');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const hashedPassword = await bcrypt.hash('Test123', 10);
  await User.create({ email: 'intern@dacoid.com', password: hashedPassword });
  console.log('User created');
  mongoose.disconnect();
});
