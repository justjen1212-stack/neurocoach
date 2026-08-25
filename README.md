# NeuroCoach

Neurodiversity-informed coaching tracker for managers working with AuDHD teams.

## Features

- Firebase Auth (email/password login + account creation)
- Team member management with coaching notes
- 5 ND-informed coaching frameworks: Chemistry, CLEAR, GROW, OSCAR, Johari's Window
- Active session view with question checklists, ND rationale tooltips, and auto-saving notes
- Session history timeline per team member
- Framework progress tracking

## Tech Stack

- Next.js (App Router, TypeScript)
- Firebase Auth + Firestore
- Tailwind CSS
- Inter font (Google Fonts)

## Setup

### 1. Clone and install

```bash
cd neurocoach
npm install
```

### 2. Create a Firebase project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project
3. Enable **Authentication** — go to Authentication > Sign-in method > Email/Password > Enable
4. Enable **Firestore** — go to Firestore Database > Create database (start in test mode for dev)
5. Go to Project Settings > Your apps > Add a web app
6. Copy the config values

### 3. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in your Firebase values:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Set up Firestore indexes

The app uses compound queries. Create these indexes in Firestore:

**teamMembers** collection:
- `managerId` (Ascending) + `createdAt` (Ascending)

**sessions** collection:
- `memberId` (Ascending) + `createdAt` (Descending)
- `managerId` (Ascending) + `memberId` (Ascending) (optional)

You can also let Firestore auto-create them — the first query that needs an index will give you a link in the browser console.

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## App Structure

```
app/
  page.tsx                          Login / sign-up
  dashboard/page.tsx                Team overview grid
  team/
    new/page.tsx                    Add team member
    [id]/
      page.tsx                      Member profile + session history
      session/
        new/page.tsx                Choose framework
        [sessionId]/page.tsx        Active session (questions + notes)

lib/
  firebase.ts                       Firebase app initialisation
  db.ts                             Typed Firestore functions

contexts/
  AuthContext.tsx                   Auth provider + useAuth hook

data/
  questions.ts                      All 5 frameworks with ND-informed questions
```

## Frameworks

| Framework | Best used for |
|-----------|--------------|
| Chemistry Session | First session — rapport and baseline |
| CLEAR Model | Contracting, deep listening, re-contracting |
| GROW Model | Day-to-day challenges and task blockers |
| OSCAR Model | Career development and longer-term growth |
| Johari's Window | Self-awareness, masking, authentic identity |

## Deploying to Vercel

```bash
npx vercel
```

Add your Firebase env vars in Vercel project settings > Environment Variables.

## Firestore Security Rules (recommended for production)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /teamMembers/{memberId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.managerId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.managerId;
    }
    match /sessions/{sessionId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.managerId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.managerId;
    }
  }
}
```
