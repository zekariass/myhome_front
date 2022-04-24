import React from "react";
import { Link } from "react-router-dom";

const AgentCreateImportantInfo = () => {
  return (
    <div className="flex-center-general">
      <div className="card text-justify" id="agent-create-important-info">
        <div className="px-3">
          <p className="fs-6 fw-bold flex-center-general text-decoration-underline my-3 ">
            Important information
          </p>
          <p>
            An agent is an organization which can be attached to one or more
            system users that use the system for listing their properties. A
            user must register and attached to an agent in order to use the
            platform's listing property functionality. A user can only create
            and attach to one Agent at a time. When registering your agent,
            please reminde the following:
          </p>
        </div>
        <div className="px-3">
          <ul>
            <li>Agent name should be catchy and rememberable for everyone</li>
            <li>
              Email and contact number must be added so that customers can find
              and contact you
            </li>
            <li>You must add address to your agent office</li>
            <li>
              Prepare your catchy logo. Logo is very good to attract cutomer
              attention
            </li>
          </ul>
        </div>
        <div className="border-bottom"></div>
        <div className="px-3 my-3">
          <p className="fs-6 fw-bold">
            Are you property owner and want to market your product so fast?
          </p>
          <Link
            to=""
            className="link-general link-hover link-underline link-size-small"
          >
            Find suitable property agent closest to your property
          </Link>
        </div>
        <div className="border-bottom"></div>
        <div className="px-3 my-3">
          <p className="fs-6 fw-bold">
            Are you an Agent and want to contact us instead?
          </p>
          <Link
            to=""
            className="link-general link-hover link-underline link-size-small"
          >
            Write to us here and we contact you soon!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AgentCreateImportantInfo;
