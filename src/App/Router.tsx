import { Route, Routes } from 'react-router-dom';
import HomePage from '../components/pages/home/HomePage';
import NotFoundPage from '../components/pages/errors/NotFoundPage';




function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default Router;
