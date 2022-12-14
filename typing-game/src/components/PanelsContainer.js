import { useEffect, useState, useRef, useCallback, memo } from "react";
import SinglePanel from "./SinglePanel";
import nextId from "react-id-generator";

// const defaultText =
//   "This allows users to link 345 to a specific portion of a page, using a text snippet provided in the book.";
const defaultText = "This.";

const PanelsContainer = () => {
  //tutaj będzie rozbijanie teksu i rozdawanie pojedynczych słów panelom
  const [text, setText] = useState(defaultText);
  const [wordsOnly, setWordsOnly] = useState([]);
  const [inputValue, setInputValue] = useState("");
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

    setWordsOnly(wordsOnlyArr);
  };

  const updateInput = () => {
    // setInputValue(e.target.value);
    setInputValue(inputWindow.current.value);
    // console.log(inputValue);
  };

  useEffect(() => {
    splitText(text);
    inputWindow.current.focus();
  }, [text]);

  return (
    <>
      <h2>count: {renderr.current++}</h2>
      <section className="input-section">
        <input
          type="text"
          id="input-window"
          value={inputValue}
          ref={inputWindow}
          onChange={updateInput}
        />
      </section>
      <section className="panels-container">
        {wordsOnly.map((word, index) => {
          // const generatedId = nextId();
          return (
            <SinglePanel
              // key={generatedId}
              key={new Date().getTime().toString()}
              // key={index}
              word={word}
              inputValue={inputValue}
            />
          );
        })}
      </section>
    </>
  );
};

export default PanelsContainer;
