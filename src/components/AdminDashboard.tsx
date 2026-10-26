import React, { useState } from 'react';
import { 
  FileSpreadsheet, Trash2, Download, Search, Filter, ShieldCheck, 
  X, RefreshCw, Eye, ArrowUpDown, Award, Users, BookOpen, AlertTriangle
} from 'lucide-react';
import { StudentSubmission } from '../types/quiz';
import { exportSubmissionsToExcel, exportSubmissionsToCSV } from '../utils/excelExport';
import { deleteSubmission, clearAllSubmissions, restoreDemoSubmissions } from '../utils/storage';
import { LESSONS, PART1_QUESTIONS } from '../data/quizData';

interface AdminDashboardProps {
  submissions: StudentSubmission[];
  onRefresh: () => void;
  onClose: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  submissions,
  onRefresh,
  onClose,
  onLogout,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'score_desc' | 'score_asc'>('date');
  const [selectedSubmission, setSelectedSubmission] = useState<StudentSubmission | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Extract unique classes
  const classes = Array.from(new Set(submissions.map((s) => s.className))).filter(Boolean);

  // Filtered and sorted submissions
  const filteredSubmissions = submissions
    .filter((s) => {
      const matchName = s.studentName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchClass = selectedClass === 'all' || s.className === selectedClass;
      return matchName && matchClass;
    })
    .sort((a, b) => {
      if (sortBy === 'score_desc') return b.totalScore - a.totalScore;
      if (sortBy === 'score_asc') return a.totalScore - b.totalScore;
      return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
    });

  // Analytics calculation
  const totalSubmissions = submissions.length;
  const avgScore = totalSubmissions > 0
    ? (submissions.reduce((acc, s) => acc + s.totalScore, 0) / totalSubmissions).toFixed(2)
    : '0.00';
  const highestScore = totalSubmissions > 0
    ? Math.max(...submissions.map((s) => s.totalScore)).toFixed(2)
    : '0.00';
  const excellentRate = totalSubmissions > 0
    ? ((submissions.filter((s) => s.totalScore >= 8.0).length / totalSubmissions) * 100).toFixed(1)
    : '0.0';

  // Score distribution counts
  const scoreDist = {
    excellent: submissions.filter((s) => s.totalScore >= 9.0).length,
    good: submissions.filter((s) => s.totalScore >= 8.0 && s.totalScore < 9.0).length,
    fair: submissions.filter((s) => s.totalScore >= 6.5 && s.totalScore < 8.0).length,
    average: submissions.filter((s) => s.totalScore >= 5.0 && s.totalScore < 6.5).length,
    weak: submissions.filter((s) => s.totalScore < 5.0).length,
  };

  const handleDeleteOne = (id: string) => {
    deleteSubmission(id);
    setConfirmDeleteId(null);
    onRefresh();
  };

  const handleClearAll = () => {
    clearAllSubmissions();
    setShowClearConfirm(false);
    onRefresh();
  };

