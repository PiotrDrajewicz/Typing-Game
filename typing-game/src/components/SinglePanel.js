import { useEffect, useState, useRef } from "react";
import nextId from "react-id-generator";

const SinglePanel = ({ word, inputValue }) => {
  const [splittedWord, setSplittedWord] = useState([]);
  let [currentLetter, setCurrentLetter] = useState("");
  currentLetter = useRef(null);

  const splitIntoLetters = (word) => {
    const letters = word.split("");
    setSplittedWord(letters);
  };

  const checkLetterMatch = () => {
    const splittedInput = inputValue.split("");
    for (let i = 0; splittedInput.length; i++) {
      setCurrentLetter(splittedWord[i]);
      if (splittedWord[i] === splittedInput[i]) {
        currentLetter.style.color = "green";
      }
    }
  };

  useEffect(() => {
    splitIntoLetters(word);
    checkLetterMatch();
  }, []);

  return (
    <article className="single-panel">
      {splittedWord.map((letter) => {
        const letterId = nextId();
        return (
          <h3 key={letterId} className="panel-letter" ref={currentLetter}>
            {letter}
          </h3>
        );
      })}
    </article>
  );
};

export default SinglePanel;
