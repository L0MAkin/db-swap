import PageLayout from '../layouts/PageLayout';
import { useNearWallet } from 'react-near';
import LoginButton from '../buttons/LoginButton';

function HomePage() {
    const authorized = useNearWallet()!.isSignedIn();

    return (
        <PageLayout>
            <div className="text-center">
                <h1 className="text-5xl font-medium text-gray-900 mx-auto pt-20">
                    Welcome to NEARCrowd
                </h1>

                {!authorized && <LoginButton />}
            </div>
        </PageLayout>
    );
}

export default HomePage;
