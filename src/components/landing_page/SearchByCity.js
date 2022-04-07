import React, { Component } from "react";
import { Link } from "react-router-dom";

export class SearchByCity extends Component {
  getCitiesForRegion = () => {
    return (
      <div className="row row-cols-auto g-4">
        <div className="col">
          <Link to="/" className="link-general">
            Adama
          </Link>
        </div>
        <div className="col">
          <Link to="/" className="link-general">
            Bishoftu
          </Link>
        </div>
        <div className="col">
          <Link to="/" className="link-general">
            Shashemene
          </Link>
        </div>
        <div className="col">
          <Link to="/" className="link-general">
            Asela
          </Link>
        </div>
        <div className="col">
          <Link to="/" className="link-general">
            Jima
          </Link>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="container mt-5">
        <h4>Search property by city and region</h4>
        <div className=" search-by-city my-3 shadow-sm">
          <div className="row row-cols-auto flex-center-general g-3">
            <div className="col">
              <button className="btn-general-outline">Addis Ababa</button>
            </div>
            <div className="col">
              <button className="btn-general-outline">Oromia</button>
            </div>
            <div className="col">
              <button className="btn-general-outline">Amhara</button>
            </div>
            <div className="col">
              <button className="btn-general-outline">Tigray</button>
            </div>
            <div className="col">
              <button className="btn-general-outline">SNNP</button>
            </div>
            <div className="col">
              <button className="btn-general-outline">Sidama</button>
            </div>
            <div className="col">
              <button className="btn-general-outline">
                South West Ethiopia
              </button>
            </div>
            <div className="col">
              <button className="btn-general-outline">Afar</button>
            </div>
            <div className="col">
              <button className="btn-general-outline">Diredawa</button>
            </div>
            <div className="col">
              <button className="btn-general-outline">Harar</button>
            </div>
            <div className="col">
              <button className="btn-general-outline">Benishangul</button>
            </div>
            <div className="col">
              <button className="btn-general-outline">Somali</button>
            </div>
            <div className="col">
              <button className="btn-general-outline">Gambela</button>
            </div>
          </div>
          <div>
            <hr className="region-city-separator" />
          </div>
          <div>
            <div>{this.getCitiesForRegion()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchByCity;
