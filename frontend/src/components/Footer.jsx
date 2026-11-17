import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Phone, Mail, Clock, CheckCircle2, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Institute About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight uppercase">GURU NANAK INSTITUTE</span>
            </div>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Guru Nanak Institute of Computer Education, Patiala offers high-quality practical computer education, software skills, accounting, and recognized certifications for bright career opportunities.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-lg w-fit">
              <Award className="w-4 h-4" />
              <span>Certified Computer Center</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/courses" className="hover:text-indigo-400 transition-colors">Computer Courses & Syllabus</Link>
              </li>
              <li>
                <Link to="/admission" className="hover:text-indigo-400 transition-colors">Online Student Admission</Link>
              </li>
              <li>
                <Link to="/verify-certificate" className="hover:text-indigo-400 transition-colors">Certificate Verification Portal</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-indigo-400 transition-colors">Computer Lab Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-400 transition-colors">Student Inquiries & Help</Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-indigo-400 transition-colors">Staff Portal (Admin)</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Programs */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Top Programs</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>DCA (6 Months Diploma)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>ADCA (1 Year Advanced Diploma)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Tally Prime with GST & TDS</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Full-Stack Web Development</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Python Programming & AI Basics</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Graphic Designing & Photoshop</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Patiala Campus</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 mt-1 shrink-0" />
                <span>Ranjit Nagar, Seona Road, Patiala -147001, Punjab</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href="tel:7355687717" className="hover:text-amber-300">7355687717</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href="mailto:gninstitute214@gmail.com" className="hover:text-amber-300">gninstitute214@gmail.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Mon - Sat: 8:00 AM – 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Guru Nanak Institute of Computer Education. All Rights Reserved.</p>
          <p className="text-slate-400">
            ਪਟਿਆਲਾ ਦੇ ਵਿਦਿਆਰਥੀਆਂ ਦੇ ਸੁਨਹਿਰੇ ਭਵਿੱਖ ਲਈ ਵਚਨਬੱਧ (Committed to a bright career in Patiala)
          </p>
        </div>
      </div>
    </footer>
  );
}
