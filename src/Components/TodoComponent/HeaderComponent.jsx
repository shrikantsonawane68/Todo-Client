import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
//import AuthenticatedRoute from './AuthenticatedRoute'
import { withRouter } from 'react-router';


class HeaderComponent extends Component{
    render(){
        // return <div> Header <hr/> </div>
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return(
        <header>
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                <div><a className="navbar-brand" href="http://www.in28minutes.com">in28Minutes</a></div>
                <ul className="navbar-nav">
                    {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/shrikant">Home</Link></li>}
                    {isUserLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                </ul>
                <ul className="navbar-nav navbar-collapse justify-content-end">
                    {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                    {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                </ul>

            </nav>
        </header>
        )
    }                
}


//export default HeaderComponent
export default withRouter(HeaderComponent);