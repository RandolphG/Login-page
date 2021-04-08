import React from "react";

interface InputsProps {
  credentials: { email: string; password: string };
  inputType: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  showPassword: () => void;
}

const emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}";

const Inputs: React.FC<InputsProps> = ({
  credentials,
  handleChange,
  inputType,
  showPassword,
}) => (
  <div className="inputs">
    <div className="input-group">
      <input
        value={credentials.email}
        className="input-group__input"
        onChange={handleChange}
        type="text"
        name="email"
        id="email"
        placeholder="&nbsp;"
        required
        pattern={emailPattern}
      />
      <label className="input-group__label">Email</label>
    </div>
    <div className="input-group">
      <input
        value={credentials.password}
        className="input-group__input"
        onChange={handleChange}
        type={inputType}
        name="password"
        id="password"
        placeholder="&nbsp;"
        required
      />

      <label className="input-group__label">Password</label>
      <span className="password_show" onClick={showPassword}>
        {inputType === "text" ? "Hide" : "Show"}
      </span>
    </div>
  </div>
);

export default Inputs;
