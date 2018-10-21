
import React, { Component } from 'react';
import './DisplayFiles.css';
import axios from 'axios';

class DisplayFiles extends Component {
    state = {
        documentsVisibility: false,
        photosVisibility: false,
        notesVisibility: false,
        showFile: null
    }
    componentDidMount = () => {     
        let selectedFile = this.props.classEntity.files.find((element)=>{
            return element.fileId===this.props.fileSelected
        });
        this.showFile(selectedFile);
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
    showFile = (file) => {
        console.log("show file:",file)
        let url = 'http://localhost:4141/api/files?fileId=' + file.fileId;
        axios.get(url)
            .then((response) => {
                this.setState({
                    showFile: response.data
                })
            })
    }
    renderFileInfo = (file) => {
        return (
            <div className='fileInfo' onClick={this.showFile.bind(this, file)}>
                <span>{file.fileName}</span>
            </div>
        )
    }
    displayFile = () => {
        if (this.state.showFile.fileFormat.indexOf("image") === 0) {
            return this.displayImage()
        } else if (this.state.showFile.fileFormat.indexOf("text") === 0) {
            return this.displayNote()
        } else if (this.state.showFile.fileFormat.indexOf("application/pdf") === 0) {
            return this.displayPdf()
        } else if (this.state.showFile.fileFormat.indexOf("application/msword") === 0) {
            return this.displayDoc()
        }
    }
    displayImage = () => {
        return (
            <img id="mapLoaded" src={"data:image/jpg+jpeg;base64," + this.state.showFile.fileBytes} alt="file" />
        )
    }
    displayNote = () => {
        return (
            <span>
                {atob(this.state.showFile.fileBytes)}
            </span>
        )
    }
    displayPdf = () => {
        return (
            <iframe src={"data:application/pdf;base64,"+this.state.showFile.fileBytes} title="pdf-file"></iframe>
        )
    }
    displayDoc = () => {
        return (
            <iframe src={"data:"+atob(this.state.showFile.fileBytes)} title="doc-file"></iframe>
        )
    }
    renderSidebar = () => {
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
            <React.Fragment>
                {imgsToggle.application.length !== 0 ?
                    <div>
                        <div className='materials-list-header' onClick={this.toggleDocumentsVisibility}>
                            <span>documents</span>
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
                            <span>photos</span>
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
                            <span>notes</span>
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
            </React.Fragment>)
    }
    render() {
        return (
            <div className='ModalContent'>
                <div className='sideBar'>
                    {this.renderSidebar()}
                </div>
                <div className='fileContent'>
                    {this.state.showFile !== null ?
                        this.displayFile()
                        : null
                    }
                </div>
            </div>
        );
    }
};
export default DisplayFiles;