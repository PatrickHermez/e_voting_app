// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React from "react";
import * as microsoftTeams from "@microsoft/teams-js";
import Welcome from "../designs/Welcome";

import { lists } from "../../models.json";
import Success from "../designs/Success";
import Navbar from "../globals/Navbar";
import VoterApi from "../../backend/VoterApi";

/**
 * The 'PersonalTab' component renders the main tab content
 * of your app.
 */
class Tab extends React.Component {
  initialState = {
    welcome: true, // welcoming page
    success: false, // voting success

    selectedList: null, // currently selected list
    selectedCandidate: null, // currently selected candidate

    showSubmitButton: false, // boolean for submit button to show/hide
  };

  falseState = {
    ...this.initialState,
    welcome: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.initialState,
      context: {},
    };

    this.submit = this.submit.bind(this);
    this.selectWhiteList = this.selectWhiteList.bind(this);
  }

  //React lifecycle method that gets called once a component has finished mounting
  //Learn more: https://reactjs.org/docs/react-component.html#componentdidmount
  componentDidMount() {
    // Get the user context from Teams and set it in the state
    microsoftTeams.getContext((context, error) => {
      this.setState({
        context: context,
      });
    });
    // Next steps: Error handling using the error object
  }

  /**
   * Select a list
   * @param {object} list - the list to select
   */
  selectList(list) {
    this.setState(
      (state) => ({
        selectedList: state.selectedList?.id == list.id ? null : list,
        selectedCandidate: null,
      }),
      () => {
        this.setState({
          showSubmitButton: false,
        });
      }
    );
  }

  /**
   * Select a candidate
   * @param {object} candidate - the candidate to select
   */
  selectCandidate(candidate) {
    this.setState({
      selectedCandidate: candidate,
      showSubmitButton: true,
    });
  }

  selectWhiteList() {
    this.setState({
      selectedList: {
        id: 1000000000,
        name: "Whitelist",
      },
      selectedCandidate: {
        id: 0,
        name: "No Candidate",
      },
      showSubmitButton: true,
    });
  }

  submit() {
    // convert super big number to string (NOT READABLE BY ANY PROGRAMMING LANGUAGE OTHERWISE)
    const selectedListId = this.state.selectedList.id
      .toLocaleString()
      .replace(/[, ]+/g, "");

    // convert super big number to string (NOT READABLE BY ANY PROGRAMMING LANGUAGE OTHERWISE)
    const selectedCandidateId = this.state.selectedCandidate.id
      .toLocaleString()
      .replace(/[, ]+/g, "");

    VoterApi.create_voter({
      list: selectedListId,
      candidate: selectedCandidateId,
    })
      .then((res) => {
        console.log(res);
        this.setState({ success: true });
      })
      .catch(console.error);
  }

  render() {
    const { selectedCandidate, selectedList } = this.state;

    const navbar = (
      <Navbar
        homepageLink={() => this.setState(this.initialState)}
        votingpageLink={() => this.setState(this.falseState)}
      />
    );

    if (this.state.welcome) {
      return (
        <>
          {navbar}
          <Welcome start={() => this.setState(this.falseState)} />
        </>
      );
    }

    if (this.state.success) {
      return (
        <>
          {navbar}
          <Success />
        </>
      );
    }

    return (
      <div className="lists_wrapper">
        {navbar}

        {/* title */}
        <h1>Vote to your most preferred list/candidate!</h1>
        {/* lists */}
        {lists.map((list) => (
          <ul
            className={`list${selectedList?.id == list.id ? " selected" : ""}`}
            key={list.id}
          >
            <header>
              {/* list name */}
              {list.name.toLowerCase() != "whitelist" && (
                <img
                  style={{
                    transform:
                      selectedList?.id != list.id
                        ? "rotateZ(90deg)"
                        : "rotateZ(-90deg)",
                  }}
                  src="/chevron.svg"
                  height="16px"
                  width="16px"
                />
              )}
              <span onClick={() => this.selectList(list)}>{list.name}</span>
            </header>

            {/* candidates */}
            {list.candidates.map((candidate) => (
              <li
                className={`candidate${
                  selectedCandidate?.id == candidate.id ? " selected" : ""
                }`}
                onClick={() => this.selectCandidate(candidate)}
                key={candidate.id}
              >
                <img
                  src={candidate.imageUrl}
                  alt={candidate.name}
                  style={{ maxWidth: "48px", objectFit: "scale-down" }}
                />
                <span style={{ verticalAlign: "top", marginLeft: "0.5em" }}>
                  {candidate.name}
                </span>
              </li>
            ))}
          </ul>
        ))}
        {/* separate whitelist */}
        <section
          className="list"
          style={{
            border:
              selectedList?.id == 0
                ? "1px solid #30385966"
                : "1px solid #f0f0ff",
          }}
        >
          <header>
            <span onClick={this.selectWhiteList}>Whitelist</span>
          </header>
        </section>

        {/* submit button */}
        {this.state.showSubmitButton ? (
          <button className="submit_button" onClick={this.submit}>
            Submit
          </button>
        ) : (
          // empty static div for no UI bugs
          <div style={{ height: "32px" }} />
        )}
      </div>
    );
  }
}
export default Tab;
