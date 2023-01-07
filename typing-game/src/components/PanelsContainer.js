import {
  useEffect,
  useState,
  useRef,
  useCallback,
  memo,
  createContext,
} from "react";
import SinglePanel from "./SinglePanel";
import nextId from "react-id-generator";

// const defaultText =
//   "This allows users to link 345 to a specific portion of a page, using a text snippet provided in the book.";
const defaultText = "This thasem aurora pesem.";
// const popNumbers = [];
let newPopNumbers = [];
let iteration = 0;
let numFlag = null;

const PanelsContainer = () => {
  //tutaj będzie rozbijanie teksu i rozdawanie pojedynczych słów panelom
  const [text, setText] = useState(defaultText);
  const [wordsOnly, setWordsOnly] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [wordsArrLength, setWordsArrLength] = useState(0);
  const [popNumbers, setPopNumbers] = useState([]);
  const [perm, setPerm] = useState(null);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  // const [popNumState, setPopNumState] = useState(null);
  const inputWindow = useRef(null);
  const renderr = useRef(0);
  const [wordsOnlyArrState, setWordsOnlyArrState] = useState([]);

  const splitText = (text) => {
    const regexWordsNumbers = /(\w+)/gi;
    const wordsOnlyArr = text
      .match(regexWordsNumbers)
      .filter((word) => {
        if (isNaN(word) === true && word.length >= 3) {
          return word;
        }
      })
      .map((word) => word.toLowerCase());

    setWordsArrLength(wordsOnlyArr.length);
    setWordsOnly(wordsOnlyArr);
    setWordsOnlyArrState(wordsOnlyArr);
  };

  const updateInput = () => {
    // setInputValue(e.target.value);
    setInputValue(inputWindow.current.value);
    // console.log(inputValue);
  };

  //losowanie, usuwanie i przekazywanie działa, nie ma infinite loop, ale wszystkie panele dostają ten sam numer i dlatego wszystkie pokazują się na ekranie w tym samym momencie (ostatecznie zostają z ostatnim dostępnym numerem) - naprawić to
  const drawPopNumber = () => {
    //   setPopNumbers([...Array(wordsArrLength).keys()]);
    if (popNumbers.length > 0) {
      if (iteration === 0) {
        const numberToPop =
          popNumbers[Math.floor(Math.random() * popNumbers.length)];
        newPopNumbers = popNumbers.filter((number) => number !== numberToPop);
        iteration += 1;
        // setPopNumState(numberToPop);
        numFlag = numberToPop;
        console.log("draw 1");
        return numberToPop;
      } else {
        const numberToPop =
          newPopNumbers[Math.floor(Math.random() * newPopNumbers.length)];
        newPopNumbers = newPopNumbers.filter(
          (number) => number !== numberToPop
        );
        iteration += 1;
        // setPopNumState(numberToPop);
        numFlag = numberToPop;
        console.log("draw 2");
        return numberToPop;
      }
      // console.log("do single w fun", numberToPop);
      // setPopNumbers(newPopNumbers);
      // setPopNum(numberToPop);
      // return numberToPop;
    }
  };

  const startGame = () => {
    setInputValue(" ");
    setWordsOnly(wordsOnlyArrState);
    setTimeout(() => {
      setInputValue("");
    }, 1);
    inputWindow.current.focus();
    setIsGameRunning(true);
  };

  const pauseGame = () => {
    setIsGameRunning(false);
    setPaused(true);
  };

  // useEffect(() => {
  //   drawPopNumber();
  // }, [popNumbers.length]);

  useEffect(() => {
    // drawPopNumber();
    setPopNumbers([...Array(wordsArrLength).keys()]);
  }, [wordsArrLength]);
  // console.log("len", wordsArrLength);
  // console.log("popNumbers", popNumbers);
  // console.log("do single poza fun", popNum);

  //BEZ USESTATE
  // const drawNoUse = () => {
  //   const arr1 = [...Array(wordsArrLength).keys()];
  // };

  useEffect(() => {
    splitText(text);
    // inputWindow.current.focus();
  }, [text]);

  // console.log("pop numsss: ", newPopNumbers);

  return (
    <>
      <div className="input-panels-container">
        <section className="panels-container">
          {wordsOnly.map((word, index) => {
            // const generatedId = nextId();
            return (
              <SinglePanel
                // key={generatedId}
                // key={new Date().getTime().toString()}
                key={index}
                id={index}
                word={word}
                inputValue={inputValue}
                setInputValue={setInputValue}
                popNumber={drawPopNumber()}
                isGameRunning={isGameRunning}
                wordsOnly={wordsOnly}
                setWordsOnly={setWordsOnly}
                paused={paused}
              />
            );
          })}
        </section>
        <section className="input-section">
          <div className="input-div">
            <input
              type="text"
              id="input-window"
              value={inputValue}
              ref={inputWindow}
              onChange={updateInput}
            />
          </div>
          <div className="main-buttons">
            <button type="button" className="main-button" onClick={startGame}>
              Start
            </button>
            <button type="button" className="main-button" onClick={pauseGame}>
              Pause
            </button>
            <button type="button" className="main-button">
              Reset
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default PanelsContainer;
