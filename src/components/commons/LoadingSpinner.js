import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => {
  return (
    <div className="mb-3 flex-center-general">
      <Spinner animation="border" variant="success" role="status" />
    </div>
  );
};

export default LoadingSpinner;
