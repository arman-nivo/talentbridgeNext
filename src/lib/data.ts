import type { LucideIcon } from "lucide-react";
import {
  BrainCircuit,
  ChartPie,
  ClipboardCheck,
  Gauge,
  GraduationCap,
  HeartHandshake,
  Layers,
  LineChart,
  MessagesSquare,
  Network,
  Radar,
  Repeat,
  ScanSearch,
  ShieldCheck,
  Smile,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  TriangleAlert,
  UserCheck,
  UserPlus,
  Users,
  Video,
  Workflow,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Images (Unsplash, served through next/image)                        */
/* ------------------------------------------------------------------ */

export function unsplash(id: string, w = 1600) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
}

export const IMAGES = {
  teamLaptops: unsplash("1522071820081-009f0129c71c"),
  meeting: unsplash("1600880292203-757bb62b4baf"),
  diverseTeam: unsplash("1531545514256-b1400bc00f31"),
  officeWork: unsplash("1551434678-e076c223a692"),
  planning: unsplash("1556761175-b413da4baf72"),
  groupWorkshop: unsplash("1515187029135-18ee286d815b"),
  analyticsDash: unsplash("1551288049-bebda4e38f71"),
  laptopAnalytics: unsplash("1460925895917-afdab827c52f"),
  screenMetrics: unsplash("1526628953301-3e589a6a8b74"),
  videoCall: unsplash("1516321318423-f06f85e504b3"),
  remoteMeeting: unsplash("1588196749597-9ff075ee6b5b"),
  chartsPlanning: unsplash("1454165804606-c3d57bc86b40"),
  planningBoard: unsplash("1531403009284-440f080d1e12"),
  globeNetwork: unsplash("1451187580459-43490279c0fa"),
  classroom: unsplash("1524178232363-1fb2b075b655"),
  code: unsplash("1498050108023-c5249f4df085"),
  codeScreen: unsplash("1555066931-4365d14bab8c"),
  startupMeeting: unsplash("1559136555-9303baea8ebd"),
  presentation: unsplash("1542744173-8e7e53415bb0"),
  officeInterior: unsplash("1497366216548-37526070297c"),
  openOffice: unsplash("1606857521015-7f9fcf423740"),
  brainstorm: unsplash("1553877522-43269d4ea984"),
  teamCulture: unsplash("1529156069898-49953e39b3ac"),
  lounge: unsplash("1557804506-669a67965ba0"),
  officeDesk: unsplash("1497366811353-6870744d04b2"),
  cyber: unsplash("1550751827-4bd374c3f58b"),
  aiAbstract: unsplash("1677442136019-21780ecad995"),
  aiRobot: unsplash("1620712943543-bcc4688e7485"),
  handsTeam: unsplash("1521737604893-d14cc237f11d"),
  teamTable: unsplash("1517245386807-bb43f82c33c4"),
  engineer: unsplash("1573164713714-d95e436ab8d6"),
  laptopTyping: unsplash("1556155092-490a1ba16284"),
  skyline: unsplash("1486406146926-c627a92ad1ab"),
  workLaptop: unsplash("1519389950473-47ba0277781c"),
  coworking: unsplash("1568992687947-868a62a9f521"),
} as const;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const NAV_LINKS = [
  { href: "/capabilities", label: "Capabilities" },
  { href: "/roi-calculator", label: "ROI Calculator" },
  { href: "/us-bd-model", label: "US-BD Model" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
] as const;

export const CONTACT = {
  email: "enterprise@talentbridge-usbd.com",
  usHq: "100 Congress Ave, Suite 2000, Austin, TX 78701",
  dhaka: "Gulshan 2, Dhaka 1212, Bangladesh",
};

/* ------------------------------------------------------------------ */
/* Tones: full Tailwind class strings so the compiler can see them     */
/* ------------------------------------------------------------------ */

export type Tone = {
  text: string;
  bg: string;
  border: string;
  solid: string;
  gradient: string;
};

export const TONES = {
  cyan: {
    text: "text-cyan-700 dark:text-cyan-300",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    solid: "bg-cyan-500",
    gradient: "from-cyan-500/25 via-cyan-500/5 to-transparent",
  },
  blue: {
    text: "text-blue-700 dark:text-blue-300",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    solid: "bg-blue-500",
    gradient: "from-blue-500/25 via-blue-500/5 to-transparent",
  },
  indigo: {
    text: "text-indigo-700 dark:text-indigo-300",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/30",
    solid: "bg-indigo-500",
    gradient: "from-indigo-500/25 via-indigo-500/5 to-transparent",
  },
  emerald: {
    text: "text-emerald-700 dark:text-emerald-300",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    solid: "bg-emerald-500",
    gradient: "from-emerald-500/25 via-emerald-500/5 to-transparent",
  },
  amber: {
    text: "text-amber-700 dark:text-amber-300",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    solid: "bg-amber-500",
    gradient: "from-amber-500/25 via-amber-500/5 to-transparent",
  },
} satisfies Record<string, Tone>;

/* ------------------------------------------------------------------ */
/* Capabilities (each one has its own page)                            */
/* ------------------------------------------------------------------ */

export type Capability = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  summary: string;
  description: string;
  icon: LucideIcon;
  tone: Tone;
  image: string;
  gallery: string[];
  highlights: string[];
  metrics: { value: string; label: string }[];
  features: { icon: LucideIcon; title: string; text: string }[];
  process: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
};

