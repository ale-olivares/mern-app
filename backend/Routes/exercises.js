// 1. Import libraries and models
const router = require("express").Router();
const Exercise = require("../Models/exercise.model");

// 2. Define routes

// GET '/'
router.route("/").get((req, res)=>{
    Exercise.find() //finds all exercises
        .then((exercises)=> res.json(exercises)) //If everything ok, return exercises
        .catch((err)=> res.status(400).json("Error: " + err))
});

// GET '/:id'
router.route("/:id").get((req, res)=>{
    Exercise.findById(req.params.id) //finds exercise by id
        .then((exercise)=>res.json(exercise))
        .catch((err)=>res.status(400).send("Error: " + err))
});

// POST '/add'
router.route("/add").post((req, res)=>{
    //Retrieve data from the request body
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    //Create new exercise object
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    })

    //Save new exercise in the collection
    newExercise.save()
            .then((savedExercise)=> res.json("Exercise Added!"))
            .catch((err)=> res.status(400).json("Error: " + err))

});

// PUT '/update/:id'
router.route("/update/:id").put((req,res)=>{
    //Firs find the exercise
    Exercise.findById(req.params.id)
        .then((exercise)=>{ //If we find the exercise, we update it
            exercise.username = req.body.username;
            exercise.description = req.body.description,
            exercise.duration = Number(req.body.duration),
            exercise.date = Date.parse(req.body.date)
            exercise.save()
                    .then(()=> res.json("Exercise Updated!"))
                    .catch((err)=> res.status(400).json("Error: " + err))
        })
        .catch((err)=> res.status(400).json("Error: " + err))
});

// DELETE '/:id'
router.route("/:id").delete((req, res)=>{
    Exercise.findByIdAndDelete(req.params.id)
            .then(()=> res.json("Exercise Deleted!"))
            .catch((err)=> res.status(400).json("Error: " + err))
});

// 3. Export router
module.exports = router;