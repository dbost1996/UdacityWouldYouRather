import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Navigation from "./Navigation";
import LoginLocation from "./LoginLocation";

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        const { authedUser } = this.props
        if(authedUser !== null){
            return (
                <div>
                    <div>
                        <Navigation/>
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    <LoginLocation/>
                </div>
                )
        }
    }
}

function mapStateToProps ({ authedUser }) {
    return {
        loading: authedUser === null,
        authedUser
    }
}

export default connect(mapStateToProps)(App)
