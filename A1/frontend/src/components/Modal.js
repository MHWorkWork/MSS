import React from "react";
import "./Modal.css";

function Modal({ open, children, onClose }) {
  const modalStyles = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "50px",
    zIndex: 1000,
  };

  const overlayStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, .7)",
    zIndex: 1000,
  };

  if (!open) return null;
  return (
    <>
      <div style={overlayStyles} />
      <div style={modalStyles}>
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={onClose}>X</button>
          </div>
          <div className="title">
            <h1>Are You Sure You Want to Continue?</h1>
          </div>
          <div className="body">
            <p>The next page looks amazing. Hope you want to go there!</p>
          </div>
          <div className="footer">
            <button onClick={onClose} id="cancelBtn">
              Cancel
            </button>
            <button>Continue</button>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}

export default Modal;
