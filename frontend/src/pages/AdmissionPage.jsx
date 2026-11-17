import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { GraduationCap, CheckCircle2, User, Phone, Mail, Calendar, MapPin, BookOpen, AlertCircle, Printer } from 'lucide-react';

export default function AdmissionPage() {
  const [searchParams] = useSearchParams();
  const preselectedCourse = searchParams.get('course') || '';

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    email: '',
    phone: '',
    dob: '',
    gender: 'Male',
    courseCode: preselectedCourse,
    qualification: '12th Pass',
    address: '',
    city: 'Jalandhar',
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.getCourses();
        if (res.success) {
          setCourses(res.data);
          if (!preselectedCourse && res.data.length > 0) {
            setFormData(prev => ({ ...prev, courseCode: res.data[0].code }));
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, [preselectedCourse]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const selectedCourseObj = courses.find(c => c.code === formData.courseCode);
      const courseTitle = selectedCourseObj ? selectedCourseObj.title : formData.courseCode;

      const payload = {
        fullName: formData.fullName,
        fatherName: formData.fatherName,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        gender: formData.gender,
        courseId: formData.courseCode,
        courseTitle,
        qualification: formData.qualification,
        address: formData.address,
        city: formData.city
      };

      const res = await api.submitAdmission(payload);
      if (res.success) {
        setSubmittedData({
          ...payload,
          applicationId: res.applicationId
        });
      } else {
        setError(res.message || 'Failed to submit admission application.');
      }
    } catch (err) {
      setError(err.message || 'A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // If already submitted successfully, show admission confirmation slip
  if (submittedData) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white border border-emerald-200 rounded-3xl p-8 sm:p-10 shadow-xl text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Application Registered Successfully!
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 mb-2">
            Welcome to Apex Institute!
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            Your admission application has been recorded. Please save your application number for further reference.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left space-y-3 mb-6">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-xs text-slate-500 font-medium">Application ID:</span>
              <span className="text-base font-mono font-extrabold text-indigo-700">{submittedData.applicationId}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-xs text-slate-500">Student Name:</span>
              <span className="font-bold text-slate-800">{submittedData.fullName}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-xs text-slate-500">Father's Name:</span>
              <span className="font-medium text-slate-800">{submittedData.fatherName}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-xs text-slate-500">Course Selected:</span>
              <span className="font-semibold text-indigo-900">{submittedData.courseTitle}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-xs text-slate-500">Contact Phone:</span>
              <span className="font-medium text-slate-800">{submittedData.phone}</span>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 text-left mb-6">
            <strong>Next Steps:</strong> Our counseling team will contact you on your mobile number within 24 hours to confirm batch timing (Morning/Evening) and document verification.
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.print()}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Acknowledgment</span>
            </button>
            <button
              onClick={() => { setSubmittedData(null); }}
              className="px-6 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          Admission Session 2026
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
          Online Student Admission Form
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          ਕੋਰਸ ਵਿੱਚ ਦਾਖਲੇ ਲਈ ਹੇਠਾਂ ਦਿੱਤਾ ਫਾਰਮ ਭਰੋ (Fill the form below to register your seat).
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-10">
        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-sm text-rose-700">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Personal Details */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-600" />
              <span>1. Student Particulars</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Full Name (ਵਿਦਿਆਰਥੀ ਦਾ ਪੂਰਾ ਨਾਂ) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Gurpreet Singh"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Father's Name (ਪਿਤਾ ਦਾ ਨਾਂ) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="fatherName"
                  required
                  value={formData.fatherName}
                  onChange={handleChange}
                  placeholder="e.g. Harbhajan Singh"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Mobile Number (ਮੋਬਾਈਲ ਨੰਬਰ) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email Address (ਈਮੇਲ)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Date of Birth (ਜਨਮ ਮਿਤੀ)
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Gender (ਲਿੰਗ)
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Male">Male (ਪੁਰਸ਼)</option>
                  <option value="Female">Female (ਇਸਤਰੀ)</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Course & Qualification */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>2. Course Selection & Academic Background</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Select Desired Course <span className="text-rose-500">*</span>
                </label>
                <select
                  name="courseCode"
                  required
                  value={formData.courseCode}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                >
                  {courses.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.title} ({c.duration} - ₹{c.fee})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Highest Qualification (ਪੜ੍ਹਾਈ)
                </label>
                <select
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="10th Matric">10th Matric</option>
                  <option value="12th Pass">12th Pass (Any Stream)</option>
                  <option value="BA / B.Com / B.Sc">BA / B.Com / B.Sc Graduate</option>
                  <option value="BCA / B.Tech / MCA">BCA / B.Tech / MCA / IT</option>
                  <option value="Post Graduate">Post Graduate / Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Residential Address */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-600" />
              <span>3. Address Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Village / Ward / Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House No, Street or Village"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  City / District (ਜ਼ਿਲ੍ਹਾ)
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Ludhiana, Jalandhar, Amritsar"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/20 text-sm sm:text-base transition-all disabled:opacity-50"
            >
              {loading ? 'Submitting Application...' : 'Submit Online Admission Form (ਦਾਖਲਾ ਫਾਰਮ ਜਮ੍ਹਾ ਕਰੋ)'}
            </button>
            <p className="text-center text-xs text-slate-400 mt-2">
              By submitting, you agree to receive SMS / WhatsApp admission updates on your phone number.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
