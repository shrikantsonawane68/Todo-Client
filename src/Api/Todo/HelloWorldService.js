
import axios from 'axios'

class HelloWorldService{
    executeHelloWorldService(){
        //console.log('executed service')
        return axios.get('http://localhost:8080/hello-world-bean');
        //.then(response => console.log(response))
        //.catch()
    }

    executeHelloWorldPathVariableService(name){
        //console.log('executed service')
        //no need of passing below basic auth header since it is taken care by interceptor in uthenticationservice.js
        //let username = 'user'
        //let password = 'password'

        //let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password);
        return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`
        // ,
        //     {
        //         headers : {
        //             authorization : basicAuthHeader
        //         }
        //     }
        );
        //.then(response => console.log(response))
        //.catch()
    }

}

export default new HelloWorldService()