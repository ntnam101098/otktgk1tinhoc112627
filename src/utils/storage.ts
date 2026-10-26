import { StudentSubmission } from '../types/quiz';

const SUBMISSIONS_KEY = 'tin11_exam_submissions_v1';
const ADMIN_AUTH_KEY = 'tin11_admin_auth_v1';

export const ADMIN_CREDENTIALS = {
  username: 'vvdtntbt',
  password: 'dtnt123456@',
};

export const checkAdminAuth = (): boolean => {
  try {
    return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  } catch {
    return false;
  }
};

export const loginAdmin = (username: string, pass: string): boolean => {
  if (username.trim() === ADMIN_CREDENTIALS.username && pass === ADMIN_CREDENTIALS.password) {
    try {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
    } catch {
      // ignore
    }
    return true;
  }
  return false;
};

export const logoutAdmin = (): void => {
  try {
    localStorage.removeItem(ADMIN_AUTH_KEY);
  } catch {
    // ignore
  }
};

const SAMPLE_SUBMISSIONS: StudentSubmission[] = [
  {
    id: 'sub_demo_01',
    studentName: 'Trần Minh Quân',
    className: '11 Tin',
    mode: 'test',
    scope: 'all',
    startedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    submittedAt: new Date(Date.now() - 3600000 * 24 + 2100000).toISOString(),
    timeSpentSeconds: 2100,
    part1Answers: {
      1: 'A', 2: 'D', 3: 'A', 4: 'D', 5: 'B', 6: 'C', 7: 'D', 8: 'A', 9: 'C', 10: 'C',
      11: 'C', 12: 'A', 13: 'A', 14: 'A', 15: 'B', 16: 'A', 17: 'A', 18: 'C', 19: 'A', 20: 'D',
      21: 'C', 22: 'A', 23: 'D', 24: 'D', 25: 'B', 26: 'B', 27: 'C', 28: 'D', 29: 'B', 30: 'C'
    },
    part2Answers: {
      1: { a: true, b: true, c: false, d: true },
      2: { a: true, b: false, c: true, d: true },
      3: { a: true, b: false, c: true, d: true },
      4: { a: true, b: false, c: true, d: true },
      5: { a: true, b: true, c: true, d: false },
      6: { a: true, b: false, c: true, d: true },
    },
    part3Answers: {
      1: { a: '10011', b: '14', c: '5', d: '14 + 5 = 19' },
      2: { a: 'Quyền xem chỉ để đọc', b: 'Nhận xét góp ý, sửa trực tiếp', c: 'Cùng làm việc trên đám mây', d: 'Nhận xét không tự sửa câu văn' },
      3: { a: 'học sinh giảm rác nhựa', b: 'giảm rác nhựa nội trú', c: 'bình nước cá nhân, mục Hình ảnh', d: 'Bài cơ quan môi trường vì tin cậy' },
      4: { a: '10000', b: '9', c: '7', d: '9 + 7 = 16' },
      5: { a: 'Cùng đường dẫn trực tuyến', b: 'Chưa được phân quyền', c: 'Vô tình xóa nhầm dữ liệu', d: 'Quyền bị thu hồi' },
      6: { a: 'sắp xếp góc học tập nội trú', b: 'sắp xếp sách vở bàn học', c: 'bàn học gọn gàng, Hình ảnh', d: 'Bài nhà trường uy tín' }
    },
    part3SelfScores: {
      1: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 },
      2: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 },
      3: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 },
      4: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 },
      5: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 },
      6: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 },
    },
    part1Score: 3.0,
    part2Score: 4.0,
    part3Score: 3.0,
    totalScore: 10.0,
    maxScore: 10.0,
    percentage: 100,
    rating: 'Xuất sắc',
    feedback: 'Nắm vững toàn diện kiến thức Bài 1 đến Bài 8. Lập luận chuẩn xác, tính toán nhị phân chính xác 100%!'
  },
  {
    id: 'sub_demo_02',
    studentName: 'Lê Hoàng Yến Nhi',
    className: '11A1',
    mode: 'test',
    scope: 'all',
    startedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    submittedAt: new Date(Date.now() - 3600000 * 18 + 2400000).toISOString(),
    timeSpentSeconds: 2400,
    part1Answers: {
      1: 'A', 2: 'D', 3: 'A', 4: 'D', 5: 'B', 6: 'C', 7: 'D', 8: 'A', 9: 'C', 10: 'C',
      11: 'C', 12: 'A', 13: 'A', 14: 'A', 15: 'B', 16: 'A', 17: 'A', 18: 'C', 19: 'A', 20: 'D',
      21: 'C', 22: 'A', 23: 'C', 24: 'D', 25: 'B', 26: 'B', 27: 'C', 28: 'D', 29: 'B', 30: 'C'
    },
    part2Answers: {
      1: { a: true, b: true, c: false, d: true },
      2: { a: true, b: false, c: true, d: true },
      3: { a: true, b: true, c: true, d: true },
      4: { a: true, b: false, c: true, d: true },
      5: { a: true, b: true, c: true, d: false },
      6: { a: true, b: false, c: true, d: true },
    },
    part3Answers: {
      1: { a: '10011', b: '14', c: '5', d: '14 + 5 = 19' },
      2: { a: 'Chỉ xem', b: 'Góp ý vs chỉnh sửa', c: 'Google docs đồng bộ', d: 'Chỉ là comment' },
      3: { a: 'giảm rác', b: 'giảm rác nội trú', c: 'bình nước', d: 'môi trường' },
      4: { a: '10000', b: '9', c: '7', d: '9 + 7 = 16' },
      5: { a: 'link trực tuyến', b: 'chưa có quyền', c: 'sửa nhầm', d: 'bị hủy' },
      6: { a: 'góc học tập', b: 'sách vở', c: 'ảnh bàn học', d: 'trường học' }
    },
    part3SelfScores: {
      1: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 },
      2: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 },
      3: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 },
      4: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 },
      5: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 },
      6: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 },
    },
    part1Score: 2.9,
    part2Score: 3.5,
    part3Score: 2.75,
    totalScore: 9.15,
    maxScore: 10.0,
    percentage: 91.5,
    rating: 'Giỏi',
    feedback: 'Bài làm rất tốt, các kiến thức cốt lõi về HĐH, phần mềm nguồn mở và lưu trữ trực tuyến đều vững vàng.'
  },
  {
    id: 'sub_demo_03',
    studentName: 'Nguyễn Văn Nam',
    className: '11A2',
    mode: 'test',
    scope: 'all',
    startedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
    submittedAt: new Date(Date.now() - 3600000 * 10 + 2600000).toISOString(),
    timeSpentSeconds: 2600,
    part1Answers: {
      1: 'A', 2: 'D', 3: 'A', 4: 'A', 5: 'B', 6: 'C', 7: 'D', 8: 'A', 9: 'A', 10: 'C',
      11: 'C', 12: 'A', 13: 'A', 14: 'A', 15: 'B', 16: 'A', 17: 'D', 18: 'C', 19: 'A', 20: 'D',
      21: 'C', 22: 'A', 23: 'D', 24: 'D', 25: 'B', 26: 'B', 27: 'C', 28: 'D', 29: 'B', 30: 'C'
    },
    part2Answers: {
      1: { a: true, b: true, c: false, d: true },
      2: { a: false, b: false, c: true, d: true },
      3: { a: true, b: false, c: false, d: true },
      4: { a: true, b: false, c: true, d: true },
      5: { a: true, b: false, c: true, d: false },
      6: { a: true, b: false, c: true, d: true },
    },
    part3Answers: {
      1: { a: '10011', b: '14', c: '5', d: '14+5=19' },
      2: { a: 'chỉ đọc', b: 'góp ý và sửa', c: 'chung file', d: 'comment riêng' },
      3: { a: 'rác nhựa', b: 'nội trú', c: 'bình nước cá nhân', d: 'cơ quan môi trường' },
      4: { a: '10000', b: '9', c: '7', d: '16' },
      5: { a: 'online', b: 'khoá quyền', c: 'xoá nhầm', d: 'hết hạn' },
      6: { a: 'góc học tập', b: 'sách vở', c: 'ảnh', d: 'trường' }
    },
    part3SelfScores: {
      1: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 },
      2: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 },
      3: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 },
      4: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 },
      5: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 },
      6: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 },
    },
    part1Score: 2.7,
    part2Score: 2.8,
    part3Score: 2.25,
    totalScore: 7.75,
    maxScore: 10.0,
    percentage: 77.5,
    rating: 'Khá',
    feedback: 'Đạt kết quả Khá. Cần xem lại kiến thức về cáp VGA/HDMI và các phần mềm mã nguồn mở.'
  },
  {
    id: 'sub_demo_04',
    studentName: 'Đặng Quốc Bảo',
    className: '11 Tin',
    mode: 'practice',
    scope: 'all',
    startedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    submittedAt: new Date(Date.now() - 3600000 * 5 + 1800000).toISOString(),
    timeSpentSeconds: 1800,
    part1Answers: {
      1: 'A', 2: 'D', 3: 'A', 4: 'D', 5: 'B', 6: 'C', 7: 'D', 8: 'A', 9: 'C', 10: 'C',
      11: 'C', 12: 'A', 13: 'A', 14: 'A', 15: 'B', 16: 'A', 17: 'A', 18: 'C', 19: 'A', 20: 'D',
      21: 'C', 22: 'A', 23: 'D', 24: 'D', 25: 'B', 26: 'B', 27: 'C', 28: 'D', 29: 'B', 30: 'C'
    },
    part2Answers: {
      1: { a: true, b: true, c: false, d: true },
      2: { a: true, b: false, c: true, d: true },
      3: { a: true, b: false, c: true, d: true },
      4: { a: true, b: false, c: true, d: true },
      5: { a: true, b: true, c: true, d: false },
      6: { a: true, b: false, c: true, d: true },
    },
    part3Answers: {
      1: { a: '10011_2', b: '14', c: '5', d: '14 + 5 = 19' },
      2: { a: 'Quyền xem chỉ đọc', b: 'Comment và edit', c: 'Đồng bộ cloud', d: 'Ghi chú thôi' },
      3: { a: 'học sinh giảm rác', b: 'rác sinh hoạt nội trú', c: 'bình nước, tab hình ảnh', d: 'Cơ quan môi trường' },
      4: { a: '10000_2', b: '9', c: '7', d: '9 + 7 = 16' },
      5: { a: 'cùng 1 link cloud', b: 'chưa được share', c: 'sửa nhầm', d: 'đã thu hồi' },
      6: { a: 'góc học tập', b: 'sắp xếp sách vở', c: 'bàn học, hình ảnh', d: 'website trường' }
    },
    part3SelfScores: {
      1: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 },
      2: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 },
      3: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 },
      4: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 },
      5: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 },
      6: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 },
    },
    part1Score: 3.0,
    part2Score: 4.0,
    part3Score: 2.75,
    totalScore: 9.75,
    maxScore: 10.0,
    percentage: 97.5,
    rating: 'Xuất sắc',
    feedback: 'Ôn tập xuất sắc! Đầy đủ các bước giải thích và phép toán nhị phân chuẩn chỉnh.'
  }
];

export const getSubmissions = (): StudentSubmission[] => {
  try {
    const raw = localStorage.getItem(SUBMISSIONS_KEY);
    if (!raw) {
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(SAMPLE_SUBMISSIONS));
      return SAMPLE_SUBMISSIONS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length === 0) {
      return [];
    }
    return parsed;
  } catch (err) {
    console.error('Failed to read submissions:', err);
    return SAMPLE_SUBMISSIONS;
  }
};

export const saveSubmission = (sub: StudentSubmission): void => {
  try {
    const current = getSubmissions();
    const updated = [sub, ...current];
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save submission:', err);
  }
};

export const deleteSubmission = (id: string): void => {
  try {
    const current = getSubmissions();
    const filtered = current.filter(s => s.id !== id);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Failed to delete submission:', err);
  }
};

export const clearAllSubmissions = (): void => {
  try {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify([]));
  } catch (err) {
    console.error('Failed to clear submissions:', err);
  }
};

export const restoreDemoSubmissions = (): void => {
  try {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(SAMPLE_SUBMISSIONS));
  } catch (err) {
    console.error('Failed to restore demo submissions:', err);
  }
};
