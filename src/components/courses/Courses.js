import React, { Component } from 'react';
import './Courses.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';


class Courses extends Component {
    state = {
        NewCourseName: "",
        NewCourseType: "Typ",
        NewCourseDay: "Dzień",
        NewCourseStartTime: null,
        NewCourseEndTime: null,
        StartDate: null,
        EndDate: null
    }
    onSubmitHandler = () => {
        if (this.state.NewCourseName !== "" && this.state.NewCourseType !== "Typ" && this.state.NewCourseDay !== "Dzień" && this.state.NewCourseStartTime && this.state.NewCourseEndTime && this.state.StartDate && this.state.EndDate) {
            console.log("sending")
            let data = {
                "courseName": this.state.NewCourseName,
                "courseType": this.state.NewCourseType,
                "courseDay" : this.state.NewCourseDay,
                "startTime" : this.state.NewCourseStartTime,
                "endTime"   : this.state.NewCourseEndTime,
                "startDate" : this.state.StartDate,
                "endDate"   : this.state.EndDate
            }

            let url = "http://localhost:8081/api/courses"
            axios.post(url, data)
        }
        else {
            console.log(new Date(this.state.EndDate))
        }

    }
    inputFrom = () => {
        return (
            <tr>
                <td><input type="text" onChange={(e) => { this.setState({ NewCourseName: e.target.value }) }} value={this.state.NewCourseName} /></td>
                <td>
                    <div className="dropdown">
                        <div>{this.state.NewCourseDay}</div>
                        <div className="dropdown-content">
                            <a onClick={() => { this.setState({ NewCourseDay: "Pon" }) }}    >Poniedziałek</a>
                            <a onClick={() => { this.setState({ NewCourseDay: "Wt" }) }}     >Wtorek</a>
                            <a onClick={() => { this.setState({ NewCourseDay: "Śr" }) }}     >Środa</a>
                            <a onClick={() => { this.setState({ NewCourseDay: "Czw" }) }}    >Czwartek</a>
                            <a onClick={() => { this.setState({ NewCourseDay: "Pt" }) }}     >Piątek</a>
                            <a onClick={() => { this.setState({ NewCourseDay: "Sob" }) }}    >Sobota</a>
                            <a onClick={() => { this.setState({ NewCourseDay: "Nd" }) }}     >Niedziela</a>
                        </div>
                    </div>
                </td>
                <td><input type="time" id="appt-time" name="appt-time" onChange={(e) => {
                    this.setState({
                        NewCourseStartTime: e.target.value
                    })
                }} /></td>
                <td><input type="time" id="appt-time" name="appt-time" onChange={(e) => {
                    this.setState({
                        NewCourseEndTime: e.target.value
                    })
                }} /></td>
                <td>
                    <div className="dropdown">
                        <div>{this.state.NewCourseType}</div>
                        <div className="dropdown-content">
                            <a onClick={() => { this.setState({ NewCourseType: "Wykład" }) }}       >Wykład</a>
                            <a onClick={() => { this.setState({ NewCourseType: "Laboratoria" }) }}  >Laboratoria</a>
                            <a onClick={() => { this.setState({ NewCourseType: "Zajęcia" }) }}      >Zajęcia</a>
                        </div>
                    </div>
                </td>
                <td>
                    <DatePicker
                        selected={this.state.StartDate}
                        onChange={(date) => {
                            this.setState({
                                StartDate: date
                            })
                        }}
                        isClearable={true}
                        placeholderText="Data początku kursu"
                    />
                </td>
                <td>
                    <DatePicker
                        selected={this.state.EndDate}
                        onChange={(date) => {
                            this.setState({
                                EndDate: date
                            })
                        }}
                        isClearable={true}
                        placeholderText="Data końca kursu"
                    />
                </td>
                <td><input type="submit" onClick={this.onSubmitHandler} /></td>
            </tr>
        )
    }
    render() {
        return (
            <div>
                <table>
                    <thead className="TableHead">
                        <tr>
                            <th>Przedniot</th>
                            <th colSpan="3">Dzień i godzina zajęć</th>
                            <th>Typ Zajęć</th>
                            <th>Od</th>
                            <th>Do</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.inputFrom()}
                    </tbody>
                </table>
            </div>
        );
    }
};
export default Courses;