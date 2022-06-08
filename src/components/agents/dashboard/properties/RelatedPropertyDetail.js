// @ts-nocheck
import DataDisplay from "components/commons/DataDisplay";
import React from "react";

const RelatedPropertyDetail = ({
  message,
  relatedProperty,
  listTitle,
  editPath,
  editInitialValues,
  editable,
  deletable,
}) => {
  return (
    <div className="py-3">
      <p>{message}</p>
      <div className="row row-cols-1 row-cols-lg-2 g-4">
        <div className="col card-table">
          <div className="card card-cell px-4">
            <DataDisplay
              data={relatedProperty}
              title={listTitle}
              editable={editable}
              deletable={deletable}
              path={editPath}
              editInitialValues={editInitialValues}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedPropertyDetail;
