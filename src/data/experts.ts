/**
 * Expert profiles.
 *
 * CONTENT RULE: only information supported by the client-supplied profiles is
 * used here. Hospital affiliations, years of experience, procedure counts,
 * awards, client lists, statistics and testimonials from the source documents
 * are intentionally NOT reproduced. If something is missing, it is omitted.
 */
import type { EnquiryInterest } from './enquiry'

export type ExpertCategory =
  | 'Doctors'
  | 'Wellness Experts'
  | 'Trainers'
  | 'Nutrition'
  | 'Mental Well-being'
  | 'Sound Healing'

export const EXPERT_CATEGORIES: ExpertCategory[] = [
  'Doctors',
  'Wellness Experts',
  'Trainers',
  'Nutrition',
  'Mental Well-being',
  'Sound Healing',
]

export interface ExpertSection {
  title: string
  items: string[]
}

export interface Expert {
  id: string
  name: string
  /** Credentials line (doctors) or role line (wellness experts). */
  credentials: string
  role: string
  photo: string | null
  photoAlt: string
  categories: ExpertCategory[]
  /** Short focus statement shown on cards. */
  focus: string
  /** Chips on cards. */
  tags: string[]
  /** Additional detail shown in the profile modal. */
  sections: ExpertSection[]
  interest: EnquiryInterest
  /** Stage 2: booking/availability hooks. Unused in Stage 1. */
  bookingEnabled?: false
}

