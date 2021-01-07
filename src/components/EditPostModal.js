import React from "react";
import { Modal, Button } from "react-bootstrap";
import Form from "./Form";
const EditPostModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      id="postModal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit your memory
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form isFromModal={true} post={props.post} onHide={props.onHide} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPostModal;
