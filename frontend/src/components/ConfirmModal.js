// frontend/src/components/ConfirmModal.js
import React from 'react';

const ConfirmModal = ({ show, title, message, onConfirm, onCancel }) => {
  if (!show) {
    return null;
  }

  return (
    // Modal Overlay
    <div className='modal-overlay'>
      <div className='modal-container'>
        <h3 className='modal-title'>{title}</h3>
        <p className='modal-message'>{message}</p>
        <div className='modal-actions'>
          <button onClick={onCancel} className='btn-primary'>
            Cancel
          </button>
          <button onClick={onConfirm} className='btn-danger'>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;