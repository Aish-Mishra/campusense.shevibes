export type UrgencyLevel = 'CRITICAL' | 'IMPORTANT' | 'INFORMATIONAL';
export type MatchVerdict = 'MUST_ACT' | 'OPTIONAL' | 'NOT_APPLICABLE' | 'GENERAL';
export type NoticeCategory = 'academic' | 'hostel' | 'exams' | 'scholarships' | 'administration' | 'library';
export type SourceType = 'circular' | 'whatsapp' | 'email' | 'notice_board' | 'verbal';

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

export interface WhoNeedsToAct {
  appliesTo: string;
  exempt: string;
  matchVerdict: MatchVerdict;
}

export interface ClarifiedNotice {
  id: string;
  title: string;
  department: string;
  category: NoticeCategory;
  sourceType: SourceType;
  datePosted: string;
  urgency: UrgencyLevel;
  deadline: string | null;
  isDeadlineStrict: boolean;
  tldr: string;
  whoNeedsToAct: WhoNeedsToAct;
  actionSteps: ActionStep[];
  jargonDecoded: JargonItem[];
  consequencesIfMissed: string;
  contactOrOffice: string;
  whatsappSummary: string;
  rawContent: string;
  tags: string[];
  userCompletedSteps?: number[]; // list of step order numbers completed
}

export interface FresherProfile {
  name: string;
  year: string;
  branch: string;
  residence: 'Hosteler' | 'Day Scholar';
  category: string;
  collegeName: string;
}
