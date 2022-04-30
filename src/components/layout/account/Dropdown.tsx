import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/outline';
import LogoutButton from './LogoutButton';
import Stats from './Stats';
import { useWhitelisted } from '../../../hooks/useWhitelisted';
import { useAccountStats } from '../../../hooks/useAccountStats';
import { useNearWallet } from 'react-near';

function Dropdown() {
    const { whitelisted } = useWhitelisted();
    const { accountStats } = useAccountStats(true);

    const { accountId } = useNearWallet()!.account();

    return (
        <Popover className="relative">
            {() => (
                <>
                    <Popover.Button
                        className="
                            text-yellow-300 group bg-transparent
                            border-yellow-300 border-2
                            px-3 py-2 rounded-md flex
                            items-center font-medium
                            space-x-2"
                    >
                        <UserCircleIcon className="w-5 h-5" />
                        <span>{accountId}</span>
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

export default Dropdown;
