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
            arrayLevel: [0, 1, 2],
            newValue: '',
            newLevelValue: 0,
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
        let {items, idEdit, indexEdit, nameEdit, levelEdit, arrayLevel} = this.state;
        if (items.length === 0) {
            return <Item item={0}/>
        }
        return items.map((item, index) => {
            if (item.id === idEdit) {
                return <ItemEdit
                    key={index}
                    indexEdit={indexEdit}
                    nameEdit={nameEdit}
                    levelEdit={levelEdit}
                    handleCancelEditClick={this.handleCancelEditClick}
                    handleEditNameInput={this.handleEditNameInput}
                    handleEditSelect={this.handleEditSelect}
                    handleEditClickSubmit={this.handleEditClickSubmit}
                    arrayLevel={arrayLevel}
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
        let {idAlert, items} = this.state;
        if (items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].id === idAlert) {
                    items.splice(i, 1);
                    break;
                }
            }
        }
        this.setState({
            showAlert: false
        });
    };
    handleEditItem = (index, item) => {
        this.setState({
            indexEdit: index,
            idEdit: item.id,
            nameEdit: item.name,
            levelEdit: item.level
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
    handleEditSelect = (value) => {
        this.setState({
            levelEdit: value
        })
    };
    handleEditClickSubmit = () => {
        let {items, idEdit, nameEdit, levelEdit} = this.state;
        if (items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].id === idEdit) {
                    items[i].name = nameEdit;
                    items[i].level = parseInt(levelEdit);
                    break;
                }
            }
        }
        this.setState({
            idEdit: ''
        });
    };

    handleShowFormAddNew = () => {
        this.setState({
            showFormAdd: !this.state.showFormAdd
        })
    };

    handleChangeInputNewValue = (value) => {
        console.log(value);
        this.setState({
            newValue: value
        })
    };

    handleChangeSelectFormAdd = (value) => {
        console.log(value);
        this.setState({
            newLevelValue: value
        })
    };

    handleSubmitFormAdd = () => {
        let {items, newValue, newLevelValue} = this.state;
        console.log(newValue, newLevelValue);
        if (newValue.trim() === '') {
            return false
        }
        let newItem = {
            id: uuidv4(),
            name: newValue,
            level: parseInt(newLevelValue)
        };
        items.push(newItem);
        this.setState({
            items: items,
            newItem: '',
            newLevelValue: 0
        })
    };

    handleOnChangeInputSearch = (value) => {
        console.log(value);
        let sourceData = [];
        let newItems = [];
        if (value.length <= 0) {
            newItems = sourceData;
        } else {
            value.toLowerCase().trim();
            if (sourceData.length > 0) {
                for (let i = 0; i < sourceData.length; i++) {
                    if (sourceData[i].name.toLowerCase().trim().indexOf(value) > -1) {
                        newItems.push(sourceData[i])
                    }
                }
            }
        }
        this.setState({
            searchString: value,
            items: newItems
        })
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
                            arrayLevel={this.state.arrayLevel}
                            handleChangeInputNewValue={this.handleChangeInputNewValue}
                            newValue={this.state.newValue}
                            newLevelValue={this.state.newLevelValue}
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
                            <th style={{width: '15%'}} className="text-center">Level</th>
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
