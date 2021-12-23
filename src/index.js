import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Leaderboard from './components/Leaderboard'
import Dashboard from "./components/Dashboard";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import QuestionDetail from "./components/QuestionDetail";
import Login from "./components/Login";
import NewQuestion from "./components/NewQuestion";
import LoginLocation from "./components/LoginLocation";

const store = createStore(reducer, middleware)

ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
        <Routes>

            <Route path="/" element={<App />} >
                <Route path="login" element={<LoginLocation/>}/>
                <Route path="" element={<Dashboard />} />
                <Route path="leaderboard" element={<Leaderboard />} />
                <Route path="question/:id" element={<QuestionDetail />} />
                <Route path="add" element={<NewQuestion />} />
            </Route>
        </Routes>
    </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
