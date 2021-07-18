import { atom, selector } from 'recoil';

/*
 * Mode Toggle
 */
export const modeState = atom({
  key: "modeState",
  default: "solo"
});

export const toggleModeState = selector({
  key: "toggleModeState",
  set: ({ get, set }) => {
    const modeCurrentState = get(modeState);
    set(modeState, modeCurrentState === "solo" ? "dual": "solo");
  }
});