import React, { Component } from "react";

class SearchArea extends Component {
  render() {
    return (
      <div>
        <form>
          <div className="mb-2">
            <button className="btn-general me-2 py-1 px-2">For Rent</button>
            <button className="btn-general py-1 px-2">For Sale</button>
          </div>
          <div className="row search-area">
            <div className="col-xl-5">
              <input
                type="text"
                className="form-control form-control-lg flex-center-general mb-2"
                placeholder="Enter Region, City, Sub-City, etc"
              />
            </div>
            <div className="col-xl-4 flex-center-general">
              <select
                className="form-select form-select-lg mb-2"
                aria-label="property select"
              >
                <option>Apartment</option>
                <option value="1">Villa</option>
                <option value="2">Traditional Home</option>
                <option value="3">Condominium</option>
                <option value="5">Hall</option>
                <option value="1">Office</option>
                <option value="2">Commercial Property</option>
                <option value="3">Land</option>
              </select>
            </div>
            <div className="col-xl-3 d-flex flex-center-general mb-2">
              <button className="btn-general px-3 py-2">Search</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchArea;
