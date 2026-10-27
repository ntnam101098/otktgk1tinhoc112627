import React, { useState, useEffect } from 'react';
import { 
  Clock, CheckCircle2, AlertTriangle, Flag, ChevronLeft, ChevronRight, 
  Send, ArrowLeft, User, Shuffle
} from 'lucide-react';
import { PART1_QUESTIONS, PART2_QUESTIONS, PART3_QUESTIONS } from '../data/quizData';

interface QuizViewProps {
  studentName: string;
  className: string;
  mode: 'test' | 'practice';
  scope: 'all' | 'part1' | 'part2' | 'part3';
  onSubmit: (answers: {
    part1: Record<number, 'A' | 'B' | 'C' | 'D'>;
    part2: Record<number, Record<'a' | 'b' | 'c' | 'd', boolean | null>>;
    part3: Record<number, Record<'a' | 'b' | 'c' | 'd', string>>;
    timeSpentSeconds: number;
  }) => void;
  onExit: () => void;
}

interface DisplayPart1Question {
  id: number;
  level: 'Biết' | 'Hiểu' | 'Vận dụng';
  lesson: string;
  question: string;
  explanation: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  options: {
    displayKey: 'A' | 'B' | 'C' | 'D';
    originalKey: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
}

interface DisplayPart2Item {
  displayKey: 'a' | 'b' | 'c' | 'd';
  originalKey: 'a' | 'b' | 'c' | 'd';
  text: string;
  isCorrect: boolean;
  explanation: string;
}

interface DisplayPart2Question {
  id: number;
  title: string;
  lesson: string;
  context: string;
  items: DisplayPart2Item[];
}

// Utility: Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Build standard default Part 1 data (unshuffled)
function buildDefaultPart1(): DisplayPart1Question[] {
  return PART1_QUESTIONS.map((q) => ({
    ...q,
    options: q.options.map((opt, idx) => ({
      displayKey: (['A', 'B', 'C', 'D'] as const)[idx],
      originalKey: opt.key,
      text: opt.text,
    })),
  }));
}

// Build standard default Part 2 data (unshuffled)
function buildDefaultPart2(): DisplayPart2Question[] {
  return PART2_QUESTIONS.map((q) => ({
    ...q,
    items: q.items.map((item, idx) => ({
      displayKey: (['a', 'b', 'c', 'd'] as const)[idx],
      originalKey: item.key,
      text: item.text,
      isCorrect: item.isCorrect,
      explanation: item.explanation,
    })),
  }));
}

// Shuffle Part 1: shuffle question order + shuffle option order within each question
function shufflePart1Data(): DisplayPart1Question[] {
  const shuffledQuestions = shuffleArray(PART1_QUESTIONS);
  return shuffledQuestions.map((q) => {
    const shuffledOpts = shuffleArray(q.options);
    return {
      ...q,
      options: shuffledOpts.map((opt, idx) => ({
        displayKey: (['A', 'B', 'C', 'D'] as const)[idx],
        originalKey: opt.key,
        text: opt.text,
      })),
    };
  });
}

// Shuffle Part 2: shuffle 6 questions order + shuffle sub-items order within each question
function shufflePart2Data(): DisplayPart2Question[] {
  const shuffledQuestions = shuffleArray(PART2_QUESTIONS);
  return shuffledQuestions.map((q) => {
    const shuffledItems = shuffleArray(q.items);
    return {
      ...q,
      items: shuffledItems.map((item, idx) => ({
        displayKey: (['a', 'b', 'c', 'd'] as const)[idx],
        originalKey: item.key,
        text: item.text,
        isCorrect: item.isCorrect,
        explanation: item.explanation,
      })),
    };
  });
}

export const QuizView: React.FC<QuizViewProps> = ({
  studentName,
  className,
  mode,
  scope,
  onSubmit,
  onExit,
}) => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'part1' | 'part2' | 'part3'>(
    scope === 'part2' ? 'part2' : scope === 'part3' ? 'part3' : 'part1'
  );

