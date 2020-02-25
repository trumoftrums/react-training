import React, {Component} from 'react';
import Search from './child-components/Search';
import Sort from './child-components/Sort';
import Form from './child-components/Form';
import Item from './child-components/Item';
import ItemEdit from './child-components/ItemEdit';
import uuidv4 from 'uuid/v4';
import SweetAlert from "sweetalert-react";
import '../../../node_modules/sweetalert/dist/sweetalert.css';
import TodoListModel from './model';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            showAlert: false,
            titleAlert: '',
            idAlert: '',
            indexEdit: 0,
            idEdit: '',
            nameEdit: '',
            levelEdit: 0,
            showFormAdd: false,
            newValueName: '',
            newValueEmail: '',
            searchString: ''
        }
    }

    componentDidMount() {
        this.getListUsers();
    }

    getListUsers() {
        TodoListModel.getUsers().then(
            results => {
                this.setState({
                    items: results.data
                });
            });
    }

    renderItem = () => {
        let {items, idEdit, indexEdit, nameEdit, emailEdit} = this.state;
        if (items.length === 0) {
            return <Item item={0}/>
        }
        return items.map((item, index) => {
            if (item.id === idEdit) {
                return <ItemEdit
                    key={index}
                    indexEdit={indexEdit}
                    nameEdit={nameEdit}
                    emailEdit={emailEdit}
                    handleCancelEditClick={this.handleCancelEditClick}
                    handleEditNameInput={this.handleEditNameInput}
                    handleEditEmail={this.handleEditEmail}
                    handleEditClickSubmit={this.handleEditClickSubmit}
                />
            }
            return (
                <Item
                    index={index + 1}
                    item={item}
                    key={item.id}
                    handleShowAlert={this.handleShowAlert}
                    handleEditItem={this.handleEditItem}
                />
            )
        });
    };
    handleShowAlert = (item) => {
        this.setState({
            showAlert: true,
            titleAlert: item.name,
            idAlert: item.id
        });
    };
    handleDeleteItem = () => {
        let {idAlert} = this.state;
        TodoListModel.deleteUser(idAlert).then(
            results => {
                if (results.data.code === 200) {
                    this.setState({
                        showAlert: false
                    });
                    this.componentDidMount();
                }
            });
    };
    handleEditItem = (index, item) => {
        this.setState({
            indexEdit: index,
            idEdit: item.id,
            nameEdit: item.name,
            emailEdit: item.email
        });
    };

    handleCancelEditClick = () => {
        this.setState({
            idEdit: ''
        })
    };

    handleEditNameInput = (value) => {
        this.setState({
            nameEdit: value
        })
    };
    handleEditEmail = (value) => {
        this.setState({
            emailEdit: value
        })
    };
    handleEditClickSubmit = () => {
        let {idEdit, nameEdit, emailEdit} = this.state;
        TodoListModel.updateUser(idEdit, {
            'name': nameEdit,
            'email': emailEdit
        }).then(
            result => {
                if (result.data.code === 200) {
                    this.componentDidMount();
                    this.setState({
                        idEdit: ''
                    })
                }
            });
    };

    handleShowFormAddNew = () => {
        this.setState({
            showFormAdd: !this.state.showFormAdd
        })
    };

    handleChangeInputNewValueName = (value) => {
        this.setState({
            newValueName: value
        })
    };
    handleChangeInputNewValueEmail = (value) => {
        this.setState({
            newValueEmail: value
        })
    };

    handleChangeSelectFormAdd = (value) => {
        this.setState({
            newLevelValue: value
        })
    };

    handleSubmitFormAdd = () => {
        let {newValueName, newValueEmail} = this.state;
        console.log(newValueName, newValueEmail);
        if (newValueEmail.trim() === '' || newValueName.trim() === '') {
            return false
        }
        let newItem = {
            name: newValueName,
            email: newValueEmail
        };
        TodoListModel.createUser(newItem).then(
            results => {
                if (results.data.code === 200) {
                    this.componentDidMount();
                    this.setState({
                        newValueName: '',
                        newValueEmail: ''
                    });
                }
            });
    };

    handleOnChangeInputSearch = (value) => {
        console.log(value);
        if (value.length >= 0) {
            value.toLowerCase().trim();
            TodoListModel.getUsers(value).then(
                results => {
                    this.setState({
                        searchString: value,
                        items: results.data.users
                    })
                }
            );
        }
    };


    render() {
        return (
            <div className="todoList">
                <SweetAlert
                    show={this.state.showAlert}
                    title="Demo"
                    text={this.state.titleAlert}
                    showCancelButton
                    onOutsideClick={() => this.setState({showAlert: false})}
                    onEscapeKey={() => this.setState({showAlert: false})}
                    onCancel={() => this.setState({showAlert: false})}
                    onConfirm={() => this.handleDeleteItem()}
                />
                <div className="row">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <Search
                            searchString={this.state.searchString}
                            handleOnChangeInputSearch={this.handleOnChangeInputSearch}
                        />
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <Sort/>
                    </div>
                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                        <button
                            type="button"
                            className="btn btn-info btn-block marginB10"
                            onClick={this.handleShowFormAddNew}
                        >{(this.state.showFormAdd) ? 'Close item' : 'Add Item'}</button>
                    </div>
                </div>
                <div className="row marginB10">
                    <div className="col-md-offset-7 col-md-5">
                        <Form
                            showFormAdd={this.state.showFormAdd}
                            handleShowFormAddNew={this.handleShowFormAddNew}
                            handleChangeInputNewValueName={this.handleChangeInputNewValueName}
                            handleChangeInputNewValueEmail={this.handleChangeInputNewValueEmail}
                            newValueName={this.state.newValueName}
                            newValueEmail={this.state.newValueEmail}
                            handleChangeSelectFormAdd={this.handleChangeSelectFormAdd}
                            handleSubmitFormAdd={this.handleSubmitFormAdd}
                        />
                    </div>
                </div>
                <div className="panel panel-success">
                    <div className="panel-heading">List Item</div>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th style={{width: '10%'}} className="text-center">#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th style={{width: '15%'}}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderItem()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TodoList;
