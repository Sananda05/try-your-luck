import { useState, useEffect } from "react";

import "./Spinner.css";
import EditWheelModal from "../modal/EditWheelModal";
import SpinnerWheel from "./Spinner";
import WinnerDetails from "../modal/WinnerDetailsModal";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rotationAngle, setRotationAngle] = useState(0);

  let value = "";

  const [winnerModal, setWinnerModal] = useState(false);

  //   const indicatorIndex = 3;

  const spinWheel = () => {
    if (name.trim() !== "" && isValidEmail(email)) {
      const spinDuration = 2000;
      const frameDuration = 32;
      const frames = spinDuration / frameDuration;
      let currentFrame = 0;

      const randomOptionIndex = Math.floor(Math.random() * options.length);

      const animateSpin = () => {
        if (currentFrame < frames) {
          const randomRotation = Math.random() * 180; // Adjust rotation speed
          setRotationAngle(rotationAngle + randomRotation);

          currentFrame++;
          setTimeout(animateSpin, frameDuration);
        } else {
          value = options[randomOptionIndex];
          handlewinnerList();
        }
      };

      animateSpin();
    }
  };

  const handlewinnerList = () => {
    const newWinner = { name: name, email: email, result: value };

    setWinnerList([...winnerList, newWinner]);

    localStorage.setItem(
      "winnerList",
      JSON.stringify([...winnerList, newWinner])
    );
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="body_wrapper">
      <div className="user_input">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your username "
          required
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email "
          required
        />

        <button onClick={spinWheel}>Spin</button>
      </div>
      <SpinnerWheel
        options={options}
        colorList={colorList}
        rotationAngle={rotationAngle}
      />

      {winnerModal && <WinnerDetails name={name} result={value} />}

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
