// 1. Import libraries
const express = require("express") 
const cors = require("cors")
const mongoose = require("mongoose")

require('dotenv').config(); //to use .env file

// 2. Create Express Server: create app and define port
const app = express() 
const port = process.env.PORT || 5000; //checks if there is an assigned port on the server, or it assigns 5000

//3. Implement middlewares
app.use(cors()) //cross origin resource sharing
app.use(express.json()) //parse json
app.use(express.urlencoded({extended:true})) //parse urlencoded data


// 4. Establish port 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });

// 5. Establish connection with database
const URI = process.env.ATLAS_URI; 
//const databasename = "Mybooks"
//const URI = `mongodb://localhost:27017/${databasename}` //Copy connection string from mongoDbCompass connected to local host
//const URI = "mongodb+srv://alejandraolivares06:fW0ics5Q1ARIUHdw@cluster0.wdi8i67.mongodb.net/${databasename}"

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology:true})
    .then((data)=> {
        console.log("Connected to MongoDB Server")
        // app.listen(port, ()=>{
        //     console.log("Server is running on port " + port)
        // })
    })
    .catch((err)=>{
        console.log("Error connecting to MongoDB: " + err )
    })

// 6. Require and use routes
const exercisesRouter = require('./Routes/exercises');
const usersRouter = require('./Routes/users');

app.use('/api/exercises', exercisesRouter); //if the url has /exercises, it will use the exercisesRouter
app.use('/api/users', usersRouter); //if the url has /users, it will use the routes in usersRouter




