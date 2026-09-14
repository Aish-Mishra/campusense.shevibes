export interface ActionStep {
  order: number;
  title: string;
  description: string;
  location: string;
  itemsToBring: string[];
}

export interface JargonItem {
  term: string;
  explanation: string;
}

export interface ClarifiedNoticeResult {
  title: string;
  department: string;
  urgency: 'CRITICAL' | 'IMPORTANT' | 'INFORMATIONAL';
  deadline: string | null;
  isDeadlineStrict: boolean;
  tldr: string;
  whoNeedsToAct: {
    appliesTo: string;
    exempt: string;
    matchVerdict: 'MUST_ACT' | 'OPTIONAL' | 'NOT_APPLICABLE' | 'GENERAL';
  };
  actionSteps: ActionStep[];
  jargonDecoded: JargonItem[];
  consequencesIfMissed: string;
  contactOrOffice: string;
  whatsappSummary: string;
  isFallback?: boolean;
}

const COMMON_CAMPUS_JARGON: Record<string, { term: string; explanation: string }> = {
  attestation: {
    term: 'Self-Attestation',
    explanation: 'Signing your own name and date on the photocopy to certify it is an authentic copy of your original document.',
  },
  debar: {
    term: 'Debarment',
    explanation: 'Being officially disqualified from sitting in examinations due to attendance shortage or disciplinary action.',
  },
  condonation: {
    term: 'Attendance Condonation',
    explanation: 'Formal approval granted by the Dean/Principal to waive attendance shortages on verified medical or university event grounds.',
  },
  sessional: {
    term: 'Sessional / Mid-Term Exams',
    explanation: 'Internal semester assessments conducted mid-way through the term, contributing directly to your internal marks.',
  },
  erp: {
    term: 'ERP Portal',
    explanation: 'The college student management website where your official attendance, exam admit cards, fee slips, and grades are hosted.',
  },
  dsw: {
    term: 'DSW (Dean Student Welfare)',
    explanation: 'The administrative dean handling student welfare, hostel administration, scholarships, and campus societies.',
  },
  bonafide: {
    term: 'Bonafide Certificate',
    explanation: 'An official letter certified by the Registrar confirming that you are an active, enrolled student of the university.',
  },
  provisional: {
    term: 'Provisional Admission',
    explanation: 'Temporary admission status until physical verification of all original marksheets and eligibility criteria is completed.',
  },
  'anti-ragging': {
    term: 'Anti-Ragging Undertaking',
    explanation: 'A mandatory declaration filed online at antiragging.in generating an official reference ID that colleges must verify.',
  },
  migration: {
    term: 'Migration vs TC',
    explanation: 'Transfer Certificate (TC) is from your previous school; Migration Certificate is issued by your school education board (CBSE/ICSE/State Board).',
  },
  admit: {
    term: 'Admit Card / Hall Ticket',
    explanation: 'The official authorization slip required to enter the examination hall. It is withheld if fees or attendance conditions are unmet.',
  },
  caretaker: {
    term: 'Hostel Caretaker',
    explanation: 'The on-ground administrative staff in charge of hostel room maintenance, electrical compliance, and keys.',
  },
};

