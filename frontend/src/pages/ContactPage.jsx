import React, { useState } from 'react';
import { api } from '../services/api';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    courseInterested: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await api.submitInquiry(formData);
      if (res.success) {
        setSuccess(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          courseInterested: 'General Inquiry',
          message: ''
        });
      } else {
        setError(res.message || 'Failed to submit inquiry.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
          Contact & Visit Our Patiala Campus
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          ਕਿਸੇ ਵੀ ਜਾਣਕਾਰੀ ਜਾਂ ਦਾਖਲੇ ਬਾਰੇ ਪੁੱਛਗਿੱਛ ਲਈ ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ ਜਾਂ ਇੰਸਟੀਚਿਊਟ ਵਿਜ਼ਿਟ ਕਰੋ।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info Col */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-linear-to-br from-indigo-950 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-xl font-bold mb-6">Guru Nanak Institute of Computer Education</h3>
            
            <div className="space-y-6 text-sm text-indigo-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-amber-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-white text-sm font-semibold mb-0.5">Campus Address</strong>
                  <p>Ranjit Nagar, Seona Road, Patiala -147001, Punjab</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-emerald-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-white text-sm font-semibold mb-0.5">Phone & WhatsApp</strong>
                  <p><a href="tel:7355687717" className="hover:text-amber-300 font-bold text-base">7355687717</a></p>
                  <p className="text-xs text-indigo-300">Direct admission & inquiry helpline</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-sky-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-white text-sm font-semibold mb-0.5">Official Email</strong>
                  <p><a href="mailto:gninstitute214@gmail.com" className="hover:text-amber-300 font-medium">gninstitute214@gmail.com</a></p>
                  <p className="text-xs text-indigo-300">All website inquiries are forwarded here</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-indigo-300">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-white text-sm font-semibold mb-0.5">Institute Hours</strong>
                  <p>Monday - Saturday: 8:00 AM – 7:00 PM</p>
                  <p className="text-xs text-indigo-300">Flexible Morning & Evening batches</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 text-xs text-amber-900">
            <h4 className="font-bold text-sm mb-1 text-amber-950">Free 2-Day Demo Class in Patiala:</h4>
            <p className="leading-relaxed">
              Visit our center at Ranjit Nagar, Seona Road, Patiala for a free 2-day demo class on DCA, Tally Prime, Web Development, or Punjabi/English typing.
            </p>
          </div>
        </div>

        {/* Inquiry Form Col */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Send an Inquiry to Institute</h3>
          <p className="text-xs text-slate-500 mb-6">
            ਸੁਨੇਹਾ ਭੇਜੋ, ਤੁਹਾਡਾ ਸੁਨੇਹਾ ਸਿੱਧਾ <code className="text-indigo-600 font-bold">gninstitute214@gmail.com</code> ਉੱਤੇ ਪ੍ਰਾਪਤ ਹੋਵੇਗਾ।
          </p>

          {success && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-sm text-emerald-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>ਤੁਹਾਡਾ ਸੁਨੇਹਾ ਸਫਲਤਾਪੂਰਵਕ ਭੇਜਿਆ ਗਿਆ ਹੈ! ਸਾਡੀ ਟੀਮ ਤੁਹਾਡੇ ਨਾਲ ਜਲਦੀ ਸੰਪਰਕ ਕਰੇਗੀ।</span>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-sm text-rose-700">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Navjot Kaur"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Phone Number <span className="text-rose-500">*</span>
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@gmail.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Course of Interest
                </label>
                <select
                  name="courseInterested"
                  value={formData.courseInterested}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="DCA (6 Months)">DCA (6 Months)</option>
                  <option value="ADCA (1 Year)">ADCA (1 Year)</option>
                  <option value="Tally Prime with GST">Tally Prime with GST</option>
                  <option value="Full Stack Web Dev (MERN)">Full Stack Web Dev (MERN)</option>
                  <option value="Python & AI">Python & AI</option>
                  <option value="Graphic Designing">Graphic Designing</option>
                  <option value="Punjabi / English Typing">Punjabi / English Typing</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Message / Question <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Ask about batch timings, fees, syllabus, or demo class..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Sending...' : 'Send Inquiry (ਸੁਨੇਹਾ ਭੇਜੋ)'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
