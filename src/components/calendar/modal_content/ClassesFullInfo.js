import React, { Component } from 'react';
import './ClassesFullInfo.css';
import FileList from '../../files_displayer/FileList';
import Api from '../../../api/Api';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from "react-redux";

import DownArrow from '../../../icon/down-arrow.png';

class ClassesFullInfo extends Component {
    state = {
        classEntity: null,
        toggleAction: true,
        selectedFiles: []
    }
    componentWillMount() {
        this.setState({
            classEntity: this.props.classEntity
        })
    }
    getThisClassesFiles = () => {
        let newClassesArray = this.props.classEntity
        Api.getClassesFiles(this.props.userId,this.state.classEntity.classesId)
            .then((response) => {
                newClassesArray.files = response.data
                this.setState({
                    classEntity: newClassesArray
                })
            })
    }
    toggleAction = (bool) => {
        this.setState({
            toggleAction: bool
        })
    }
    fileSelectedHandler = (event) => {
        this.setState({
            selectedFiles: event.target.files
        })
    }
    fileUploadHandler = () => {
        let files = [...this.state.selectedFiles]
        let promises = [];
        files.forEach((file)=>{
            promises.push(Api.addFileToClass(this.props.userId,this.state.classEntity.classesId, file))                
        });
        Promise.all(promises)
            .then(res => {
                if(files.length===1){
                    toast.success("Przesłano "+files.length+" plik");
                }else if(files.length>1&&files.length<5){
                    toast.success("Przesłano "+files.length+" pliki");
                }else if(files.length>4){
                    toast.success("Przesłano "+files.length+" plików");
                }
                this.getThisClassesFiles();
                this.setState({
                    selectedFiles: []
                })
            })
    }
    renderListOfElements = () => {
        let listOfElements = [];
        let files = [...this.state.selectedFiles]
        files.forEach((e,index) => {
            listOfElements.push(<li key={index}>{e.name}</li>);
        })
        return listOfElements;
    }
    render() {
        let startHour = new Date(this.state.classEntity.classesFullStartDate)
        let endHour = new Date(this.state.classEntity.classesFullEndDate)
        return (
            <React.Fragment>
                <div className="classes-full-info">
                    <div className="back-button" onClick={this.props.setClassesSelected.bind(this, null)}>
                        <img src={DownArrow} alt={"DownArrow"}></img>
                    </div>
                    <div className="classes-title-info">
                        <div id="classes-name">
                            {this.state.classEntity.classesName}
                        </div>
                        <div id="classes-type">
                            {this.state.classEntity.classesType}
                        </div>
                        <div id="classes-hours">
                            {startHour.getHours() + ":" + (startHour.getMinutes() < 10 ? '0' : '') + startHour.getMinutes() + " - "}
                            {endHour.getHours() + ":" + (endHour.getMinutes() < 10 ? '0' : '') + endHour.getMinutes()}
                        </div>
                    </div>
                </div>
                <div className='materials-action-select'>
                    <div className={this.state.toggleAction ? 'show-materials show-materials--active' : 'show-materials'} onClick={this.toggleAction.bind(this, true)}>
                        Pokaż materiały
                    </div>
                    <div className={!this.state.toggleAction ? 'add-materials add-materials--active' : 'add-materials'} onClick={this.toggleAction.bind(this, false)}>
                        Dodaj materialy
                    </div>
                </div>
                {this.state.toggleAction ?
                    <div className='materials'>
                        <FileList files={this.state.classEntity.files} refresh={this.getThisClassesFiles}/>
                    </div>
                    :
                    <div className='add-file-container'>
                        <div className='file-upload-container'>
                            <div className='file-upload-select'>
                                <input multiple id="file-input" type="file" accept=".jpg, .jpeg, .pdf, .doc, .txt " onChange={this.fileSelectedHandler} />
                            </div>
                            <div className='file-upload-list'>
                                <ul>
                                    {this.renderListOfElements()}
                                </ul>
                            </div>
                        </div>
                        <div className='submit-files-container'>
                            <button className='submit-files-button' onClick={this.fileUploadHandler}>Dodaj materiały</button>
                        </div>
                        <ToastContainer />
                    </div>
                }
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