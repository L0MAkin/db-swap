import PageLayout from '../../layouts/PageLayout';
import LoginButton from '../../components/login/LoginButton';
import { useWalletAuthorized } from '../../hooks/useWalletAuthorized';
import { useWhitelistedContext } from '../../contexts/WhitelistedContext';

function HomePage() {
    const { authorized } = useWalletAuthorized();
    const { whitelisted } = useWhitelistedContext();

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
            </div>
        </PageLayout>
    );
}

export default HomePage;
