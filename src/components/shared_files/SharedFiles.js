import React, { Component } from 'react';
import Api from '../../api/Api';
import { connect } from 'react-redux';
import './SharedFiles.css';
import DisplayFiles from '../files_displayer/DisplayFiles';
import Modal from 'react-modal';

import DownArrow from '../../icon/down-arrow.png'


class SharedFiles extends Component {
    state = {
        filesView: false,
        groupList: [],
        isModalOpen: false,
        groupToggleList: []
    }
    componentDidMount = () => {
        this.getUsersGroups()
    }
    getUsersGroups = () => {
        let groupToggleTempList = []
        Api.getUsersGroups(this.props.userId)
            .then((response) => {
                let groupList = response.data;
                groupList.forEach(group => {
                    groupToggleTempList[group.group_id]=false;
                    this.getGroupsFilesList(group.group_id)
                        .then((response) => {
                            group.files = response.data;
                        })
                })
                this.setState({
                    groupList: groupList,
                    groupToggleList: groupToggleTempList
                })
            })
    }
    getGroupsFilesList = (groupId) => {
        return Api.getGroupsFilesList(groupId)
    }
    toggleGroupList = (groupId) => {
        let groupToggleTempList = this.state.groupToggleList;
        groupToggleTempList[groupId] = !groupToggleTempList[groupId];
        this.setState({
            groupToggleList : groupToggleTempList
        })
    }
    toggleModalOpen = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    toggleGroupFiles = () => {
        if (this.state.filesView !== false) {
            this.setState({
                filesView: !this.state.filesView
            })
        }
    }
    toggleMyFiles = () => {
        if (this.state.filesView !== true) {
            this.setState({
                filesView: !this.state.filesView
            })
        }
    }
    renderMyFilesView = () => {
        return (
            <div className='myFilesView'>
                my
            </div>
        )
    }
    renderGroupsView = () => {
        return (
            <div className='groupsView'>
                {this.state.groupList.map((group, index) => {
                    return (this.renderGroupsFiles(group, index))
                })}
            </div>
        )
    }
    renderGroupsFiles = (group, index) => {
        return (
            <div className='singleGroup' key={index}>
                <div className='groupHeader' onClick={this.toggleGroupList.bind(this,group.group_id)}>
                    <img src={DownArrow} alt="DownArrow" />
                    <div className='groupNameAndDescr'>
                        <div className='groupName'><span>{group.groupName}</span></div>
                        <div className='groupDescription'><span>{group.group_description}</span></div>
                    </div>
                </div>
                {this.state.groupToggleList[group.group_id] && group.files !== undefined ?
                    <div className='groupsClasses'>
                        {group.files.map((file, index) => {
                            return this.renderFileInfo(file, index, group.files)
                        })}
                    </div>
                    : null}
            </div>
        )
    }
    renderFileInfo = (file, index, groupsFiles) => {
        return (
            <div className='groupsFileInfo' key={index} onClick={this.state.isModalOpen ? null : () => {
                this.groupsFiles = groupsFiles
                this.fileSelected = file.fileId;
                this.toggleModalOpen();
            }}>
                <img src={DownArrow} alt={"DownArrow"} ></img>
                <div className='groupFileName' >
                    <span>{file.fileName}</span>
                </div>
                {this.state.isModalOpen ? this.showDocument() : null}
            </div>
        )
    }
    showDocument = () => {
        console.log(this.groupsFiles, this.fileSelected)
        return (
            <Modal
                className='secondModal'
                isOpen={this.state.isModalOpen}
                onRequestClose={this.toggleModalOpen}
                contentLabel="Example Modal"
            >
                <DisplayFiles files={this.groupsFiles} fileSelected={this.fileSelected} />
            </Modal>
        )
    }
    render() {
        return (
            <div className='base-view'>
                <div className='content-view'>
                    <div className='viewSelection'>
                        <div className='viewOption' onClick={this.toggleGroupFiles}>
                            <span>Udostępnione materiały z twoich grup</span>
                        </div>
                        <div className='viewOption' onClick={this.toggleMyFiles}>
                            <span>Udostępnione przez Ciebie materiały</span>
                        </div>
                    </div>
                    <div className='filesView'> 
                        {this.state.filesView ?
                            this.renderMyFilesView()
                            :
                            this.renderGroupsView() 
                        } 
                    </div>
                </div>
            </div>
        );
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
)(SharedFiles)