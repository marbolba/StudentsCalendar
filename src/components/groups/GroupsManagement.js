import React, { Component } from 'react';
import { connect } from 'react-redux'
import './GroupsManagement.css'
import 'react-toastify/dist/ReactToastify.css';
import Api from '../../api/Api';

import CreateGroup from './CreateGroup';
import SearchGroup from './SearchGroup';


class GroupsManagement extends Component {
    state = {
        groupView: true,
        groupList: [],

        addGroupPopup: false,
        searchGroupPopup: false,
    }
    componentDidMount = () => {
        this.updateGroupList()
    }
    toggleView = (bool) => {
        this.setState({
            groupView: bool
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
    updateGroupList = () => {
        Api.getUsersGroups(this.props.userId)
            .then((response) => {
                this.setState({
                    groupList: response.data
                })
            })
    }
    renderGroupList = () => {
        if (this.state.groupList.length !== 0) {
            return (
                <div className='coursesView'>
                    <table className='coursesTable'>
                        <thead className='tableHead'>
                            <tr>
                                <th>Grupa</th>
                                <th>Opis</th>
                            </tr>
                        </thead>
                        <tbody className='tableBody'>
                            {this.state.groupList.map((group, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {group.groupName}
                                        </td>
                                        <td>
                                            {group.groupDescription}
                                        </td>
                                    </tr>);
                            })}
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className='base-view'>
                <div className='content-view'>
                    <div className='viewSelection'>
                        <div className='viewOption' onClick={this.toggleView.bind(this, true)}>
                            <span>Twoje grupy</span>
                        </div>
                        <div className='viewOption' onClick={this.toggleView.bind(this, false)}>
                            <span>Zarządzaj grupami</span>
                        </div>
                    </div>
                    {this.state.groupView ?
                        <React.Fragment>
                            {this.renderGroupList()}
                        </React.Fragment>
                        :
                        <div className='groupManagementView'>
                            <div className='viewSelection'>
                                <div className='viewOption' onClick={this.toggleSearchGroupPopup}>
                                    <span>Wyszukaj grupę</span>
                                </div>
                                <div className='viewOption' onClick={this.toggleAddGroupPopup}>
                                    <span>Utwórz grupe</span>
                                </div>
                            </div>
                            {this.state.addGroupPopup ? <CreateGroup /> : null}
                            {this.state.searchGroupPopup ? <SearchGroup /> : null}
                        </div>
                    }
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
)(GroupsManagement)