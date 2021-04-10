const express =require('express');
const port =8000;
// making path module available
const path = require('path');
const app = express();

//including a database
const db = require('./config/mongoose');

//including a Schema
const Todo = require ('./models/todo');



//set up a View Engine or ejs
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());

//static files
app.use(express.static('assets'));



app.get('/',function (request , response) {

    Todo.find({},function(error,todo){
         if(error){
              console.log("Error in fetching the Contacts from database");
              return;
         }
  return response.render('home',{
       todo_list:todo,
    //    colorList:colors,
  });
 
});
    
});

//
let months = {
    '01' : 'Jan ',
    '02' : 'Feb ',
    '03' : 'March ',
    '04' : 'April ',
    '05' : 'May ',
    '06' : 'June ',
    '07' : 'July ',
    '08' : 'Aug ',
    '09' : 'Sep ',
    '10' : 'Oct ',
    '11' : 'Nov ',
    '12' : 'Dec '
};




// create list
app.post('/create-todo',function(request,response){
     console.log(request.body);
     let arr = request.body.date.split('-');
     let dateFormatted = arr[2] + ' ' + months[arr[1]] + arr[0];
    Todo.create({
        
        description:request.body.description,
        category:request.body.category,
        date:dateFormatted,

    },function(error,newList){
        
        if(error){
            console.log("Error in creating the todo list");
            return;
        }
        console.log(newList);
        return response.redirect('back');


    });


});

//deleting from database

app.post('/delete-tasks',function(request,response){

    console.log(request.body);
let ids=request.body['checkbox'];

Todo.findByIdAndDelete(ids,function(error){
  
      if(error){
          console.log('Error in delete an object from the database',error);
          return;
      }



});
return response.redirect('back');

});








//server listen
app.listen(port,function (error) {
 
    if(error){
        console.log(`Error in Running a Server : ${error}`);
    }
     
    console.log(`Server is running on port :${port}`);


});