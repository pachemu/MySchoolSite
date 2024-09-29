import React from 'react'
import TopicList from "../../../features/TopicList/TopicList";
import {useParams, useSearchParams} from "react-router-dom";
import {Topics} from "../../conspects/const/Conspects";
export const Conspect = () => {
    const params = useParams()
    const nameConspect =  params.conspectId
    const result = Topics.find(item => item.name === nameConspect);
    const extractedProperty = result ? result['html'] : null;
    return (
        <div>
            {extractedProperty}
        </div>
    )
}

export default Conspect;