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
  // const [popNumState, setPopNumState] = useState(null);
  const inputWindow = useRef(null);
  const renderr = useRef(0);

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
        return numberToPop;
      }
      // console.log("do single w fun", numberToPop);
      // setPopNumbers(newPopNumbers);
      // setPopNum(numberToPop);
      // return numberToPop;
    }
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
    inputWindow.current.focus();
  }, [text]);

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
              />
            );
          })}
        </section>
        <section className="input-section">
          <input
            type="text"
            id="input-window"
            value={inputValue}
            ref={inputWindow}
            onChange={updateInput}
          />
        </section>
      </div>
    </>
  );
};

export default PanelsContainer;
