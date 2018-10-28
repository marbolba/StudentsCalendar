import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import './GroupsManagement.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Api from '../../api/Api';


class GroupsManagement extends Component {
    state = {
        addGroupPopup: false,
        searchGroupPopup: false,
        showGroupList: true,

        newGroupName: '',
        newGroupDescr: '',
        searchedGroupName: null,
        groupList: []
    }
    componentDidMount = () => {
        this.updateGroupList()
    }
    updateGroupList = () => {
        Api.getUsersGroups(this.props.userId)
            .then((response)=>{
                this.setState({
                    groupList: response.data
                })
            })
    }
    toggleGroupList = () => {
        this.setState({
            showGroupList: !this.state.showGroupList
        })
    }
    toggleAddGroupPopup = () => {
        if (this.state.searchGroupPopup) {
            this.setState({
                searchGroupPopup: false,
                addGroupPopup: true
            })
        } else {
            this.setState({
                addGroupPopup: !this.state.addGroupPopup
            })
        }
    }
    toggleSearchGroupPopup = () => {
        if (this.state.addGroupPopup) {
            this.setState({
                addGroupPopup: false,
                searchGroupPopup: true
            })
        } else {
            this.setState({
                searchGroupPopup: !this.state.searchGroupPopup
            })
        }
    }
    handleAddGroup = () => {
        if (this.state.newGroupName !== null && this.state.newGroupName !== '') {
            let url = 'http://localhost:4141/api/groups'
            let data = {
                "group_name": this.state.newGroupName,
                "group_description": this.state.newGroupDescr,
                "group_owner": this.props.userId,
                "users": this.props.userId
            }
            axios.post(url, data)
                .then(() => {
                    this.updateGroupList();
                    toast.success('Dodano grupę pomyślnie');
                })
        } else {
            toast.error('Proszę podać nazwę grupy')
        }
    }
    handleAddUserToGroup = () => {
        if (this.state.searchedGroupName !== null && this.state.searchedGroupName !== '') {
            let url = 'http://localhost:4141/api/groups/user?groupName=' + this.state.searchedGroupName
            let data = {
                "user_id": this.props.userId
            }
            axios.post(url, data)
                .then((response) => {
                    this.updateGroupList();
                    toast.success('Dodano do grupy pomyślnie')
                })
        } else {
            toast.error('Proszę podać nazwę grupy')
        }
    }
    renderAddGroupPopup = () => {
        return (
            <div className='groupPopup'>
                <div>
                    <span>Nazwa nowej grupy</span>
                    <input type='text' value={this.state.newGroupName} onChange={(e) => this.setState({ newGroupName: e.target.value })}></input>
                </div>
                <div>
                    <span>Opis nowej grupy (opcjonalnie)</span>
                    <textarea value={this.state.newGroupDescr} onChange={(e) => this.setState({ newGroupDescr: e.target.value })}></textarea>
                </div>
                <div>
                    <button onClick={this.handleAddGroup}>Dodaj grupe</button>
                </div>
            </div>
        )
    }
    renderSearchGroupPopup = () => {
        return (
            <div className='groupPopup'>
                <div>
                    <span>Wyszukaj grupe</span>
                    <input type='text' value={this.state.searchedGroupName} onChange={(e) => this.setState({ searchedGroupName: e.target.value })}></input>          
                </div>
                <div>
                    <button onClick={this.handleAddUserToGroup}>Dołącz do grupy</button>
                </div>
            </div>
        )
    }
    renderGroupList = () => {
        if(this.state.groupList.length!==0){
            return (
                <div className='groupsList'>
                    {this.state.groupList.map(group=>{
                        return this.renderGroupListItem(group)
                    })}
                </div>
            )
        }else{
            return null;
        }   
    }
    renderGroupListItem = (group) => {
        return (
            <div className='groupListItem' >
                <span>{group.groupName}</span>
            </div>
        )
    }

    render() {
        return (
            <div className='base-view'>
                <div className='content-view'>
                    <div className='viewSelection'>
                        <div className='viewOption' onClick={this.toggleSearchGroupPopup}>
                            <span>Wyszukaj grupę</span>
                        </div>
                        <div className='viewOption' onClick={this.toggleAddGroupPopup}>
                            <span>Utwórz grupe</span>
                        </div>
                    </div>
                    {this.state.addGroupPopup ? this.renderAddGroupPopup() : null}
                    {this.state.searchGroupPopup ? this.renderSearchGroupPopup() : null}
                    <div className='myGroups'>
                        <div className='titleBar' onClick={this.toggleGroupList}>
                            <span>Twoje grupy</span>
                        </div>
                        {this.state.showGroupList && this.state.groupList.length!==0 ? this.renderGroupList() : null}
                    </div>
                </div>
                <ToastContainer />
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
)(GroupsManagement)