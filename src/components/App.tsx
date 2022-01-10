import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import DocsPage from './pages/DocsPage';
import TasksPage from './pages/TasksPage';
import { FC } from 'react';
import AuthorizedLayout from './layouts/AuthorizedLayout';
import { useNearWallet } from 'react-near';
import Loader from './layouts/Loader';

const AppLayout: FC = ({ children }) => <>{children}</>; // utility wrapper

function App() {
    const wallet = useNearWallet();

    if (!wallet) {
        return <Loader />;
    }

    return (
        <AppLayout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/docs" element={<DocsPage />} />
                <Route
                    path="/tasks"
                    element={
                        <AuthorizedLayout>
                            <TasksPage />
                        </AuthorizedLayout>
                    }
                />
            </Routes>
        </AppLayout>
    );
}

export default App;
