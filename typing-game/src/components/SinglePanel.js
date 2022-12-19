import { useEffect, useState, useRef, useMemo, memo } from "react";
import nextId from "react-id-generator";
import React from "react";
import SingleLetter from "./SingleLetter";

const SinglePanel = ({ word, inputValue }) => {
  // const [disappearClass, setDisappearClass] = useState("");
  const [isWholeCorrect, setIsWholeCorrect] = useState(false);
  const [splittedWord, setSplittedWord] = useState([]);
  const [splittedInput, setSplittedInput] = useState([]);
  //TO JEST DOBRZE
  // const splittedWord = useRef(word.split(""));
  // const splittedInput = useRef(inputValue.split(""));
  // const { current: splittedWord } = useRef(word.split(""));
  // const { current: splittedInput } = useRef(inputValue.split(""));
  const lettersArr = [];
  const panel = useRef(null);

  //NOTATKI
  //jak da sie zmieniającą się w set zmienną do dependency array to nie ma infinite loop
  //(chyba) tworząc key prop nie za pomocą index, przekazujemy do komponentu nową wartość propa i komponent re-renderuje się (rozwiązanie nie useRef())
  //mogę dać array do dependency list po stworzeniu go jako useRef()

  const splitWordIntoLetters = () => {
    const letters = word.split("");
    setSplittedWord(letters);
  };

  const splitInputIntoLetters = () => {
    const letters = inputValue.split("");
    setSplittedInput(letters);
  };

  // const checkLetterMatch = () => {
  //   // console.log(splittedWord);
  //   // console.log(splittedInput);
  //   if (splittedWord.length > 0 && splittedInput.length > 0) {
  //     // console.log("przeszło");
  //     splittedInput.forEach((letter, index) => {
  //       if (letter === splittedWord[index]) {
  //         // console.log("takie same");
  //         // splittedWord[index].style.color = "green";
  //       } else {
  //         // console.log("inne");
  //       }
  //     });
  //   }
  // };

  // const checkWholeWord = (splittedWord, splittedInput) => {
  //   isWholeCorrect = splitted;
  // };

  const checkMatch = (index, splittedWord, splittedInput) => {
    if (splittedWord[index] === splittedInput[index]) {
      // console.log("green");
      return "letter-green";
    } else {
      // console.log("red");
      return "letter-red";
    }
  };

  // const checkIfGreen = () => {
  //   //tu było
  //   console.log("isAllGreen", isAllGreen);
  //   setIsWholeCorrect(isAllGreen);
  //   if (isWholeCorrect) {
  //     setDisappearClass("panel-disappear");
  //   }
  // };

  //works with useStates (but there is one letter delay in logging)
  //works only when the pannel's key prop is its index
  useEffect(() => {
    splitWordIntoLetters();
    splitInputIntoLetters();
    // checkLetterMatch();
    // checkIfGreen();
  }, [inputValue]);

  //works with useRefs (no delay)
  //doesn't work when the pannel's key prop in its index (works with dynamic id generators)
  // useEffect(() => {
  //   checkLetterMatch();
  // }, []);

  return (
    <>
      <article ref={panel} className={`single-panel`}>
        {splittedWord.map((letter, index) => {
          // const letterId = nextId();
          const color = checkMatch(index, splittedWord, splittedInput);
          lettersArr.push({ letter, index, color });
          // console.log(lettersArr.length);
          // console.log(splittedWord);
          if (lettersArr.length === splittedWord.length) {
            // console.log("gówno");
            const isAllGreen = lettersArr.every((letter) => {
              return letter.color === "letter-green";
            });
            console.log("sss", isAllGreen);
            if (isAllGreen) {
              // setDisappearClass("panel-disappear");
              // console.log(panel.current);
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
              // color={checkMatch(index, splittedWord, splittedInput)}
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
