import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const school = {
  name: "Alpe d'Huez",
  site: "https://www.esf-alpedhuez.com",
  infos: [
    {
      name: "Les Bergers",
      schedule: "08:00 - 19:00",
      phone: "+33 6 72 39 58 30",
      mail: "cedric.marcone@valraiso.fr"
    },
    {
      name: "Maison de l'Alpe",
      schedule: "07:30 - 18:00",
      phone: "+33 6 72 39 58 30",
      mail: "cedric.marcone@valraiso.fr"
    }
  ]
};
const cards = [
  {
    fullname: "Dhilan WALCOTT",
    level: "/img/level/SNOW2.png",
    title: "SNOWBOARD BERGERS",
    infos: [
      { type: "order", value: "EP-1234567", link: "#" },
      {
        type: "schedule",
        value: ["Du dimanche 22 mars au vendredi 27 mars", "de 09:15 à 12:00"]
      },
      { type: "meeting", value: "Les Bergers", link: "#" },
      { type: "level", value: "Snowboard 2" }
    ]
  },
  {
    fullname: "3 personnes",
    level: "/img/level/ET1ALP.png",
    title: "LEÇON PARTICULIÈRE 1H30 -1 À 4P",
    infos: [
      { type: "order", value: "EP-1234567", link: "#" },
      {
        type: "students",
        value: [
          "Bernard DE LA VILLARDIERE",
          "Natacha DE LA VILLARDIERE",
          "Bobby LA POINTE"
        ]
      },
      {
        type: "schedule",
        value: ["Le lundi 23 mars", "de 12:00 à 13:30"]
      },
      { type: "meeting", value: "Les Bergers", link: "#" },
      { type: "level", value: "Première étoile" },
      { type: "instructor", value: "Guy-Aimé Hudry" }
    ]
  },
  {
    fullname: "Jehu CABELLO",
    level: "/img/level/ETOALP.png",
    title: "COURS COLLECTIF MATIN BERGERS",
    infos: [
      { type: "order", value: "EP-1234567", link: "#" },
      {
        type: "schedule",
        value: ["Du dimanche 22 mars au vendredi 27 mars", "de 09:15 à 12:00"]
      },
      { type: "meeting", value: "Les Bergers", link: "#" },
      { type: "level", value: "Etoile d'or" }
    ]
  },
  {
    fullname: "Torrin HENNINGER",
    level: "/img/level/ALPCEN.jpg",
    title: "COURS COLLECTIF APRES-MIDI GRANDES ROUSSES",
    infos: [
      { type: "order", value: "EP-1234567", link: "#" },
      {
        type: "schedule",
        value: ["Du lundi 23 mars au vendredi 27 mars", "de 14:00 à 16:00"]
      },
      { type: "meeting", value: "Les Grandes rousses", link: "#" },
      { type: "level", value: "Compétition" }
    ]
  }
];

ReactDOM.render(
  <App cards={cards} school={school} />,
  document.getElementById("root")
);
