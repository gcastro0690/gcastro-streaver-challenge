interface ConfirmationModalProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmationModal({ message, isOpen, onClose, onConfirm }: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>

        <div className="flex justify-center">
          <button
            className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded mt-4 mr-4 cursor-pointer"
            onClick={onConfirm}
          >
            Yes
          </button>

          <button
            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded mt-4 cursor-pointer"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
