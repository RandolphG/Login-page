import React from "react";
import i18n from "i18next";
import { motion } from "framer-motion";
import motionSettings from "../motionSettings";

const options = [{ value: "en" }, { value: "de" }];

const DropDown: React.FC = () => {
  function handleLanguage(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    i18n
      .changeLanguage(e.target.value)
      .then((r) => console.log(`language changed -->`, e.target.value));
  }

  return (
    <motion.select
      {...motionSettings.dropDown}
      onChange={handleLanguage}
      className="login__header__select"
      name="dss_type"
      id="dss_type"
    >
      {options &&
        options.map(({ value }, idx) => (
          <option
            className="border__header__select_options"
            key={`selection-${idx}`}
            value={value}
          >
            {value}
          </option>
        ))}
    </motion.select>
  );
};

export default DropDown;