  // Question lists (default: standard curriculum order)
  const [p1Questions, setP1Questions] = useState<DisplayPart1Question[]>(() => buildDefaultPart1());
  const [isP1Shuffled, setIsP1Shuffled] = useState(false);

  const [p2Questions, setP2Questions] = useState<DisplayPart2Question[]>(() => buildDefaultPart2());
  const [isP2Shuffled, setIsP2Shuffled] = useState(false);

  // Answers state
  const [part1Answers, setPart1Answers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [part2Answers, setPart2Answers] = useState<Record<number, Record<'a' | 'b' | 'c' | 'd', boolean | null>>>({});
  const [part3Answers, setPart3Answers] = useState<Record<number, Record<'a' | 'b' | 'c' | 'd', string>>>({});

  // Flagged questions
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});

  // Timers
  const TOTAL_TEST_SECONDS = 45 * 60; // 45 minutes
  const [secondsRemaining, setSecondsRemaining] = useState<number>(TOTAL_TEST_SECONDS);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Submit confirmation modal
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Timer loop
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);

      if (mode === 'test') {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [mode]);

  const handleAutoSubmit = () => {
    onSubmit({
      part1: part1Answers,
      part2: part2Answers,
      part3: part3Answers,
      timeSpentSeconds: mode === 'test' ? TOTAL_TEST_SECONDS : elapsedSeconds,
    });
  };

  const handleConfirmSubmit = () => {
    setShowSubmitModal(false);
    onSubmit({
      part1: part1Answers,
      part2: part2Answers,
      part3: part3Answers,
      timeSpentSeconds: elapsedSeconds,
    });
  };

  // Shuffle Part 1 handler
  const handleShufflePart1 = () => {
    setP1Questions(shufflePart1Data());
    setIsP1Shuffled(true);
  };

  const handleResetPart1Order = () => {
    setP1Questions(buildDefaultPart1());
    setIsP1Shuffled(false);
  };

  // Shuffle Part 2 handler
  const handleShufflePart2 = () => {
    setP2Questions(shufflePart2Data());
    setIsP2Shuffled(true);
  };

  const handleResetPart2Order = () => {
    setP2Questions(buildDefaultPart2());
    setIsP2Shuffled(false);
  };

  // Format time
  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Answer counts
  const p1AnsweredCount = Object.keys(part1Answers).length;
  
  const p2AnsweredCount = PART2_QUESTIONS.filter((q) => {
    const ans = part2Answers[q.id];
    if (!ans) return false;
    return ans.a !== null && ans.b !== null && ans.c !== null && ans.d !== null &&
           ans.a !== undefined && ans.b !== undefined && ans.c !== undefined && ans.d !== undefined;
  }).length;

  const p3AnsweredCount = PART3_QUESTIONS.filter((q) => {
    const ans = part3Answers[q.id];
    if (!ans) return false;
    return Boolean(ans.a?.trim() || ans.b?.trim() || ans.c?.trim() || ans.d?.trim());
  }).length;

  // Toggle flag
  const toggleFlag = (key: string) => {
    setFlagged((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Available sections
  const showP1 = scope === 'all' || scope === 'part1';
  const showP2 = scope === 'all' || scope === 'part2';
  const showP3 = scope === 'all' || scope === 'part3';

  // Section transition handlers
  const goToNextSection = () => {
    if (activeTab === 'part1') {
      if (showP2) {
        setActiveTab('part2');
      } else if (showP3) {
        setActiveTab('part3');
      } else {
        setShowSubmitModal(true);
      }
    } else if (activeTab === 'part2') {
      if (showP3) {
        setActiveTab('part3');
      } else {
        setShowSubmitModal(true);
      }
    } else if (activeTab === 'part3') {
      setShowSubmitModal(true);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPreviousSection = () => {
    if (activeTab === 'part3') {
      if (showP2) {
        setActiveTab('part2');
      } else if (showP1) {
        setActiveTab('part1');
      }
    } else if (activeTab === 'part2') {
      if (showP1) {
        setActiveTab('part1');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Current progress text
  const getProgressText = () => {
    if (activeTab === 'part1') return `${p1AnsweredCount}/30 câu`;
    if (activeTab === 'part2') return `${p2AnsweredCount}/6 bài`;
    if (activeTab === 'part3') return `${p3AnsweredCount}/6 câu`;
    return '';
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 pb-20">
      {/* Sticky Top Header (Light Mode) */}
      <div className="sticky top-0 z-30 bg-white/95 border-b border-slate-200 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          
          {/* Left: App Title and Candidate Progress */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.confirm('Bạn có chắc muốn thoát bài làm và trở về trang chủ không?')) {
                  onExit();
                }
              }}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition shrink-0 cursor-pointer"
              title="Thoát về trang chủ"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-black text-[#005A9C] uppercase tracking-tight">
                  ÔN TẬP KTGK1 - MÔN TIN HỌC 11
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-extrabold bg-[#80C8F8]/30 text-[#005A9C] border border-[#80C8F8]">
                  11.1
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 font-medium">
                <User className="w-3.5 h-3.5 text-[#005A9C]" />
                <span className="text-slate-800 font-bold">{studentName} - Lớp {className}</span>
                <span>•</span>
                <span>Tiến độ: <strong className="text-[#005A9C]">{getProgressText()}</strong></span>
              </div>
            </div>
          </div>

          {/* Right: Section Tabs, Timer & Submit */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 self-stretch md:self-auto justify-between md:justify-end">
            {/* Section tabs */}
            {scope === 'all' && (
              <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1 text-xs">
                {showP1 && (
                  <button
                    onClick={() => {
                      setActiveTab('part1');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'part1'
                        ? 'bg-[#005A9C] text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#005A9C]'
                    }`}
                  >
                    <span>Phần I: TN 4 Lựa chọn (30 câu)</span>
                  </button>
                )}

                {showP2 && (
                  <button
                    onClick={() => {
                      setActiveTab('part2');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'part2'
                        ? 'bg-[#005A9C] text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#005A9C]'
                    }`}
                  >
                    <span>Phần II: Đúng / Sai (6 câu)</span>
                  </button>
                )}

                {showP3 && (
                  <button
                    onClick={() => {
                      setActiveTab('part3');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'part3'
                        ? 'bg-[#005A9C] text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#005A9C]'
                    }`}
                  >
                    <span>Phần III: Tự luận (6 câu)</span>
                  </button>
                )}
              </div>
            )}

            {/* Timer */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs">
              <Clock className={`w-4 h-4 ${secondsRemaining < 300 && mode === 'test' ? 'text-rose-600 animate-pulse' : 'text-[#005A9C]'}`} />
              {mode === 'test' ? (
                <div>
                  <span className="text-slate-500 mr-1 hidden sm:inline">Còn lại:</span>
                  <span className={`font-mono font-bold text-sm ${secondsRemaining < 300 ? 'text-rose-600 font-black' : 'text-slate-900'}`}>
                    {formatTimer(secondsRemaining)}
                  </span>
                </div>
              ) : (
                <div>
                  <span className="text-slate-500 mr-1 hidden sm:inline">Thời gian:</span>
                  <span className="font-mono font-bold text-sm text-[#005A9C]">
                    {formatTimer(elapsedSeconds)}
                  </span>
                </div>
              )}
            </div>

            {/* Submit CTA */}
            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Nộp bài</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* SECTION I: MULTIPLE CHOICE */}
        {activeTab === 'part1' && showP1 && (
          <div className="space-y-6">
            {/* Banner with 'Đảo câu hỏi' button */}
            <div className="p-4 rounded-2xl bg-[#80C8F8]/20 border border-[#80C8F8]/60 text-xs sm:text-sm text-[#003865] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div>
                <span className="font-black text-[#005A9C]">PHẦN I: TRẮC NGHIỆM NHIỀU LỰA CHỌN</span> (Gồm 30 câu hỏi từ Bài 1 đến Bài 8).
                <div className="text-slate-600 text-xs mt-0.5 font-medium">Mỗi câu hỏi có 4 phương án, thí sinh chỉ chọn 01 phương án đúng nhất.</div>
              </div>

              {/* Action Toolbar on Banner */}
              <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={handleShufflePart1}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs border ${
                    isP1Shuffled
                      ? 'bg-[#FFD147] text-[#003865] border-[#FFD147] hover:bg-[#ffc82e]'
                      : 'bg-white text-[#005A9C] border-[#005A9C]/30 hover:bg-[#80C8F8]/20'
                  }`}
                  title="Xáo trộn ngẫu nhiên thứ tự 30 câu hỏi và 4 phương án A-B-C-D"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>{isP1Shuffled ? 'Đã đảo (Bấm để đảo lại)' : 'Đảo câu hỏi'}</span>
                </button>

                {isP1Shuffled && (
                  <button
                    type="button"
                    onClick={handleResetPart1Order}
                    className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-white text-slate-600 hover:text-slate-900 border border-slate-300 transition cursor-pointer"
                    title="Khôi phục thứ tự chuẩn đề cương"
                  >
                    <span>Thứ tự gốc</span>
                  </button>
                )}

                <span className="text-[#005A9C] font-mono font-black bg-white px-3 py-1 rounded-lg border border-[#80C8F8]/40 shadow-xs">
                  Đã làm: {p1AnsweredCount}/30
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {p1Questions.map((q, idx) => {
                const isSelected = (originalKey: string) => part1Answers[q.id] === originalKey;
                const isFlag = Boolean(flagged[`p1_${q.id}`]);

                return (
                  <div
                    key={q.id}
                    id={`p1_q_${q.id}`}
                    className={`p-5 sm:p-6 rounded-2xl border transition bg-white shadow-xs ${
                      part1Answers[q.id]
                        ? 'border-slate-300'
                        : 'border-slate-200 hover:border-slate-300'
                    } ${isFlag ? 'ring-2 ring-[#FFD147]' : ''}`}
                  >
                    {/* Question Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-[#005A9C]/10 text-[#005A9C] border border-[#005A9C]/20 text-xs font-black">
                          Câu {idx + 1}
                        </span>
                        {isP1Shuffled && (
                          <span className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-500 font-semibold border border-slate-200">
                            Gốc: Câu {q.id}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                          {q.level}
                        </span>
                        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                          • {q.lesson}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleFlag(`p1_${q.id}`)}
                        className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition cursor-pointer ${
                          isFlag
                            ? 'bg-[#FFF275] border-[#FFD147] text-[#854d0e] font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800'
                        }`}
                        title="Đánh dấu câu này để xem lại"
                      >
                        <Flag className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{isFlag ? 'Đã đánh dấu' : 'Đánh dấu'}</span>
                      </button>
                    </div>

                    {/* Question text */}
                    <div className="text-sm sm:text-base font-bold text-slate-900 mb-4 leading-relaxed">
                      {q.question}
                    </div>

                    {/* 4 Options with newly assigned display labels A-B-C-D */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt) => {
                        const selected = isSelected(opt.originalKey);
                        return (
                          <button
                            key={opt.displayKey}
                            type="button"
                            onClick={() => {
                              setPart1Answers((prev) => ({
                                ...prev,
                                [q.id]: opt.originalKey,
                              }));
                            }}
                            className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition flex items-start gap-3 cursor-pointer ${
                              selected
                                ? 'bg-[#80C8F8]/20 border-2 border-[#005A9C] text-[#003865] font-semibold shadow-xs'
                                : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-[#80C8F8]/10 hover:border-[#80C8F8]'
                            }`}
                          >
                            <span
                              className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition ${
                                selected
                                  ? 'bg-[#005A9C] text-white shadow-xs'
                                  : 'bg-white text-slate-600 border border-slate-300'
                              }`}
                            >
                              {opt.displayKey}
                            </span>
                            <span className="leading-snug">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION II: TRUE / FALSE */}
        {activeTab === 'part2' && showP2 && (
          <div className="space-y-6">
            {/* Banner with 'Đảo câu hỏi' button */}
            <div className="p-4 rounded-2xl bg-[#FFF275]/25 border border-[#FFD147]/60 text-xs sm:text-sm text-[#003865] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div>
                <span className="font-black text-[#005A9C]">PHẦN II: TRẮC NGHIỆM ĐÚNG / SAI</span> (Gồm 6 bài tập tình huống).
                <div className="text-slate-600 text-xs mt-0.5 font-medium">
                  Thí sinh chọn Đúng hoặc Sai cho từng ý a), b), c), d). (Đúng 1 ý = 0.1đ; 2 ý = 0.25đ; 3 ý = 0.5đ; 4 ý = 1.0đ)
                </div>
              </div>

              {/* Action Toolbar on Banner */}
              <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={handleShufflePart2}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs border ${
                    isP2Shuffled
                      ? 'bg-[#FFD147] text-[#003865] border-[#FFD147] hover:bg-[#ffc82e]'
                      : 'bg-white text-[#005A9C] border-[#005A9C]/30 hover:bg-[#FFF275]/50'
                  }`}
                  title="Xáo trộn ngẫu nhiên thứ tự 6 bài và các ý nhận định a-b-c-d"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>{isP2Shuffled ? 'Đã đảo (Bấm để đảo lại)' : 'Đảo câu hỏi'}</span>
                </button>

                {isP2Shuffled && (
                  <button
                    type="button"
                    onClick={handleResetPart2Order}
                    className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-white text-slate-600 hover:text-slate-900 border border-slate-300 transition cursor-pointer"
                    title="Khôi phục thứ tự chuẩn đề cương"
                  >
                    <span>Thứ tự gốc</span>
                  </button>
                )}

                <span className="text-[#005A9C] font-mono font-black bg-white px-3 py-1 rounded-lg border border-[#FFD147]/40 shadow-xs">
                  Đã làm: {p2AnsweredCount}/6
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {p2Questions.map((q, qIdx) => {
                const currentAns = part2Answers[q.id] || { a: null, b: null, c: null, d: null };
                const isFlag = Boolean(flagged[`p2_${q.id}`]);

                return (
                  <div
                    key={q.id}
                    id={`p2_q_${q.id}`}
                    className={`p-5 sm:p-6 rounded-2xl border transition bg-white border-slate-200 shadow-xs ${
                      isFlag ? 'ring-2 ring-[#FFD147]' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-[#005A9C]/10 text-[#005A9C] border border-[#005A9C]/20 text-xs font-black">
                          Câu {qIdx + 1}
                        </span>
                        {isP2Shuffled && (
                          <span className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-500 font-semibold border border-slate-200">
                            Gốc: {q.title}
                          </span>
                        )}
                        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                          • {q.lesson}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleFlag(`p2_${q.id}`)}
                        className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition cursor-pointer ${
                          isFlag
                            ? 'bg-[#FFF275] border-[#FFD147] text-[#854d0e] font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800'
                        }`}
                        title="Đánh dấu câu này để xem lại"
                      >
                        <Flag className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{isFlag ? 'Đã đánh dấu' : 'Đánh dấu'}</span>
                      </button>
                    </div>

                    {/* Context scenario with soft yellow tint */}
                    <div className="p-3.5 rounded-xl bg-[#FFF275]/20 border border-[#FFD147]/40 text-sm sm:text-base font-medium text-slate-800 mb-4 leading-relaxed">
                      {q.context}
                    </div>

                    {/* Sub-items a, b, c, d with newly assigned display labels a-b-c-d */}
                    <div className="space-y-2.5">
                      {q.items.map((item) => {
                        const val = currentAns[item.originalKey];
                        return (
                          <div
                            key={item.displayKey}
                            className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div className="text-xs sm:text-sm text-slate-800 font-medium flex items-start gap-2.5">
                              <span className="font-black text-[#005A9C] uppercase shrink-0 mt-0.5">
                                {item.displayKey})
                              </span>
                              <span>{item.text}</span>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setPart2Answers((prev) => ({
                                    ...prev,
                                    [q.id]: {
                                      ...(prev[q.id] || { a: null, b: null, c: null, d: null }),
                                      [item.originalKey]: true,
                                    },
                                  }));
                                }}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                                  val === true
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : 'bg-white border border-slate-300 text-slate-600 hover:border-emerald-500 hover:text-emerald-700'
                                }`}
                              >
                                <span>Đúng</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setPart2Answers((prev) => ({
                                    ...prev,
                                    [q.id]: {
                                      ...(prev[q.id] || { a: null, b: null, c: null, d: null }),
                                      [item.originalKey]: false,
                                    },
                                  }));
                                }}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                                  val === false
                                    ? 'bg-rose-600 text-white shadow-xs'
                                    : 'bg-white border border-slate-300 text-slate-600 hover:border-rose-500 hover:text-rose-700'
                                }`}
                              >
                                <span>Sai</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION III: ESSAY */}
        {activeTab === 'part3' && showP3 && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-[#80C8F8]/20 border border-[#80C8F8]/60 text-xs sm:text-sm text-[#003865] flex items-center justify-between shadow-xs">
              <div>
                <span className="font-black text-[#005A9C]">PHẦN III: TỰ LUẬN TÌNH HUỐNG THỰC TẾ</span> (Gồm 6 câu hỏi tự luận).
                <div className="text-slate-600 text-xs mt-0.5 font-medium">
                  Thí sinh trình bày lời giải cho từng ý a), b), c), d). Sau khi nộp bài, hệ thống sẽ mở đối chiếu đáp án chi tiết và barem điểm từng ý (0,25 đ/ý).
                </div>
              </div>
              <span className="text-[#005A9C] font-mono font-black bg-white px-3 py-1 rounded-lg border border-[#80C8F8]/40 shadow-xs">
                Đã làm: {p3AnsweredCount}/6
              </span>
            </div>

            <div className="space-y-6">
              {PART3_QUESTIONS.map((q) => {
                const currentAns = part3Answers[q.id] || { a: '', b: '', c: '', d: '' };
                const isFlag = Boolean(flagged[`p3_${q.id}`]);

                return (
                  <div
                    key={q.id}
                    id={`p3_q_${q.id}`}
                    className={`p-5 sm:p-6 rounded-2xl border transition bg-white border-slate-200 shadow-xs ${
                      isFlag ? 'ring-2 ring-[#FFD147]' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-[#005A9C]/10 text-[#005A9C] border border-[#005A9C]/20 text-xs font-black">
                          {q.title}
                        </span>
                        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                          • {q.lesson}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleFlag(`p3_${q.id}`)}
                        className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition cursor-pointer ${
                          isFlag
                            ? 'bg-[#FFF275] border-[#FFD147] text-[#854d0e] font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800'
                        }`}
                        title="Đánh dấu câu này để xem lại"
                      >
                        <Flag className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{isFlag ? 'Đã đánh dấu' : 'Đánh dấu'}</span>
                      </button>
                    </div>

                    {/* Context */}
                    <div className="p-3.5 rounded-xl bg-[#FFF275]/20 border border-[#FFD147]/40 text-sm sm:text-base font-medium text-slate-800 mb-4 leading-relaxed">
                      {q.context}
                    </div>

                    {/* Sub-items */}
                    <div className="space-y-4">
                      {q.subItems.map((sub) => {
                        const userText = currentAns[sub.key] || '';
                        return (
                          <div key={sub.key} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                            <div className="flex items-baseline justify-between gap-2">
                              <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                                <span className="text-[#005A9C] font-black uppercase">{sub.key})</span>
                                <span>{sub.question}</span>
                              </label>
                              <span className="text-[11px] text-slate-500 shrink-0 font-mono">
                                ({sub.points} điểm)
                              </span>
                            </div>

                            <textarea
                              rows={2}
                              value={userText}
                              onChange={(e) => {
                                setPart3Answers((prev) => ({
                                  ...prev,
                                  [q.id]: {
                                    ...(prev[q.id] || { a: '', b: '', c: '', d: '' }),
                                    [sub.key]: e.target.value,
                                  },
                                }));
                              }}
                              placeholder="Nhập câu trả lời hoặc cách tính của em vào đây..."
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#80C8F8] focus:border-[#005A9C] transition"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* BOTTOM NAVIGATION WITH PRIMARY CTA "#FFD147" */}
        <div className="mt-8 p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">
            {scope === 'all' && (
              <span>
                Tổng số câu đã hoàn thành: <strong className="text-slate-900">{p1AnsweredCount}</strong>/30 Trắc nghiệm,{' '}
                <strong className="text-slate-900">{p2AnsweredCount}</strong>/6 Đúng/Sai,{' '}
                <strong className="text-slate-900">{p3AnsweredCount}</strong>/6 Tự luận.
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
            {/* Back button if in Part 2 or Part 3 */}
            {scope === 'all' && activeTab !== 'part1' && (
              <button
                type="button"
                onClick={goToPreviousSection}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition cursor-pointer border border-slate-200"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>
                  Quay lại {activeTab === 'part3' ? 'Phần II' : 'Phần I'}
                </span>
              </button>
            )}

            {/* Next section button with #FFD147 */}
            {scope === 'all' && activeTab !== 'part3' ? (
              <button
                type="button"
                onClick={goToNextSection}
                className="bg-[#FFD147] hover:bg-[#ffc82e] text-[#003865] font-black text-sm sm:text-base px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-md shadow-[#FFD147]/40 transition cursor-pointer"
              >
                <span>Sang phần kế tiếp</span>
                <ChevronRight className="w-5 h-5 text-[#003865]" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowSubmitModal(true)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-emerald-600/30 transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Nộp bài & Chấm điểm ngay</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-[#80C8F8]/30 border border-[#80C8F8] flex items-center justify-center text-[#005A9C] mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-lg font-bold text-slate-900">Xác nhận nộp bài</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Em có chắc chắn muốn nộp bài thi này để hệ thống tiến hành chấm điểm và đưa ra nhận xét không?
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Phần I (Trắc nghiệm):</span>
                <span className="font-bold text-slate-900">{p1AnsweredCount}/30 câu</span>
              </div>
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Phần II (Đúng/Sai):</span>
                <span className="font-bold text-slate-900">{p2AnsweredCount}/6 bài</span>
              </div>
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Phần III (Tự luận):</span>
                <span className="font-bold text-slate-900">{p3AnsweredCount}/6 câu</span>
              </div>
              {(p1AnsweredCount < 30 || p2AnsweredCount < 6) && (
                <div className="pt-1 text-amber-600 font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>Vẫn còn một số câu chưa hoàn thành!</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition cursor-pointer"
              >
                Làm tiếp
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                className="py-2.5 px-4 rounded-xl bg-[#FFD147] hover:bg-[#ffc82e] text-[#003865] font-black text-xs sm:text-sm transition shadow-md shadow-[#FFD147]/40 cursor-pointer"
              >
                Đồng ý nộp bài
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
