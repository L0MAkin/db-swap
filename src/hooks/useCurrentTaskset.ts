import { useNearcrowdContract } from '../contracts/nearcrowd/useNearcrowdContract';
import { atom, useRecoilState } from 'recoil';
import { useCallback, useEffect } from 'react';
import { SDK } from '../services/api/sdk';
import { useApi } from './useApi';

const currentTasksetAtom = atom<SDK.Topic | null>({
    key: 'currentTasksetAtom',
    default: null
});

export function useCurrentTaskset(fetchOnUsage = false) {
    const api = useApi();
    const { methods } = useNearcrowdContract();
    const [currentTaskset, setCurrentTaskset] = useRecoilState(currentTasksetAtom);

    const fetchCurrentTaskset = useCallback(async () => {
        const ordinal = await methods.getCurrentTaskset();

        if (ordinal === null) {
            return;
        }

        const data = await api.getTopicById(ordinal);

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
