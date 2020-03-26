import React, { useState, useRef, useEffect } from "react";
import classnames from "classnames";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import "./App.css";

const CARD_WIDTH = 290;
const cards = [{}, {}, {}, {}];

const App = () => {
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
      if (down && distance >= CARD_WIDTH / 1.95) {
        const target = -Math.round(dx / CARD_WIDTH);
        setToggle(false);
        setCurrent(target);
        cancel();
      }
      set({ x: down ? dx : position });
    },
    {
      axis: "x",
      rubberband: 0.1,
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
    if (d < 2) {
      cardChanged(index)();
    }
  };

  const translateCards = x => {
    return `translate(${x}px, 0)`;
  };
  const translateInfos = value => {
    const x = (value / CARD_WIDTH) * width;
    return translateCards(x);
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
          {cards.map((_, index) => (
            <div
              key={index}
              onMouseDown={mouseDown}
              onMouseUp={mouseUp(index)}
              className={classnames("card", {
                "card--selected": index === current
              })}
            >
              {index + 1}
            </div>
          ))}
        </animated.div>
      </nav>
      <nav className="cards-dots">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={cardChanged(index)}
            aria-label={`Carte ${index + 1}`}
            className={classnames("card-dot", {
              "card-dot--selected": index === current
            })}
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
              {cards.map((_, index) => (
                <section
                  key={index}
                  className={classnames("card-info", {
                    "card-info--selected": index === current
                  })}
                >
                  <h2>Carte {index + 1}</h2>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent gravida tincidunt elit, sit amet vestibulum orci
                  tristique quis. Vivamus quis tellus mauris. Fusce interdum
                  pharetra elit, a tristique erat vehicula et. Interdum et
                  malesuada fames ac ante ipsum primis in faucibus. Vivamus in
                  lectus suscipit, elementum sapien et, sagittis lacus.. Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Praesent
                  gravida tincidunt elit, sit amet vestibulum orci tristique
                  quis. Vivamus quis tellus mauris. Fusce interdum pharetra
                  elit, a tristique erat vehicula et. Interdum et malesuada
                  fames ac ante ipsum primis in faucibus. Vivamus in lectus
                  suscipit, elementum sapien et, sagittis lacus..
                </section>
              ))}
            </animated.main>
          </div>
          <div
            className={classnames("school-info", {
              "school-info--selected": toggle
            })}
          >
            <h2>Infos écoles</h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            gravida tincidunt elit, sit amet vestibulum orci tristique quis.
            Vivamus quis tellus mauris. Fusce interdum pharetra elit, a
            tristique erat vehicula et. Interdum et malesuada fames ac ante
            ipsum primis in faucibus. Vivamus in lectus suscipit, elementum
            sapien et, sagittis lacus.. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Praesent gravida tincidunt elit, sit amet
            vestibulum orci tristique quis. Vivamus quis tellus mauris. Fusce
            interdum pharetra elit, a tristique erat vehicula et. Interdum et
            malesuada fames ac ante ipsum primis in faucibus. Vivamus in lectus
            suscipit, elementum sapien et, sagittis lacus..
          </div>
          <button className="info-toggle" onClick={() => setToggle(!toggle)}>
            {toggle ? "Voir carte" : "Infos école"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
