import { FC } from 'react';
import NavBar from './NavBar';

const PageLayout: FC = ({ children }) => {
    return (
        <div className="h-screen flex flex-col">
            <NavBar />

            <main className="flex-1 h-max container p-6">{children}</main>
        </div>
    );
};

export default PageLayout;
