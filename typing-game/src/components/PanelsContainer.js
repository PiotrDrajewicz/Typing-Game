import { useEffect, useState } from "react";
import SinglePanel from "./SinglePanel";
import nextId from "react-id-generator";

const PanelsContainer = () => {
  //tutaj będzie rozbijanie teksu i rozdawanie pojedynczych słów panelom
  const defaultText =
    "This allows users to link 345 to a specific portion of a page, using a text snippet provided in the book.";
  const [text, setText] = useState(defaultText);
  const [wordsOnly, setWordsOnly] = useState([]);
  const [inputValue, setInputValue] = useState("");
  // let wordsOnly = [];

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

  const updateInput = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  };

  useEffect(() => {
    splitText(text);
  }, []);

  return (
    <>
      <section className="input-section">
        <input
          type="text"
          id="input-window"
          value={inputValue}
          onChange={updateInput}
        />
      </section>
      <section className="panels-container">
        {wordsOnly.map((word) => {
          const generatedId = nextId();
          return (
            <SinglePanel
              key={generatedId}
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
