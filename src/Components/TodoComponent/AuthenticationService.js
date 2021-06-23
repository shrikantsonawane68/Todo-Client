import axios from 'axios'
import { API_URL } from '../../Constants'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
class AuthenticationService{

    executeBasicAuthenticationService(username, password){
        return axios.get(`${API_URL}/basicauth`,{headers : {authorization : this.createBasicAuthToken(username, password)}})
    }

    createBasicAuthToken(username,password){
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username,password){
        console.log("registerSuccessfulLogin called")
        //let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password);
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME,username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }

    logout(){
        console.log("logout called")
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    }

    isUserLoggedIn(){
        console.log("user is logged in")
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user === null)  return false        
        return true
    }

    getLoggedInUserName(){
        //console.log("user is logged in")
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user === null)  return ''        
        return user
    }

    setupAxiosInterceptors(basicAuthHeader){
        axios.interceptors.request.use(        
                (config) => 
                { 
                    if(this.isUserLoggedIn())
                    {
                        config.headers.authorization = basicAuthHeader 
                    }
                    return config
                }            
        )
    }
}

export default new AuthenticationService()