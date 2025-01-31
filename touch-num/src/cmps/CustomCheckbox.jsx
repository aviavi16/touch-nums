import { useState } from "react";
import { useDispatch } from "react-redux";
import { activateEffects, activateSound, muteEffects, muteSound } from "../store/game/game.reducer";

export function CustomCheckbox({ controll }){
    const [isChecked, setIsChecked] = useState(true);
    const dispatch = useDispatch(); // Redux dispatcher

    const toggleCheckbox = () => {
        if(controll == "sound"){
            if ( isChecked ) dispatch(muteSound())
                else dispatch(activateSound())
        }
        if(controll == "effects"){
            if ( isChecked ) dispatch(muteEffects())
                else dispatch(activateEffects())
        }
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