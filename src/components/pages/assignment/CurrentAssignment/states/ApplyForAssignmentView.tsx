import { useState } from 'react';
import CustomButton from '../../../../shared/CustomButton';
import { useAccountState } from '../../../../../hooks/useAccountState';
import { useCurrentAssignment } from '../../../../../hooks/useCurrentAssignment';
import { useCurrentTaskset } from '../../../../../hooks/useCurrentTaskset';

export function ApplyForAssignmentView() {
    const { fetchAccountState } = useAccountState(false);
    const { applyForAssignment } = useCurrentAssignment(false);
    const { currentTaskset } = useCurrentTaskset(true);

    const [loading, setLoading] = useState(false);

    async function applyAndFetchAccountState() {
        if (!currentTaskset || loading) {
            return;
        }

        setLoading(true);
        await applyForAssignment(currentTaskset.id);
        await fetchAccountState();
        setLoading(false);
    }

    return (
        <div className="flex flex-col justify-center space-y-5">
            <p>Taskset: {currentTaskset?.title}. No assigned tasks.</p>

            <CustomButton
                disabled={loading}
                className="bg-blue-500 disabled:opacity-50 disabled:cursor-wait"
                onClick={() => {
                    applyAndFetchAccountState().catch(console.error);
                }}
            >
                Apply for assignment
            </CustomButton>
        </div>
    );
}
