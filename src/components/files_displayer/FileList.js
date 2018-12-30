
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FileList.css';
import { connect } from "react-redux";
import Modal from 'react-modal';
import DisplayFiles from './DisplayFiles';
import Api from '../../api/Api'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//TODO SettingsIcon should be ShareIcon
import SettingsIcon from '../../icon/padlock.png'
import DownloadIcon from '../../icon/down-arrow.png'
import DeleteIcon from '../../icon/exit.png'

import ReactTable from "react-table";
import "./react-table.css";

class FileList extends Component {
    state = {
        isModalOpen: false,
        shareToGroupVisibility: null,
        usersGroups: [],
        selected: {},
        selectAll: 0
    }
    static defaultProps = {
        mode: 'normal'
    }
    componentDidMount = () => {
        Modal.setAppElement('body');
        this.getUsersGroups();
        this.setState({
            files: this.props.files
        })
    }
    static getDerivedStateFromProps(props, state) {
        if (props.files !== state.files) {
            return {
                files: props.files
            };
        }
        return null;
    }

    toggleRow(fileId) {
        const newSelected = Object.assign({}, this.state.selected);
        if (newSelected[fileId]) {
            delete newSelected[fileId]
        } else {
            newSelected[fileId] = true
        }
        this.setState({
            selected: newSelected,
            selectAll: 2
        });
    }
    toggleSelectAll() {
        let newSelected = {};

        if (this.state.selectAll === 0) {
            this.state.files.forEach(x => {
                newSelected[x.fileId] = true;
            });
        }

        this.setState({
            selected: newSelected,
            selectAll: this.state.selectAll === 0 ? 1 : 0
        });
    }
    deleteFiles = () => {
        let promises = []
        Object.keys(this.state.selected).forEach((fileId) => {
            promises.push(Api.deleteFile(fileId))
        })
        Promise.all(promises)
            .then((response) => {
                toast.success("Usunięto pliki pomyślnie");
                this.props.refresh();
            })
    }
    getUsersGroups = () => {
        Api.getUsersGroups(this.props.userId)
            .then((response) => {
                this.setState({
                    usersGroups: response.data
                })
            })
    }
    //TODO BACKEND - sprawdzac czy dany plik nie jest juz szerowany
    shareFileToGroup = (fileId, groupId) => {
        Api.shareFileToGroup(fileId, groupId)
            .then(() => {
                toast.success("Udostępniono plik");
            })
    }

