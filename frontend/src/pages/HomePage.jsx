import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, BookOpen, Award, CheckCircle2, ShieldCheck, 
  Users, Laptop, Sparkles, ArrowRight, Phone, Search, FileCheck, Star, MapPin
} from 'lucide-react';
import { api } from '../services/api';
import CourseCard from '../components/CourseCard';

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [certInput, setCertInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.getCourses();
        if (res.success) {
          setCourses(res.data);
        }
      } catch (err) {
        console.error('Failed to load courses', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleQuickVerify = (e) => {
    e.preventDefault();
    if (certInput.trim()) {
      navigate(`/verify-certificate?id=${encodeURIComponent(certInput.trim())}`);
    }
  };

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-indigo-950 via-indigo-900 to-slate-900 text-white pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-800/80 border border-indigo-500/40 text-amber-300 text-xs sm:text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>ਗੁਰੂ ਨਾਨਕ ਇੰਸਟੀਚਿਊਟ ਆਫ ਕੰਪਿਊਟਰ ਐਜੂਕੇਸ਼ਨ, ਪਟਿਆਲਾ</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none mb-6">
              Advance Your Career With <br className="hidden sm:inline" />
              <span className="bg-linear-to-r from-amber-300 via-emerald-300 to-indigo-300 bg-clip-text text-transparent">
                Practical IT & Software Skills
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
              ਰਣਜੀਤ ਨਗਰ, ਸਿਓਣਾ ਰੋਡ, ਪਟਿਆਲਾ ਵਿਖੇ ਸਰਕਾਰੀ ਅਤੇ ਪ੍ਰਾਈਵੇਟ ਨੌਕਰੀਆਂ ਲਈ ਮਾਨਤਾ ਪ੍ਰਾਪਤ ਕੰਪਿਊਟਰ ਕੋਰਸ। 
              1:1 ਕੰਪਿਊਟਰ ਪ੍ਰੈਕਟੀਕਲ ਲੈਬਾਂ, ਤਜਰਬੇਕਾਰ ਅਧਿਆਪਕ ਅਤੇ 100% ਕਰੀਅਰ ਗਾਈਡੈਂਸ।
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/admission"
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold rounded-xl shadow-lg shadow-amber-400/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Online Admission Form (2026)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/courses"
                className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-indigo-300" />
                <span>Explore All Courses</span>
              </Link>
            </div>
          </div>

          {/* Quick Certificate Verification Search Box in Hero */}
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/20 shadow-2xl">
            <form onSubmit={handleQuickVerify} className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative w-full">
                <Search className="w-5 h-5 text-indigo-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={certInput}
                  onChange={(e) => setCertInput(e.target.value)}
                  placeholder="Enter Certificate No. (e.g. APEX-2026-001) or Roll No."
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shrink-0 transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify Now</span>
              </button>
            </form>
            <p className="text-center text-xs text-indigo-200/80 mt-2">
              Instant verification for students, employers, and government institutions.
            </p>
          </div>

          {/* Key Institute Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 max-w-5xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center backdrop-blur-xs">
              <div className="text-3xl font-extrabold text-amber-400 mb-1">100%</div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">Practical Computer Lab</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center backdrop-blur-xs">
              <div className="text-3xl font-extrabold text-emerald-400 mb-1">Patiala</div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">Seona Road Campus</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center backdrop-blur-xs">
              <div className="text-3xl font-extrabold text-sky-400 mb-1">1:1</div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">Personal PC per Student</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center backdrop-blur-xs">
              <div className="text-3xl font-extrabold text-indigo-400 mb-1">Verified</div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">Online Certificates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Popular Programs
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Career-Oriented Computer Courses
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Choose from basic computer diplomas to advanced programming and accounting.
            </p>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <span>View All Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="py-16 text-center text-slate-500 text-sm">Loading courses...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.slice(0, 6).map((course) => (
              <CourseCard key={course.code || course._id} course={course} />
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Our Institute */}
      <section className="bg-slate-100/80 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-white px-3 py-1 rounded-full border border-indigo-200 shadow-xs">
              Guru Nanak Institute, Patiala
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Why Students In Patiala Trust Us
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              We focus on practical hands-on experience, individual attention, and recognized certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Modern Air-Conditioned Labs</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Dedicated personal PC for every student, high-speed Wi-Fi, projector classrooms, and latest software versions.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Govt. & Private Job Recognized</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our certifications and diplomas are valid for Punjab state government clerical posts, banks, and private IT companies.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Experienced & Friendly Faculty</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Learn from certified instructors. Bilingual instruction in Punjabi & English with individual guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action enrollment card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase mb-2">
              <MapPin className="w-4 h-4" />
              <span>Ranjit Nagar, Seona Road, Patiala - 147001</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
              Ready to Learn at Guru Nanak Institute?
            </h2>
            <p className="text-sm sm:text-base text-indigo-100 max-w-xl">
              Limited seats for morning and evening batches. Call helpline <strong className="text-amber-300">7355687717</strong> or fill the quick admission form online.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <Link
              to="/admission"
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold rounded-xl text-center text-sm shadow-md transition-all"
            >
              Online Admission Form
            </Link>
            <a
              href="tel:7355687717"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-center text-sm border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Call 7355687717</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
