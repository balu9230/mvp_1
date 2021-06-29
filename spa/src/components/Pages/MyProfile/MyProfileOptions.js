import { DEFAULT_COUNTRY, EMPTY_FORM_VAL } from '../../../constants';
import { SUPPORTED_COUNTRIES } from './MyProfileQuestions';

/* Determine user's country and get corresponding options */
export function getCountrySpecificOptions(country) {
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
  "Current Country": [
    "USA", "UK", "India",
  ],
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
    'Other Country', 'Atlanta, GA', 'Austin, TX', 'Baltimore, MD', 'Boston, MA', 'Bronx, NY', 'Brooklyn, NY',
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
};

// UK
const STATIC_OPTIONS_PRE_UK = {
  "Current Country": [
    "USA", "UK", "India",
  ],
  "Height": [
    "4ft 4in", "4ft 5in", "4ft 6in", "4ft 7in", "4ft 8in", "4ft 9in", "4ft 10in", "4ft 11in", 
    "5ft 0in", "5ft 1in", "5ft 2in", "5ft 3in", "5ft 4in", "5ft 5in", "5ft 6in", "5ft 7in", "5ft 8in", "5ft 9in", "5ft 10in", "5ft 11in", 
    "6ft 0in", "6ft 1in", "6ft 2in", "6ft 3in", "6ft 4in", "6ft 5in", "6ft 6in", "6ft 7in", "6ft 8in", "6ft 9in", "6ft 10in", "6ft 11in",
    "7ft 0in",
  ],
  "Highest Education": ["Ph.D", "Masters", "Bachelors", "Vocational/Trade", "Diploma", "High School", "Other"],
  "Salary": [
    "Below £15k", "£20k - £30k", "£30k - £40k", "£40k - £50k", "£50k - £60k", "£60k - £80k",
    "£80k - £100k", "£100k - £120k", "£120k - £150k", "£150k - £200k", "£200k - £300k", "Above £300k", "Other"
  ],
  "Current City": [
    'Aberdeen', 'Abertawe', 'Basildon', 'Belfast', 'Birmingham', 'Birstall',
    'Blackpool', 'Bournemouth', 'Brighton', 'Bristol', 'Caerdydd', 'Coventry', 'Croydon',
    'Derby', 'Dundee', 'Edinburgh', 'Enfield', 'Glasgow', 'Harrow', 'Huddersfield',
    'Ilford', 'Ipswich', 'Islington', 'Kingston upon Hull', 'Leeds', 'Leicester',
    'Liverpool', 'London', 'Luton', 'Manchester', 'Middlesbrough', 'Milton Keynes',
    'Newcastle', 'Norwich', 'Nottingham', 'Oxford', 'Plymouth', 'Poole', 'Portsmouth',
    'Reading', 'Saint Albans', 'Sale', 'Sheffield', 'Slough', 'Southampton',
    'Stoke-on-Trent', 'Sunderland', 'Swindon', 'Telford', 'Tottenham', 'Warrington',
    'Wolverhampton', 'Worthing', 'York',
      ],
  "Hometown": [
    'Other Country', 'Aberdeen', 'Abertawe', 'Basildon', 'Belfast', 'Birmingham', 'Birstall',
    'Blackpool', 'Bournemouth', 'Brighton', 'Bristol', 'Caerdydd', 'Coventry', 'Croydon',
    'Derby', 'Dundee', 'Edinburgh', 'Enfield', 'Glasgow', 'Harrow', 'Huddersfield',
    'Ilford', 'Ipswich', 'Islington', 'Kingston upon Hull', 'Leeds', 'Leicester',
    'Liverpool', 'London', 'Luton', 'Manchester', 'Middlesbrough', 'Milton Keynes',
    'Newcastle', 'Norwich', 'Nottingham', 'Oxford', 'Plymouth', 'Poole', 'Portsmouth',
    'Reading', 'Saint Albans', 'Sale', 'Sheffield', 'Slough', 'Southampton',
    'Stoke-on-Trent', 'Sunderland', 'Swindon', 'Telford', 'Tottenham', 'Warrington',
    'Wolverhampton', 'Worthing', 'York',
  ],
  "Marital Status": ["Never Married", "Awaiting Divorce", "Divorced", "Widowed", "Annulled"],
  "Diet": ["Vegan", "Vegetarian", "Non-vegatarian"],
  "Habits - Drinking": ["Never", "Rarely", "Occasionally", "Often"],
  "Habits - Smoking": ["Never", "Rarely", "Occasionally", "Often"],
};

