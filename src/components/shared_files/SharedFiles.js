import React, { Component } from 'react';
import Api from '../../api/Api';
import { connect } from 'react-redux';
import './SharedFiles.css';
import Modal from 'react-modal';
import FileList from '../files_displayer/FileList';
import Exit from '../../icon/exit.png';

class SharedFiles extends Component {
    state = {
        isFetched: false,
        filesView: false,
        groupList: [],
        myFilesGroupList: [],
        isModalOpen: false,
        showGoupsFilesModal: false,
        selectedGroup: null
    }
    componentDidMount = () => {
        Modal.setAppElement('body');
        this.getUsersGroups();
    }
    getUsersGroups = () => {
        Api.getUsersGroups(this.props.userId)
            .then((response) => {
                let groupList = response.data;
                groupList.forEach(group => {
                    group.files = []
                    Api.getGroupsFilesList(group.groupId)
                        .then((res) => {
                            group.files = res.data;
                            this.setState({
                                groupList: groupList
                            })
                        })
                        .then(()=>{
                            if(this.state.selectedGroup!=null){
                                let newSelectedGroup = this.state.groupList.map(a => Object.assign({}, a));
                                let filtered = newSelectedGroup.filter(group=>{
                                    return group.groupId === this.state.selectedGroup.groupId;
                                })
                                let mySharedFiles = filtered[0].files.filter((file)=>{
                                    return file.fileOwner === this.props.userId;
                                })
                                filtered[0].files = mySharedFiles;
                                this.setState({
                                    selectedGroup : filtered[0]
                                })       
                            }
                        })
                })
            })
    }
    toggleModalOpen = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    toggleFilesView = (bool) => {
        this.setState({
            filesView: bool
        })
    }
    renderMyFilesView = () => {
        return (
            <div className='coursesView'>
                <table className='coursesTable'>
                    <thead className='tableHead'>
                        <tr>
                            <th>Grupa</th>
                            <th>Opis</th>
                            <th style={{ width: '200px' }}>Udostępnione pliki</th>
                        </tr>
                    </thead>
                    <tbody className='tableBody'>
                        {this.renderGroupMyFilesTableBody()}
                    </tbody>
                </table>
            </div>
        )
    }
    renderGroupMyFilesTableBody = () => {
        let rows = []
        let myGroupList = this.state.groupList.map(a => Object.assign({}, a));
        myGroupList.forEach((group, index) => {
            let mySharedFiles = group.files.filter((file)=>{
                return file.fileOwner === this.props.userId;
            })
            group.files = mySharedFiles;
            rows.push(
                <tr onClick={this.showGroupsFiles.bind(this, group)} key={index}>
                    <td>
                        {group.groupName}
                    </td>
                    <td>
                        {group.groupDescription}
                    </td>
                    <td>
                        {group.files.length}
                    </td>
                </tr>
            )
        })
        return rows;
    }
    showFilesListModal = () => {
        return (
            <Modal
                className='documentsListModal'
                isOpen={this.state.showGoupsFilesModal}
                onRequestClose={this.toggleShowGoupsFilesModal.bind(this,false)}
                contentLabel="Example Modal"
            >
                <React.Fragment>
                    <div className="modal-top-bar">
                        <div className="modal-top-bar-info">
                            <span>{this.state.filesView ? 'Udostępniane pliki do grupy' :  'Pliki udostępnione przez grupę'}</span>
                            <img src={Exit} onClick={this.toggleShowGoupsFilesModal.bind(this,false)} alt="exit-button" />
                        </div>
                        <hr />
                    </div>
                    <div className='courses-files-header'>
                        <p className='course-name-container'>{this.state.selectedGroup.groupName}</p>
                        <p className='course-info-container'>{this.state.selectedGroup.groupDescription}</p>
                    </div>
                    <div className='files-list-container'>
                        <FileList files={this.state.selectedGroup.files} refresh={this.getUsersGroups} mode={this.state.filesView ? 'normal' : 'non-edit'}/>
                    </div>
                </React.Fragment>
            </Modal>
        )
    }
    toggleShowGoupsFilesModal = (bool) => {
        if(bool){
            this.setState({
                showGoupsFilesModal: bool
            })
        }else{
            this.setState({
                showGoupsFilesModal: bool,
                selectedGroup: null
            })
        }
        
    }
    showGroupsFiles = (group) => {
        this.setState({
            selectedGroup: group
        }, this.toggleShowGoupsFilesModal(true))
    }
    renderGroupTableBody = () => {
        let rows = []
        this.state.groupList.forEach((group, index) => {
            rows.push(
                <tr onClick={this.showGroupsFiles.bind(this, group)} key={index}>
                    <td>
                        {group.groupName}
                    </td>
                    <td>
                        {group.groupDescription}
                    </td>
                    <td>
                        {group.files.length}
                    </td>
                </tr>
            )
        })
        return rows;
    }
    renderGroupsView = () => {
        return (
            <div className='coursesView'>
                <table className='coursesTable'>
                    <thead className='tableHead'>
                        <tr>
                            <th>Grupa</th>
                            <th>Opis</th>
                            <th style={{ width: '200px' }}>Współdzielone pliki</th>
                        </tr>
                    </thead>
                    <tbody className='tableBody'>
                        {this.renderGroupTableBody()}
                    </tbody>
                </table>
            </div>
        )
    }
    render() {
        return (
            <div className='base-view'>
                <div className='content-view'>
                    <div className='viewSelection'>
                        <div className='viewOption' onClick={this.toggleFilesView.bind(this, false)}>
                            <span>Udostępnione materiały z twoich grup</span>
                        </div>
                        <div className='viewOption' onClick={this.toggleFilesView.bind(this, true)}>
                            <span>Udostępnione przez Ciebie materiały</span>
                        </div>
                    </div>
                    <div /*className='filesView'*/>
                        {this.state.filesView ?
                            this.renderMyFilesView()
                            :
                            this.renderGroupsView()
                        }
                    </div>
                </div>
                {this.state.showGoupsFilesModal ? this.showFilesListModal() : null}
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