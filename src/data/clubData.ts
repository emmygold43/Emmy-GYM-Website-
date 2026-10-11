export interface TrainingProgram {
  id: string;
  number: string;
  title: string;
  description: string;
  level: string;
  benefits: string[];
  duration: string;
  recommendedFor: string;
}

export interface ScheduleItem {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string;
  programTitle: string;
  level: string;
  levelTag: 'ALL LEVELS' | 'BEGINNER' | 'INTERMEDIATE' | 'FIGHTER PRO';
  coach: string;
  duration: string;
  spotsTotal: number;
  spotsLeft: number;
  status: 'Confirmed' | 'Subject to Coach Confirmation';
}

export interface MembershipTier {
  id: string;
  name: string;
  badge?: string;
  description: string;
  priceNote: string;
  benefits: string[];
  sessionAllowance: string;
  isPopular?: boolean;
}

export interface CoachProfile {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  bio: string;
  image: string;
}

export interface ClubBusinessInfo {
  brandName: string;
  assistantName: string;
  tagline: string;
  headline: string;
  supportCopy: string;
  freeIntroOffer: {
    title: string;
    description: string;
    includes: string[];
    isFree: boolean;
  };
  contact: {
    statusNote: string;
    email: string;
    phone: string;
    address: string;
    openingHours: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
  };
  coreValues: Array<{
    title: string;
    description: string;
  }>;
}

export const CLUB_BUSINESS_INFO: ClubBusinessInfo = {
  brandName: "EMMY Boxing Club",
  assistantName: "EMMY AI",
  tagline: "DISCIPLINE / STRENGTH / RESULTS",
  headline: "MORE THAN JUST A GYM.",
  supportCopy: "At EMMY Boxing Club, we build stronger bodies, sharper minds, and greater confidence. Whether you're a beginner or a seasoned fighter, this is where your journey gets real.",
  freeIntroOffer: {
    title: "Complimentary First Training Session",
    description: "Experience EMMY Boxing Club with zero upfront commitment. Work with an experienced trainer, learn boxing fundamentals, and tour our training facility.",
    includes: [
      "1-on-1 technique assessment with a head coach",
      "Full 50-minute structured boxing workout",
      "Access to boxing gloves & hand wraps if needed",
      "Personalized training recommendation"
    ],
    isFree: true,
  },
  contact: {
    statusNote: "Official club facility & contact channels",
    email: "contact@emmyboxingclub.com",
    phone: "+1 (800) 555-EMMY",
    address: "Olympic Boulevard & Athletic District, Suite 100",
    openingHours: {
      weekdays: "06:00 AM – 09:30 PM",
      saturday: "07:30 AM – 07:00 PM",
      sunday: "08:00 AM – 04:00 PM",
    },
  },
  coreValues: [
    {
      title: "Discipline & Consistency",
      description: "True athletic transformation is earned through everyday habits and focused repetition inside and outside the ring."
    },
    {
      title: "Uncompromising Technique",
      description: "We teach authentic sweet science: guard placement, balance, footwork, and biomechanics before heavy power."
    },
    {
      title: "Athletic Conditioning",
      description: "Condition your cardiovascular endurance, functional explosive power, core stability, and mental fortitude."
    },
    {
      title: "Supportive Culture",
      description: "An inclusive, high-respect community where beginners and competitive fighters sweat together with mutual encouragement."
    }
  ]
};

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: "boxing-fundamentals",
    number: "01",
    title: "Boxing Fundamentals",
    description: "Learn the foundations of boxing, including stance, guard, footwork, basic punches, combinations, and defensive movement.",
    level: "Beginner-Friendly",
    benefits: [
      "Boxing fundamentals & proper stance",
      "Technique, footwork and coordination",
      "Confidence, discipline and core conditioning"
    ],
    duration: "50 mins",
    recommendedFor: "Newcomers, beginners, and anyone refining classical boxing form"
  },
  {
    id: "heavy-bag-conditioning",
    number: "02",
    title: "Heavy Bag Conditioning",
    description: "Improve stamina, punching technique, power, rhythm, and conditioning through structured heavy-bag workouts.",
    level: "All Fitness Levels",
    benefits: [
      "Refined punching technique & rotational power",
      "High-intensity cardiovascular fitness",
      "Full-body conditioning & stress release"
    ],
    duration: "45 mins",
    recommendedFor: "Members seeking maximum calorie burn, punching power, and endurance"
  },
  {
    id: "championship-sparring",
    number: "03",
    title: "Championship Sparring",
    description: "A structured sparring-focused program designed to help appropriately prepared participants improve timing, distance management, defence, and ring awareness.",
    level: "Prerequisite Required (Safety Evaluated)",
    benefits: [
      "Defensive awareness, head movement and slips",
      "Timing, range, and distance management",
      "Ring confidence under coach supervision"
    ],
    duration: "60 mins",
    recommendedFor: "Intermediate & advanced boxers who meet coach readiness and safety gear standards"
  },
  {
    id: "fighters-strength-conditioning",
    number: "04",
    title: "Fighter's Strength & Conditioning",
    description: "Develop strength, power, mobility, and conditioning to support boxing performance and general athletic development.",
    level: "Adaptable to Ability",
    benefits: [
      "Functional strength and explosive rotational power",
      "Mobility, joint stability and fluid movement",
      "Athletic conditioning & injury prevention"
    ],
    duration: "55 mins",
    recommendedFor: "Boxers and fitness enthusiasts aiming to build lean athletic resilience"
  },
  {
    id: "youth-boxing-academy",
    number: "05",
    title: "Youth Boxing Academy",
    description: "An age-appropriate training pathway that introduces young participants to boxing fundamentals, coordination, confidence, discipline, and healthy exercise habits.",
    level: "Youth (Subject to Club Age Policy)",
    benefits: [
      "Motor coordination, agility and movement",
      "Confidence, focus and positive discipline",
      "Age-appropriate fitness & healthy sportsmanship"
    ],
    duration: "45 mins",
    recommendedFor: "Young athletes learning respect, focus, and fundamental athletic agility"
  },
  {
    id: "boxing-fitness-endurance",
    number: "06",
    title: "Boxing Fitness & Endurance",
    description: "Build stamina, improve cardiovascular fitness, develop coordination, and sharpen boxing technique through energetic boxing-inspired workouts.",
    level: "All Levels (Modifications Available)",
    benefits: [
      "Cardiovascular endurance and high-output stamina",
      "Full-body conditioning & muscular tone",
      "Rhythm, footwork drills and agility"
    ],
    duration: "50 mins",
    recommendedFor: "Anyone wanting a high-energy boxing workout without contact"
  }
];

