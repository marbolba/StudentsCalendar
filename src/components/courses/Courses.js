import React, { Component } from 'react';
import './Courses.css'


class Courses extends Component {
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Matematyka stosowana</td>
                            <td>{today.toUTCString()}</td>
                            <td>{today.toUTCString()}</td>
                            <td>{today.toUTCString()}</td>
                        </tr>
                        <tr>
                            <td>Fizyka</td>
                            <td>{today.toUTCString()}</td>
                            <td>{today.toUTCString()}</td>
                            <td>{today.toUTCString()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
};
export default Courses;