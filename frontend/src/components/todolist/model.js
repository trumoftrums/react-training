import axios from 'axios';
import config from '../../config';

class TodoListModel {

    static getUsers(key='',page=1) {
        let url = config.apiUrl + 'users?page=' + page;
        console.log(key);
        if(key){
            url += '&search='+key;
        }
        return axios.get(url);
    }

    static createUser(data) {
        let url = config.apiUrl + 'users';
        return axios.post(url, data);
    }

    static deleteUser(id) {
        let url = config.apiUrl + 'users/' + id;
        return axios.delete(url);
    }

    static updateUser(id, data) {
        let url = config.apiUrl + 'users/' + id;
        return axios.put(url, data);
    }
}

export default TodoListModel;