import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_THOUGHT } from '../../utils/mutations';
import Auth from '../../utils/auth';

const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  const [deleteThought, { error }] = useMutation(DELETE_THOUGHT)

  const handleDeleteThought = async (event) => {
    const thoughtIdToDelete = event.target.id
    console.log("Deleting this thought", thoughtIdToDelete)

    try {
      const { data } = await deleteThought ({
        variables: { thoughtId: thoughtIdToDelete },
      });
      
      console.log(data);

    }
    catch (err) {
      console.error(err);
    }
  };

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
            <div
              
              id={thought._id}
              onClick={handleDeleteThought}
              className="btn btn-danger btn-block btn-squared"
              
            >
              Delete this thought X
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
