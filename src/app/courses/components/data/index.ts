// 1. Import all your individual course objects
import { corporateSustainabilityCourse } from './corporate-sustainability';
import { climateFinanceCourse } from './climate-finance';
import { esgReportingCourse } from './esg-reporting';

// 2. Export them as a single array that the rest of your app can use
export const courses = [
  corporateSustainabilityCourse,
  climateFinanceCourse,
  esgReportingCourse,
];
