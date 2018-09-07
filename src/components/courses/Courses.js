import React, { Component } from 'react';
import './Courses.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


class Courses extends Component {
    state = {
        NewCourseName: "",
        NewCourseType: "Typ",
        NewCouseDay: "Dzień",
        NewCouseStartTime: null,
        NewCouseEndTime: null,
        StartDate: null,
        EndDate: null
    }
    onSubmitHandler = () => {
        if (this.state.NewCourseName !== "" && this.state.NewCourseType !== "Typ" && this.state.NewCouseDay !== "Dzień" && this.state.NewCouseStartTime && this.state.NewCouseEndTime &&this.state.StartDate && this.state.EndDate)
            console.log("ok")
        else
            console.log("err")
    }
    inputFrom = () => {
        return (
            <tr>
                <td><input type="text" onChange={(e) => { this.setState({ NewCourseName: e.target.value }) }} value={this.state.NewCourseName} /></td>
                <td>
                    <div className="dropdown">
                        <div>{this.state.NewCouseDay}</div>
                        <div className="dropdown-content">
                            <a onClick={() => { this.setState({ NewCouseDay: "Pon" }) }}    >Poniedziałek</a>
                            <a onClick={() => { this.setState({ NewCouseDay: "Wt" }) }}     >Wtorek</a>
                            <a onClick={() => { this.setState({ NewCouseDay: "Śr" }) }}     >Środa</a>
                            <a onClick={() => { this.setState({ NewCouseDay: "Czw" }) }}    >Czwartek</a>
                            <a onClick={() => { this.setState({ NewCouseDay: "Pt" }) }}     >Piątek</a>
                            <a onClick={() => { this.setState({ NewCouseDay: "Sob" }) }}    >Sobota</a>
                            <a onClick={() => { this.setState({ NewCouseDay: "Nd" }) }}     >Niedziela</a>
                        </div>
                    </div>
                </td>
                <td><input type="time" id="appt-time" name="appt-time" onChange={(e)=>{
                    this.setState({
                        NewCouseStartTime: e.target.value
                    })
                }}/></td>
                <td><input type="time" id="appt-time" name="appt-time" onChange={(e)=>{
                    this.setState({
                        NewCouseEndTime: e.target.value
                    })
                }}/></td>
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
        var today = new Date()
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