export function parseCampusNoticeLocal(
  rawText: string,
  _sourceType?: string,
  studentContext?: any
): ClarifiedNoticeResult {
  const text = rawText.trim();
  const lower = text.toLowerCase();

  // 1. Detect if it matches known demo templates for instant precision
  if (lower.includes('mandatory certificate verification') || (lower.includes('document verification') && lower.includes('room 104'))) {
    return {
      title: 'Mandatory Certificate Verification & Enrollment',
      department: 'Academic Division',
      urgency: 'CRITICAL',
      deadline: '18th September 2026 • 4:00 PM',
      isDeadlineStrict: true,
      tldr: 'All 1st year B.Tech students must physically report to Room 104 with original certificates and self-attested photocopies to confirm provisional admission.',
      whoNeedsToAct: {
        appliesTo: 'All newly admitted 1st Year B.Tech Students (Session 2026-27)',
        exempt: 'Senior year students and lateral entry candidates',
        matchVerdict: studentContext?.year === '1st Year' ? 'MUST_ACT' : 'GENERAL',
      },
      actionSteps: [
        {
          order: 1,
          title: 'Prepare original certificates and photocopies',
          description: 'Self-attest 2 photocopies of 10th and 12th marksheets with your signature and date.',
          location: 'Before leaving hostel/home',
          itemsToBring: ['Original 10th & 12th Marksheets', '2 Self-attested photocopies', '4 Passport Photos'],
        },
        {
          order: 2,
          title: 'Obtain mandatory affidavits and certificates',
          description: 'Ensure you have Transfer/Migration Certificate, Medical Fitness Certificate, and Anti-ragging reference number.',
          location: 'Student file',
          itemsToBring: ['Transfer/Migration Certificate', 'Medical Fitness Certificate', 'Anti-Ragging Reference ID'],
        },
        {
          order: 3,
          title: 'Report to Document Verification Counter',
          description: 'Submit your file for scrutiny and collect your verified token slip.',
          location: 'Admin Block, Room 104 (10:00 AM - 4:00 PM)',
          itemsToBring: ['Complete Document Set', 'Photo ID proof'],
        },
      ],
      jargonDecoded: [
        COMMON_CAMPUS_JARGON.attestation,
        COMMON_CAMPUS_JARGON.provisional,
        COMMON_CAMPUS_JARGON['anti-ragging'],
      ],
      consequencesIfMissed: 'Provisional student roll numbers will be put on hold and admit cards withheld.',
      contactOrOffice: 'Admin Block, Room 104 (10:00 AM - 4:00 PM)',
      whatsappSummary: '📢 *Document Verification Alert*\nAll 1st Year B.Tech students must verify original certificates at Admin Block Room 104 before 18th Sept 2026 (4 PM). Bring originals + 2 self-attested sets + 4 photos.',
      isFallback: true,
    };
  }

  if (lower.includes('attendance') && (lower.includes('debar') || lower.includes('75%'))) {
    return {
      title: 'Mid-Term Attendance Debarment Warning',
      department: 'Examination Division',
      urgency: 'CRITICAL',
      deadline: '21st September 2026 • 4:00 PM',
      isDeadlineStrict: true,
      tldr: 'Students with aggregate attendance below 75% are debarred from mid-term assessments. Medical condonation petitions must be filed before the deadline.',
      whoNeedsToAct: {
        appliesTo: 'B.Tech 1st Semester students with attendance below 75%',
        exempt: 'Students maintaining 75% or higher attendance across all subjects',
        matchVerdict: 'MUST_ACT',
      },
      actionSteps: [
        {
          order: 1,
          title: 'Check ERP attendance percentage',
          description: 'Verify your current lecture attendance percentage on the university student portal.',
          location: 'ERP Portal online',
          itemsToBring: ['Student ERP Login Credentials'],
        },
        {
          order: 2,
          title: 'Get medical certificate endorsed if seeking condonation',
          description: 'Ensure medical slip is stamped and endorsed by the University Medical Officer.',
          location: 'University Health Centre',
          itemsToBring: ['Original Medical Records', 'Doctor Prescription'],
        },
        {
          order: 3,
          title: 'Submit condonation petition and clear dues',
          description: 'Submit signed petition to Dean Academics and clear any pending library dues to obtain admit card.',
          location: 'Office of Dean Academics (Room A-202)',
          itemsToBring: ['Condonation Petition', 'Medical Officer Slip', 'Library Clearance Slip'],
        },
      ],
      jargonDecoded: [
        COMMON_CAMPUS_JARGON.debar,
        COMMON_CAMPUS_JARGON.condonation,
        COMMON_CAMPUS_JARGON.sessional,
      ],
      consequencesIfMissed: 'Prima facie debarment from appearing in Mid-Term Sessional Assessments starting 28th September.',
      contactOrOffice: 'Office of Dean Academics (Room A-202)',
      whatsappSummary: '⚠️ *Attendance Warning (75% Rule)*\nStudents below 75% attendance are debarred from Mid-Terms. Submit medical condonation petitions at Room A-202 before 21st Sept 2026 (4 PM).',
      isFallback: true,
    };
  }

  if (lower.includes('hostel') && (lower.includes('appliance') || lower.includes('fixtures') || lower.includes('rod'))) {
    return {
      title: 'Hostel Electrical Appliance Restriction',
      department: 'Office of Chief Hostel Warden',
      urgency: 'IMPORTANT',
      deadline: 'Friday, 19th September',
      isDeadlineStrict: true,
      tldr: 'High-wattage appliances (immersion rods, kettles, induction stoves) are strictly prohibited in hostel rooms. Surrender unauthorized items to avoid fines.',
      whoNeedsToAct: {
        appliesTo: 'All hostel residents (Block 1 and 2)',
        exempt: 'Day scholars and non-resident students',
        matchVerdict: studentContext?.residence === 'Hosteler' ? 'MUST_ACT' : 'NOT_APPLICABLE',
      },
      actionSteps: [
        {
          order: 1,
          title: 'Check your room for prohibited items',
          description: 'Inspect room for immersion heaters, kettles, heating coils, or induction cookers.',
          location: 'Hostel Room',
          itemsToBring: ['Prohibited electrical appliances'],
        },
        {
          order: 2,
          title: 'Surrender unauthorized fixtures to Caretaker',
          description: 'Hand over unauthorized appliances voluntarily to the Hostel Caretaker by Friday.',
          location: 'Hostel Caretaker Office (Ground Floor)',
          itemsToBring: ['Hostel Room Key / ID Card'],
        },
      ],
      jargonDecoded: [
        COMMON_CAMPUS_JARGON.caretaker,
        COMMON_CAMPUS_JARGON.dsw,
      ],
      consequencesIfMissed: 'Disciplinary action and a spot fine of ₹2,500 during surprise proctorial inspections.',
      contactOrOffice: 'Hostel Caretaker Office, Hostel Block 1',
      whatsappSummary: '⚡ *Hostel Notice: Electrical Appliances*\nHigh-wattage appliances (kettles, induction, rods) are forbidden. Surrender them to Hostel Caretaker by Friday 19th Sept to avoid ₹2,500 fine.',
      isFallback: true,
    };
  }

  // Generic heuristic extractor for any custom pasted notice
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);

  // 1. Department Detection
  let department = 'University Administration';
  if (lower.includes('academic division') || lower.includes('dean academic')) {
    department = 'Academic Division';
  } else if (lower.includes('examination') || lower.includes('controller of exam')) {
    department = 'Examination Division';
  } else if (lower.includes('hostel') || lower.includes('warden')) {
    department = 'Office of Chief Hostel Warden';
  } else if (lower.includes('library') || lower.includes('librarian')) {
    department = 'Central University Library';
  } else if (lower.includes('dsw') || lower.includes('student welfare')) {
    department = 'Dean Student Welfare (DSW)';
  } else if (lower.includes('training & placement') || lower.includes('t&p') || lower.includes('placement cell')) {
    department = 'Training & Placement Cell';
  }

  // 2. Title Detection
  let title = 'Campus Notice';
  for (const line of lines) {
    const cleanLine = line.replace(/^(notice|circular|ref\s*no\.?|subject:?)\s*[:-]?\s*/i, '').trim();
    if (cleanLine.length > 5 && cleanLine.length < 85 && !/^(date|timings|important)/i.test(cleanLine)) {
      title = cleanLine;
      break;
    }
  }
  if (title === 'Campus Notice' && lines.length > 0) {
    title = lines[0].slice(0, 60);
  }

  // 3. Urgency Detection
  let urgency: 'CRITICAL' | 'IMPORTANT' | 'INFORMATIONAL' = 'INFORMATIONAL';
  if (
    lower.includes('mandatory') ||
    lower.includes('debar') ||
    lower.includes('immediately') ||
    lower.includes('strictly') ||
    lower.includes('failure to') ||
    lower.includes('withhold')
  ) {
    urgency = 'CRITICAL';
  } else if (lower.includes('important') || lower.includes('deadline') || lower.includes('last date') || lower.includes('required')) {
    urgency = 'IMPORTANT';
  }

  // 4. Deadline Detection
  let deadline: string | null = null;
  const deadlineMatch = text.match(
    /(?:before|by|on or before|deadline:?|last date:?)\s+([0-9]{1,2}(?:st|nd|rd|th)?\s+[A-Za-z]+(?:\s+[0-9]{4})?(?:\s+(?:by|at)\s+[0-9]{1,2}(?::[0-9]{2})?\s*(?:AM|PM|hrs|hours)?)?)/i
  );
  if (deadlineMatch) {
    deadline = deadlineMatch[1].trim();
  } else {
    const altDate = text.match(/([0-9]{1,2}(?:st|nd|rd|th)?\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*(?:\s+[0-9]{4})?)/i);
    if (altDate) {
      deadline = altDate[1].trim();
    }
  }

  // 5. Action Steps Extraction
  const actionSteps: ActionStep[] = [];
  const listItems = lines.filter((l) => /^[0-9]+[.)-]|\*|-|•/.test(l));

  if (listItems.length > 0) {
    listItems.slice(0, 5).forEach((item, idx) => {
      const cleanItem = item.replace(/^[0-9]+[.)-]\s*|[-*•]\s*/, '').trim();
      const itemsToBring: string[] = [];
      if (/marksheet|certificate|document|slip|affidavit|photo|id card|challan|receipt/i.test(cleanItem)) {
        itemsToBring.push(cleanItem.slice(0, 45));
      }
      actionSteps.push({
        order: idx + 1,
        title: cleanItem.length > 50 ? cleanItem.slice(0, 50) + '...' : cleanItem,
        description: cleanItem,
        location: 'Department Office / Campus Counter',
        itemsToBring: itemsToBring.length > 0 ? itemsToBring : ['Student ID Card'],
      });
    });
  } else {
    actionSteps.push({
      order: 1,
      title: 'Review announcement details',
      description: 'Check deadlines, eligibility criteria, and instructions mentioned in the notice.',
      location: 'Student Notice Board',
      itemsToBring: ['Student ID Card'],
    });
    actionSteps.push({
      order: 2,
      title: 'Submit required documents or clearance',
      description: 'Visit the designated administrative counter to fulfill the procedure before the deadline.',
      location: department,
      itemsToBring: ['Relevant Certificates & Documents'],
    });
  }

  // 6. Location / Office Extraction
  let contactOrOffice = 'Administrative Block Information Desk';
  const roomMatch = text.match(/(Room\s+[A-Z0-9-]+|Admin\s+Block|Counter\s+[0-9]+|Health\s+Centre|Library|Hostel\s+Office)/i);
  if (roomMatch) {
    contactOrOffice = roomMatch[0];
  }

  // 7. Jargon Detection
  const jargonDecoded: JargonItem[] = [];
  for (const [key, val] of Object.entries(COMMON_CAMPUS_JARGON)) {
    if (lower.includes(key)) {
      jargonDecoded.push(val);
    }
  }
  if (jargonDecoded.length === 0) {
    jargonDecoded.push(COMMON_CAMPUS_JARGON.attestation);
  }

  // 8. Consequences Detection
  let consequencesIfMissed = 'Possible administrative delay or penalty. Check with department desk.';
  const consequenceMatch = text.match(/(failure to[^.\n]+|non-compliance[^.\n]+|debarred[^.\n]+|fine of[^.\n]+|withholding[^.\n]+)/i);
  if (consequenceMatch) {
    consequencesIfMissed = consequenceMatch[1].trim() + '.';
  }

  // 9. Audience
  let appliesTo = 'All enrolled college students';
  if (lower.includes('1st year') || lower.includes('fresher') || lower.includes('first year')) {
    appliesTo = '1st Year B.Tech / Freshman Students';
  } else if (lower.includes('hostel')) {
    appliesTo = 'All Hostel Residents';
  }

  return {
    title,
    department,
    urgency,
    deadline,
    isDeadlineStrict: urgency === 'CRITICAL',
    tldr: `This circular outlines instructions regarding ${title.toLowerCase()}. Review required action steps and complete by ${deadline || 'the designated date'}.`,
    whoNeedsToAct: {
      appliesTo,
      exempt: 'Students who have already submitted or received prior clearance',
      matchVerdict: 'MUST_ACT',
    },
    actionSteps,
    jargonDecoded: jargonDecoded.slice(0, 4),
    consequencesIfMissed,
    contactOrOffice,
    whatsappSummary: `📢 *Campus Notice: ${title}*\n${department} has issued instructions for students. Deadline: ${deadline || 'Check with office'}. Review checklist on CampuSense.`,
    isFallback: true,
  };
}

