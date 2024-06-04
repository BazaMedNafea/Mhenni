import Modal from "react-modal";

const ConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}> = ({ isOpen, onClose, onConfirm, isLoading }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Confirm Completion</h2>
      <p>Are you sure you want to confirm completion of this request?</p>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded ml-4"
        onClick={onConfirm}
        disabled={isLoading}
      >
        {isLoading ? "Confirming..." : "Confirm"}
      </button>
      <button
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded ml-4"
        onClick={onClose}
        disabled={isLoading}
      >
        Cancel
      </button>
    </Modal>
  );
};

export default ConfirmationModal;
