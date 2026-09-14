import { ClarifiedNotice } from '../types';

export const INITIAL_SAMPLE_NOTICES: ClarifiedNotice[] = [
  {
    id: 'notice-doc-verification',
    title: 'Mandatory Physical Document Verification & Biometric Enrollment',
    department: 'Office of Dean (Academic Affairs) & Registrar',
    category: 'academic',
    sourceType: 'circular',
    datePosted: 'Today, 09:30 AM',
    urgency: 'CRITICAL',
    deadline: 'Sept 18, 2026 • 4:00 PM',
    isDeadlineStrict: true,
    tldr: 'All newly admitted 1st year B.Tech students must physically appear at the Admin Block to get original certificates stamped and register biometrics. If missed, provisional admission roll number will be put on hold.',
    whoNeedsToAct: {
      appliesTo: 'All 1st Year B.Tech Students admitted in 2026-27 session (CSE, ECE, IT, Mechanical)',
      exempt: '2nd/3rd/4th Year students, Lateral Entry (schedule issued separately), and M.Tech candidates',
      matchVerdict: 'MUST_ACT',
    },
    actionSteps: [
      {
        order: 1,
        title: 'Prepare Transparent Folder with Originals & 2 Self-Attested Sets',
        description: 'Arrange Class 10th & 12th marksheets, Migration/TC, Medical Fitness, Anti-Ragging affidavit ref number, and 4 passport size photos in a single transparent document sleeve.',
        location: 'Before leaving hostel/home',
        itemsToBring: ['Original 10th & 12th Certificates', '2 photocopies of each (self-attested)', '4 Passport-size photos', 'Allotment Letter'],
      },
      {
        order: 2,
        title: 'Visit Document Scrutiny Counter #3',
        description: 'Get physical file verified by department verification officer. Collect verification token slip.',
        location: 'Admin Block, Ground Floor, Room 104',
        itemsToBring: ['Verification Token Slip', 'Original ID proof (Aadhaar / Voter ID)'],
      },
      {
        order: 3,
        title: 'Complete Biometric Fingerprint & ID Card Photo Capture',
        description: 'Submit your signed token slip at the IT Centre booth in Room 108 to enroll fingerprint for library turnstiles and hostel gates.',
        location: 'Admin Block Room 108 (Computer Centre Wing)',
        itemsToBring: ['Signed Verification Slip from Counter 3'],
      },
      {
        order: 4,
        title: 'Safekeep the "Provisional Acknowledgment Slip"',
        description: 'Do not lose this receipt. You will need to show this slip to collect your permanent Student Smart Card in October.',
        location: 'Your document folder',
        itemsToBring: ['Provisional Receipt'],
      },
    ],
    jargonDecoded: [
      {
        term: 'Self-Attestation',
        explanation: 'Writing "Self Attested" followed by your signature and today\'s date on the bottom margin of every single photocopy.',
      },
      {
        term: 'Provisional Admission',
        explanation: 'Your college seat is currently conditional until the university verifies that your original 12th marksheets and eligibility criteria match official board records.',
      },
      {
        term: 'Anti-Ragging Reference ID',
        explanation: 'The 10-digit registration number you received via email/SMS after submitting the mandatory online undertaking at antiragging.in.',
      },
      {
        term: 'Migration vs Transfer Certificate (TC)',
        explanation: 'TC is issued by your school showing you left. Migration Certificate is issued by the exam board (CBSE/ICSE/State Board) permitting you to join a university.',
      },
    ],
    consequencesIfMissed: 'Late fine of ₹500/day after September 18th, and your provisional student roll number will be flagged as "Non-Verified", withholding mid-semester exam admit card.',
    contactOrOffice: 'Academic Section Desk #3 (Mon-Fri 10:00 AM - 1:30 PM & 2:30 PM - 4:00 PM)',
    whatsappSummary: `🚨 *URGENT NOTICE FOR 1ST YEARS: Document Verification & Biometrics*
📅 *Deadline:* Friday, Sept 18 (4:00 PM)
📍 *Venue:* Admin Block Room 104 (Counter 3)
📄 *What to carry:*
• Original 10th & 12th marksheets + 2 self-attested photocopies
• 4 passport photos + Allotment letter + Anti-ragging ref ID
⚠️ *Warning:* Mandatory for all 1st yrs! If missed, ERP roll numbers will be put on hold. Go during your department slots (10 AM - 1:30 PM).`,
    rawContent: `OFFICE OF THE DEAN (ACADEMIC AFFAIRS)
Ref. No. ACAD/2026/F-DOC/891
CIRCULAR

Subject: Schedule and Guidelines for Physical Scrutiny of Qualifying Credentials and Biometric Capturing for Newly Admitted Under-Graduate Cohort (2026-2030).

Pursuant to the directions of the Competent Authority, all candidates admitted provisionally into B.Tech programmes via Centralised/Institutional Counselling for the Academic Session 2026-2027 are hereby enjoined to present themselves in persona for mandatory physical authentication of their original certificates and simultaneous capture of biometric attributes.

The schedule shall be strictly adhered to as per branch allocations indicated hereinunder:
- Computer Science & Engg / AI: 16th & 17th Sept 2026 (1000 hrs to 1600 hrs)
- Electronics & Comm / IT: 17th & 18th Sept 2026 (1000 hrs to 1600 hrs)

Candidates must produce in original along with two duad sets of self-attested photocopies:
1. Secondary School Board (10th) Certificate indicative of Date of Birth.
2. Senior Secondary Certificate (12th) Mark statement.
3. Category / Sub-Category certificate issued by designated revenue authority (wherever applicable).
4. Migration Certificate / School Leaving Certificate.
5. Anti-Ragging Undertaking Reference Slip obtained via national portal.
6. Four (04) recent passport size photographs.

Default in physical attendance within the stipulated timeline shall lead to forfeiture of provisional seat and imposition of daily penal charges as per Ordinance 4(b).

Sd/-
Registrar & Controller of Academic Operations`,
    tags: ['Verification', 'B.Tech 1st Year', 'Mandatory', 'Admin Block'],
    userCompletedSteps: [1],
  },
  {
    id: 'notice-scholarship-dsw',
    title: 'Merit-cum-Means & National Post-Matric Scholarship Undertaking',
    department: 'Dean Student Welfare (DSW) Office',
    category: 'scholarships',
    sourceType: 'circular',
    datePosted: 'Yesterday, 03:15 PM',
    urgency: 'IMPORTANT',
    deadline: 'Sept 25, 2026 • 5:00 PM',
    isDeadlineStrict: true,
    tldr: 'Eligible freshers applying for government post-matric scholarships must verify their National Scholarship Portal (NSP) application at DSW Counter 4 with income certificates and an active Aadhaar-linked bank account.',
    whoNeedsToAct: {
      appliesTo: 'Students with annual parental income below specified slab (< ₹2.5L / ₹8L) who have submitted online forms on NSP or State e-District portal',
      exempt: 'Students who are not applying for government financial aid or scholarship schemes',
      matchVerdict: 'OPTIONAL',
    },
    actionSteps: [
      {
        order: 1,
        title: 'Check Aadhaar Seeding on NPCI Portal',
        description: 'Ensure your primary savings bank account has NPCI Aadhaar-mapping active, otherwise DBT scholarship funds will automatically bounce.',
        location: 'Online (Check via your bank mobile app or uidai.gov.in)',
        itemsToBring: ['Aadhaar Number', 'Bank Account Passbook'],
      },
      {
        order: 2,
        title: 'Print NSP / State Portal Application Form',
        description: 'Download the finalized submitted PDF from the portal. Do not bring draft versions.',
        location: 'Campus Cyber Cafe / Library Printers',
        itemsToBring: ['NSP Application Printout', 'Income Certificate issued after April 1, 2026'],
      },
      {
        order: 3,
        title: 'Submit Physical Dossier to DSW Office',
        description: 'Get application verified and signed by scholarship nodal officer at DSW counter.',
        location: 'Student Activity Centre (SAC), 1st Floor, Room 202',
        itemsToBring: ['Signed Undertaking Form', 'Income Affidavit from Tehsildar', 'Fee Receipt Copy'],
      },
    ],
    jargonDecoded: [
      {
        term: 'DSW (Dean Student Welfare)',
        explanation: 'The university office handling all student welfare affairs, hostel allotments, scholarships, clubs, and medical dispensaries.',
      },
      {
        term: 'NPCI / DBT Seeding',
        explanation: 'Direct Benefit Transfer link. Just giving your account number isn\'t enough; your bank branch must link your Aadhaar on the national clearinghouse server to receive government grants.',
      },
      {
        term: 'Tehsildar Income Certificate',
        explanation: 'Official government revenue document proving annual family income. Salary slips from private employers are not accepted by government portals.',
      },
    ],
    consequencesIfMissed: 'Institute nodal officer will not approve your profile on the NSP portal, resulting in automatic rejection of your scholarship grant for this academic year.',
    contactOrOffice: 'DSW Scholarship Section, SAC Building Room 202 (2:00 PM - 4:30 PM)',
    whatsappSummary: `💰 *Scholarship Verification Alert for 1st Years (NSP / State Portal)*
📅 *Last Date to Submit Physical Form:* Sept 25 (5 PM)
📍 *Counter:* DSW Office (SAC 1st floor, Room 202)
📌 *Required:* NSP printed application, Valid income certificate (<₹2.5L/8L), Fee receipt, Bank passbook with Aadhaar-DBT linked.
💡 *Note:* Only applies to students seeking financial aid/scholarships.`,
    rawContent: `OFFICE OF THE DEAN STUDENT WELFARE (DSW)
NOTIFICATION NO. DSW/SCH/2026/044

Subject: Institutional Level Scrutiny & Forwarding of Applications on National Scholarship Portal (NSP) and State e-District Portals for AY 2026-27.

All eligible first-year students belonging to SC/ST/OBC/Minority/EWS categories and general merit-cum-means applicants who have successfully uploaded their particulars on the NSP or respective State portals are hereby instructed to submit a hard-bound compilation of their supporting records for physical biometric validation and institute endorsement.

Mandatory enclosures:
1. Hardcopy of online submitted application duly authenticated.
2. Income Certificate issued by an officer not below the rank of Revenue Tehsildar / Sub-Divisional Magistrate (dated on or after 01.04.2026).
3. Self-declaration affidavit on non-judicial stamp paper of ₹10/- affirming non-receipt of duplicate fellowship.
4. Mandate form reflecting active Aadhaar-seeding status on National Payments Corporation of India (NPCI) gateway.

Deficient dossiers or failure to submit prior to the cut-off date (25th September 2026, 1700 hrs) shall preclude institutional verification, and the responsibility of forfeiture of financial disbursement shall rest entirely with the applicant.

DSW Nodal Cell`,
    tags: ['Scholarships', 'DSW', 'Financial Aid', 'NSP'],
    userCompletedSteps: [],
  },
  {
    id: 'notice-hostel-mess',
    title: 'Hostel Gate Timings, Biometric Cut-Off & Mess Rebate Policy',
    department: 'Office of the Chief Warden',
    category: 'hostel',
    sourceType: 'circular',
    datePosted: '2 days ago',
    urgency: 'IMPORTANT',
    deadline: 'Effective Immediately • Daily 9:30 PM',
    isDeadlineStrict: true,
    tldr: 'Hostel in-time is strictly 9:30 PM with mandatory biometric punch. For weekend night-outs, parent consent email is required 48 hours prior. Mess rebate requires 4 consecutive days absence booked on the hostel portal.',
    whoNeedsToAct: {
      appliesTo: 'All resident hostelers in Boys & Girls campus dormitories',
      exempt: 'Day Scholars (students residing off-campus with family)',
      matchVerdict: 'MUST_ACT',
    },
    actionSteps: [
      {
        order: 1,
        title: 'Check Your Hostel In-Time (9:30 PM)',
        description: 'Ensure you swipe your fingerprint at the hostel turnstile before 9:30 PM daily. A 15-minute grace period exists for library night-pass holders.',
        location: 'Hostel Main Entrance Security Booth',
        itemsToBring: ['Campus ID Card', 'Fingerprint Scan'],
      },
      {
        order: 2,
        title: 'Apply for Night-Out Pass 48 Hours in Advance',
        description: 'Going home for the weekend? Have your registered parent send an email to warden@campus.edu or apply on the hostel ERP portal by Thursday noon.',
        location: 'Hostel ERP Portal (hostel.campus.edu)',
        itemsToBring: ['Parent Registered Mobile/Email Confirmation'],
      },
      {
        order: 3,
        title: 'Apply for Mess Rebate for Leaves ≥ 4 Days',
        description: 'If you will be away for 4 or more consecutive days, file mess leave beforehand to get ₹120/day refunded on your end-semester mess bill.',
        location: 'Mess Manager Desk (Hostel Dining Hall)',
        itemsToBring: ['Sanctioned Out-Pass copy'],
      },
    ],
    jargonDecoded: [
      {
        term: 'Mess Rebate',
        explanation: 'A deduction in your monthly food bill when you go home for festivals/vacations. You must inform the mess manager 2 days before leaving, minimum 4 days leave required.',
      },
      {
        term: 'Night-Out Gate Pass',
        explanation: 'Official permission slip permitting you to stay outside the hostel overnight. Without this, security guards will flag you as an unauthorized absence.',
      },
      {
        term: 'Library Night Pass',
        explanation: 'A special sticker on your ID card issued by Chief Librarian allowing extended entry until 11:30 PM during exam months.',
      },
    ],
    consequencesIfMissed: 'Late entry after 9:30 PM incurs a warning notice; 3 late entries trigger an automated SMS to parents and suspension of gate pass privileges.',
    contactOrOffice: 'Hostel Caretaker Office (6:00 PM - 9:30 PM) / Chief Warden Office',
    whatsappSummary: `🏠 *ATTN HOSTELERS: Gate Timings & Out-Pass Rules*
⏰ *Curfew:* 9:30 PM sharp (biometric punch at gate)
🧳 *Weekend Leave:* Need parent email 48h before on hostel portal
🍽️ *Mess Rebate:* Minimum 4 days leave needed to get mess fee deduction!
💡 *Day Scholars:* Please ignore, hostelers only.`,
    rawContent: `CHIEF WARDEN OFFICE - HOSTEL AFFAIRS
CIRCULAR / HOSTEL / RULES / 2026-03

Subject: Strict Enforcement of Residential Norms, Biometric Attendance, and Mess Rebate Regulations.

In the interest of safety and institutional decorum, all residents of University Hostels are notified of the following revised operational protocols:

1. Entry Regulations: The main hostel gates will be secured at 2130 hrs. Biometric punching between 2100 hrs and 2130 hrs is obligatory. Any ingress subsequent to 2145 hrs will be recorded as late entry in the proctorial register.
2. Overnight Absences: Night-out leaves require prior electronic intimation from the registered parent/guardian's email ID at least 48 hours antecedently. Unsanctioned absence will attract disciplinary review.
3. Mess Rebates: Food bill concessions (rebate) will be granted solely for leaves spanning a minimum quantum of four (04) consecutive days, subject to advance submission of the prescribed mess leave coupon to the mess contractor prior to departure. Retrospective rebates are impermissible.

By Order of Chief Warden`,
    tags: ['Hostel', 'Curfew', 'Mess', 'Out-Pass'],
    userCompletedSteps: [1],
  },
  {
    id: 'notice-cr-whatsapp',
    title: 'Chaotic WhatsApp Forward: Mid-Sem Exam Form & Lab Safety Manual Fee',
    department: 'Forwarded via WhatsApp Class Group (CR Message)',
    category: 'exams',
    sourceType: 'whatsapp',
    datePosted: 'Today, 11:10 AM',
    urgency: 'CRITICAL',
    deadline: 'Tomorrow, Sept 15 • 3:00 PM',
    isDeadlineStrict: true,
    tldr: 'A frantic CR text wall claiming everyone will be barred from mid-sems unless they bring cash. REALITY: Exam registration on ERP is completely free; only the physics/chem printed lab safety manual costs ₹300 cash at Counter 3.',
    whoNeedsToAct: {
      appliesTo: '1st Year Students taking Physics & Chemistry practical labs this semester',
      exempt: 'Students who already purchased the official lab manual from the campus cooperative store',
      matchVerdict: 'MUST_ACT',
    },
    actionSteps: [
      {
        order: 1,
        title: 'Fill Free Exam Form on Student ERP Portal',
        description: 'Login to erp.campus.edu > Academics > Exam Registration. Check your 5 theory and 3 lab subjects. Click Submit and download PDF. Cost: ₹0.00 (included in semester fee).',
        location: 'Online on phone or laptop',
        itemsToBring: ['Student Roll Number & ERP Password'],
      },
      {
        order: 2,
        title: 'Get Exact ₹300 Cash for Lab Safety Manual',
        description: 'Only the printed department lab manual requires cash payment at the departmental stationery window. Counter staff do not have UPI scanners or change.',
        location: 'ATM near Nescafe kiosk / Bank branch',
        itemsToBring: ['Exact ₹300 in cash currency notes'],
      },
      {
        order: 3,
        title: 'Submit Printed ERP Slip at Science Block Counter 3',
        description: 'Hand over the 1-page ERP exam registration confirmation and collect your stamped lab manual.',
        location: 'Science Block (Block B), Ground Floor Counter 3',
        itemsToBring: ['Printed ERP form', '₹300 Cash', 'College ID Card'],
      },
    ],
    jargonDecoded: [
      {
        term: 'CR (Class Representative)',
        explanation: 'A student elected/appointed to act as liaison between faculty and classmates. Their WhatsApp messages are often sent in a hurry and mix rumors with real instructions.',
      },
      {
        term: 'Student ERP Portal',
        explanation: 'The official college management website where you see attendance, timetable, fee receipts, and exam registrations.',
      },
      {
        term: 'Lab Manual vs Lab Record File',
        explanation: 'The lab manual is the printed book with experiment procedures. The record file is the blank lined book where you handwrite your readings and graphs.',
      },
    ],
    consequencesIfMissed: 'Unregistered students cannot be assigned roll numbers on the mid-semester seating matrix; manual shortage can cause delay in conducting Experiment #1 next week.',
    contactOrOffice: 'Block B Counter 3 (Window open 11:00 AM - 3:00 PM only)',
    whatsappSummary: `⚠️ *CLARIFIED: What CR\'s frantic message actually means*
1. *Exam Form:* FREE! Just click submit on ERP portal (erp.campus.edu) and print the 1-page receipt.
2. *₹300 Cash:* ONLY for the physical lab manual book, NOT exam fee!
3. *Action:* Go to Block B Counter 3 before 3 PM tomorrow with exact ₹300 change and ERP printout.`,
    rawContent: `🚨🚨🚨 URGENT EVERYONE READ THIS DO NOT IGNORE 🚨🚨🚨
guys CR Aniket here. HOD sir told during today's physics lecture that all 1st year students have to fill exam form on erp right now and submit printout + ₹300 cash for physics lab manual to counter 3 ground floor science block before tomorrow 3pm sharp!!
If not done you will not get admit card for midsem and they will fine ₹1000!!
NO ONLINE PAYMENT OR GPAY ALLOWED guard is not giving change so bring exact ₹300 cash only. Also bring 2 passport photos just in case. Do not come after 3pm counter will close.`,
    tags: ['WhatsApp', 'Exams', 'Lab Manual', 'Debunked Panic'],
    userCompletedSteps: [],
  },
  {
    id: 'notice-library-cards',
    title: 'Smart RFID Identity Card Issue & Book-Bank Scheme Enrollment',
    department: 'Central Library & Learning Resource Centre',
    category: 'library',
    sourceType: 'notice_board',
    datePosted: '3 days ago',
    urgency: 'INFORMATIONAL',
    deadline: 'Sept 30, 2026 • 6:00 PM',
    isDeadlineStrict: false,
    tldr: 'First years can collect 5 primary textbook sets for the entire semester under the Book-Bank scheme for free. You also need to activate your RFID student card for digital turnstile entry.',
    whoNeedsToAct: {
      appliesTo: 'All 1st Year B.Tech freshers wanting physical reference books for Calculus, Physics, Programming, and Electrical Sciences',
      exempt: 'Students who prefer e-books or buying their own private textbooks',
      matchVerdict: 'OPTIONAL',
    },
    actionSteps: [
      {
        order: 1,
        title: 'Activate Library Barcode on Campus App',
        description: 'Login to Central Library portal using roll number to generate your digital barcode.',
        location: 'Library Portal (library.campus.edu)',
        itemsToBring: ['College Roll Number'],
      },
      {
        order: 2,
        title: 'Collect Book-Bank Set from 1st Floor Stack Room',
        description: 'Pick up standard 5-book prescribed syllabus bundle (Thomas Calculus, Halliday Resnick, Let Us C, Basic Electrical).',
        location: 'Central Library, 1st Floor Book-Bank Wing',
        itemsToBring: ['RFID Smart ID Card / Fee Receipt', 'Carrying bag / backpack for 5 heavy books'],
      },
    ],
    jargonDecoded: [
      {
        term: 'Book-Bank Scheme',
        explanation: 'A university service where you receive a full set of official semester textbooks to keep in your hostel/home until end-term exams without paying book retail costs.',
      },
      {
        term: 'RFID Smart Card',
        explanation: 'Your plastic college ID card containing an embedded microchip that taps at the library gate, hostel door, and exam hall scanners.',
      },
    ],
    consequencesIfMissed: 'No penalty or fine. Book-Bank stocks are first-come first-served, so waiting until October means popular calculus and physics books may run out.',
    contactOrOffice: 'Circulation Desk, Central Library Ground Floor (9:00 AM - 7:00 PM)',
    whatsappSummary: `📚 *Free Semester Textbooks for 1st Years (Book-Bank)*
Pick up your 5-book syllabus pack (Calculus, Physics, C-Prog, EE) from Central Library 1st floor.
Bring your ID card and a backpack! First-come first-served before stocks run out.`,
    rawContent: `CENTRAL LIBRARY - CIRCULAR
Ref: LIB/BB/2026/01

Subject: Distribution of Textbooks under Book-Bank Scheme for B.Tech First Year (Semester-I).

The Central Library invites applications from all bona fide registered students of B.Tech 1st Year for availing textbook sets under the Institutional Book-Bank Facility for the Autumn Semester 2026.

Eligible candidates may obtain the prescribed subject bundle (Calculus, Physics for Engineers, Fundamentals of Computing, Principles of Electrical Engineering) from the Circulation Section upon production of their Smart Card/Provisional ID.

Important Instructions:
- Distribution schedule: 12th Sept to 30th Sept 2026.
- Timings: 0930 hrs to 1730 hrs on all working days.
- Books must be returned within 3 days subsequent to completion of End-Semester Examinations. Late return will attract default charges of ₹2/volume/diem.

Librarian`,
    tags: ['Library', 'Books', 'Free Textbooks', 'RFID'],
    userCompletedSteps: [],
  },
];

