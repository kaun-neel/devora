<div align="center">

<img src="app/src/assets/devora_logo.png" alt="DEVORA Logo" width="280"/>

<br/>
<br/>

<div align="center">
## DEVORA
 
### AI-powered code generation, debugging, and community discovery  
### driven by local LLMs. Your code stays on your machine.
 
[![Vue 3](https://img.shields.io/badge/Vue-3-42b883?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Ollama](https://img.shields.io/badge/Ollama-local%20AI-black?style=flat-square)](https://ollama.com/)
[![License](https://img.shields.io/badge/license-proprietary-red?style=flat-square)]()
 
</div>
</div>
---
 
## What is DEVORA?
 
DEVORA is a brutalist-style, AI-powered developer assistant. Describe what you need in plain English — get production-ready code back in seconds. Paste broken code — get a diagnosis, a fix, and a diff. Explore a live community feed of trending snippets across 19+ languages. All of it runs locally via [Ollama](https://ollama.com/), so your code never touches an external server.
 
---
 
## Features
 
| Feature | Description |
|---|---|
| **Code Generation** | Forge production-ready code from natural language prompts using local AI models |
| **Smart Debugger** | AI diagnoses issues, explains anti-patterns, and returns exact diffs |
| **Community Feed** | Live-generated trending boilerplates across 19+ programming languages |
| **Brutalist UI** | Neo-Brutalist design system built with Tailwind CSS — fast and responsive |
| **Privacy First** | Powered by Ollama — your code never leaves your machine |
 
---
 
## Tech Stack
 
- **Frontend:** Vue 3, Vite, Tailwind CSS, Vue Router  
- **Backend:** Python, FastAPI  
- **AI Engine:** [Ollama](https://ollama.com/) (local)
---
 
## Getting Started
 
### Prerequisites
 
Before running DEVORA, make sure you have the following installed:
 
- [Node.js](https://nodejs.org/) v18+
- [Python](https://python.org/) v3.10+
- [Ollama](https://ollama.com/) — download and install from ollama.com
---
 
### Step 1 — Start Ollama
 
Pull a model and keep Ollama running in the background. We recommend `qwen2.5-coder` for best results, but `llama3` or `codellama` also work well.
 
```bash
ollama run qwen2.5-coder
```
 
> Keep this terminal open. Ollama must be running for the AI features to work.
 
---
 
### Step 2 — Start the Backend
 
Open a new terminal and navigate to the `backend` directory:
 
```bash
cd backend
```
 
Create a virtual environment and install dependencies:
 
```bash
python -m venv venv
 
# Windows
venv\Scripts\activate
 
# macOS / Linux
source venv/bin/activate
 
pip install -r requirements.txt
```
 
Start the FastAPI server:
 
```bash
fastapi dev app/main.py
# or
uvicorn app.main:app --reload --port 8000
```
 
Backend runs at `http://localhost:8000`.
 
---
 
### Step 3 — Start the Frontend
 
Open a **new** terminal and navigate to the `app` directory:
 
```bash
cd app
npm install
npm run dev
```
 
Frontend runs at `http://localhost:5173`.
 
> The frontend automatically proxies `/api` requests to the local backend — no CORS config or port juggling needed.
 
---
 
### Step 4 — Open DEVORA
 
Navigate to [http://localhost:5173](http://localhost:5173) in your browser. That's it.
 
---
 
## Share with a Friend (No Install Required)
 
Want to demo DEVORA to someone without them setting up Ollama?
 
1. Open the **Ports** tab in VS Code's terminal panel.
2. Forward port `5173`.
3. Right-click the forwarded port → set **Port Visibility** to **Public**.
4. Send the generated link.
The Vite proxy routes their requests through your machine — they get the full AI experience powered by your local Ollama instance.
 
---
 
## License
 
© 2026 DEVORA. All rights reserved.
 
