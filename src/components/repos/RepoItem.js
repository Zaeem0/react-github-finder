import React from "react";
import PropTypes from "prop-types";

const RepoItem = ({ repo }) => {
  return (
    <div className="card">
      <h3>
        <i class="fas fa-folder" /> <a href={repo.html_url}>{repo.name}</a>
      </h3>
      <p>{repo.description}</p>
    </div>
  );
};

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired
};

export default RepoItem;
