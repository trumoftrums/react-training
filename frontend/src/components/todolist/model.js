import axios from 'axios';
import config from '../../config';

class TodoListModel{

    static getUsers(){
        let url = config.apiUrl+'users';
        return axios.get(url);
    }

    static createUser(data){
        let url = config.apiUrl+'users';
        return axios.post(url,data);
    }
}

export default TodoListModel;