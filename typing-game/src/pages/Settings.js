import { useRef, useState } from "react";

const Settings = () => {
  const [isMusicOn, setIsMusicOn] = useState(true);
  // const musicSwitch = useRef(null);

  const switchMusicBtn = () => {
    setIsMusicOn((prevVal) => !prevVal);
  };

  return (
    <>
      <section className="settings-section">
        <div id="interval-selection" className="setting-area">
          <label for="interval-val" className="setting-label">
            Time interval [s]
          </label>
          <select name="interval-val" id="interval-val">
            <option value="0.5" className="select-option">
              0.5
            </option>
            <option value="1" className="select-option">
              1
            </option>
            <option value="2" className="select-option">
              2
            </option>
            <option value="3" className="select-option">
              3
            </option>
            <option value="4" className="select-option">
              4
            </option>
            <option value="5" className="select-option">
              5
            </option>
          </select>
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
