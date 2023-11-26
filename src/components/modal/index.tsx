// components/Modal.tsx
import React, {useState} from 'react';

interface ModalProps {
  onClose: () => void;
  onAction: () => void;
}

const Modal: React.FC<ModalProps> = ({onClose, onAction}) => {
  const [confirmationMessage, setConfirmationMessage] = useState(false);

  const handleAction = () => {
    onAction();
    setConfirmationMessage(true);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black-main bg-opacity-70">
      <div className="bg-slate-accent p-4 rounded-lg shadow-md w-4/5 max-w-[450px] h-[360px]">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500">
            Close
          </button>
        </div>
        <div className="h-full flex flex-col justify-around">
          <div>
            <h2 className="text-xl font-semibold mb-2">Claim WBNB</h2>
            <p className="text-gray-600 mb-4">Description paragraph here.</p>
          </div>
          {confirmationMessage && <p className="text-brand-green-hover mt-2">Action performed successfully!</p>}
          <button onClick={handleAction} className="bg-brand-blue text-white px-4 py-2 rounded-md">
            Claim WBNB
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
