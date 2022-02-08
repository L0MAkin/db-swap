export interface TopicDTO {
    id: number;
    title: string;
    reward: string;
    description: string;
}

export async function fetchTopicsList(): Promise<TopicDTO[]> {
    const res = await fetch(process.env.REACT_APP_NEARCROWD_BACKEND_URL + '/topics');
    const data = await res.json();

    return data || [];
}

export async function fetchTopic(tasksetId: number): Promise<TopicDTO> {
    const res = await fetch(process.env.REACT_APP_NEARCROWD_BACKEND_URL + '/topics/' + tasksetId);
    const data = await res.json();

    // await sleep(300);
    // return TOPIC_MOCK_LIST.find(({ id }) => id === tasksetId);

    return data || {};
}
