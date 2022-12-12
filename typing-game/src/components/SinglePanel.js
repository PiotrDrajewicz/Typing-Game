import { useEffect, useState, useRef, useMemo, memo } from "react";
import nextId from "react-id-generator";
import React from "react";

const SinglePanel = ({ word, inputValue }) => {
  // const [splittedWord, setSplittedWord] = useState([]);
  // const [splittedInput, setSplittedInput] = useState([]);
  const { current: splittedWord } = useRef(word.split(""));
  const { current: splittedInput } = useRef(inputValue.split(""));

  // const splitWordIntoLetters = () => {
  //   const letters = word.split("");
  //   setSplittedWord(letters);
  // };

  // const splitInputIntoLetters = () => {
  //   const letters = inputValue.split("");
  //   setSplittedInput(letters);
  // };

  const checkLetterMatch = () => {
    console.log("check wywołanie");
    console.log(splittedWord);
    console.log(splittedInput);
    if (splittedWord.length > 0 && splittedInput.length > 0) {
      console.log("przeszło");
      // for (let i = 0; 3; i++) {
      //   console.log("word input", splittedWord, splittedInput);
      // if (splittedWord[i] === splittedInput[i]) {
      //   console.log(true);
      // } else {
      //   console.log(false);
      // }
      // }
    }
  };

  // useEffect(() => {
  //   splitWordIntoLetters();
  //   // splitInputIntoLetters();
  // }, [splittedInput]);

  useEffect(() => {
    checkLetterMatch();
  }, [splittedInput]);

  // useEffect(() => {
  //   checkLetterMatch();
  // }, [inputValue]);

  return (
    <>
      <article className="single-panel">
        {splittedWord.map((letter) => {
          const letterId = nextId();
          return (
            <h3
              key={letterId}
              className="panel-letter"
              id={`${letter}-${word}`}
            >
              {letter}
            </h3>
          );
        })}
      </article>
    </>
  );
};

export default SinglePanel;
