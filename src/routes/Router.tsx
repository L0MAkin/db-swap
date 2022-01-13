import { Route, Routes } from 'react-router-dom';

import HomePage from '../pages/home/HomePage';
import DocsPage from '../pages/docs/DocsPage';
import TaskSetsPage from '../pages/tasksets/TaskSetsPage';
import NotFoundPage from '../pages/errors/NotFoundPage';
import DevPage from '../pages/DevPage';
import WithAuth from './WithAuth';

function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route
                path="/task-sets"
                element={
                    <WithAuth>
                        <TaskSetsPage />
                    </WithAuth>
                }
            />

            <Route path="*" element={<NotFoundPage />} />

            {process.env.NODE_ENV === 'development' && (
                <Route path="/dev" element={<DevPage />} />
            )}
        </Routes>
    );
}

export default Router;
