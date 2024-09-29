import React from 'react'
import {Topics} from "../const/Conspects";
import TopicList from "../../../features/TopicList/TopicList";

export const Conspects = () => {
    return (
        <div>
            <TopicList topics={Topics}/>
        </div>


    )
}

export default Conspects;