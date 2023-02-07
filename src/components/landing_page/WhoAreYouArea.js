// @ts-nocheck
import {
  COMPANY_NAME,
  PATH_AGENTS_SEARCH_ABSOLUTE,
  PATH_AGENT_CREATE_INFO_ABSOLUTE,
  PATH_AGENT_DASHBOARD,
  PATH_PUBLIC_LISTING,
} from "components/commons/Strings";
import {
  clearPublicListing,
  setSearchParams,
} from "features/listing/publicListingSlice";
import React from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const WhoAreYouArea = () => {
  const agentData = useSelector((store) => store.agent.getAgent.response.data);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const findAllListings = () => {
    const searchParams = {
      for_rent: false,
      for_sale: false,
      location: -1,
      property_category: -1,
      page: 1,
    };

    let urlParm = "";

    dispatch(clearPublicListing());
    dispatch(setSearchParams(searchParams));

    Object.keys(searchParams).forEach((paramKey) => {
      urlParm += `${paramKey}=${searchParams[paramKey]}&`;
    });

    urlParm = urlParm.substring(0, urlParm.length - 1);

    navigate(`${PATH_PUBLIC_LISTING}?${urlParm}`);
  };

  return (
    <div className="container who-are-you mt-5 mb-3">
      {/* <h4>Which one of the following are you?</h4> */}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
        <div className="col card-table">
          {/* <Card className="card-cell">
            <Card.Header className="who-are-you-header flex-center-general py-3">
              <Card.Text className="fw-bold">Are you Agent?</Card.Text>
            </Card.Header>
            <Card.Body>
              <ul className="mb-5">
                <li>{COMPANY_NAME} is here for you to modernize your agency</li>
                <li>Register, list your properties, and reach millions</li>
              </ul>
            </Card.Body>
            <Card.Footer
              className="flex-center-general"
              style={{ position: "absolute", bottom: "0", width: "100%" }}
            >
              <Link
                to={
                  agentData?.id !== undefined
                    ? PATH_AGENT_DASHBOARD
                    : PATH_AGENT_CREATE_INFO_ABSOLUTE
                }
                className="link-general link-size-small link-underline py-2 px-3"
              >
                Work with Us
              </Link>
            </Card.Footer>
          </Card> */}
          <div className="card-cell shadow-lg p-2">
            <div className="flex-center-general">
              <p className="fw-bold">Are you Agent?</p>
            </div>
            <div>
              <ul className="mb-5">
                <li>{COMPANY_NAME} is here for you to modernize your agency</li>
                <li>Register, list your properties, and reach millions</li>
              </ul>
            </div>
            <div className="flex-center-general">
              <Link
                to={
                  agentData?.id !== undefined
                    ? PATH_AGENT_DASHBOARD
                    : PATH_AGENT_CREATE_INFO_ABSOLUTE
                }
                className="link-general link-size-small link-underline py-2 px-3"
              >
                Work with Us
              </Link>
            </div>
          </div>
        </div>
        <div className="col card-table">
          {/* <Card className="card-cell">
            <Card.Header className="who-are-you-header flex-center-general py-3">
              <Card.Text className="fw-bold">Are you property owner?</Card.Text>
            </Card.Header>
            <Card.Body>
              <ul className="mb-5">
                <li>Meet Agents near to you and rent or sell your property</li>
                <li>
                  Find the right agents for your property at {COMPANY_NAME}
                  now
                </li>
              </ul>
            </Card.Body>
            <Card.Footer
              className="flex-center-general"
              style={{ position: "absolute", bottom: "0", width: "100%" }}
            >
              <Link
                to={PATH_AGENTS_SEARCH_ABSOLUTE}
                className="link-general link-size-small link-underline py-2 px-3"
              >
                Find an Agent
              </Link>
              <Link
                to={
                  agentData?.id !== undefined
                    ? PATH_AGENT_DASHBOARD
                    : PATH_AGENT_CREATE_INFO_ABSOLUTE
                }
                className="link-general link-size-small link-underline py-2 px-3"
              >
                List your property
              </Link>
            </Card.Footer>
          </Card> */}
          <div className="card-cell shadow-lg p-2">
            <div className="flex-center-general">
              <p className="fw-bold">Are you property owner?</p>
            </div>
            <div>
              <ul className="mb-5">
                <li>Meet Agents near to you and rent or sell your property</li>
                <li>
                  Find the right agents for your property at {COMPANY_NAME}
                  now
                </li>
              </ul>
            </div>
            <div className="flex-center-general">
              <Link
                to={
                  agentData?.id !== undefined
                    ? PATH_AGENT_DASHBOARD
                    : PATH_AGENT_CREATE_INFO_ABSOLUTE
                }
                className="link-general link-size-small link-underline py-2 px-3"
              >
                List your property
              </Link>
            </div>
          </div>
        </div>

        <div className="col card-table">
          {/* <Card className="card-cell">
            <Card.Header className="who-are-you-header flex-center-general py-3">
              <Card.Text className="fw-bold">
                Are you a Buyer or Tenant?
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <ul className="mb-5">
                <li>
                  {COMPANY_NAME} has listed thousands of properties around your
                  area
                </li>
                <li>Don't waste your time finding a traditional agent</li>
                <li>
                  {COMPANY_NAME} is your agent regardless of wherever you are
                </li>
              </ul>
            </Card.Body>
            <Card.Footer
              className="flex-center-general"
              style={{ position: "absolute", bottom: "0", width: "100%" }}
            >
              <div
                className="link-general link-size-small link-underline py-2 px-3"
                role="button"
                onClick={findAllListings}
              >
                Find Properties
              </div>
              <Link
                to={PATH_AGENTS_SEARCH_ABSOLUTE}
                className="link-general link-size-small link-underline py-2 px-3"
              >
                Find an Agent
              </Link>
            </Card.Footer>
          </Card> */}

          <div className="card-cell shadow-lg p-2">
            <div className="flex-center-general">
              <p className="fw-bold">Are you a Buyer or Tenant?</p>
            </div>
            <div>
              <ul className="mb-5">
                <li>
                  {COMPANY_NAME} has listed thousands of properties around your
                  area
                </li>
                <li>Don't waste your time finding a traditional agent</li>
                <li>
                  {COMPANY_NAME} is your agent regardless of wherever you are
                </li>
              </ul>
            </div>
            <div className="flex-center-general">
              <Link
                to={PATH_AGENTS_SEARCH_ABSOLUTE}
                className="link-general link-size-small link-underline py-2 px-3"
              >
                List your property
              </Link>
            </div>
          </div>
        </div>

        {/* <div className="col card-table">
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
          </div> */}
      </div>
    </div>
  );
};

export default WhoAreYouArea;
