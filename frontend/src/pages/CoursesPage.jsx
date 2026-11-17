import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import CourseCard from '../components/CourseCard';
import { Search, BookOpen, Filter } from 'lucide-react';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.getCourses();
        if (res.success) {
          setCourses(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const categories = ['All', 'Basics & Office', 'Advanced Diploma', 'Programming', 'Accounting', 'Design'];

  const filteredCourses = courses.filter((c) => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch = 
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          Academic Catalog
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
          Explore Our Computer Training Courses
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2">
          From beginner computer literacy to professional programming and accounting certifications.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or code (e.g. DCA, Tally, Python)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center text-xs text-slate-500 mb-6 px-1">
        <span>Showing {filteredCourses.length} course(s)</span>
        {selectedCategory !== 'All' && <span>Category: <strong>{selectedCategory}</strong></span>}
      </div>

      {/* Course Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">Loading courses...</div>
      ) : filteredCourses.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-700">No courses found matching your criteria</h3>
          <p className="text-xs text-slate-500 mt-1">Try searching for something else or reset your filter.</p>
          <button
            onClick={() => { setSearch(''); setSelectedCategory('All'); }}
            className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-semibold hover:bg-indigo-100"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.code || course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
