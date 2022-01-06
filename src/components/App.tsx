import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import DocsPage from './pages/DocsPage';
import TasksPage from './pages/TasksPage';

// const AppLayout: FC = ({ children }) => <>{children}</>; // utility wrapper

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/docs" element={<DocsPage />} />
        </Routes>
    );
}

export default App;
