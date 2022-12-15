import { useEffect, useState, useRef, useMemo, memo } from "react";
import nextId from "react-id-generator";
import React from "react";
import SingleLetter from "./SingleLetter";

const SinglePanel = ({ word, inputValue }) => {
  // const [splittedWord, setSplittedWord] = useState([]);
  // const [splittedInput, setSplittedInput] = useState([]);
  //TO JEST DOBRZE
  // const splittedWord = useRef(word.split(""));
  // const splittedInput = useRef(inputValue.split(""));
  const { current: splittedWord } = useRef(word.split(""));
  const { current: splittedInput } = useRef(inputValue.split(""));

  //NOTATKI
  //jak da sie zmieniającą się w set zmienną do dependency array to nie ma infinite loop
  //(chyba) tworząc key prop nie za pomocą index, przekazujemy do komponentu nową wartość propa i komponent re-renderuje się (rozwiązanie nie useRef())
  //mogę dać array do dependency list po stworzeniu go jako useRef()

  // const splitWordIntoLetters = () => {
  //   const letters = word.split("");
  //   setSplittedWord(letters);
  // };

  // const splitInputIntoLetters = () => {
  //   const letters = inputValue.split("");
  //   setSplittedInput(letters);
  // };

  const checkLetterMatch = () => {
    console.log(splittedWord);
    console.log(splittedInput);
    if (splittedWord.length > 0 && splittedInput.length > 0) {
      console.log("przeszło");
      splittedInput.forEach((letter, index) => {
        if (letter === splittedWord[index]) {
          console.log("takie same");
          // splittedWord[index].style.color = "green";
          return <h1>lolo</h1>;
        } else {
          console.log("inne");
        }
      });
    }
  };

  const checkMatch = (index, splittedWord, splittedInput) => {
    if (splittedWord[index] === splittedInput[index]) {
      console.log("green");
      return "green";
    } else {
      console.log("red");
      return "red";
    }
  };

  //works with useStates (but there is one letter delay in logging)
  //works only when the pannel's key prop is its index
  // useEffect(() => {
  //   splitWordIntoLetters();
  //   splitInputIntoLetters();
  //   checkLetterMatch();
  // }, [inputValue]);

  //works with useRefs (no delay)
  //doesn't work when the pannel's key prop in its index (works with dynamic id generators)
  useEffect(() => {
    checkLetterMatch();
  }, []);

  return (
    <>
      <article className="single-panel">
        {splittedWord.map((letter, index) => {
          // const letterId = nextId();
          return (
            <SingleLetter
              key={index}
              index={index}
              letter={letter}
              splittedWord={splittedWord}
              splittedInput={splittedInput}
              checkMatch={checkMatch}
            />
          );
        })}
      </article>
    </>
  );
};

export default SinglePanel;
