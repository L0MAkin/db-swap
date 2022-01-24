import { Link } from 'react-router-dom';
import { useWalletAuthorized } from '../hooks/useWalletAuthorized';
import { useWhitelistedContext } from '../hooks/useWhitelistedContext';
import PageLayout from '../components/layout/PageLayout';
import LoginButton from '../components/login/LoginButton';

function HomePage() {
    const { authorized } = useWalletAuthorized();
    const { whitelisted } = useWhitelistedContext();

    const invited = authorized && whitelisted;
    const notInvited = authorized && !whitelisted;

    return (
        <PageLayout>
            <div className="text-center">
                {!authorized && (
                    <>
                        <h1 className="text-5xl font-medium text-gray-900 mx-auto pt-20 mb-4">
                            Welcome to NEARCrowd
                        </h1>
                        <LoginButton />
                    </>
                )}

                {notInvited && <p>You are not whitelisted yet.</p>}

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
