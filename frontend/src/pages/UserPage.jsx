import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import TweetFeed from '../components/TweetFeed';
import CreateTweet from '../components/CreateTweet';
import { useAppContext } from '../context/AppContext';

const UserPage = () => {
    const { userId } = useParams();
    const { users } = useAppContext();

    const user = users.find(u => u.id === parseInt(userId));

    return (
        <Layout>
            <div className="mb-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="avatar placeholder">
                        <div className="bg-primary text-primary-content rounded-full w-16 flex items-center justify-center">
                            <span className="text-2xl">{user?.name?.charAt(0)}</span>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{user?.name}</h1>
                        <p className="text-gray-500">@{user?.userName}</p>
                    </div>
                </div>

                <h2 className="text-xl font-semibold mb-4">Tweets</h2>
                <TweetFeed userId={userId} mode="loadMore" />
            </div>
            <CreateTweet />
        </Layout>
    );
};

export default UserPage;
