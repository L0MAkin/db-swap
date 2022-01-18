import { Route, Routes } from 'react-router-dom';

import {
    WalletAuthorizedProtectedRoutes,
    WhitelistProtectedRoutes
} from './ProtectedRoutes';

import DevPage from '../pages/DevPage';
import HomePage from '../pages/home/HomePage';
import DocsPage from '../pages/docs/DocsPage';
import NotFoundPage from '../pages/errors/NotFoundPage';
import TasksetPage from '../pages/tasksets/TasksetPage';
import TasksetSelectionPage from '../pages/tasksets/TasksetSelectionPage';

function Router() {
    const isDev = process.env.NODE_ENV === 'development';

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="docs" element={<DocsPage />} />

            {/* wallet authorized routes */}
            <Route element={<WalletAuthorizedProtectedRoutes />}>
                {isDev && <Route path="/dev" element={<DevPage />} />}

                {/* account whitelisted routes */}
                <Route element={<WhitelistProtectedRoutes />}>
                    <Route path="tasksets">
                        <Route index element={<TasksetSelectionPage />} />
                        <Route path=":tasksetId" element={<TasksetPage />} />
                    </Route>
                </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default Router;
