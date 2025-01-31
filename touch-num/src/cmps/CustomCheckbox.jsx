import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activateEffects, activateSound, muteEffects, muteSound } from "../store/game/game.reducer";

export function CustomCheckbox({ controll }) {
    const muteSoundVar = useSelector((state) => state.muteSound);
    const muteEffectVar = useSelector((state) => state.muteEffect);

    const [isChecked, setIsChecked] = useState(controll === "sound" ? !muteSoundVar : !muteEffectVar);
    const dispatch = useDispatch();

    // 🔹 Sync `isChecked` whenever Redux state changes
    useEffect(() => {
        setIsChecked(controll === "sound" ? !muteSoundVar : !muteEffectVar);
    }, [muteSoundVar, muteEffectVar, controll]);

    const toggleCheckbox = () => {
        if (controll === "sound") {
            if (isChecked) dispatch(muteSound());
            else dispatch(activateSound());
        } else if (controll === "effects") {
            if (isChecked) dispatch(muteEffects());
            else dispatch(activateEffects());
        }
        setIsChecked(!isChecked);
    };

    return (
        <div onClick={toggleCheckbox} className={`checkbox ${isChecked ? "checked" : ""}`}>
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
    );
}
