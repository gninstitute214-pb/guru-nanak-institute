import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { GraduationCap, Lock, Mail, AlertCircle, ArrowRight, Eye, EyeOff, KeyRound, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Forgot Password Flow State
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [recoveryMethod, setRecoveryMethod] = useState('email'); // 'email' | 'phone'
  const [forgotStep, setForgotStep] = useState(1); // 1: enter email, 2: enter OTP & new password
  const [forgotEmail, setForgotEmail] = useState('');
  const [recoveryPhone, setRecoveryPhone] = useState('7355687717');
  const [otp, setOtp] = useState('');
  const [serverOtp, setServerOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate('/admin/dashboard');
      } else {
        setError(res.message || 'Invalid credentials');
      }
    } catch {
      setError('Connection failed. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    setForgotLoading(true);

    try {
      const res = await api.forgotPassword(forgotEmail);
      if (res.success) {
        setForgotSuccess(res.message);
        if (res.otpCode) {
          setServerOtp(res.otpCode);
          setOtp(res.otpCode);
        }
        setForgotStep(2);
      } else {
        setForgotError(res.message || 'Could not send verification code.');
      }
    } catch {
      setForgotError('Network error. Please try again.');
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    setForgotLoading(true);

    try {
      const res = await api.resetPassword(forgotEmail, otp, newPassword);
      if (res.success) {
        setForgotSuccess(res.message);
        setTimeout(() => {
          setIsForgotMode(false);
          setForgotStep(1);
          setEmail(forgotEmail);
          setPassword('');
          setError('');
        }, 2000);
      } else {
        setForgotError(res.message || 'Invalid verification code.');
      }
    } catch {
      setForgotError('Network error. Please try again.');
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetWithPhone = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    setForgotLoading(true);

    try {
      const res = await api.resetWithPhone(recoveryPhone, newPassword);
      if (res.success) {
        setForgotSuccess(res.message);
        setTimeout(() => {
          setIsForgotMode(false);
          setForgotStep(1);
          setEmail('gninstitute214@gmail.com');
          setPassword('');
          setError('');
        }, 2000);
      } else {
        setForgotError(res.message || 'Mobile verification failed.');
      }
    } catch {
      setForgotError('Network error. Please try again.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-indigo-950 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md">
            <GraduationCap className="w-8 h-8 text-amber-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Guru Nanak Institute Portal</h2>
          <p className="text-xs text-slate-500 mt-1">
            {isForgotMode ? 'Secure Password Recovery with Email OTP' : 'Administrative Login for Faculty & Staff'}
          </p>
        </div>

        {/* FORGOT PASSWORD VIEW */}
        {isForgotMode ? (
          <div className="space-y-4">
            {/* Method Tabs */}
            <div className="flex border-b border-slate-200 mb-2">
              <button
                type="button"
                onClick={() => { setRecoveryMethod('email'); setForgotError(''); setForgotSuccess(''); }}
                className={`flex-1 pb-2 text-xs font-bold text-center transition-all ${recoveryMethod === 'email' ? 'border-b-2 border-indigo-600 text-indigo-700' : 'text-slate-400 hover:text-slate-600'}`}
              >
                1. ਈਮੇਲ OTP ਰਾਹੀਂ (Email)
              </button>
              <button
                type="button"
                onClick={() => { setRecoveryMethod('phone'); setForgotError(''); setForgotSuccess(''); }}
                className={`flex-1 pb-2 text-xs font-bold text-center transition-all ${recoveryMethod === 'phone' ? 'border-b-2 border-indigo-600 text-indigo-700' : 'text-slate-400 hover:text-slate-600'}`}
              >
                2. ਰਜਿਸਟਰਡ ਮੋਬਾਈਲ ਰਾਹੀਂ (Mobile)
              </button>
            </div>

            {forgotSuccess && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{forgotSuccess}</span>
              </div>
            )}

            {forgotError && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{forgotError}</span>
              </div>
            )}

            {recoveryMethod === 'email' ? (
              forgotStep === 1 ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Registered Admin Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="e.g. gninstitute214@gmail.com"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1.5">
                      Enter registered administrator email: <strong>gninstitute214@gmail.com</strong>
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full py-3 bg-indigo-950 hover:bg-indigo-900 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>{forgotLoading ? 'Sending...' : 'Request Verification OTP (ਕੋਡ ਪ੍ਰਾਪਤ ਕਰੋ)'}</span>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  {serverOtp && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                      <div className="font-semibold mb-1">
                        Your Verification Code: <span className="font-mono text-base font-extrabold text-indigo-950 bg-white px-2.5 py-0.5 rounded-md border border-amber-300 ml-1 shadow-xs">{serverOtp}</span>
                      </div>
                      <div className="text-[11px] text-amber-700">
                        (Live Gmail SMTP is pending setup on server; temporary code is provided so you can reset immediately).
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Enter 6-Digit OTP Code</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="Enter 6-digit code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-center text-lg font-mono tracking-widest font-bold text-indigo-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">New Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        placeholder="Minimum 6 characters"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{forgotLoading ? 'Updating Password...' : 'Save New Password (ਪਾਸਵਰਡ ਬਦਲੋ)'}</span>
                  </button>
                </form>
              )
            ) : (
              /* MOBILE RECOVERY FORM */
              <form onSubmit={handleResetWithPhone} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Institute Registered Mobile Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 7355687717"
                    value={recoveryPhone}
                    onChange={(e) => setRecoveryPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Enter the authorized mobile number registered with the institute.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">New Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      placeholder="Minimum 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full py-3 bg-indigo-950 hover:bg-indigo-900 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{forgotLoading ? 'Verifying...' : 'Verify Mobile & Reset Password'}</span>
                </button>
              </form>
            )}

            <button
              onClick={() => { setIsForgotMode(false); setForgotStep(1); setForgotError(''); setForgotSuccess(''); setServerOtp(''); }}
              className="w-full text-center text-xs text-indigo-600 hover:underline flex items-center justify-center gap-1.5 pt-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Staff Login</span>
            </button>
          </div>
        ) : (
          /* STANDARD LOGIN VIEW */
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => { setIsForgotMode(true); setForgotEmail(email); }}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-950 hover:bg-indigo-900 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <Link to="/" className="text-xs text-indigo-600 hover:underline">
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
