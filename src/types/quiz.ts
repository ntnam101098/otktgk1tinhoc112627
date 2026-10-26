export interface Part1Question {
  id: number;
  level: 'Biết' | 'Hiểu' | 'Vận dụng';
  lesson: string; // e.g. "Bài 1: Hệ điều hành"
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface Part2Item {
  key: 'a' | 'b' | 'c' | 'd';
  text: string;
  isCorrect: boolean; // true = Đúng, false = Sai
  explanation: string;
}

export interface Part2Question {
  id: number;
  title: string;
  lesson: string;
  context: string;
  items: Part2Item[];
}

export interface Part3SubItem {
  key: 'a' | 'b' | 'c' | 'd';
  question: string;
  suggestedAnswer: string;
  points: number;
}

export interface Part3Question {
  id: number;
  title: string;
  level: 'Hiểu' | 'Vận dụng';
  lesson: string;
  context: string;
  subItems: Part3SubItem[];
}

export interface StudentSubmission {
  id: string;
  studentName: string;
  className: string;
  mode: 'test' | 'practice';
  scope: 'all' | 'part1' | 'part2' | 'part3';
  startedAt: string;
  submittedAt: string;
  timeSpentSeconds: number;
  
  // Student answers
  part1Answers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  part2Answers: Record<number, Record<'a' | 'b' | 'c' | 'd', boolean | null>>;
  part3Answers: Record<number, Record<'a' | 'b' | 'c' | 'd', string>>;
  part3SelfScores: Record<number, Record<'a' | 'b' | 'c' | 'd', number>>;

  // Scores
  part1Score: number; // Max based on scope, normalized to 10 scale or part breakdown
  part2Score: number;
  part3Score: number;
  totalScore: number;
  maxScore: number;
  percentage: number;
  
  rating: string;
  feedback: string;
}
