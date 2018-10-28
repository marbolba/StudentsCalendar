import React, { Component } from 'react';
import './ClassesFullInfo.css';
import axios from 'axios';
import { connect } from "react-redux";
import Modal from 'react-modal';
import DisplayFiles from '../../files_displayer/DisplayFiles';
import Api from '../../../api/Api'

import DownArrow from '../../../icon/down-arrow.png'
import SettingsIcon from '../../../icon/padlock.png'
import DownloadIcon from '../../../icon/down-arrow.png'
import DeleteIcon from '../../../icon/exit.png'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ClassesFullInfo extends Component {
    state = {
        classEntity: null,
        selectedFile: null,
        documentsVisibility: false,
        notesVisibility: false,
        photosVisibility: false,
        isModalOpen: false,
        shareToGroupVisibility: null,
        usersGroups: []
    }
    componentWillMount() {
        Modal.setAppElement('body');
        this.getUsersGroups();
        this.setState({
            classEntity:this.props.classEntity
        })
    }
    fileSelectedHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }
    fileUploadHandler = () => {
        let url = 'http://localhost:4141/api/files?fileOwnerId=' + this.props.userId + '&classesId=' + this.state.classEntity.classes_id
        const fd = new FormData();
        fd.append('file', this.state.selectedFile);
        axios.post(url, fd)
            .then(res => {
                toast.success("Przesłano plik pomyślnie");
                this.getThisClassesFiles()
            })
    }
    deleteFile = (file) => {
        let url = 'http://localhost:4141/api/files?fileId=' + file.fileId
        axios.delete(url)
            .then((response) => {
                toast.success("Usunięto plik pomyślnie");
                this.getThisClassesFiles()
            })
    }
    getUsersGroups = () => {
        Api.getUsersGroups(this.props.userId)
            .then((response)=>{
                this.setState({
                    usersGroups: response.data
                })
            })
    }
    shareFileToGroup = (fileId,groupId) => { 
        Api.shareFileToGroup(fileId,groupId)
            .then(()=>{
                toast.success("Udostępniono plik");
            })
    }
    getThisClassesFiles = () => {
        let newClassesArray = this.state.classEntity
        let url = 'http://localhost:4141/api/files?fileOwnerId=' + this.props.userId + '&classesId=' + this.state.classEntity.classes_id
        axios.get(url)
            .then((response) => {
                newClassesArray.files = response.data
                this.setState({
                    classEntity: newClassesArray
                })
            })
    }
    toggleShareToGroupVisibility = (fileId) => {
        if(fileId!==this.state.shareToGroupVisibility){
            this.setState({
                shareToGroupVisibility: fileId
            })
        }else{
            this.setState({
                shareToGroupVisibility: null
            })
        }
        
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
            >
                <DisplayFiles files={this.state.classEntity.files} fileSelected={this.fileSelected} />
            </Modal>
        )
    }
    renderFileInfo = (file) => {
        return (
            <div className='fileInfo' key={file.fileId}>
                <div onClick={this.state.isModalOpen ? null : () => {
                    this.fileSelected = file.fileId;
                    this.toggleModalOpen();
                }}>
                    {this.state.isModalOpen ? this.showDocument() : null}
                    <img src={DownArrow} alt={"DownArrow"} ></img>
                    <span>{file.fileName}</span>
                </div>
                <div className='options'>
                    <img src={SettingsIcon} alt={"SettingsIcon"} onClick={this.toggleShareToGroupVisibility.bind(this,file.fileId)}></img>
                    <img src={DownloadIcon} alt={"DownloadIcon"}></img>
                    <img src={DeleteIcon} alt={"DeleteIcon"} onClick={this.deleteFile.bind(this, file)}></img>
                    <div className='groups-dropdown' style={this.state.shareToGroupVisibility!==null && this.state.shareToGroupVisibility===file.fileId ? {visibility:"visible"}:{visibility:"hidden"}}>
                        <span>Udostępnij do grupy</span>
                        <hr />
                        {this.state.usersGroups.map(group => {
                            return ( <span onClick={this.shareFileToGroup.bind(this,file.fileId,group.group_id)} key={group.group_id}>{group.groupName}</span> )
                        })}
                    </div>
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

        this.state.classEntity.files.forEach(file => {
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
                <button onClick={this.props.setClassesSelected.bind(this, null)}>Wróć</button>
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
                        <div className='materials-list-header' onClick={this.togglePhotosVisibility}>
                            <img src={DownArrow} alt={"DownArrow"} style={this.state.photosVisibility ? { transform: "rotate(180deg)" } : { transform: "rotate(0deg)" }}></img>
                            <span>photos </span>
                        </div>
                        {this.state.photosVisibility ?
                            <div className='materials-dropdown' style={this.state.photosVisibility ? { visibility: "visible", height: "auto" } : { visibility: "hidden", height: "0px" }}>
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
                        <div className='materials-list-header' onClick={this.toggleNotesVisibility}>
                            <img src={DownArrow} alt={"DownArrow"} style={this.state.notesVisibility ? { transform: "rotate(180deg)" } : { transform: "rotate(0deg)" }}></img>
                            <span>notes </span>
                        </div>
                        {this.state.notesVisibility ?
                            <div className='materials-dropdown' style={this.state.notesVisibility ? { visibility: "visible", height: "auto" } : { visibility: "hidden", height: "0px" }}>
                                {imgsToggle.text.map(file => {
                                    return (this.renderFileInfo(file))
                                })}
                            </div>
                            : null}
                    </div>
                    :
                    null}
                <ToastContainer />
            </div>
        )
    }

    render() {
        let startHour = new Date(this.state.classEntity.classesFullStartDate)
        let endHour = new Date(this.state.classEntity.classesFullEndDate)
        return (
            <React.Fragment>
                <div className="classes-full-info">
                    <div id="classes-hours">
                        {startHour.getHours() + ":" + (startHour.getMinutes() < 10 ? '0' : '') + startHour.getMinutes()}
                        <br />
                        {endHour.getHours() + ":" + (endHour.getMinutes() < 10 ? '0' : '') + endHour.getMinutes()}
                    </div>
                    <div id="classes-type">
                        {this.state.classEntity.classesType}
                    </div>
                    <div id="classes-name">
                        {this.state.classEntity.classesName}
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