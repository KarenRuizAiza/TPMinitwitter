import React from 'react';
import Layout from '../components/Layout';
import TweetFeed from '../components/TweetFeed';
import CreateTweet from '../components/CreateTweet';

const Home = () => {
    return (
        <Layout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-4">Los tweets más recientes</h1>
                <TweetFeed mode="pagination" />
            </div>
            <CreateTweet />
        </Layout>
    );
};

export default Home;
