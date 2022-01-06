import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { FC, ReactNode } from 'react';
import HowItWorksPage from '../pages/HowItWorksPage';
import HomePage from '../pages/HomePage';
import TasksPage from '../pages/TasksPage';

import NavBar from '../NavBar/NavBar';
import AuthorizedLayout from '../layouts/AuthorizedLayout';

const AppLayout: FC<ReactNode> = ({ children }) => <main>{children}</main>;

function App() {
    return (
        <BrowserRouter>
            <AppLayout>
                <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/tasks"
                        element={
                            <AuthorizedLayout>
                                <TasksPage />
                            </AuthorizedLayout>
                        }
                    />
                    <Route
                        path="/how-it-works"
                        element={
                            <AuthorizedLayout>
                                <HowItWorksPage />
                            </AuthorizedLayout>
                        }
                    />
                </Routes>
            </AppLayout>
        </BrowserRouter>
    );
}

export default App;
