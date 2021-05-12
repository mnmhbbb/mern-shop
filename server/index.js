const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config({ path: './.env' });
// const config = require('./config/key');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// const mongoose = require('mongoose');
// mongoose
//   .connect(config.mongoURI, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('MongoDB Connected...'))
//   .catch((err) => console.log(err));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('MongoDB Connection Success 👍');
  } catch (error) {
    console.log('MongoDB Connection Failed 💥');
    process.exit(1);
  }
};

module.exports = connectDB;

app.use(cors());
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//   }),
// );

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/uploads', express.static('uploads'));
app.use('/api/product', require('./routes/product'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
