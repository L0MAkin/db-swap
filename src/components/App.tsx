import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import DocsPage from './pages/DocsPage';
import TasksPage from './pages/TasksPage';
import { FC, useEffect } from 'react';
import { useNearWallet } from 'react-near';
import Loader from './layouts/Loader';
import AuthLayout from './layouts/AuthLayout';
import NotFoundPage from './pages/NotFoundPage';
import { useWhitelistedContext } from '../contracts/nearcrowd/WhitelistedContext';
import DevPage from './pages/DevPage';

const AppLayout: FC = ({ children }) => <>{children}</>; // utility wrapper

function App() {
    const wallet = useNearWallet();
    const authorized = wallet?.isSignedIn();

    const { callIsAccountWhitelisted } = useWhitelistedContext();

    useEffect(() => {
        if (authorized) {
            callIsAccountWhitelisted();
        }
    }, [authorized, callIsAccountWhitelisted]);

    if (!wallet) {
        return <Loader />;
    }

    return (
        <AppLayout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/docs" element={<DocsPage />} />
                <Route
                    path="/task-sets"
                    element={
                        <AuthLayout>
                            <TasksPage />
                        </AuthLayout>
                    }
                />

                <Route path="*" element={<NotFoundPage />} />

                {process.env.NODE_ENV === 'development' && (
                    <Route path="/dev" element={<DevPage />} />
                )}
            </Routes>
        </AppLayout>
    );
}

export default App;
