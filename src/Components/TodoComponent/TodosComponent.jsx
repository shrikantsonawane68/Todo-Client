import React, {Component} from 'react'
import TodoDataService from '../../Api/Todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

class TodosComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            todos :[
                // {id : "1", description :  "Dancing", done:false, targetDate: new Date()},
                // {id : "2", description :  "Singing", done:false, targetDate: new Date()},
                // {id : "3", description :  "Playing", done:false, targetDate: new Date()},
                // {id : "4", description :  "Reading", done:false, targetDate: new Date()},
            ],
            message : null
        }

        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
    }

    componentWillUnmount(){
        //this will get execute as soon as user switched to other component view
        console.log('componentWillUnmount called')
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log('shouldComponentUpdate called')
        console.log(nextProps)
        console.log(nextState)
        return true // when it is return true then the render method will get execute and the data get displayed on component. if it is return false then the data will not get render to component 
    }

    componentDidMount(){
            //react lifecyclemethod gets called after executing controller >> render >> componentDidMount >> render
            console.log('componentDidMount called')
            this.refreshTodos()
    }

    refreshTodos(){

        let userName = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(userName)
        .then(response => {
                // console.log(response)
                this.setState({
                    todos : response.data
                })
            }
        )

    }

    updateTodoClicked(id){
        console.log(`Update ${id} todo clicked..!`)
        this.props.history.push(`/todos/${id}`)
    }

    addTodoClicked(){
        console.log('add todo clicked')
        this.props.history.push('/todos/-1')
    }

    deleteTodoClicked(id){
        let userName = AuthenticationService.getLoggedInUserName()
        console.log(id+" "+userName)

        TodoDataService.deleteTodo(userName, id)
        .then(
            response => {
                this.setState({message : `Delete of todo ${id} is Successful!`})
                this.refreshTodos()
            }
        )
    }

    render(){
        return(
            <div> 
                <br/><h1>Todo's List</h1><br/>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Description</th>
                                <th>Is Completed</th>
                                <th>Targeted Date</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                        <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                            <button className="btn btn-success" onClick={this.addTodoClicked}>Add Todo</button>
                    </div>
                </div>
            </div>
        )
    }                
}

export default TodosComponent