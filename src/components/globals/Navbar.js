import React from "react";

/**
 * @param {object} object
 * @param {function} object.homepageLink
 * @param {function} object.votingpageLink
 */
export default function Navbar({ homepageLink, votingpageLink }) {
  return (
    <div className="navbar">
      <figure>
        <img src="/logo.png" height="100%" />
      </figure>

      <nav>
        <p onClick={homepageLink}>Home</p>
        <p onClick={votingpageLink}>Voting Board</p>
      </nav>
    </div>
  );
}
