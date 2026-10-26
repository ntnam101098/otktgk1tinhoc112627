import * as XLSX from 'xlsx';
import { StudentSubmission } from '../types/quiz';

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m} phút ${s.toString().padStart(2, '0')} giây`;
};

const formatDate = (iso: string) => {
  try {
    const d = new Date(iso);
    return d.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  } catch {
    return iso;
  }
};

export const exportSubmissionsToExcel = (submissions: StudentSubmission[]) => {
  if (submissions.length === 0) {
    alert('Không có dữ liệu bài làm để xuất!');
    return;
  }

  // Build summary sheet
  const data = submissions.map((sub, idx) => ({
    'STT': idx + 1,
    'Thời gian nộp': formatDate(sub.submittedAt),
    'Họ và tên thí sinh': sub.studentName,
    'Lớp': sub.className,
    'Chế độ làm bài': sub.mode === 'test' ? 'Thi thử 45p' : 'Ôn tập tự do',
    'Phạm vi': sub.scope === 'all' ? 'Toàn bộ 3 phần' : sub.scope,
    'Thời gian làm bài': formatDuration(sub.timeSpentSeconds),
    'Điểm P1 (Trắc nghiệm)': Number(sub.part1Score.toFixed(2)),
    'Điểm P2 (Đúng / Sai)': Number(sub.part2Score.toFixed(2)),
    'Điểm P3 (Tự luận)': Number(sub.part3Score.toFixed(2)),
    'Tổng điểm (Thang 10)': Number(sub.totalScore.toFixed(2)),
    'Tỷ lệ (%)': `${sub.percentage.toFixed(1)}%`,
    'Xếp loại': sub.rating,
    'Nhận xét': sub.feedback,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  // Set column widths
  worksheet['!cols'] = [
    { wch: 6 },  // STT
    { wch: 20 }, // Thời gian nộp
    { wch: 24 }, // Họ và tên
    { wch: 10 }, // Lớp
    { wch: 16 }, // Chế độ
    { wch: 16 }, // Phạm vi
    { wch: 18 }, // Thời gian làm bài
    { wch: 14 }, // Điểm P1
    { wch: 14 }, // Điểm P2
    { wch: 14 }, // Điểm P3
    { wch: 15 }, // Tổng điểm
    { wch: 12 }, // Tỷ lệ
    { wch: 12 }, // Xếp loại
    { wch: 45 }, // Nhận xét
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Bang_Diem_Tin11');

  // Generate file name
  const timestamp = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(workbook, `Bang_Diem_On_Tap_Tin11_GK1_${timestamp}.xlsx`);
};

export const exportSubmissionsToCSV = (submissions: StudentSubmission[]) => {
  if (submissions.length === 0) {
    alert('Không có dữ liệu bài làm để xuất!');
    return;
  }

  const headers = [
    'STT',
    'Thời gian nộp',
    'Họ và tên thí sinh',
    'Lớp',
    'Chế độ',
    'Phạm vi',
    'Thời gian làm',
    'Điểm P1 (TN)',
    'Điểm P2 (Đúng/Sai)',
    'Điểm P3 (Tự luận)',
    'Tổng điểm',
    'Tỷ lệ (%)',
    'Xếp loại',
    'Nhận xét',
  ];

  const rows = submissions.map((sub, idx) => [
    idx + 1,
    `"${formatDate(sub.submittedAt)}"`,
    `"${sub.studentName}"`,
    `"${sub.className}"`,
    `"${sub.mode === 'test' ? 'Thi thử 45p' : 'Ôn tập tự do'}"`,
    `"${sub.scope}"`,
    `"${formatDuration(sub.timeSpentSeconds)}"`,
    sub.part1Score.toFixed(2),
    sub.part2Score.toFixed(2),
    sub.part3Score.toFixed(2),
    sub.totalScore.toFixed(2),
    `"${sub.percentage.toFixed(1)}%"`,
    `"${sub.rating}"`,
    `"${sub.feedback.replace(/"/g, '""')}"`,
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Bang_Diem_Tin11_GK1_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
