const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection')

const app = express();

const port = 3000;

//log request
// app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}));

//set view engine
app.set('view engine', 'ejs');

//load assets
app.use('/css', express.static(path.resolve(__dirname, "Assets/css")))
app.use('/js', express.static(path.resolve(__dirname, "Assets/js")))
app.use('/img', express.static(path.resolve(__dirname, "Assets/img")))

//load routers
app.use('/', require('./server/routes/router'))

app.listen(port, ()=>{
    console.log(`The server is running on port ${port}`);
})