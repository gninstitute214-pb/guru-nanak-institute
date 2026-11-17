import React from 'react';
import { Award, CheckCircle2, ShieldCheck, Printer, Calendar, FileText } from 'lucide-react';

export default function CertificateCard({ cert }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Action Bar */}
      <div className="flex justify-between items-center mb-4 no-print">
        <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Official Verified Credential #{cert.certificateNo}</span>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Official Certificate Canvas */}
      <div className="relative bg-white border-8 border-double border-amber-600/60 rounded-3xl p-8 sm:p-12 shadow-xl text-slate-800 overflow-hidden">
        {/* Background Seal Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-4 pointer-events-none">
          <Award className="w-96 h-96 text-indigo-900" />
        </div>

        {/* Header */}
        <div className="text-center pb-6 border-b-2 border-amber-500/30">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-tr from-amber-500 to-indigo-700 text-white mb-2 shadow-md">
            <Award className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-wide text-slate-900 uppercase">
            Guru Nanak Institute of Computer Education
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium tracking-wider uppercase mt-1">
            Ranjit Nagar, Seona Road, Patiala -147001, Punjab | ISO 9001:2015 Certified
          </p>
          <div className="mt-3 inline-block bg-amber-50 border border-amber-200 text-amber-900 text-xs font-serif font-bold uppercase tracking-widest px-4 py-1 rounded-full">
            Certificate of Completion & Merit
          </div>
        </div>

        {/* Body Text */}
        <div className="my-8 text-center space-y-4">
          <p className="text-xs sm:text-sm text-slate-500 font-serif italic">This is to officially certify that</p>
          
          <h1 className="text-2xl sm:text-4xl font-serif font-extrabold text-indigo-950 tracking-wide underline decoration-amber-400 decoration-2 underline-offset-8">
            {cert.studentName}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 font-serif">
            Son / Daughter of <span className="font-semibold text-slate-900">{cert.fatherName || 'Guardian'}</span>
          </p>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            has successfully completed the prescribed course of study and practical training in
          </p>

          <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl max-w-lg mx-auto">
            <h3 className="text-lg sm:text-xl font-bold text-indigo-900 font-serif">
              {cert.courseName}
            </h3>
            <p className="text-xs text-indigo-600 font-medium mt-0.5">Duration: {cert.duration}</p>
          </div>

          <p className="text-xs sm:text-sm text-slate-600">
            and was evaluated with Grade <span className="font-extrabold text-indigo-900 px-2 py-0.5 bg-indigo-100 rounded text-sm">{cert.grade}</span> ({cert.percentage}% Marks).
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs my-6 text-center">
          <div>
            <span className="text-slate-400 block font-medium">Certificate No.</span>
            <span className="font-bold text-slate-900 font-mono">{cert.certificateNo}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Roll Number</span>
            <span className="font-bold text-slate-900 font-mono">{cert.rollNo}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Issue Date</span>
            <span className="font-bold text-slate-900">{cert.issueDate}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Status</span>
            <span className="font-bold text-emerald-600 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified
            </span>
          </div>
        </div>

        {/* Signatures & Seal */}
        <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-xs">
          <div className="text-center">
            <div className="font-serif italic text-slate-600 font-bold text-sm mb-1">Controller of Exams</div>
            <div className="w-32 border-b border-slate-400"></div>
            <span className="text-slate-400 text-[10px]">Academic Evaluation</span>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-amber-600/80 mx-auto flex items-center justify-center text-[8px] font-bold text-amber-800 uppercase tracking-tighter bg-amber-50 text-center leading-tight">
              GURU NANAK<br/>INSTITUTE<br/>SEAL
            </div>
          </div>

          <div className="text-center">
            <div className="font-serif italic text-slate-800 font-bold text-sm mb-1">Director</div>
            <div className="w-32 border-b border-slate-400"></div>
            <span className="text-slate-400 text-[10px]">Guru Nanak Education Council</span>
          </div>
        </div>
      </div>
    </div>
  );
}