export function answerNoticeQuestionLocal(
  question: string,
  noticeText?: string,
  noticeSummary?: any,
  _studentContext?: any
): string {
  const q = question.toLowerCase();
  const text = ((noticeText || '') + ' ' + JSON.stringify(noticeSummary || {})).toLowerCase();

  // Location / Where
  if (q.includes('where') || q.includes('room') || q.includes('location') || q.includes('place') || q.includes('counter')) {
    if (noticeSummary?.contactOrOffice) {
      return `The designated venue is **${noticeSummary.contactOrOffice}**. Counters are usually open between 10:00 AM and 3:30 PM on working days.`;
    }
    const match = text.match(/(room\s+[a-z0-9-]+|admin\s+block|counter\s+[0-9]+|caretaker\s+office|library)/i);
    if (match) {
      return `You should report to **${match[0]}**. Make sure to visit during official working hours.`;
    }
    return `Please report to the main Academic / Administrative Section desk in the Admin Block.`;
  }

  // Deadline / When
  if (q.includes('when') || q.includes('deadline') || q.includes('date') || q.includes('last day') || q.includes('time')) {
    if (noticeSummary?.deadline) {
      return `The stated deadline is **${noticeSummary.deadline}**. We strongly recommend visiting at least one day earlier to avoid long queues and lunch-hour counter closures.`;
    }
    return `Check with your Class Representative or department counter immediately, as deadlines are strictly enforced for academic submissions.`;
  }

  // Documents / What to bring / Photocopies
  if (q.includes('document') || q.includes('bring') || q.includes('carry') || q.includes('marksheet') || q.includes('photo') || q.includes('attest')) {
    const items = noticeSummary?.actionSteps?.flatMap((s: any) => s.itemsToBring || []) || [];
    const uniqueItems = Array.from(new Set(items));
    if (uniqueItems.length > 0) {
      return `Here is what you need to bring:\n• ${uniqueItems.join('\n• ')}\n\nRemember: All photocopies must be **self-attested** (signed by you with current date).`;
    }
    return `Carry your original certificates, 2 self-attested photocopies of each, 4 passport photos, and your Student ID or Provisional Allotment Letter.`;
  }

  // Online / DigiLocker
  if (q.includes('digilocker') || q.includes('online') || q.includes('soft copy') || q.includes('pdf')) {
    return `Most college verification counters require **physical verification** of original certificates alongside signed hard copies. While DigiLocker marksheets are legally valid, campus administrative sections will insist on seeing original paper certificates before stamping acknowledgment slips.`;
  }

  // Consequences / Penalty / Miss
  if (q.includes('what if') || q.includes('miss') || q.includes('late') || q.includes('consequence') || q.includes('penalty') || q.includes('fine')) {
    if (noticeSummary?.consequencesIfMissed) {
      return `Consequences of missing the deadline: **${noticeSummary.consequencesIfMissed}**. If an emergency arises, submit an application signed by your Faculty Advisor immediately.`;
    }
    return `Missing university deadlines can lead to late fines (typically ₹100–₹500/day) or withholding of examination admit cards and registration slips.`;
  }

  // Default helpful response
  return `Regarding your question about "${question}": According to the circular, please follow the steps outlined in the checklist. For urgent exemptions or counter issues, approach the ${noticeSummary?.department || 'Academic Section'} directly.`;
}
