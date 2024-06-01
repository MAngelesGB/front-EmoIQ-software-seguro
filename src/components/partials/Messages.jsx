import Modal from 'react-modal';
import './Messages.css';

Modal.setAppElement('#root');

export default function Messages({
  modalIsOpen,
  modalMessage,
  closeModal,
  modalTitle,
}) {
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modalEdit"
        contentLabel="Error Message"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
        }}
      >
        <h2>{modalTitle}</h2>
        <p>{modalMessage}</p>
        <button onClick={closeModal}>Cerrar</button>
      </Modal>
    </>
  );
}
