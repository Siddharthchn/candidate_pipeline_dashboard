export type Stage = "Applied" | "Shortlisted" | "Interview" | "Offered" | "Hired";

export interface Candidate {
  id: string;
  name: string;
  role: string;
  company: string;
  experience: number; // in years
  score: number; // 0-100 match score
  stage: Stage;
  lastActivity: string;
  avatar: string;
  skills: string[];
  notes: string;
}

export const stages: Stage[] = ["Applied", "Shortlisted", "Interview", "Offered", "Hired"];

export const mockCandidates: Candidate[] = [
  {
    id: "c-1",
    name: "Alex Johnson",
    role: "Senior Frontend Engineer",
    company: "TechNova",
    experience: 6,
    score: 92,
    stage: "Interview",
    lastActivity: "2 hours ago",
    avatar: "https://i.pravatar.cc/150?u=alex",
    skills: ["React", "Next.js", "TypeScript", "Tailwind"],
    notes: "Strong technical background. Great communication skills during the initial screen."
  },
  {
    id: "c-2",
    name: "Samantha Lee",
    role: "Fullstack Developer",
    company: "WebWorks",
    experience: 4,
    score: 85,
    stage: "Applied",
    lastActivity: "1 day ago",
    avatar: "https://i.pravatar.cc/150?u=sam",
    skills: ["React", "Node.js", "PostgreSQL"],
    notes: "Good portfolio. Need to evaluate backend skills."
  },
  {
    id: "c-3",
    name: "Michael Chen",
    role: "UX/UI Designer",
    company: "Creative Co.",
    experience: 8,
    score: 98,
    stage: "Offered",
    lastActivity: "5 hours ago",
    avatar: "https://i.pravatar.cc/150?u=mike",
    skills: ["Figma", "Framer", "CSS", "Prototyping"],
    notes: "Exceptional design skills. Offered senior package."
  },
  {
    id: "c-4",
    name: "Emily Davis",
    role: "Product Manager",
    company: "Innovate Inc.",
    experience: 5,
    score: 75,
    stage: "Shortlisted",
    lastActivity: "3 days ago",
    avatar: "https://i.pravatar.cc/150?u=emily",
    skills: ["Agile", "Jira", "Roadmapping"],
    notes: "Solid PM experience, but might lack domain knowledge."
  },
  {
    id: "c-5",
    name: "David Kim",
    role: "Frontend Developer",
    company: "StartupX",
    experience: 2,
    score: 68,
    stage: "Applied",
    lastActivity: "4 mins ago",
    avatar: "https://i.pravatar.cc/150?u=david",
    skills: ["React", "JavaScript", "HTML/CSS"],
    notes: "Junior candidate, shows promise but needs mentorship."
  },
  {
    id: "c-6",
    name: "Sarah Jones",
    role: "Software Engineer",
    company: "BigTech",
    experience: 10,
    score: 96,
    stage: "Hired",
    lastActivity: "1 week ago",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    skills: ["React", "TypeScript", "System Design", "AWS"],
    notes: "Accepted offer. Starts next month."
  }
];

export const jobOverview = {
  title: "Senior Frontend Engineer",
  department: "Product Engineering",
  location: "San Francisco, CA (Hybrid)",
  openPositions: 2,
  hiringManager: "Jane Doe",
  totalApplicants: 142
};
