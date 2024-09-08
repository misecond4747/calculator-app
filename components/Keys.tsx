"use client";
import { format } from "path";
import React from "react";

interface KeyProps {
  value: string;
  type: string;
  currentValue: string;
  setCurrentValue: (value: string) => void;
  previousValue: string;
  setPreviousValue: (value: string) => void;
}

const Keys = ({
  value,
  type,
  currentValue,
  setCurrentValue,
  previousValue,
  setPreviousValue,
}: KeyProps) => {
  const handleClick = () => {
    let calc;
    if (value === "RESET") {
      setCurrentValue("");
      setPreviousValue("");
    } else if (value === "DEL") {
      setCurrentValue(currentValue.slice(0, -1));
    } else if (value === "=") {
      if (
        currentValue === "" ||
        currentValue === "NaN" ||
        currentValue === "Infinity" ||
        currentValue === "."
      ) {
        return;
      }
      try {
        calc = eval(previousValue + currentValue);
        setCurrentValue(calc.toString());
        setPreviousValue("");
      } catch (error) {
        setCurrentValue("Error");
      }
    } else if (value === "+" || value === "-" || value === "/") {
      if (currentValue === "") {
        return;
      }
      if (previousValue !== "") {
        calc = eval(previousValue + currentValue);
        setPreviousValue(calc.toString() + value);
        setCurrentValue("");
      } else {
        setPreviousValue(currentValue + value);
        setCurrentValue("");
      }
    } else if (value === "x") {
      if (currentValue === "") {
        return;
      }
      value = "*";
      if (previousValue !== "") {
        calc = eval(previousValue + currentValue);
        setPreviousValue(calc.toString() + value);
        setCurrentValue("");
      } else {
        setPreviousValue(currentValue + value);
        setCurrentValue("");
      }
    } else {
      setCurrentValue(currentValue + value);
    }
  };

  return (
    <div
      className={`key ${type === "reset" ? "reset" : ""} ${
        type === "del" ? "del" : ""
      } ${type === "equal" ? "equal" : ""}`}
      onClick={handleClick}
    >
      {value}
    </div>
  );
};

export default Keys;
