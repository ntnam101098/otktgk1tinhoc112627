import React from 'react';
import { BookOpen, Lock, FileSpreadsheet, LogOut, ShieldCheck } from 'lucide-react';

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
    <header className="border-b border-[#00487d] bg-[#005A9C] text-white shadow-md sticky top-0 z-40 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand & Title */}
        <div 
          onClick={onGoHome}
          className={`flex items-center gap-3.5 cursor-pointer group ${!isHome ? 'hover:opacity-95 transition' : ''}`}
        >
          <div className="w-11 h-11 rounded-xl bg-white/15 border border-white/30 flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-sm">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-white tracking-tight uppercase flex items-center gap-2 drop-shadow-sm">
                ÔN TẬP KTGK1 - MÔN TIN HỌC 11
              </h1>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-extrabold bg-[#FFF275] text-[#003865] shadow-sm">
                2026 - 2027
              </span>
            </div>
            <p className="text-xs sm:text-sm text-blue-100 font-medium">
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
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/15 border border-white/30 text-white hover:bg-white/25 transition text-xs font-bold shadow-sm"
                title="Bảng điều khiển & Quản trị"
              >
                <ShieldCheck className="w-4 h-4 text-[#FFF275]" />
                <span className="hidden xs:inline">Admin:</span>
                <span className="font-mono text-[#FFF275]">vvdtntbt</span>
              </button>

              <button
                onClick={onOpenAdminDashboard}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFD147] hover:bg-[#ffc82e] text-[#003865] transition text-xs font-extrabold shadow-sm cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#003865]" />
                <span className="hidden sm:inline">Thống kê &</span> Xuất Excel
              </button>

              <button
                onClick={onLogoutAdmin}
                className="p-2 rounded-xl bg-white/15 hover:bg-rose-500 border border-white/30 text-white transition text-xs"
                title="Đăng xuất quyền Admin"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAdminLogin}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-[#FFF275] transition text-xs font-bold shadow-sm cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#FFF275]" />
                <span>Đăng nhập Admin</span>
              </button>

              <button
                onClick={onOpenAdminLogin}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFD147] hover:bg-[#ffc82e] text-[#003865] transition text-xs font-extrabold shadow-sm cursor-pointer"
                title="Yêu cầu quyền Admin để truy cập"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#003865]" />
                <span className="hidden sm:inline">Thống kê & Xuất Excel</span>
                <Lock className="w-3 h-3 text-[#003865]/70 ml-0.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
