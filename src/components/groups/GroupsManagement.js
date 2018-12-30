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
        searchedGroup: {},
        searchedGroupName: '',
        groupList: [],
        groupsListDropdown: []
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
                "groupName": this.state.newGroupName,
                "groupDescription": this.state.newGroupDescr,
                "groupOwner": this.props.userId,
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
        if (Object.keys(this.state.searchedGroup).length !== 0) {
            Api.addUserToGroup(this.state.searchedGroup.groupId,this.props.userId)
                .then(() => {
                    this.updateGroupList();
                    toast.success('Dodano do grupy pomyślnie')
                })
                .catch(()=>{
                    toast.error('Użytkownik jest juz w grupie');
                })
                this.setState({
                    searchedGroup: {},
                    searchedGroupName: ''
                })
        } else {
            toast.error('Proszę wyszukać istniejącą grupę');
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
    updateGroupsListDropdown = (text) =>{
        if(text!== ''){
            Api.findGroupsStartingWith(text)
            .then((resp)=>{
                this.setState({
                    searchedGroupName: text,
                    groupsListDropdown: resp.data
                })
            })
        }else{
            this.setState({
                searchedGroupName: '',
                groupsListDropdown: []
            })
        }
    }
    selectGroup = (group) =>{
        this.setState({
            searchedGroupName: group.groupName,
            searchedGroup: group,
            groupsListDropdown: []
        })
    }
    renderSearchGroupPopup = () => {
        return (
            <div className='groupPopup'>
                <div>
                    <span>Wyszukaj grupe</span>
                    <input type='text' value={this.state.searchedGroupName} onChange={e=>this.updateGroupsListDropdown(e.target.value)}></input>   
                    {this.state.groupsListDropdown.length!==0 ? 
                        <div className='groups-list-dropdown'>
                            {this.state.groupsListDropdown.map((group,index)=>{
                                return(
                                <div onClick={this.selectGroup.bind(this,group)} key={index}>
                                    <p className='dropdown-group-name'>{group.groupName}</p>
                                    <p className='dropdown-group-descr'>{group.groupDescription}</p>
                                </div>
                                );
                            })}
                        </div>
                        :null}         
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
                    {this.state.groupList.map((group,index)=>{
                        return this.renderGroupListItem(group,index)
                    })}
                </div>
            )
        }else{
            return null;
        }   
    }
    renderGroupListItem = (group,index) => {
        return (
            <div className='groupListItem' key={index}>
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