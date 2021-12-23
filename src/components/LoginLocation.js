import React from 'react'
import {useLocation} from "react-router-dom";
import Login from "./Login";

export default function LoginLocation(){
    const lastLocation = useLocation();
    return <Login lastLocation={lastLocation}/>;
}