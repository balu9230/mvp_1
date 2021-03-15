import { DEFAULT_COUNTRY, EMPTY_FORM_VAL } from '../../../constants';

/* Determine user's country and get corresponding options */
export function getCountrySpecificSpecialOptions(country) {
  const STATIC_OPTIONS_PRE = STATIC_OPTIONS_PRE_ALL[country];
  // Generate data structure as consumed by HMTL Select components
  const OPTIONS = {};
  // 1. Age
  generateOptionsFromLimits(OPTIONS, "Age", [EMPTY_FORM_VAL], 18, 40, 1);
  // 2. All other
  for (let k in STATIC_OPTIONS_PRE) {
    generateOptionsFromItems(OPTIONS, k, [EMPTY_FORM_VAL], STATIC_OPTIONS_PRE[k]);
  }
  console.log(OPTIONS);
  return OPTIONS;
}

/* Helper functions */
function generateOptionsFromLimits(recepticle, key, initial_push, start, stop, step) {
  let i = start;
  recepticle[key] = [];
  for (let item in initial_push) {
    recepticle[key].push({'option_value': initial_push[item], 'option_display_value': initial_push[item]});
  }
  while (i <= stop) {
    recepticle[key].push({'option_value': i, 'option_display_value': i});
    i += step;
  }
}

function generateOptionsFromItems(recepticle, key, initial_push, source_array) {
  recepticle[key] = [];
  for (let item in initial_push) {
    recepticle[key].push({'option_value': initial_push[item], 'option_display_value': initial_push[item]});
  }
  for (let i in source_array) {
    recepticle[key].push({'option_value': source_array[i], 'option_display_value': source_array[i]});
  }
}
/* Country-specific options */
// USA
const STATIC_OPTIONS_PRE_USA = {
  "1": [
    "Job/Office/Work", "Hanging Out with Friends", "Visit Bars", "Binge TV shows", "Travel to Nearby Places", 
    "Sleep Extra", "Read Books", "Hobby",
  ],
  "2": [
    "Job/Office/Work", "Hanging Out with Friends", "Visit Bars", "Binge TV shows", "Travel to Nearby Places", 
    "Sleep Extra", "Read Books", "Hobby",
  ],
};

// UK
const STATIC_OPTIONS_PRE_UK = {
  "1": [
    "Job/Office/Work", "Hanging Out with Friends", "Visit Bars", "Binge TV shows", "Travel to Nearby Places", 
    "Sleep Extra", "Read Books", "Hobby",
  ],
  "2": [
    "Job/Office/Work", "Hanging Out with Friends", "Visit Bars", "Binge TV shows", "Travel to Nearby Places", 
    "Sleep Extra", "Read Books", "Hobby",
  ],
};

// India
const STATIC_OPTIONS_PRE_INDIA = {
  "1": [
    "Job/Office/Work", "Hanging Out with Friends", "Visit Bars", "Binge TV shows", "Travel to Nearby Places", 
    "Sleep Extra", "Read Books", "Hobby",
  ],
  "2": [
    "Job/Office/Work", "Hanging Out with Friends", "Visit Bars", "Binge TV shows", "Travel to Nearby Places", 
    "Sleep Extra", "Read Books", "Hobby",
  ],
};

// No country identified
const STATIC_OPTIONS_PRE_DEFAULT = {
  "1": [
    "Job/Office/Work", "Hanging Out with Friends", "Visit Bars", "Binge TV shows", "Travel to Nearby Places", 
    "Sleep Extra", "Read Books", "Hobby",
  ],
  "2": [
    "Job/Office/Work", "Hanging Out with Friends", "Visit Bars", "Binge TV shows", "Travel to Nearby Places", 
    "Sleep Extra", "Read Books", "Hobby",
  ],
};

/* Collection for all supported countries */
const STATIC_OPTIONS_PRE_ALL = {
  [DEFAULT_COUNTRY]: STATIC_OPTIONS_PRE_DEFAULT,
  "USA": STATIC_OPTIONS_PRE_USA,
  "UK": STATIC_OPTIONS_PRE_UK,
  "India": STATIC_OPTIONS_PRE_INDIA,
}






