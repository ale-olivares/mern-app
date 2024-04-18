// 1. Import mongoose library
const mongoose = require("mongoose"); 

// 2. Create Schema
const Schema = mongoose.Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, //removes white spaces
        minlength: 3
    }, 
    //you can add more fields here
}, {
    timestamps: true //automatically create fields for when the user was created and updated
})

// 3. Create a collection for the created schema
const User = mongoose.model("User", UserSchema); //two arguments: collection name, schema
// User has to be with capital first letter. mongo will make that small and pluralize
// the model name: "User" => "users"

// 4. Export the model
module.exports = User; //export the model to use it in other files