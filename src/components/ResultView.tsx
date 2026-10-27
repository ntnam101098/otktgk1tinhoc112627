import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  RotateCcw, Home, Printer, CheckCircle2, XCircle, 
  HelpCircle, Star
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
}) => {
  const [filterType, setFilterType] = useState<'all' | 'wrong' | 'correct'>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'part1' | 'part2' | 'part3'>('all');

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
        return 'bg-[#FFF275] text-[#854d0e] border-[#FFD147]';
      case 'Giỏi':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Khá':
        return 'bg-[#80C8F8]/30 text-[#005A9C] border-[#80C8F8]';
      default:
        return 'bg-rose-100 text-rose-800 border-rose-300';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Score Hero Card (Light Mode with Academic #005A9C and #FFF275) */}
        <div className="bg-white border-2 border-[#80C8F8]/60 rounded-3xl p-6 sm:p-9 shadow-xl relative overflow-hidden">
          {/* Ambient soft glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#80C8F8]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left info */}
            <div className="space-y-3 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <span className={`px-3 py-1 rounded-full text-xs font-black border ${getRatingBadge(grading.rating)}`}>
                  ★ Xếp loại: {grading.rating}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  Thời gian: {formatDuration(submission.timeSpentSeconds)}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Kết quả ôn tập của thí sinh: <span className="text-[#005A9C]">{submission.studentName}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Lớp: <strong className="text-slate-900">{submission.className}</strong> • Chế độ:{' '}
                <strong className="text-slate-900">{submission.mode === 'test' ? 'Thi thử 45 phút' : 'Ôn tập tự do'}</strong>
              </p>

              {/* Feedback */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed max-w-xl font-medium">
                <strong className="text-[#005A9C] font-bold">Nhận xét của hệ thống:</strong> {grading.feedback}
              </div>
            </div>

            {/* Right: Big Score Box with #005A9C background and #FFD147 score */}
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#005A9C] to-[#00487d] rounded-3xl p-6 min-w-[210px] shadow-xl text-center text-white border-2 border-white">
              <span className="text-xs font-black text-[#FFF275] uppercase tracking-wider mb-1">Tổng điểm đạt được</span>
              <div className="text-5xl sm:text-6xl font-black text-[#FFD147] drop-shadow-sm">
                {grading.totalScore.toFixed(2)}
              </div>
              <span className="text-xs text-blue-100 mt-1 font-mono font-semibold">/ 10.0 điểm ({grading.percentage}%)</span>
            </div>
          </div>

          {/* Breakdown cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-7 pt-6 border-t border-slate-100">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase">Phần I: Trắc nghiệm</div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Đúng <strong className="text-[#005A9C] font-black">{grading.part1RawCorrect}</strong>/30 câu
                </div>
              </div>
              <div className="text-xl font-black text-[#005A9C]">
                {grading.part1Score.toFixed(2)} đ
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase">Phần II: Đúng / Sai</div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Điểm gốc: <strong className="text-[#005A9C] font-black">{grading.part2RawPoints}</strong>/6.0
                </div>
              </div>
              <div className="text-xl font-black text-[#005A9C]">
                {grading.part2Score.toFixed(2)} đ
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase">Phần III: Tự luận</div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Điểm gốc: <strong className="text-[#005A9C] font-black">{grading.part3RawPoints}</strong>/6.0
                </div>
              </div>
              <div className="text-xl font-black text-[#005A9C]">
                {grading.part3Score.toFixed(2)} đ
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={onRetry}
              className="px-5 py-2.5 rounded-xl bg-[#FFD147] hover:bg-[#ffc82e] text-[#003865] font-black text-xs sm:text-sm flex items-center gap-2 transition shadow-md shadow-[#FFD147]/40 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-[#003865]" />
              <span>Làm lại đề này</span>
            </button>

            <button
              onClick={onGoHome}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer border border-slate-200"
            >
              <Home className="w-4 h-4 text-slate-600" />
              <span>Về trang chủ</span>
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-[#005A9C] hover:bg-[#00487d] text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer shadow-sm"
            title="In hoặc lưu phiếu điểm thành file PDF"
          >
            <Printer className="w-4 h-4 text-white" />
            <span>In / Tải PDF</span>
          </button>
        </div>

        {/* Review Filter Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-lg font-black text-[#005A9C] flex items-center gap-2 uppercase tracking-tight">
              <span>ĐÁP ÁN VÀ GIẢI THÍCH CHI TIẾT</span>
              <span className="text-xs font-semibold text-slate-500 lowercase">(xem kỹ để củng cố kiến thức)</span>
            </h3>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-xl bg-white border border-slate-200 p-1 text-xs shadow-xs">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                    filterType === 'all' ? 'bg-[#005A9C] text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setFilterType('wrong')}
                  className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                    filterType === 'wrong' ? 'bg-rose-600 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Câu sai
                </button>
                <button
                  onClick={() => setFilterType('correct')}
                  className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                    filterType === 'correct' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Câu đúng
                </button>
              </div>

              {/* Section Tabs */}
              <div className="flex rounded-xl bg-white border border-slate-200 p-1 text-xs shadow-xs">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                    activeTab === 'all' ? 'bg-slate-200 text-slate-800' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tất cả phần
                </button>
                <button
                  onClick={() => setActiveTab('part1')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                    activeTab === 'part1' ? 'bg-slate-200 text-slate-800' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Phần I
                </button>
                <button
                  onClick={() => setActiveTab('part2')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                    activeTab === 'part2' ? 'bg-slate-200 text-slate-800' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Phần II
                </button>
                <button
                  onClick={() => setActiveTab('part3')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                    activeTab === 'part3' ? 'bg-slate-200 text-slate-800' : 'text-slate-600 hover:text-slate-900'
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
              <div className="text-xs font-black text-[#005A9C] uppercase tracking-wider">
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
                    className={`p-5 rounded-2xl border transition bg-white shadow-xs ${
                      isCorrect
                        ? 'border-emerald-300'
                        : 'border-rose-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-black text-slate-800">
                          Câu {q.id}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">({q.level} • {q.lesson})</span>
                      </div>

                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Chính xác (+1)</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          <span>Chưa đúng</span>
                        </span>
                      )}
                    </div>

                    <div className="text-sm font-bold text-slate-900 mb-3 leading-relaxed">
                      {q.question}
                    </div>

                    {/* Options list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3.5">
                      {q.options.map((opt) => {
                        const isChosen = userAns === opt.key;
                        const isRightOpt = q.correctAnswer === opt.key;

                        let style = 'bg-slate-50 border-slate-200 text-slate-700';
                        if (isRightOpt) {
                          style = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-900 font-bold';
                        } else if (isChosen && !isRightOpt) {
                          style = 'bg-rose-50 border-2 border-rose-400 text-rose-900 line-through';
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
                                  : 'bg-white border border-slate-300 text-slate-600'
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
                    <div className="p-3 rounded-xl bg-[#80C8F8]/15 border border-[#80C8F8]/60 text-xs text-[#003865] leading-relaxed font-medium">
                      <strong className="text-[#005A9C] font-black">💡 Giải thích chi tiết:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* PART 2 QUESTIONS REVIEW */}
          {(activeTab === 'all' || activeTab === 'part2') && (
            <div className="space-y-4 pt-4">
              <div className="text-xs font-black text-[#005A9C] uppercase tracking-wider">
                Phần II: Trắc nghiệm Đúng / Sai (6 bài)
              </div>

              {PART2_QUESTIONS.map((q) => {
                const userAns = submission.part2Answers[q.id] || { a: null, b: null, c: null, d: null };

                return (
                  <div key={q.id} className="p-5 rounded-2xl border bg-white border-slate-200 shadow-xs space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-[#005A9C]/10 text-[#005A9C] border border-[#005A9C]/20 text-xs font-black">
                          {q.title}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">({q.lesson})</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FFF275]/20 border border-[#FFD147]/40 text-xs sm:text-sm text-slate-800 font-medium">
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
                                ? 'bg-slate-50 border-emerald-300'
                                : 'bg-slate-50 border-rose-300'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                              <div className="text-slate-800 font-semibold flex items-start gap-2">
                                <span className="font-black text-[#005A9C] uppercase">{item.key})</span>
                                <span>{item.text}</span>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                <span className="text-xs text-slate-600 font-medium">
                                  Em chọn:{' '}
                                  <strong className={val === true ? 'text-emerald-700 font-bold' : val === false ? 'text-rose-700 font-bold' : 'text-slate-500'}>
                                    {val === true ? 'Đúng' : val === false ? 'Sai' : 'Chưa chọn'}
                                  </strong>
                                </span>
                                <span className="text-xs px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-bold">
                                  Đáp án: <strong className={item.isCorrect ? 'text-emerald-700' : 'text-rose-700'}>{item.isCorrect ? 'Đúng' : 'Sai'}</strong>
                                </span>
                                {isItemCorrect ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-rose-600" />
                                )}
                              </div>
                            </div>

                            <div className="text-xs text-slate-600 mt-1 pl-3 border-l-2 border-[#005A9C]">
                              <strong className="text-slate-800 font-bold">Giải thích:</strong> {item.explanation}
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
              <div className="text-xs font-black text-[#005A9C] uppercase tracking-wider">
                Phần III: Tự luận & Đối chiếu Barem điểm (6 câu)
              </div>

              {PART3_QUESTIONS.map((q) => {
                const userAns = submission.part3Answers[q.id] || { a: '', b: '', c: '', d: '' };

                return (
                  <div key={q.id} className="p-5 rounded-2xl border bg-white border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-lg bg-[#005A9C]/10 text-[#005A9C] border border-[#005A9C]/20 text-xs font-black">
                        {q.title}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">({q.lesson})</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FFF275]/20 border border-[#FFD147]/40 text-xs sm:text-sm text-slate-800 font-medium">
                      {q.context}
                    </div>

                    <div className="space-y-3.5">
                      {q.subItems.map((sub) => {
                        const studentText = userAns[sub.key];
                        return (
                          <div key={sub.key} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                            <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center justify-between">
                              <span className="flex items-center gap-1.5">
                                <strong className="text-[#005A9C] uppercase">{sub.key})</strong> {sub.question}
                              </span>
                              <span className="text-[11px] font-mono text-slate-500 font-normal">
                                (Thang điểm: {sub.points}đ)
                              </span>
                            </div>

                            {/* Student's answer */}
                            <div className="p-2.5 rounded-lg bg-white text-xs text-slate-700 border border-slate-200 shadow-xs">
                              <div className="text-[11px] font-bold text-slate-500 mb-0.5">Bài làm của em:</div>
                              <p className="italic text-slate-800 font-medium">
                                {studentText?.trim() ? studentText : '(Em chưa ghi câu trả lời)'}
                              </p>
                            </div>

                            {/* Official Answer Key */}
                            <div className="p-2.5 rounded-lg bg-[#80C8F8]/15 border border-[#80C8F8]/60 text-xs text-[#003865] leading-relaxed">
                              <div className="text-[11px] font-black text-[#005A9C] mb-0.5">
                                ✓ Đáp án gợi ý & Hướng dẫn chấm:
                              </div>
                              <p className="font-semibold text-slate-800">{sub.suggestedAnswer}</p>
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
