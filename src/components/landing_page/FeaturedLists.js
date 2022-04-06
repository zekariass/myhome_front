import React, { Component } from "react";
import Apartment from "./images/apartment.jpg";

class FeaturedLists extends Component {
  render() {
    return (
      <div className="featured-list-container">
        <div className="container">
          <h4>Featured Lists</h4>
          <div
            className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 g-4 mx-4"
            id="featured-list-carousel"
          >
            <div className="col card-table">
              <div className="p-3 card card-cell shadow rounded">
                <div className="flex-center-general">
                  <img
                    src={Apartment}
                    alt="Apartment"
                    width="150"
                    height="150"
                    className="featured-list-image"
                  />
                </div>
                <div className="card-body flex-center-general">
                  <div className="mb-5">
                    <h4 className="flex-center-general">5,000 Birr</h4>
                    <p className="card-text flex-center-general">
                      One bed, shared kitchen, Shared bathroom
                    </p>
                    <p className="card-text flex-center-general">
                      One bed, shared kitchen, Shared bathroom
                    </p>
                    <p className="card-text flex-center-general fst-italic">
                      Kazanchis, Addis Ababa
                    </p>
                  </div>
                  <div className="card-btn">
                    <button type="button" className="btn btn-general">
                      See detail
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col card-table">
              <div className="p-3 card card-cell shadow rounded">
                <div className="flex-center-general">
                  <img
                    src={Apartment}
                    alt="Apartment"
                    width="150"
                    height="150"
                    className="featured-list-image"
                  />
                </div>
                <div className="card-body flex-center-general">
                  <div className="mb-5">
                    <h4 className="flex-center-general">4,000 Birr</h4>
                    <p className="card-text flex-center-general">
                      One bed, shared kitchen, Shared bathroom
                    </p>
                    <p className="card-text flex-center-general">
                      One bed, shared kitchen, Shared bathroom
                    </p>

                    <p className="card-text flex-center-general fst-italic">
                      Gerji, Addis Ababa
                    </p>
                  </div>
                  <div className="card-btn">
                    <button type="button" className="btn btn-general">
                      See detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col card-table">
              <div className="p-3 card card-cell shadow rounded">
                <div className="flex-center-general">
                  <img
                    src={Apartment}
                    alt="Apartment"
                    width="150"
                    height="150"
                    className="featured-list-image"
                  />
                </div>
                <div className="card-body flex-center-general">
                  <div className="mb-5">
                    <h4 className="flex-center-general">6,000 Birr</h4>
                    <p className="card-text flex-center-general">
                      One bed, shared kitchen, Shared bathroom
                    </p>
                    <p className="card-text flex-center-general">
                      One bed, shared kitchen, Shared bathroom
                    </p>

                    <p className="card-text flex-center-general fst-italic">
                      Piazza, Addis Ababa
                    </p>
                  </div>
                  <div className="card-btn">
                    <button type="button" className="btn btn-general">
                      See detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col card-table">
              <div className="p-3 card card-cell shadow rounded">
                <div className="flex-center-general">
                  <img
                    src={Apartment}
                    alt="Apartment"
                    width="150"
                    height="150"
                    className="featured-list-image"
                  />
                </div>
                <div className="card-body flex-center-general">
                  <div className="mb-5">
                    <h4 className="flex-center-general">12,000 Birr</h4>
                    <p className="card-text flex-center-general">
                      One bed, shared kitchen, Shared bathroom
                    </p>
                    <p className="card-text flex-center-general">
                      Two bed, shared kitchen, Shared bathroom
                    </p>

                    <p className="card-text flex-center-general fst-italic">
                      Kolfe, Addis Ababa
                    </p>
                  </div>
                  <div className="card-btn">
                    <button type="button" className="btn btn-general">
                      See detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row" id="featured-list-control">
          <div className="col d-flex justify-content-start">
            <div className="featured-list-control-item">
              <i className="arrow chevron left big icon"></i>
            </div>
          </div>
          <div className="col d-flex justify-content-end">
            <div className="featured-list-control-item">
              <i className="arrow chevron right big icon"></i>
            </div>
          </div>
        </div>
        <div
          id="load-more-btn"
          className="d-flex align-content-center justify-content-center my-3"
        >
          <button className="btn-general p-2">Load More</button>
        </div>
      </div>
    );
  }
}

export default FeaturedLists;
