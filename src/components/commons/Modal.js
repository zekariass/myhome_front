import React from "react";
import { Button, Modal } from "react-bootstrap";

const MyModal = ({ show, onHide, bodyMessage, title }) => {
  return (
    <div className="footer-bg">
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        scrollable={false}
        // dialogClassName="my-modal-size"
        aria-labelledby="contained-modal-title-vcenter"
        
        //   centered
      >
        <Modal.Header closeButton className="my-modal-header">
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="my-modal-body">{bodyMessage()}</Modal.Body>
        <Modal.Footer className="my-modal-footer">
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyModal;
