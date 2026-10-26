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

// Synchronous getter from local cache
export const getSubmissions = (): StudentSubmission[] => {
  try {
    const raw = localStorage.getItem(SUBMISSIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to read cached submissions:', err);
    return [];
  }
};

// Async fetch from persistent server database
export const fetchSubmissionsFromServer = async (): Promise<StudentSubmission[]> => {
  try {
    const res = await fetch('/api/submissions');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        // Cache to localStorage
        localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(data.data));
        return data.data;
      }
    }
  } catch (err) {
    console.warn('Backend fetch failed, falling back to local cache:', err);
  }
  return getSubmissions();
};

// Save submission both locally and to persistent server database
export const saveSubmission = async (sub: StudentSubmission): Promise<void> => {
  // 1. Update local cache immediately
  try {
    const current = getSubmissions();
    const updated = [sub, ...current.filter(s => s.id !== sub.id)];
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update local cache:', err);
  }

  // 2. Persist to server backend database
  try {
    await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sub),
    });
  } catch (err) {
    console.error('Failed to persist submission to server:', err);
  }
};

// Delete single submission from server and cache
export const deleteSubmission = async (id: string): Promise<void> => {
  // Update local cache
  try {
    const current = getSubmissions();
    const filtered = current.filter(s => s.id !== id);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(filtered));
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
        return data.data;
      }
    }
  } catch (err) {
    console.error('Failed to restore demo submissions on server:', err);
  }
  return getSubmissions();
};
