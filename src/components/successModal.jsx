import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const SuccessModal = ({ show, onClose, message }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <FaCheckCircle className="modal-icon" />
        <h2>¡Éxito!</h2>
        <p>{message || "Solicitud enviada correctamente."}</p>
        <button className="btn-close" onClick={onClose}>
          {/* x de cerrar */}
          ✖
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
