import { FC } from 'react';
import Navbar from './Navbar';

const PageLayout: FC = ({ children }) => {
    return (
        <div className="h-screen flex flex-col bg-gray-100">
            <Navbar />

            <main className="flex-1 h-max container p-6">{children}</main>
        </div>
    );
};

export default PageLayout;
