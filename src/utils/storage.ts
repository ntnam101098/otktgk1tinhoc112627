import { StudentSubmission } from '../types/quiz';

const SUBMISSIONS_KEY = 'tin11_exam_submissions_v1';
const ADMIN_AUTH_KEY = 'tin11_admin_auth_v1';

export const ADMIN_CREDENTIALS = {
  username: 'vvdtntbt',
  password: 'dtnt123456@',
};

// Default initial records so the teacher always has reliable baseline data to view and export
export const DEFAULT_DEMO_SUBMISSIONS: StudentSubmission[] = [
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
      1: { a: '10011', b: '14', c: '0', d: '1111100' },
      2: { a: 'Quyền xem chỉ để đọc', b: 'Nhận xét góp ý, sửa trực tiếp', c: 'Cùng làm việc trên đám mây', d: 'Nhận xét không tự sửa câu văn' },
      3: { a: 'học sinh giảm rác nhựa', b: 'giảm rác nhựa nội trú', c: 'bình nước cá nhân, mục Hình ảnh', d: 'Bài cơ quan môi trường vì tin cậy' },
      4: { a: '10000', b: '9', c: '1', d: '1110101' },
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
      1: { a: '10011', b: '14', c: '0', d: '1111100' },
      2: { a: 'Chỉ xem', b: 'Góp ý vs chỉnh sửa', c: 'Google docs đồng bộ', d: 'Chỉ là comment' },
      3: { a: 'giảm rác', b: 'giảm rác nội trú', c: 'bình nước', d: 'môi trường' },
      4: { a: '10000', b: '9', c: '1', d: '1110101' },
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
      1: { a: '10011', b: '14', c: '0', d: '1111100' },
      2: { a: 'chỉ đọc', b: 'góp ý và sửa', c: 'chung file', d: 'comment riêng' },
      3: { a: 'rác nhựa', b: 'nội trú', c: 'bình nước cá nhân', d: 'cơ quan môi trường' },
      4: { a: '10000', b: '9', c: '1', d: '1110101' },
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

// Helper to broadcast changes across open tabs/windows
const broadcastSubmissionsChange = (data: StudentSubmission[]) => {
  try {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const channel = new BroadcastChannel('tin11_submissions_sync');
      channel.postMessage({ type: 'SUBMISSIONS_UPDATED', count: data.length });
    }
  } catch {
    // Ignore if BroadcastChannel is unavailable
  }
};

export const checkAdminAuth = (): boolean => {
  try {
    return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  } catch {
    return false;
  }
};

export const loginAdmin = async (username: string, pass: string): Promise<boolean> => {
  const isMatch = username.trim() === ADMIN_CREDENTIALS.username && pass === ADMIN_CREDENTIALS.password;
  if (isMatch) {
    try {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      // Also notify backend
      await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password: pass }),
      }).catch(() => {});
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

// Synchronous getter from local storage with automatic fallback to default demo data
export const getSubmissions = (): StudentSubmission[] => {
  try {
    const raw = localStorage.getItem(SUBMISSIONS_KEY);
    if (!raw) {
      // First run: initialize with demo data so admin always sees structured records
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(DEFAULT_DEMO_SUBMISSIONS));
      return DEFAULT_DEMO_SUBMISSIONS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.length > 0 ? parsed : [];
    }
    return [];
  } catch (err) {
    console.error('Failed to read cached submissions:', err);
    return DEFAULT_DEMO_SUBMISSIONS;
  }
};

