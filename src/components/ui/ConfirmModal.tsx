import React from 'react';
import './ConfirmModal.css';

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title = 'Confirm action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
}) => {
  if (!open) return null;
  return (
    <div className="confirm-section">
      <div className="confirm-panel" role="dialog" aria-modal="true" aria-label={title}>
        <h3 className="cm-title">{title}</h3>
        <p className="cm-message">{message}</p>
        <div className="confirm-btnbox">
          <button className="cm-cancel" onClick={onCancel} disabled={loading}>
            {cancelText}
          </button>
          <button className="cm-confirm" onClick={onConfirm} disabled={loading}>
            {loading ? 'Saving...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
