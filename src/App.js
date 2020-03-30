import React, { useState, useRef, useEffect } from "react";
import classnames from "classnames";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import "./App.css";
import Card from "./card";
import Dot from "./dot";
import CardInfo from "./card-info";

const CARD_WIDTH = 290;

const App = ({ school, cards }) => {
  const [current, setCurrent] = useState(0);
  const [width, setWidth] = useState(320);
  const [toggle, setToggle] = useState(false);
  const cardsRef = useRef();
  const infosRef = useRef();
  const mouseDownAt = useRef();

  const [props, set] = useSpring(() => ({
    x: -current * CARD_WIDTH,
    config: { mass: 1, tension: 500, friction: 39 }
  }));

  const bind = useDrag(
    ({ down, distance, movement: [mx], cancel }) => {
      const position = -current * CARD_WIDTH;
      const dx = position + mx;
      if (down && distance > CARD_WIDTH / 2) {
        const target = -Math.round(dx / CARD_WIDTH);
        const clamped = Math.min(Math.max(target, 0), cards.length - 1);
        setToggle(false);
        setCurrent(clamped);
        cancel();
      }
      set({ x: down ? dx : position });
    },
    {
      axis: "x",
      rubberband: 0.25,
      bounds: {
        left: (cards.length - current - 1) * -CARD_WIDTH,
        right: -current * -CARD_WIDTH
      }
    }
  );

  const cardChanged = index => () => {
    setToggle(false);
    setCurrent(index);
    set({ x: -index * CARD_WIDTH });
  };
  const mouseDown = ({ clientX }) => {
    mouseDownAt.current = clientX;
  };
  const mouseUp = index => ({ clientX }) => {
    const d = Math.abs(clientX - mouseDownAt.current);
    if (d < 2) cardChanged(index)();
  };

  const translateCards = x => {
    return `translate(${x}px, 0)`;
  };
  const translateInfos = value => {
    return translateCards((value / CARD_WIDTH) * width);
  };

  const setSizes = () => {
    setWidth(infosRef.current.offsetWidth);
    window.document.body.style.height = `${window.innerHeight}px`;
  };

  useEffect(() => {
    infosRef.current.scrollTop = 0;
    setSizes();
    window.addEventListener("resize", setSizes);
    return () => window.removeEventListener("resize", setSizes);
  });

  return (
    <div className="cards-selector">
      <nav className="cards" ref={cardsRef} {...bind()}>
        <animated.div
          className="cards__inner"
          style={{ transform: props.x.interpolate(translateCards) }}
        >
          {cards.map((card, index) => (
            <Card
              key={index}
              school={school}
              card={card}
              onMouseDown={mouseDown}
              onMouseUp={mouseUp(index)}
              selected={index === current}
            />
          ))}
        </animated.div>
      </nav>
      <nav className="cards-dots">
        {cards.map((_, index) => (
          <Dot
            key={index}
            onClick={cardChanged(index)}
            selected={index === current}
          />
        ))}
      </nav>
      <div className="info__outer">
        <div className="info" {...bind()}>
          <div
            ref={infosRef}
            className={classnames("info__inner", {
              "info__inner--far": toggle
            })}
          >
            <animated.main
              className="card-infos"
              style={{ transform: props.x.interpolate(translateInfos) }}
            >
              {cards.map((card, index) => (
                <CardInfo
                  key={index}
                  school={school}
                  card={card}
                  selected={index === current}
                />
              ))}
            </animated.main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
