// 1. Import libraries and models
const router = require("express").Router();
const User = require("../Models/user.model");

// 2. Define routes

// GET '/'
router.route("/").get((req, res)=>{
    User.find() //finds all users
        .then((users)=> res.json(users)) //If everything ok, return users
        .catch((err)=> res.status(400).json("Error: " + err))
});

// POST '/add'
router.route("/add").post((req, res)=>{
    //Retrieve data from the request body
    const username = req.body.username;

    //Create new user object
    const newUser = new User({username})

    //Save new user in the collection
    newUser.save()
            .then((savedUser)=> res.json("User Added!"))
            .catch((err)=> res.status(400).json("Error: " + err))

});

// 3. Export router
module.exports = router;