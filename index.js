const express =require('express');
const port =8000;

const app = express();



//server listen
app.listen(port,function (error) {
 
    if(error){
        console.log(`Error in Running a Server : ${error}`);
    }
     
    console.log(`Server is running on port :${port}`);


});
