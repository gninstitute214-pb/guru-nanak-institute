import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { 
  Users, BookOpen, Award, MessageSquare, Plus, Trash2, Edit3, X,
  CheckCircle2, XCircle, Clock, Search, RefreshCw, LogOut, ShieldCheck, Save, Lock
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, isAuthenticated, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // overview, admissions, certificates, courses, inquiries
  const [stats, setStats] = useState(null);
  const [admissions, setAdmissions] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [courses, setCourses] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Forms
  const [newCert, setNewCert] = useState({
    studentName: '',
    fatherName: '',
    rollNo: '',
    courseName: 'Diploma in Computer Applications (DCA)',
    duration: '6 Months',
    issueDate: new Date().toISOString().split('T')[0],
    grade: 'A+',
    percentage: 90
  });

  const [newCourse, setNewCourse] = useState({
    title: '',
    code: '',
    category: 'Programming',
    duration: '3 Months',
    fee: 5000,
    description: '',
    syllabus: '',
    eligibility: '12th Pass',
    badge: 'Popular'
  });

  // Course Editing State
  const [editingCourse, setEditingCourse] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    code: '',
    category: '',
    duration: '',
    fee: 0,
    description: '',
    syllabus: '',
    eligibility: '',
    badge: ''
  });

  const [feedbackMsg, setFeedbackMsg] = useState({ text: '', type: '' });

  // Change Password Modal State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passForm, setPassForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');
  const [passLoading, setPassLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    if (passForm.newPassword !== passForm.confirmPassword) {
      setPassError('New passwords do not match.');
      return;
    }
    if (passForm.newPassword.length < 6) {
      setPassError('New password must be at least 6 characters.');
      return;
    }

    setPassLoading(true);
    try {
      const res = await api.changePassword(passForm.currentPassword, passForm.newPassword);
      if (res.success) {
        setPassSuccess(res.message);
        setPassForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => {
          setShowPasswordModal(false);
          setPassSuccess('');
        }, 2000);
      } else {
        setPassError(res.message || 'Failed to change password.');
      }
    } catch {
      setPassError('Network error. Please try again.');
    } finally {
      setPassLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [sRes, aRes, cRes, crsRes, inqRes] = await Promise.all([
        api.getDashboardStats(),
        api.getAdmissions(),
        api.getCertificates(),
        api.getCourses(),
        api.getInquiries()
      ]);
      if (sRes.success) setStats(sRes.data);
      if (aRes.success) setAdmissions(aRes.data);
      if (cRes.success) setCertificates(cRes.data);
      if (crsRes.success) setCourses(crsRes.data);
      if (inqRes.success) setInquiries(inqRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated, refreshKey]);

  const showFeedback = (text, type = 'success') => {
    setFeedbackMsg({ text, type });
    setTimeout(() => setFeedbackMsg({ text: '', type: '' }), 4000);
  };

  // Actions
  const handleAdmissionStatus = async (appId, status) => {
    try {
      const res = await api.updateAdmissionStatus(appId, status);
      if (res.success) {
        showFeedback(`Admission status updated to ${status}`);
        setRefreshKey(k => k + 1);
      }
    } catch {
      showFeedback('Failed to update status', 'error');
    }
  };

  const handleIssueCertificate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.issueCertificate(newCert);
      if (res.success) {
        showFeedback(`Certificate issued successfully! (Cert No: ${res.data.certificateNo})`);
        setNewCert({
          studentName: '',
          fatherName: '',
          rollNo: '',
          courseName: 'Diploma in Computer Applications (DCA)',
          duration: '6 Months',
          issueDate: new Date().toISOString().split('T')[0],
          grade: 'A+',
          percentage: 90
        });
        setRefreshKey(k => k + 1);
      } else {
        showFeedback(res.message || 'Error issuing certificate', 'error');
      }
    } catch {
      showFeedback('Failed to issue certificate', 'error');
    }
  };

  const handleDeleteCertificate = async (certNo) => {
    if (window.confirm(`Are you sure you want to delete certificate ${certNo}?`)) {
      try {
        await api.deleteCertificate(certNo);
        showFeedback(`Certificate ${certNo} deleted`);
        setRefreshKey(k => k + 1);
      } catch {
        showFeedback('Failed to delete', 'error');
      }
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await api.createCourse(newCourse);
      if (res.success) {
        showFeedback(`Course ${newCourse.code} created successfully!`);
        setNewCourse({
          title: '',
          code: '',
          category: 'Programming',
          duration: '3 Months',
          fee: 5000,
          description: '',
          syllabus: '',
          eligibility: '12th Pass',
          badge: 'Popular'
        });
        setRefreshKey(k => k + 1);
      } else {
        showFeedback(res.message || 'Error creating course', 'error');
      }
    } catch {
      showFeedback('Failed to create course', 'error');
    }
  };

  const handleDeleteCourse = async (code) => {
    if (window.confirm(`Delete course ${code}?`)) {
      try {
        await api.deleteCourse(code);
        showFeedback(`Course ${code} deleted`);
        setRefreshKey(k => k + 1);
      } catch {
        showFeedback('Failed to delete course', 'error');
      }
    }
  };

  // Course Edit Handlers
  const handleOpenEdit = (course) => {
    setEditingCourse(course);
    setEditFormData({
      title: course.title || '',
      code: course.code || '',
      category: course.category || 'Programming',
      duration: course.duration || '',
      fee: course.fee || 0,
      description: course.description || '',
      syllabus: Array.isArray(course.syllabus) ? course.syllabus.join('\n') : (course.syllabus || ''),
      eligibility: course.eligibility || '10th / 12th Pass',
      badge: course.badge || 'Popular'
    });
  };

  const handleSaveCourseEdit = async (e) => {
    e.preventDefault();
    if (!editingCourse) return;
    try {
      const res = await api.updateCourse(editingCourse.code, editFormData);
      if (res.success) {
        showFeedback(`Course ${editingCourse.code} updated successfully!`);
        setEditingCourse(null);
        setRefreshKey(k => k + 1);
      } else {
        showFeedback(res.message || 'Failed to update course', 'error');
      }
    } catch {
      showFeedback('Network error while saving course', 'error');
    }
  };

  const handleInquiryStatus = async (id, status) => {
    try {
      await api.updateInquiryStatus(id, status);
      showFeedback(`Inquiry status updated`);
      setRefreshKey(k => k + 1);
    } catch {
      showFeedback('Failed to update inquiry', 'error');
    }
  };

  if (authLoading || (!isAuthenticated && loading)) {
    return <div className="py-20 text-center text-slate-500 text-sm">Verifying admin session...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Patiala Center Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Guru Nanak Institute Administration
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Logged in as <strong>{user?.email}</strong> | Campus: Ranjit Nagar, Seona Road, Patiala (7355687717)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setRefreshKey(k => k + 1)}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => { setShowPasswordModal(true); setPassError(''); setPassSuccess(''); }}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-semibold transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Change Password</span>
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Global Feedback Banner */}
      {feedbackMsg.text && (
        <div className={`mb-6 p-4 rounded-xl text-xs font-bold flex items-center gap-2 ${
          feedbackMsg.type === 'error' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
        }`}>
          <CheckCircle2 className="w-4 h-4" />
          <span>{feedbackMsg.text}</span>
        </div>
      )}

      {/* Nav Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 bg-slate-100 p-1.5 rounded-2xl w-fit">
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: Users },
          { id: 'admissions', label: `Admissions (${admissions.length})`, icon: Users },
          { id: 'certificates', label: `Certificates (${certificates.length})`, icon: Award },
          { id: 'courses', label: `Manage Courses (${courses.length})`, icon: BookOpen },
          { id: 'inquiries', label: `Inquiries (${inquiries.length})`, icon: MessageSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block mb-1">Total Admissions</span>
              <div className="text-3xl font-extrabold text-slate-900">{stats?.totalAdmissions || 0}</div>
              <span className="text-[11px] text-amber-600 font-medium">Pending: {stats?.pendingAdmissions || 0}</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block mb-1">Active Courses</span>
              <div className="text-3xl font-extrabold text-indigo-600">{stats?.totalCourses || 0}</div>
              <span className="text-[11px] text-slate-400">Can be edited anytime</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block mb-1">Certificates Issued</span>
              <div className="text-3xl font-extrabold text-emerald-600">{stats?.totalCertificates || 0}</div>
              <span className="text-[11px] text-emerald-600 font-medium">100% Verifiable Online</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block mb-1">Student Inquiries</span>
              <div className="text-3xl font-extrabold text-purple-600">{stats?.totalInquiries || 0}</div>
              <span className="text-[11px] text-purple-600 font-medium">Sent to gninstitute214@gmail.com</span>
            </div>
          </div>

          {/* Recent Admissions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 text-sm">Recent Student Applications</h3>
              <button onClick={() => setActiveTab('admissions')} className="text-xs text-indigo-600 font-semibold hover:underline">
                View All →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">App ID</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Course</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {admissions.slice(0, 5).map((a) => (
                    <tr key={a.applicationId || a._id}>
                      <td className="p-3 font-mono font-bold text-indigo-700">{a.applicationId}</td>
                      <td className="p-3 font-semibold text-slate-800">{a.fullName}</td>
                      <td className="p-3 text-slate-600">{a.courseTitle}</td>
                      <td className="p-3 text-slate-600">{a.phone}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          a.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                          a.status === 'Rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ADMISSIONS */}
      {activeTab === 'admissions' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-slate-900">Student Admission Applications</h3>
            <span className="text-xs text-slate-500">{admissions.length} registered applicant(s)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">App ID</th>
                  <th className="p-3">Applicant Name</th>
                  <th className="p-3">Father's Name</th>
                  <th className="p-3">Course</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">City / Qualification</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {admissions.map((adm) => (
                  <tr key={adm.applicationId || adm._id} className="hover:bg-slate-50/50">
                    <td className="p-3 font-mono font-bold text-indigo-700">{adm.applicationId}</td>
                    <td className="p-3 font-bold text-slate-900">{adm.fullName}</td>
                    <td className="p-3 text-slate-600">{adm.fatherName}</td>
                    <td className="p-3 font-medium text-slate-800">{adm.courseTitle}</td>
                    <td className="p-3 font-mono">{adm.phone}</td>
                    <td className="p-3 text-slate-500">{adm.city} ({adm.qualification})</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        adm.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                        adm.status === 'Rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {adm.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleAdmissionStatus(adm.applicationId, 'Approved')}
                          className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg font-semibold text-[11px]"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAdmissionStatus(adm.applicationId, 'Rejected')}
                          className="px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg font-semibold text-[11px]"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CERTIFICATES */}
      {activeTab === 'certificates' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Issue Form */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              <span>Issue New Student Certificate</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Add student certificate to the online verification registry.
            </p>

            <form onSubmit={handleIssueCertificate} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={newCert.studentName}
                  onChange={(e) => setNewCert({ ...newCert, studentName: e.target.value })}
                  placeholder="e.g. Gurpreet Singh"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Father's Name</label>
                <input
                  type="text"
                  value={newCert.fatherName}
                  onChange={(e) => setNewCert({ ...newCert, fatherName: e.target.value })}
                  placeholder="e.g. Harbhajan Singh"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Roll Number *</label>
                  <input
                    type="text"
                    required
                    value={newCert.rollNo}
                    onChange={(e) => setNewCert({ ...newCert, rollNo: e.target.value })}
                    placeholder="e.g. 202610"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl uppercase font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Grade</label>
                  <select
                    value={newCert.grade}
                    onChange={(e) => setNewCert({ ...newCert, grade: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  >
                    <option value="A+">A+ (Distinction)</option>
                    <option value="A">A (Excellent)</option>
                    <option value="B+">B+ (Good)</option>
                    <option value="B">B (Pass)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Course Name</label>
                <select
                  value={newCert.courseName}
                  onChange={(e) => setNewCert({ ...newCert, courseName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-medium"
                >
                  {courses.map(c => (
                    <option key={c.code} value={c.title}>{c.title}</option>
                  ))}
                  <option value="Diploma in Computer Applications (DCA)">Diploma in Computer Applications (DCA)</option>
                  <option value="Tally Prime with GST & Financial Accounting">Tally Prime with GST & Financial Accounting</option>
                  <option value="Full Stack Web Development (MERN)">Full Stack Web Development (MERN)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Course Duration</label>
                  <input
                    type="text"
                    value={newCert.duration}
                    onChange={(e) => setNewCert({ ...newCert, duration: e.target.value })}
                    placeholder="e.g. 6 Months"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Marks Percentage (%)</label>
                  <input
                    type="number"
                    value={newCert.percentage}
                    onChange={(e) => setNewCert({ ...newCert, percentage: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Issue Date</label>
                <input
                  type="date"
                  value={newCert.issueDate}
                  onChange={(e) => setNewCert({ ...newCert, issueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl mt-2 transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Issue & Register Certificate</span>
              </button>
            </form>
          </div>

          {/* Certificate Registry Table */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4">Issued Certificates Registry</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Cert No.</th>
                    <th className="p-3">Roll No.</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Course</th>
                    <th className="p-3">Grade</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {certificates.map((c) => (
                    <tr key={c.certificateNo} className="hover:bg-slate-50/50">
                      <td className="p-3 font-mono font-bold text-indigo-700">{c.certificateNo}</td>
                      <td className="p-3 font-mono text-slate-700">{c.rollNo}</td>
                      <td className="p-3 font-semibold text-slate-800">{c.studentName}</td>
                      <td className="p-3 text-slate-600 line-clamp-1">{c.courseName}</td>
                      <td className="p-3 font-bold text-indigo-900">{c.grade}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDeleteCertificate(c.certificateNo)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COURSES (WITH EDIT MODAL & ACTIONS) */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Add New Course Form */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>Add New Course</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">Create a new computer training course or diploma.</p>

            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  placeholder="e.g. Master in Web Design"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Code *</label>
                  <input
                    type="text"
                    required
                    value={newCourse.code}
                    onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                    placeholder="e.g. MWD-101"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl uppercase font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  >
                    <option value="Basics & Office">Basics & Office</option>
                    <option value="Advanced Diploma">Advanced Diploma</option>
                    <option value="Programming">Programming</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Design">Design</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration *</label>
                  <input
                    type="text"
                    required
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                    placeholder="e.g. 6 Months"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Fee (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newCourse.fee}
                    onChange={(e) => setNewCourse({ ...newCourse, fee: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Course Description</label>
                <textarea
                  rows={2}
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  placeholder="Summary of what the course covers..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Syllabus Modules (1 per line)</label>
                <textarea
                  rows={3}
                  value={newCourse.syllabus}
                  onChange={(e) => setNewCourse({ ...newCourse, syllabus: e.target.value })}
                  placeholder="Module 1: Fundamentals&#10;Module 2: Practical"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Save Course</span>
              </button>
            </form>
          </div>

          {/* Courses List with EDIT & DELETE */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Course Directory ({courses.length})</h3>
                <p className="text-xs text-slate-500">Click <strong>Edit</strong> on any course to change details, syllabus or fees.</p>
              </div>
            </div>

            <div className="space-y-3">
              {courses.map((crs) => (
                <div key={crs.code} className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:border-indigo-300 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {crs.code}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900">{crs.title}</h4>
                      <span className="text-[11px] text-slate-500 font-medium">({crs.duration})</span>
                      <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {crs.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">{crs.description}</p>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-900 mt-2">
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Fee: ₹{Number(crs.fee).toLocaleString('en-IN')}
                      </span>
                      {crs.badge && (
                        <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium text-[11px]">
                          Badge: {crs.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Edit and Delete Buttons */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => handleOpenEdit(crs)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-lg text-xs transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Details</span>
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(crs.code)}
                      title="Delete Course"
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* EDIT COURSE MODAL */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-fadeIn">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-indigo-600" />
                  <span>Edit Course Details: {editingCourse.code}</span>
                </h3>
                <p className="text-xs text-slate-500">Update syllabus, duration, fee, and description.</p>
              </div>
              <button
                onClick={() => setEditingCourse(null)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourseEdit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Course Title *</label>
                  <input
                    type="text"
                    required
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Course Code (Unique)</label>
                  <input
                    type="text"
                    disabled
                    value={editFormData.code}
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-sm font-mono text-slate-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={editFormData.category}
                    onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  >
                    <option value="Basics & Office">Basics & Office</option>
                    <option value="Advanced Diploma">Advanced Diploma</option>
                    <option value="Programming">Programming</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Design">Design</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration *</label>
                  <input
                    type="text"
                    required
                    value={editFormData.duration}
                    onChange={(e) => setEditFormData({ ...editFormData, duration: e.target.value })}
                    placeholder="e.g. 6 Months"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Total Fee (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editFormData.fee}
                    onChange={(e) => setEditFormData({ ...editFormData, fee: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={editFormData.badge}
                    onChange={(e) => setEditFormData({ ...editFormData, badge: e.target.value })}
                    placeholder="e.g. Most Popular, Job Ready"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Eligibility Criteria</label>
                  <input
                    type="text"
                    value={editFormData.eligibility}
                    onChange={(e) => setEditFormData({ ...editFormData, eligibility: e.target.value })}
                    placeholder="e.g. 10th / 12th Pass"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Syllabus Modules (Enter one module per line)
                </label>
                <textarea
                  rows={4}
                  value={editFormData.syllabus}
                  onChange={(e) => setEditFormData({ ...editFormData, syllabus: e.target.value })}
                  placeholder="Module 1: ...&#10;Module 2: ..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-mono text-[11px]"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-md transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes (ਅਪਡੇਟ ਕਰੋ)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 5: INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Student Inquiries & Messages</h3>
              <p className="text-xs text-slate-500">Every inquiry submitted by students is also dispatched to <strong className="text-indigo-600">gninstitute214@gmail.com</strong>.</p>
            </div>
            <span className="text-xs text-slate-400">{inquiries.length} total</span>
          </div>

          <div className="space-y-4">
            {inquiries.length === 0 ? (
              <p className="text-xs text-slate-500">No inquiries yet.</p>
            ) : (
              inquiries.map((inq) => (
                <div key={inq.id || inq._id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <strong className="text-sm text-slate-900 font-bold">{inq.name}</strong>
                      <a href={`tel:${inq.phone}`} className="text-xs font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-bold hover:underline">
                        📞 {inq.phone}
                      </a>
                      <span className="text-xs text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                        Course: {inq.courseInterested}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 mt-2 bg-white p-3 rounded-xl border border-slate-200/60">
                      "{inq.message}"
                    </p>
                    {inq.email && (
                      <span className="text-[11px] text-slate-400 mt-1 block">Email: {inq.email}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      inq.status === 'Contacted' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {inq.status}
                    </span>
                    {inq.status !== 'Contacted' && (
                      <button
                        onClick={() => handleInquiryStatus(inq.id || inq._id, 'Contacted')}
                        className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
                      >
                        Mark Contacted
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-fadeIn">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-indigo-600" />
                  <span>Change Admin Password</span>
                </h3>
                <p className="text-xs text-slate-500">Update your security password</p>
              </div>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {passSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{passSuccess}</span>
              </div>
            )}

            {passError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{passError}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Current Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Enter current password"
                  value={passForm.currentPassword}
                  onChange={(e) => setPassForm({ ...passForm, currentPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">New Password (Min 6 characters) *</label>
                <input
                  type="password"
                  required
                  placeholder="Enter new password"
                  value={passForm.newPassword}
                  onChange={(e) => setPassForm({ ...passForm, newPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Confirm New Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Confirm new password"
                  value={passForm.confirmPassword}
                  onChange={(e) => setPassForm({ ...passForm, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passLoading}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md disabled:opacity-50"
                >
                  {passLoading ? 'Updating...' : 'Update Password (ਪਾਸਵਰਡ ਬਦਲੋ)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
