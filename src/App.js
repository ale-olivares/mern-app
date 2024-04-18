import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

// Components
import NavBar from "./components/NavBar.component";
import ExercisesList from "./components/exerciseslist.component";
import EditExercise from "./components/editexercises.component";
import CreateExercise from "./components/createexercises.component";
import CreateUser from "./components/createusers.component";

function App() {
  return (
    <>
      <div className="container">
        <NavBar />
        <Routes>
          <Route path="/" element={<ExercisesList />} />
          <Route path="/edit/:id" element={<EditExercise />} />
          <Route path="/create" element={<CreateExercise />} />
          <Route path="/user" element={<CreateUser />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
