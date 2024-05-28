import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import './Messages.css';

Modal.setAppElement("#root");

export default function Messages({ modalIsOpen, modalMessage, closeModal }) {
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modalEdit"
        contentLabel="Error Message"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
      >
        <h2>Error</h2>
        <p>{modalMessage}</p>
        <button onClick={closeModal}>Cerrar</button>
      </Modal>
    </>
  );
}

Messages.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired, // Define que modalIsOpen es un booleano requerido
  modalMessage: PropTypes.string.isRequired, // Define que modalMessage es una cadena requerida
  closeModal: PropTypes.func.isRequired, // Define que closeModal es una función requerida
};