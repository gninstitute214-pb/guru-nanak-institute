import React from 'react';
import { Camera, Laptop, Award, Users, Sparkles } from 'lucide-react';

export default function GalleryPage() {
  const galleryItems = [
    {
      title: 'Advanced Computer Lab 1',
      category: 'Lab Infrastructure',
      description: 'High-speed Core i5/i7 workstations with dual monitors and gigabit LAN connectivity.',
      gradient: 'from-blue-600 to-indigo-800'
    },
    {
      title: 'Practical Coding & Web Dev Batch',
      category: 'Classroom Training',
      description: 'Students working live on React.js and Python web applications with instructor guidance.',
      gradient: 'from-indigo-600 to-purple-800'
    },
    {
      title: 'Annual Certificate Distribution Ceremony',
      category: 'Student Achievements',
      description: 'Awarding government recognized diplomas to our DCA & ADCA batches.',
      gradient: 'from-amber-600 to-rose-700'
    },
    {
      title: 'Tally Prime & GST Accounting Workshop',
      category: 'Workshops',
      description: 'Live billing, e-Way bills, and GST calculation training with real business vouchers.',
      gradient: 'from-emerald-600 to-teal-800'
    },
    {
      title: 'Graphic Designing & Creative Studio',
      category: 'Creative Labs',
      description: 'Photoshop, CorelDraw, and digital advertising creation projects by creative batch.',
      gradient: 'from-pink-600 to-rose-800'
    },
    {
      title: 'Typing Test & Speed Certification Hall',
      category: 'Typing Lab',
      description: 'English & Punjabi (Raavi font) typing tests conducted for Punjab Govt job aspirants.',
      gradient: 'from-slate-700 to-slate-900'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          Campus Life & Facilities
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
          Institute Lab & Activity Gallery
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          ਇੰਸਟੀਚਿਊਟ ਦੇ ਕੰਪਿਊਟਰ ਲੈਬਾਂ, ਵਿਦਿਆਰਥੀਆਂ ਦੇ ਪ੍ਰੈਕਟੀਕਲ ਸੈਸ਼ਨਾਂ ਅਤੇ ਸਮਾਗਮਾਂ ਦੀਆਂ ਝਲਕੀਆਂ।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryItems.map((item, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Visual Card Top */}
            <div className={`h-48 bg-linear-to-tr ${item.gradient} p-6 flex flex-col justify-between text-white relative overflow-hidden`}>
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold">
                  {item.category}
                </span>
                <Camera className="w-5 h-5 text-white/80" />
              </div>
              <div>
                <Sparkles className="w-8 h-8 text-amber-300 opacity-70 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold tracking-tight text-white">{item.title}</h3>
              </div>
            </div>

            {/* Info Body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-600 font-semibold">
                <span>Apex Computer Center Campus</span>
                <span className="text-slate-400">Verified Center</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
