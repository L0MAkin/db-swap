import { Popover, Transition } from '@headlessui/react';
import { FC, Fragment } from 'react';
import { useNearWallet } from 'react-near';
import LogoutButton from '../buttons/LogoutButton';
import { UserCircleIcon } from '@heroicons/react/outline';

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

const AccountStats: FC<{ stats: IAccountStats }> = ({ stats }) => {
    return (
        <div className="space-y-2">
            <Stat title="Successful tasks" value={stats.successful} />
            <Stat title="Failed tasks" value={stats.failed} />
            <Stat title="Pending review" value={stats.pendingReview} />
            <Stat
                title="Reward collected"
                value={stats.rewardCollected}
                formatter={(s) => `${s} Ⓝ`}
            />
        </div>
    );
};

interface IAccountStats {
    successful: number;
    failed: number;
    pendingReview: number;
    rewardCollected: number;
}

function AccountDropdown() {
    const wallet = useNearWallet();

    const account = wallet?.account();

    const stats: IAccountStats = {
        successful: 10,
        failed: 1,
        pendingReview: 3,
        rewardCollected: 0.001
    };

    return (
        <Popover className="relative">
            {() => (
                <>
                    <Popover.Button
                        className="
                            text-rose-200 group bg-transparent
                            border-rose-200 border-2
                            px-3 py-2 rounded-md flex
                            items-center font-medium
                            space-x-2"
                    >
                        <UserCircleIcon className="w-5 h-5" />
                        <span>{account?.accountId}</span>
                    </Popover.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 right-0">
                            <div className="overflow-hidden rounded shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="p-7 bg-white text-gray-900">
                                    <AccountStats stats={stats} />
                                </div>

                                <div className="p-7 bg-gray-100 flex justify-end">
                                    <LogoutButton />
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}

export default AccountDropdown;
