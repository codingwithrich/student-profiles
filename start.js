#!node

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection
    .on('open', () => {
    console.log('Mongoose connection open');    
    })
    .on('error', (err) => {
    console.log('Connection error: ${err.message}');
});

require('./models/student_details');
require('./models/parent_details');
require('./models/payment_details');
require('./models/user_profiles');
const app = require('./app');
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});