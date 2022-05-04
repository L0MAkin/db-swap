import { FC } from 'react';
import styled from 'styled-components';
import LoginButton from '../../login/LoginButton';
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
const AppNameContainer = styled.div`
    font-family: 'EksellDisplaySubset', regular;
    font-weight: 400;
    color:  #2A2B34;
`

const AccountNameContainer = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    text-align: right;
    color: #2A2B34;
`
const LogOutContainer = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    text-align: right;
    letter-spacing: 0.5px;
    color: #2A2B34;
    cursor: pointer;
`

const AccountInfo: FC = () => {
    const { authorized } = useAuthorized();
    const { accountId } = useNearWallet()!.account();
    const wallet = useNearWallet();



    return (
        <AccountContainer className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <AppNameContainer className="text-2xl sm:text-4xl">
                    DecentralBank SWAP
                </AppNameContainer>
            </div>

            {!authorized && <LoginButton />}

            {authorized && (<div>
                <AccountNameContainer>
                     {accountId.length > 20 ? accountId.slice(0, 20) + '...' : accountId}
                </AccountNameContainer>
                <div
                    onClick={() => {
                        // NOTE: this method only clears data from local storage
                        // which does not make state changes or trigger updates
                        wallet?.signOut();
                        // HACK: refresh browser page
                        window.location.reload();
                    }}
                    className="flex justify-end"
                >
                    <LogOutContainer>Log Out</LogOutContainer></div>
            </div>

            )}
        </AccountContainer>
    );
};

export default AccountInfo;
