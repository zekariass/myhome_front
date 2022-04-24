import { PATH_AGENTS_ADD_ABSOLUTE } from "components/commons/Strings";
import React from "react";
import { Link } from "react-router-dom";
import Logo2 from "../grinmove-logo2.png";

function AgentCreateInfo() {
  return (
    <div className="container px-5 my-3">
      <section>
        <div className="row g-3">
          <div className="col-md-8 card-table">
            <div className="p-3 border other-bg rounded-3 card-cell">
              <div className="flex-center-general">
                <img src={Logo2} alt="logo placeholder" />
              </div>
              <p className="fs-5 fw-bold flex-center-general">
                Oops! It seems that you have no Agent
              </p>
              <p className="fs-5 flex-center-general">
                Would you like to work with us as an agent?
              </p>
              <p className="fs-5 px-4 flex-center-general align-items-center">
                Create an agent for free and list your properties to reach
                millions across the world. We are here to ease simplify your
                work!
              </p>
            </div>
          </div>
          <div className="col-md-4 mt-5">
            <div>
              <div className="p-3 border rounded-3">
                <p className="fs-4 flex-center-general fw-bold">
                  Agent not found!
                </p>
                <div className="flex-center-general">
                  <Link
                    to={PATH_AGENTS_ADD_ABSOLUTE}
                    className="btn btn-general btn-general-hover p-3 mt-3"
                  >
                    Create an Agent
                  </Link>
                </div>
              </div>
            </div>
            <div className="my-3">
              <div className="p-3 border rounded-3">
                <p className="fs-4 flex-center-general fw-bold">
                  Berhane Mesfin!
                </p>
                <div className="flex-center-general">
                  <button className="btn-general btn-general-hover p-3 mt-3">
                    Find an Agent
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-4">
        <div className="row">
          <div className="col-md-8">
            <p className="fs-4">Let's work together!</p>
            <p>
              Our services are very modern and agent-oriented. We are here to
              work with you, not to prosper alone. Our platform is very
              available and reachable to everyone.
            </p>
          </div>
          {/* <div className="col"></div> */}
        </div>
      </section>
      <section>
        <div>
          <p className="fs-4">What are our services?</p>
        </div>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          <div className="col card-table">
            <div className="card card-cell p-3 jumbotron-general">
              <div className="card-body">
                <h5 className="card-title mb-4 flex-center-general fw-bold">
                  Add your properties only once!
                </h5>
                <p className="card-text">
                  Our platform allows you to add your property only once. After
                  you registered your property, you can list it for the public
                  for rent or for sale as you want, manage your property very
                  easily for as long as you want by using our platform. It is
                  free to register your properties.
                </p>
                <p>
                  Do you want to read more?{" "}
                  <span>
                    <Link to="/" className="link-general link-general-hover">
                      Click here
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="col card-table">
            <div className="card card-cell p-3 jumbotron-general">
              <div className="card-body">
                <h5 className="card-title mb-4 flex-center-general fw-bold">
                  Make available your property for public!
                </h5>
                <p className="card-text">
                  Our platform allows you to list your property so that the
                  public can see it. You can choose either for sale or for rent
                  category to publicize your property. You can list and unlist
                  the property at any time you want.
                </p>
                <p>
                  Do you want to read more?{" "}
                  <span>
                    <Link to="/" className="link-general link-general-hover">
                      Click here
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="col card-table">
            <div className="card card-cell p-3 jumbotron-general">
              <div className="card-body">
                <h5 className="card-title mb-4 flex-center-general fw-bold">
                  Manage your property as you want!
                </h5>
                <p className="card-text">
                  Once you add your property to our platform, our platform is
                  not only a place where you register and publicize it. But it
                  allows you add schools, transportation facilities and any
                  point of attractions that may attract tenant's or buyers
                  attention. In addition to that our platform allows you to add
                  many pictures of the property, video and 3D virtual scenes of
                  your property so that buyers or tenants can know about the
                  property remotely and decide about it.
                </p>
                <p>
                  Do you want to read more?{" "}
                  <span>
                    <Link to="/" className="link-general link-general-hover">
                      Click here
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="col card-table">
            <div className="card card-cell p-3 jumbotron-general">
              <div className="card-body">
                <h5 className="card-title mb-4 flex-center-general fw-bold">
                  Allows you to use a payment method that best suits you!
                </h5>
                <p className="card-text">
                  Our platform has many payment methods that you can choose
                  from. We understand that payment methods are a major problem
                  for digitalization in our country. Don't worry! we have all
                  available options for you to run your business without hassle.
                </p>
                <p>
                  Do you want to see all available payment methods??
                  <span>
                    <Link to="/" className="link-general link-general-hover">
                      Click here
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-3">
          <Link
            to="/"
            className="link-general link-general-hover link-underline"
          >
            Click here to read about all our services
          </Link>
        </div>
      </section>
      <section>
        <div className="row row-cols-1 row-cols-lg-2">
          <div className="col pe-lg-5 my-3">
            <p className="fs-4">Are you a property owner instead?</p>
            <p>
              Don't worry! our platform allows you to find the nearest agent to
              your property. Why do you take the hassle of managing your
              property while our agent can do it on your behalf of you? Hit the
              following button and find the right agent for your property.
            </p>
            <div>
              <Link
                to="/"
                className="link-general link-general-hover link-underline"
              >
                Find an Agent
              </Link>
            </div>
          </div>
          <div className="col px-lg-5 my-3">
            <p className="fs-4">
              Are you a property owner and do you want to manage your property
              instead?
            </p>
            <p>
              Why not! create yourself as an agent and list your properties. Our
              platform has no right to choose who the agent is, right? go for
              it!
            </p>
            <div>
              <Link
                to="/"
                className="link-general link-general-hover link-underline"
              >
                Create an Agent
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AgentCreateInfo;
