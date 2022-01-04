import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import WhitepaperPage from '../../pages/witepaper';
import HomePage from '../../pages/home';

import {useNear} from "react-near";

export default function App() {
    const near = useNear();
    console.log(near);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/whitepaper" element={<WhitepaperPage />} />
            </Routes>
        </BrowserRouter>
    );
}

