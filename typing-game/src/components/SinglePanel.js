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
import { useGlobalContext } from "../context";

const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

const SinglePanel = memo(
  ({
    word,
    inputValue,
    setInputValue,
    id,
    popNumber,
    isGameRunning,
    wordsOnly,
    setWordsOnly,
    paused,
    // setRemovedWord,
  }) => {
    const { popIntervalContext } = useGlobalContext();
    const renderCounter = useRef(0);
    renderCounter.current++;

    const [splittedWord, setSplittedWord] = useState([]);
    const [splittedInput, setSplittedInput] = useState([]);
    const [wordsOnlyCopy, setWordsOnlyCopy] = useState([]);
    const [xPosition, setXPosition] = useState(0);
    const [yPosition, setYPosition] = useState(0);
    const [visibility, setVisibility] = useState(0);
    const [popInterval, setPopInterval] = useState(popIntervalContext);
    const [popPerm, setPopPerm] = useState(popNumber);
    const [isRunning, setIsRunning] = useState(isGameRunning);
    const [isPaused, setIsPaused] = useState(paused);
    const [displayed, setDisplayed] = useState(false);

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
      if (isRunning && !displayed) {
        setVisibility(1);
        setDisplayed(true);

        // setRemovedWord(wordsOnly[id]);

        // wordsOnlyCopy.splice(popPerm, 1);
        // console.log("rrrrrr", wordsOnlyCopy[id]);
        // setWordsOnlyCopy(cleanedWordsOnly);
        // wordsOnly.splice(id, 1);
        // setWordsOnly(wordsOnly);

        //to poniżej było wyświetlane
        // console.log(`makeVisible item ${popPerm} --------------`);
        // console.log("isRunning in makeVisible: ", isRunning);
        // console.log("displayed: ", displayed);
      }
    };

    const assignPermValues = () => {
      if (popNumber || popNumber === 0) {
        // console.log("assignPerm");
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
      setWordsOnlyCopy([...wordsOnly]);
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
    }, [popNumber, isRunning]);
    //było popNumber

    useEffect(() => {
      setIsRunning(isGameRunning);
      setIsPaused(paused);
      // if (isPaused) {
      //   //WŁĄCZ LOSOWANIE NOWYCH POPPERM
      //   const permNumbers = [...Array(wordsOnly).keys()];
      //   console.log("words only222: ", permNumbers);
      // }
    }, [isGameRunning]);

    // console.log(`panel ${id} pop number: `, popNumber);
    // console.log(`panels ${id} perm: `, popPerm);
    // console.log(`panels ${id} visibility: `, visibility);

    // console.log("is running: ", isRunning);
    // console.log("words only copy: ", wordsOnlyCopy);
    console.log(
      "OOOOOOOOOOOOOOOOOOOOOOOO",
      localStorage.getItem("popInterval")
    );
    // console.log("counter: ", renderCounter.current);
    // console.log("counter: ", renderCounter.current);

    return (
      <>
        <article
          data-num={id}
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
