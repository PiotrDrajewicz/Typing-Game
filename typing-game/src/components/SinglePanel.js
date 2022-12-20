import { useEffect, useState, useRef, useMemo, memo } from "react";
import nextId from "react-id-generator";
import React from "react";
import SingleLetter from "./SingleLetter";

const SinglePanel = ({ word, inputValue }) => {
  const [splittedWord, setSplittedWord] = useState([]);
  const [splittedInput, setSplittedInput] = useState([]);

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

  //works with useStates (but there is one letter delay in logging)
  //works only when the pannel's key prop is its index
  useEffect(() => {
    splitWordIntoLetters();
    splitInputIntoLetters();
  }, [inputValue]);

  return (
    <>
      <article ref={panel} className={`single-panel`}>
        {splittedWord.map((letter, index) => {
          const color = checkMatch(index, splittedWord, splittedInput);
          lettersArr.push({ letter, index, color });
          if (lettersArr.length === splittedWord.length) {
            const isAllGreen = lettersArr.every((letter) => {
              return letter.color === "letter-green";
            });
            console.log("is all green: ", isAllGreen);
            if (isAllGreen) {
              panel.current.classList.add("panel-disappear");
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
