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
const popNumbers = [];

const PanelsContainer = () => {
  //tutaj będzie rozbijanie teksu i rozdawanie pojedynczych słów panelom
  const [text, setText] = useState(defaultText);
  const [wordsOnly, setWordsOnly] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [wordsArrLength, setWordsArrLength] = useState(0);
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

  //this destroys connection smh
  // const drawPopNumber = () => {
  //   for (let i = 0; wordsArrLength; i++) {
  //     popNumbers.push(i);
  //   }
  // };

  // useEffect(() => {
  //   drawPopNumber();
  // }, [wordsArrLength]);
  // console.log("len", wordsArrLength);
  // console.log("popNumbers", popNumbers);

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
                // data-id={`${generatedId}-${word}`}
                // id={`${generatedId}-${word}`}
                // key={new Date().getTime().toString()}
                key={index}
                id={index}
                word={word}
                inputValue={inputValue}
                setInputValue={setInputValue}
                //I want it to be like that
                // popNumber={drawPopNumber()}
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
