import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Navbar, Nav, Collapse, NavLink} from 'reactstrap';
import {Link, Outlet} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


class Navigation extends Component {

    render() {
        const { authedUser } = this.props

        return (
            <>
                    <Navbar color="light" light expand="md">
                        <Collapse isOpen={true} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavLink>
                                    <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Dashboard</Link>
                                </NavLink>
                                <NavLink>
                                    <Link  to="add" style={{ textDecoration: 'none', color: 'black' }}>New Poll</Link>
                                </NavLink>
                                <NavLink>
                                    <Link  to='leaderboard' style={{ textDecoration: 'none', color: 'black' }}>Leaderboard</Link>
                                </NavLink>
                                <NavLink>
                                    <Link to="/login" className="position-absolute  end-0" href='' style={{ textDecoration: 'none', color: 'black' }}>Logout</Link>
                                </NavLink>
                            </Nav>
                        </Collapse>
                    </Navbar>
                    <Outlet />

            </>

        )
    }
}

function mapStateToProps ({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(Navigation)