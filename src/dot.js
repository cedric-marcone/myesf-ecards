import React from "react";
import classnames from "classnames";
import css from "./dot.module.css";

const Dot = ({ label, selected, onClick }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={classnames(css.dot, {
      [css.selected]: selected
    })}
  />
);

export default Dot;
