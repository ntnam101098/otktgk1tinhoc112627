import { PART1_QUESTIONS, PART2_QUESTIONS, PART3_QUESTIONS } from '../data/quizData';

export interface GradingResult {
  part1RawCorrect: number;
  part1Total: number;
  part1Score: number;

  part2RawPoints: number;
  part2Total: number;
  part2Score: number;
  part2ItemBreakdown: { id: number; correctCount: number; points: number }[];

  part3RawPoints: number;
  part3Total: number;
  part3Score: number;

  totalScore: number;
  maxScore: number;
  percentage: number;
  rating: string;
  feedback: string;
  topicWeaknesses: string[];
}

export const calculateScores = (
  scope: 'all' | 'part1' | 'part2' | 'part3',
  part1Answers: Record<number, 'A' | 'B' | 'C' | 'D'>,
  part2Answers: Record<number, Record<'a' | 'b' | 'c' | 'd', boolean | null>>,
  part3SelfScores: Record<number, Record<'a' | 'b' | 'c' | 'd', number>>
): GradingResult => {
  // 1. Calculate Part 1
  let part1RawCorrect = 0;
  const topicErrorCounts: Record<string, number> = {};

  PART1_QUESTIONS.forEach((q) => {
    if (part1Answers[q.id] === q.correctAnswer) {
      part1RawCorrect += 1;
    } else {
      topicErrorCounts[q.lesson] = (topicErrorCounts[q.lesson] || 0) + 1;
    }
  });

  // 2. Calculate Part 2 (New MOET rule: 1 correct = 0.1, 2 = 0.25, 3 = 0.5, 4 = 1.0)
  let part2RawPoints = 0;
  const part2ItemBreakdown: { id: number; correctCount: number; points: number }[] = [];

  PART2_QUESTIONS.forEach((q) => {
    const studentAns = part2Answers[q.id] || {};
    let correctInQuestion = 0;

    q.items.forEach((item) => {
      const ans = studentAns[item.key];
      if (ans !== null && ans !== undefined && ans === item.isCorrect) {
        correctInQuestion += 1;
      }
    });

    let qPoints = 0;
    if (correctInQuestion === 1) qPoints = 0.1;
    else if (correctInQuestion === 2) qPoints = 0.25;
    else if (correctInQuestion === 3) qPoints = 0.5;
    else if (correctInQuestion === 4) qPoints = 1.0;

    part2RawPoints += qPoints;
    part2ItemBreakdown.push({ id: q.id, correctCount: correctInQuestion, points: qPoints });

    if (correctInQuestion < 4) {
      topicErrorCounts[q.lesson] = (topicErrorCounts[q.lesson] || 0) + (4 - correctInQuestion);
    }
  });

  // 3. Calculate Part 3
  let part3RawPoints = 0;
  PART3_QUESTIONS.forEach((q) => {
    const scores = part3SelfScores[q.id] || {};
    let qPoints = 0;
    (['a', 'b', 'c', 'd'] as const).forEach((key) => {
      qPoints += scores[key] || 0;
    });
    part3RawPoints += qPoints;
    if (qPoints < 1.0) {
      topicErrorCounts[q.lesson] = (topicErrorCounts[q.lesson] || 0) + 1;
    }
  });

  // Scale based on chosen scope
  let part1Score = 0;
  let part2Score = 0;
  let part3Score = 0;
  let totalScore = 0;
  const maxScore = 10.0;

  if (scope === 'all') {
    // Standard MOET Midterm distribution:
    // Part 1: 30 questions -> 3.0 points max (0.1 pt each)
    // Part 2: 6 questions -> 4.0 points max (scaled from raw 6.0)
    // Part 3: 6 situations -> 3.0 points max (scaled from raw 6.0)
    part1Score = (part1RawCorrect / 30) * 3.0;
    part2Score = (part2RawPoints / 6.0) * 4.0;
    part3Score = (part3RawPoints / 6.0) * 3.0;
    totalScore = Math.min(10, Math.round((part1Score + part2Score + part3Score) * 100) / 100);
  } else if (scope === 'part1') {
    part1Score = Math.round(((part1RawCorrect / 30) * 10) * 100) / 100;
    totalScore = part1Score;
  } else if (scope === 'part2') {
    part2Score = Math.round(((part2RawPoints / 6.0) * 10) * 100) / 100;
    totalScore = part2Score;
  } else if (scope === 'part3') {
    part3Score = Math.round(((part3RawPoints / 6.0) * 10) * 100) / 100;
    totalScore = part3Score;
  }

  const percentage = Math.round((totalScore / maxScore) * 1000) / 10;

  let rating = 'Xuất sắc';
  let feedback = 'Chúc mừng em! Kết quả bài làm rất ấn tượng, nắm chắc lý thuyết và vận dụng tốt các kỹ năng thực hành.';

  if (totalScore >= 9.0) {
    rating = 'Xuất sắc';
    feedback = 'Kiến thức tuyệt vời! Em đã hoàn thành xuất sắc tất cả các phần thi của đề cương Tin học 11.';
  } else if (totalScore >= 8.0) {
    rating = 'Giỏi';
    feedback = 'Rất tốt! Em nắm chắc hầu hết các chuyên đề từ Bài 1 đến Bài 8, hãy rà soát lại các câu sai để sẵn sàng cho bài thi thật đạt điểm 10!';
  } else if (totalScore >= 6.5) {
    rating = 'Khá';
    feedback = 'Khá tốt! Em đã nắm được các khái niệm cơ bản nhưng cần củng cố thêm phần bài tập suy luận và các quy tắc kỹ thuật.';
  } else if (totalScore >= 5.0) {
    rating = 'Trung bình';
    feedback = 'Đạt yêu cầu cơ bản. Em nên dành thêm thời gian đọc lại các bài học trọng tâm trong đề cương và làm lại lần 2 để nâng cao điểm số.';
  } else {
    rating = 'Cần cố gắng';
    feedback = 'Kết quả chưa đạt mong muốn. Em hãy xem kỹ phần giải thích chi tiết của từng câu hỏi phía dưới và luyện tập lại nhé!';
  }

  // Find top weaknesses
  const sortedWeaknesses = Object.entries(topicErrorCounts)
    .sort((a, b) => b[1] - a[1])
    .filter(([_, count]) => count > 0)
    .map(([topic]) => topic);

  return {
    part1RawCorrect,
    part1Total: 30,
    part1Score: Math.round(part1Score * 100) / 100,
    part2RawPoints: Math.round(part2RawPoints * 100) / 100,
    part2Total: 6.0,
    part2Score: Math.round(part2Score * 100) / 100,
    part2ItemBreakdown,
    part3RawPoints: Math.round(part3RawPoints * 100) / 100,
    part3Total: 6.0,
    part3Score: Math.round(part3Score * 100) / 100,
    totalScore,
    maxScore,
    percentage,
    rating,
    feedback,
    topicWeaknesses: sortedWeaknesses.slice(0, 3),
  };
};
