import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_THOUGHT } from '../../utils/mutations';
import { UPDATE_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {

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

  const handleFormSubmit = async (event) => {
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

  if (!thoughts.length) {
    return <h3>No Recipes Yet</h3>;
  }
  
  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${thought.thoughtAuthor}`}
                >
                  {thought.thoughtAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this thought on {thought.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this thought on {thought.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{thought.thoughtText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/thoughts/${thought._id}`}
            >
              Join the discussion on this thought.
            </Link>
            <p
            className={`m-0 ${characterCount === 280 || error ? 'text-danger' : ''
              }`}
            >
              Character Count: {characterCount}/280
            </p>
            <form>
              <div              
                id={thought._id}
                onSubmit={handleFormSubmit}
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
              
              {error && (
                <div className="col-12 my-3 bg-danger text-white p-3">
                  {error.message}
                </div>
              )}
            </form>
            <div
              id={thought._id}
              onClick={handleUpdateThought}
              className="btn btn-primary btn-block btn-squared" type="submit">                
              Edit thought 🗨️
            </div>
            <div              
              id={thought._id}
              onClick={handleDeleteThought}
              className="btn btn-danger btn-block btn-squared cursor">              
              Delete this thought 🗑️
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
