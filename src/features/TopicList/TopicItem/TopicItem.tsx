import React, {useRef, useState} from 'react';
import * as styles from './Topicitem.module.scss'
import {Modal} from "../../../shared/modal/ui/Modal";
import {useOnClickOutside} from "../../../shared/modal/hooks/useClickOnOutside";
interface SubTopic {
    url: string;
    name: string;
}

interface Topic {
    name: string;
    url?: string;
    subTopics?: SubTopic[];
}

interface TopicItemProps {
    topic: Topic;
    className?: string
}

const TopicItem: React.FC<TopicItemProps> = ({ topic, className=styles.Topic }) => {
    const modalRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
    };
    useOnClickOutside(modalRef, closeModal);
    return (
        <div className={className} key={topic.name}>
            {topic.subTopics ? (
                <div>
                    <button className={styles.Topic_btn} onClick={()=> setIsModalOpen(true)}>{topic.name}</button>
                    <div>
                        {isModalOpen && (<Modal isOpen={isModalOpen} ref={modalRef}>
                            {topic.subTopics.map((subTopic) => (
                                <TopicItem className={styles.SubTopic} key={subTopic.name} topic={subTopic}/>
                            ))}
                        </Modal>)}

                    </div>
                </div>
            ) : (
                <div>
                    <a href={topic.url} target="_blank" rel="noopener noreferrer">
                        {topic.name}
                    </a>
                </div>
            )}
        </div>
    );
};

export default TopicItem;
