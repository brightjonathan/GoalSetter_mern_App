const express = require('express');
const app = express();
const path = require('path');
const colour = require('colors')
require('dotenv').config();
const goalRoute = require('./router/goalRoute');
const userRoute = require('./router/userRoute');
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./confiq/database');

//database connection
connectDB();


//internal middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//for our router
app.use('/api/goals', goalRoute);
app.use('/api/users', userRoute);

//setting the project to production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
}else{
    app.get('/', (req, res)=> res.send('please set to production'))
}


//for our error handler
app.use(errorHandler)


//local host connection
const port = process.env.PORT || 4000;
app.listen(port, ()=>{
 console.log('server is running...');
});