  const handleRestoreDemo = () => {
    restoreDemoSubmissions();
    onRefresh();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0f172a] border border-slate-700 rounded-3xl max-w-6xl w-full max-h-[95vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-[#121929] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Quản trị & Báo cáo Điểm thi Tin học 11</h2>
                <span className="px-2 py-0.5 rounded text-[11px] bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                  Admin: vvdtntbt
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Chỉ giáo viên/quản trị viên mới có quyền xem, xuất và xóa dữ liệu bài làm của học sinh
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Làm mới dữ liệu"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 border border-slate-700 text-xs font-semibold transition"
            >
              Đăng xuất
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Stats Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                <span>Tổng lượt bài nộp</span>
              </div>
              <div className="text-2xl font-black text-white mt-1">{totalSubmissions}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>Điểm trung bình</span>
              </div>
              <div className="text-2xl font-black text-emerald-400 mt-1">{avgScore}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Điểm cao nhất</span>
              </div>
              <div className="text-2xl font-black text-amber-400 mt-1">{highestScore}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-indigo-400" />
                <span>Tỷ lệ Giỏi/Xuất sắc</span>
              </div>
              <div className="text-2xl font-black text-indigo-400 mt-1">{excellentRate}%</div>
            </div>
          </div>

          {/* Score distribution visual bar */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>Phổ điểm đánh giá theo chuẩn phân loại:</span>
              <span className="text-slate-400 font-normal">Tổng: {totalSubmissions} học sinh</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-center">
                <div className="text-amber-400 font-bold">Xuất sắc (9.0 - 10)</div>
                <div className="text-lg font-black text-white mt-0.5">{scoreDist.excellent} HS</div>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-center">
                <div className="text-emerald-400 font-bold">Giỏi (8.0 - 8.9)</div>
                <div className="text-lg font-black text-white mt-0.5">{scoreDist.good} HS</div>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-950/20 border border-blue-500/20 text-center">
                <div className="text-blue-400 font-bold">Khá (6.5 - 7.9)</div>
                <div className="text-lg font-black text-white mt-0.5">{scoreDist.fair} HS</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-center">
                <div className="text-slate-300 font-bold">Trung bình (5 - 6.4)</div>
                <div className="text-lg font-black text-white mt-0.5">{scoreDist.average} HS</div>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-500/20 text-center">
                <div className="text-rose-400 font-bold">Cần cố gắng (&lt;5)</div>
                <div className="text-lg font-black text-white mt-0.5">{scoreDist.weak} HS</div>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
            {/* Search & Filter */}
            <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
              <div className="relative flex-1 min-w-[180px]">
                <Search className="w-4 h-4 text-slate-400 absolute inset-y-0 left-3 my-auto pointer-events-none" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm theo họ tên học sinh..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">Tất cả các lớp</option>
                {classes.map((c) => (
                  <option key={c} value={c}>
                    Lớp {c}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="date">Mới nộp nhất</option>
                <option value="score_desc">Điểm: Cao đến Thấp</option>
                <option value="score_asc">Điểm: Thấp đến Cao</option>
              </select>
            </div>

            {/* Export & Data Management Buttons (Admin-exclusive) */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => exportSubmissionsToExcel(submissions)}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                title="Tải bảng điểm định dạng Microsoft Excel (.xlsx)"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Xuất Excel (.xlsx)</span>
              </button>

              <button
                onClick={() => exportSubmissionsToCSV(submissions)}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-medium text-xs flex items-center gap-1.5 transition cursor-pointer"
                title="Tải bảng điểm CSV mã hóa UTF-8"
              >
                <Download className="w-4 h-4 text-slate-400" />
                <span>Xuất CSV</span>
              </button>

              <button
                onClick={() => setShowClearConfirm(true)}
                className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 text-xs font-semibold transition"
                title="Xóa toàn bộ dữ liệu bài làm để chuẩn bị đợt thi mới"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {submissions.length === 0 && (
                <button
                  onClick={handleRestoreDemo}
                  className="px-3 py-2 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 hover:bg-blue-600/30 text-xs font-semibold transition"
                >
                  Nạp dữ liệu mẫu
                </button>
              )}
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase text-[11px] font-bold tracking-wider">
                    <th className="py-3 px-3.5">STT</th>
                    <th className="py-3 px-3.5">Họ và tên thí sinh</th>
                    <th className="py-3 px-3">Lớp</th>
                    <th className="py-3 px-3">Chế độ</th>
                    <th className="py-3 px-3">Thời gian nộp</th>
                    <th className="py-3 px-2 text-center">P1 (TN)</th>
                    <th className="py-3 px-2 text-center">P2 (Đ/S)</th>
                    <th className="py-3 px-2 text-center">P3 (TL)</th>
                    <th className="py-3 px-3 text-center">Tổng điểm</th>
                    <th className="py-3 px-3 text-center">Xếp loại</th>
                    <th className="py-3 px-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredSubmissions.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="py-8 text-center text-slate-500">
                        Chưa có dữ liệu bài làm nào phù hợp với bộ lọc.
                      </td>
                    </tr>
                  ) : (
                    filteredSubmissions.map((sub, idx) => (
                      <tr key={sub.id} className="hover:bg-slate-800/40 transition">
                        <td className="py-3 px-3.5 font-mono text-slate-400">{idx + 1}</td>
                        <td className="py-3 px-3.5 font-bold text-white">{sub.studentName}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-300 font-medium">
                            {sub.className}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-xs text-slate-400">
                          {sub.mode === 'test' ? 'Thi thử 45p' : 'Ôn tập tự do'}
                        </td>
                        <td className="py-3 px-3 text-xs text-slate-400">
                          {new Date(sub.submittedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}{' '}
                          <span className="text-[11px] text-slate-500">
                            {new Date(sub.submittedAt).toLocaleDateString('vi-VN')}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-center font-mono text-blue-400">
                          {sub.part1Score.toFixed(1)}
                        </td>
                        <td className="py-3 px-2 text-center font-mono text-indigo-400">
                          {sub.part2Score.toFixed(1)}
                        </td>
                        <td className="py-3 px-2 text-center font-mono text-emerald-400">
                          {sub.part3Score.toFixed(1)}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="text-sm font-black text-white bg-slate-800 px-2.5 py-1 rounded-lg">
                            {sub.totalScore.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
                            {sub.rating}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedSubmission(sub)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                              title="Xem chi tiết bài làm"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(sub.id)}
                              className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900 text-rose-300 transition"
                              title="Xóa bài thi này"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Single Submission Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121929] border border-slate-700 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="text-center space-y-1">
              <h4 className="font-bold text-white text-base">Xóa bài nộp?</h4>
              <p className="text-xs text-slate-400">
                Thao tác này sẽ xóa vĩnh viễn kết quả bài thi này khỏi hệ thống.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="py-2 px-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                Hủy
              </button>
              <button
                onClick={() => handleDeleteOne(confirmDeleteId)}
                className="py-2 px-3 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-500 shadow-md"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121929] border border-rose-500/50 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h4 className="font-bold text-white text-lg">Xóa toàn bộ dữ liệu điểm?</h4>
              <p className="text-xs text-slate-300">
                Thầy/cô có chắc muốn xóa tất cả bài nộp của học sinh để chuẩn bị cho đợt thi mới? Thao tác này không thể hoàn tác.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="py-2.5 px-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleClearAll}
                className="py-2.5 px-3 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-500 shadow-lg shadow-rose-600/30"
              >
                Đồng ý xóa hết
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Submission Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#0f172a] border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#121929]">
              <div>
                <h4 className="font-bold text-white text-base">
                  Chi tiết bài làm: {selectedSubmission.studentName} - Lớp {selectedSubmission.className}
                </h4>
                <div className="text-xs text-slate-400 mt-0.5">
                  Tổng điểm: <strong className="text-blue-400">{selectedSubmission.totalScore.toFixed(2)}/10.0</strong> • Xếp loại: {selectedSubmission.rating}
                </div>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <strong className="text-blue-300">Nhận xét:</strong> {selectedSubmission.feedback}
              </div>

              <div>
                <div className="font-bold text-white mb-2">Phần III: Bài làm tự luận của học sinh:</div>
                <div className="space-y-3">
                  {Object.entries(selectedSubmission.part3Answers || {}).map(([qId, ans]) => (
                    <div key={qId} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                      <div className="font-semibold text-emerald-400">Câu {qId}:</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {Object.entries(ans as Record<string, string>).map(([subKey, text]) => (
                          <div key={subKey} className="p-2 rounded bg-slate-950 border border-slate-850">
                            <span className="font-bold text-indigo-400 uppercase">{subKey}) </span>
                            <span className="text-slate-200">{text || '(Chưa làm)'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
