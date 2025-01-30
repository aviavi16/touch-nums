import { useState } from "react";

export function CustomCheckbox({ onMute }){
    const [isChecked, setIsChecked] = useState(false);
    
    const toggleCheckbox = () => {
        onMute();
        setIsChecked(!isChecked);
    }

    return(
        <div
            onClick={toggleCheckbox}
            className={`checkbox ${isChecked ? "checked" : ""}`}
            >
            {isChecked && (
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="checkmark"
                >
                <path d="M5 13l4 4L19 7" />
                </svg>
            )}
        </div>
    )
}