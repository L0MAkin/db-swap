import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useNear } from 'react-near';
import WhitepaperPage from '../pages/WitepaperPage';
import HomePage from '../pages/HomePage';

export default function App() {
    const near = useNear();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/whitepaper" element={<WhitepaperPage />} />
            </Routes>
        </BrowserRouter>
    );
}
