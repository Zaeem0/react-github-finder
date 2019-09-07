import React, { Fragment, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Repos from "../repos/Repos";
import PropTypes from "prop-types";
import GithubContext from "../../context/github/githubContext";

const User = ({ repos, getUserRepos, match }) => {
  const githubContext = useContext(GithubContext);
  const { user, getUser, loading } = githubContext;
  console.log("login", user);
  // Load user details and repos on page load
  useEffect(() => {
    console.log(match.params.login);
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable
  } = user;

  if (loading) return <Spinner />;
  return (
    <Fragment>
      <Link to="/" className="btn btn-light my-1">
        Back to Search
      </Link>
      Hireable:{" "}
      {hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img src={avatar_url} alt="" style={{ width: "150px" }} />
          <h1>{name}</h1>
          <a href={html_url}>@{login}</a>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className="btn btn-dark my-1">
            View Github Profile
          </a>
          <ul>
            <li>
              {company && (
                <Fragment>
                  <h3>Company</h3>
                  <p>{company}</p>
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <h3>Website</h3>
                  <p>
                    <a href={blog}>{blog}</a>
                  </p>
                </Fragment>
              )}
            </li>
            <li>
              {location && (
                <Fragment>
                  <h3>Location</h3>
                  <p>{location}</p>
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center" style={{ border: "none" }}>
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      <h2>Repositories</h2>
      <Repos repos={repos} />
    </Fragment>
  );
};

User.propTypes = {
  repos: PropTypes.array.isRequired,
  getUserRepos: PropTypes.func.isRequired
};

export default User;
