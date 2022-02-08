import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { SDK } from '../../../services/api/sdk';

const Card: FC<{ taskset: SDK.Topic; selected?: boolean; onSelect(): Promise<void> }> = ({
    taskset,
    selected,
    onSelect
}) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);

    async function onClick() {
        setLoading(true);
        await onSelect().catch(console.error);
        setLoading(false);
    }

    useEffect(() => {
        return () => {
            // cleanup
            setLoading(false);
        };
    }, []);

    return (
        <div
            className={
                `flex flex-col justify-between
                bg-white rounded border-2 shadow-md leading-normal p-4
                hover:shadow-lg hover:scale-105 transition ease-out ` + (selected && ' border-blue-500')
            }
        >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 space-x-3 flex items-end">
                <span>{taskset.title}</span>
                {selected && <span className="rounded text-blue-500 text-[12px] p-1">selected</span>}
            </h5>
            <p className="mb-3 font-normal italic">{taskset.description}</p>

            {!selected && (
                <button
                    type="button"
                    className="py-2 px-3 rounded bg-yellow-400 font-medium disabled:opacity-50 disabled:cursor-wait"
                    disabled={loading}
                    onClick={() => {
                        onClick();
                    }}
                >
                    Select
                </button>
            )}

            {selected && (
                <button
                    type="button"
                    className="py-2 px-3 rounded bg-blue-400 font-medium"
                    disabled={loading}
                    onClick={() => {
                        navigate('/assignment');
                    }}
                >
                    Take assignment
                </button>
            )}
        </div>
    );
};

export default Card;
