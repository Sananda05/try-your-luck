import { useState, useEffect, useRef } from "react";

import "./Spinner.css";
import EditWheelModal from "../modal/EditWheelModal";
// import WinnerDetails from "../modal/WinnerDetailsModal";
import Spinner from "./Spinner";

const SpinnerComponent = ({
  modalOpener,
  setModalOpener,
  options,
  setOptions,
  colorList,
  setColorList,
  winnerList,
  setWinnerList,
}) => {
  //   const [winnerModal, setWinnerModal] = useState(false);

  return (
    <div className="body_wrapper">
      <Spinner
        segments={options}
        segColors={colorList}
        winnerList={winnerList}
        setWinnerList={setWinnerList}
        primaryColor="black"
        primaryColoraround="#ffffffb4"
        contrastColor="white"
        buttonText="Spin"
        isOnlyOnce={false}
        size={200}
      />

      {/* {winnerModal && <WinnerDetails name={name} result={value} />} */}

      {modalOpener && (
        <EditWheelModal
          setModalOpener={setModalOpener}
          modalOpener={modalOpener}
          colorList={colorList}
          options={options}
          setOptions={setOptions}
          setColorList={setColorList}
        />
      )}
    </div>
  );
};

export default SpinnerComponent;