// Merge two lists of submissions without losing any student's work
export function mergeSubmissionsLists(
  serverList: StudentSubmission[],
  localList: StudentSubmission[]
): StudentSubmission[] {
  const map = new Map<string, StudentSubmission>();

  // Add all local submissions first
  for (const s of localList) {
    if (s && s.id) map.set(s.id, s);
  }

  // Merge server submissions (newer timestamp wins)
  for (const s of serverList) {
    if (!s || !s.id) continue;
    const existing = map.get(s.id);
    if (!existing || new Date(s.submittedAt).getTime() >= new Date(existing.submittedAt).getTime()) {
      map.set(s.id, s);
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );
}

// Async fetch from persistent server database + automatic two-way merge
export const fetchSubmissionsFromServer = async (): Promise<StudentSubmission[]> => {
  const localSubs = getSubmissions();

  try {
    const res = await fetch('/api/submissions', {
      headers: { 'Accept': 'application/json' },
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        const serverSubs: StudentSubmission[] = data.data;

        // Two-way merge: Combine both lists so neither local nor server submissions are lost
        const merged = mergeSubmissionsLists(serverSubs, localSubs);

        // Update local cache
        localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(merged));
        broadcastSubmissionsChange(merged);

        // If local had submissions that weren't on the server yet, push them to server in background
        const serverIds = new Set(serverSubs.map(s => s.id));
        const unsyncedLocals = localSubs.filter(s => !serverIds.has(s.id));
        if (unsyncedLocals.length > 0) {
          fetch('/api/submissions/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ submissions: merged }),
          }).catch(e => console.warn('Background sync failed:', e));
        }

        return merged;
      }
    }
  } catch (err) {
    console.warn('Backend fetch failed, using local cache:', err);
  }

  return localSubs;
};

// Save submission both locally and to persistent server database
export const saveSubmission = async (sub: StudentSubmission): Promise<void> => {
  // 1. Update local cache immediately
  let updated: StudentSubmission[] = [];
  try {
    const current = getSubmissions();
    updated = [sub, ...current.filter((s) => s.id !== sub.id)];
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
    broadcastSubmissionsChange(updated);
  } catch (err) {
    console.error('Failed to update local cache:', err);
  }

  // 2. Persist to server backend database immediately with full JSON body
  try {
    const res = await fetch('/api/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(sub),
    });

    if (!res.ok) {
      // Also try sync endpoint as fallback
      await fetch('/api/submissions/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submissions: updated }),
      });
    }
  } catch (err) {
    console.error('Failed to persist submission to server:', err);
  }
};

// Delete single submission from server and cache
export const deleteSubmission = async (id: string): Promise<void> => {
  // Update local cache
  try {
    const current = getSubmissions();
    const filtered = current.filter((s) => s.id !== id);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(filtered));
    broadcastSubmissionsChange(filtered);
  } catch (err) {
    console.error('Failed to update local cache upon delete:', err);
  }

  // Delete on server
  try {
    await fetch(`/api/submissions/${id}`, { method: 'DELETE' });
  } catch (err) {
    console.error('Failed to delete submission on server:', err);
  }
};

// Clear all submissions from server and cache
export const clearAllSubmissions = async (): Promise<void> => {
  try {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify([]));
    broadcastSubmissionsChange([]);
  } catch (err) {
    console.error('Failed to clear local cache:', err);
  }

  try {
    await fetch('/api/submissions', { method: 'DELETE' });
  } catch (err) {
    console.error('Failed to clear submissions on server:', err);
  }
};

// Restore demo records
export const restoreDemoSubmissions = async (): Promise<StudentSubmission[]> => {
  try {
    const res = await fetch('/api/submissions/restore-demo', { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(data.data));
        broadcastSubmissionsChange(data.data);
        return data.data;
      }
    }
  } catch (err) {
    console.error('Failed to restore demo submissions on server:', err);
  }

  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(DEFAULT_DEMO_SUBMISSIONS));
  broadcastSubmissionsChange(DEFAULT_DEMO_SUBMISSIONS);
  return DEFAULT_DEMO_SUBMISSIONS;
};

// Import batch submissions (e.g. from JSON file uploaded by Admin)
export const importSubmissions = async (newSubs: StudentSubmission[]): Promise<StudentSubmission[]> => {
  const current = getSubmissions();
  const merged = mergeSubmissionsLists(newSubs, current);
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(merged));
  broadcastSubmissionsChange(merged);

  try {
    await fetch('/api/submissions/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ submissions: merged }),
    });
  } catch (err) {
    console.error('Failed to sync imported submissions to server:', err);
  }

  return merged;
};
