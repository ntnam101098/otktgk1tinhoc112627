import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Data storage directory and file path
const DATA_DIR = path.resolve(__dirname, 'data');
const DATA_FILE = path.resolve(DATA_DIR, 'submissions.json');

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Default initial records so the teacher has demo data to view and export
const INITIAL_DEMO_SUBMISSIONS = [
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
  }
];

function readSubmissionsFromFile(): any[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_DEMO_SUBMISSIONS, null, 2), 'utf-8');
      return INITIAL_DEMO_SUBMISSIONS;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading submissions file:', err);
    return [];
  }
}

function writeSubmissionsToFile(submissions: any[]): boolean {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing submissions file:', err);
    return false;
  }
}

// Initial check on startup
readSubmissionsFromFile();

// API Endpoints
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// GET all submissions across all students & devices
app.get('/api/submissions', (_req, res) => {
  const subs = readSubmissionsFromFile();
  res.json({ success: true, data: subs });
});

// POST new student submission
app.post('/api/submissions', (req, res) => {
  const newSub = req.body;
  if (!newSub || !newSub.studentName) {
    res.status(400).json({ success: false, message: 'Dữ liệu bài nộp không hợp lệ' });
    return;
  }

  const subs = readSubmissionsFromFile();
  // Prepend so newest is first
  const updated = [newSub, ...subs.filter(s => s.id !== newSub.id)];
  writeSubmissionsToFile(updated);

  console.log(`[SUBMISSION] Received and saved submission for: ${newSub.studentName} (${newSub.className})`);
  res.json({ success: true, data: newSub });
});

// DELETE single submission (Admin action)
app.delete('/api/submissions/:id', (req, res) => {
  const { id } = req.params;
  const subs = readSubmissionsFromFile();
  const updated = subs.filter(s => s.id !== id);
  writeSubmissionsToFile(updated);

  res.json({ success: true, message: 'Đã xóa bài làm thành công' });
});

// DELETE all submissions (Admin action)
app.delete('/api/submissions', (_req, res) => {
  writeSubmissionsToFile([]);
  res.json({ success: true, message: 'Đã xóa tất cả dữ liệu bài làm' });
});

// Restore demo records
app.post('/api/submissions/restore-demo', (_req, res) => {
  writeSubmissionsToFile(INITIAL_DEMO_SUBMISSIONS);
  res.json({ success: true, data: INITIAL_DEMO_SUBMISSIONS });
});

// Admin login verification
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body || {};
  if (username === 'vvdtntbt' && password === 'dtnt123456@') {
    res.json({ success: true, token: 'admin_authenticated' });
  } else {
    res.status(401).json({ success: false, message: 'Sai tên đăng nhập hoặc mật khẩu' });
  }
});

// Mount Vite or static server
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend server ready at http://0.0.0.0:${PORT}`);
  });
}

startServer();
