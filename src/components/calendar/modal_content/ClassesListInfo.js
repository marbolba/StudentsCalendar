import React, { Component } from 'react';
import { connect } from "react-redux";
import Api from '../../../api/Api';
import './ClassesListInfo.css';

import Documents from '../../../icon/document.png';
import Notes from '../../../icon/notes.png';
import Photos from '../../../icon/photo.png';

class ClassesListInfo extends Component {
    state = {
        classEntity: null
    }

    componentDidMount = () => {
        this.getThisClassesFiles()
    }

    getThisClassesFiles = () => {
        let newClassesArray = this.props.classEntity
        Api.getClassesFiles(this.props.userId,this.props.classEntity.classesId)
            .then((response) => {
                newClassesArray.files = response.data
                this.setState({
                    classEntity: newClassesArray
                })
            })
    }

    static getDerivedStateFromProps(props, state) {
        if (props.classEntity !== state.classEntity) {
            return {
                classEntity: props.classEntity
            };
        }
        return null;
    }

    renderIcons = () => {
        if (this.state.classEntity.files !== undefined){
            let imgsToggle = {
                application : false,
                image : false,
                text : false
            }

            this.state.classEntity.files.forEach(file=>{
                if(file.fileFormat.indexOf("application")===0){
                    imgsToggle.application = true;
                }else if(file.fileFormat.indexOf("image")===0){
                    imgsToggle.image = true;
                }else if(file.fileFormat.indexOf("text")===0){
                    imgsToggle.text = true;
                }
                    
            })
            return (
                <div>
                    {imgsToggle.application?<img id="documents" src={Documents} alt="documents attached" />:null}
                    {imgsToggle.image?<img id="photos" src={Photos} alt="photos attached" />:null}
                    {imgsToggle.text?<img id="notes" src={Notes} alt="notes attached" />:null}
                </div>
            )
        }else{
            return null;
        } 
    }

    render() {
        let startHour = new Date(this.props.classEntity.classesFullStartDate)
        let endHour = new Date(this.props.classEntity.classesFullEndDate)
        return (
            <div className="classes-list-info" onClick={this.props.setClassesSelected.bind(this, this.props.classEntity)} key={this.props.classEntity.classesId}>
                <div id="classes-hours">
                    {startHour.getHours() + ":" + (startHour.getMinutes() < 10 ? '0' : '') + startHour.getMinutes()}
                    <br />
                    {endHour.getHours() + ":" + (endHour.getMinutes() < 10 ? '0' : '') + endHour.getMinutes()}
                </div>
                <div id="classes-name">
                    {this.props.classEntity.classesName}
                </div>
                <div id="classes-type">
                    {this.props.classEntity.classesType}
                </div>
                {this.renderIcons()}
            </div>
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
)(ClassesListInfo)