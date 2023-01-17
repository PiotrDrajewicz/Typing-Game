import { useRef, useState, useCallback } from "react";
import { useGlobalContext } from "../context";

const Settings = () => {
  const { setPopIntervalContext } = useGlobalContext();

  const [isMusicOn, setIsMusicOn] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [displayedNum, setDisplayedNum] = useState(1);
  // const musicSwitch = useRef(null);

  const switchMusicBtn = () => {
    setIsMusicOn((prevVal) => !prevVal);
  };

  const changeDisplayedNumber = (e) => {
    setDisplayedNum(e.target.innerHTML);
    setIsDropdownOpen(false);
    setPopIntervalContext(Number(displayedNum) * 1000);
  };

  // const openDropdown = () => {

  // }
  console.log("RRRRRRRRRRRRRRRRRRRRRRRRR", Number(displayedNum));
  return (
    <>
      <section className="settings-section">
        <div id="interval-selection" className="setting-area">
          {/* <label htmlFor="interval-val" className="setting-label">
            Time interval [s]
          </label>
          <select
            name="interval-val"
            id="interval-val"
            value={lolo}
            onChange={(e) => setLolo(e.target.value)}
          >
            <option
              value="0.5"
              className="select-option dropdown-item dropdown-val"
            >
              0.5
            </option>
            <option
              value="1"
              className="select-option dropdown-item dropdown-val"
            >
              1
            </option>
            <option
              value="2"
              className="select-option dropdown-item dropdown-val"
            >
              2
            </option>
            <option
              value="3"
              className="select-option dropdown-item dropdown-val"
            >
              3
            </option>
            <option
              value="4"
              className="select-option dropdown-item dropdown-val"
            >
              4
            </option>
            <option
              value="5"
              className="select-option dropdown-item dropdown-val"
            >
              5
            </option>
          </select> */}
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
                1
              </p>
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
        <div id="text-selection" className="setting-area">
          <p className="setting-label">Text</p>
          <ul className="texts-list">
            <li className="text-item">This thasem aurora pesem</li>
            <li className="text-item">Plane plate car airport</li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Settings;
