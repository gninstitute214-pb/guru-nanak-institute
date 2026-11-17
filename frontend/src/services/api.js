const API_BASE = '/api';

const getHeaders = (includeAuth = true) => {
  const headers = { 'Content-Type': 'application/json' };
  if (includeAuth) {
    const token = localStorage.getItem('institute_admin_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

export const api = {
  // Courses
  async getCourses() {
    const res = await fetch(`${API_BASE}/courses`);
    return await res.json();
  },
  async getCourse(code) {
    const res = await fetch(`${API_BASE}/courses/${code}`);
    return await res.json();
  },
  async createCourse(data) {
    const res = await fetch(`${API_BASE}/courses`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return await res.json();
  },
  async updateCourse(code, data) {
    const res = await fetch(`${API_BASE}/courses/${code}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return await res.json();
  },
  async deleteCourse(code) {
    const res = await fetch(`${API_BASE}/courses/${code}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    return await res.json();
  },

  // Admissions
  async submitAdmission(data) {
    const res = await fetch(`${API_BASE}/admissions/apply`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(data)
    });
    return await res.json();
  },
  async getAdmissions() {
    const res = await fetch(`${API_BASE}/admissions`, {
      headers: getHeaders(true)
    });
    return await res.json();
  },
  async updateAdmissionStatus(appId, status, notes) {
    const res = await fetch(`${API_BASE}/admissions/${appId}/status`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify({ status, notes })
    });
    return await res.json();
  },

  // Certificates
  async verifyCertificate(identifier) {
    const res = await fetch(`${API_BASE}/certificates/verify/${encodeURIComponent(identifier)}`);
    return await res.json();
  },
  async getCertificates() {
    const res = await fetch(`${API_BASE}/certificates`, {
      headers: getHeaders(true)
    });
    return await res.json();
  },
  async issueCertificate(data) {
    const res = await fetch(`${API_BASE}/certificates/issue`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return await res.json();
  },
  async deleteCertificate(certificateNo) {
    const res = await fetch(`${API_BASE}/certificates/${certificateNo}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    return await res.json();
  },

  // Inquiries
  async submitInquiry(data) {
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(data)
    });
    return await res.json();
  },
  async getInquiries() {
    const res = await fetch(`${API_BASE}/inquiries`, {
      headers: getHeaders(true)
    });
    return await res.json();
  },
  async updateInquiryStatus(id, status) {
    const res = await fetch(`${API_BASE}/inquiries/${id}/status`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify({ status })
    });
    return await res.json();
  },

  // Auth & Stats
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return await res.json();
  },
  async forgotPassword(email) {
    const res = await fetch(`${API_BASE}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return await res.json();
  },
  async resetPassword(email, otp, newPassword) {
    const res = await fetch(`${API_BASE}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword })
    });
    return await res.json();
  },
  async resetWithPhone(phone, newPassword) {
    const res = await fetch(`${API_BASE}/auth/reset-with-phone`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, newPassword })
    });
    return await res.json();
  },
  async changePassword(currentPassword, newPassword) {
    const res = await fetch(`${API_BASE}/auth/change-password`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify({ currentPassword, newPassword })
    });
    return await res.json();
  },
  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders(true)
    });
    return await res.json();
  },
  async getDashboardStats() {
    const res = await fetch(`${API_BASE}/stats/dashboard`, {
      headers: getHeaders(true)
    });
    return await res.json();
  }
};
