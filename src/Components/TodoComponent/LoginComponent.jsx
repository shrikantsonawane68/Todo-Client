import React , {Component} from 'react'
//import {Route, Redirect} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends Component{

    constructor(props){
        super(props)
        this.state={
            username : 'user',
            password : 'password',
            showSuccessMessage : false,
            showFailedMessage : false
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    render(){
        return(
            <div>
                {/* <ShowSuccessMessage hasLoginSuccess={this.state.showSuccessMessage} /> */}
                {/* <ShowFailedMessage hasLoginFailed={this.state.showFailedMessage} /> */}
                {/* {this.state.showSuccessMessage && <div>Login Successful!</div>} */}
                <br/><br/><h1>Login</h1><br/><br/>
                <div className="container">
                    {this.state.showFailedMessage && <div className="alert alert-warning">Invalid Credentials!</div>}
                    User Name : <input type="text" name="username" value={this.state.username} onChange={this.handleChange} /><br/><br/>
                    Password  : <input type="password" name="password" value={this.state.password} onChange={this.handleChange} /><br/><br/>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        );
    }       

    loginClicked(){
        //console.log('login clicked')        
        /*if(this.state.username === 'shrikant' & this.state.password === '1234'){
            //console.log('Login Successfull!')
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
            this.props.history.push(`/welcome/${this.state.username}`)
            // this.setState({
            //     showSuccessMessage : true,
            //     showFailedMessage: false
            // })
        }            
        else{
            console.log('login failed!')
            this.setState({
                showSuccessMessage : false,
                showFailedMessage: true
            })
        } */           

        AuthenticationService
        .executeBasicAuthenticationService(this.state.username, this.state.password)
        .then(()=>{
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
            this.props.history.push(`/welcome/${this.state.username}`)
        })
        .catch(()=>{
            this.setState({
                showSuccessMessage : false,
                showFailedMessage: true
            })
        })
    }

    handleUsernameChange(event){
        console.log(event.target.value)
        this.setState({
            username : event.target.value
        })
    }

    handlePasswordChange(event){
        console.log(event.target.value)
        this.setState({
            password : event.target.value
        })
    }

    handleChange(event){
        // console.log(event.target.value)
        //console.log(this.state)
        this.setState({
            [event.target.name] : event.target.value
        })
    }

}

export default LoginComponent