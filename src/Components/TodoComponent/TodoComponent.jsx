import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
//import AuthenticationService from './AuthenticationService.js'
import AuthenticatedRoute from './AuthenticatedRoute'
//import { withRouter } from 'react-router';
import LoginComponent from './LoginComponent'
import TodosComponent from './TodosComponent'
import ErrorComponent from './ErrorCOmponent'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'
import LogoutComponent from './LogoutComponent'
import WelcomeComponent from './WelcomeComponent'
import UpdateTodoComponent from './UpdateTodoComponent'

class TodoComponent extends Component{

    render(){
        return(
            <div>
                <Router>
                    <>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={LoginComponent} />
                            <Route path="/login" component={LoginComponent} />
                            {/* <Route path="/login" component={LoginComponent} /> */}
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent} />
                            <AuthenticatedRoute path="/todos/:id" component={UpdateTodoComponent}/>
                            <AuthenticatedRoute path="/todos" component={TodosComponent} />
                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>                            
                            <Route component={ErrorComponent} />
                        </Switch>
                        <FooterComponent/>
                    </>
                </Router>
            </div>
        )
    }
}












// function ShowSuccessMessage(props){
//     if(props.hasLoginSuccess){
//         return <div>Login Successful!</div>
//     }
//     return null
// }

// function ShowFailedMessage(props){
//     if(props.hasLoginFailed){
//         return <div>Login Failed!</div>
//     }
//     return null
// }

export default TodoComponent
// export default withRouter(TodoComponent,HeaderComponent);