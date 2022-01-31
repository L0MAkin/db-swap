import { useEffect, useState } from 'react';
import CustomButton from '../../shared/CustomButton';

enum TasksetType {
    SingleImageDescriptionDev = 'SingleImageDescriptionDev'
}

type TasksetDataFields = { image: string };

interface AssignmentMeta {
    type: TasksetType;
    data: TasksetDataFields;
}

interface Props {
    onSolutionChange(solution: object): void;
    onSolutionSubmit(solution: object): void;
    assignmentMetadata: string;
    forReview: boolean;
}

export default function SolutionBox({ onSolutionChange, onSolutionSubmit, assignmentMetadata, forReview }: Props) {
    // TODO: show view depending on assignment type

    const [solution, setSolution] = useState({ description: '' });
    const meta = JSON.parse(assignmentMetadata) as AssignmentMeta;

    const { image } = meta.data;

    useEffect(() => {
        onSolutionChange(solution);
    }, [solution]);

    return (
        <div className="flex flex-col justify-center space-y-5">
            <div className="text-center">
                {forReview
                    ? '[Review] Check if provided description is correct ☑️'
                    : '[Regular] Describe what you see on image 👇'}
            </div>

            <img src={image} alt="image" className="rounded shadow-2xl" />

            <textarea
                className="border-yellow-500 border-2 rounded p-2"
                placeholder="150-200 characters"
                onChange={(e) => {
                    setSolution({ description: e.target.value });
                }}
            />

            {!forReview && (
                <CustomButton
                    onClick={() => {
                        onSolutionSubmit(solution);
                    }}
                >
                    Submit Solution
                </CustomButton>
            )}

            {forReview && (
                <div className="flex space-x-5">
                    <CustomButton className="bg-red-500 flex-1" onClick={() => console.log('reject')}>
                        Reject
                    </CustomButton>
                    <CustomButton className="bg-green-500 flex-1" onClick={() => console.log('accept')}>
                        Accept
                    </CustomButton>
                </div>
            )}
        </div>
    );
}
