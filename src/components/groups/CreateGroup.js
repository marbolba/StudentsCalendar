import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import Api from '../../api/Api';


class CreateGroup extends Component {
    state = {
        newGroupName: '',
        newGroupDescr: ''
    }
    handleAddGroup = () => {
        if (this.state.newGroupName !== null && this.state.newGroupName !== '') {
            let data = {
                "groupName": this.state.newGroupName,
                "groupDescription": this.state.newGroupDescr,
                "groupOwner": this.props.userId,
                "users": this.props.userId
            }
            Api.createGroup(data)
                .then(() => {
                    this.clearForm();
                    toast.success('Dodano grupę pomyślnie');
                })
        } else {
            toast.error('Proszę podać nazwę grupy')
        }
    }
    clearForm = () => {
        this.setState({
            newGroupName: '',
            newGroupDescr: ''
        })
    }

    render() {
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
)(CreateGroup)