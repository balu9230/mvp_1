function generate_options_from_limits(recepticle, key, start, stop, step) {
  let i = start;
  recepticle[key] = [];
  while (i <= stop) {
    recepticle[key].push({'option_value': i, 'option_display_value': i});
    i += step;
  }
}

function generate_options_from_items(recepticle, key, source_array) {
  recepticle[key] = [];
  for (let i in source_array) {
    recepticle[key].push({'option_value': i, 'option_display_value': source_array[i]});
  }
}
// Describe for each suuported country individually
const STATIC_OPTIONS_PRE_USA = {
  "Height": [
    "4ft 4in", "4ft 5in", "4ft 6in", "4ft 7in", "4ft 8in", "4ft 9in", "4ft 10in", "4ft 11in", 
    "5ft 0in", "5ft 1in", "5ft 2in", "5ft 3in", "5ft 4in", "5ft 5in", "5ft 6in", "5ft 7in", "5ft 8in", "5ft 9in", "5ft 10in", "5ft 11in", 
    "6ft 0in", "6ft 1in", "6ft 2in", "6ft 3in", "6ft 4in", "6ft 5in", "6ft 6in", "6ft 7in", "6ft 8in", "6ft 9in", "6ft 10in", "6ft 11in",
    "7ft 0in",
  ],
  "Highest Education": ["Ph.D", "Masters", "Bachelors", "Vocational/Trade", "Diploma", "High School", "Other"],
  "Salary": [
    "Below $20k", "$20k - $40k", "$40k - $60k", "$60k - $80k", "$80k - $100k", "$100k - $120k",
    "$120k - $150k", "$150k - $200k", "$200k - $300k", "$300k - $500k", "$500k - $1M", "Above $1M", "Other"
  ],
  // License - Attribution required: https://simplemaps.com/data/us-cities
  "Current City": [
    'Atlanta, GA', 'Austin, TX', 'Baltimore, MD', 'Boston, MA', 'Bronx, NY', 'Brooklyn, NY',
    'Charlotte, NC', 'Chicago, IL', 'Cincinnati, OH', 'Cleveland, OH', 'Columbus, OH', 'Dallas, TX', 'Denver, CO',
    'Detroit, MI', 'Houston, TX', 'Indianapolis, IN', 'Jacksonville, FL', 'Kansas City, MO', 'Las Vegas, NV',
    'Los Angeles, CA', 'Louisville, KY', 'Manhattan, NY', 'Memphis, TN', 'Miami, FL', 'Milwaukee, WI',
    'Minneapolis, MN', 'Nashville, TN', 'New Orleans, LA', 'New York, NY', 'Orlando, FL', 'Philadelphia, PA',
    'Phoenix, AZ', 'Pittsburgh, PA', 'Portland, OR', 'Providence, RI', 'Queens, NY', 'Raleigh, NC', 
    'Richmond, VA', 'Riverside, CA', 'Sacramento, CA', 'Salt Lake City, UT', 'San Antonio, TX', 'San Diego, CA', 
    'San Francisco, CA', 'San Jose, CA', 'Seattle, WA', 'St. Louis, MO', 'Tampa, FL', 'Virginia Beach, VA',
    'Washington, DC',
      ],
  "Hometown": [
    'Atlanta, GA', 'Austin, TX', 'Baltimore, MD', 'Boston, MA', 'Bronx, NY', 'Brooklyn, NY',
    'Charlotte, NC', 'Chicago, IL', 'Cincinnati, OH', 'Cleveland, OH', 'Columbus, OH', 'Dallas, TX', 'Denver, CO',
    'Detroit, MI', 'Houston, TX', 'Indianapolis, IN', 'Jacksonville, FL', 'Kansas City, MO', 'Las Vegas, NV',
    'Los Angeles, CA', 'Louisville, KY', 'Manhattan, NY', 'Memphis, TN', 'Miami, FL', 'Milwaukee, WI',
    'Minneapolis, MN', 'Nashville, TN', 'New Orleans, LA', 'New York, NY', 'Orlando, FL', 'Philadelphia, PA',
    'Phoenix, AZ', 'Pittsburgh, PA', 'Portland, OR', 'Providence, RI', 'Queens, NY', 'Raleigh, NC', 
    'Richmond, VA', 'Riverside, CA', 'Sacramento, CA', 'Salt Lake City, UT', 'San Antonio, TX', 'San Diego, CA', 
    'San Francisco, CA', 'San Jose, CA', 'Seattle, WA', 'St. Louis, MO', 'Tampa, FL', 'Virginia Beach, VA',
    'Washington, DC',
  ],
  "Marital Status": ["Never Married", "Awaiting Divorce", "Divorced", "Widowed", "Annulled"],
  "Diet": ["Vegan", "Vegetarian", "Non-vegatarian"],
  "Habits - Drinking": ["Never", "Rarely", "Occasionally", "Often"],
  "Habits - Smoking": ["Never", "Rarely", "Occasionally", "Often"],
  "Describe your typical weekday (Mon-Fri).": [
    "Job/Office/Work", "Hanging Out with Friends", "Visit Bars", "Binge TV shows", "Travel to Nearby Places", 
    "Sleep Extra", "Read Books", "Hobby",
],
  "Describe your typical weekend (Sat, Sun).": [
    "Job/Office/Work", "Hanging Out with Friends", "Visit Bars", "Binge TV shows", "Travel to Nearby Places", 
    "Sleep Extra", "Read Books", "Hobby",
  ],
};

// Collection for all supported countries
const STATIC_OPTIONS_PRE_ALL = {
  "USA": STATIC_OPTIONS_PRE_USA,
}

// Determine user's country and get corresponding options
let COUNTRY = "USA";
const STATIC_OPTIONS_PRE = STATIC_OPTIONS_PRE_ALL[COUNTRY];

// Generate data structure as consumed by HMTL Select components
export const OPTIONS = {};

// 1. Age
generate_options_from_limits(OPTIONS, "Age", 18, 40, 1);
// 2. All other
for (let k in STATIC_OPTIONS_PRE) {
  generate_options_from_items(OPTIONS, k, STATIC_OPTIONS_PRE[k]);
}


