import React, { useEffect, useRef } from "react";
import styles from "./Modal.module.css";
import PropTypes from "prop-types";

const Modal = ({ show, onClose, children }) => {
  const modalRef = useRef(null);

  function handleCloseClick() {
    onClose();
  }

  useEffect(() => {
    function handleOutsideClick(event) {
      if (!!modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
  
    function handleKeyDown(event) {
      if (event.keyCode === 27) {
        onClose();  
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return (function cleanup() {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    });
  }, [onClose]);

  return (
    <div className={styles.modal} style={{ display: "block"}}>
      <div ref={modalRef} className={styles.modal_content}>
        {/* <button
          className={styles.close_button}
          onClick={handleCloseClick}
        >
          X
        </button> */}
        <div className={styles.main_content}>
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired
};

export default Modal;
