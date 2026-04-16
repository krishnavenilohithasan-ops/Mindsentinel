# MindSentinel – AI Focus Guardian

MindSentinel is an intelligent web application designed to track, analyze, and prevent burnout through data-driven insights and integrated wellness tools.

## Features
- **Context-Aware AI Chatbot:** Analyzes your Burnout status and provides custom advice.
- **Burnout Analytics Engine:** Calculates mental exhaustion using weighted heuristics (Sleep, Workload, etc).
- **Deep Focus Mode:** Built-in Pomodoro timers to manage healthy routines.
- **Fully Responsive Dashboard:** A cutting-edge dark-themed SaaS interface mimicking glassmorphism.

## Tech Stack
- **Frontend:** React.js, Vite, Tailwind CSS, Lucide React, react-chartjs-2, React Router.
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT Auth.

## Project Structure
```
/frontend    # React Client
/backend     # Express API Server
```

## Setup Instructions

### Environment Variables
1. Create a `.env` inside the `/backend` folder.
2. Add your Mongo URI:
   `MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/mindsentinel`
   `JWT_SECRET=your_super_secret_key`

### Running the Project Locally
**1. Start Backend:**
```bash
cd backend
npm install
npm start
```
**2. Start Frontend:**
```bash
cd frontend
npm install
npm run dev
```

The application will be live at `http://localhost:5173`.
