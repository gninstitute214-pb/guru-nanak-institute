const initialCourses = [
  {
    code: 'DCA-101',
    title: 'Diploma in Computer Applications (DCA)',
    category: 'Basics & Office',
    duration: '6 Months',
    fee: 6500,
    badge: 'Most Popular',
    eligibility: '10th / 12th Pass',
    description: 'A comprehensive foundational diploma covering computer fundamentals, Operating Systems, MS Office Suite, Internet & Email, and basic troubleshooting.',
    highlights: ['Computer Fundamentals', 'MS Word, Excel, PowerPoint', 'Internet & Typing Skills', 'Database Basics'],
    syllabus: [
      'Module 1: Computer Fundamentals & Windows OS',
      'Module 2: MS Word - Document Designing & Mail Merge',
      'Module 3: MS Excel - Formulas, Functions & Data Analysis',
      'Module 4: MS PowerPoint - Professional Presentations',
      'Module 5: Punjabi & English Typing Speed Practice',
      'Module 6: Internet, Email & Cyber Awareness'
    ]
  },
  {
    code: 'ADCA-201',
    title: 'Advanced Diploma in Computer Applications (ADCA)',
    category: 'Advanced Diploma',
    duration: '1 Year',
    fee: 12000,
    badge: 'Government Job Oriented',
    eligibility: '12th Pass / Graduate',
    description: 'An extensive 1-year career diploma covering office automation, financial accounting with Tally, graphic designing basics, and programming fundamentals.',
    highlights: ['Complete DCA Syllabus', 'Tally Prime with GST', 'Graphic Design (Photoshop & CorelDraw)', 'Web Designing Basics'],
    syllabus: [
      'Semester 1: Complete Office Automation & Advanced Excel',
      'Semester 2: Financial Accounting with Tally Prime & GST',
      'Semester 3: Graphic Designing with Adobe Photoshop & CorelDraw',
      'Semester 4: Web Concepts, HTML5, CSS3 & Project Work'
    ]
  },
  {
    code: 'WEB-301',
    title: 'Full Stack Web Development (MERN)',
    category: 'Programming',
    duration: '6 Months',
    fee: 18000,
    badge: 'High Career Demand',
    eligibility: 'Any Graduate / 12th Pass with basic logic skills',
    description: 'Master modern web development from scratch. Learn HTML, CSS, JavaScript, React.js, Node.js, Express.js, and MongoDB with hands-on live projects.',
    highlights: ['Frontend & Backend Mastery', 'REST APIs & JWT Auth', 'Live Project Deployment', 'Interview Preparation'],
    syllabus: [
      'Module 1: HTML5, CSS3, Tailwind CSS & Responsive Design',
      'Module 2: Modern JavaScript (ES6+)',
      'Module 3: React.js with Hooks & State Management',
      'Module 4: Node.js, Express.js & REST APIs',
      'Module 5: MongoDB & Mongoose Database Design',
      'Module 6: Capstone Real-World Full-Stack Project'
    ]
  },
  {
    code: 'PYTHON-401',
    title: 'Python Programming & AI Basics',
    category: 'Programming',
    duration: '3 Months',
    fee: 9000,
    badge: 'Trending',
    eligibility: '12th / BCA / B.Tech / Enthusiast',
    description: 'Learn Python programming language from core syntax to data manipulation, automation scripts, and an introduction to Machine Learning & Artificial Intelligence.',
    highlights: ['Core & Advanced Python', 'OOPs Concepts', 'Automation Scripts', 'Intro to NumPy & Pandas'],
    syllabus: [
      'Module 1: Python Basics & Control Structures',
      'Module 2: Functions, Modules & File Handling',
      'Module 3: Object-Oriented Programming (OOP)',
      'Module 4: Data Analysis with Pandas & Matplotlib',
      'Module 5: Final Practical Project & Case Studies'
    ]
  },
  {
    code: 'TALLY-501',
    title: 'Tally Prime with GST & Financial Accounting',
    category: 'Accounting',
    duration: '3 Months',
    fee: 5500,
    badge: 'Job Ready',
    eligibility: '10th / 12th / Commerce Students',
    description: 'Complete hands-on training on computerized accounting, voucher entry, inventory management, GST returns, e-Way bills, and TDS calculations.',
    highlights: ['Manual Accounting Concepts', 'Tally Prime Hands-on', 'GST & TDS Filings', 'Payroll Management'],
    syllabus: [
      'Module 1: Accounting Principles & Ledger Creation',
      'Module 2: Inventory & Stock Management in Tally',
      'Module 3: GST Invoicing, e-Way Bill & Tax Reports',
      'Module 4: Bank Reconciliation & Final Balance Sheets'
    ]
  },
  {
    code: 'GRAPHIC-601',
    title: 'Professional Graphic Designing',
    category: 'Design',
    duration: '4 Months',
    fee: 8500,
    badge: 'Creative Skills',
    eligibility: '10th / 12th / Anyone with creative mindset',
    description: 'Learn industry-standard creative tools: Adobe Photoshop, CorelDraw, and Illustrator. Create brochures, social media creatives, banners, and logos.',
    highlights: ['Photoshop Photo Retouching', 'CorelDraw Vector Art', 'Social Media Branding', 'Print Media Preparation'],
    syllabus: [
      'Module 1: Design Principles, Color Theory & Typography',
      'Module 2: Adobe Photoshop: Photo Editing, Banners & Posters',
      'Module 3: CorelDraw: Vector Logos, Visiting Cards & Flex Banners',
      'Module 4: Portfolio Development & Client Handling'
    ]
  }
];

