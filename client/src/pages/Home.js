import React from 'react';
import { useQuery } from '@apollo/client';

import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

import Search from '../components/Search/Search';

import { QUERY_THOUGHTS } from '../utils/queries';
// import Recipe from '../components/Recipe/Recipe';
// import RecipeList from '../components/RecipeList/RecipeList';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div className='flex-row justify-center'>
        <div className='col-12 col-md-10 mb-3 p-3' style={{ border: '1px dotted #1a1a1a' }}>
          <Search />
        </div>
        <div className='col-12 col-md-10 mb-3 p-3' style={{ border: '1px dotted #1a1a1a' }}>
          <ThoughtForm />
        </div>
        <div className='col-12 col-md-8 mb-3'>{loading ? 
          <div>Loading...</div> : <ThoughtList thoughts={thoughts} title='Some Feed for Thought(s)...' />}</div>
        </div>
        {/*<div className='col-12 col-md-10 mb-3 p-3' style={{ border: '1px dotted #1a1a1a' }}>
          <Recipe />
        </div>
         <div className='col-12 col-md-10 mb-3 p-3' style={{ border: '1px dotted #1a1a1a' }}>
          <RecipeList />
        </div> */}
    </main>
  );
};

export default Home;
