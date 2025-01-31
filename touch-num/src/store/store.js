import { legacy_createStore as createStore } from "redux";
import { game } from "./game/game.reducer.js";

export const store = createStore( game)

window.gStore = store
