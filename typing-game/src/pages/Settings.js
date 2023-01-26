import { useRef, useState, useCallback } from "react";
import { useGlobalContext } from "../context";
import OnOffSwitch from "../components/OnOffSwitch";

const textsArr = [
  "This thasem aurora pesem",
  "Plane plate car airport",
  "This thasem aurora pesem",
  "Plane plate car airport",
  "This thasem aurora pesem",
  "Plane plate car airport",
  "This thasem aurora pesem",
  "Plane plate car airport",
  "This thasem aurora pesem",
  "Plane plate car airport",
  "This thasem aurora pesem",
  "Plane plate car airport",
  "This thasem aurora pesem",
  "Plane plate car airport",
  "This thasem aurora pesem",
  "Plane plate car airport",
  "This thasem aurora pesem",
  "Plane plate car airport",
  "This thasem aurora pesem",
  "Plane plate car airport",
];

const Settings = () => {
  const lsInterval = localStorage.getItem("popInterval");

  const [isMusicOn, setIsMusicOn] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [displayedNum, setDisplayedNum] = useState(lsInterval / 1000 || 1);
  // const musicSwitch = useRef(null);

  const switchMusicBtn = () => {
    setIsMusicOn((prevVal) => !prevVal);
  };

  const changeDisplayedNumber = (e) => {
    setDisplayedNum(e.target.innerHTML);
    setIsDropdownOpen(false);
    localStorage.setItem(
      "popInterval",
      JSON.stringify(Number(e.target.innerHTML) * 1000)
    );
  };

  console.log("RRRRRRRRRRRRRRRRRRRRRRRRR", Number(displayedNum));
  console.log(
    "PPPPPPPPPPPPPPPPPPPPPPPPP",
    Number(localStorage.getItem("popInterval"))
  );
  return (
    <>
      <section className="settings-section">
        <div id="interval-selection" className="setting-area">
          <p className="setting-label">Time interval [s]</p>
          <div className="dropdown-container-all">
            <p
              className="dropdown-label dropdown-val"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {displayedNum}
            </p>
            <div className={`dropdown-container ${isDropdownOpen && "open"}`}>
              <p
                className="dropdown-item dropdown-val"
                onClick={(e) => changeDisplayedNumber(e)}
              >
                0.5
              </p>
              <p
                className="dropdown-item dropdown-val"
                onClick={(e) => changeDisplayedNumber(e)}
              >
                1
              </p>
              <p
                className="dropdown-item dropdown-val"
                onClick={(e) => changeDisplayedNumber(e)}
              >
                2
              </p>
              <p
                className="dropdown-item dropdown-val"
                onClick={(e) => changeDisplayedNumber(e)}
              >
                3
              </p>
            </div>
          </div>
        </div>
        <div id="music-switch" className="setting-area">
          <p className="setting-label">Music</p>
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
        </div>
        <div id="music-switch" className="setting-area">
          <p className="setting-label">Click sound</p>
          <OnOffSwitch soundType={"clickSound"} />
        </div>
        <div id="music-switch" className="setting-area">
          <p className="setting-label">Check sound</p>
          <OnOffSwitch soundType={"checkSound"} />
        </div>
        <div id="text-selection" className="setting-area">
          <p id="text-label" className="setting-label">
            Text
          </p>
          <ul className="texts-list">
            {textsArr.map((text, index) => {
              return (
                <li className="text-item" key={index}>
                  {text}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Settings;
