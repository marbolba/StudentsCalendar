import React, { Component } from 'react';
import './Courses.css'


class Courses extends Component {
    state = {
        NewCourseName:  "",
        NewTerm: null,
        StartDate: null,
        EndDate: null
    }
    onSubmitHandler = () => {
        console.log(this.state.NewCourseName)
        console.log(this.state.NewTerm)
    }
    render() {
        var today = new Date()
        return (
            <div>
                <table>
                    <thead className="TableHead">
                        <tr>
                            <th>Przedniot</th>
                            <th>Termin[]</th>
                            <th>Od</th>
                            <th>Do</th>
                            <th>Operacja</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Matematyka stosowana</td>
                            <td>{today.toUTCString()}</td>
                            <td>{today.toUTCString()}</td>
                            <td>{today.toUTCString()}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Fizyka</td>
                            <td>{today.toUTCString()}</td>
                            <td>{today.toUTCString()}</td>
                            <td>{today.toUTCString()}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><input type="text" onChange={(e)=>{this.setState({NewCourseName:e.target.value})}} value={this.state.NewCourseName}/></td>
                            <td><input type="date" onChange={(e)=>{this.setState({NewTerm:e.target.value})}} /></td>
                            <td><input type="date"/></td>
                            <td><input type="date"/></td>
                            <td><input type="submit" onClick={this.onSubmitHandler}/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
};
export default Courses;