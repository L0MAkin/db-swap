import { Route, Routes } from 'react-router-dom';

import {
    WalletAuthorizedProtectedRoutes,
    WhitelistProtectedRoutes
} from './Protected';

import DevPage from '../routes/dev';
import HomePage from '../routes/index';
import DocsPage from '../routes/docs';
import NotFoundPage from '../routes/404';
import TasksetPage from '../routes/tasksets/id';
import TasksetSelectionPage from '../routes/tasksets/index';

function Router() {
    const isDev = process.env.NODE_ENV === 'development';

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="docs" element={<DocsPage />} />

            {/* wallet authorized routing */}
            <Route element={<WalletAuthorizedProtectedRoutes />}>
                {isDev && <Route path="dev" element={<DevPage />} />}

                {/* account whitelisted routing */}
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
