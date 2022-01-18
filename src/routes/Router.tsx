import { Route, Routes } from 'react-router-dom';

import DevPage from '../pages/DevPage';
import HomePage from '../pages/home/HomePage';
import DocsPage from '../pages/docs/DocsPage';
import NotFoundPage from '../pages/errors/NotFoundPage';
import TasksetPage from '../pages/tasksets/TasksetPage';
import TasksetSelectionPage from '../pages/tasksets/TasksetSelectionPage';

function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="docs" element={<DocsPage />} />
            <Route path="tasksets">
                <Route index element={<TasksetSelectionPage />} />
                <Route path=":tasksetId" element={<TasksetPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />

            {process.env.NODE_ENV === 'development' && (
                <Route path="/dev" element={<DevPage />} />
            )}
        </Routes>
    );
}

export default Router;
