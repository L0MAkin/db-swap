import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import LoginButton from '../components/login/LoginButton';
import { useWorkerContext } from '../contexts/Worker';

function HomePage() {
    const { account, authorized } = useWorkerContext();

    const invited = authorized && account.whitelisted;
    const notInvited = authorized && !account.whitelisted;

    return (
        <PageLayout>
            <div className="text-center">
                {!authorized && (
                    <>
                        <h1 className="text-5xl font-medium text-gray-900 mx-auto pt-20 mb-4">Welcome to NEARCrowd</h1>
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
