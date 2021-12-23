import React, { Component } from 'react'
import { connect } from 'react-redux'
import {clearAuthedUser, setAuthedUser} from "../actions/authedUser";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

class Login extends Component {

    static propTypes = {
        lastLocation: PropTypes.object.isRequired,
    }

    toggle = this.toggle.bind(this);
    state = {
        dropdownOpen: false,
        selectedUser: null
    };

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    componentDidMount() {
        this.props.dispatch(clearAuthedUser())
    }

    userSelected = function(event) {
        this.setState({selectedUser:event.target.value});
    }

    login = function(){
        this.props.dispatch(setAuthedUser(this.state.selectedUser));
    }


    render() {
        const { authedUser, users } = this.props
        let message='You selected '+ this.state.selectedUser;

        return (

            <div >
                <span>Welcome to would you rather</span>
                <span>Tell us who you are:</span>



                <p>{message}</p>

                <select  onChange={(event) => this.userSelected(event)}>
                    <option value="" selected disabled hidden>Choose here</option>
                    {Object.keys(users).map(function(key) {
                        return (

                           <option value={users[key].id} key={key}>
                                {users[key].name}
                            </option>
                        );
                    })}
                </select>
                <Link to={ this.props.lastLocation.pathname !== '/login' ? this.props.lastLocation.pathname : '/'} disabled={this.state.selectedUser === null} onClick={(event) => this.login(event)}>
                    Login
                </Link>

            </div>
        )
    }
}

function mapStateToProps ({authedUser, users}) {
    return {
        authedUser,
        users
    }
}

export default connect(mapStateToProps)(Login)