export const JARGON_GLOSSARY = [
  {
    term: 'ERP Portal',
    definition: 'Enterprise Resource Planning web portal. The official university website where your attendance, marks, fee slips, subject registration, and grades are tracked.',
    tipForFreshers: 'Bookmark it immediately. Check it every Monday for attendance discrepancies before the 75% cutoff catches up with you.',
  },
  {
    term: 'DSW (Dean Student Welfare)',
    definition: 'The high-ranking administrative office that looks after non-academic student life: hostels, scholarships, cultural fests, clubs, and complaints.',
    tipForFreshers: 'Located in the Student Activity Centre (SAC). If you have scholarship queries or hostel issues, this is the office to approach.',
  },
  {
    term: 'Self-Attestation',
    definition: 'Signing your own name, writing "Self-Attested", and the current date on the bottom margin of every single photocopy you submit.',
    tipForFreshers: 'Never submit blank photocopies. Almost all university counters will reject documents that lack your signature.',
  },
  {
    term: 'Anti-Ragging Undertaking',
    definition: 'A mandatory government affidavit filed online at antiragging.in generating an acknowledgment reference number.',
    tipForFreshers: 'Both student and parent details are required. Keep the PDF and SMS reference ID saved on your phone.',
  },
  {
    term: 'Proctorial Board / Chief Proctor',
    definition: 'The campus disciplinary committee responsible for maintaining law, order, ragging prevention, and campus conduct.',
    tipForFreshers: 'Any violation of curfew, ID card rules, or misconduct notices will come from this office.',
  },
  {
    term: 'Book-Bank Scheme',
    definition: 'A library lending system that issues standard course textbooks for the entire 5-month semester instead of standard 14-day checkout limits.',
    tipForFreshers: 'Visit in the first two weeks of college before the best quality copies run out.',
  },
  {
    term: 'Mid-Sem / Sessional vs End-Sem',
    definition: 'Mid-Sem (Sessionals) are internal written tests worth 20-30% of your grade. End-Sem are final external board examinations worth 50-70%.',
    tipForFreshers: 'Do not neglect sessionals! Scoring high on internals makes passing the end-term exams far less stressful.',
  },
  {
    term: 'Bonafide Certificate',
    definition: 'An official letter with college stamp and Registrar signature certifying that you are a genuine currently-enrolled student.',
    tipForFreshers: 'Needed for opening student bank accounts, metro passes, passport applications, and external scholarships.',
  },
  {
    term: 'No-Dues Form (Clearance Slip)',
    definition: 'A multi-counter stamp sheet certifying you owe no money/books to library, hostel, lab, and sports departments.',
    tipForFreshers: 'Only needed when passing out or changing colleges, not in 1st semester.',
  },
  {
    term: 'CGPA vs SGPA',
    definition: 'SGPA is your Semester Grade Point Average for one single term (out of 10). CGPA is your Cumulative Grade Point Average combining all semesters.',
    tipForFreshers: 'Try to keep 1st year CGPA above 8.0—it gets harder to pull up in later years with heavier engineering subjects.',
  },
];
