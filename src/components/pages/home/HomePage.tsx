import { Link } from 'react-router-dom';
import PageLayout from '../../layout/PageLayout';
// import LoginButton from '../../login/LoginButton';
import { useAuthorized } from '../../../hooks/useAuthorized';
import { useWhitelisted } from '../../../hooks/useWhitelisted';
import { useNearWallet } from 'react-near';
import SwapContainerWrapper from '../../swap/SwapContainerWrapper';

function HomePage() {
    const { authorized } = useAuthorized();
    const { whitelisted } = useWhitelisted();
    const { accountId } = useNearWallet()!.account();
    const invited = authorized && whitelisted;
    const notInvited = authorized && !whitelisted;
  


    return (
        <PageLayout>
            <div className="text-center">
                {/* {authorized && accountId && ( */}
                    <>
                        {/* <h1 className="text-5xl font-medium text-gray-900 mx-auto pt-20 mb-4">Welcome to NEARCrowd</h1>
                        <LoginButton /> */}
                        <SwapContainerWrapper accountId={accountId}/>
                    </>
                {/* )} */}

                {invited && (
                    <>
                        <p>You are ready to go!</p>
                        <Link to="/tasksets" className="text-yellow-500">
                            Tasksets
                        </Link>
                    </>
                )}
            </div>
        </PageLayout>
    );
}

export default HomePage;
