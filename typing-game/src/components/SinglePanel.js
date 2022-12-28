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

const SinglePanel = ({ word, inputValue, setInputValue, id, popNumber }) => {
  const [splittedWord, setSplittedWord] = useState([]);
  const [splittedInput, setSplittedInput] = useState([]);
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [visibility, setVisibility] = useState(0);
  const [popInterval, setPopInterval] = useState(1000);
  const [lolo, setLolo] = useState(popNumber);

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

  //było id * popInterval
  const makeVisible = () => {
    setTimeout(() => {
      setVisibility(1);
      console.log("makeVisible");
      // vis = 1;
    }, popNumber * popInterval);
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
    makeVisible();
  }, []);

  // useEffect(() => {
  //   setLolo(popNumber);
  //   makeVisible();
  //   console.log(lolo);
  // }, [lolo]);

  console.log(`panels ${id} pop number: `, popNumber);

  return (
    <>
      <article
        data-num={popNumber}
        style={{
          transform: `translate(${xPosition}px, ${yPosition}px)`,
          opacity: visibility,
        }}
        // style={{
        //   transform: `translateX(${Math.random() * (screenWidth - 200)}px)`,
        // }}
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
};

export default SinglePanel;
