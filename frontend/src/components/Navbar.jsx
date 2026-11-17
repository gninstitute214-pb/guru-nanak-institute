import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Award, BookOpen, GraduationCap, Phone, Menu, X, ShieldCheck, LogIn, LogOut, LayoutDashboard, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Online Admission', path: '/admission', highlight: true },
    { name: 'Verify Certificate', path: '/verify-certificate' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Notification Bar */}
      <div className="bg-indigo-950 text-slate-100 text-xs sm:text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Admissions Open (2026) | Ranjit Nagar, Seona Road, Patiala</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs">
            <a href="tel:7355687717" className="flex items-center gap-1 hover:text-amber-300 transition-colors">
              <Phone className="w-3.5 h-3.5 text-indigo-300" />
              <span>Helpline: 7355687717</span>
            </a>
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>Patiala, Punjab</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-linear-to-tr from-indigo-700 via-indigo-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 uppercase">GURU NANAK</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">INSTITUTE</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Institute of Computer Education, Patiala</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                    : link.highlight
                    ? 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100 font-semibold border border-indigo-200/80'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action / Admin Button */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs"
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                  Admin Portal
                </Link>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 border border-slate-200 hover:border-indigo-300 rounded-lg transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                Staff Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-base font-medium ${
                isActive(link.path)
                  ? 'text-indigo-600 bg-indigo-50 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="tel:7355687717"
              className="flex items-center justify-center gap-2 py-2.5 bg-indigo-50 text-indigo-700 font-bold rounded-lg text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call: 7355687717</span>
            </a>
            {isAuthenticated ? (
              <>
                <Link
                  to="/admin/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2.5 bg-slate-900 text-white rounded-lg font-medium text-sm"
                >
                  Admin Dashboard
                </Link>
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="w-full text-center py-2 text-rose-600 text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/admin/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium text-sm"
              >
                Staff Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
