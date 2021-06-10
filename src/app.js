const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
//cocnetando a mongodb
mongoose.connect('mongodb+srv://miguelh:b7cowTUXyjCDwYC0@cluster0.xq9wm.mongodb.net/Flores?retryWrites=true&w=majority', 

{
    
        useNewUrlParser: true,
        useUnifiedTopology: true
    
}

)

.then(db => console.log("Db conectada"))
.catch(err => console.log(err))

//import
const indexRoutes = require('./routes/index')

//configuracion
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); 

//


//routes
app.use('/', indexRoutes);




//inicializando el server
app.listen(8080, () => {
    console.log('Server on port 8080');
});