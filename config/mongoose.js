const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Todo_App_Db');

const db= mongoose.connection;


db.on('error',console.error.bind('console',"error connecting to database"));

db.once('open',function () {
    console.log("Successful connecting to the database");
    
})