import React, { Component } from 'react';
import './ClassesFullInfo.css';
import axios from 'axios';
import { connect } from "react-redux";
import DownArrow from '../../../icon/down-arrow.png'
import Modal from 'react-modal';
import DisplayFiles from './files_displayer/DisplayFiles.js';

import SettingsIcon from '../../../icon/padlock.png'
import DownloadIcon from '../../../icon/down-arrow.png'
import DeleteIcon from '../../../icon/exit.png'

class ClassesFullInfo extends Component {
    state = {
        selectedFile: null,
        documentsVisibility: false,
        notesVisibility: false,
        photosVisibility: false,
        isModalOpen: false
    }
    componentWillMount() {
        Modal.setAppElement('body');
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
    toggleModalOpen = () => {
        console.log("toggleModalOpen")
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    showDocument = () => {
        return (
            <Modal
                className='secondModal'
                isOpen={this.state.isModalOpen}
                onRequestClose={this.toggleModalOpen}
                contentLabel="Example Modal"
                onClick={(event)=>console.log("elo",event)}
            >
                <DisplayFiles classEntity={this.props.classEntity}/>
            </Modal>
        )
    }
    renderFileInfo = (file) => {
        return (
            <div className='fileInfo'>
                <div onClick={this.state.isModalOpen?null:this.toggleModalOpen}>
                    {this.state.isModalOpen ? this.showDocument() : null}
                    <img src={DownArrow} alt={"DownArrow"} ></img>
                    <span>{file.fileName}</span>
                </div>
                <div className='options'>
                    <img src={SettingsIcon} alt={"SettingsIcon"}></img>
                    <img src={DownloadIcon} alt={"DownloadIcon"}></img>
                    <img src={DeleteIcon} alt={"DeleteIcon"}></img>
                </div>
            </div >
        );
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
                    <div>
                        <div className='materials-list-header' onClick={this.toggleDocumentsVisibility}>
                            <img src={DownArrow} alt={"DownArrow"} style={this.state.documentsVisibility ? { transform: "rotate(180deg)" } : { transform: "rotate(0deg)" }}></img>
                            <span>documents </span>
                        </div>
                        {this.state.documentsVisibility ?
                            <div className='materials-dropdown' style={this.state.documentsVisibility ? { visibility: "visible", height: "auto" } : { visibility: "hidden", height: "0px" }}>
                                {imgsToggle.application.map(file => {
                                    return (this.renderFileInfo(file))
                                })}
                            </div>
                            : null}
                    </div>
                    :
                    null}
                {imgsToggle.image.length !== 0 ?
                    <div >
                        <div className='materials-list-header' onClick={this.toggleNotesVisibility}>
                            <img src={DownArrow} alt={"DownArrow"} style={this.state.notesVisibility ? { transform: "rotate(180deg)" } : { transform: "rotate(0deg)" }}></img>
                            <span>notes </span>
                        </div>
                        {this.state.notesVisibility ?
                            <div className='materials-dropdown' style={this.state.notesVisibility ? { visibility: "visible", height: "auto" } : { visibility: "hidden", height: "0px" }}>
                                {imgsToggle.image.map(file => {
                                    return (this.renderFileInfo(file))
                                })}
                            </div>
                            : null}
                    </div>
                    :
                    null}
                {imgsToggle.text.length !== 0 ?
                    <div>
                        <div className='materials-list-header' onClick={this.togglePhotosVisibility}>
                            <img src={DownArrow} alt={"DownArrow"} style={this.state.photosVisibility ? { transform: "rotate(180deg)" } : { transform: "rotate(0deg)" }}></img>
                            <span>photos </span>
                        </div>
                        {this.state.photosVisibility ?
                            <div className='materials-dropdown' style={this.state.photosVisibility ? { visibility: "visible", height: "auto" } : { visibility: "hidden", height: "0px" }}>
                                {imgsToggle.text.map(file => {
                                    return (this.renderFileInfo(file))
                                })}
                            </div>
                            : null}
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
                <div className="classes-full-info">
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