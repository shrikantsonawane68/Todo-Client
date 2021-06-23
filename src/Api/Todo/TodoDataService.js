import axios from 'axios'
import { API_URL } from '../../Constants'
class TodoDataService{

    retrieveAllTodos(name){
        //console.log('executed service')
        return axios.get(`${API_URL}/users/${name}/todos`);
        //.then(response => console.log(response))
        //.catch()
    }

    retrieveTodo(name,id){
        //console.log('executed service')
        return axios.get(`${API_URL}/users/${name}/todos/${id}`);
        //.then(response => console.log(response))
        //.catch()
    }

    deleteTodo(name, id){
        //console.log('executed service')
        return axios.delete(`${API_URL}/users/${name}/todos/${id}`);
        //.then(response => console.log(response))
        //.catch()
    }

    updateTodo(name, id, todo){
        //console.log('executed service')
        return axios.put(`${API_URL}/users/${name}/todos/${id}`, todo);
        //.then(response => console.log(response))
        //.catch()
    }

    createTodo(name, todo){
        //console.log('executed service')
        return axios.post(`${API_URL}/users/${name}/todos/`, todo);
        //.then(response => console.log(response))
        //.catch()
    }

}

export default new TodoDataService()