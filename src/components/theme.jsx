import React, { useState } from "react";

export default function ThemeSwitcher(props) {
  console.log("Theme com render : ",props.theme)
    const handleThemeChange = (e) =>{
    props.handleThemeChange(e)
  }
  return (
    <div className="absolute top-0 left-0 p-4">
      <div className="flex">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="theme"
            value="light"
            onChange={handleThemeChange}
            className="radio radio-sm"
            checked={props.theme?.trim() === "light"}          
            />
          <span className="text-xs">Light</span>
        </label>

        <label className="ml-3  flex items-center space-x-2">
          <input
            type="radio"
            name="theme"
            value="dark"
            onChange={handleThemeChange}
            className="radio radio-sm "
            checked={props.theme?.trim() === "dark"}
             />
          <span className="text-xs">Dark</span>
        </label>

    
      </div>
    </div>
  );
}
