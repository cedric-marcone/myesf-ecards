import React from "react";
import classnames from "classnames";
import css from "./card.module.css";

const HOST = "https://widget.vente-en-ligne-esf.com";

const Card = ({ school, card, selected, onMouseDown, onMouseUp }) => {
  const img = `${HOST}${card.level}`;
  return (
    <div
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      className={classnames(css.card, {
        [css.selected]: selected
      })}
    >
      <div className={css.layout}>
        <div className={css.head}>
          <div className={css.esf}>
            <img
              className={css.esfLogo}
              src="/esf.svg"
              width="65"
              height="15"
              alt="esf"
            />
            <span className={css.esfName}>{school.name}</span>
          </div>
        </div>
        <div className={css.content}>
          <div className={css.levelOuter}>
            <img className={css.level} src={img} alt="" />
          </div>
          <div className={css.lesson}>
            <span className={css.title}>{card.title}</span>
            <span className={css.fullname}>{card.fullname}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
