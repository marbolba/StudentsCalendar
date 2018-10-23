import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import './GroupsManagement.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class GroupsManagement extends Component {
    state = {
        addGroupPopup: false,
        searchGroupPopup: false,

        newGroupName: '',
        newGroupDescr: '',
        searchedGroupName: null
    }
    componentDidMount = () => {
    }
    toggleAddGroupPopup = () => {
        this.setState({
            addGroupPopup: !this.state.addGroupPopup
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
                addGroupPopup: true
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
                searchGroupPopup: true
            })
        }
    }
    handleAddGroup = () =>{
        if(this.state.newGroupName!==''){
            let url='http://localhost:4141/api/groups'
            let data = {
                "group_name": this.state.newGroupName,
                "group_description": this.state.newGroupDescr,
                "group_owner": this.props.userId,
                "users": this.props.userId
            }
            console.log(data)
            axios.post(url,data)
                .then((response)=>{
                    console.log(response)
                    toast.success('Dodano grupę pomyślnie')
                })
        }else{
            toast.error('Proszę podać nazwę grupy')
        }
    }
    handleAddUserToGroup = () =>{
        if(this.state.searchedGroupName!==null){
            let url='http://localhost:4141/api/groups/user?groupId='+this.state.searchedGroupName
            let data = {
                "user_id": this.props.userId
            }
            console.log(url,data)
            axios.post(url,data)
                .then((response)=>{
                    console.log(response)
                    toast.success('Dodano do grupy pomyślnie')
                })
        }else{
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
                    <input type='number' value={this.state.searchedGroupName} onChange={(e) => this.setState({ searchedGroupName: e.target.value })}></input>
                </div>
                <div>
                    <button onClick={this.handleAddUserToGroup}>Dołącz do grupy</button>
                </div>
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