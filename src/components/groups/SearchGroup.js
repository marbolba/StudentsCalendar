import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import Api from '../../api/Api';


class SearchGroup extends Component {
    state = {
        searchedGroup: {},
        searchedGroupName: '',
        groupList: [],
        groupsListDropdown: []
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

    render() {
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
)(SearchGroup)