// India
const STATIC_OPTIONS_PRE_INDIA = {
  "Current Country": [
    "USA", "UK", "India",
  ],
  "Height": [
    "4ft 4in", "4ft 5in", "4ft 6in", "4ft 7in", "4ft 8in", "4ft 9in", "4ft 10in", "4ft 11in", 
    "5ft 0in", "5ft 1in", "5ft 2in", "5ft 3in", "5ft 4in", "5ft 5in", "5ft 6in", "5ft 7in", "5ft 8in", "5ft 9in", "5ft 10in", "5ft 11in", 
    "6ft 0in", "6ft 1in", "6ft 2in", "6ft 3in", "6ft 4in", "6ft 5in", "6ft 6in", "6ft 7in", "6ft 8in", "6ft 9in", "6ft 10in", "6ft 11in",
    "7ft 0in",
  ],
  "Highest Education": ["Ph.D", "Masters", "Bachelors", "Vocational/Trade", "Diploma", "High School", "Other"],
  "Salary": [
    "Below ₹2L", "₹2L - ₹4L", "₹4L - ₹6L", "₹6L - ₹8L", "₹8L - ₹10L", "₹10L - ₹15L",
    "₹15L - ₹20L", "₹20L - ₹30L", "₹30L - ₹50L", "₹50L - ₹75L", "₹75L - ₹1Cr", "Above ₹1Cr", "Other"
  ],
  "Current City": [
    'Agra', 'Ahmedabad', 'Amritsar', 'Bengaluru', 'Bhopal', 'Bhubaneswar',
    'Chandigarh', 'Chennai', 'Coimbatore', 'Dehradun', 'Delhi-NCR', 'Dispur', 'Hyderabad',
    'Indore', 'Jaipur', 'Jalandhar', 'Jammu', 'Jodhpur', 'Kanpur', 'Kochi', 'Kolkata',
    'Kota', 'Kozhikode', 'Lucknow', 'Ludhiana', 'Mangaluru', 'Mumbai', 'Nagpur', 'Nashik',
    'Panaji', 'Patna', 'Pune', 'Raipur', 'Ranchi', 'Rohtak', 'Shimla', 'Srinagar', 'Surat',
    'Thiruvananthapuram', 'Vadodara', 'Visakhapatnam', 
      ],
  "Hometown": [
    'Other Country', 'Agra', 'Ahmedabad', 'Amritsar', 'Bengaluru', 'Bhopal', 'Bhubaneswar',
    'Chandigarh', 'Chennai', 'Coimbatore', 'Dehradun', 'Delhi-NCR', 'Dispur', 'Hyderabad',
    'Indore', 'Jaipur', 'Jalandhar', 'Jammu', 'Jodhpur', 'Kanpur', 'Kochi', 'Kolkata',
    'Kota', 'Kozhikode', 'Lucknow', 'Ludhiana', 'Mangaluru', 'Mumbai', 'Nagpur', 'Nashik',
    'Panaji', 'Patna', 'Pune', 'Raipur', 'Ranchi', 'Rohtak', 'Shimla', 'Srinagar', 'Surat',
    'Thiruvananthapuram', 'Vadodara', 'Visakhapatnam', 
  ],
  "Marital Status": ["Never Married", "Awaiting Divorce", "Divorced", "Widowed", "Annulled"],
  "Diet": ["Vegan", "Vegetarian", "Non-vegatarian"],
  "Habits - Drinking": ["Never", "Rarely", "Occasionally", "Often"],
  "Habits - Smoking": ["Never", "Rarely", "Occasionally", "Often"],
};

// No country identified
const STATIC_OPTIONS_PRE_DEFAULT = {
  "Current Country": SUPPORTED_COUNTRIES,
  "Height": [],
  "Highest Education": [],
  "Salary": [],
  "Current City": [],
  "Hometown": [],
  "Marital Status": [],
  "Diet": [],
  "Habits - Drinking": [],
  "Habits - Smoking": [],
  "Describe your typical weekday (Mon-Fri).": [],
  "Describe your typical weekend (Sat, Sun).": [],
};

/* Collection for all supported countries */
const STATIC_OPTIONS_PRE_ALL = {
  [DEFAULT_COUNTRY]: STATIC_OPTIONS_PRE_DEFAULT,
  "USA": STATIC_OPTIONS_PRE_USA,
  "UK": STATIC_OPTIONS_PRE_UK,
  "India": STATIC_OPTIONS_PRE_INDIA,
}






