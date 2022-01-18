import { FC } from 'react';
import NavBar from './NavBar';
import AuthLayout from './AuthLayout';

const PageLayout: FC<{ withAuth?: boolean }> = (
    { children, withAuth } = { withAuth: false }
) => {
    const Page = () => (
        <div className="h-screen flex flex-col bg-gray-100">
            <NavBar />

            <main className="flex-1 h-max container p-6">{children}</main>
        </div>
    );

    if (withAuth) {
        return (
            <AuthLayout>
                <Page />
            </AuthLayout>
        );
    }

    return <Page />;
};

export default PageLayout;
