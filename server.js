const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const makersRouter = require('./routes/makersRouter');
const testsRouter = require('./routes/testsRouter');
const path= require('path');


const app = express();
const PORT = process.env.PORT || 4000;


mongoose.set('useNewUrlParser', true);

app.listen(PORT, async () => {
  try {
    console.log('Server is listening');
    await mongoose.connect('mongodb://localhost:27017/eval', {useNewUrlParser: true});
    console.log(`Connected to PORT ${PORT}`);
  } catch (error) {
    console.log(error);
  }
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/eval', makersRouter);
app.use('/eval/protected', testsRouter);

app.use(express.static(path.join(__dirname, 'browser','build')));

// if (process.env.NODE_ENV === 'production') {
//
//   app.get('*', (req, res, next) => {
//     res.sendFile(path.resolve('browser', 'public', 'index.html'));
//   })
// }

app.use(errorHandler);
