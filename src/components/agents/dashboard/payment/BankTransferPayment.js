// @ts-nocheck
import TextField from "components/commons/fields/TextField";
import { FIELD_SUBSCRIPTION } from "components/commons/fieldSubscription";
import FileSelect from "components/commons/FileSelect";
import MyModal from "components/commons/Modal";
import { MAX_RECIEPT_ATTACHEMENTS } from "components/commons/Strings";
import React from "react";
import { useState } from "react";

const BankTransferPayment = ({ name, attachedFiles, setAttachedFiles }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileToDisplay, setFileToDisplay] = useState(null);

  /**
   * Remove file from attachedFiles state array
   * @param {*} fileIndex
   */
  const removeFile = (fileIndex) => {
    const newAttachedFiles = attachedFiles.filter(
      (file, index) => index != fileIndex
    );
    setAttachedFiles(newAttachedFiles);
  };

  //Modal body, display the reciept image
  const showModalBodyMessage = () => {
    return (
      <div>
        <img
          src={URL.createObjectURL(fileToDisplay)}
          alt="Your Reciept"
          width="100%"
          height="400vh"
        />
      </div>
    );
  };

  return (
    <div>
      <p className="fw-bold">Enter bank transaction detail</p>
      <div className="form-outline mb-2">
        <TextField
          name={`${name}.bank_name`}
          className="form-control form-control-lg input-border-color"
          type="text"
          placeholder=""
          label="Name of Bank"
          labelClass="form-label fs-5 mt-2"
          validate={() => {}}
          fieldSubscription={FIELD_SUBSCRIPTION}
        />
      </div>
      <div className="form-outline mb-2">
        <TextField
          name={`${name}.bank_branch_name`}
          className="form-control form-control-lg input-border-color"
          type="text"
          placeholder=""
          label="Bank Branch Name"
          labelClass="form-label fs-5 mt-2"
          validate={() => {}}
          fieldSubscription={FIELD_SUBSCRIPTION}
        />
      </div>
      <div className="form-outline mb-2">
        <TextField
          name={`${name}.transaction_ref_number`}
          className="form-control form-control-lg input-border-color"
          type="text"
          placeholder=""
          label="Transaction Reference Number"
          labelClass="form-label fs-5 mt-2"
          validate={() => {}}
          fieldSubscription={FIELD_SUBSCRIPTION}
        />
      </div>
      <div className="form-outline mb-2">
        <TextField
          name={`${name}.payment_date`}
          className="form-control form-control-lg input-border-color"
          type="date"
          placeholder=""
          label="Payment Date"
          labelClass="form-label fs-5 mt-2"
          validate={() => {}}
          fieldSubscription={FIELD_SUBSCRIPTION}
        />
      </div>
      <div className="form-outline mb-2">
        <TextField
          name={`${name}.bank_full_address`}
          className="form-control form-control-lg input-border-color"
          type="text"
          placeholder="Street Address, Post Code, City, Region, Country"
          label="Full Address of the Bank"
          labelClass="form-label fs-5 mt-2"
          validate={() => {}}
          fieldSubscription={FIELD_SUBSCRIPTION}
          areaDescribedBy="bank_full_address_help"
        />
      </div>
      <div id="bank_full_address_help">
        <p className="fst-italic">
          e.g. Entoto street, 01234, Addis Ababa, Ethiopia
        </p>
      </div>

      <div>Attach upto {MAX_RECIEPT_ATTACHEMENTS} reciepts of the payment</div>
      <div className="row row-cols-auto g-3 my-4">
        {attachedFiles.map((file, index) => (
          <div className="col" key={index}>
            <div
              className="card flex-center-general"
              style={{ width: "200px", height: "150px" }}
            >
              <img
                src={URL.createObjectURL(file)}
                alt=""
                width="100%"
                height="150px"
                className="p-2"
              />
            </div>
            <div className="row row-cols-2 g-3 pb-2 pt-1">
              <div className="col flex-center-general">
                <i
                  className="trash icon delete-general"
                  role="button"
                  onClick={() => {
                    removeFile(index);
                  }}
                ></i>
              </div>
              <div className="col flex-center-general">
                <i
                  className="eye icon view-general"
                  role="button"
                  onClick={(event) => {
                    setIsModalOpen(true);
                    setFileToDisplay(file);
                  }}
                ></i>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <MyModal
          show={isModalOpen}
          onHide={() => setIsModalOpen(false)}
          bodyMessage={showModalBodyMessage}
          title="Your Reciept"
        />
      )}
      {attachedFiles.length < MAX_RECIEPT_ATTACHEMENTS && (
        <div>
          <FileSelect
            attachedFiles={attachedFiles}
            setAttachedFiles={setAttachedFiles}
            accept={{
              "image/*": [".png", ".gif", ".jpeg", ".jpg"],
            }}
          />
        </div>
      )}
    </div>
  );
};

export default BankTransferPayment;
