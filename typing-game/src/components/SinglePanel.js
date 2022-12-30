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
let vis = 0;
let popNumPerm;

const SinglePanel = memo(
  ({ word, inputValue, setInputValue, id, popNumber }) => {
    const [splittedWord, setSplittedWord] = useState([]);
    const [splittedInput, setSplittedInput] = useState([]);
    const [xPosition, setXPosition] = useState(0);
    const [yPosition, setYPosition] = useState(0);
    const [visibility, setVisibility] = useState(0);
    const [popInterval, setPopInterval] = useState(3000);
    const [popPerm, setPopPerm] = useState(null);

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

    //works with useStates (but there is one letter delay in logging)
    //works only when the pannel's key prop is its index
    useEffect(() => {
      splitWordIntoLetters();
      splitInputIntoLetters();
    }, [inputValue]);

    useEffect(() => {
      calculatePosition();
      // makeVisible();
    }, []);

    //THIS WORKED
    useEffect(() => {
      if (popPerm === null && popNumber === undefined) {
        setPopPerm(popNumber);
      }
      if (popNumber || popNumber === 0) {
        const timeout = setTimeout(() => {
          makeVisible();
        }, popNumber * popInterval);

        return () => clearTimeout(timeout);
      }
    }, [popNumber]);

    // useEffect(() => {
    //   if (popNumber || popNumber === 0) {
    //     popNumPerm = popNumber;
    //     const timeout = setTimeout(() => {
    //       makeVisible();
    //     }, popNumber * popInterval);

    //     return () => clearTimeout(timeout);
    //   }
    // }, [popNumber]);

    console.log(`panel ${id} pop number: `, popNumber);
    console.log(`panels ${id} perm: `, popPerm);
    // console.log(`panels ${id} visibility: `, visibility);

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
  (prev, next) => {
    // console.log("prev: ", prev);
    // console.log("next: ", next);
    if (next.popNumber !== undefined) {
      // setPopPerm(popNumber);
    }
  }
);
export default SinglePanel;
