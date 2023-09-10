import * as React from "react";
import { FiAlertTriangle } from "react-icons/fi";

interface AlertProps {
  message: string;
}

const Alert: React.FC<AlertProps> = ({ message }) => {
  return (
    <div className="alert alert-error">
      <FiAlertTriangle size={32} />
      <span>{message}</span>
    </div>
  );
};

export default Alert;
