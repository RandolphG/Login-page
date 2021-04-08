import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, ...rest }) => (
  <div className="button">
    <button onClick={onClick} className="button__login" type="submit">
      {label}
    </button>
  </div>
);

export default Button;
