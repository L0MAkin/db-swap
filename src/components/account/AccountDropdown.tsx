import { Fragment, useEffect, useState } from 'react';
import { useNearWallet } from 'react-near';
import { Popover, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/outline';
import LogoutButton from '../buttons/LogoutButton';
import Stats from './Stats';

import * as nearcrowd from '../../contracts/nearcrowd';

function AccountDropdown() {
    const wallet = useNearWallet()!;
    const account = wallet.account();
    const contract = nearcrowd.useNearcrowdContract();

    const [accountWhitelisted, setAccountWhitelisted] = useState(false);
    const [accountStats, setAccountStats] = useState<nearcrowd.AccountStats>({
        balance: '0',
        successful: 0,
        failed: 0
    });

    useEffect(() => {
        async function callIsAccountWhitelisted() {
            const whitelisted = await contract.is_account_whitelisted({
                account_id: account.accountId
            });

            setAccountWhitelisted(whitelisted);
        }

        callIsAccountWhitelisted();
    }, [account, contract]);

    useEffect(() => {
        async function callGetAccountStats() {
            const stats = await contract.get_account_stats({
                account_id: account.accountId
            });

            setAccountStats(stats);
        }

        if (accountWhitelisted) {
            callGetAccountStats();
        }
    }, [account, contract, accountWhitelisted]);

    // TODO: ui for not whitelisted account

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
                        <span>{account.accountId}</span>
                        <span>{`${accountWhitelisted}`}</span>
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
                                    <Stats stats={accountStats} />
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
