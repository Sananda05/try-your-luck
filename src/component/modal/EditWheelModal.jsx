import { useRef, useState } from "react";

import "./EditWheel.css";

import colorPickerIcon from "../../assets/icon/color-wheel.png";

const EditWheelModal = ({
  setModalOpener,
  modalOpener,
  colorList,
  options,
  setOptions,
  setColorList,
}) => {
  const [color, setColor] = useState("#7975f0");
  const [selectedOption, setSelectedOption] = useState("");
  const valueRef = useRef("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    console.log(newColor.hex);
  };

  const handleAddNewValue = (e) => {
    e.preventDefault();
    const newValue = valueRef.current.value + selectedOption;

    setOptions([...options, newValue]);
    setColorList([...colorList, color]);

    setModalOpener(!modalOpener);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleAddNewValue}>
          <input
            className="value_input"
            type="text"
            placeholder="Enter the value"
            id="value"
            name="value"
            ref={valueRef}
            //   onKeyDown={handleKeyDown}
          />
          <select
            id="selectOption"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="">Select type</option>
            <option value="Tk">Fixed</option>
            <option value="%"> Percentage</option>
          </select>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "250px",
            }}
          >
            <img
              src={colorPickerIcon}
              alt="color picker"
              height={"20px"}
              width={"20px"}
            />
            <p style={{ fontSize: "14px" }}>Pick a color</p>
            <input
              className="color_input"
              type="color"
              value={color}
              onChange={(e) => handleColorChange({ hex: e.target.value })}
            />
          </div>

          <div className="modal_button_group">
            <button
              className="cancel_btn"
              onClick={() => setModalOpener(!modalOpener)}
            >
              cancel
            </button>
            <button className="create_btn" type="submit">
              create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWheelModal;
