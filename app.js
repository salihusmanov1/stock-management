const path = require('path');

// const bootstrap = require('bootstrap');
const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const session = require('express-session');
// const sessionStorage = require('connect-mongodb-session')(session);
// const bootstrap =require('bootstrap');

const errorController = require('./controllers/error');
// const User = require('./models/user');

// const MONGODB_URI =
//   'mongodb+srv://nodeUser:3GwPYdkIjSQaY7dz@cluster0.kitbew3.mongodb.net/Inventory';

const app = express();
// const store = new sessionStorage({
//   uri: MONGODB_URI,
//   collection: 'sessions'
// });

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images',express.static(path.join(__dirname, 'images')));
// app.use(
//   session({
//     secret: 'lets keep it like this for now',
//     resave: false,
//     saveUninitialized: false,
//     store: store
//   })
// );

// app.use((req, res, next) => {
//   if (!req.session.user) {
//     return next();
//   }
//   User.findById(req.session.user._id)
//     .then(user => {
//       req.user = user;
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(homeRoutes);

app.use(errorController.get404);

// mongoose
//   .connect(MONGODB_URI)
//   .then(result => {
    app.listen(3000, () => {
      console.log('server is running on port 3000')
    });
  // })
  // .catch(err => {
  //   console.log(err);
  // });