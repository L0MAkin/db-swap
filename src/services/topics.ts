import { sleep } from './api';

export interface TopicDTO {
    id: number;
    title: string;
    reward: string;
    description: string;
}

const TOPIC_MOCK_LIST: TopicDTO[] = [
    {
        id: 0,
        title: 'Localized Narratives',
        description: 'Good written russian',
        reward: '0.02'
    },
    {
        id: 1,
        title: 'Simple Puzzles',
        description:
            'Ability to create simple colored images (either paper with pensils and a phone camera, or knowledge of how to use image processing software)',
        reward: '0.01'
    }
];

export async function fetchTopicsList(): Promise<TopicDTO[]> {
    await sleep(300);

    return TOPIC_MOCK_LIST;
}

export async function fetchTopic(tasksetId: number): Promise<TopicDTO | undefined> {
    await sleep(300);

    return TOPIC_MOCK_LIST.find(({ id }) => id === tasksetId);
}
