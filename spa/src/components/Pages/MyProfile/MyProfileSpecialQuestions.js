import { DEFAULT_COUNTRY } from '../../../constants';

export const SUPPORTED_COUNTRIES = [DEFAULT_COUNTRY, "USA", "UK", "India"];

export function getCountrySpecificSpecialQuestions(country) {
  const questions = [];
  for (let q of QUESTION_BANK) {
    if (q["supported_countries"].includes(country)) questions.push(q);
  }
  return questions;
}

const QUESTION_BANK = [
  {
    "question_id": "1",
    "question": "Describe your typical weekday (Mon-Fri). Specify total hours spent on your top 4 activities. " + 
                "Then, split them between your top 4 activities.",
    "type": "slicer_dropdown",
    "supported_countries": [DEFAULT_COUNTRY, "USA", "UK", "India"],
    "helper_info": "For example, if I spend a total of 14h/day between my 4 top activities, then I'd set 14 as total " +
                   "and, using the slider, allocate - 1. 9h for Work/Job   2. 1h for Gym   3. 2h for Netflix   4. 2h for Cooking",
  },
  {
    "question_id": "2",
    "question": "Describe your typical weekend (Sat/Sun/holiday). Specify total hours spent on your top 4 activities. " + 
                "Then, split them between your top 4 activities.",
    "type": "slicer_dropdown",
    "supported_countries": [DEFAULT_COUNTRY, "USA", "UK", "India"],
    "helper_info": "For example, if I spend a total of 12h/day between my 4 top activities, then I'd set 14 as total " +
                   "and, using the slider, allocate - 1. 3h for Spend time with Family   2. 4h for Hanging out with Friends   3. 3h for Netflix   4. 2h for Extra Sleep",
  },
];