    toggleShareToGroupVisibility = (fileId) => {
        if (fileId !== this.state.shareToGroupVisibility) {
            this.setState({
                shareToGroupVisibility: fileId
            })
        } else {
            this.setState({
                shareToGroupVisibility: null
            })
        }

    }
    toggleModalOpen = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    showDocument = () => {
        return (
            <Modal
                className='secondModal'
                isOpen={this.state.isModalOpen}
                onRequestClose={this.toggleModalOpen}
                contentLabel="Example Modal"
            >
                <DisplayFiles files={this.state.files} fileSelected={this.fileSelected} />
            </Modal>
        )
    }
    //TO DELETE funkcjonalnosc ikonek
    /*renderFileInfo = (file) => {
        return (
            <div className='fileInfo' key={file.fileId}>
                <div onClick={this.state.isModalOpen ? null : () => {
                    this.fileSelected = file.fileId;
                    this.toggleModalOpen();
                }}>
                    <img src={DownArrow} alt={"DownArrow"} ></img>
                    <span>{file.fileName}</span>
                </div>
                <div className='options'>
                    <img src={SettingsIcon} alt={"SettingsIcon"} onClick={this.toggleShareToGroupVisibility.bind(this, file.fileId)}></img>
                    <img src={DownloadIcon} alt={"DownloadIcon"}></img>
                    <img src={DeleteIcon} alt={"DeleteIcon"} onClick={this.deleteFile.bind(this, file)}></img>
                    <div className='groups-dropdown' style={this.state.shareToGroupVisibility !== null && this.state.shareToGroupVisibility === file.fileId ? { visibility: "visible" } : { visibility: "hidden" }}>
                        <span>Udostępnij do grupy</span>
                        <hr />
                        {this.state.usersGroups.map(group => {
                            return (<span onClick={this.shareFileToGroup.bind(this, file.fileId, group.groupId)} key={group.groupId}>{group.groupName}</span>)
                        })}
                    </div>
                </div>
            </div >
        );
    }*/
    render() {
        return (
            <div className='fileList'>
                <ReactTable
                    data={this.state.files}
                    columns={[
                        {
                            id: "checkbox",
                            accessor: "",
                            Header: x => {
                                return (
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        checked={this.state.selectAll === 1}
                                        ref={input => {
                                            if (input) {
                                                input.indeterminate = this.state.selectAll === 2;
                                            }
                                        }}
                                        onChange={() => this.toggleSelectAll()}
                                    />
                                );
                            },
                            Cell: ({ original }) => {
                                return (
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        checked={this.state.selected[original.fileId] === true}
                                        onClick={(e) => {
                                            this.toggleRow(original.fileId)
                                            e.stopPropagation();
                                        }}
                                    />
                                );
                            },
                            sortable: false,
                            width: 33,
                            resizable: false
                        },
                        {
                            Header: "Nazwa",
                            accessor: "fileName"
                        },
                        {
                            Header: "Rozmiar",
                            accessor: "fileSize"
                        },
                        {
                            Header: "Data dodania",
                            accessor: "editDate",
                            Cell: v => {
                                let date = new Date(v.original.editDate);
                                return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + " - " + date.getHours() + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
                            }
                        }

                    ]}
                    //ta wysokosc powinna sie rozciagac do max  rozmiaru strony
                    pageSize={this.state.files !== undefined ? this.state.files.length : 5}
                    className="-striped -highlight"
                    previousText={'Poprzednia'}
                    nextText={'Następna'}
                    pageText={'Strona'}
                    ofText={'z'}
                    rowsText={'wyników'}
                    noDataText={'Brak plików'}
                    getTrProps={(state, rowInfo) => ({
                        onClick: () => {
                            if (!this.state.isModalOpen) {
                                this.fileSelected = rowInfo.original.fileId;
                                this.toggleModalOpen();
                            }
                        }
                    })}
                />
                {this.props.mode === "normal" ?
                    <React.Fragment>
                        <div className='actionsMenu'>
                            <p>Akcje dla zaznaczonych plików:</p>
                            <button className='action-button' disabled={Object.keys(this.state.selected).length === 0} style={{ backgroundImage: `url(${DownloadIcon})` }}>
                                Pobierz plik
                            </button>
                            <button className='action-button' disabled={Object.keys(this.state.selected).length === 0} style={{ backgroundImage: `url(${SettingsIcon})` }}>
                                Udostępnij plik
                            </button>
                            <button className='action-button' onClick={this.deleteFiles} disabled={Object.keys(this.state.selected).length === 0} style={{ backgroundImage: `url(${DeleteIcon})` }}>
                                Usuń plik
                            </button>
                        </div>
                        {this.state.isModalOpen ? this.showDocument() : null}
                        <ToastContainer />
                    </React.Fragment>
                    : 
                    <React.Fragment>
                        <div className='actionsMenu'>
                            <p>Akcje dla zaznaczonych plików:</p>
                            <button className='action-button' disabled={Object.keys(this.state.selected).length === 0} style={{ backgroundImage: `url(${DownloadIcon})` }}>
                                Pobierz plik
                            </button>
                        </div>
                        {this.state.isModalOpen ? this.showDocument() : null}
                        <ToastContainer />
                    </React.Fragment>
                }

            </div>
        );
    }
};
FileList.propTypes = {
    files: PropTypes.array.isRequired,
    refresh: PropTypes.func,
    mode: PropTypes.string
};

const mapStateToProps = store => {
    return {
        userId: store.user.userId
    }
}
export default connect(
    mapStateToProps
)(FileList)