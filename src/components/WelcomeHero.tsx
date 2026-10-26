import React, { useState } from 'react';
import { Sparkles, User, School, Clock, BookOpen, ChevronRight, Layers, HelpCircle, CheckCircle2 } from 'lucide-react';
import { LESSONS } from '../data/quizData';

interface WelcomeHeroProps {
  onStartQuiz: (info: {
    studentName: string;
    className: string;
    mode: 'test' | 'practice';
    scope: 'all' | 'part1' | 'part2' | 'part3';
  }) => void;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({ onStartQuiz }) => {
  const [studentName, setStudentName] = useState('');
  const [className, setClassName] = useState('');
  const [mode, setMode] = useState<'test' | 'practice'>('test');
  const [scope, setScope] = useState<'all' | 'part1' | 'part2' | 'part3'>('all');
  const [errorMsg, setErrorMsg] = useState('');

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setErrorMsg('Vui lòng nhập Họ và tên của em để bắt đầu làm bài!');
      return;
    }
    if (!className.trim()) {
      setErrorMsg('Vui lòng nhập Lớp học (ví dụ: 11A1, 11A2, 11 Tin...)!');
      return;
    }
    setErrorMsg('');
    onStartQuiz({
      studentName: studentName.trim(),
      className: className.trim(),
      mode,
      scope,
    });
  };

  return (
    <div className="relative py-8 md:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Intro & Features */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-semibold tracking-wide">
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            <span>HỆ THỐNG ÔN TẬP & KIỂM TRA CHUẨN HOÁ</span>
          </div>

          {/* Headline */}
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Củng cố kiến thức, tự tin bứt phá{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400">
                điểm 10 Giữa kỳ 1
              </span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Ứng dụng ôn luyện bám sát 100% nội dung Đề cương kiểm tra giữa học kỳ 1 môn Tin học 11,
              bao gồm đầy đủ 3 dạng thức trắc nghiệm và tự luận mới nhất của Bộ GD&ĐT.
            </p>
          </div>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 hover:border-blue-500/40 transition shadow-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 mb-1">30 Câu</div>
              <div className="font-bold text-white text-sm">Phần I: Trắc nghiệm</div>
              <div className="text-xs text-slate-400 mt-0.5">4 lựa chọn (A, B, C, D)</div>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 hover:border-indigo-500/40 transition shadow-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 mb-1">6 Bài (24 ý)</div>
              <div className="font-bold text-white text-sm">Phần II: Đúng / Sai</div>
              <div className="text-xs text-slate-400 mt-0.5">Tính điểm theo quy chế mới</div>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 hover:border-emerald-500/40 transition shadow-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mb-1">6 Tình huống</div>
              <div className="font-bold text-white text-sm">Phần III: Tự luận</div>
              <div className="text-xs text-slate-400 mt-0.5">Kèm đáp án & gợi ý chi tiết</div>
            </div>
          </div>

          {/* Lessons Covered */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>Nội dung 8 bài học trọng tâm trong đề cương:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {LESSONS.map((lesson) => (
                <div
                  key={lesson.id}
                  className="px-3 py-1.5 rounded-lg bg-slate-850/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 font-medium transition cursor-default flex items-center gap-1.5"
                  title={lesson.desc}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {lesson.title}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Candidate Entry Card */}
        <div className="lg:col-span-5">
          <div className="bg-[#121929]/95 border border-slate-800/90 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            {/* Header of Candidate Form */}
            <div className="flex items-center gap-3.5 pb-5 border-b border-slate-800/80">
              <div className="w-11 h-11 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Thông tin thí sinh</h3>
                <p className="text-xs text-slate-400">Nhập họ tên và lớp để bắt đầu làm bài</p>
              </div>
            </div>

            <form onSubmit={handleStart} className="space-y-4 pt-5">
              {/* Error Alert */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-shake">
                  <span className="font-semibold">Lưu ý:</span> {errorMsg}
                </div>
              )}

              {/* Student Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                  <span>Họ và tên học sinh</span>
                  <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => {
                      setStudentName(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="Ví dụ: Nguyễn Văn An"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Class Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                  <span>Lớp học</span>
                  <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <School className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={className}
                    onChange={(e) => {
                      setClassName(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="Nhập lớp của em (ví dụ: 11A1, 11A2, 11 Tin...)"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Mode Selection */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-semibold text-slate-300">Chế độ làm bài</label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setMode('test')}
                    className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                      mode === 'test'
                        ? 'bg-blue-600/15 border-blue-500 text-blue-200 ring-1 ring-blue-500/30'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>Thi thử (45 phút)</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-tight">
                      Đếm ngược thời gian, mô phỏng như thi thật.
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode('practice')}
                    className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                      mode === 'practice'
                        ? 'bg-blue-600/15 border-blue-500 text-blue-200 ring-1 ring-blue-500/30'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Ôn tập tự do</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-tight">
                      Không giới hạn giờ, thoải mái suy nghĩ.
                    </div>
                  </button>
                </div>
              </div>

              {/* Scope Selection */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-semibold text-slate-300">Phần muốn làm:</label>
                <select
                  value={scope}
                  onChange={(e) => setScope(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                >
                  <option value="all">Toàn bộ 3 phần (Chuẩn đề thi 100%)</option>
                  <option value="part1">Phần I: Trắc nghiệm 4 lựa chọn (30 câu)</option>
                  <option value="part2">Phần II: Đúng / Sai (6 bài - 24 ý)</option>
                  <option value="part3">Phần III: Tự luận (6 câu tình huống)</option>
                </select>
              </div>

              {/* CTA Start Button */}
              <button
                type="submit"
                className="w-full mt-4 py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.01] active:scale-[0.99] transition duration-200 cursor-pointer"
              >
                <span>Bắt đầu ôn tập & làm bài</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <p className="text-[11px] text-slate-400">
                  Sau khi nộp bài, hệ thống sẽ tự động chấm điểm, hiển thị nhận xét và giải thích chi tiết từng câu.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
