import { atom, selector } from 'recoil';

/*
 * Seated Toggle
 */
export const seatedState = atom({
  key: "seatedState",
  default: false
});

export const toggleSeatedState = selector({
  key: "toggleSeatedState",
  set: ({ get, set }) => {
    const seatedCurrentState = get(seatedState);
    set(seatedState, !seatedCurrentState);
  }
});