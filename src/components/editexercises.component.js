import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook from React Router

const EditExercise = () => {
    const { id } = useParams(); // Capture the ID once and use it throughout the component
    const navigate = useNavigate(); // Initialize useHistory hook

    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    // State initialization using useState
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(formattedDate);
    const [users, setUsers] = useState([]);
    const BASE_URL = import.meta.env.URL_BACKEND;

    // Fetch exercise details and users on component mount
    useEffect(() => {
        axios.get(`${BASE_URL}/api/exercises/${id}`)
        // axios.get(`http://localhost:5000/api/exercises/${id}`)
            .then(response => {
                const exercise = response.data;
                setUsername(exercise.username);
                setDescription(exercise.description);
                setDuration(exercise.duration);
                setDate(exercise.date.slice(0, 10)); // Ensure the date is in 'YYYY-MM-DD' format
            })
            .catch(err => console.log(err));

        axios.get(`${BASE_URL}/api/users`)
        // axios.get('http://localhost:5000/api/users')
            .then(response => {
                if (response.data.length > 0) {
                    setUsers(response.data.map(user => user.username));
                }
            })
            .catch(err => console.log(err));
    }, [id]); // Dependency on id ensures this runs if the id changes

    // Event handlers for form inputs
    const onChangeUsername = e => setUsername(e.target.value);
    const onChangeDescription = e => setDescription(e.target.value);
    const onChangeDuration = e => setDuration(e.target.value);
    const onChangeDate = e => setDate(e.target.value);

    // Handler for form submission
    const onSubmit = e => {
        e.preventDefault();

        const exercise = {
            username,
            description,
            duration,
            date
        };

        console.log(exercise);

        axios.put(`${BASE_URL}/api/exercises/update/${id}`, exercise)
        // axios.put(`http://localhost:5000/api/exercises/update/${id}`, exercise)
            .then(res => {console.log(res.data)
                navigate('/');})
            .catch(err => console.log(err));

        // Instead of using window.location to redirect, consider using useHistory hook from React Router for navigation after submit
        //window.location = '/';
       
    };

    return (
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select required className="form-control" value={username} onChange={onChangeUsername}>
                        {users.map(user => (
                            <option key={user} value={user}>{user}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text" required className="form-control" value={description} onChange={onChangeDescription} />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input type="text" required className="form-control" value={duration} onChange={onChangeDuration} />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <input type="date" required className="form-control" value={date} onChange={onChangeDate} />
                </div>
                <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}

export default EditExercise; // Corrected the export name
