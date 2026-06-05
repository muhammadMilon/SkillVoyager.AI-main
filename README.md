# SkillVoyager.AI – Your AI-Powered Learning Journey

## 🚀 Project Overview

SkillVoyager.AI is an AI-powered web application that generates **personalized learning and career roadmaps**.  
Powered by the **Gemini API** (planned), it will analyze current skills, identify gaps, and create adaptive, step-by-step roadmaps with milestones, course recommendations, and progress tracking.  
Static features like trending skills and learning tips provide guidance for all users, even before login.

---

## 🎯 Project Type

**AI-Powered Personalized Learning & Career Roadmap Web Application**

---

## ✨ Core Features

### 🔹 Dynamic (AI-powered – planned)
1. AI Skill Gap Analysis  
2. Personalized Roadmap Generation  
3. Adaptive Roadmap Updates  
4. AI-Based Course Recommendations  
5. Skill Assessment Quizzes (AI-Generated)  
6. AI Feedback Loop  
7. Progress Tracking Dashboard  

### 🔹 Static / Implemented
8. All Learners Leaderboard  
9. Top Trending Skills & Roadmaps  
10. Learning Tips & Resources Section  
11. **Roadmaps** – My Roadmaps list, single roadmap view, milestone detail, roadmap generator (TypeScript)  
12. **Auth** – Email/password + Google sign-in (Firebase), private routes, settings  

---

## 👥 Target Sector

- **EdTech / Career Development**  
- **Users:** Students, self-learners, fresh graduates, professionals seeking skill upgrades  

---

## 🛠️ Tech Stack

| Layer            | Technology                     | Purpose |
|------------------|--------------------------------|---------|
| Frontend         | React 19 + Vite 7              | SPA, dynamic UI, dashboard, forms |
| UI               | JSX + TSX, Tailwind CSS 4      | Components, styling |
| Routing          | React Router v7                | Client-side routing |
| Auth             | Firebase Auth                  | Sign-up, login, Google sign-in |
| State            | React Context API              | App-wide state (auth) |
| Backend          | Node.js + Express 5            | REST API server |
| Database         | MongoDB (planned)              | Users, skills, progress |
| AI               | Gemini API (planned)           | Skill gap, roadmap, recommendations |

---

## 📁 Project Structure

```
SkillVoyager.AI/
├── frontend/                 # React SPA (Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/       
│   │   │   ├── Navbar.jsx, Navbar.css
│   │   │   ├── Login.jsx, Register.jsx
│   │   │   ├── Dashboard.jsx, Settings.jsx
│   │   │   ├── PrivateRoute.jsx, Logo.jsx
│   │   ├── firebase/
│   │   │   └── firebase.init.js
│   │   ├── pages/            # Feature-based pages
│   │   │   ├── Dashboard/     # ProgressDashboard, ProgressCard, ProgressBar
│   │   │   ├── Onboarding/   # OnboardingFlow, Step* components
│   │   │   ├── Roadmaps/     # Roadmap.tsx, MyRoadmaps.tsx, MilestoneDetail.tsx
│   │   │   └── TipsResources/# TipsResources, TipsList, BookmarkButton
│   │   ├── providers/
│   │   │   └── AuthProvider.jsx
│   │   ├── App.jsx, App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/                  # Express API
│   ├── server.js             # Entry, CORS, JSON, root route
│   ├── package.json
│   └── .gitignore
│
└── README.md
```

---

## 🧩 MVP (Minimum Viable Product)

- [x] User signup/login (Firebase: email + Google)  
- [x] **Feature 1: Progress Tracking Dashboard** - Full Stack implementation with real-time progress data
- [x] **Feature 2: Learning Tips & Resources Section** - Full Stack with bookmark functionality
- [x] **Feature 3: Onboarding Flow & Profile Setup** - Multi-step onboarding with data persistence
- [ ] Input current skills & career goals  
- [ ] AI-generated personalized roadmap with milestones  
- [x] Dashboard to track progress (UI + Backend APIs)  
- [x] Static sections for trending skills and learning tips  
- [x] Roadmap pages: My Roadmaps, single roadmap, milestone detail (TSX)  

---

## 🎯 Implemented Features (Kakoly's Tasks)

### ✅ Feature 1: Progress Tracking Dashboard (Full Stack)
**Problem:** Progress, milestones, and estimated time were not centralized.  
**Solution:** Real-time dashboard with progress charts, milestone status, and estimated completion days.

**Backend APIs:**
- `GET /api/user/progress/:userId` - Fetch user's roadmap progress
- `GET /api/user/progress/summary/:userId` - Get weekly goals, streak, and recent activity

**Frontend:**
- `/progress` route - Complete dashboard with stats cards, progress bars, roadmap tracking
- Components: `ProgressDashboard.jsx`, `ProgressCard.jsx`, `ProgressBar.jsx`

