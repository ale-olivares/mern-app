// 1. Import libraries
import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Exercise from './exercise.component';

// 2. Create a class component
const ExerciseList = () => {
    // 2.1 Create variables
    const [exercises, setExercises] = useState([]);

    // 2.2 Get Exercises from the database using useEffect (instead of componentDidMount)
    useEffect(() => {
        axios.get('http://localhost:5000/api/exercises/')
            .then(response => {
                setExercises(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []); // empty array means it will only run once


    // if we used a class component, we would use componentDidMount
    // componentDidMount() {
    //     axios.get('http://localhost:5000/api/exercises/')
    //         .then(response => {
    //             this.setState({
    //                 exercises: response.data
    //             })
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }

    // 2.3 Delete Exercise
    const deleteExercise = (id) => {
        axios.delete('http://localhost:5000/api/exercises/' + id)
            .then(response => { console.log(response.data)})

        setExercises(exercises.filter(ex => ex._id !== id))
        
        // this.setState({
        //     exercises: this.state.exercises.filter(exercise => exercise._id !== id)
        // })
    }

    //2.4 Update Exercise
    const updateExercise = (id) => {
        axios.put('http://localhost:5000/api/exercises/' + id)
            .then(response => { console.log(response.data)});
        
       setExercises(exercises.filter(ex => ex._id !== id))
    

        // this.setState({
        //     exercises: this.state.exercises.filter(exercise => exercise._id !== id)
        // })
    }

    const exerciseList = () => {
        return exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id}/>;
        })
    }

    //exerciseList() {
    //    return this.state.exercises.map(currentexercise => {
    //        return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    //    })
    //}

    // 2.4 Render
    return (
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exerciseList()}
                    {/*
                        exercises.map(exercise => {
                            return (
                                <tr key={exercise._id}>
                                    <td>{exercise.username}</td>
                                    <td>{exercise.description}</td>
                                    <td>{exercise.duration}</td>
                                    <td>{exercise.date.substring(0, 10)}</td>
                                    <td>
                                        <Link to={"/edit/" + exercise._id}>edit</Link> | <a href="#" onClick={() => {deleteExercise(exercise._id)}}>delete</a>
                                    </td>
                                </tr>
                            )
                        })
                    */}
                </tbody>
            </table>
        </div>
    );
    
}

// 3. Export the component
export default ExerciseList;
