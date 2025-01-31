const initialState = {
    gameStarted: false,
    gamePaused: false,
    kidsMode: false ,
    difficulty: 16 , // ✅ Default to Easy
    muteEffects: false,
    muteSound: false,
};

const GAME_START = "GAME_START";
const GAME_PAUSE = "GAME_PAUSE";
const GAME_RESUME = "GAME_RESUME";
const RESET_GAME = "RESET_GAME";
const ACTIVATE_KIDS_MODE = "ACTIVATE_KIDS_MODE"; // ✅ New Action
const DISABLE_KIDS_MODE = "DISABLE_KIDS_MODE"; // ✅ New Action
const SET_DIFFICULTY = "SET_DIFFICULTY"; // ✅ New Action
const MUTE_EFFECTS = "MUTE_EFFECTS"; // ✅ New Action
const ACTIVATE_EFFECTS = "ACTIVATE_EFFECTS"; // ✅ New Action
const MUTE_SOUND = "MUTE_SOUND"; // ✅ New Action
const ACTIVATE_SOUND = "ACTIVATE_SOUND"; // ✅ New Action

export function game(state = initialState, action) {
    console.log("Redux Action:", action); // ✅ Debug log

    switch (action.type) {
        case GAME_START:
            return { ...state, gameStarted: true, gamePaused: false };
        case GAME_PAUSE:
            return { ...state, gamePaused: true };
        case GAME_RESUME:
            return { ...state, gamePaused: false };
        case RESET_GAME:
            return { ...state, gameStarted: false };
        case ACTIVATE_KIDS_MODE: 
            return { ...state, kidsMode: true }; // ✅ Set kidsMode to true
        case DISABLE_KIDS_MODE: 
            return { ...state, kidsMode: false }; // ✅ Set kidsMode to false
        case ACTIVATE_EFFECTS: 
            return { ...state, muteEffects: false }; // ✅ Set kidsMode to true
        case MUTE_EFFECTS: 
            return { ...state, muteEffects: true }; // ✅ Set kidsMode to false
        case ACTIVATE_SOUND: 
            return { ...state, muteSound: false }; // ✅ Set kidsMode to true
        case MUTE_SOUND: 
            return { ...state, muteSound: true }; // ✅ Set kidsMode to false
        case SET_DIFFICULTY:
            return { ...state, difficulty: action.payload }; // ✅ Update difficulty
        default:
            return state;
    }
}

// Action Creators
export const startGame = () => ({ type: GAME_START });
export const pauseGame = () => ({ type: GAME_PAUSE });
export const resumeGame = () => ({ type: GAME_RESUME });
export const resetGameAction = () => ({ type: RESET_GAME });
export const activateKidsMode = () => ({ type: ACTIVATE_KIDS_MODE }); // ✅ New Action
export const disableKidsMode = () => ({ type: DISABLE_KIDS_MODE }); // ✅ New Action
export const activateEffects = () => ({ type: ACTIVATE_EFFECTS }); // ✅ New Action
export const muteEffects = () => ({ type: MUTE_EFFECTS }); // ✅ New Action
export const activateSound = () => ({ type: ACTIVATE_SOUND }); // ✅ New Action
export const muteSound = () => ({ type: MUTE_SOUND }); // ✅ New Action
export const setDifficulty = (difficulty) => ({ type: SET_DIFFICULTY, payload: difficulty }); // ✅ New Action

export default game;
