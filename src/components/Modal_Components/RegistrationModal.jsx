import React from 'react';
import Registration from '../Authentification/Registration';

const RegistrationModal = ({ onClose }) => (
  <dialog className="modal bg-black/50" open>
    <div className="modal-box bg-black p-8 border border-blue/10">
      <Registration />
      <button onClick={onClose} className="text-blue">
        Close
      </button>
    </div>
  </dialog>
);

export default RegistrationModal;
