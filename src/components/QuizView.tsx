import React, { useState, useEffect } from 'react';
import { 
  Clock, CheckCircle2, AlertTriangle, Flag, ChevronLeft, ChevronRight, 
  Send, ArrowLeft, User
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
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 pb-28">
      {/* Sticky Top Header (Matching screenshot 1) */}
      <div className="sticky top-0 z-30 bg-[#0d1424]/95 border-b border-slate-800 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          
          {/* Left: App Title and Candidate Progress */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.confirm('Bạn có chắc muốn thoát bài làm và trở về trang chủ không?')) {
                  onExit();
                }
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition shrink-0"
              title="Thoát về trang chủ"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-extrabold text-white uppercase tracking-tight">
                  ÔN TẬP KTGK1 - MÔN TIN HỌC 11
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  11.1
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                <User className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-slate-200 font-medium">{studentName} - Lớp {className}</span>
                <span>•</span>
                <span>Tiến độ: <strong className="text-blue-400">{getProgressText()}</strong></span>
              </div>
            </div>
          </div>

          {/* Right: Section Tabs, Timer & Submit */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 self-stretch md:self-auto justify-between md:justify-end">
            {/* Section tabs */}
            {scope === 'all' && (
              <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1 text-xs">
                {showP1 && (
                  <button
                    onClick={() => {
                      setActiveTab('part1');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'part1'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
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
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
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
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>Phần III: Tự luận (6 câu)</span>
                  </button>
                )}
              </div>
            )}

            {/* Timer */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <Clock className={`w-4 h-4 ${secondsRemaining < 300 && mode === 'test' ? 'text-rose-400 animate-pulse' : 'text-blue-400'}`} />
              {mode === 'test' ? (
                <div>
                  <span className="text-slate-400 mr-1 hidden sm:inline">Còn lại:</span>
                  <span className={`font-mono font-bold text-sm ${secondsRemaining < 300 ? 'text-rose-400 font-extrabold' : 'text-white'}`}>
                    {formatTimer(secondsRemaining)}
                  </span>
                </div>
              ) : (
                <div>
                  <span className="text-slate-400 mr-1 hidden sm:inline">Thời gian:</span>
                  <span className="font-mono font-bold text-sm text-emerald-400">
                    {formatTimer(elapsedSeconds)}
                  </span>
                </div>
              )}
            </div>

            {/* Submit CTA */}
            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition cursor-pointer"
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
            <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/20 text-xs sm:text-sm text-blue-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-white">PHẦN I: TRẮC NGHIỆM NHIỀU LỰA CHỌN</span> (Gồm 30 câu hỏi từ Bài 1 đến Bài 8).
                <div className="text-slate-400 text-xs mt-0.5">Mỗi câu hỏi có 4 phương án, thí sinh chỉ chọn 01 phương án đúng nhất.</div>
              </div>
              <span className="text-blue-300 font-mono font-bold bg-blue-900/40 px-2.5 py-1 rounded-lg">
                Đã làm: {p1AnsweredCount}/30
              </span>
            </div>

            <div className="space-y-5">
              {PART1_QUESTIONS.map((q) => {
                const isSelected = (optKey: string) => part1Answers[q.id] === optKey;
                const isFlag = Boolean(flagged[`p1_${q.id}`]);

                return (
                  <div
                    key={q.id}
                    id={`p1_q_${q.id}`}
                    className={`p-5 sm:p-6 rounded-2xl border transition ${
                      part1Answers[q.id]
                        ? 'bg-[#121929] border-slate-800'
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                    } ${isFlag ? 'ring-1 ring-amber-500/50' : ''}`}
                  >
                    {/* Question Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-bold">
                          Câu {q.id}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 font-medium">
                          {q.level}
                        </span>
                        <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                          • {q.lesson}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleFlag(`p1_${q.id}`)}
                        className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition ${
                          isFlag
                            ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                            : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:text-slate-200'
                        }`}
                        title="Đánh dấu câu này để xem lại"
                      >
                        <Flag className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{isFlag ? 'Đã đánh dấu' : 'Đánh dấu'}</span>
                      </button>
                    </div>

                    {/* Question text */}
                    <div className="text-sm sm:text-base font-semibold text-white mb-4 leading-relaxed">
                      {q.question}
                    </div>

                    {/* 4 Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt) => {
                        const selected = isSelected(opt.key);
                        return (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => {
                              setPart1Answers((prev) => ({
                                ...prev,
                                [q.id]: opt.key,
                              }));
                            }}
                            className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition flex items-start gap-3 cursor-pointer ${
                              selected
                                ? 'bg-blue-600/20 border-blue-500 text-white ring-1 ring-blue-500/30 shadow-sm'
                                : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                            }`}
                          >
                            <span
                              className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition ${
                                selected
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-slate-800 text-slate-400 border border-slate-700'
                              }`}
                            >
                              {opt.key}
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
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 text-xs sm:text-sm text-indigo-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-white">PHẦN II: TRẮC NGHIỆM ĐÚNG / SAI</span> (Gồm 6 bài tập tình huống).
                <div className="text-slate-400 text-xs mt-0.5">
                  Thí sinh chọn Đúng hoặc Sai cho từng ý a), b), c), d). (Đúng 1 ý = 0.1đ; 2 ý = 0.25đ; 3 ý = 0.5đ; 4 ý = 1.0đ)
                </div>
              </div>
              <span className="text-indigo-300 font-mono font-bold bg-indigo-900/40 px-2.5 py-1 rounded-lg">
                Đã làm: {p2AnsweredCount}/6
              </span>
            </div>

            <div className="space-y-6">
              {PART2_QUESTIONS.map((q) => {
                const currentAns = part2Answers[q.id] || { a: null, b: null, c: null, d: null };
                const isFlag = Boolean(flagged[`p2_${q.id}`]);

                return (
                  <div
                    key={q.id}
                    id={`p2_q_${q.id}`}
                    className={`p-5 sm:p-6 rounded-2xl border transition bg-[#121929] border-slate-800 ${
                      isFlag ? 'ring-1 ring-amber-500/50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 text-xs font-bold">
                          {q.title}
                        </span>
                        <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                          • {q.lesson}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleFlag(`p2_${q.id}`)}
                        className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition ${
                          isFlag
                            ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                            : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:text-slate-200'
                        }`}
                        title="Đánh dấu câu này để xem lại"
                      >
                        <Flag className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{isFlag ? 'Đã đánh dấu' : 'Đánh dấu'}</span>
                      </button>
                    </div>

                    {/* Context scenario */}
                    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm sm:text-base font-medium text-slate-200 mb-4 leading-relaxed">
                      {q.context}
                    </div>

                    {/* Sub-items a, b, c, d */}
                    <div className="space-y-3">
                      {q.items.map((item) => {
                        const val = currentAns[item.key];
                        return (
                          <div
                            key={item.key}
                            className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div className="text-xs sm:text-sm text-slate-200 font-medium flex items-start gap-2.5">
                              <span className="font-bold text-indigo-400 uppercase shrink-0 mt-0.5">
                                {item.key})
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
                                      [item.key]: true,
                                    },
                                  }));
                                }}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                                  val === true
                                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                                    : 'bg-slate-800 text-slate-400 hover:text-emerald-300 hover:bg-slate-750'
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
                                      [item.key]: false,
                                    },
                                  }));
                                }}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                                  val === false
                                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                                    : 'bg-slate-800 text-slate-400 hover:text-rose-300 hover:bg-slate-750'
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
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-xs sm:text-sm text-emerald-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-white">PHẦN III: TỰ LUẬN TÌNH HUỐNG THỰC TẾ</span> (Gồm 6 câu hỏi tự luận).
                <div className="text-slate-400 text-xs mt-0.5">
                  Thí sinh trình bày lời giải cho từng ý a), b), c), d). Sau khi nộp bài, hệ thống sẽ mở đối chiếu đáp án chi tiết và barem điểm từng ý (0,25 đ/ý).
                </div>
              </div>
              <span className="text-emerald-300 font-mono font-bold bg-emerald-900/40 px-2.5 py-1 rounded-lg">
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
                    className={`p-5 sm:p-6 rounded-2xl border transition bg-[#121929] border-slate-800 ${
                      isFlag ? 'ring-1 ring-amber-500/50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                          {q.title}
                        </span>
                        <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                          • {q.lesson}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleFlag(`p3_${q.id}`)}
                        className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition ${
                          isFlag
                            ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                            : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:text-slate-200'
                        }`}
                        title="Đánh dấu câu này để xem lại"
                      >
                        <Flag className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{isFlag ? 'Đã đánh dấu' : 'Đánh dấu'}</span>
                      </button>
                    </div>

                    {/* Context */}
                    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm sm:text-base font-medium text-slate-200 mb-4 leading-relaxed">
                      {q.context}
                    </div>

                    {/* Sub-items */}
                    <div className="space-y-4">
                      {q.subItems.map((sub) => {
                        const userText = currentAns[sub.key] || '';
                        return (
                          <div key={sub.key} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
                            <div className="flex items-baseline justify-between gap-2">
                              <label className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
                                <span className="text-emerald-400 font-bold uppercase">{sub.key})</span>
                                <span>{sub.question}</span>
                              </label>
                              <span className="text-[11px] text-slate-400 shrink-0 font-mono">
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
                              className="w-full px-3 py-2 bg-slate-950/70 border border-slate-700/70 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition"
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

        {/* BOTTOM NAVIGATION WITH "SANG PHẦN KẾ TIẾP >" BUTTON (Matching user screenshot 1) */}
        <div className="mt-8 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            {scope === 'all' && (
              <span>
                Tổng số câu đã hoàn thành: <strong className="text-white">{p1AnsweredCount}</strong>/30 Trắc nghiệm,{' '}
                <strong className="text-white">{p2AnsweredCount}</strong>/6 Đúng/Sai,{' '}
                <strong className="text-white">{p3AnsweredCount}</strong>/6 Tự luận.
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
            {/* Back button if in Part 2 or Part 3 */}
            {scope === 'all' && activeTab !== 'part1' && (
              <button
                type="button"
                onClick={goToPreviousSection}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition cursor-pointer border border-slate-700"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>
                  Quay lại {activeTab === 'part3' ? 'Phần II' : 'Phần I'}
                </span>
              </button>
            )}

            {/* Next section button (Exact style from screenshot 1: "Sang phần kế tiếp >") */}
            {scope === 'all' && activeTab !== 'part3' ? (
              <button
                type="button"
                onClick={goToNextSection}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-sm sm:text-base px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/25 transition cursor-pointer"
              >
                <span>Sang phần kế tiếp</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowSubmitModal(true)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#121929] border border-slate-700 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-lg font-bold text-white">Xác nhận nộp bài</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Em có chắc chắn muốn nộp bài thi này để hệ thống tiến hành chấm điểm và đưa ra nhận xét không?
              </p>
            </div>

            <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-300">
                <span>Phần I (Trắc nghiệm):</span>
                <span className="font-semibold text-white">{p1AnsweredCount}/30 câu</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Phần II (Đúng/Sai):</span>
                <span className="font-semibold text-white">{p2AnsweredCount}/6 bài</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Phần III (Tự luận):</span>
                <span className="font-semibold text-white">{p3AnsweredCount}/6 câu</span>
              </div>
              {(p1AnsweredCount < 30 || p2AnsweredCount < 6) && (
                <div className="pt-1 text-amber-400 font-medium flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>Vẫn còn một số câu chưa hoàn thành!</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold text-xs sm:text-sm transition cursor-pointer"
              >
                Làm tiếp
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition shadow-lg shadow-blue-600/30 cursor-pointer"
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
