#  LearnSphere — A Gamified, Progress‑Driven eLearning Platform

**LearnSphere** is a modern, full‑stack **Learning Management System (LMS)** designed to replicate **real‑world online learning platforms** with a strong focus on **user engagement, progress tracking, and gamification**.

Built during a **hackathon**, LearnSphere goes beyond static course delivery by integrating **business logic, learner psychology, and scalable architecture** — making it a product, not just a demo.

---

##  Problem Statement

Most eLearning platforms fail because learners:
- Lose motivation midway
- Don’t track progress clearly
- Lack rewards for consistency
- Feel disconnected from learning outcomes

**LearnSphere solves this** by combining:
- Structured learning flows  
- Gamification (badges, streaks, points)  
- Resume‑from‑progress learning  
- Real‑world LMS access rules  

---

##  Solution Overview

LearnSphere delivers a **habit‑forming learning experience** where learners are encouraged to:
- Learn consistently
- Track visible progress
- Earn achievements
- Stay engaged through feedback and rewards

It mirrors the workflow of platforms like **Coursera, Udemy, and Duolingo**, implemented in a clean, hackathon‑ready architecture.

---

##  Key Features

###  Instructor / Admin (Backoffice)
- Create, edit, and manage courses
- Add lessons (Video, Document, Image, Quiz)
- Publish / unpublish courses
- Configure course access:
  - Open
  - Invitation‑only
  - Paid courses
- Build quizzes with **attempt‑based scoring**
- Invite learners via email
- View learner progress and completion analytics

---

###  Learner Experience
- Browse and enroll in courses
- Resume learning from **last completed lesson**
- Full‑screen immersive lesson player
- Attempt quizzes with **multiple retries**
- Earn **points, badges, and learning streaks**
- Track course completion status
- Rate and review courses

---

##  Gamification System (Core Highlight)

LearnSphere uses **gamification as a motivation engine**, not decoration.

###  Badges
- Automatically unlocked based on learner behavior
- Visually rich, hover‑interactive UI
- Clear explanation of *why* each badge is earned

###  Learning Streaks
- Tracks daily learning consistency
- Displays:
  - Current streak
  - Longest streak
  - Visual activity calendar
- Encourages habit‑based learning

###  Points System

| Level | Points |
|------|--------|
| Newbie | 20 |
| Explorer | 40 |
| Achiever | 60 |
| Specialist | 80 |
| Expert | 100 |
| Master | 120 |

Points are primarily earned through quiz completion and consistent learning.

---

##  Learning Experience Design

### Course Detail Page
- Course overview with progress indicators
- Lesson list with completion status
- Enroll / Buy / Continue Learning actions
- Ratings & reviews section

### Full‑Screen Lesson Player
- Sidebar lesson navigation
- Video / Document / Image support
- Integrated quiz engine
- Next / Back navigation
- Automatic progress synchronization

### Quiz Engine
- One question per step
- Multiple attempts allowed
- Points reduce with each retry
- Completion tied directly to course progress

---

##  Access & Visibility Rules

| Visibility | Access Type | Description |
|----------|------------|-------------|
| Everyone | Open | Public courses |
| Signed In | Invitation | Restricted access |
| Signed In | Paid | Requires purchase |

(Mock payment flow implemented and API‑ready)

---

##  Core Engineering Concepts
- Role‑based access control
- Progress‑driven workflows
- State‑driven UI updates
- Component‑level reusability
- Clean separation of logic and presentation
- API‑ready mock data layer

---

##  Tech Stack

### Frontend
- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **shadcn/ui**
- **Lucide Icons**

### Architecture
- Context API for authentication & user state
- Modular component‑based structure
- Scalable folder organization
- Easily extendable to real backend APIs

---

##  Project Structure

```text
src/
├── components/
│   ├── courses/
│   ├── gamification/
│   ├── ui/
│   └── common/
│
├── pages/
│   ├── DashboardPage.tsx
│   ├── CourseDetailPage.tsx
│   ├── LessonPlayerPage.tsx
│   ├── MyCoursesPage.tsx
│   └── BadgesPage.tsx
│
├── contexts/
│   └── AuthContext.tsx
│
├── data/
│   └── mockData.ts
│
├── types/
│   └── index.ts
│
└── lib/
    └── utils.ts
```

---

##  Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation & Run

```bash
npm install
npm run dev
```

---

##  Why LearnSphere Stands Out

> Not just UI — **real LMS logic**  
> Gamification tied to **learner behavior**  
> Clear learning flow and motivation system  
> Scalable, production‑ready architecture  
> Designed with **product thinking**

---

##  Future Enhancements
- Backend integration (Node.js / Firebase / Supabase)
- Real payment gateway (Stripe / Razorpay)
- Certificate generation
- Advanced analytics dashboard
- Mobile application

---

##  Team
Built with ❤️ during a hackathon, optimized for **clarity, impact, and execution**.

> **LearnSphere isn’t just an eLearning app —  
it’s a habit‑forming learning ecosystem.**

CODING!  CREATION!  INNOVATION!