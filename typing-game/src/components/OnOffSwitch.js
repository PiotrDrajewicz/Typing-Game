import { useState, useEffect } from "react";

const test = 'to jest test';

const OnOffSwitch = ({ soundType }) => {
  const [isMusicOn, setIsMusicOn] = useState(() => {
    if (localStorage.getItem(`${soundType}`)) {
      if (localStorage.getItem(`${soundType}`) === "ON") {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  });

  const switchMusicBtn = () => {
    setIsMusicOn((prevVal) => !prevVal);
    localStorage.setItem(`${soundType}`, isMusicOn ? "OFF" : "ON");
  };

  useEffect(() => {
    if (localStorage.getItem(`${soundType}`)) {
      if (localStorage.getItem(`${soundType}`) === "ON") {
        setIsMusicOn(true);
      } else {
        setIsMusicOn(false);
      }
    } else {
      setIsMusicOn(true);
      localStorage.setItem(`${soundType}`, "ON");
    }
  }, []);

  console.log(`${soundType}: `, localStorage.getItem(`${soundType}`));

  return (
    <>
      <div
        className="music-on-off"
        // ref={musicSwitch}
        onClick={switchMusicBtn}
      >
        <p className={`music-option ${isMusicOn && "active"}`}>ON</p>
        <p id="music-slash" className="music-option">
          {" "}
          /{" "}
        </p>
        <p className={`music-option ${!isMusicOn && "active"}`}>OFF</p>
      </div>
    </>
  );
};

export default OnOffSwitch;
