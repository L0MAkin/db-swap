import { Route, Routes } from 'react-router-dom';

import Protected from './Protected';

import DevPage from '../components/pages/dev/DevPage';
import HomePage from '../components/pages/home/HomePage';
import DocsPage from '../components/pages/docs/DocsPage';
import NotFoundPage from '../components/pages/errors/NotFoundPage';
import TasksetListPage from '../components/pages/tasksets/TasksetListPage';
import AssignmentPage from '../components/pages/assignment/AssignmentPage';

function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="docs" element={<DocsPage />} />

            <Route element={<Protected.Authorized />}>
                <Route element={<Protected.Whitelisted />}>
                    <Route path="assignment" element={<AssignmentPage />} />
                    <Route path="tasksets">
                        <Route index element={<TasksetListPage />} />
                        {/*<Route path=":id" element={<TasksetPage />} />*/}
                    </Route>
                </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />

            {process.env.NODE_ENV === 'development' && <Route path="dev" element={<DevPage />} />}
        </Routes>
    );
}

export default Router;
