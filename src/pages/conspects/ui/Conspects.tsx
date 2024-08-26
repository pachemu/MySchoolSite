import React from 'react'
import {Topics} from "../const/Conspects";
import TopicList from "../../../features/TopicList/TopicList";

export const Conspects = () => {
    return (
        <TopicList topics={Topics}/>
    )
}

export default Conspects;