import React, { Component } from 'react';
import './Courses.css'
import axios from 'axios';
import { connect } from 'react-redux'
import AddCourse from './AddCourse'

class Courses extends Component {
    state = {
        coursesView: false,
        CoursesTableData: null
    }
    componentDidMount = () => {
        this.getCoursesData()
    }
    toggleDisplayCourses = () => {
        if (this.state.coursesView !== false) {
            this.setState({
                coursesView: !this.state.coursesView
            })
        }
    }
    toggleAddCourses = () => {
        if (this.state.coursesView !== true) {
            this.setState({
                coursesView: !this.state.coursesView
            })
        }
    }
    renderDisplayCourses = () => {
        return (
            <table className='coursesTable'>
                <thead className='tableHead'>
                    <tr>
                        <th>Przedmiot</th>
                        <th>Typ Zajęć</th>
                        <th>Dzień i godzina zajęć</th>
                        <th>Od</th>
                        <th>Do</th>
                    </tr>
                </thead>
                <tbody className='tableBody'>
                    {this.state.CoursesTableData}
                </tbody>
            </table>
        )
    }
    renderAddCourses = () => {
        return (
            <AddCourse refreshCourses={this.getCoursesData}/>
        )
    }
    getCoursesData = () => {
        let url = "http://localhost:4141/api/courses?userId=" + this.props.userId
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
                                {dayEnum[course.courseDay]} {course.startTime}-{course.endTime}
                            </td>
                            <td>
                                {course.startDate}
                            </td>
                            <td>
                                {course.endDate}
                            </td>
                        </tr>
                    )
                });
                this.setState({
                    CoursesTableData: rows
                })
            })

    }
    render() {
        return (
            <div className='base-view'>
                <div className='content-view'>
                    <div className='viewSelection'>
                        <div className='viewOption' onClick={this.toggleDisplayCourses}>
                            <span>Twoje przedmioty</span>
                        </div>
                        <div className='viewOption' onClick={this.toggleAddCourses}>
                            <span>Dodaj przedmiot</span>
                        </div>
                    </div>
                    <div className='coursesView'>
                        {this.state.coursesView ?
                            this.renderAddCourses()
                            :
                            this.renderDisplayCourses()
                        }
                    </div>
                </div>
            </div>
        )
    }
};
const mapStateToProps = store => {
    return {
        userId: store.user.userId,
        userAuthorized: store.user.userAuthorized
    }
}
export default connect(
    mapStateToProps
)(Courses)