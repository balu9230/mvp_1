import { atom, selector } from 'recoil';

/*
 * SideBar Toggle
 */
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