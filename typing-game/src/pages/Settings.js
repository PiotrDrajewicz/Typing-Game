import { useRef, useState, useCallback, useEffect, createRef } from "react";
import { useGlobalContext } from "../context";
import OnOffSwitch from "../components/OnOffSwitch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fa8, faCircleNotch, faListCheck } from '@fortawesome/free-solid-svg-icons'


const poemsUrl = "https://poetrydb.org/author,title/Shakespeare;Sonnet";
// fontawesome.library.add(faCoffee);

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
  const refArr = [];

  const [isMusicOn, setIsMusicOn] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [displayedNum, setDisplayedNum] = useState(lsInterval / 1000 || 1);
  const [poems, setPoems] = useState([]);
  const [activePoemId, setActivePoemId] = useState(localStorage.getItem('poem id'));
  const [loading, setLoading] = useState(false);

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

  const fetchData = useCallback(async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      setPoems(data);
      // console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  });

  const putTitleInLs = (title, index) => {
    localStorage.setItem("title", title);
    localStorage.setItem("poem id", index);
  };
  
  const markPoemActive = (e) => {
    // console.log(poemItem.current.innerHTML);
    // console.log(title);
    // console.log(index);
    // console.log('iddd', refs.current);
    console.log('iddd', e.target);
    setActivePoemId(e.target.id);
  }

  useEffect(() => {
    fetchData(poemsUrl);
  }, []);

  console.log('ppp', Number(activePoemId));

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
          <OnOffSwitch soundType={"music"} />
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
          {loading ? <FontAwesomeIcon className="texts-loading-icon" icon={faListCheck} beat size='3x' /> : 
          <ul className="texts-list">
            {poems.map((text, index) => {
              const { title } = text;
              return (
                <li
                  className={`text-item ${index === Number(activePoemId) ? 'active' : ''}`}
                  id={index}
                  key={index}
                  onClick={(e) => {
                    putTitleInLs(title, index);
                    markPoemActive(e);
                }}
                >
                  {title}
                </li>
              );
            })}
          </ul>}
        </div>
      </section>
    </>
  );
};

export default Settings;
