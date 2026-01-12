# ⁂ Codex Vitae

> *Chronicles of the Lost Age — Preserved manuscripts from the time before*

A Next.js application that displays markdown articles from a GitHub or GitLab repository with an ancient, post-apocalyptic codex aesthetic.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)

---

## ✦ Features

- 📜 **Markdown Rendering** — Fetches and displays .md files from your Git repository
- 🕰️ **Commit-based Sorting** — Latest articles shown first based on commit date
- 🏛️ **Ancient Codex Theme** — Weathered parchment, cryptic symbols, Latin phrases
- 🌙 **Dark Mode** — Charred/burnt parchment aesthetic
- ⚡ **Vercel & Netlify Ready** — Optimized for deployment on both platforms

---

## ❧ Repository Structure

Your content repository should have this structure:

```
your-repo/
├── pages/                    # Markdown articles folder
│   ├── my_awesome_article.md
│   ├── another_article.md
│   ├── news.md
│   └── ...
└── images/                   # Optional: image assets
```

---

## ⚙️ Environment Variables

Create a `.env.local` file for local development (copy from `.env.example`):

| Variable | Description | Required |
|----------|-------------|----------|
| `GIT_PROVIDER` | `github` or `gitlab` | Yes |
| `GITHUB_TOKEN` | GitHub Personal Access Token | For GitHub |
| `GITHUB_OWNER` | GitHub username or organization | For GitHub |
| `GITHUB_REPO` | Repository name | For GitHub |
| `GITHUB_BRANCH` | Branch name (default: `main`) | For GitHub |
| `GITHUB_PAGES_PATH` | Path to markdown folder (default: `pages`) | For GitHub |
| `GITLAB_TOKEN` | GitLab Personal Access Token | For GitLab |
| `GITLAB_PROJECT_ID` | GitLab project ID | For GitLab |
| `GITLAB_BRANCH` | Branch name (default: `main`) | For GitLab |
| `GITLAB_PAGES_PATH` | Path to markdown folder (default: `pages`) | For GitLab |

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your repository details

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the codex.

---

## ☁️ Deploy to Vercel

### Option 1: Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lahirunirmalx/codex-vitae&env=GIT_PROVIDER,GITHUB_TOKEN,GITHUB_OWNER,GITHUB_REPO,GITHUB_BRANCH,GITHUB_PAGES_PATH)

### Option 2: Manual Deployment

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Codex Vitae"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   
   In Vercel Dashboard → Your Project → Settings → Environment Variables, add:

   | Name | Value |
   |------|-------|
   | `GIT_PROVIDER` | `github` |
   | `GITHUB_TOKEN` | `ghp_your_token_here` |
   | `GITHUB_OWNER` | `your-username` |
   | `GITHUB_REPO` | `your-content-repo` |
   | `GITHUB_BRANCH` | `main` |
   | `GITHUB_PAGES_PATH` | `pages` |

4. **Deploy**
   - Click "Deploy"
   - Your Codex Vitae will be live!

---

## 🌐 Deploy to Netlify

### Option 1: Deploy Button

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/lahirunirmalx/codex-vitae)

### Option 2: Manual Deployment

1. **Push to GitHub** (if not already done)

2. **Import to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Netlify will auto-detect Next.js and use `netlify.toml`

3. **Configure Environment Variables**
   
   In Netlify Dashboard → Your Site → Site settings → Environment variables, add:

   | Key | Value |
   |-----|-------|
   | `GIT_PROVIDER` | `github` |
   | `GITHUB_TOKEN` | `ghp_your_token_here` |
   | `GITHUB_OWNER` | `your-username` |
   | `GITHUB_REPO` | `your-content-repo` |
   | `GITHUB_BRANCH` | `main` |
   | `GITHUB_PAGES_PATH` | `pages` |

4. **Deploy**
   - Click "Deploy site"
   - Your Codex Vitae will be live!

---

## 🔑 Getting API Tokens

### GitHub Personal Access Token

1. Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scopes:
   - `public_repo` — for public repositories
   - `repo` — for private repositories
4. Copy the token (starts with `ghp_`)

### GitLab Personal Access Token

1. Go to [GitLab User Settings → Access Tokens](https://gitlab.com/-/profile/personal_access_tokens)
2. Create a new token with `read_repository` scope
3. Copy the token (starts with `glpat-`)

---

## 📁 Project Structure

```
codex-vitae/
├── app/
│   ├── api/
│   │   └── articles/         # API routes
│   ├── article/
│   │   └── [slug]/           # Dynamic article pages
│   ├── globals.css           # Ancient codex styles
│   ├── layout.tsx            # Root layout
│   ├── loading.tsx           # Loading skeleton
│   └── page.tsx              # Home page
├── lib/
│   ├── git-provider.ts       # GitHub/GitLab API functions
│   └── markdown.ts           # Markdown parser
├── .env.example              # Environment template
├── .nvmrc                    # Node.js version
├── netlify.toml              # Netlify configuration
├── next.config.ts            # Next.js configuration
└── package.json
```

---

## 📜 Markdown Frontmatter

Your markdown files can include optional frontmatter:

```markdown
---
title: "The Ancient Prophecy"
tags: ["prophecy", "ancient", "wisdom"]
---

# The Ancient Prophecy

Your content here...
```

---

## 🎨 Customization

The theme uses CSS custom properties defined in `app/globals.css`:

```css
:root {
  --parchment-light: #f4e4c1;
  --parchment: #e8d5a3;
  --ink: #2d1f14;
  --blood-dried: #8b3a3a;
  --gold-ancient: #b8860b;
  /* ... more variables */
}
```

---

## ⁂

*"In verbis virtus"* — In words, there is power.

---

## License

MIT License - Feel free to use for your own ancient archives.
