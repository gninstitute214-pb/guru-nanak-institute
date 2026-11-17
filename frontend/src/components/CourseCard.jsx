import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Award, BookCheck, ArrowRight, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export default function CourseCard({ course }) {
  const [showSyllabus, setShowSyllabus] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div className="p-6">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
            {course.category}
          </span>
          {course.badge && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/80 flex items-center gap-1">
              <Award className="w-3 h-3 text-amber-600" />
              {course.badge}
            </span>
          )}
        </div>

        {/* Title & Code */}
        <div className="mb-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{course.code}</span>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
            {course.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">
          {course.description}
        </p>

        {/* Highlights */}
        {course.highlights && course.highlights.length > 0 && (
          <div className="space-y-1.5 mb-5 pt-3 border-t border-slate-100">
            {course.highlights.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

        {/* Syllabus accordion */}
        {course.syllabus && course.syllabus.length > 0 && (
          <div className="mb-4">
            <button
              onClick={() => setShowSyllabus(!showSyllabus)}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
            >
              <span>{showSyllabus ? 'Hide Detailed Modules' : 'View Detailed Modules'}</span>
              {showSyllabus ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showSyllabus && (
              <ul className="mt-3 p-3 bg-slate-50 rounded-xl space-y-1.5 border border-slate-200/60 text-xs text-slate-700 animate-fadeIn">
                {course.syllabus.map((syl, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                    <span>{syl}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Footer Info & Buttons */}
      <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{course.duration}</span>
          </div>
          <div className="text-base font-extrabold text-slate-900 mt-0.5">
            ₹{Number(course.fee).toLocaleString('en-IN')}
          </div>
        </div>

        <Link
          to={`/admission?course=${encodeURIComponent(course.code)}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all active:scale-95"
        >
          <span>Enroll Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
