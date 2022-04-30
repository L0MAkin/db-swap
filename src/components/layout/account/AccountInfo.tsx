import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import LoginButton from '../../login/LoginButton';
import Dropdown from './../account/Dropdown';
import { useAuthorized } from '../../../hooks/useAuthorized';
import { useNearWallet } from 'react-near';


const AccountContainer = styled.div`
    width: auto;
    margin: 30px auto 0 auto;
    max-width: 100%;

    @media (min-width: 768px) {
        width: 610px;
    }

    @media (min-width: 992px) {
        width: 610px;
        padding: 10px 0 10px 0;
    }

    @media (min-width: 1200px) {
        width: 610px;
    }
`
const NameContainer = styled.div`
    font-family: 'EksellDisplaySubset', regular;
    font-weight: 400;
    color:  #2A2B34;
`

const AccountInfo: FC = () => {
    const { authorized } = useAuthorized();
    const { accountId } = useNearWallet()!.account();


    return (
        <AccountContainer className="flex items-center ">
            <div className="flex items-center space-x-4">
                <NameContainer className="text-4xl">
                    DecentralBank  SWAP
                </NameContainer>
            </div>

            {!authorized && <LoginButton />}

            {authorized && (
                <div>

                   Account {accountId}
                </div>
            )}
            {/* {authorized && <Dropdown />} */}
        </AccountContainer>
    );
};

export default AccountInfo;
