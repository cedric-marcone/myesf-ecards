import React from "react";
import classnames from "classnames";
import css from "./card-info.module.css";

const messages = {
  order: "Commande",
  lesson: "Cours",
  schedule: "Horaires",
  meeting: "Départ",
  level: "Niveau",
  students: "Eleves",
  instructor: "Moniteur"
};

const infoValue = value => {
  const array = Array.isArray(value);
  return !array ? value : value.map((v, i) => <div key={i}>{v}</div>);
};

const CardInfo = ({ school, card, selected }) => (
  <section
    className={classnames(css.card, {
      [css.selected]: selected
    })}
  >
    <div className={css.header}>
      <span className={css.headerTitle}>{card.title}</span>
      <hr className={css.headerSeparator} />
    </div>
    {card.infos.map(card => {
      return (
        <div key={card.type} className={css.info}>
          <div className={css.infoTitle}>{messages[card.type]}</div>
          <div className={css.infoValue}>{infoValue(card.value)}</div>
          {card.link && (
            <a className={css.infoLink} href={card.link}>
              Détail
            </a>
          )}
        </div>
      );
    })}
    <div className={css.esf}>
      <img className={css.esfLogo} src="/esf.svg" width="100" alt="esf" />
      <span className={css.esfName}>{school.name}</span>
    </div>
    <div className={css.subHeader}>Horaires et informations</div>
    {school.infos.map((info, index) => (
      <div key={index} className={css.info}>
        <div className={css.infoTitle}>{info.name}</div>
        <div className={css.infoValue}>{info.schedule}</div>
        {info.phone && (
          <a className={css.infoLink} href={`tel:${info.phone}`}>
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M8.488 10.243a14.075 14.075 0 005.27 5.269l1.178-1.65a1.333 1.333 0 011.725-.395 15.23 15.23 0 006.111 1.818A1.333 1.333 0 0124 16.615v5.949c0 .684-.517 1.257-1.197 1.327a20.68 20.68 0 01-2.136.109C9.253 24 0 14.747 0 3.333c0-.717.036-1.429.11-2.136C.18.517.751 0 1.435 0h5.95C8.08 0 8.66.535 8.714 1.228a15.23 15.23 0 001.818 6.11 1.333 1.333 0 01-.394 1.726l-1.651 1.179zm-3.363-.876l2.534-1.81a17.88 17.88 0 01-1.463-4.89H2.68c-.008.221-.012.444-.012.666-.001 9.942 8.057 18 17.999 18 .222 0 .445-.004.666-.013v-3.516a17.88 17.88 0 01-4.89-1.463l-1.81 2.534a16.59 16.59 0 01-2.117-1l-.077-.044a16.741 16.741 0 01-6.27-6.27l-.044-.077a16.59 16.59 0 01-1-2.117z" />
            </svg>
          </a>
        )}
        {info.mail && (
          <a className={css.infoLink} href={`mailto:${info.mail}`}>
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M11.585 5.773c1.832 0 3.559.812 4.824 2.08v.004c0-.61.41-1.07.977-1.07h.144c.895 0 1.074.843 1.074 1.109l.004 9.466c-.063.62.64.94 1.032.542 1.518-1.56 3.339-8.03-.946-11.776-3.996-3.497-9.359-2.92-12.21-.956-3.031 2.091-4.968 6.712-3.087 11.054 2.055 4.734 7.93 6.146 11.426 4.738 1.77-.714 2.586 1.673.747 2.454-2.773 1.182-10.5 1.06-14.109-5.182C-.977 14.019-.849 6.6 5.621 2.757 10.566-.185 17.09.63 21.023 4.732c4.11 4.292 3.872 12.323-.14 15.444-1.818 1.42-4.516.04-4.497-2.03l-.02-.673c-1.265 1.251-2.949 1.986-4.781 1.986-3.625 0-6.816-3.189-6.816-6.806 0-3.656 3.191-6.878 6.816-6.878v-.002zm4.559 6.619c-.137-2.65-2.106-4.246-4.485-4.246h-.09c-2.742 0-4.265 2.158-4.265 4.604 0 2.742 1.84 4.475 4.254 4.475 2.695 0 4.464-1.97 4.593-4.3l-.007-.533z" />
            </svg>
          </a>
        )}
      </div>
    ))}
    {school.site && (
      <div className={css.info}>
        <div className={css.infoTitle}>Site Web</div>
        <div className={css.infoValue}>
          <a href={school.site}>{school.site}</a>
        </div>
      </div>
    )}
    <div className={css.header}>
      <span className={css.headerTitle}>Informations à retenir</span>
      <hr className={css.headerSeparator} />
    </div>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent gravida
      tincidunt elit, sit amet vestibulum orci tristique quis. Vivamus quis
      tellus mauris. Fusce interdum pharetra elit, a tristique erat vehicula et.
      Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus in
      lectus suscipit, elementum sapien et, sagittis lacus.. Lorem ipsum dolor
      sit amet, consectetur adipiscing elit. Praesent gravida tincidunt elit,
      sit amet vestibulum orci tristique quis. Vivamus quis tellus mauris. Fusce
      interdum pharetra elit, a tristique erat vehicula et. Interdum et
      malesuada fames ac ante ipsum primis in faucibus. Vivamus in lectus
      suscipit, elementum sapien et, sagittis lacus..
    </div>
  </section>
);

export default CardInfo;
