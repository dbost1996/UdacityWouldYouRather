import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Navbar, Nav, Collapse, NavLink} from 'reactstrap';
import {Link, Outlet} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingBar from "react-redux-loading";


class Navigation extends Component {

    render() {
        const { authedUser, users } = this.props

        return (
            <>
                <LoadingBar />
                    <Navbar color="light" light expand="md">
                        <Collapse isOpen={true} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavLink disabled={true}>
                                    <div style={{ color: 'black', fontWeight: 'bold' }}>Hello {users[authedUser].name}</div>
                                </NavLink>
                                    <Link className="nav-link" to="/" style={{ textDecoration: 'none', color: 'black' }}>Dashboard</Link>
                                    <Link  className="nav-link" to="add" style={{ textDecoration: 'none', color: 'black' }}>New Poll</Link>
                                    <Link className="nav-link" to='leaderboard' style={{ textDecoration: 'none', color: 'black' }}>Leaderboard</Link>

                                    <Link to="/login" className="nav-link position-absolute  end-0" href='' style={{ textDecoration: 'none', color: 'black' }}>Logout</Link>

                            </Nav>
                        </Collapse>
                    </Navbar>
                    <Outlet/>
            </>
        )
    }
}

function mapStateToProps ({authedUser, users}) {
    return {
        authedUser,
        users
    }
}

export default connect(mapStateToProps)(Navigation)