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
import clickSound from "../clickSound.wav";

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
  const clickContainer = useRef(null);
  const [wordsOnlyArrState, setWordsOnlyArrState] = useState([]);
  const [poemTitle, setPoemTitle] = useState("");
  const [poemUrl, setPoemUrl] = useState(
    "https://poetrydb.org/author,title/Shakespeare;Sonnet 1: From fairest creatures we desire increase"
  );
  // const [removedWord, setRemovedWord] = useState("");

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
        // console.log("draw 1");
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
        // console.log("draw 2");
        return numberToPop;
      }
      // console.log("do single w fun", numberToPop);
      // setPopNumbers(newPopNumbers);
      // setPopNum(numberToPop);
      // return numberToPop;
    }
  };

  const startGame = () => {
    console.log("START START START");
    setInputValue(" ");
    setWordsOnly(wordsOnlyArrState);
    iteration = 0;
    setTimeout(() => {
      setInputValue("");
    }, 1);
    inputWindow.current.focus();
    setIsGameRunning(true);
  };

  const pauseGame = () => {
    console.log("PAUSE PAUSE PAUSE");
    setIsGameRunning(false);
    setPaused(true);

    //STWÓRZ NOWE WORDSONLY
  };

  const resetGame = () => {
    setWordsOnly([]);
    iteration = 0;
  };

  const fetchData = useCallback(async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const poemObj = await data[0];
      console.log("tekst", poemObj);
      setText(poemObj.lines.join(' '));
    } catch (error) {
      console.log(error);
    }
  });

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

  useEffect(() => {
    if (localStorage.getItem("title")) {
      const title = localStorage.getItem("title");
      // console.log("title", title);
      setPoemUrl(`https://poetrydb.org/author,title/Shakespeare;${title}`);
    }
    fetchData(poemUrl);
  }, [poemTitle]);

  useEffect(() => {
    const clickContainerElement = clickContainer.current;

    setPoemTitle(localStorage.getItem("title"));

    if (
      !localStorage.getItem("clickSound") ||
      localStorage.getItem("clickSound") === "ON"
    ) {
      clickContainerElement.addEventListener("keydown", () => {
        const audioClick = new Audio(clickSound);
        audioClick.play();
      });
    }

    if (localStorage.getItem("clickSound") === "OFF") {
      clickContainerElement.removeEventListener("keydown", () => {
        const audioClick = new Audio(clickSound);
        audioClick.play();
      });
    }

    return () =>
      clickContainerElement.removeEventListener("keydown", () => {
        const audioClick = new Audio(clickSound);
        audioClick.play();
      });
  }, []);

  // useEffect(() => {
  //   const neww = wordsOnly.filter((word) => word !== removedWord);
  //   setWordsOnly(neww);
  // }, [removedWord]);

  // console.log("pop numsss: ", newPopNumbers);
  // console.log("title", poemUrl);

  return (
    <>
      <div ref={clickContainer} className="input-panels-container">
        <p className="score-counter">score: </p>
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
                // setRemovedWord={setRemovedWord}
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
              autoComplete="off"
            />
          </div>
          <div className="main-buttons">
            <button type="button" className="main-button" onClick={startGame}>
              Start
            </button>
            <button type="button" className="main-button" onClick={pauseGame}>
              Pause
            </button>
            <button type="button" className="main-button" onClick={resetGame}>
              Reset
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default PanelsContainer;