export const TRAINING_SCHEDULE: ScheduleItem[] = [
  // Monday (matching reference image)
  { id: "m1", day: "Monday", time: "06:00 AM", programTitle: "HEAVY BAG CONDITIONING", level: "All Levels", levelTag: "ALL LEVELS", coach: "Coach Maya Lin", duration: "55 min duration", spotsTotal: 18, spotsLeft: 3, status: "Confirmed" },
  { id: "m2", day: "Monday", time: "07:30 AM", programTitle: "BOXING FUNDAMENTALS", level: "Beginner", levelTag: "BEGINNER", coach: "Coach Marcus Vance", duration: "55 min duration", spotsTotal: 16, spotsLeft: 6, status: "Confirmed" },
  { id: "m3", day: "Monday", time: "12:00 PM", programTitle: "FIGHTER'S STRENGTH & CONDITIONING", level: "Intermediate", levelTag: "INTERMEDIATE", coach: "Coach Jamal Washington", duration: "55 min duration", spotsTotal: 14, spotsLeft: 4, status: "Confirmed" },
  { id: "m4", day: "Monday", time: "05:30 PM", programTitle: "HEAVY BAG CONDITIONING", level: "All Levels", levelTag: "ALL LEVELS", coach: "Coach Elena Rostova", duration: "55 min duration", spotsTotal: 18, spotsLeft: 2, status: "Confirmed" },
  { id: "m5", day: "Monday", time: "07:00 PM", programTitle: "CHAMPIONSHIP SPARRING", level: "Fighter Pro", levelTag: "FIGHTER PRO", coach: "Coach Marcus Vance", duration: "55 min duration", spotsTotal: 10, spotsLeft: 1, status: "Confirmed" },

  // Tuesday
  { id: "t1", day: "Tuesday", time: "06:00 AM", programTitle: "BOXING FITNESS & ENDURANCE", level: "All Levels", levelTag: "ALL LEVELS", coach: "Coach Maya Lin", duration: "50 min duration", spotsTotal: 18, spotsLeft: 5, status: "Confirmed" },
  { id: "t2", day: "Tuesday", time: "07:30 AM", programTitle: "BOXING FUNDAMENTALS", level: "Beginner", levelTag: "BEGINNER", coach: "Coach Darius Sterling", duration: "55 min duration", spotsTotal: 16, spotsLeft: 8, status: "Confirmed" },
  { id: "t3", day: "Tuesday", time: "12:00 PM", programTitle: "HEAVY BAG CONDITIONING", level: "All Levels", levelTag: "ALL LEVELS", coach: "Coach Elena Rostova", duration: "55 min duration", spotsTotal: 18, spotsLeft: 4, status: "Confirmed" },
  { id: "t4", day: "Tuesday", time: "04:30 PM", programTitle: "YOUTH BOXING ACADEMY", level: "Beginner", levelTag: "BEGINNER", coach: "Coach Darius Sterling", duration: "45 min duration", spotsTotal: 12, spotsLeft: 3, status: "Confirmed" },
  { id: "t5", day: "Tuesday", time: "06:30 PM", programTitle: "FIGHTER'S STRENGTH & CONDITIONING", level: "Intermediate", levelTag: "INTERMEDIATE", coach: "Coach Jamal Washington", duration: "55 min duration", spotsTotal: 14, spotsLeft: 2, status: "Confirmed" },

  // Wednesday
  { id: "w1", day: "Wednesday", time: "06:00 AM", programTitle: "HEAVY BAG CONDITIONING", level: "All Levels", levelTag: "ALL LEVELS", coach: "Coach Elena Rostova", duration: "55 min duration", spotsTotal: 18, spotsLeft: 4, status: "Confirmed" },
  { id: "w2", day: "Wednesday", time: "07:30 AM", programTitle: "BOXING FUNDAMENTALS", level: "Beginner", levelTag: "BEGINNER", coach: "Coach Marcus Vance", duration: "55 min duration", spotsTotal: 16, spotsLeft: 7, status: "Confirmed" },
  { id: "w3", day: "Wednesday", time: "12:00 PM", programTitle: "FIGHTER'S STRENGTH & CONDITIONING", level: "Intermediate", levelTag: "INTERMEDIATE", coach: "Coach Jamal Washington", duration: "55 min duration", spotsTotal: 14, spotsLeft: 5, status: "Confirmed" },
  { id: "w4", day: "Wednesday", time: "05:30 PM", programTitle: "BOXING FITNESS & ENDURANCE", level: "All Levels", levelTag: "ALL LEVELS", coach: "Coach Maya Lin", duration: "55 min duration", spotsTotal: 18, spotsLeft: 3, status: "Confirmed" },
  { id: "w5", day: "Wednesday", time: "07:00 PM", programTitle: "CHAMPIONSHIP SPARRING", level: "Fighter Pro", levelTag: "FIGHTER PRO", coach: "Coach Marcus Vance", duration: "55 min duration", spotsTotal: 10, spotsLeft: 2, status: "Confirmed" },

  // Thursday
  { id: "th1", day: "Thursday", time: "06:00 AM", programTitle: "BOXING FITNESS & ENDURANCE", level: "All Levels", levelTag: "ALL LEVELS", coach: "Coach Maya Lin", duration: "50 min duration", spotsTotal: 18, spotsLeft: 6, status: "Confirmed" },
  { id: "th2", day: "Thursday", time: "07:30 AM", programTitle: "BOXING FUNDAMENTALS", level: "Beginner", levelTag: "BEGINNER", coach: "Coach Darius Sterling", duration: "55 min duration", spotsTotal: 16, spotsLeft: 9, status: "Confirmed" },
  { id: "th3", day: "Thursday", time: "12:00 PM", programTitle: "HEAVY BAG CONDITIONING", level: "All Levels", levelTag: "ALL LEVELS", coach: "Coach Elena Rostova", duration: "55 min duration", spotsTotal: 18, spotsLeft: 5, status: "Confirmed" },
  { id: "th4", day: "Thursday", time: "04:30 PM", programTitle: "YOUTH BOXING ACADEMY", level: "Beginner", levelTag: "BEGINNER", coach: "Coach Darius Sterling", duration: "45 min duration", spotsTotal: 12, spotsLeft: 2, status: "Confirmed" },
  { id: "th5", day: "Thursday", time: "06:30 PM", programTitle: "FIGHTER'S STRENGTH & CONDITIONING", level: "Intermediate", levelTag: "INTERMEDIATE", coach: "Coach Jamal Washington", duration: "55 min duration", spotsTotal: 14, spotsLeft: 3, status: "Confirmed" },

  // Friday
  { id: "f1", day: "Friday", time: "06:00 AM", programTitle: "HEAVY BAG CONDITIONING", level: "All Levels", levelTag: "ALL LEVELS", coach: "Coach Maya Lin", duration: "55 min duration", spotsTotal: 18, spotsLeft: 4, status: "Confirmed" },
  { id: "f2", day: "Friday", time: "07:30 AM", programTitle: "BOXING FUNDAMENTALS", level: "Beginner", levelTag: "BEGINNER", coach: "Coach Marcus Vance", duration: "55 min duration", spotsTotal: 16, spotsLeft: 5, status: "Confirmed" },
  { id: "f3", day: "Friday", time: "12:00 PM", programTitle: "HEAVY BAG CONDITIONING", level: "All Levels", levelTag: "ALL LEVELS", coach: "Coach Elena Rostova", duration: "55 min duration", spotsTotal: 18, spotsLeft: 2, status: "Confirmed" },
  { id: "f4", day: "Friday", time: "06:00 PM", programTitle: "BOXING FITNESS & ENDURANCE", level: "All Levels", levelTag: "ALL LEVELS", coach: "Coach Maya Lin", duration: "55 min duration", spotsTotal: 18, spotsLeft: 1, status: "Confirmed" },

  // Saturday
  { id: "sa1", day: "Saturday", time: "08:30 AM", programTitle: "BOXING FUNDAMENTALS (COMMUNITY)", level: "Beginner", levelTag: "BEGINNER", coach: "Coach Marcus Vance", duration: "60 min duration", spotsTotal: 20, spotsLeft: 7, status: "Confirmed" },
  { id: "sa2", day: "Saturday", time: "10:00 AM", programTitle: "FIGHTER'S STRENGTH & CONDITIONING", level: "Intermediate", levelTag: "INTERMEDIATE", coach: "Coach Jamal Washington", duration: "55 min duration", spotsTotal: 16, spotsLeft: 4, status: "Confirmed" },
  { id: "sa3", day: "Saturday", time: "11:30 AM", programTitle: "HEAVY BAG CONDITIONING", level: "All Levels", levelTag: "ALL LEVELS", coach: "Coach Elena Rostova", duration: "55 min duration", spotsTotal: 18, spotsLeft: 3, status: "Confirmed" },
  { id: "sa4", day: "Saturday", time: "01:00 PM", programTitle: "CHAMPIONSHIP SPARRING", level: "Fighter Pro", levelTag: "FIGHTER PRO", coach: "Coach Marcus Vance", duration: "60 min duration", spotsTotal: 10, spotsLeft: 2, status: "Confirmed" },

  // Sunday
  { id: "su1", day: "Sunday", time: "09:30 AM", programTitle: "BOXING RECOVERY & MOBILITY", level: "All Levels", levelTag: "ALL LEVELS", coach: "Coach Maya Lin", duration: "50 min duration", spotsTotal: 16, spotsLeft: 6, status: "Confirmed" },
  { id: "su2", day: "Sunday", time: "11:00 AM", programTitle: "OPEN GYM & BAG TRAINING", level: "All Levels", levelTag: "ALL LEVELS", coach: "Coach Elena Rostova", duration: "75 min duration", spotsTotal: 25, spotsLeft: 9, status: "Confirmed" },
];

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: "starter",
    name: "Club Starter",
    description: "Ideal for beginners and fitness enthusiasts attending 2 focused boxing sessions per week.",
    priceNote: "Flexible monthly enrolment • Free intro session applicable",
    sessionAllowance: "8 Structured Sessions / Month",
    benefits: [
      "Access to Boxing Fundamentals & Bag Conditioning",
      "Locker room & private shower amenities",
      "EMMY Club mobile booking access",
      "Initial 1-on-1 technique orientation"
    ],
    isPopular: false
  },
  {
    id: "unlimited-athlete",
    name: "Championship Unlimited",
    badge: "MOST POPULAR",
    description: "Full unlimited access to all coaching programs, open ring hours, and conditioning facilities.",
    priceNote: "Unlimited monthly training • Free intro session applicable",
    sessionAllowance: "Unlimited Classes & Facility Access",
    benefits: [
      "Unlimited access to all 6 training programs",
      "Open ring, heavy bag room & speed bag zone access",
      "Eligible for Championship Sparring (upon coach clearance)",
      "Priority spot reservation in peak evening classes",
      "10% member privilege on official club gear"
    ],
    isPopular: true
  },
  {
    id: "fighter-elite",
    name: "Elite Performance & 1-on-1",
    description: "Designed for serious athletes requiring dedicated private mitt-work, periodization, and high-performance training.",
    priceNote: "Custom training program • Free intro session applicable",
    sessionAllowance: "Unlimited Access + 4 Private 1-on-1 Sessions / Month",
    benefits: [
      "All Championship Unlimited package privileges",
      "4 dedicated 1-on-1 technical pad-work sessions monthly",
      "Bi-weekly video analysis & tactical movement review",
      "Custom fight conditioning & nutrition strategy",
      "Complimentary hand wrapping service before sessions"
    ],
    isPopular: false
  }
];