const initialCertificates = [
  {
    certificateNo: 'APEX-2026-001',
    rollNo: '202601',
    studentName: 'Gurpreet Singh',
    fatherName: 'Harbhajan Singh',
    courseName: 'Diploma in Computer Applications (DCA)',
    duration: '6 Months',
    issueDate: '2026-03-15',
    grade: 'A+',
    percentage: 92,
    verificationStatus: 'Verified'
  },
  {
    certificateNo: 'APEX-2026-002',
    rollNo: '202602',
    studentName: 'Simranjeet Kaur',
    fatherName: 'Jaswant Singh',
    courseName: 'Tally Prime with GST & Financial Accounting',
    duration: '3 Months',
    issueDate: '2026-05-10',
    grade: 'A',
    percentage: 86,
    verificationStatus: 'Verified'
  },
  {
    certificateNo: 'APEX-2026-003',
    rollNo: '202603',
    studentName: 'Manpreet Sharma',
    fatherName: 'Ramesh Kumar',
    courseName: 'Full Stack Web Development (MERN)',
    duration: '6 Months',
    issueDate: '2026-08-20',
    grade: 'Distinction',
    percentage: 95,
    verificationStatus: 'Verified'
  }
];

const initialAdmissions = [
  {
    applicationId: 'APP-2026-101',
    fullName: 'Amandeep Singh',
    fatherName: 'Kulwinder Singh',
    email: 'amandeep@example.com',
    phone: '9876543211',
    dob: '2004-05-12',
    gender: 'Male',
    courseId: 'DCA-101',
    courseTitle: 'Diploma in Computer Applications (DCA)',
    qualification: '12th Pass',
    address: 'VPO Kartarpur',
    city: 'Jalandhar',
    status: 'Approved',
    notes: 'Document verified, batch assigned (Morning 9:00 AM)',
    createdAt: new Date().toISOString()
  },
  {
    applicationId: 'APP-2026-102',
    fullName: 'Navneet Kaur',
    fatherName: 'Jagjit Singh',
    email: 'navneet@example.com',
    phone: '9812345678',
    dob: '2005-08-22',
    gender: 'Female',
    courseId: 'WEB-301',
    courseTitle: 'Full Stack Web Development (MERN)',
    qualification: 'BCA 2nd Year',
    address: 'Model Town',
    city: 'Ludhiana',
    status: 'Pending',
    notes: 'Waiting for counseling session',
    createdAt: new Date().toISOString()
  }
];

const initialInquiries = [
  {
    id: 'inq-1',
    name: 'Rajinder Kumar',
    phone: '9872011223',
    email: 'rajinder@example.com',
    courseInterested: 'Tally Prime with GST & Financial Accounting',
    message: 'What is the batch timing for evening classes?',
    status: 'Contacted',
    createdAt: new Date().toISOString()
  },
  {
    id: 'inq-2',
    name: 'Pooja Rani',
    phone: '9855512345',
    email: 'pooja@example.com',
    courseInterested: 'Professional Graphic Designing',
    message: 'Can I do this course on weekends?',
    status: 'New',
    createdAt: new Date().toISOString()
  }
];

module.exports = {
  initialCourses,
  initialCertificates,
  initialAdmissions,
  initialInquiries
};
