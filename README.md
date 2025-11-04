# 📝 ReSuMeCraft – Smart Resume Builder

A modern and user-friendly **Resume Builder Web Application** that allows users to create, customize, preview, and download professional resumes with ease. The platform provides multiple elegant templates, realtime editing, and a smooth UI experience.

> Built using **React + Node.js + Express + PostgreSQL**.

## 🚀 Features

- ✅ User Authentication (Register / Login)
- 🎨 Choose from **multiple elegant resume templates**
- ✍️ Dynamic form to input professional and personal details
- 👀 **Live Preview** while editing
- 📥 **Download resume as PDF**
- 🗂️ **Dashboard** to manage your saved resumes
- ⚡ Fast and responsive UI with **Vite + React**

## 🏛️ Project Structure

```
shubh-2025-resume/
├── Backend/
│   ├── db.js
│   ├── error.js
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   ├── controllers/
│   │   ├── dashboardHandler.js
│   │   ├── editHandler.js
│   │   ├── generateHandler.js
│   │   ├── homeHandler.js
│   │   ├── loginHandler.js
│   │   ├── registerHandler.js
│   │   ├── resumeHandler.js
│   │   └── userresumesHandler.js
│   ├── middlewares/
│   │   └── verifier.js
│   └── routes/
│       └── routes.js
│
├── Frontend/
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── Auth.jsx
│       ├── Create.jsx
│       ├── Curvedloop.jsx
│       ├── Dashboard.jsx
│       ├── DownloadButton.jsx
│       ├── Footer.jsx
│       ├── Generated.jsx
│       ├── index.css
│       ├── Landing.jsx
│       ├── main.jsx
│       ├── Navbar.jsx
│       ├── Preview.jsx
│       ├── ResumeForm.jsx
│       ├── Template1.jsx
│       ├── Template2.jsx
│       └── Template3.jsx
│
└── .vite/
```

## 🛠️ Tech Stack

| Layer       | Technology Used |
|------------|----------------|
| Frontend   | React, Vite, TailwindCSS / Custom CSS |
| Backend    | Node.js, Express.js |
| Database   | PostgreSQL (Supabase) |
| Auth       | JWT (JSON Web Tokens) |
| Utilities  | HTML2Canvas, jsPDF |

## 💻 Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Shubh-2025/ReSuMe.git
cd ReSuMe
```

### 2️⃣ Backend Setup
```bash
cd Backend
npm install
```

Create `.env`:
```
DB_URL=your_db_connection_string
PORT=9000
```

Start backend:
```bash
npm start
```

### 3️⃣ Frontend Setup
```bash
cd ../Frontend
npm install
npm run dev
```

Frontend → http://localhost:5173  
Backend → http://localhost:9000

## 🤝 Contributing

Contributions are welcome!

## ✨ Author

**Shubhranil Karmakar**  
GitHub: https://github.com/Shubh-2025
