import React, { Component } from 'react';
import './Courses.css'
import { connect } from 'react-redux'
import AddCourse from './AddCourse'
import Modal from 'react-modal';
import FileList from '../files_displayer/FileList'
import Api from '../../api/Api';

class Courses extends Component {
    state = {
        coursesView: false,
        CoursesTableData: null,
        isDocumentsListModalOpen: false,
        filesList: null,
        selectedCourse: null
    }
    componentDidMount = () => {
        Modal.setAppElement('body');
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
            <AddCourse refreshCourses={this.getCoursesData} />
        )
    }
    showDocumentsListModal = () => {
        console.log(this.state.selectedCourse)
        return (
            <Modal
                className='documentsListModal'
                isOpen={this.state.isDocumentsListModalOpen}
                onRequestClose={this.toggleDocumentsListModalOpen}
                contentLabel="Example Modal"
            >
                <React.Fragment>
                    <div className='courses-files-header'>
                        <p className='course-name-container'>{this.state.selectedCourse.courseName}</p>
                        <p className='course-info-container'>{this.state.selectedCourse.courseName}</p>
                    </div>
                    <div className='files-list-container'>

                    </div>
                    <FileList files={this.state.filesList} refresh={this.fetchCoursesFiles} />
                </React.Fragment>
            </Modal>
        )
    }
    toggleDocumentsListModalOpen = () => {
        this.setState({
            isDocumentsListModalOpen: !this.state.isDocumentsListModalOpen
        })
    }
    fetchCoursesFiles = () => {
        const loadData = new Promise((resolve, reject) => {
            Api.fetchCoursesFiles(this.state.selectedCourse.courseId)
            .then(res => {
                this.setState({
                    filesList: res.data
                })
                resolve();
            })      
        });
        return loadData;
    }
    showCoursesFiles = (course) => {
        this.setState({
            selectedCourse:course
        },()=>{
            this.fetchCoursesFiles()
            .then(()=>{
                this.toggleDocumentsListModalOpen();
            })
        })
    }
    getCoursesData = () => {
        Api.getUsersCourses(this.props.userId)
            .then(res => {
                let rows = []
                let dayEnum = ["Nd", "Pon", "Wt", "Sr", "Czw", "Pt", "Sob"]
                res.data.forEach((course,index) => {
                    rows.push(
                        <tr onClick={this.showCoursesFiles.bind(this, course)} key={index}>
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
                {this.state.isDocumentsListModalOpen ? this.showDocumentsListModal() : null}
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