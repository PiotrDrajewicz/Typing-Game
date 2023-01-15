const Settings = () => {
  return (
    <>
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
        <p className="music-option">ON</p>
        <p className="music-option">OFF</p>
      </div>
      <div id="text-selection" className="setting-area">
        <ul className="texts-list">
          <li className="text-item">1</li>
          <li className="text-item">2</li>
        </ul>
      </div>
    </>
  );
};

export default Settings;
