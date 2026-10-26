import React from 'react';
import { BookOpen, Lock, Unlock, FileSpreadsheet, LogOut, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  isAdmin: boolean;
  onOpenAdminLogin: () => void;
  onOpenAdminDashboard: () => void;
  onLogoutAdmin: () => void;
  onGoHome?: () => void;
  isHome?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  isAdmin,
  onOpenAdminLogin,
  onOpenAdminDashboard,
  onLogoutAdmin,
  onGoHome,
  isHome = true,
}) => {
  return (
    <header className="border-b border-slate-800 bg-[#0d1322]/90 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand & Title */}
        <div 
          onClick={onGoHome}
          className={`flex items-center gap-3.5 cursor-pointer group ${!isHome ? 'hover:opacity-90 transition' : ''}`}
        >
          <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform shadow-lg shadow-blue-500/10">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight uppercase flex items-center gap-2">
                ÔN TẬP KTGK1 - MÔN TIN HỌC 11
              </h1>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                2026 - 2027
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Chương trình GDPT mới 2018 • Đề cương Kiểm tra Giữa Học kỳ 1 (Phạm vi Bài 1 - Bài 8)
            </p>
          </div>
        </div>

        {/* Action Buttons: Admin login & Export */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          {isAdmin ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAdminDashboard}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/40 transition text-xs font-semibold shadow-sm"
                title="Bảng điều khiển & Quản trị"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="hidden xs:inline">Admin:</span>
                <span className="font-mono text-emerald-200">vvdtntbt</span>
              </button>

              <button
                onClick={onOpenAdminDashboard}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-300 hover:bg-blue-600/30 transition text-xs font-semibold shadow-sm"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Thống kê &</span> Xuất Excel
              </button>

              <button
                onClick={onLogoutAdmin}
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-500/40 text-slate-300 hover:text-rose-300 transition text-xs"
                title="Đăng xuất quyền Admin"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAdminLogin}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-750 border border-slate-700/80 text-amber-300 hover:text-amber-200 transition text-xs font-semibold shadow-sm"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Đăng nhập Admin</span>
              </button>

              <button
                onClick={onOpenAdminLogin}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-850 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition text-xs font-medium shadow-sm"
                title="Yêu cầu quyền Admin để truy cập"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Thống kê & Xuất Excel</span>
                <Lock className="w-3 h-3 text-slate-400 ml-0.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