export const COACHES: CoachProfile[] = [
  {
    id: "c1",
    name: "Marcus Vance",
    role: "Head Boxing Coach & Technical Director",
    specialties: ["Classical Sweet Science", "Counter-Punching", "Footwork Biomechanics"],
    bio: "Marcus brings over 18 years of ringside experience. Known for his disciplined approach to defensive footwork and head movement, he has mentored amateur champions and complete beginners alike.",
    image: "/src/assets/images/boxing_pad_training_1791741340189.jpg"
  },
  {
    id: "c2",
    name: "Elena Rostova",
    role: "Lead Fighter Conditioning & Heavy Bag Specialist",
    specialties: ["Rotational Power", "High-Volume Stamina", "Kinetic Chain Conditioning"],
    bio: "A relentless competitor and certified combat sports conditioning coach, Elena structures high-tempo conditioning regimens that push cardiovascular thresholds and sharpen punch velocity.",
    image: "/src/assets/images/heavy_bag_strike_1791741360299.jpg"
  },
  {
    id: "c3",
    name: "Darius Sterling",
    role: "Youth Academy Lead & Fundamentals Coach",
    specialties: ["Youth Athletic Agility", "Fundamentals Mastery", "Rhythm & Coordination"],
    bio: "Darius focuses on patient, high-clarity technical instruction. He instills self-belief, sportsmanship, and sharp foundational mechanics in beginners and developing youth athletes.",
    image: "/src/assets/images/boxing_wraps_focus_1791741377668.jpg"
  }
];

export const COMMUNITY_PILLARS = [
  {
    number: "01",
    title: "Zero Ego, Pure Work",
    description: "The moment you cross the threshold, rank and pretension stay outside. Every athlete respects the grind."
  },
  {
    number: "02",
    title: "Technique Before Power",
    description: "True power flows from balance, leverage, and clean mechanics. We build fighters who think as fast as they strike."
  },
  {
    number: "03",
    title: "Real People, Real Progress",
    description: "From day-one fitness novices to seasoned combat athletes, everyone works together under genuine coaching."
  }
];