export const EXPERTS: Expert[] = [
  {
    id: 'dr-deepak-gautam',
    name: 'Dr. Deepak Gautam',
    credentials: 'MBBS, MS Orthopaedics (AIIMS New Delhi), FACS',
    role: 'Orthopaedics',
    photo: '/images/experts/deepak-gautam.webp',
    photoAlt: 'Portrait of Dr. Deepak Gautam',
    categories: ['Doctors'],
    focus:
      'Orthopaedics, robotic joint replacement, knee and hip replacement, complex joint reconstruction and trauma.',
    tags: ['Robotic joint replacement', 'Knee & hip replacement', 'Joint reconstruction', 'Trauma'],
    sections: [
      {
        title: 'Areas of interest',
        items: [
          'Robotic knee replacement surgery',
          'Navigated knee and hip replacement',
          'Primary total knee & hip replacement',
          'Revision knee & hip replacement',
          'Unicondylar (partial) knee replacement',
          'Direct Anterior Approach (DAA) total hip replacement',
          'Complex joint reconstruction using allografts',
          'Management of complex trauma & joint infections',
        ],
      },
    ],
    interest: 'Doctor Consultation',
  },
  {
    id: 'dr-nitish-arora',
    name: 'Dr. Nitish Arora',
    credentials:
      'MBBS, MS Orthopaedics, DNB · Fellowship in Limb Reconstruction & Deformity Correction',
    role: 'Orthopaedics',
    photo: '/images/experts/nitish-arora.webp',
    photoAlt: 'Portrait of Dr. Nitish Arora',
    categories: ['Doctors'],
    focus:
      'Paediatric orthopaedics, complex trauma, limb reconstruction, deformity correction and joint preservation.',
    tags: ['Paediatric orthopaedics', 'Limb reconstruction', 'Deformity correction', 'Complex trauma'],
    sections: [
      {
        title: 'Areas of interest',
        items: [
          'Paediatric orthopaedics & developmental deformities',
          'Limb reconstruction & limb lengthening procedures',
          'Deformity correction using Ilizarov techniques',
          'Complex trauma & fracture management',
          'Pelvis & acetabulum injuries',
          'Non-union & infected fracture management',
          'Neuromuscular disorders (cerebral palsy, nerve injuries)',
          'Joint preservation & alignment correction (HTO)',
        ],
      },
    ],
    interest: 'Doctor Consultation',
  },
  {
    id: 'dr-rajesh-shinde',
    name: 'Dr. Rajesh S. Shinde',
    credentials: 'MBBS, MS, MCh, FACS',
    role: 'Surgical Oncology',
    photo: '/images/experts/rajesh-shinde.webp',
    photoAlt: 'Portrait of Dr. Rajesh S. Shinde',
    categories: ['Doctors'],
    focus:
      'Surgical oncology — gastrointestinal, hepatopancreatobiliary, colorectal and thoracic oncology.',
    tags: ['Surgical oncology', 'GI & HPB', 'Colorectal', 'Thoracic'],
    sections: [
      {
        title: 'Clinical expertise',
        items: [
          'Robotic cancer surgeries',
          'Complex pancreatic and HPB surgeries',
          'Neuroendocrine tumours',
          'Stomach cancer surgery',
          'Major liver resections',
          'Gall bladder and bile duct surgeries',
          'Colorectal cancer surgery',
          'HIPEC and PIPAC',
          'Thoracic surgeries including oesophageal resections',
          'Lung and mediastinal tumour resections',
          'Multivisceral and retroperitoneal tumour resections',
        ],
      },
    ],
    interest: 'Doctor Consultation',
  },
  {
    id: 'dr-sanjeev-kumar-kalkekar',
    name: 'Dr. Sanjeev Kumar Kalkekar',
    credentials: 'MD (Gen. Med), DNB (Cardiology)',
    role: 'Cardiology',
    photo: '/images/experts/sanjeev-kalkekar.webp',
    photoAlt: 'Portrait of Dr. Sanjeev Kumar Kalkekar',
    categories: ['Doctors'],
    focus: 'Interventional cardiology, structural heart disease and rhythm disorders.',
    tags: ['Interventional cardiology', 'Structural heart disease', 'Rhythm disorders'],
    sections: [
      {
        title: 'Areas of special interest',
        items: [
          'Primary angioplasty',
          'Radial & femoral angiography & angioplasty',
          'Renal angioplasty',
          'Permanent pacemaker implantation',
          'Device closure of ASD / PDA',
          'IVC filter implantation',
          'Balloon mitral valvuloplasty',
          'Balloon aortic / pulmonary valvuloplasty',
        ],
      },
    ],
    interest: 'Doctor Consultation',
  },
  {
    id: 'dr-rohini-khera-bhatt',
    name: 'Dr. Rohini Khera Bhatt',
    credentials: 'MBBS, MS (Gold Medalist), DNB (Obstetrics & Gynecology), MRCOG (UK)',
    role: 'Obstetrics & Gynaecology',
    photo: '/images/experts/rohini-khera-bhatt.webp',
    photoAlt: 'Portrait of Dr. Rohini Khera Bhatt',
    categories: ['Doctors'],
    focus: 'Obstetrics, gynaecology, minimally invasive and robotic gynaecological surgery.',
    tags: ['Obstetrics', 'Gynaecology', 'Minimally invasive surgery', 'Robotic surgery'],
    sections: [
      {
        title: 'Areas of expertise',
        items: [
          'High-risk pregnancies',
          'Advanced laparoscopic & minimally invasive gynaecological surgery',
          'Hysteroscopic surgeries',
          'Infertility & reproductive health',
          'Antenatal care',
          'High-risk obstetrics',
          'Treatment & surgery for fibroid uterus and endometriosis',
          'Medical termination of pregnancy',
          'Perimenopausal & postmenopausal bleeding disorders',
        ],
      },
    ],
    interest: 'Doctor Consultation',
  },
  {
    id: 'kunjan-paul',
    name: 'Kunjan Paul',
    credentials: 'Corporate Wellness · CPR & First Aid · Nutrition · Sound Healing',
    role: 'Wellness Expert & Trainer',
    photo: '/images/experts/kunjan-paul.webp',
    photoAlt: 'Portrait of Kunjan Paul',
    categories: ['Wellness Experts', 'Trainers', 'Nutrition', 'Mental Well-being', 'Sound Healing'],
    focus:
      'CPR & first aid training, mental well-being, stress management, nutrition, corporate wellness and sound healing.',
    tags: [
      'CPR & First Aid Training',
      'Mental Well-being',
      'Stress Management',
      'Nutrition',
      'Corporate Wellness',
      'Sound Healing',
      'Breathwork',
      'Guided Relaxation',
    ],
    sections: [
      {
        title: 'Roles',
        items: [
          'Corporate CPR, AED & First Aid Trainer',
          'Mental Health Coach, Stress Management Expert & Corporate Wellness Facilitator',
          'Nutritionist & Corporate Wellness Consultant',
          'Sound Healing Facilitator & Therapist',
        ],
      },
      {
        title: 'CPR & First Aid training',
        items: [
          'Adult, child and infant CPR',
          'AED awareness',
          'Scene safety, recovery position and emergency response protocol',
          'Choking, bleeding, burns, fractures & sprains',
          'Scenario-based learning with hands-on practice',
        ],
      },
      {
        title: 'Mental well-being sessions',
        items: [
          'Managing stress',
          'Emotional resilience at work',
          'Burnout prevention',
          'Mindfulness for busy professionals',
          'Work-life balance',
          'Mental health awareness',
        ],
      },
      {
        title: 'Nutrition support',
        items: [
          '1:1 nutrition consultations',
          'Group nutrition awareness trainings',
          'Workplace nutrition talks',
          'BMI & body composition awareness',
        ],
      },
      {
        title: 'Sound healing',
        items: [
          'Sound meditation',
          'Breathwork',
          'Guided relaxation',
          '1:1 sessions, group sound baths and corporate sessions',
        ],
      },
      {
        title: 'Qualifications (as listed in supplied profiles)',
        items: [
          'Indian Red Cross Society, Mumbai — Basics of First Aid & CPR',
          'Diploma in Ayurvedic Diet & Nutrition',
          'Certificate course in Diet Planning',
          'Yoga Alliance — 30-hour Sound Healing course',
          'Diploma in Yogic Therapy, Natural Living & Naturopathy',
          'M.A. Yogashastra',
        ],
      },
    ],
    interest: 'Corporate Wellness',
  },
]

export function expertsInCategory(category: ExpertCategory | 'All') {
  return category === 'All' ? EXPERTS : EXPERTS.filter((e) => e.categories.includes(category))
}
