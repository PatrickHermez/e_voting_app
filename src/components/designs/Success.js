import React from "react";
import "./app.css";

export default function Success() {
  return (
    <div className="success_wrapper">
      <img src="/success.png" alt="success!" />
      <h1>Success!</h1>
      <h1>
        We have received your vote.
        <br />
        Thank you for your participation!
      </h1>
    </div>
  );
}
