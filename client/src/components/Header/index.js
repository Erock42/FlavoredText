import React from 'react';
import { Link } from 'react-router-dom';
import "../Header/index.css";
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">FlavoredText</h1>
          </Link>
          <p className="m-0">Find your Flavor & Tell the World.</p>
        </div>

        {/* <div className='col-12 col-md-10 mb-3 p-3' style={{ border: '1px dotted #1a1a1a' }}>
          <Search />
        </div> */}

        {/* Search button */}
        {/*<Link className="btn btn-info m-2" to="/search">
          <button className='search-button' type='submit'>
            Search
          </button>
      </Link>*/}
        <div>
          {Auth.loggedIn() ? (
            <>
              {/* <Link className="btn btn-info m-2" to="/search">
                <button className='search-button' type='submit'>
                  Search
                </button>
              </Link> */}
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
