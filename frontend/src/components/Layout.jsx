import React from 'react';
import Header from './Header';
import UserList from './UserList';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-base-200 font-sans text-base-content">
            <Header />
            <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6">
                <aside className="w-full md:w-1/4 lg:w-1/5">
                    <UserList />
                </aside>
                <main className="w-full md:w-3/4 lg:w-4/5">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
