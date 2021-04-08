import React from "react";

interface InputsProps {
  user: { firstName: string; lastName: string };
}

const AccountPageInputfield: React.FC<InputsProps> = ({ user }) => (
  <div className="inputs">
    <div className="input-group">
      <input
        value={user && user.firstName}
        className="input-group__input"
        type="text"
        name="firstname"
        id="firstname"
        placeholder="&nbsp;"
        disabled
      />
      <label className="input-group__label">Firstname</label>
    </div>
    <div className="input-group">
      <input
        value={user && user.lastName}
        className="input-group__input"
        type="text"
        name="lastname"
        id="lastname"
        placeholder="&nbsp;"
        disabled
      />
      <label className="input-group__label">Lastname</label>
    </div>
  </div>
);

export default AccountPageInputfield;
