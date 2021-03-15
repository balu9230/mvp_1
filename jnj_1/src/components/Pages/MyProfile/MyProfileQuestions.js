import { DEFAULT_COUNTRY } from '../../../constants';

export const SUPPORTED_COUNTRIES = [DEFAULT_COUNTRY, "USA", "UK", "India"];

export function getCountrySpecificQuestions(country) {
  const questions = [];
  for (let q of QUESTION_BANK) {
    if (q["supported_countries"].includes(country)) questions.push(q);
  }
  return questions;
}

const QUESTION_BANK = [
  {
    "question": "Current Country",
    "type": "simple_dropdown",
    "supported_countries": [DEFAULT_COUNTRY, "USA", "UK", "India"],
  },
  {
    "question": "Current City",
    "type": "simple_dropdown",
    "supported_countries": [DEFAULT_COUNTRY, "USA", "UK", "India"],
  },
  {
    "question": "Age",
    "type": "simple_dropdown",
    "supported_countries": [DEFAULT_COUNTRY, "USA", "UK", "India"],
  },
  {
    "question": "Height",
    "type": "simple_dropdown",
    "supported_countries": [DEFAULT_COUNTRY, "USA", "UK", "India"],
  },
  {
    "question": "Highest Education",
    "type": "simple_dropdown",
    "supported_countries": [DEFAULT_COUNTRY, "USA", "UK", "India"],
  },
  {
    "question": "Salary",
    "type": "simple_dropdown",
    "supported_countries": [DEFAULT_COUNTRY, "USA", "UK", "India"],
  },
  {
    "question": "Hometown",
    "type": "simple_dropdown",
    "supported_countries": [DEFAULT_COUNTRY, "USA", "UK", "India"],
  },
  {
    "question": "Marital Status",
    "type": "simple_dropdown",
    "supported_countries": [DEFAULT_COUNTRY, "USA", "UK", "India"],
  },
  {
    "question": "Diet",
    "type": "simple_dropdown",
    "supported_countries": [DEFAULT_COUNTRY, "USA", "UK", "India"],
  },
  {
    "question": "Habits - Drinking",
    "type": "simple_dropdown",
    "supported_countries": [DEFAULT_COUNTRY, "USA", "UK", "India"],
  },
  {
    "question": "Habits - Smoking",
    "type": "simple_dropdown",
    "supported_countries": [DEFAULT_COUNTRY, "USA", "UK", "India"],
  },
];