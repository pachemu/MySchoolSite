import React, {useRef, useState} from 'react';
import * as styles from './Topicitem.module.scss'
import DownOutlined from '@ant-design/icons'
import {Dropdown, Space} from 'antd';
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

const TopicItem: React.FC<TopicItemProps> = ({topic, className = styles.Topic}) => {
        const modalRef = useRef(null);
        const [isModalOpen, setIsModalOpen] = useState(false);

        const closeModal = () => {
            setIsModalOpen(false);
        };
        useOnClickOutside(modalRef, closeModal);

        const subs = (topic: SubTopic[]) => {
            const map = topic.map(topic =>
                ({
                    key: topic.name,
                    label: (<a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={topic.url}>
                        {topic.name}
                    </a>)
                })
            )

            return map
        }
        return (
            <div className={className} key={topic.name}>
                {topic.subTopics ? (
                    <div>
                        <Dropdown menu={{items: subs(topic.subTopics)}}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    {topic.name}
                                    <DownOutlined/>
                                </Space>
                            </a>
                        </Dropdown>
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
    }
;

export default TopicItem;
