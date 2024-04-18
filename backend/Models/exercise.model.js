// 1. Import mongoose library
const mongoose = require("mongoose"); 

// 2. Create Schema
const Schema = mongoose.Schema
const ExerciseSchema = new Schema({
    username: {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: Date, required: true},
    //you can add more fields here
}, {
    timestamps: true //automatically create fields for when the user was created and updated
})

// 3. Create a collection for the created schema
const Exercise = mongoose.model("Exercise", ExerciseSchema); //two arguments: collection name, schema
// Exercise has to be with capital first letter. mongo will make that small and pluralize
// the model name: "Exercise" => "exercises"

// 4. Export the model
module.exports = Exercise; //export the model to use it in other files