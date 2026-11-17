import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import CertificateCard from '../components/CertificateCard';
import { ShieldCheck, Search, AlertCircle, Award, CheckCircle2 } from 'lucide-react';

export default function VerificationPage() {
  const [searchParams] = useSearchParams();
  const queryId = searchParams.get('id') || '';

  const [inputVal, setInputVal] = useState(queryId);
  const [loading, setLoading] = useState(false);
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (queryId) {
      handleSearch(queryId);
    }
  }, [queryId]);

  const handleSearch = async (targetId) => {
    const idToSearch = (targetId || inputVal).trim();
    if (!idToSearch) {
      setError('Please enter a Certificate Number or Roll Number.');
      return;
    }

    setLoading(true);
    setError('');
    setCertificate(null);
    setSearched(true);

    try {
      const res = await api.verifyCertificate(idToSearch);
      if (res.success) {
        setCertificate(res.data);
      } else {
        setError(res.message || 'No record found with this Certificate No. or Roll No.');
      }
    } catch (err) {
      setError('Could not verify credential. Please check the network or server.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch(inputVal);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 no-print">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold mb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Official Verification Registry</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Student Certificate Verification
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          ਵਿਦਿਆਰਥੀ ਦਾ ਸਰਟੀਫਿਕੇਟ ਜਾਂ ਰੋਲ ਨੰਬਰ ਭਰ ਕੇ ਅਸਲੀਅਤ ਦੀ ਜਾਂਚ ਕਰੋ। 
          (Verify diploma authenticity for government and private employers).
        </p>
      </div>

      {/* Search Box */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-3xl border border-slate-200 shadow-md mb-10 no-print">
        <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="e.g. APEX-2026-001 or Roll No 202601"
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500 uppercase"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-sm transition-all shadow-md shrink-0 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{loading ? 'Checking...' : 'Verify Credential'}</span>
          </button>
        </form>

        {/* Demo Try Pills */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="font-semibold text-slate-700">Quick Test Samples:</span>
          {['APEX-2026-001', 'APEX-2026-002', 'APEX-2026-003', '202601'].map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => {
                setInputVal(sample);
                handleSearch(sample);
              }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-indigo-700 font-mono font-medium rounded-lg transition-colors border border-slate-200/60"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* Result Area */}
      {error && (
        <div className="max-w-2xl mx-auto p-5 bg-rose-50 border border-rose-200 rounded-2xl text-center text-rose-800 space-y-2 mb-8 animate-fadeIn">
          <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
          <h4 className="font-bold text-sm">Certificate Verification Failed</h4>
          <p className="text-xs">{error}</p>
        </div>
      )}

      {certificate && (
        <div className="animate-fadeIn">
          <CertificateCard cert={certificate} />
        </div>
      )}

      {!searched && !certificate && (
        <div className="max-w-2xl mx-auto text-center py-10 bg-slate-50/70 rounded-3xl border border-dashed border-slate-200 p-8">
          <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-700 text-sm">ISO Certified & Tamper-Proof Digital Verification</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
            Every diploma and certificate issued by Apex Computer Education has a unique serial number registered in our cloud database for lifelong verification.
          </p>
        </div>
      )}
    </div>
  );
}
