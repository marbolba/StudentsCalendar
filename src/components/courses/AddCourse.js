import React, { Component } from 'react';
import './AddCourse.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Api from '../../api/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux'


class AddCourse extends Component {
    state = {
        NewCourseName: "",
        NewCourseType: "Typ",
        NewCourseDay: "",
        NewCourseStartTime: "",
        NewCourseEndTime: "",
        StartDate: null,
        EndDate: null
    }
    onSubmitHandler = () => {
        if (this.state.NewCourseName !== "" && this.state.NewCourseType !== "Typ" &&
            this.state.NewCourseDay !== "" && this.state.NewCourseStartTime !== "" &&
            this.state.NewCourseEndTime !== "" && this.state.StartDate && this.state.EndDate) {

            let data = {
                "courseOwner": this.props.userId,
                "courseName": this.state.NewCourseName,
                "courseType": this.state.NewCourseType,
                "courseDay": this.state.NewCourseDay,
                "startTime": this.state.NewCourseStartTime,
                "endTime": this.state.NewCourseEndTime,
                "startDate": this.state.StartDate.toISOString().slice(0, 10),
                "endDate": this.state.EndDate.toISOString().slice(0, 10)
            }

            Api.addCourse(data)
                .then(() => {
                    this.props.refreshCourses();
                    this.cleanInputForm();
                    toast.success("Dodano nowy kurs");
                })
        }
        else {
            toast.error("Proszę wypełnić wymagane dane");
        }

    }
    cleanInputForm = () => {
        //TODO this two dont realy work 
        document.getElementById("appt-timeS").value = "";
        document.getElementById("appt-timeE").value = "";
        document.getElementById("courseDay").value = "";
        document.getElementById("courseType").value = "Typ";
        this.setState({
            NewCourseName: "",
            NewCourseType: "Typ",
            NewCourseDay: "",
            NewCourseStartTime: "",
            NewCourseEndTime: "",
            StartDate: null,
            EndDate: null
        })
    }
    render() {

        return (
            <div className='addCourse'>
                <div className='addFormTopBar'>
                    <span>Nowy przedmiot</span>
                </div>
                <div className='addFormBody'>
                    <div className='formItem'>
                        <span>Nazwa</span>
                        <input type="text" onChange={(e) => { this.setState({ NewCourseName: e.target.value }) }} value={this.state.NewCourseName} />
                    </div>
                    <div className='formItem'>
                        <span>Określ typ zajęć</span>
                        <select id="courseType" name="courseType" onChange={(e)=>{this.setState({NewCourseType: e.target.value})}}>
                            <option value="Typ">Typ</option>
                            <option value="Wykład">Wykład</option>
                            <option value="Laboratoria">Laboratoria</option>
                            <option value="Ćwiczenia">Ćwiczenia</option>
                        </select>
                    </div>
                    <div className='formItem'>
                        <span>Data rozpoczęcia zajęć</span>
                        <DatePicker
                        className='datePicker'
                        selected={this.state.StartDate}
                        onChange={(date) => {
                            if (date != null) {
                                if (this.state.EndDate == null) {
                                    this.setState({
                                        StartDate: date.hour(6)
                                    })
                                } else if (this.state.EndDate > date) {
                                    this.setState({
                                        StartDate: date.hour(6)
                                    })
                                } else {
                                    this.setState({
                                        StartDate: null
                                    })
                                    toast.error("Start date must be before end date");
                                }
                            } else {
                                this.setState({
                                    StartDate: null
                                })
                            }
                        }}
                        isClearable={true}
                        placeholderText="Proszę wybrać datę"
                        />
                    </div>
                    <div className='formItem'>
                        <span>Data zakończenia zajęć</span>
                        <DatePicker
                        className='datePicker'
                        selected={this.state.EndDate}
                        onChange={(date) => {
                            if (date != null) {
                                if (this.state.StartDate == null) {
                                    this.setState({
                                        EndDate: date.hour(6)
                                    })
                                } else if (this.state.StartDate < date) {
                                    this.setState({
                                        EndDate: date.hour(6)
                                    })
                                } else {
                                    this.setState({
                                        EndDate: null
                                    })
                                    toast.error("Start date must be before end date");
                                }
                            } else {
                                this.setState({
                                    EndDate: null
                                })
                            }
                        }}
                        isClearable={true}
                        placeholderText="Proszę wybrać datę"
                        />
                    </div>
                    <div className='formItem'>
                        <span>Dzień zajęć</span>
                        <select id="courseDay" name="courseDay" onChange={(e)=>{this.setState({NewCourseDay: e.target.value})}}>
                            <option value="">Dzień</option>
                            <option value="1">Poniedziałek</option>
                            <option value="2">Wtorek</option>
                            <option value="3">Środa</option>
                            <option value="4">Czwartek</option>
                            <option value="5">Piątek</option>
                            <option value="6">Sobota</option>
                            <option value="0">Niedziela</option>
                        </select>
                    </div>
                    <div className='formItem'>
                        <span>Godzina rozpoczęcia</span>
                        <input className='timeInput' type="time" id="appt-timeS" name="appt-time" onChange={(e) => {
                            this.setState({ NewCourseStartTime: e.target.value })
                        }}/>
                    </div>
                    <div className='formItem'>
                        <span>Godzina zakończenia</span>
                        <input className='timeInput' type="time" id="appt-timeE" name="appt-time" onChange={(e) => {
                            this.setState({ NewCourseEndTime: e.target.value })
                        }}/>
                    </div>
                    <div className='formItem'>
                        <div className='submitButton' onClick={this.onSubmitHandler}>
                            <span>Prześlij</span>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        )
    }
}
const mapStateToProps = store => {
    return {
        userId: store.user.userId,
        userAuthorized: store.user.userAuthorized
    }
}
export default connect(
    mapStateToProps
)(AddCourse)