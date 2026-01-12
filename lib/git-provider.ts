// Git Provider Configuration and API Functions
// Supports both GitHub and GitLab APIs

export interface FileInfo {
  name: string;
  path: string;
  sha?: string;
  type: 'file' | 'dir';
  download_url?: string;
}

export interface CommitInfo {
  sha: string;
  date: string;
  message: string;
}

export interface ArticleInfo {
  name: string;
  path: string;
  title: string;
  summary: string;
  lastModified: string;
  commitMessage?: string;
}

const getGitHubHeaders = () => {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
  };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
};

const getGitLabHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (process.env.GITLAB_TOKEN) {
    headers['PRIVATE-TOKEN'] = process.env.GITLAB_TOKEN;
  }
  return headers;
};

// GitHub API Functions
async function getGitHubFiles(path: string): Promise<FileInfo[]> {
  const apiUrl = process.env.GITHUB_API_URL || 'https://api.github.com';
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  
  const url = `${apiUrl}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  
  const response = await fetch(url, {
    headers: getGitHubHeaders(),
    next: { revalidate: 60 }, // Cache for 60 seconds
  });
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (!Array.isArray(data)) {
    return [data];
  }
  
  return data.map((item: Record<string, unknown>) => ({
    name: item.name as string,
    path: item.path as string,
    sha: item.sha as string,
    type: item.type as 'file' | 'dir',
    download_url: item.download_url as string,
  }));
}

async function getGitHubFileContent(path: string): Promise<string> {
  const apiUrl = process.env.GITHUB_API_URL || 'https://api.github.com';
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  
  const url = `${apiUrl}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  
  const response = await fetch(url, {
    headers: getGitHubHeaders(),
    next: { revalidate: 60 },
  });
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (data.encoding === 'base64') {
    return Buffer.from(data.content, 'base64').toString('utf-8');
  }
  
  // If content is not base64, try download_url
  if (data.download_url) {
    const contentResponse = await fetch(data.download_url);
    return contentResponse.text();
  }
  
  return data.content || '';
}

async function getGitHubFileCommitDate(path: string): Promise<CommitInfo | null> {
  const apiUrl = process.env.GITHUB_API_URL || 'https://api.github.com';
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  
  const url = `${apiUrl}/repos/${owner}/${repo}/commits?path=${path}&sha=${branch}&per_page=1`;
  
  const response = await fetch(url, {
    headers: getGitHubHeaders(),
    next: { revalidate: 60 },
  });
  
  if (!response.ok) {
    return null;
  }
  
  const data = await response.json();
  
  if (data.length > 0) {
    return {
      sha: data[0].sha,
      date: data[0].commit.committer.date,
      message: data[0].commit.message,
    };
  }
  
  return null;
}

