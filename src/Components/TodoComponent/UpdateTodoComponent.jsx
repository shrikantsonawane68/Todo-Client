import React, {Component} from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import TodoDataService from '../../Api/Todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'


class UpdateTodoComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            id : this.props.match.params.id,
            description : '',
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onValidate = this.onValidate.bind(this)
    }

    onSubmit(values){
        console.log("onSubmit clicked!")
        console.log(values)

        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }

        if (this.state.id === -1) {
            let username = AuthenticationService.getLoggedInUserName()
            TodoDataService.createTodo(username, todo).then(() => this.props.history.push('/todos'))
        } else {

            let username = AuthenticationService.getLoggedInUserName()
            TodoDataService.updateTodo(username, this.state.id, todo).then(() => this.props.history.push('/todos'))
        }
    }

    onValidate(values){
        console.log("onValidate clicked!")        
        let errors = {}
        if(!values.description){
                errors.description = "Enter a description"
        }else if(values.description.length<5){
                errors.description = "Description should be at least 5 characters length"
        }

        if(!moment(values.targetDate).isValid()){
            errors.targetDate = "Enter valid target date"
        }

        console.log(values)
        return errors        
    }

    componentDidMount(){

        if(this.state.id===-1){ return }

        let userName = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveTodo(userName, this.state.id)
        .then(response => this.setState({
            description : response.data.description,
            targetDate : moment(response.data.targetDate).format('YYYY-MM-DD')
        }))
    }

    render(){
        let {description, targetDate} = this.state
        //let targetDate = this.state.targetDate
        return(
            <div>                
                <h1>Todo</h1>
                <div className="container">
                    <Formik initialValues={{description, targetDate}} onSubmit={this.onSubmit} validate={this.onValidate} validateOnChange={false} validateOnBlur={false} enableReinitialize={true}>
                            {
                                (props) => (
                                    <Form>
                                        <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                        <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                        <fieldset className = "form-group">
                                            <label>Description</label>
                                            <Field className="form-control" type="text" name="description" />
                                        </fieldset>
                                        <fieldset className = "form-group">
                                            <label>Target Date</label>
                                            <Field className="form-control" type="date" name="targetDate" />
                                        </fieldset>
                                        <button className="btn btn-success" type="submit">Save</button>

                                    </Form>                                    
                                )
                            }
                    </Formik>
                </div>
            </div>        
            );
    }        
}

export default UpdateTodoComponent