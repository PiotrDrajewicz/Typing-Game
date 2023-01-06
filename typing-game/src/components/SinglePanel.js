import {
  useEffect,
  useState,
  useRef,
  useMemo,
  memo,
  useContext,
  useCallback,
} from "react";
import nextId from "react-id-generator";
import React from "react";
import SingleLetter from "./SingleLetter";
import PanelsContext from "./PanelsContainer";

const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

const SinglePanel = memo(
  ({ word, inputValue, setInputValue, id, popNumber, isGameRunning }) => {
    const [splittedWord, setSplittedWord] = useState([]);
    const [splittedInput, setSplittedInput] = useState([]);
    const [xPosition, setXPosition] = useState(0);
    const [yPosition, setYPosition] = useState(0);
    const [visibility, setVisibility] = useState(0);
    const [popInterval, setPopInterval] = useState(3000);
    const [popPerm, setPopPerm] = useState(popNumber);

    const lettersArr = [];
    const panel = useRef(null);

    const splitWordIntoLetters = () => {
      const letters = word.split("");
      setSplittedWord(letters);
    };

    const splitInputIntoLetters = () => {
      const letters = inputValue.split("");
      setSplittedInput(letters);
    };

    const checkMatch = (index, splittedWord, splittedInput) => {
      if (splittedWord[index] === splittedInput[index]) {
        return "letter-green";
      } else {
        return "letter-red";
      }
    };

    const calculatePosition = () => {
      const randXPosition = Math.random() * (screenWidth - 200);
      const randYPosition = Math.random() * (screenHeight - 400);
      setXPosition(randXPosition);
      setYPosition(randYPosition);
    };

    const makeVisible = () => {
      setVisibility(1);
      console.log("makeVisible");
    };

    const assignPermValues = () => {
      if (popNumber || popNumber === 0) {
        console.log("assignPerm");
        setPopPerm(popNumber);
      }
    };

    //works with useStates (but there is one letter delay in logging)
    //works only when the pannel's key prop is its index
    useEffect(() => {
      splitWordIntoLetters();
      splitInputIntoLetters();
    }, [inputValue]);

    useEffect(() => {
      calculatePosition();
    }, []);

    //THIS WORKED
    //but popNumber is changing to undefined and appearance stops
    // useEffect(() => {
    //   assignPermValues();
    //   if (popNumber || popNumber === 0) {
    //     const timeout = setTimeout(() => {
    //       makeVisible();
    //     }, popNumber * popInterval);

    //     return () => clearTimeout(timeout);
    //   }
    // }, [popNumber]);

    //THIS WORKS
    //appearing based on popPerm and after assigning it a number, it doesn't change. Need to add the start button to start appearance.
    useEffect(() => {
      assignPermValues();
      if (popPerm || popPerm === 0) {
        const timeout = setTimeout(() => {
          makeVisible();
        }, popPerm * popInterval);

        return () => clearTimeout(timeout);
      }
    }, [popNumber]);

    console.log(`panel ${id} pop number: `, popNumber);
    console.log(`panels ${id} perm: `, popPerm);
    // console.log(`panels ${id} visibility: `, visibility);

    console.log("is running: ", isGameRunning);

    return (
      <>
        <article
          // data-num={popNumber}
          style={{
            transform: `translate(${xPosition}px, ${yPosition}px)`,
            opacity: visibility,
          }}
          ref={panel}
          className={`single-panel`}
        >
          {splittedWord.map((letter, index) => {
            const color = checkMatch(index, splittedWord, splittedInput);
            lettersArr.push({ letter, index, color });
            if (lettersArr.length === splittedWord.length) {
              const isAllGreen = lettersArr.every((letter) => {
                return letter.color === "letter-green";
              });
              // console.log("is all green: ", isAllGreen);
              if (isAllGreen) {
                panel.current.classList.add("panel-disappear");
                setInputValue("");
                // clear();
              }
            }
            return (
              <SingleLetter
                key={index}
                index={index}
                letter={letter}
                splittedWord={splittedWord}
                splittedInput={splittedInput}
                colorClass={color}
                lettersArr={lettersArr}
              />
            );
          })}
        </article>
      </>
    );
  },
  (prevProps, nextProps) => {
    // console.log("prev: ", prev);
    // console.log("next: ", next);
    //true -> no re-render
    //false -> re-render
    // if (next.popNumber !== undefined) {
    //   setPopPerm(popNumber);
    // }
  }
);
export default SinglePanel;
