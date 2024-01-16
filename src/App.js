import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./component/navbar/Navbar";
import SpinnerComponent from "./component/spinner/SpinnerComponent";
import WinnerList from "./component/winner-list/WinnerList";

function App() {
  const [modalOpener, setModalOpener] = useState(false);
  const [options, setOptions] = useState([
    "10%",
    "200 Tk",
    "30%",
    "44%",
    "500 Tk",
    "67%",
    "17%",
    "80 Tk",
  ]);
  const [colorList, setColorList] = useState([
    "#3498db",
    "#f02f19",
    "#09a23c",
    "#fa910f",
    "#9b59b6",
    "#730885",
    "#22c5e6",
    "#cf24de",
  ]);

  const getWinnerListFromLocalStorage = () => {
    const storedWinnerList = localStorage.getItem("winnerList");
    if (storedWinnerList) {
      return JSON.parse(storedWinnerList);
    }
    return [];
  };

  useEffect(() => {
    const storedWinnerList = getWinnerListFromLocalStorage();
    setWinnerList(storedWinnerList);
  }, []);

  const [winnerList, setWinnerList] = useState(getWinnerListFromLocalStorage());

  return (
    <div className="App">
      <div>
        <Navbar modalOpener={modalOpener} setModalOpener={setModalOpener} />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <SpinnerComponent
            modalOpener={modalOpener}
            setModalOpener={setModalOpener}
            options={options}
            setOptions={setOptions}
            colorList={colorList}
            setColorList={setColorList}
            winnerList={winnerList}
            setWinnerList={setWinnerList}
          />
          <WinnerList winnerList={winnerList} />
        </div>
      </div>
    </div>
  );
}

export default App;
