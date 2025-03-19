import React, { useState } from "react";
import "./ChatInterface.css";
import "./ChatStyles.css";

const ChatStyles = () => {
  const [selectedFont1, setSelectedFont1] = useState("Arial");
  const [selectedColor1, setSelectedColor1] = useState("#ffffff");
  const [selectedTextColor1, setSelectedTextColor1] = useState("#000000");
  const [selectedFont2, setSelectedFont2] = useState("Arial");
  const [selectedColor2, setSelectedColor2] = useState("#ffffff");
  const [selectedTextColor2, setSelectedTextColor2] = useState("#000000");
  const fonts = [
    "Arial",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Georgia",
  ];

  const chatStyles1 = {
    fontFamily: selectedFont1,
    backgroundColor: selectedColor1,
    color: selectedTextColor1,
  };

  const handleFont1Change = (e) => {
    setSelectedFont1(e.target.value);
  };
  const handleColor1Change = (e) => {
    setSelectedColor1(e.target.value);
  };
  const handleTextColor1Change = (e) => {
    setSelectedTextColor1(e.target.value);
  };

  const chatStyles2 = {
    fontFamily: selectedFont2,
    backgroundColor: selectedColor2,
    color: selectedTextColor2,
  };

  const handleFont2Change = (e) => {
    setSelectedFont2(e.target.value);
  };
  const handleColor2Change = (e) => {
    setSelectedColor2(e.target.value);
  };
  const handleTextColor2Change = (e) => {
    setSelectedTextColor2(e.target.value);
  };

  return (
    <>
      <div className="customization-panel">
        <h3>Customize Chat Appearance</h3>
        <div className="df fdc jcsb aifs">
          <h4>Name 1</h4>
          <select
            value={selectedFont1}
            onChange={handleFont1Change}
            style={{ fontFamily: selectedFont1 }}
          >
            {fonts.map((font) => (
              <option key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </option>
            ))}
          </select>
          <label>
            Select Background Color:
            <input
              type="color"
              value={selectedColor1}
              onChange={handleColor1Change}
            />
          </label>

          <label>
            Select Text Color:
            <input
              type="color"
              value={selectedTextColor1}
              onChange={handleTextColor1Change}
            />
          </label>
          <div className="chat-container" style={chatStyles1}>
            <p>This is a sample chat message!</p>
          </div>
        </div>
        <div className="df fdc jcsb aifs">
          <h4>Name 2</h4>
          <select
            value={selectedFont2}
            onChange={handleFont2Change}
            style={{ fontFamily: selectedFont2 }}
          >
            {fonts.map((font) => (
              <option key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </option>
            ))}
          </select>
          <label>
            Select Background Color:
            <input
              type="color"
              value={selectedColor2}
              onChange={handleColor2Change}
            />
          </label>

          <label>
            Select Text Color:
            <input
              type="color"
              value={selectedTextColor2}
              onChange={handleTextColor2Change}
            />
          </label>
          <div className="chat-container" style={chatStyles2}>
            <p>This is a sample chat message!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatStyles;
