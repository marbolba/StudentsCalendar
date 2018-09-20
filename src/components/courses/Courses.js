import React, { Component } from 'react';
import './Courses.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Courses extends Component {
    state = {
        CoursesTableData: null,
        NewCourseName: "",
        NewCourseType: "Typ",
        NewCourseDay: {
            "Name": "Dzień",
            "Nr": null
        },
        NewCourseStartTime: null,
        NewCourseEndTime: null,
        StartDate: null,
        EndDate: null
    }
    componentDidMount = () => {
        this.getCoursesData()
    }
    onSubmitHandler = () => {
        if (this.state.NewCourseName !== "" && this.state.NewCourseType !== "Typ" &&
            this.state.NewCourseDay.Name !== "Dzień" && this.state.NewCourseStartTime &&
            this.state.NewCourseEndTime && this.state.StartDate && this.state.EndDate) {

            let data = {
                "courseName": this.state.NewCourseName,
                "courseType": this.state.NewCourseType,
                "courseDay": this.state.NewCourseDay.Nr,
                "startTime": this.state.NewCourseStartTime,
                "endTime": this.state.NewCourseEndTime,
                "startDate": this.state.StartDate,
                "endDate": this.state.EndDate
            }

            let url = "http://localhost:4141/api/courses"
            axios.post(url, data)
                .then(()=>{
                    this.getCoursesData()
                    document.getElementById("appt-timeS").value="";
                    document.getElementById("appt-timeE").value="";
                    this.setState({
                        NewCourseName: "",
                        NewCourseType: "Typ",
                        NewCourseDay: {
                            "Name": "Dzień",
                            "Nr": null
                        },
                        NewCourseStartTime: null,
                        NewCourseEndTime: null,
                        StartDate: null,
                        EndDate: null
                    })
                    toast.success("Added new Course");
                })
        }
        else {
            console.log(new Date(this.state.EndDate))
            toast.error("Please fill data properly");
        }

    }
    getCoursesData = () => {
        let url = "http://localhost:4141/api/courses"
        axios.get(url)
            .then(res => {
                let rows = []
                let dayEnum = ["Nd", "Pon", "Wt", "Sr", "Czw", "Pt", "Sob"]
                res.data.forEach(course => {
                    rows.push(
                        <tr>
                            <td>
                                {course.courseName}
                            </td>
                            <td>
                                {course.courseType}
                            </td>
                            <td>
                                {dayEnum[course.courseDay]}
                            </td>
                            <td>
                                {course.startTime}
                            </td>
                            <td>
                                {course.endTime}
                            </td>
                            <td>
                                {course.startDate.substring(0, 10)}
                            </td>
                            <td>
                                {course.startDate.substring(0, 10)}
                            </td>
                        </tr>
                    )
                });
                console.log(rows)
                this.setState({
                    CoursesTableData: rows
                })
            })
    }
    inputFrom = () => {
        return (
            <tr>
                <td>
                    <input type="text" onChange={(e) => { this.setState({ NewCourseName: e.target.value }) }} value={this.state.NewCourseName} />
                </td>
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
                    <div className="dropdown">
                        <div>{this.state.NewCourseDay.Name}</div>
                        <div className="dropdown-content">
                            <a onClick={() => { this.setState({ NewCourseDay: { "Name": "Pon", "Nr": 1 } }) }}    >Poniedziałek</a>
                            <a onClick={() => { this.setState({ NewCourseDay: { "Name": "Wt", "Nr": 2 } }) }}     >Wtorek</a>
                            <a onClick={() => { this.setState({ NewCourseDay: { "Name": "Sr", "Nr": 3 } }) }}     >Środa</a>
                            <a onClick={() => { this.setState({ NewCourseDay: { "Name": "Czw", "Nr": 4 } }) }}    >Czwartek</a>
                            <a onClick={() => { this.setState({ NewCourseDay: { "Name": "Pt", "Nr": 5 } }) }}     >Piątek</a>
                            <a onClick={() => { this.setState({ NewCourseDay: { "Name": "Sob", "Nr": 6 } }) }}    >Sobota</a>
                            <a onClick={() => { this.setState({ NewCourseDay: { "Name": "Nd", "Nr": 0 } }) }}     >Niedziela</a>
                        </div>
                    </div>
                </td>
                <td><input type="time" id="appt-timeS" name="appt-time" onChange={(e) => {
                    this.setState({ NewCourseStartTime: e.target.value })
                }} />
                </td>
                <td><input type="time" id="appt-timeE" name="appt-time" onChange={(e) => {
                    this.setState({ NewCourseEndTime: e.target.value })
                }} />
                </td>
                <td>
                    <DatePicker
                        selected={this.state.StartDate}
                        onChange={(date) => {
                            if(date==null || this.state.EndDate==null){
                                this.setState({
                                    StartDate: date
                                })
                            }else if(this.state.EndDate > date){
                                this.setState({
                                    StartDate: date
                                })
                            }else{
                                this.setState({
                                    StartDate: null
                                })
                                toast.error("Start date must be before end date");
                            }
                        }}
                        isClearable={true}
                        placeholderText="Data początku kursu"
                    />
                </td>
                <td>
                    <DatePicker
                        selected={this.state.EndDate}
                        onChange={(date) => {
                            if(date==null || this.state.StartDate==null){
                                this.setState({
                                    EndDate: date
                                })
                            }else if(this.state.StartDate < date){
                                this.setState({
                                    EndDate: date
                                })
                            }else{
                                this.setState({
                                    EndDate: null
                                })
                                toast.error("End date must be after start date");
                            }
                        }}
                        isClearable={true}
                        placeholderText="Data końca kursu"
                    />
                </td>
                <td>
                    <input type="submit" onClick={this.onSubmitHandler} />
                </td>
            </tr>
        )
    }
    render() {
        return (
            <div>
                <table>
                    <thead className="TableHead">
                        <tr>
                            <th>Przedmiot</th>
                            <th>Typ Zajęć</th>
                            <th colSpan="3">Dzień i godzina zajęć</th>
                            <th>Od</th>
                            <th>Do</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.CoursesTableData}
                        {this.inputFrom()}
                    </tbody>
                </table>
                <ToastContainer />
            </div>
        );
    }
};
export default Courses;