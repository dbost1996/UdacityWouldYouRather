import React from 'react'
import {useParams} from "react-router-dom";
import QuestionDetailPage from "./QuestionDetailPage";

export default function QuestionDetail(){
    let params = useParams();
    return <QuestionDetailPage id={params.id}/>;
}