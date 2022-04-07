import { COMPANY_NAME } from "components/commons/Strings";
import React, { Component } from "react";

export class WhoAreYouArea extends Component {
  render() {
    return (
      <div className="container who-are-you mt-5 mb-3">
        <h4>Which one of the following are you?</h4>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
          <div className="col card-table">
            <div className="card card-cell shadow-sm">
              <div className="who-are-you-header flex-center-general py-1">
                <h4>Are you Agent?</h4>
              </div>
              <div className="card-body flex-center-general">
                <ul className="mb-5">
                  <li>
                    {COMPANY_NAME} is here for you to modernize your agency
                  </li>
                  <li>Register, list your properties, and reach millions</li>
                </ul>
                <div className="card-btn">
                  <button className="btn-general py-2 px-3">Register</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col card-table">
            <div className="card card-cell shadow-sm">
              <div className="who-are-you-header flex-center-general py-1">
                <h4>Are you property owner?</h4>
              </div>
              <div className="card-body flex-center-general">
                <ul className="mb-5">
                  <li>
                    Meet Agents near to you and rent or sell your property
                  </li>
                  <li>
                    Find the right agents for your property at {COMPANY_NAME}{" "}
                    now
                  </li>
                </ul>
                <div className="card-btn">
                  <button className="btn-general py-2 px-3">
                    Find an Agent
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col card-table">
            <div className="card card-cell shadow-sm">
              <div className="who-are-you-header flex-center-general py-1">
                <h4>Are you a Buyer or Tenant?</h4>
              </div>
              <div className="card-body flex-center-general">
                <ul className="mb-5">
                  <li>
                    {COMPANY_NAME} has listed thousands of properties around
                    your area
                  </li>
                  <li>Don't waste your time finding a traditional agent</li>
                  <li>
                    {COMPANY_NAME} is your agent regardless of wherever you are
                  </li>
                </ul>
                <div className="card-btn">
                  <button className="btn-general py-2 px-3">
                    Find an Agent
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WhoAreYouArea;
