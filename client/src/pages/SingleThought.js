import React from 'react';
import { useState } from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_THOUGHT } from '../utils/queries';

import { useMutation } from '@apollo/client';
import { DELETE_THOUGHT } from '../utils/mutations';
import { UPDATE_THOUGHT } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { QUERY_THOUGHTS } from '../utils/queries';


import Auth from '../utils/auth';
import Home from './Home';

const SingleThought = () => {

  const [thoughtText, setThoughtText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  // delete thought
  const [deleteThought] = useMutation(DELETE_THOUGHT,
    {refetchQueries: [ QUERY_ME ]
    })

  const handleDeleteThought = async (event) => {
    const thoughtIdToDelete = event.target.id
    console.log("Deleting this thought", thoughtIdToDelete)

    try {
      const { data } = await deleteThought ({
        variables: { thoughtId: thoughtIdToDelete },
      });
      
      console.log(data);
      //window.location.reload()

    }
    catch (err) {
      console.error(err);
    }

    if (!thought) {
      return Home();
    };
  };
  // update thought
  const [updateThought, { error }] = useMutation(UPDATE_THOUGHT, {
    update(cache, { data: { updateThought } }) {
      try {
        const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

        cache.writeQuery({
          query: QUERY_THOUGHTS,
          data: { thoughts: [updateThought, ...thoughts] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, thoughts: [...me.thoughts, updateThought] } },
      });
    },
  });
    
    const handleUpdateThought = async (event) => {
      event.preventDefault();

    try {
      const { data } = await updateThought({
        variables: {
          thoughtText,
          thoughtAuthor: Auth.getProfile().data.username,
        },
      });

      console.log(data);

      setThoughtText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'thoughtText' && value.length <= 280) {
      setThoughtText(value);
      setCharacterCount(value.length);
    }
  };


  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
    // pass URL parameter
    variables: { thoughtId: thoughtId },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className='my-3'>
      <h3 className='card-header bg-dark text-light p-2 m-0'>
        {thought.thoughtAuthor} <br />
        <span style={{ fontSize: '1rem' }}>had this thought on {thought.createdAt}</span>
      </h3>
      <div className='bg-light py-4'>
        <blockquote
          className='p-4'
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {thought.thoughtText}
        </blockquote>
      </div>

        <p
        className={`m-0 ${characterCount === 280 || error ? 'text-danger' : ''
          }`}
        >
          Character Count: {characterCount}/280
        </p>
        <form>
          <div              
            id={thought._id}
            onSubmit={handleUpdateThought}
            className="btn --secondaryAccent btn-block btn-squared"              
          >
            <textarea
              name="thoughtText"
              placeholder="What's changed?"
              value={thoughtText}
              className="form-input w-100"
              style={{ lineHeight: '1.5', resize: 'vertical' }}
              onChange={handleChange}
            ></textarea>
          </div>
          <button className="btn btn-primary btn-block btn-squared cursor" type="submit">                
            Edit thought 🗨️
          </button>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3 cursor">
              {error.message}
            </div>
          )}
        </form>
        <div              
          id={thought._id}
          onClick={handleDeleteThought}
          className="btn btn-danger btn-block btn-squared cursor">              
          Delete this thought 🗑️
        </div>

      <div className='my-5'>
        <CommentList comments={thought.comments} />
      </div>
      <div className='m-3 p-4' style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm thoughtId={thought._id} />
      </div>
    </div>
  );
};

export default SingleThought;
