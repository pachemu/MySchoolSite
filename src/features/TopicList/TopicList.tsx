// src/features/TopicList/TopicList.tsx
import React from 'react';
import TopicItem from "./TopicItem/TopicItem";
import {Topics} from '../../entities/Topic/model'
import * as styles from './TopicList.module.scss'

interface TopicListProps {
    topics: Topics[];
}

const TopicList: React.FC<TopicListProps> = ({topics}) => (
    <div className={styles.TopicList}>
        {topics.map((topic) => (
            <TopicItem key={topic.name} topic={topic}/>
        ))}
    </div>
);

export default TopicList;