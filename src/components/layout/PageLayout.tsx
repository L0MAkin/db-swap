import { FC } from 'react';

const PageLayout: FC = ({ children }) => {
    return (
        <div className="h-screen flex flex-col">

            <main className="flex-1 h-max container p-6 mx-auto">{children}</main>
        </div>
    );
};

export default PageLayout;
