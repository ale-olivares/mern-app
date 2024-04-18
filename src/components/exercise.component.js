// 1. Import libraries
import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';

// 2. Create a component
const EditExercise = (props) => {
    return (
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{props.exercise.date.substring(0,10)}</td>
            <td>
                <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => {props.deleteExercise(props.exercise._id)}}>delete</a>
            </td>
        </tr>
    );
}

// 3. Export the component
export default EditExercise;