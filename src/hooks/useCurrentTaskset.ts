import { useNearcrowdContract } from '../contracts/nearcrowd/useNearcrowdContract';
import { atom, useRecoilState } from 'recoil';
import { useCallback, useEffect } from 'react';
import { api } from '../services/api';
import { TopicDTO } from '../services/api/topics';

const currentTasksetAtom = atom<TopicDTO | null>({
    key: 'currentTasksetAtom',
    default: null
});

export function useCurrentTaskset(fetchOnUsage = false) {
    const { methods } = useNearcrowdContract();
    const [currentTaskset, setCurrentTaskset] = useRecoilState(currentTasksetAtom);

    const fetchCurrentTaskset = useCallback(async () => {
        const ordinal = await methods.getCurrentTaskset();

        if (ordinal === null) {
            return;
        }

        const data = await api.topics.fetchTopic(ordinal);

        if (data) {
            setCurrentTaskset(data);
        }

        return data;
    }, [methods]);

    const requestChangeCurrentTaskset = useCallback(
        async (newTasksetOrdinal: number) => {
            await methods.changeCurrentTaskset(newTasksetOrdinal);
        },
        [methods]
    );

    // fetch once on usage
    useEffect(() => {
        if (!fetchOnUsage) {
            return;
        }

        fetchCurrentTaskset().catch(console.error);
    }, []);

    return {
        currentTaskset,

        fetchCurrentTaskset,
        requestChangeCurrentTaskset
    };
}
