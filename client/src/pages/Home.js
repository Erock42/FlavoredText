import React from 'react';
import { useQuery } from '@apollo/client';

import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

import Search from '../components/Search/Search';
import TopRecipes from '../components/TopRecipes/TopRecipes';

import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div className="container">
      <div className='flex-row container'>
        <div className='col-12 col mb-3 p-1' style={{ border: '1px dotted #1a1a1a' }}>
          {/****** this one needs to go to the left side ******/}
          <Search />
        </div>
        <div className='col-12 col-6 mb-3 p-2' style={{ border: '1px dotted #1a1a1a' }}>
            {/***** this one needs to go to the right side *****/}
          {/*<TopRecipes />*/}
        </div>
        <div className='col-12 col mb-3 p-3' style={{ border: '1px dotted #1a1a1a' }}>
            {/***** stay on the middle *****/}
          <ThoughtForm />
        </div>
        <div className='col-12 col-md-8 mb-3'>{loading ? <div>Loading...</div> : <ThoughtList thoughts={thoughts} title='Some Feed for Thought(s)...' />}</div>
      </div>
      </div>
    </main>
  );
};

export default Home;
