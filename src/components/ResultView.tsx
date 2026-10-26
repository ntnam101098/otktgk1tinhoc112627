import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, RotateCcw, Home, Printer, CheckCircle2, XCircle, 
  HelpCircle, AlertCircle, ArrowUpRight, Filter, ChevronDown, ChevronUp, Star
} from 'lucide-react';
import { PART1_QUESTIONS, PART2_QUESTIONS, PART3_QUESTIONS } from '../data/quizData';
import { GradingResult } from '../utils/grading';
import { StudentSubmission } from '../types/quiz';

interface ResultViewProps {
  submission: StudentSubmission;
  grading: GradingResult;
  onRetry: () => void;
  onGoHome: () => void;
  onUpdateSelfScores?: (newScores: Record<number, Record<'a' | 'b' | 'c' | 'd', number>>) => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  submission,
  grading,
  onRetry,
  onGoHome,
  onUpdateSelfScores,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'wrong' | 'correct'>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'part1' | 'part2' | 'part3'>('all');
  const [selfScores, setSelfScores] = useState<Record<number, Record<'a' | 'b' | 'c' | 'd', number>>>(
    submission.part3SelfScores || {}
  );

  useEffect(() => {
    if (grading.totalScore >= 8.0) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [grading.totalScore]);

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m} phút ${s.toString().padStart(2, '0')} giây`;
  };

  const handlePrint = () => {
    window.print();
  };

  // Color theme by rating
  const getRatingBadge = (rating: string) => {
    switch (rating) {
      case 'Xuất sắc':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'Giỏi':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'Khá':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      default:
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Score Hero Card */}
        <div className="bg-gradient-to-br from-[#121929] via-[#0f172a] to-[#131b2e] border border-slate-700/80 rounded-3xl p-6 sm:p-9 shadow-2xl relative overflow-hidden">
          {/* Ambient light */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left info */}
            <div className="space-y-3 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRatingBadge(grading.rating)}`}>
                  ★ Xếp loại: {grading.rating}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  Thời gian: {formatDuration(submission.timeSpentSeconds)}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Kết quả ôn tập của thí sinh: <span className="text-blue-400">{submission.studentName}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Lớp: <strong className="text-white">{submission.className}</strong> • Chế độ:{' '}
                <strong className="text-white">{submission.mode === 'test' ? 'Thi thử 45 phút' : 'Ôn tập tự do'}</strong>
              </p>

              {/* Feedback */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
                <strong className="text-blue-300">Nhận xét của hệ thống:</strong> {grading.feedback}
              </div>
            </div>

            {/* Right: Big Score Circle */}
            <div className="flex flex-col items-center justify-center bg-slate-900/90 border border-blue-500/30 rounded-3xl p-6 min-w-[200px] shadow-xl text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Tổng điểm đạt được</span>
              <div className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                {grading.totalScore.toFixed(2)}
              </div>
              <span className="text-xs text-slate-400 mt-1 font-mono">/ 10.0 điểm ({grading.percentage}%)</span>
            </div>
          </div>

          {/* Breakdown cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-7 pt-6 border-t border-slate-800">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">Phần I: Trắc nghiệm</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Đúng <strong className="text-blue-400">{grading.part1RawCorrect}</strong>/30 câu
                </div>
              </div>
              <div className="text-lg font-bold text-blue-400">
                {grading.part1Score.toFixed(2)} đ
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">Phần II: Đúng / Sai</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Điểm gốc: <strong className="text-indigo-400">{grading.part2RawPoints}</strong>/6.0
                </div>
              </div>
              <div className="text-lg font-bold text-indigo-400">
                {grading.part2Score.toFixed(2)} đ
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">Phần III: Tự luận</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Điểm gốc: <strong className="text-emerald-400">{grading.part3RawPoints}</strong>/6.0
                </div>
              </div>
              <div className="text-lg font-bold text-emerald-400">
                {grading.part3Score.toFixed(2)} đ
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={onRetry}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition shadow-md shadow-blue-600/20 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại đề</span>
            </button>

            <button
              onClick={onGoHome}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Về trang chủ</span>
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-medium text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer"
            title="In hoặc lưu phiếu điểm thành file PDF"
          >
            <Printer className="w-4 h-4 text-slate-400" />
            <span>In / Tải PDF</span>
          </button>
        </div>

        {/* Review Filter Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>ĐÁP ÁN VÀ GIẢI THÍCH CHI TIẾT</span>
              <span className="text-xs font-normal text-slate-400">(Xem kỹ để củng cố kiến thức)</span>
            </h3>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1 text-xs">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${
                    filterType === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setFilterType('wrong')}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${
                    filterType === 'wrong' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Câu sai
                </button>
                <button
                  onClick={() => setFilterType('correct')}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${
                    filterType === 'correct' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Câu đúng
                </button>
              </div>

              {/* Section Tabs */}
              <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1 text-xs">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                    activeTab === 'all' ? 'bg-slate-750 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Tất cả phần
                </button>
                <button
                  onClick={() => setActiveTab('part1')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                    activeTab === 'part1' ? 'bg-slate-750 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Phần I
                </button>
                <button
                  onClick={() => setActiveTab('part2')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                    activeTab === 'part2' ? 'bg-slate-750 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Phần II
                </button>
                <button
                  onClick={() => setActiveTab('part3')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                    activeTab === 'part3' ? 'bg-slate-750 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Phần III
                </button>
              </div>
            </div>
          </div>

          {/* PART 1 QUESTIONS REVIEW */}
          {(activeTab === 'all' || activeTab === 'part1') && (
            <div className="space-y-4 pt-2">
              <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                Phần I: Trắc nghiệm 4 lựa chọn (30 câu)
              </div>

              {PART1_QUESTIONS.filter((q) => {
                const userAns = submission.part1Answers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                if (filterType === 'wrong') return !isCorrect;
                if (filterType === 'correct') return isCorrect;
                return true;
              }).map((q) => {
                const userAns = submission.part1Answers[q.id];
                const isCorrect = userAns === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border transition ${
                      isCorrect
                        ? 'bg-[#0f172a]/80 border-emerald-900/40'
                        : 'bg-[#18121a]/80 border-rose-900/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-slate-800 text-xs font-bold text-white">
                          Câu {q.id}
                        </span>
                        <span className="text-xs text-slate-400">({q.level} • {q.lesson})</span>
                      </div>

                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Chính xác (+1)</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-950/40 px-2.5 py-1 rounded-lg border border-rose-500/20">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Chưa đúng</span>
                        </span>
                      )}
                    </div>

                    <div className="text-sm font-semibold text-white mb-3 leading-relaxed">
                      {q.question}
                    </div>

                    {/* Options list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3.5">
                      {q.options.map((opt) => {
                        const isChosen = userAns === opt.key;
                        const isRightOpt = q.correctAnswer === opt.key;

                        let style = 'bg-slate-900/60 border-slate-800 text-slate-300';
                        if (isRightOpt) {
                          style = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold ring-1 ring-emerald-500/30';
                        } else if (isChosen && !isRightOpt) {
                          style = 'bg-rose-950/40 border-rose-500 text-rose-200 line-through';
                        }

                        return (
                          <div
                            key={opt.key}
                            className={`p-2.5 rounded-xl border text-xs flex items-start gap-2.5 ${style}`}
                          >
                            <span
                              className={`w-5 h-5 rounded-md flex items-center justify-center font-bold shrink-0 ${
                                isRightOpt
                                  ? 'bg-emerald-600 text-white'
                                  : isChosen
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {opt.key}
                            </span>
                            <span className="leading-snug">{opt.text}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Detailed Explanation */}
                    <div className="p-3 rounded-xl bg-blue-950/25 border border-blue-500/20 text-xs text-blue-200 leading-relaxed">
                      <strong className="text-blue-300">💡 Giải thích chi tiết:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* PART 2 QUESTIONS REVIEW */}
          {(activeTab === 'all' || activeTab === 'part2') && (
            <div className="space-y-4 pt-4">
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Phần II: Trắc nghiệm Đúng / Sai (6 bài)
              </div>

              {PART2_QUESTIONS.map((q) => {
                const userAns = submission.part2Answers[q.id] || { a: null, b: null, c: null, d: null };

                return (
                  <div key={q.id} className="p-5 rounded-2xl border bg-[#121929] border-slate-800 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 text-xs font-bold">
                          {q.title}
                        </span>
                        <span className="text-xs text-slate-400">({q.lesson})</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 text-xs sm:text-sm text-slate-200 font-medium">
                      {q.context}
                    </div>

                    <div className="space-y-2.5">
                      {q.items.map((item) => {
                        const val = userAns[item.key];
                        const isItemCorrect = val === item.isCorrect;

                        return (
                          <div
                            key={item.key}
                            className={`p-3 rounded-xl border text-xs sm:text-sm ${
                              isItemCorrect
                                ? 'bg-slate-900/40 border-emerald-900/30'
                                : 'bg-slate-900/40 border-rose-900/30'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                              <div className="text-slate-200 font-medium flex items-start gap-2">
                                <span className="font-bold text-indigo-400 uppercase">{item.key})</span>
                                <span>{item.text}</span>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                <span className="text-xs text-slate-400">
                                  Em chọn:{' '}
                                  <strong className={val === true ? 'text-emerald-400' : val === false ? 'text-rose-400' : 'text-slate-500'}>
                                    {val === true ? 'Đúng' : val === false ? 'Sai' : 'Chưa chọn'}
                                  </strong>
                                </span>
                                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-white font-semibold">
                                  Đáp án: <strong className={item.isCorrect ? 'text-emerald-400' : 'text-rose-400'}>{item.isCorrect ? 'Đúng' : 'Sai'}</strong>
                                </span>
                                {isItemCorrect ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-rose-400" />
                                )}
                              </div>
                            </div>

                            <div className="text-xs text-slate-400 mt-1 pl-4 border-l border-slate-700">
                              <strong className="text-slate-300">Giải thích:</strong> {item.explanation}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* PART 3 ESSAY REVIEW */}
          {(activeTab === 'all' || activeTab === 'part3') && (
            <div className="space-y-4 pt-4">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Phần III: Tự luận & Đối chiếu Barem điểm (6 câu)
              </div>

              {PART3_QUESTIONS.map((q) => {
                const userAns = submission.part3Answers[q.id] || { a: '', b: '', c: '', d: '' };

                return (
                  <div key={q.id} className="p-5 rounded-2xl border bg-[#121929] border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                        {q.title}
                      </span>
                      <span className="text-xs text-slate-400">({q.lesson})</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 text-xs sm:text-sm text-slate-200 font-medium">
                      {q.context}
                    </div>

                    <div className="space-y-3.5">
                      {q.subItems.map((sub) => {
                        const studentText = userAns[sub.key];
                        return (
                          <div key={sub.key} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                            <div className="text-xs sm:text-sm font-semibold text-white flex items-center justify-between">
                              <span className="flex items-center gap-1.5">
                                <strong className="text-emerald-400 uppercase">{sub.key})</strong> {sub.question}
                              </span>
                              <span className="text-[11px] font-mono text-slate-400 font-normal">
                                (Thang điểm: {sub.points}đ)
                              </span>
                            </div>

                            {/* Student's answer */}
                            <div className="p-2.5 rounded-lg bg-slate-950 text-xs text-slate-300 border border-slate-800">
                              <div className="text-[11px] font-semibold text-slate-400 mb-0.5">Bài làm của em:</div>
                              <p className="italic text-slate-200">
                                {studentText?.trim() ? studentText : '(Em chưa ghi câu trả lời)'}
                              </p>
                            </div>

                            {/* Official Answer Key */}
                            <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-200 leading-relaxed">
                              <div className="text-[11px] font-bold text-emerald-300 mb-0.5">
                                ✓ Đáp án gợi ý & Hướng dẫn chấm:
                              </div>
                              <p className="font-medium text-emerald-100">{sub.suggestedAnswer}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
