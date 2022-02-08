import { sleep } from '../../utils/sleep';

export interface TaskDTO {
    hash: string;

    /**
     * JSON containing tasks details
     */
    content: string;

    /**
     * Task topics
     */
    // topics?: TopicDTO;

    createdAt: Date;
}

export async function fetchTask(hash: string): Promise<TaskDTO> {
    const res = await fetch(process.env.REACT_APP_NEARCROWD_BACKEND_URL + '/tasks/' + hash);
    const data = await res.json();

    return data;
}