export const CAPABILITIES: Capability[] = [
  {
    slug: "talent-recruitment",
    number: "01",
    title: "Talent Recruitment & Digital Onboarding",
    shortTitle: "Recruitment & Onboarding",
    tagline: "Top 1% engineers, productive in days, not months.",
    summary:
      "Blending cultural-fit assessment with customised digital training modules for instant US enterprise integration.",
    description:
      "We source from Bangladesh's strongest engineering universities and communities, then run every candidate through a multi-stage technical, communication and culture-fit process. Successful hires go straight into a digital onboarding track built around your stack, rituals and tools.",
    icon: UserPlus,
    tone: TONES.cyan,
    image: IMAGES.planning,
    gallery: [IMAGES.groupWorkshop, IMAGES.engineer, IMAGES.teamTable],
    highlights: ["Top 1% vetting process", "US Agile & culture alignment", "Automated onboarding LMS"],
    metrics: [
      { value: "1 in 100", label: "Applicants accepted" },
      { value: "< 14 days", label: "Average time to deploy" },
      { value: "10 days", label: "To first production commit" },
    ],
    features: [
      { icon: ScanSearch, title: "Multi-stage vetting", text: "Live coding, system design and English communication interviews scored by senior engineers." },
      { icon: UserCheck, title: "Culture-fit mapping", text: "Behavioural assessments matched to your team's working style, rituals and time-zone overlap." },
      { icon: GraduationCap, title: "Custom onboarding LMS", text: "Role-specific learning paths covering your codebase, tooling, security policies and product context." },
      { icon: ClipboardCheck, title: "30-60-90 day plans", text: "Clear milestones agreed with your engineering lead and tracked inside the client portal." },
    ],
    process: [
      { title: "Discovery call", text: "We map role requirements, stack, seniority and team culture with your hiring manager." },
      { title: "Shortlist in 48 hours", text: "Pre-vetted candidates with code samples, interview notes and video intros." },
      { title: "Client interviews", text: "You meet the finalists and choose. We handle offers, contracts and equipment." },
      { title: "Digital onboarding", text: "New hires complete your custom LMS track and ship their first PR in days." },
    ],
    faqs: [
      { q: "How fast can we start?", a: "Most clients receive a shortlist within 48 hours and have engineers deployed in under 14 days." },
      { q: "Do we interview candidates ourselves?", a: "Yes. You always make the final hiring decision after meeting the shortlisted candidates." },
      { q: "What if a hire isn't the right fit?", a: "We offer a free replacement guarantee during the first 90 days." },
    ],
  },
  {
    slug: "employee-optimization",
    number: "02",
    title: "Data-Driven Employee Optimization",
    shortTitle: "Employee Optimization",
    tagline: "See output, not just activity.",
    summary:
      "Real-time productivity dashboards and KPI tracking modules to maximise output and operational efficiency.",
    description:
      "Our analytics layer connects to Jira, GitHub and Slack to turn day-to-day work into clear signals: sprint velocity, cycle time, review quality and delivery predictability. Leaders see where teams are flowing and where they are blocked.",
    icon: ChartPie,
    tone: TONES.blue,
    image: IMAGES.analyticsDash,
    gallery: [IMAGES.laptopAnalytics, IMAGES.screenMetrics, IMAGES.officeWork],
    highlights: ["Sprint & KPI tracker", "Output analytics engine", "Workflow optimization"],
    metrics: [
      { value: "+40%", label: "Average sprint speed boost" },
      { value: "94.8", label: "Avg velocity score / 100" },
      { value: "-31%", label: "Cycle time reduction" },
    ],
    features: [
      { icon: Gauge, title: "Sprint velocity tracking", text: "Live burndown and throughput metrics per squad, benchmarked against similar teams." },
      { icon: LineChart, title: "Output analytics engine", text: "PR cycle time, review depth and deployment frequency in one unified view." },
      { icon: Workflow, title: "Workflow optimization", text: "Bottleneck detection highlights blocked tickets, idle reviews and hand-off delays." },
      { icon: Target, title: "Goal & OKR alignment", text: "Connect individual KPIs to team OKRs so everyone knows what matters this quarter." },
    ],
    process: [
      { title: "Connect your tools", text: "Secure read-only integrations with Jira, GitHub, GitLab and Slack." },
      { title: "Baseline your team", text: "We benchmark current velocity, quality and delivery predictability." },
      { title: "Coach & optimise", text: "Engineering managers act on weekly insights with our delivery leads." },
      { title: "Report to leadership", text: "Executive summaries show progress against agreed KPIs every month." },
    ],
    faqs: [
      { q: "Is this employee surveillance?", a: "No. We measure team-level delivery outcomes, never keystrokes, screenshots or screen time." },
      { q: "Which tools do you integrate with?", a: "Jira, Linear, GitHub, GitLab, Bitbucket, Slack and Microsoft Teams out of the box." },
      { q: "Who can see the data?", a: "Access is role-based and controlled by your admins. Data stays in US-hosted infrastructure." },
    ],
  },
  {
    slug: "retention-analytics",
    number: "03",
    title: "Analytics-Powered Retention Strategies",
    shortTitle: "Retention Analytics",
    tagline: "Keep your best people, before they think about leaving.",
    summary:
      "Predictive loyalty models and sentiment analytics designed to keep high-performing team members deeply engaged.",
    description:
      "Attrition is expensive and usually predictable. Our models combine pulse surveys, engagement trends and career-growth signals to flag risk early, then pair each flag with a concrete retention action owned by a local Dhaka people partner.",
    icon: HeartHandshake,
    tone: TONES.indigo,
    image: IMAGES.handsTeam,
    gallery: [IMAGES.teamCulture, IMAGES.lounge, IMAGES.brainstorm],
    highlights: ["Pulse sentiment scoring", "Custom growth pathways", "Loyalty incentive plans"],
    metrics: [
      { value: "98.4%", label: "Client retention rate" },
      { value: "0%", label: "Unplanned attrition (top accounts)" },
      { value: "96%", label: "Avg predictive retention score" },
    ],
    features: [
      { icon: Smile, title: "Pulse sentiment scoring", text: "Short, anonymous bi-weekly surveys produce a trending engagement score per team." },
      { icon: TriangleAlert, title: "Early attrition warnings", text: "Risk models flag disengagement weeks before a resignation, with suggested actions." },
      { icon: TrendingUp, title: "Custom growth pathways", text: "Personal development plans, certifications and promotion tracks for every engineer." },
      { icon: Sparkles, title: "Loyalty incentive plans", text: "Tenure bonuses, learning budgets and recognition programmes tuned to local expectations." },
    ],
    process: [
      { title: "Listen", text: "Regular pulse surveys and 1:1s run by dedicated Dhaka people partners." },
      { title: "Predict", text: "Risk models score engagement and flight risk for every team member." },
      { title: "Act", text: "Targeted interventions: growth plans, recognition, workload balancing." },
      { title: "Measure", text: "Retention outcomes are tracked and reported back to your leadership." },
    ],
    faqs: [
      { q: "Are survey responses anonymous?", a: "Yes. Results are aggregated, and individual answers are never shared with clients." },
      { q: "Who acts on retention risks?", a: "A dedicated people partner in Dhaka works with your engineering lead on every flagged case." },
      { q: "What does attrition typically look like?", a: "Our managed teams average under 4% annual attrition, well below the regional average." },
    ],
  },
  {
    slug: "team-collaboration",
    number: "04",
    title: "Tech-Enabled Team Collaboration",
    shortTitle: "Team Collaboration",
    tagline: "One team across two continents.",
    summary:
      "Seamless cross-border tools and peer improvement frameworks that unite US leads with Dhaka specialists.",
    description:
      "Distance only slows teams down when collaboration is left to chance. We design the rituals, documentation habits and tooling that let US product leads and Dhaka engineers work as a single team, with a deliberate overlap window every day.",
    icon: Users,
    tone: TONES.emerald,
    image: IMAGES.videoCall,
    gallery: [IMAGES.remoteMeeting, IMAGES.workLaptop, IMAGES.coworking],
    highlights: ["Peer upskilling networks", "Asynchronous workflows", "Cross-time-zone sync"],
    metrics: [
      { value: "3 hrs", label: "Guaranteed daily overlap" },
      { value: "24/7", label: "Follow-the-sun delivery" },
      { value: "4.8 / 5", label: "Client collaboration rating" },
    ],
    features: [
      { icon: Repeat, title: "Async-first workflows", text: "Written specs, Loom walkthroughs and structured hand-offs that survive time zones." },
      { icon: Video, title: "Daily overlap window", text: "A protected window each day for stand-ups, pairing and fast decisions." },
      { icon: MessagesSquare, title: "Shared rituals", text: "Joint sprint planning, demos and retros so everyone owns the same roadmap." },
      { icon: Network, title: "Peer upskilling networks", text: "Guilds and mentoring circles that spread knowledge across both hubs." },
    ],
    process: [
      { title: "Design the operating model", text: "We agree rituals, overlap hours and communication norms together." },
      { title: "Set up the tooling", text: "Slack channels, Jira workflows and documentation spaces configured for async." },
      { title: "Run joint rituals", text: "Planning, demos and retros run across both hubs from week one." },
      { title: "Continuously improve", text: "Quarterly collaboration health checks with actionable recommendations." },
    ],
    faqs: [
      { q: "How do you handle the time difference?", a: "Teams keep a 2-3 hour daily overlap with US mornings, and use async hand-offs for the rest." },
      { q: "Will engineers join our Slack and stand-ups?", a: "Yes. Engineers work inside your tools and attend your ceremonies like any in-house teammate." },
      { q: "What about English communication?", a: "Every engineer passes a spoken and written English assessment before placement." },
    ],
  },
  {
    slug: "workforce-planning",
    number: "05",
    title: "Predictive Workforce Planning",
    shortTitle: "Workforce Planning",
    tagline: "Hire ahead of demand, not behind it.",
    summary:
      "AI-driven forecasting models to anticipate hiring bottlenecks, model pipeline demand, and minimise turnover risks.",
    description:
      "Roadmaps change faster than hiring plans. Our forecasting models use your product roadmap, delivery data and attrition risk to predict capacity gaps months in advance, backed by a pre-vetted on-demand talent bench.",
    icon: BrainCircuit,
    tone: TONES.amber,
    image: IMAGES.chartsPlanning,
    gallery: [IMAGES.planningBoard, IMAGES.aiAbstract, IMAGES.presentation],
    highlights: ["Predictive capacity models", "Turnover risk warnings", "On-demand talent bench"],
    metrics: [
      { value: "6 mo", label: "Forecast horizon" },
      { value: "120+", label: "Engineers on standby bench" },
      { value: "2x", label: "Faster scale-up vs. local hiring" },
    ],
    features: [
      { icon: Radar, title: "Capacity forecasting", text: "Model engineering capacity against roadmap demand for the next two quarters." },
      { icon: Layers, title: "Skills gap analysis", text: "Map current skills against upcoming projects and spot gaps before they block delivery." },
      { icon: Timer, title: "On-demand talent bench", text: "Pre-vetted engineers ready to join within days when demand spikes." },
      { icon: ShieldCheck, title: "Risk-adjusted plans", text: "Plans factor in attrition risk, leave and ramp-up time for new hires." },
    ],
    process: [
      { title: "Ingest your roadmap", text: "We combine roadmap, delivery and headcount data into one model." },
      { title: "Forecast demand", text: "Scenario models show capacity needs under different growth plans." },
      { title: "Build the bench", text: "Candidates for predicted roles are pre-vetted and kept warm." },
      { title: "Scale on signal", text: "When demand arrives, engineers deploy in days instead of months." },
    ],
    faqs: [
      { q: "What data do the forecasts need?", a: "Your roadmap, current team structure and delivery history. We help gather it during onboarding." },
      { q: "Can we scale down as well as up?", a: "Yes. Contracts are flexible, and the bench model supports both directions." },
      { q: "How accurate are the forecasts?", a: "Accuracy improves over time. Most clients see reliable quarter-ahead planning after the first cycle." },
    ],
  },
];

