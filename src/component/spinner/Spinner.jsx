import React, { useEffect, useRef, useState } from "react";
const Spinner = ({
  segments,
  segColors,
  winnerList,
  setWinnerList,
  primaryColor,
  primaryColoraround,
  contrastColor,
  buttonText,
  isOnlyOnce = true,
  size = 200,
  fontFamily = "proxima-nova",
  width = 100,
  height = 100,
}) => {
  let currentSegment = "";
  let isStarted = false;
  const [isFinished, setFinished] = useState(false);
  let timerHandle = 0;
  const timerDelay = segments.length;
  let angleCurrent = 0;
  let angleDelta = 0;
  let canvasContext = null;
  let maxSpeed = Math.PI / `${segments.length}`;

  let spinStart = 0;

  const centerX = 300;
  const centerY = 300;

  const nameRef = useRef("");
  const emailRef = useRef("");
  const discountRef = useRef(100);

  let downTime = 1000;

  useEffect(() => {
    wheelInit();
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0);
  }, [segments, segColors]);
  const wheelInit = () => {
    initCanvas();
    wheelDraw();
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const initCanvas = () => {
    let canvas = document.getElementById("canvas");
    if (navigator.appVersion.indexOf("MSIE") !== -1) {
      canvas = document.createElement("canvas");
      canvas.setAttribute("width", width);
      canvas.setAttribute("height", height);
      canvas.setAttribute("id", "canvas");
      document.getElementById("wheel").appendChild(canvas);
    }
    canvas.addEventListener("click", spin, false);
    canvasContext = canvas.getContext("2d");
  };
  const spin = () => {
    downTime = segments.length * Number(discountRef.current.value);

    if (nameRef.current.value === "") alert("Please enter a valid username");
    if (!isValidEmail(emailRef.current.value))
      alert("Please enter a valid email");

    const isEmailExists = winnerList.some(
      (user) => user.email === emailRef.current.value
    );

    if (!isEmailExists) {
      if (
        nameRef.current.value.trim() !== "" &&
        isValidEmail(emailRef.current.value)
      ) {
        isStarted = true;
        if (timerHandle === 0) {
          spinStart = new Date().getTime();
          maxSpeed = Math.PI / segments.length;

          timerHandle = setInterval(onTimerTick, timerDelay);
        }
      }
    } else {
      alert("Email already exists, Try with another email");
      emailRef.current.value = "";
    }
  };
  const onTimerTick = () => {
    draw();

    const duration = new Date().getTime() - spinStart;

    let progress = 0;
    let finished = false;

    progress = duration / downTime;
    angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
    if (progress >= 1) finished = true;

    angleCurrent += angleDelta;
    while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;

    if (finished) {
      setFinished(true);

      const newWinner = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        result: currentSegment,
      };

      const existingWinnerList =
        JSON.parse(localStorage.getItem("winnerList")) || [];
      const newWinnerList = [...existingWinnerList, newWinner];
      setWinnerList(newWinnerList);
      localStorage.setItem("winnerList", JSON.stringify(newWinnerList));

      clearInterval(timerHandle);
      timerHandle = 0;
      angleDelta = 0;
    }
  };
  const wheelDraw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };
  const draw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };
  const drawSegment = (key, lastAngle, angle) => {
    const ctx = canvasContext;
    const value = segments[key];
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, size, lastAngle, angle, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = segColors[key];
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((lastAngle + angle) / 2);
    ctx.fillStyle = contrastColor || "white";
    ctx.font = "bold 1em " + fontFamily;
    ctx.fillText(value.substr(0, 21), size / 2 + 20, 0);
    ctx.restore();
  };
  const drawWheel = () => {
    const ctx = canvasContext;
    let lastAngle = angleCurrent;
    const len = segments.length;
    const PI2 = Math.PI * 2;
    ctx.lineWidth = 1;
    ctx.strokeStyle = primaryColor || "black";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "1em " + fontFamily;
    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent;
      drawSegment(i - 1, lastAngle, angle);
      lastAngle = angle;
    }
    // Draw a center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, PI2, false);
    ctx.closePath();
    ctx.fillStyle = primaryColor || "black";
    ctx.lineWidth = 5;
    ctx.strokeStyle = contrastColor || "white";
    ctx.fill();
    ctx.font = "bold 2em " + fontFamily;
    ctx.fillStyle = contrastColor || "white";
    ctx.textAlign = "center";
    ctx.fillText(buttonText || "Spin", centerX, centerY + 3);
    ctx.stroke();
    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, PI2, false);
    ctx.closePath();
    ctx.lineWidth = 25;
    ctx.strokeStyle = primaryColoraround || "white";
    ctx.stroke();
  };
  const drawNeedle = () => {
    const ctx = canvasContext;
    ctx.lineWidth = 1;
    ctx.strokeStyle = contrastColor || "white";
    ctx.fileStyle = contrastColor || "white";
    ctx.beginPath();
    ctx.moveTo(centerX + 10, centerY - 40);
    ctx.lineTo(centerX - 10, centerY - 40);
    ctx.lineTo(centerX, centerY - 60);
    ctx.closePath();
    ctx.fill();
    const change = angleCurrent + Math.PI / 2;
    let i =
      segments.length -
      Math.floor((change / (Math.PI * 2)) * segments.length) -
      1;
    if (i < 0) i = i + segments.length;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "transparent";
    ctx.font = "bold 1.5em " + fontFamily;
    currentSegment = segments[i];
    isStarted &&
      ctx.fillText(currentSegment, centerX + 10, centerY + size + 50);
  };
  const clear = () => {
    const ctx = canvasContext;
    ctx.clearRect(0, 0, 1000, 800);
  };
  return (
    <div>
      <div className="user_input">
        <input
          type="text"
          ref={nameRef}
          placeholder="Enter your username "
          required
        />
        <input type="text" ref={emailRef} placeholder="Email " required />

        <select id="selectOption" ref={discountRef} required>
          <option value="">Select spin time</option>
          <option value={200}>2s</option>
          <option value={300}> 3s</option>
          <option value={400}> 4s</option>
          <option value={500}> 5s</option>
        </select>
      </div>
      <div id="wheel">
        <canvas
          id="canvas"
          width="600"
          height="600"
          style={{
            pointerEvents: isFinished && isOnlyOnce ? "none" : "auto",
          }}
        />
      </div>
    </div>
  );
};
export default Spinner;
