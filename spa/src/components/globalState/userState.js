import { atom, selector } from 'recoil';
 
 /*
 * User Profile
 */
export const userProfileState = atom({
  key: "userProfileState",
  default: {
    currentCountry: undefined,
    currentCity: undefined,
    age: undefined,
    height: undefined,
    highestEducation: undefined,
    salary: undefined,
    hometown: undefined,
    maritalStatus: undefined,
    diet: undefined,
    drinking: undefined,
    smoking: undefined,
    typicalWeekday: undefined,
    typicalWeekend: undefined,
    lat: undefined, 
    long: undefined
  }
});

// export const toggleSideBarState = selector({
//   key: "toggleSideBarState",
//   set: ({ get, set }) => {
//     const sideBarCurrentState = get(sideBarActiveState);
//     set(sideBarActiveState, !sideBarCurrentState);
//   }
// });