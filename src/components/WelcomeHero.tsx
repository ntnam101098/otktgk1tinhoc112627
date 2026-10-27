import React, { useState } from 'react';
import { Sparkles, User, School, Clock, BookOpen, ChevronRight, Layers } from 'lucide-react';
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
    <div className="relative py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient soft glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#80C8F8]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FFF275]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Intro & Features */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-7">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#80C8F8]/25 border border-[#80C8F8] text-[#005A9C] text-xs sm:text-sm font-bold tracking-wide shadow-xs">
            <Sparkles className="w-4 h-4 text-[#005A9C]" />
            <span>HỆ THỐNG ÔN TẬP & KIỂM TRA CHUẨN HOÁ</span>
          </div>

          {/* Headline */}
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Củng cố kiến thức, tự tin bứt phá{' '}
              <span className="text-[#005A9C] underline decoration-[#FFD147] decoration-wavy decoration-2">
                điểm 10 Giữa kỳ 1
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
              Ứng dụng ôn luyện bám sát 100% nội dung Đề cương kiểm tra giữa học kỳ 1 môn Tin học 11,
              bao gồm đầy đủ 3 dạng thức trắc nghiệm và tự luận mới nhất của Bộ GD&ĐT.
            </p>
          </div>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="bg-white border-2 border-[#80C8F8]/50 rounded-2xl p-4 hover:border-[#005A9C] transition shadow-sm hover:shadow-md">
              <div className="text-2xl sm:text-3xl font-black text-[#005A9C] mb-1">30 Câu</div>
              <div className="font-bold text-slate-800 text-sm">Phần I: Trắc nghiệm</div>
              <div className="text-xs text-slate-500 mt-0.5">4 lựa chọn (A, B, C, D)</div>
            </div>

            <div className="bg-white border-2 border-[#80C8F8]/50 rounded-2xl p-4 hover:border-[#005A9C] transition shadow-sm hover:shadow-md">
              <div className="text-2xl sm:text-3xl font-black text-[#005A9C] mb-1">6 Bài (24 ý)</div>
              <div className="font-bold text-slate-800 text-sm">Phần II: Đúng / Sai</div>
              <div className="text-xs text-slate-500 mt-0.5">Tính điểm theo quy chế mới</div>
            </div>

            <div className="bg-white border-2 border-[#80C8F8]/50 rounded-2xl p-4 hover:border-[#005A9C] transition shadow-sm hover:shadow-md">
              <div className="text-2xl sm:text-3xl font-black text-[#005A9C] mb-1">6 Tình huống</div>
              <div className="font-bold text-slate-800 text-sm">Phần III: Tự luận</div>
              <div className="text-xs text-slate-500 mt-0.5">Kèm đáp án & gợi ý chi tiết</div>
            </div>
          </div>

          {/* Lessons Covered */}
          <div className="space-y-3 pt-1">
            <div className="text-xs font-bold text-[#005A9C] uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#005A9C]" />
              <span>Nội dung 8 bài học trọng tâm trong đề cương:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {LESSONS.map((lesson) => (
                <div
                  key={lesson.id}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#80C8F8]/15 border border-slate-200 hover:border-[#80C8F8] text-xs text-slate-700 font-semibold transition cursor-default flex items-center gap-1.5 shadow-xs"
                  title={lesson.desc}
                >
                  <span className="w-2 h-2 rounded-full bg-[#005A9C]" />
                  {lesson.title}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Candidate Entry Card */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/50 relative overflow-hidden">
            {/* Header of Candidate Form */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
              <div className="w-11 h-11 rounded-2xl bg-[#005A9C]/10 border border-[#005A9C]/20 flex items-center justify-center text-[#005A9C]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Thông tin thí sinh</h3>
                <p className="text-xs text-slate-500">Nhập họ tên và lớp để bắt đầu làm bài</p>
              </div>
            </div>

            <form onSubmit={handleStart} className="space-y-4 pt-4">
              {/* Error Alert */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <span className="font-bold">Lưu ý:</span> {errorMsg}
                </div>
              )}

              {/* Student Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <span>Họ và tên học sinh</span>
                  <span className="text-rose-500">*</span>
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
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#80C8F8] focus:border-[#005A9C] transition font-medium"
                  />
                </div>
              </div>

              {/* Class Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <span>Lớp học</span>
                  <span className="text-rose-500">*</span>
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
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#80C8F8] focus:border-[#005A9C] transition font-medium"
                  />
                </div>
              </div>

              {/* Mode Selection */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-bold text-slate-700">Chế độ làm bài</label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setMode('test')}
                    className={`p-3 rounded-xl border-2 text-left transition flex flex-col justify-between cursor-pointer ${
                      mode === 'test'
                        ? 'bg-[#005A9C]/10 border-[#005A9C] text-[#005A9C]'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <Clock className="w-3.5 h-3.5 text-[#005A9C]" />
                      <span>Thi thử (45 phút)</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 leading-tight font-normal">
                      Đếm ngược thời gian, mô phỏng như thi thật.
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode('practice')}
                    className={`p-3 rounded-xl border-2 text-left transition flex flex-col justify-between cursor-pointer ${
                      mode === 'practice'
                        ? 'bg-[#005A9C]/10 border-[#005A9C] text-[#005A9C]'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <BookOpen className="w-3.5 h-3.5 text-[#005A9C]" />
                      <span>Ôn tập tự do</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 leading-tight font-normal">
                      Không giới hạn giờ, thoải mái suy nghĩ.
                    </div>
                  </button>
                </div>
              </div>

              {/* Scope Selection */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-bold text-slate-700">Phần muốn làm:</label>
                <select
                  value={scope}
                  onChange={(e) => setScope(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 font-medium focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#80C8F8] focus:border-[#005A9C] transition cursor-pointer"
                >
                  <option value="all">Toàn bộ 3 phần (Chuẩn đề thi 100%)</option>
                  <option value="part1">Phần I: Trắc nghiệm 4 lựa chọn (30 câu)</option>
                  <option value="part2">Phần II: Đúng / Sai (6 bài - 24 ý)</option>
                  <option value="part3">Phần III: Tự luận (6 câu tình huống)</option>
                </select>
              </div>

              {/* CTA Start Button with #FFD147 */}
              <button
                type="submit"
                className="w-full mt-3 py-3.5 px-6 rounded-xl bg-[#FFD147] hover:bg-[#ffc82e] text-[#003865] font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#FFD147]/40 hover:scale-[1.01] active:scale-[0.99] transition duration-200 cursor-pointer"
              >
                <span>Bắt đầu ôn tập & làm bài</span>
                <ChevronRight className="w-5 h-5 text-[#003865]" />
              </button>

              <div className="text-center pt-1">
                <p className="text-[11px] text-slate-500 font-medium">
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
