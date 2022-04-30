import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import LoginButton from '../../login/LoginButton';
import Dropdown from './../account/Dropdown';
import { useAuthorized } from '../../../hooks/useAuthorized';

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
    font-weight: 400;
    color:  #2A2B34;
`

const AccountInfo: FC = () => {
    const { authorized } = useAuthorized();
    const { t } = useTranslation();

    return (
        <AccountContainer className="flex items-center ">
            <div className="flex items-center space-x-4">
                <NameContainer className="text-4xl">
                    DecentralBank  SWAP
                </NameContainer>
            </div>

            {!authorized && <LoginButton />}

            {authorized && <Dropdown />}
        </AccountContainer>
    );
};

export default AccountInfo;
