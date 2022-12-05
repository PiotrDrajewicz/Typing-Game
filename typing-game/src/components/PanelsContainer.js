import { useEffect, useState } from "react";
import SinglePanel from "./SinglePanel";
import nextId from "react-id-generator";

const PanelsContainer = () => {
  //tutaj będzie rozbijanie teksu i rozdawanie pojedynczych słów panelom
  const defaultText =
    "This allows users to link 345 to a specific portion of a page, using a text snippet provided in the book.";
  const [text, setText] = useState(defaultText);
  const [wordsOnly, setWordsOnly] = useState([]);
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

  useEffect(() => {
    splitText(text);
  }, []);

  return (
    <section className="panels-container">
      {wordsOnly.map((word) => {
        const generatedId = nextId();
        return <SinglePanel key={generatedId} word={word} />;
      })}
    </section>
  );
};

export default PanelsContainer;
