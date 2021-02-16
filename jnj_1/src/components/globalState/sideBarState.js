import { atom, selector } from 'recoil';

export const sideBarActiveState = atom({
  key: "sideBarActiveState",
  default: false
});

export const toggleSideBarState = selector({
  key: "toggleSideBarState",
  set: ({ get, set }) => {
    const sideBarCurrentState = get(sideBarActiveState);
    set(sideBarActiveState, !sideBarCurrentState);
  }
});