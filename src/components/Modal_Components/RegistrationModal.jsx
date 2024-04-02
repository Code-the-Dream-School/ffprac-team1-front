import React from 'react';
import Registration from '../Authentification/Registration.jsx';

const RegistrationModal = ({ onClose }) => (
  <dialog className="modal bg-black/50" open>
    <div className="modal-box bg-black p-8 border border-blue/10">
      <h3 className="font-bold text-lg pb-10 text-2xl text-center">Sign Up</h3>
      <Registration />
      <button onClick={onClose} className="text-blue">Close</button>
    </div>
  </dialog>
);

export default RegistrationModal;
