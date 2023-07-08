const path = require('path');


const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');




const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images',express.static(path.join(__dirname, 'images')));


app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(homeRoutes);

app.use(errorController.get404);


    app.listen(3000, () => {
      console.log('server is running on port 3000')
    });
