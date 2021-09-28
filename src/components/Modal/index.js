import React from "react";
import Modal from "react-modal";

import CloseImage from "../../assets/icons/ic_close.svg";

const ModalCustom = ({ isOpen, handleClose = () => {}, children }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={handleClose}
    closeTimeoutMS={250}
    className="o-modal"
    ariaHideApp={false}
    portalClassName={`o-modal-portal, ${isOpen ? "o-modal-portal-open" : ""})`}
    overlayClassName="o-modal-overlay"
    bodyOpenClassName="reactModal-body-open"
    htmlOpenClassName="reactModal-html-open"
  >
    <div className="o-modal-container">
      <img
        className="o-modal-icon"
        src={CloseImage}
        alt="close"
        onClick={handleClose}
      />
      <div className="o-modal-content">{children}</div>
    </div>
  </Modal>
);

export default ModalCustom;
