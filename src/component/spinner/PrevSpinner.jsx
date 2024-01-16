import React, { useRef, useEffect } from "react";

const SpinnerWheel = ({ options, colorList, rotationAngle }) => {
  const wheelCanvasRef = useRef(null);
  const arrowCanvasRef = useRef(null);

  useEffect(() => {
    const wheelCanvas = wheelCanvasRef.current;
    const wheelCtx = wheelCanvas.getContext("2d");

    const drawWheel = () => {
      const radius = wheelCanvas.width / 2;
      const numSections = options.length;
      const sectionAngle = (2 * Math.PI) / numSections;

      wheelCtx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);

      wheelCtx.save();
      wheelCtx.translate(radius, radius);
      wheelCtx.rotate((rotationAngle * Math.PI) / 180);
      wheelCtx.translate(-radius, -radius);

      for (let i = 0; i < numSections; i++) {
        const startAngle = i * sectionAngle;
        const endAngle = (i + 1) * sectionAngle;

        wheelCtx.beginPath();
        wheelCtx.moveTo(radius, radius);
        wheelCtx.arc(radius, radius, radius, startAngle, endAngle);
        wheelCtx.fillStyle = colorList[i];
        wheelCtx.fill();

        wheelCtx.save();
        wheelCtx.translate(radius, radius);
        wheelCtx.rotate(startAngle + sectionAngle / 2);
        wheelCtx.textAlign = "center";
        wheelCtx.fillStyle = "white";
        wheelCtx.font = "bold 18px Arial";
        wheelCtx.fillText(options[i], radius / 2, 0);
        wheelCtx.restore();
      }

      wheelCtx.restore();
    };

    drawWheel();
    drawPointer();
  }, [rotationAngle, options, colorList]);

  const drawPointer = () => {
    const canvas = wheelCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(canvas.width - 10, canvas.height / 2 - 20);
    ctx.lineTo(canvas.width - 10, canvas.height / 2 + 20);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.closePath();
    ctx.fillStyle = "#000000";
    ctx.fill();
  };

  // useEffect(() => {
  //   const drawArrow = () => {
  //     const arrowCanvas = arrowCanvasRef.current;
  //     const arrowCtx = arrowCanvas.getContext("2d");

  //     arrowCtx.clearRect(0, 0, arrowCanvas.width, arrowCanvas.height);

  //     arrowCtx.beginPath();
  //     arrowCtx.moveTo(arrowCanvas.width, arrowCanvas.height / 2);
  //     arrowCtx.lineTo(0, 0);
  //     arrowCtx.lineTo(0, arrowCanvas.height);
  //     arrowCtx.closePath();

  //     arrowCtx.fillStyle = "#c5baf1";
  //     arrowCtx.fill();
  //   };

  //   drawArrow();
  // }, [rotationAngle]);

  return (
    <div
      style={{
        position: "relative",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#cec6ed",
          borderRadius: "50%",
          height: "500px",
          width: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <canvas
          ref={wheelCanvasRef}
          width={450}
          height={450}
          style={{
            border: "1px solid #ccc",
            borderRadius: "50%",
            position: "relative",
          }}
        />
        <div
          style={{
            height: "40px",
            width: "40px",
            position: "absolute",
            backgroundColor: "white",
            alignItems: "center",
            borderRadius: "50%",
            border: "10px solid #c5baf1",
          }}
        ></div>
      </div>
      {/* <canvas
        style={{ position: "absolute" }}
        ref={arrowCanvasRef}
        width={30}
        height={30}
      /> */}
    </div>
  );
};

export default SpinnerWheel;
