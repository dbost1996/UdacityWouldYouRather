import React, { Component } from 'react'
import { connect } from 'react-redux'
import {clearAuthedUser, setAuthedUser} from "../actions/authedUser";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import '../index.css'
import {handleInitialData} from "../actions/shared";

class Login extends Component {

    static propTypes = {
        lastLocation: PropTypes.object.isRequired,
    }

    state = {
        dropdownOpen: false,
        selectedUser: null
    };

    componentDidMount() {
        this.props.dispatch(clearAuthedUser())
    }

    userSelected = function(event) {
        if(event.target.value === "Choose here"){
            this.setState({selectedUser: null});
        } else {
            this.setState({selectedUser:event.target.value});
        }
    }

    login = function(){
        this.props.dispatch(handleInitialData())
        this.props.dispatch(setAuthedUser(this.state.selectedUser));
    }

    render() {

        const { users } = this.props
        return (
            <div className='container'>
                <div className='welcome_login' id="login_element_1">Welcome to would you rather</div>
                <div className='welcome_login' >Please tell us who you are:</div>
                <select id="login_select" className='welcome_login' defaultValue={{ label: 2002, value: 2002 }} onChange={(event) => this.userSelected(event)}>
                    <option>Choose here</option>
                    {Object.keys(users).map(function(key) {
                        return (
                           <option value={users[key].id} key={key}>
                                {users[key].name}
                            </option>
                        );
                    })}
                </select>
                <Link className='link welcome_login' to={ this.props.lastLocation.pathname !== '/login' ? this.props.lastLocation.pathname : '/'} >
                    <button id="login_button" disabled={this.state.selectedUser === null} onClick={(event) => this.login(event)}>
                        Login
                    </button>
                </Link>
            </div>
        )
    }
}

function mapStateToProps ({ users }) {
    return {
        users
    }
}

export default connect(mapStateToProps)(Login)