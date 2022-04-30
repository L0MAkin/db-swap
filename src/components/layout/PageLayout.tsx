import { FC } from 'react';
import Navbar from './Navbar';

const PageLayout: FC = ({ children }) => {
    return (
        <div className="h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 h-max container p-6 mx-auto">{children}</main>
        </div>
    );
};

export default PageLayout;
