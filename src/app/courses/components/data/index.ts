// Import the individual courses from their respective files
import { corporateSustainabilityCourse } from './corporate-sustainability';
import { climateFinanceCourse } from './climate-finance';
import { biodiversityConservationCourse } from './biodiversity-conservation';

// Export them as a single array that your website components will read
export const courses = [
  corporateSustainabilityCourse,
  climateFinanceCourse,
  biodiversityConservationCourse,
];
