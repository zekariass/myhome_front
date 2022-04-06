import React, { Component } from "react";
import { Link } from "react-router-dom";
import Apartment from "./images/apartment.jpg";

class PropertyAlbum extends Component {
  render() {
    return (
      <div className="container">
        <h4>Choose properties by category</h4>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-xxl-4 g-3">
          <div className="col card-table">
            <div className="card shadow rounded card-cell">
              <img
                src={Apartment}
                alt="Apartment"
                width="100%"
                height="225"
                className="rounded-top"
              />
              <div className="card-body flex-center-general ">
                <div className="mb-5">
                  <h4 className="flex-center-general">Apartments</h4>
                  <p className="card-text flex-center-general">
                    Find apartments around your area for rent or sale.
                  </p>
                </div>
                <div className="card-btn">
                  <button type="button" className="btn btn-general">
                    See Apartments
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col card-table">
            <div className="card shadow rounded card-cell">
              <img
                src={Apartment}
                alt="Apartment"
                width="100%"
                height="225"
                className="rounded-top"
              />
              <div className="card-body flex-center-general">
                <div className="mb-5">
                  <h4 className="flex-center-general">Traditional Homes</h4>
                  <p className="card-text flex-center-general">
                    Find traditional homes around your area for rent or sale.
                  </p>
                </div>
                <div className="card-btn">
                  <button type="button" className="btn btn-general">
                    See Traditional Homes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col card-table">
            <div className="card shadow rounded card-cell">
              <img
                src={Apartment}
                alt="Apartment"
                width="100%"
                height="225"
                className="rounded-top"
              />
              <div className="card-body flex-center-general">
                <div className="mb-5">
                  <h4 className="flex-center-general">Condominiums</h4>
                  <p className="card-text flex-center-general">
                    Find condominiums around your area for rent or sale.
                  </p>
                </div>
                <div className="card-btn">
                  <button type="button" className="btn btn-general">
                    See condominiums
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col card-table">
            <div className="card shadow rounded card-cell">
              <img
                src={Apartment}
                alt="Apartment"
                width="100%"
                height="225"
                className="rounded-top"
              />
              <div className="card-body flex-center-general">
                <div className="mb-5">
                  <h4 className="flex-center-general">Commercial Properties</h4>
                  <p className="card-text flex-center-general">
                    Find commercial properties around your area for rent or
                    sale.
                  </p>
                </div>
                <div className="card-btn">
                  <button type="button" className="btn btn-general">
                    See Commercial Properties
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-5">
          <div className="row row-cols-2  row-cols-lg-4 g-3">
            <div className="col flex-center-general">
              <Link
                to="/"
                className="link-general album-link p-3 rounded shadow"
              >
                Find offices for rent
              </Link>
            </div>
            <div className="col flex-center-general">
              <Link
                to="/"
                className="link-general album-link p-3 rounded shadow"
              >
                Find offices for rent
              </Link>
            </div>
            <div className="col flex-center-general">
              <Link
                to="/"
                className="link-general album-link p-3 rounded shadow"
              >
                Find offices for rent
              </Link>
            </div>
            <div className="col flex-center-general">
              <Link
                to="/"
                className="link-general album-link p-3 rounded shadow"
              >
                Find offices for rent
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PropertyAlbum;
