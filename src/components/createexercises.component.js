// 1. Import libraries
import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import axios from 'axios';

// 2. Create a class component
const BASE_URL = process.env.REACT_APP_URL_BACKEND;

class CreateExercise extends Component {   
    // 2.1 Create a constructor
    constructor(props) {
        super(props); // call the parent class constructor

        // Get today's date in YYYY-MM-DD format
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;


       
    // Initialize the state with today's date

        this.state = { // this is how you create a variable in react
            username: '',
            description: '',
            duration: 0,
            date: formattedDate,
            users: []
        } //when you update the state variable, the component will re-render
    }

    // 2.2 Create methods to update the state variables
   onChangeUsername = (e) => {
        this.setState({
            username: e.target.value // update the username variable
        });
    }

    onChangeDescription = (e) => {
        this.setState({
            description: e.target.value // update the description variable
        });
    }

    onChangeDuration = (e) => {
        this.setState({
            duration: e.target.value // update the duration variable
        });
    }

    onChangeDate = (date) => {
        this.setState({
            date: date // update the date variable
        });
    }

    // 2.3 Create a method to handle the form submission
    onSubmit = (e) => {
        e.preventDefault(); // prevent the default form submission behavior

        const exercise = { // create an exercise object
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        // Send the exercise object to the backend
        axios.post(`${BASE_URL}/api/exercises/add`, exercise)
        // axios.post('http://localhost:5000/api/exercises/add', exercise)
            .then(res => {
                console.log(res.data)
                window.location = '/'; // go back to the home page
            })
            .catch(err => console.log(err));

       
    }

    // 2.4 Create a method to fetch the users
    componentDidMount() { // this method is called before anything is rendered on the page

        axios.get(`${BASE_URL}/api/users`) // fetch the users from the backend
        // axios.get('http://localhost:5000/api/users') // fetch the users from the backend
            .then(response => {
                if (response.data.length > 0){ // if there are users
                    this.setState({
                        users: response.data.map(user => user.username), // update the users variable
                        username: response.data[0].username // update the username variable
                    });
                }
            })
    }

    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form>
                    <div className="form-group">
                        <label>Username: </label>
                        <select required className="form-control" value={this.state.username} onChange={this.onChangeUsername}>
                            {
                                this.state.users.map((user) => {
                                    return <option key={user} value={user}>{user}</option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text" required className="form-control" value={this.state.description} onChange={this.onChangeDescription} />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input type="text" required className="form-control" value={this.state.duration} onChange={this.onChangeDuration} />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <input type="date" required className="form-control" value={this.state.date} onChange={this.onChangeDate} />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" onClick={this.onSubmit} />
                    </div>
                </form>
            </div>
        );
    }
}

// 3. Export the component
export default CreateExercise;