export function getCapability(slug: string) {
  return CAPABILITIES.find((c) => c.slug === slug);
}

/* ------------------------------------------------------------------ */
/* Social proof                                                        */
/* ------------------------------------------------------------------ */

export const STATS = [
  { value: 98.4, decimals: 1, suffix: "%", label: "US client retention rate" },
  { value: 60, decimals: 0, suffix: "%", label: "Average payroll savings" },
  { value: 850, decimals: 0, suffix: "+", label: "Engineers & leaders deployed" },
  { value: 14, decimals: 0, prefix: "< ", suffix: " days", label: "Average time to deploy" },
];

export const CLIENT_LOGOS = [
  "CloudSphere Inc.",
  "CarePulse Health",
  "Velocity Pay",
  "Apex Cyber AI",
  "DataScale US",
  "Northwind Labs",
  "Lumen Logistics",
  "BrightPath EdTech",
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  segment: string;
  metric: { value: string; label: string };
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "TalentBridge didn't just find us senior React and Python developers in Dhaka. Their onboarding platform and peer feedback system had them committing production code in under 10 days. They feel like an integrated extension of our SF team.",
    name: "Marcus Vance",
    role: "VP of Engineering",
    company: "PayFlow US",
    segment: "Series-B FinTech · San Francisco",
    metric: { value: "+40%", label: "Sprint speed boost" },
  },
  {
    quote:
      "The predictive attrition analytics module saved us from losing key data engineers during peak quarter roadmap deliverables. Their retention strategies and local Dhaka team leads keep morale high.",
    name: "Dr. Aris Thorne",
    role: "Chief Technology Officer",
    company: "BioPulse US",
    segment: "HealthTech Enterprise · Boston",
    metric: { value: "0%", label: "Unplanned attrition in 18 months" },
  },
  {
    quote:
      "We needed a data platform team in weeks, not quarters. TalentBridge had six engineers onboarded in twelve days, and the overnight hand-off model means our backlog moves while we sleep.",
    name: "Priya Raman",
    role: "Head of Data",
    company: "DataScale US",
    segment: "Analytics SaaS · Austin",
    metric: { value: "12 days", label: "To a 6-person team" },
  },
  {
    quote:
      "The workforce planning forecasts flagged our Q3 capacity gap two months early. We had bench engineers ready before the crunch hit, and shipped our biggest release on time.",
    name: "Jordan Ellis",
    role: "COO",
    company: "Velocity Pay",
    segment: "Payments Platform · New York",
    metric: { value: "2 mo", label: "Earlier capacity warning" },
  },
  {
    quote:
      "Security reviews used to be our biggest worry with offshore teams. SOC 2 controls, US contracts and clear IP assignment made our legal team comfortable from day one.",
    name: "Elena Brooks",
    role: "CISO",
    company: "Apex Cyber AI",
    segment: "Cybersecurity · Seattle",
    metric: { value: "100%", label: "Audit-ready from day one" },
  },
];

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  location: string;
  image: string;
  challenge: string;
  solution: string;
  results: { value: string; label: string }[];
  tags: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "payflow",
    client: "PayFlow US",
    industry: "FinTech",
    location: "San Francisco, CA",
    image: IMAGES.startupMeeting,
    challenge: "A Series-B payments startup needed to double its product engineering capacity before a major launch, without blowing its runway.",
    solution: "We deployed 12 senior React, Node and Python engineers in three weeks, with a custom onboarding track and daily overlap rituals.",
    results: [
      { value: "+40%", label: "Sprint velocity" },
      { value: "58%", label: "Payroll savings" },
      { value: "10 days", label: "To first commit" },
    ],
    tags: ["Recruitment", "Onboarding", "Collaboration"],
  },
  {
    slug: "biopulse",
    client: "BioPulse US",
    industry: "HealthTech",
    location: "Boston, MA",
    image: IMAGES.laptopAnalytics,
    challenge: "A healthcare analytics company was losing data engineers mid-project, putting regulated deliverables at risk.",
    solution: "Pulse sentiment scoring and predictive retention models, paired with a dedicated Dhaka people partner and growth pathways.",
    results: [
      { value: "0%", label: "Unplanned attrition" },
      { value: "18 mo", label: "Zero regretted exits" },
      { value: "4.9 / 5", label: "Team engagement" },
    ],
    tags: ["Retention", "Analytics"],
  },
  {
    slug: "datascale",
    client: "DataScale US",
    industry: "Analytics SaaS",
    location: "Austin, TX",
    image: IMAGES.codeScreen,
    challenge: "A fast-growing SaaS company needed a dedicated data platform team but couldn't hire fast enough in Austin.",
    solution: "A six-person data engineering pod with a follow-the-sun delivery model and integrated sprint analytics.",
    results: [
      { value: "12 days", label: "Full pod deployed" },
      { value: "24/7", label: "Delivery cycle" },
      { value: "-31%", label: "Cycle time" },
    ],
    tags: ["Optimization", "Collaboration"],
  },
  {
    slug: "velocity-pay",
    client: "Velocity Pay",
    industry: "Payments",
    location: "New York, NY",
    image: IMAGES.chartsPlanning,
    challenge: "Unpredictable demand spikes left the engineering team constantly behind on roadmap commitments.",
    solution: "Predictive workforce planning tied to the product roadmap, backed by a warm on-demand talent bench.",
    results: [
      { value: "2 mo", label: "Earlier gap warning" },
      { value: "2x", label: "Faster scale-up" },
      { value: "100%", label: "On-time Q3 release" },
    ],
    tags: ["Workforce Planning"],
  },
];

/* ------------------------------------------------------------------ */
/* Talent roles (slider on the US-BD model page)                       */
/* ------------------------------------------------------------------ */

export const TALENT_ROLES = [
  { title: "Full-Stack Engineers", stack: "React · Next.js · Node · Python", tone: TONES.cyan, image: IMAGES.code },
  { title: "AI / ML Engineers", stack: "PyTorch · LLMs · MLOps · RAG", tone: TONES.indigo, image: IMAGES.aiRobot },
  { title: "Data Engineers", stack: "Spark · dbt · Snowflake · Airflow", tone: TONES.blue, image: IMAGES.screenMetrics },
  { title: "Cloud & DevOps", stack: "AWS · GCP · Kubernetes · Terraform", tone: TONES.emerald, image: IMAGES.codeScreen },
  { title: "QA & Automation", stack: "Playwright · Cypress · k6", tone: TONES.amber, image: IMAGES.laptopTyping },
  { title: "Product Designers", stack: "Figma · Design Systems · UX Research", tone: TONES.cyan, image: IMAGES.planningBoard },
];
