// 1. Import libraries
import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';

// 2. Create a component
const CreateUser = () => {
    const [username, setUsername] = useState('');
    const BASE_URL = process.env.REACT_APP_URL_BACKEND;

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: username
        }
        console.log(user);

        // Send the user object to the backend
        axios.post(`${BASE_URL}/api/users/add`, user)
        // axios.post('http://localhost:5000/api/users/add', user)
            .then(res =>{ console.log(res.data)
                setUsername('');
            })
            .catch(err => console.log(err));

        
    }


    return (
        <div>
            <h3>Create New User</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text" required className="form-control" value={username} onChange={onChangeUsername} />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}

// 3. Export the component
export default CreateUser;