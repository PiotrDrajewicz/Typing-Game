import { useEffect, useState, useRef, useMemo } from "react";
import nextId from "react-id-generator";
import React from "react";

const SinglePanel = ({ word, inputValue }) => {
  const [splittedWord, setSplittedWord] = useState([]);
  let [currentLetter, setCurrentLetter] = useState("");
  currentLetter = useRef(null);
  // const letterRefs = useRef([]);
  // letterRefs.current = [];

  const refsById = useMemo(() => {
    const refs = {};
    splittedWord.map((letter) => {
      refs[letter.id] = React.createRef(null);
    });
    return refs;
  }, [splittedWord]);

  const splitIntoLetters = (word) => {
    const letters = word.split("");
    setSplittedWord(letters);
  };

  const giveId = () => {
    splittedWord.map((letter) => {
      letter.id = `${letter}-${word}`;
    });
  };

  const handleClick = (letter) => {
    console.log(refsById[letter.id].current);
  };

  // const addLetterToRefs = (letter) => {
  //   if (letter && !letterRefs.current.includes(letter)) {
  //     letterRefs.current.push(letter);
  //   }
  // };

  // const checkLetterMatch = () => {
  //   const splittedInput = inputValue.split("");
  //   for (let i = 0; splittedInput.length; i++) {
  //     // setCurrentLetter(splittedWord[i]);
  //     if (splittedWord[i] === splittedInput[i]) {
  //       currentLetter.current.style.color = "green";
  //     }
  //   }
  // };

  useEffect(() => {
    splitIntoLetters(word);
    giveId();
  }, []);
  // console.log(letterRefs.current);
  // useEffect(() => {
  //   checkLetterMatch();
  // }, [inputValue]);

  return (
    <>
      <article className="single-panel">
        {splittedWord.map((letter, index) => {
          const letterId = nextId();
          return (
            <>
              <h3
                key={letterId}
                className="panel-letter"
                ref={refsById[letter.id]}
              >
                {letter}
              </h3>
              <button key={index} onClick={() => handleClick(letter)}>
                click
              </button>
            </>
          );
        })}
      </article>
    </>
  );
};

export default SinglePanel;
