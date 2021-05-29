import React from "react";
import "./app.css";

/**
 * @param {object} object
 * @param {function} object.start
 */
export default function Welcome({ start }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="envelope_wrapper">
      {/* header */}
      <header>
        <h1>
          Welcome!
          <br />
          USJ ELECTIONS OCTOBER 2022
        </h1>
      </header>

      <div
        onClick={start}
        className={`envelope${open ? "" : " fold"}`}
        onMouseOver={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="top" />
        <div className="left" />
        <div className="back">
          <div className="paper">
            <p style={{ textAlign: "center" }}>Click here to start!</p>
          </div>
        </div>
        <div className="right" />
        <div className="bottom" />
      </div>

      {/* get started */}
      <h3>Get Started!</h3>
    </div>
  );
}
