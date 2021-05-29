import axios from "axios";

const api_url = "https://evotingserver.herokuapp.com";
// const api_url = "http://localhost:8080";

// all backend routes
const routes = {
  create_voter: `${api_url}/create_voter`,
};

/**
 * Make request to the requested API with set headers
 * @param {string} method - HTTP Request Method
 * @param {string} url - Path to the API
 * @param {object} data - data to send to the api
 * @returns {object} data placed in the database
 */
async function request(method, url, data) {
  return axios({
    method,
    url,
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((res) => res.data);
}

function VoterApi() {
  /**
   * @param {object} voter - Voter
   * @param {string} voter.id - Voter's ID
   * @param {string} voter.list - Voted List
   * @param {string} voter.candidate - Voted Candidate
   */
  async function create_voter(voter) {
    return request("POST", routes.create_voter, voter);
  }

  return {
    create_voter,
  };
}

export default VoterApi();
