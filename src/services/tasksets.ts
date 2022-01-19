export interface Taskset {
    id: string;
    name: string;
    ordinal: number;
    reward: number;
    description: string;
    requirements: string;
}

const TASKSET_MOCK_LIST: Taskset[] = [
    {
        id: 'uuid-1',
        name: 'Localized Narratives',
        description: '...',
        ordinal: 0,
        reward: 0.04,
        requirements: ''
    },
    {
        id: 'uuid-2',
        name: 'Simple Puzzles',
        description: '...',
        ordinal: 1,
        reward: 0.07,
        requirements:
            'Ability to create simple colored images (either paper with pensils and a phone camera, or knowledge of how to use image processing software)'
    }
];

export async function fetchTasksetList(): Promise<Taskset[]> {
    return TASKSET_MOCK_LIST;
}

export async function fetchTaskset(
    tasksetId: string
): Promise<Taskset | undefined> {
    return TASKSET_MOCK_LIST.find((taskset) => taskset.id === tasksetId);
}
