import { FC } from 'react';
import * as nearcrowd from '../../contracts/nearcrowd';

const Stat: FC<{
    value: number | string;
    title: string;
    formatter?: (s: string | number) => string;
}> = ({ title, value, formatter }) => {
    const formattedValue = formatter ? formatter(value) : value;

    return (
        <div className="w-max">
            <div className="text-gray-400 text-md font-normal">{title}</div>
            <div className="text-gray-900 text-3xl font-bold">
                {formattedValue}
            </div>
        </div>
    );
};

const Stats: FC<{ stats: nearcrowd.AccountStats }> = ({ stats }) => {
    return (
        <div className="space-y-2">
            <Stat title="Successful tasks" value={stats.successful} />
            <Stat title="Failed tasks" value={stats.failed} />
            {stats.pending && (
                <Stat title="Pending review" value={stats.pending} />
            )}
            <Stat
                title="Reward collected"
                value={stats.balance}
                formatter={(s) => `${s} Ⓝ`}
            />
        </div>
    );
};

export default Stats;
