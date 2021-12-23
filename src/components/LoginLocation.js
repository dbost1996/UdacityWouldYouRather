import React from 'react'
import {useParams} from "react-router-dom";
import QuestionDetailPage from "./QuestionDetailPage";
import {useLocation} from "react-router-dom";
import Login from "./Login";

export default function LoginLocation(){
    const lastLocation = useLocation();
    return <Login lastLocation={lastLocation}></Login>;
}