### ✅ Feature 2: Learning Tips & Resources Section (Full Stack)
**Problem:** Tips/resources were static; needed updates and user bookmarks.  
**Solution:** Dynamic tips/resources from database with bookmark functionality.

**Backend APIs:**
- `GET /api/tips` - Fetch all learning tips
- `GET /api/resources` - Fetch all learning resources
- `GET /api/user/bookmarks/:userId` - Get user's bookmarked items
- `POST /api/user/bookmarks/:userId` - Add bookmark
- `DELETE /api/user/bookmarks/:userId` - Remove bookmark

**Frontend:**
- `/tips-resources` route - Tips and resources with category filtering
- Components: `TipsResources.jsx`, `TipsList.jsx`, `BookmarkButton.jsx`

### ✅ Feature 3: Onboarding Flow & Profile Setup (Full Stack)
**Problem:** New users couldn't set goals/skills/timeline in one setup.  
**Solution:** Multi-step onboarding (role, education, skills, target career, timeline); data saved to profile/roadmap.

**Backend APIs:**
- `POST /api/user/onboarding/:userId` - Save onboarding data
- `GET /api/user/profile/:userId` - Get user profile

**Frontend:**
- `/onboarding` route - 3-step onboarding flow with progress indicator
- Components: `OnboardingFlow.jsx`, `StepIndicator.jsx`, `StepRole.jsx`, `StepSkills.jsx`, `StepCareerTimeline.jsx`  

---

## 🌟 Unique Selling Proposition (USP)

SkillVoyager.AI delivers **career-aligned, AI-powered learning roadmaps** that adapt continuously to user performance.  
Unlike static platforms, it provides **dynamic, actionable, and personalized pathways** with integrated progress tracking and curated resources.

---

## ⚙️ Installation & Setup

### Prerequisites

- **Node.js** (v18+ recommended)  
- **npm** or **yarn**

### 1. Clone the repository

```bash
git clone https://github.com/muhammadMilon/SkillVoyager.AI.git
cd SkillVoyager.AI
```

### 2. Frontend

```bash
cd frontend
npm install
```

Create a `.env` (or `.env.local`) file in `frontend/` with your Firebase config:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Run the dev server:

```bash
npm run dev
```

Frontend will be available at `http://localhost:5173` (or the port Vite shows).

**Frontend scripts**

| Command        | Description           |
|----------------|-----------------------|
| `npm run dev`  | Start Vite dev server |
| `npm run build`| Production build      |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint            |

### 3. Backend

In a separate terminal:

```bash
cd backend
npm install
```

Optional: create a `.env` in `backend/` if you need to override the port:

```env
PORT=8000
```

Start the server:

```bash
node server.js
```

Or add a script in `backend/package.json` and run:

```bash
npm run server
```

Backend root: `http://localhost:8000` – returns *"SkillVoyager AI Backend Server is Running!"*

---

## 🛣️ Current Routes (Frontend)

| Path              | Component / Content           | Protected |
|-------------------|-------------------------------|-----------|
| `/`               | App (Landing page)           | No        |
| `/about`          | About placeholder             | No        |
| `/register`       | Register                      | No        |
| `/login`          | Login                         | No        |
| `/contact`        | Contact page                  | No        |
| `/dashboard`      | Dashboard                     | Yes       |
| `/settings`       | Settings                      | Yes       |
| `/progress`       | Progress Tracking Dashboard   | Yes       |
| `/tips-resources` | Learning Tips & Resources     | No        |
| `/onboarding`     | Onboarding Flow (3 steps)     | Yes       |

---

## 🚀 How to Run the Complete Application

### Step 1: Start Backend Server

```bash
cd backend
node server.js
```

Backend will run on `http://localhost:8000`

### Step 2: Start Frontend Dev Server

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173` (or 5174 if 5173 is busy)

### Step 3: Access the Application

- **Landing Page:** `http://localhost:5173/`
- **Progress Dashboard:** `http://localhost:5173/progress` (login required)
- **Tips & Resources:** `http://localhost:5173/tips-resources`
- **Onboarding:** `http://localhost:5173/onboarding` (login required)
- **Contact:** `http://localhost:5173/contact`

---

## 🔐 Environment Variables

| Variable                     | Where   | Purpose                |
|-----------------------------|---------|------------------------|
| `VITE_FIREBASE_*`           | frontend| Firebase Auth config   |
| `PORT`                      | backend | Server port (default 8000) |

---

## 📜 License & Contributing

- Repository: [GitHub – SkillVoyager.AI](https://github.com/muhammadMilon/SkillVoyager.AI)  
- For contribution guidelines and license, see the repository.

---

*SkillVoyager.AI – Your AI-Powered Learning Journey*
