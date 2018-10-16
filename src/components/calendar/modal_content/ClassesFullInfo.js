import React, { Component } from 'react';
import './ClassesFullInfo.css';
import axios from 'axios';
import { connect } from "react-redux";
import DropdownArrow from '../../../icon/expand_button.png'


class ClassesFullInfo extends Component {
    state = {
        selectedFile: null,
        documentsVisibility: false,
        notesVisibility: false,
        photosVisibility: false
    }
    fileSelectedHandler = (event) => {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0]
        })
    }
    fileUploadHandler = () => {
        let url = 'http://localhost:4141/api/files?fileOwnerId=' + this.props.userId + '&classesId=' + this.props.classEntity.classes_id
        const fd = new FormData();
        fd.append('file', this.state.selectedFile);
        axios.post(url, fd)
            .then(res => {
                console.log(res)
            })
    }
    getThisClassesFiles = () => {
        let url = 'http://localhost:4141/api/files?classesId=' + this.props.classEntity.classes_id
        axios.get(url)
            .then(res => {
                console.log(res)
            })
    }
    toggleDocumentsVisibility = () => {
        this.setState({
            documentsVisibility: !this.state.documentsVisibility
        })
    }
    togglePhotosVisibility = () => {
        this.setState({
            photosVisibility: !this.state.photosVisibility
        })
    }
    toggleNotesVisibility = () => {
        this.setState({
            notesVisibility: !this.state.notesVisibility
        })
    }
    renderMaterialList = () => {
        let imgsToggle = {
            application: [],
            image: [],
            text: []
        }

        this.props.classEntity.files.forEach(file => {
            if (file.fileFormat.indexOf("application") === 0) {
                imgsToggle.application.push(file);
            } else if (file.fileFormat.indexOf("image") === 0) {
                imgsToggle.image.push(file);
            } else if (file.fileFormat.indexOf("text") === 0) {
                imgsToggle.text.push(file);
            }
        })
        return (
            <div>
                {imgsToggle.application.length !== 0 ?
                    <div className='materials-list-header' onClick={this.toggleDocumentsVisibility}>
                        <span>documents </span>
                        <img src={DropdownArrow} alt={"DropdownArrow"} style={this.state.documentsVisibility ? { transform: "rotate(180deg)" } : { transform: "rotate(0deg)" }}></img>
                        <div className='materials-dropdown' style={this.state.documentsVisibility ? { visibility: "visible", height: "auto" } : { visibility: "hidden", height: "0px" }}>
                            {imgsToggle.application.map(file => {
                                return (<span>{file.fileId}</span>)
                            })}
                        </div>
                    </div>
                    :
                    null}
                {imgsToggle.image.length !== 0 ?
                    <div className='materials-list-header' onClick={this.toggleNotesVisibility}>
                        <span>notes </span>
                        <img src={DropdownArrow} alt={"DropdownArrow"} style={this.state.notesVisibility ? { transform: "rotate(180deg)" } : { transform: "rotate(0deg)" }}></img>
                        <div className='materials-dropdown' style={this.state.notesVisibility ? { visibility: "visible", height: "auto" } : { visibility: "hidden", height: "0px" }}>
                            {imgsToggle.image.map(file => {
                                return (<span>{file.fileId}</span>)
                            })}
                        </div>
                    </div>
                    :
                    null}
                {imgsToggle.text.length !== 0 ?
                    <div className='materials-list-header' onClick={this.togglePhotosVisibility}>
                        <span>photos </span>
                        <img src={DropdownArrow} alt={"DropdownArrow"} style={this.state.photosVisibility ? { transform: "rotate(180deg)" } : { transform: "rotate(0deg)" }}></img>
                        <div className='materials-dropdown' style={this.state.photosVisibility ? { visibility: "visible", height: "auto" } : { visibility: "hidden", height: "0px" }}>
                            {imgsToggle.text.map(file => {
                                return (<span>{file.fileId}</span>)
                            })}
                        </div>
                    </div>
                    :
                    null}
            </div>
        )
    }

    render() {
        let startHour = new Date(this.props.classEntity.classesFullStartDate)
        let endHour = new Date(this.props.classEntity.classesFullEndDate)
        return (
            <React.Fragment>
                <div className="classes-list-info">
                    <div id="classes-hours">
                        {startHour.getHours() + ":" + (startHour.getMinutes() < 10 ? '0' : '') + startHour.getMinutes()}
                        <br />
                        {endHour.getHours() + ":" + (endHour.getMinutes() < 10 ? '0' : '') + endHour.getMinutes()}
                    </div>
                    <div id="classes-type">
                        {this.props.classEntity.classesType}
                    </div>
                    <div id="classes-name">
                        {this.props.classEntity.classesName}
                    </div>
                </div>
                <div className='materials'>
                    <div className='materials-header'>
                        <span>Materiały z zajęć</span>
                    </div>
                    <div className='uploadFiles'>
                        <input id="file-input" type="file" accept=".jpg, .jpeg, .pdf, .doc, .txt " onChange={this.fileSelectedHandler} />
                        <button id='addMaterials' onClick={this.fileUploadHandler}>Dodaj materiały</button>
                    </div>
                    {this.renderMaterialList()}
                </div>
            </React.Fragment >
        );
    };
}
const mapStateToProps = store => {
    return {
        userId: store.user.userId
    }
}
export default connect(
    mapStateToProps
)(ClassesFullInfo)