import { sleep } from './api';

export interface TasksetDTO {
    id: number;
    name: string;
    description: string;
    requirements: string;
}

const TASKSET_MOCK_LIST: TasksetDTO[] = [
    {
        id: 0,
        name: 'Localized Narratives',
        description: '...',
        requirements: ''
    },
    {
        id: 1,
        name: 'Simple Puzzles',
        description: '...',
        requirements:
            'Ability to create simple colored images (either paper with pensils and a phone camera, or knowledge of how to use image processing software)'
    }
];

export async function fetchTasksetList(): Promise<TasksetDTO[]> {
    await sleep(300);

    return TASKSET_MOCK_LIST;
}

export async function fetchTaskset(tasksetId: number): Promise<TasksetDTO | undefined> {
    await sleep(300);

    return TASKSET_MOCK_LIST.find((taskset) => taskset.id === tasksetId);
}
