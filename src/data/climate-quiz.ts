export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface QuizData {
  easy: Question[];
  medium: Question[];
  hard: Question[];
}

// Dummy data structure - replace with actual questions
export const climateQuizData: QuizData = {
  easy: [
    {
      id: 'easy-1',
      question: 'What is the primary greenhouse gas responsible for climate change?',
      options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
      correctAnswer: 1,
      explanation: 'Carbon dioxide (CO2) is the primary greenhouse gas driving climate change.',
      difficulty: 'easy',
      category: 'Basics',
    },
    {
      id: 'easy-2',
      question: 'Which renewable energy source uses wind to generate electricity?',
      options: ['Solar power', 'Wind power', 'Hydroelectric power', 'Geothermal power'],
      correctAnswer: 1,
      explanation: 'Wind power uses turbines to convert wind energy into electricity.',
      difficulty: 'easy',
      category: 'Energy',
    },
    {
      id: 'easy-3',
      question: 'What does "carbon footprint" refer to?',
      options: [
        'The physical size of carbon molecules',
        'The total amount of greenhouse gases emitted by an activity',
        'A shoe made from carbon materials',
        'The distance carbon travels in the atmosphere',
      ],
      correctAnswer: 1,
      explanation: 'Carbon footprint measures the total greenhouse gas emissions from activities.',
      difficulty: 'easy',
      category: 'Basics',
    },
    // Add more easy questions up to 10 total
  ],

  medium: [
    {
      id: 'medium-1',
      question: 'What does ESG stand for in sustainable investing?',
      options: [
        'Environmental, Social, and Governance',
        'Economic, Social, and Growth',
        'Energy, Sustainability, and Growth',
        'Environmental, Safety, and Governance',
      ],
      correctAnswer: 0,
      explanation:
        'ESG stands for Environmental, Social, and Governance criteria in sustainable investing.',
      difficulty: 'medium',
      category: 'Finance',
    },
    {
      id: 'medium-2',
      question: "What is the Paris Agreement's primary goal?",
      options: [
        'To eliminate all fossil fuels by 2030',
        'To limit global warming to well below 2°C above pre-industrial levels',
        'To plant 1 trillion trees globally',
        'To ban single-use plastics worldwide',
      ],
      correctAnswer: 1,
      explanation:
        'The Paris Agreement aims to limit global warming to well below 2°C, preferably 1.5°C.',
      difficulty: 'medium',
      category: 'Policy',
    },
    {
      id: 'medium-3',
      question: 'Which material has the highest carbon footprint per kilogram?',
      options: ['Aluminum', 'Steel', 'Concrete', 'Plastic'],
      correctAnswer: 0,
      explanation:
        'Aluminum production has one of the highest carbon footprints due to energy-intensive smelting.',
      difficulty: 'medium',
      category: 'Materials',
    },
    // Add more medium questions up to 25 total
  ],

  hard: [
    {
      id: 'hard-1',
      question:
        'What is the approximate global warming potential (GWP) of methane over 100 years compared to CO2?',
      options: ['10 times', '25 times', '50 times', '100 times'],
      correctAnswer: 1,
      explanation: 'Methane has a GWP of approximately 25 times that of CO2 over 100 years.',
      difficulty: 'hard',
      category: 'Science',
    },
    {
      id: 'hard-2',
      question: 'What percentage of global emissions comes from the agriculture sector?',
      options: ['10-15%', '20-25%', '30-35%', '40-45%'],
      correctAnswer: 1,
      explanation: 'Agriculture contributes approximately 24% of global greenhouse gas emissions.',
      difficulty: 'hard',
      category: 'Agriculture',
    },
    {
      id: 'hard-3',
      question: 'What is the concept of "carbon budget" in climate science?',
      options: [
        'The amount of money allocated for carbon reduction projects',
        'The total amount of CO2 that can be emitted while limiting warming to a specific temperature',
        'The trading price of carbon credits',
        'The annual budget for renewable energy investments',
      ],
      correctAnswer: 1,
      explanation:
        'Carbon budget refers to the cumulative amount of CO2 emissions that would limit warming to a specific level.',
      difficulty: 'hard',
      category: 'Science',
    },
    // Add more hard questions up to 50 total
  ],
};

// Helper function to get questions by difficulty
export function getQuestionsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Question[] {
  return climateQuizData[difficulty];
}

// Helper function to calculate score
export function calculateScore(userAnswers: number[], correctAnswers: number[]): number {
  return userAnswers.filter((answer, index) => answer === correctAnswers[index]).length;
}

// Helper function to get score title
export function getScoreTitle(score: number, total: number): string {
  const percentage = (score / total) * 100;

  if (percentage >= 90) return 'Climate Expert';
  if (percentage >= 80) return 'Eco-Warrior';
  if (percentage >= 70) return 'Environmental Champion';
  if (percentage >= 60) return 'Climate Conscious';
  if (percentage >= 50) return 'Green Advocate';
  if (percentage >= 40) return 'Climate Learner';
  return 'Climate Novice';
}