// GitLab API Functions
async function getGitLabFiles(path: string): Promise<FileInfo[]> {
  const apiUrl = process.env.GITLAB_API_URL || 'https://gitlab.com/api/v4';
  const projectId = process.env.GITLAB_PROJECT_ID;
  const branch = process.env.GITLAB_BRANCH || 'main';
  
  const encodedPath = encodeURIComponent(path);
  const url = `${apiUrl}/projects/${projectId}/repository/tree?path=${encodedPath}&ref=${branch}`;
  
  const response = await fetch(url, {
    headers: getGitLabHeaders(),
    next: { revalidate: 60 },
  });
  
  if (!response.ok) {
    throw new Error(`GitLab API error: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  
  return data.map((item: Record<string, unknown>) => ({
    name: item.name as string,
    path: item.path as string,
    sha: item.id as string,
    type: item.type === 'tree' ? 'dir' : 'file',
  }));
}

async function getGitLabFileContent(path: string): Promise<string> {
  const apiUrl = process.env.GITLAB_API_URL || 'https://gitlab.com/api/v4';
  const projectId = process.env.GITLAB_PROJECT_ID;
  const branch = process.env.GITLAB_BRANCH || 'main';
  
  const encodedPath = encodeURIComponent(path);
  const url = `${apiUrl}/projects/${projectId}/repository/files/${encodedPath}/raw?ref=${branch}`;
  
  const response = await fetch(url, {
    headers: getGitLabHeaders(),
    next: { revalidate: 60 },
  });
  
  if (!response.ok) {
    throw new Error(`GitLab API error: ${response.status} ${response.statusText}`);
  }
  
  return response.text();
}

async function getGitLabFileCommitDate(path: string): Promise<CommitInfo | null> {
  const apiUrl = process.env.GITLAB_API_URL || 'https://gitlab.com/api/v4';
  const projectId = process.env.GITLAB_PROJECT_ID;
  const branch = process.env.GITLAB_BRANCH || 'main';
  
  const encodedPath = encodeURIComponent(path);
  const url = `${apiUrl}/projects/${projectId}/repository/commits?path=${encodedPath}&ref_name=${branch}&per_page=1`;
  
  const response = await fetch(url, {
    headers: getGitLabHeaders(),
    next: { revalidate: 60 },
  });
  
  if (!response.ok) {
    return null;
  }
  
  const data = await response.json();
  
  if (data.length > 0) {
    return {
      sha: data[0].id,
      date: data[0].committed_date,
      message: data[0].message,
    };
  }
  
  return null;
}

// Unified API Functions
export async function getFiles(path?: string): Promise<FileInfo[]> {
  const provider = process.env.GIT_PROVIDER || 'github';
  const basePath = provider === 'github' 
    ? process.env.GITHUB_PAGES_PATH || 'pages'
    : process.env.GITLAB_PAGES_PATH || 'pages';
  
  const fullPath = path ? `${basePath}/${path}` : basePath;
  
  if (provider === 'gitlab') {
    return getGitLabFiles(fullPath);
  }
  return getGitHubFiles(fullPath);
}

export async function getFileContent(path: string): Promise<string> {
  const provider = process.env.GIT_PROVIDER || 'github';
  const basePath = provider === 'github' 
    ? process.env.GITHUB_PAGES_PATH || 'pages'
    : process.env.GITLAB_PAGES_PATH || 'pages';
  
  const fullPath = `${basePath}/${path}`;
  
  if (provider === 'gitlab') {
    return getGitLabFileContent(fullPath);
  }
  return getGitHubFileContent(fullPath);
}

export async function getFileCommitInfo(path: string): Promise<CommitInfo | null> {
  const provider = process.env.GIT_PROVIDER || 'github';
  const basePath = provider === 'github' 
    ? process.env.GITHUB_PAGES_PATH || 'pages'
    : process.env.GITLAB_PAGES_PATH || 'pages';
  
  const fullPath = `${basePath}/${path}`;
  
  if (provider === 'gitlab') {
    return getGitLabFileCommitDate(fullPath);
  }
  return getGitHubFileCommitDate(fullPath);
}

// Get markdown files with commit info, sorted by date
export async function getMarkdownFiles(): Promise<ArticleInfo[]> {
  // Import markdown utilities dynamically to avoid circular deps
  const { extractTitle, extractSummary } = await import('./markdown');
  
  const files = await getFiles();
  
  const mdFiles = files.filter(f => f.type === 'file' && f.name.endsWith('.md'));
  
  const articlesWithDates = await Promise.all(
    mdFiles.map(async (file) => {
      const commitInfo = await getFileCommitInfo(file.name);
      
      // Get content for summary
      let title = file.name.replace('.md', '').replace(/[-_]/g, ' ');
      let summary = 'No preview available';
      
      try {
        const content = await getFileContent(file.name);
        
        // Use improved title extraction (strips markdown formatting)
        title = extractTitle(content, file.name);
        
        // Use improved summary extraction (strips markdown, skips headers/quotes)
        summary = extractSummary(content, 200);
      } catch {
        // Keep default values
      }
      
      return {
        name: file.name,
        path: file.path,
        title,
        summary,
        lastModified: commitInfo?.date || new Date().toISOString(),
        commitMessage: commitInfo?.message,
      };
    })
  );
  
  // Sort by date (newest first)
  return articlesWithDates.sort((a, b) => 
    new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
  );
}
