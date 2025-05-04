const express = require('express');
const connectDB = require('./config/db.js');
const productRoutes = require('./routes/productRoutes.js');

const app = express();
const cors = require('cors');

// Middleware
app.use(express.json()); // Body parser
app.use(cors());

//connect to mongoDB
connectDB();

// Product  routes
app.use('/api', productRoutes);

app.get('/', function (req, res) {
    res.send({
        message: 'App working fine'
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function (req, res) {
    console.log('App is running at port:- ' + PORT);
});
