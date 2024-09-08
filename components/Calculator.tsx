"use client";
import { useState, useEffect, useRef } from "react";
import Keys from "./Keys";

const Calculator = () => {
  const [currentValue, setCurrentValue] = useState("");
  const [previousValue, setPreviousValue] = useState("");
  const [theme, setTheme] = useState("theme1"); // Default theme
  const bottomScreenRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (bottomScreenRef.current) {
      bottomScreenRef.current.scrollLeft = bottomScreenRef.current.scrollWidth;
    }
  }, [currentValue]); // Trigger scrolling when currentValue changes

  const handleScroll = (e: any) => {
    console.log(e);
  };
  const formatValue = (value: string | number): string => {
    // Handle empty string and invalid values
    if (value === "") return "";

    // Convert the input value to a string (in case it's a number)
    const valueStr = value.toString();

    // If the value contains only a decimal point, return it as is
    if (valueStr === "." || valueStr.endsWith(".")) {
      return valueStr; // Allow partial input like "5." or "."
    }

    // Format valid numbers
    const formattedValue = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 10, // Adjust as needed
    }).format(Number(valueStr));

    return formattedValue;
  };

  const getType = (key: string) => {
    switch (key) {
      case "DEL":
        return "del";
      case "RESET":
        return "reset";
      case "=":
        return "equal";
      default:
        return "";
    }
  };

  const keys = [
    "7",
    "8",
    "9",
    "DEL",
    "4",
    "5",
    "6",
    "+",
    "1",
    "2",
    "3",
    "-",
    ".",
    "0",
    "/",
    "x",
    "RESET",
    "=",
  ];

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const body = document.body;
    setTheme(e.target.id);
    body?.classList.remove("theme2", "theme3");
    body?.classList.add(e.target.id);
  };

  return (
    <main className={`calculator`} role="main">
      {" "}
      {/* Apply theme class */}
      <nav className="intro" role="navigation">
        <h1 className="title">calc</h1>
        <div className="theme">
          <h3 className="themeTitle" role="heading">
            theme
          </h3>
          <div className="themeChanger">
            <div className="themeChangerLabels">
              <label htmlFor="theme1">1</label>
              <label htmlFor="theme2">2</label>
              <label htmlFor="theme3">3</label>
            </div>
            <div className="themeChangerRadioButtons">
              <input
                type="radio"
                name="theme"
                id="theme1"
                role="radio"
                checked={theme === "theme1"}
                onChange={handleThemeChange} // Handle theme change
              />
              <input
                type="radio"
                name="theme"
                id="theme2"
                role="radio"
                checked={theme === "theme2"}
                onChange={handleThemeChange} // Handle theme change
              />
              <input
                type="radio"
                name="theme"
                id="theme3"
                role="radio"
                checked={theme === "theme3"}
                onChange={handleThemeChange} // Handle theme change
              />
            </div>
          </div>
        </div>
      </nav>
      <div className="screens" role="textbox">
        <input
          type="text"
          value={previousValue || ""}
          className="topScreen"
          readOnly
        />
        <input
          type="text"
          value={formatValue(currentValue)}
          placeholder="0"
          className="bottomScreen"
          onChange={(e) => handleScroll(e)}
          max={100}
          ref={bottomScreenRef}
          readOnly
        />
      </div>
      <div className="keyboard">
        {keys.map((key, index) => (
          <Keys
            key={index}
            value={key}
            type={`${getType(key)}`}
            currentValue={currentValue}
            setCurrentValue={setCurrentValue}
            previousValue={previousValue}
            setPreviousValue={setPreviousValue}
          />
        ))}
      </div>
    </main>
  );
};

export default Calculator;
