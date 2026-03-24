// API utility for Untouchables backend
// Handles all HTTP requests to the Supabase server

import { projectId, publicAnonKey } from '/utils/supabase/info';

export const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-d462d5d8`;

// Get auth token from localStorage
function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

// Set auth token in localStorage
export function setAuthToken(token: string) {
  localStorage.setItem('auth_token', token);
}

// Remove auth token from localStorage
export function removeAuthToken() {
  localStorage.removeItem('auth_token');
}

// Generic fetch wrapper
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  skipAuth = false
): Promise<T> {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // For Supabase Edge Functions, we always need an Authorization header
  // If skipAuth, use publicAnonKey; otherwise use user token or publicAnonKey as fallback
  if (skipAuth) {
    headers.Authorization = `Bearer ${publicAnonKey}`;
  } else {
    headers.Authorization = token ? `Bearer ${token}` : `Bearer ${publicAnonKey}`;
  }

  const url = `${API_BASE_URL}${endpoint}`;
  console.log(`[API] ${options.method || 'GET'} ${url}`);

  const response = await fetch(url, {
    ...options,
    headers,
  });

  console.log(`[API] Response ${response.status} for ${endpoint}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    const errorMessage = error.error || `HTTP Error: ${response.status}`;
    console.error(`[API] Error for ${endpoint}:`, errorMessage);
    throw new Error(errorMessage);
  }

  return response.json();
}

// ============================================================================
// AUTHENTICATION API
// ============================================================================

export const authApi = {
  login: async (email: string, password: string) => {
    const data = await apiFetch<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }, true); // Skip auth for login
    setAuthToken(data.token);
    return data;
  },

  signup: async (username: string, email: string, password: string, birthdate?: string) => {
    const data = await apiFetch<{ token: string; user: any }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password, birthdate }),
    }, true); // Skip auth for signup
    setAuthToken(data.token);
    return data;
  },

  logout: async () => {
    await apiFetch('/auth/logout', { method: 'POST' });
    removeAuthToken();
  },

  me: async () => {
    return apiFetch<any>('/auth/me');
  },
};

// ============================================================================
// USERS API
// ============================================================================

export const usersApi = {
  getAll: () => apiFetch<any[]>('/users', {}, true), // Public for prototype
  
  getById: (id: string) => apiFetch<any>(`/users/${id}`, {}, true), // Public for prototype
  
  getStats: (id: string) => apiFetch<any>(`/users/${id}/stats`, {}, true), // Public for prototype
  
  getActivity: (id: string) => apiFetch<any[]>(`/users/${id}/activity`, {}, true), // Public for prototype
  
  create: (data: any) => apiFetch<any>('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  }, true), // Public for prototype
  
  update: (id: string, data: any) => apiFetch<any>(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, true), // Public for prototype
  
  delete: (id: string) => apiFetch<{ message: string }>(`/users/${id}`, {
    method: 'DELETE',
  }, true), // Public for prototype
};

// ============================================================================
// ARTICLES API
// ============================================================================

export const articlesApi = {
  getAll: () => apiFetch<any[]>('/articles', {}, true), // Public for prototype
  
  getById: (id: string) => apiFetch<any>(`/articles/${id}`, {}, true), // Public for prototype
  
  create: (data: any) => apiFetch<any>('/articles', {
    method: 'POST',
    body: JSON.stringify(data),
  }, true), // Public for prototype
  
  update: (id: string, data: any) => apiFetch<any>(`/articles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, true), // Public for prototype
  
  delete: (id: string) => apiFetch<{ message: string }>(`/articles/${id}`, {
    method: 'DELETE',
  }, true), // Public for prototype
};

// ============================================================================
// CATEGORIES API
// ============================================================================

export const categoriesApi = {
  getAll: () => apiFetch<any[]>('/categories', {}, true), // Public for prototype
  
  getById: (id: string) => apiFetch<any>(`/categories/${id}`, {}, true), // Public for prototype
  
  create: (data: any) => apiFetch<any>('/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  }, true), // Public for prototype
  
  update: (id: string, data: any) => apiFetch<any>(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, true), // Public for prototype
  
  delete: (id: string) => apiFetch<{ message: string }>(`/categories/${id}`, {
    method: 'DELETE',
  }, true), // Public for prototype
};

// ============================================================================
// TAGS API
// ============================================================================

export const tagsApi = {
  getAll: () => apiFetch<any[]>('/tags', {}, true), // Public for prototype
  
  getById: (id: string) => apiFetch<any>(`/tags/${id}`, {}, true), // Public for prototype
  
  create: (data: any) => apiFetch<any>('/tags', {
    method: 'POST',
    body: JSON.stringify(data),
  }, true), // Public for prototype
  
  update: (id: string, data: any) => apiFetch<any>(`/tags/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, true), // Public for prototype
  
  delete: (id: string) => apiFetch<{ message: string }>(`/tags/${id}`, {
    method: 'DELETE',
  }, true), // Public for prototype
};

// ============================================================================
// ALBUMS API
// ============================================================================

export const albumsApi = {
  getAll: () => apiFetch<any[]>('/albums', {}, true), // Public for prototype
  
  getById: (id: string) => apiFetch<any>(`/albums/${id}`, {}, true), // Public for prototype
  
  create: (data: any) => apiFetch<any>('/albums', {
    method: 'POST',
    body: JSON.stringify(data),
  }, true), // Public for prototype
  
  update: (id: string, data: any) => apiFetch<any>(`/albums/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, true), // Public for prototype
  
  delete: (id: string) => apiFetch<{ message: string }>(`/albums/${id}`, {
    method: 'DELETE',
  }, true), // Public for prototype
};

// ============================================================================
// SINGLES API
// ============================================================================

export const singlesApi = {
  getAll: () => apiFetch<any[]>('/singles', {}, true), // Public for prototype
  
  getById: (id: string) => apiFetch<any>(`/singles/${id}`, {}, true), // Public for prototype
  
  create: (data: any) => apiFetch<any>('/singles', {
    method: 'POST',
    body: JSON.stringify(data),
  }, true), // Public for prototype
  
  update: (id: string, data: any) => apiFetch<any>(`/singles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, true), // Public for prototype
  
  delete: (id: string) => apiFetch<{ message: string }>(`/singles/${id}`, {
    method: 'DELETE',
  }, true), // Public for prototype
};

// ============================================================================
// MEMBERS API
// ============================================================================

export const membersApi = {
  getAll: () => apiFetch<any[]>('/members', {}, true), // Public for prototype
  
  getById: (id: string) => apiFetch<any>(`/members/${id}`, {}, true), // Public for prototype
  
  create: (data: any) => apiFetch<any>('/members', {
    method: 'POST',
    body: JSON.stringify(data),
  }, true), // Public for prototype
  
  update: (id: string, data: any) => apiFetch<any>(`/members/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, true), // Public for prototype
  
  delete: (id: string) => apiFetch<{ message: string }>(`/members/${id}`, {
    method: 'DELETE',
  }, true), // Public for prototype
};

// ============================================================================
// CONCERTS API
// ============================================================================

export const concertsApi = {
  getAll: () => apiFetch<any[]>('/concerts', {}, true), // Public for prototype
  
  create: (data: any) => apiFetch<any>('/concerts', {
    method: 'POST',
    body: JSON.stringify(data),
  }, true), // Public for prototype
  
  update: (id: string, data: any) => apiFetch<any>(`/concerts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, true), // Public for prototype
  
  delete: (id: string) => apiFetch<{ message: string }>(`/concerts/${id}`, {
    method: 'DELETE',
  }, true), // Public for prototype
};

// ============================================================================
// COMMENTS API
// ============================================================================

export const commentsApi = {
  getByEntity: (entityType: string, entityId: string) => {
    const params = new URLSearchParams({ entityType, entityId });
    return apiFetch<any[]>(`/comments?${params.toString()}`, {}, true); // Public for prototype
  },
  getAll: () => apiFetch<any[]>('/comments', {}, true), // Get all comments (for moderation)
  getCount: (entityType: string, entityId: string) => 
    apiFetch<{ count: number }>(`/comments/count/${entityType}/${entityId}`, {}, true), // Public for prototype
  getCounts: (entities: Array<{ entityType: string; entityId: string }>) =>
    apiFetch<Record<string, number>>('/comments/counts', {
      method: 'POST',
      body: JSON.stringify({ entities }),
    }, true), // Public for prototype
  create: (data: any) => apiFetch<any>('/comments', {
    method: 'POST',
    body: JSON.stringify(data),
  }, true), // Public for prototype
  approve: (id: string) => apiFetch<any>(`/comments/${id}/approve`, {
    method: 'PUT',
  }, true), // Public for prototype
  reject: (id: string) => apiFetch<any>(`/comments/${id}/reject`, {
    method: 'PUT',
  }, true), // Public for prototype
  delete: (id: string) => apiFetch<{ message: string }>(`/comments/${id}`, {
    method: 'DELETE',
  }, true), // Public for prototype
};

// ============================================================================
// STATS API
// ============================================================================

export const statsApi = {
  getDashboard: () => apiFetch<any>('/stats/dashboard', {}, true), // Skip auth - public endpoint
};

// ============================================================================
// CONTACT API
// ============================================================================

export const contactApi = {
  send: (data: { name: string; email: string; subject: string; message: string }) =>
    apiFetch<{ message: string; id: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }, true), // Skip auth - anyone can send a contact message

  getAll: () => apiFetch<any[]>('/contact', {}, true), // Public for prototype

  markAsRead: (id: string) => apiFetch<any>(`/contact/${id}/read`, {
    method: 'PUT',
  }, true), // Public for prototype

  delete: (id: string) => apiFetch<{ message: string }>(`/contact/${id}`, {
    method: 'DELETE',
  }, true), // Public for prototype
};

// ============================================================================
// INIT API (DEVELOPMENT ONLY)
// ============================================================================

export const initApi = {
  seedDatabase: () => apiFetch<{ message: string; stats: any }>('/init/seed', {
    method: 'POST',
  }, true), // Skip auth for seed endpoint
};

// ============================================================================
// LIKES API
// ============================================================================

export const likesApi = {
  // Article likes
  likeArticle: (articleId: string, userId: string) => apiFetch<any>(`/articles/${articleId}/like`, {
    method: 'POST',
    body: JSON.stringify({ userId }),
  }, true), // Public for prototype
  
  unlikeArticle: (articleId: string, userId: string) => apiFetch<any>(`/articles/${articleId}/like`, {
    method: 'DELETE',
    body: JSON.stringify({ userId }),
  }, true), // Public for prototype
  
  getArticleLikes: (articleId: string) => apiFetch<{ count: number; likes: any[] }>(`/articles/${articleId}/likes`, {}, true),
  
  checkArticleLike: (articleId: string, userId: string) => apiFetch<{ liked: boolean }>(`/articles/${articleId}/likes/${userId}`, {}, true),
  
  // Comment likes
  likeComment: (commentId: string, userId: string) => apiFetch<any>(`/comments/${commentId}/like`, {
    method: 'POST',
    body: JSON.stringify({ userId }),
  }, true), // Public for prototype
  
  unlikeComment: (commentId: string, userId: string) => apiFetch<any>(`/comments/${commentId}/like`, {
    method: 'DELETE',
    body: JSON.stringify({ userId }),
  }, true), // Public for prototype
  
  getCommentLikes: (commentId: string) => apiFetch<{ count: number; likes: any[] }>(`/comments/${commentId}/likes`, {}, true),
  
  checkCommentLike: (commentId: string, userId: string) => apiFetch<{ liked: boolean }>(`/comments/${commentId}/likes/${userId}`, {}, true),
};

// ============================================================================
// FORUM API
// ============================================================================

export const forumApi = {
  getCategories: () => apiFetch<any[]>('/forum/categories', {}, true),
  
  getTopics: (categoryId?: string, limit?: number) => {
    const params = new URLSearchParams();
    if (categoryId) params.append('categoryId', categoryId);
    if (limit) params.append('limit', limit.toString());
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiFetch<any[]>(`/forum/topics${query}`, {}, true);
  },
  
  getTopicById: (id: string) => apiFetch<any>(`/forum/topics/${id}`, {}, true),
  
  getRecentTopics: (limit?: number) => {
    const query = limit ? `?limit=${limit}` : '';
    return apiFetch<any[]>(`/forum/topics/recent${query}`, {}, true);
  },
  
  createTopic: (data: { categoryId: string; title: string; content: string; authorId: string }) =>
    apiFetch<any>('/forum/topics', {
      method: 'POST',
      body: JSON.stringify(data),
    }, true),
  
  createReply: (topicId: string, data: { content: string; authorId: string }) =>
    apiFetch<any>(`/forum/topics/${topicId}/replies`, {
      method: 'POST',
      body: JSON.stringify(data),
    }, true),
};

// ============================================================================
// MEDIA GALLERY API
// ============================================================================

export const mediaApi = {
  getAll: (type?: string, limit?: number) => {
    const params = new URLSearchParams();
    if (type) params.append('type', type);
    if (limit) params.append('limit', limit.toString());
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiFetch<any[]>(`/media${query}`, {}, true);
  },
  
  getById: (id: string) => apiFetch<any>(`/media/${id}`, {}, true),
  
  create: (data: any) => apiFetch<any>('/media', {
    method: 'POST',
    body: JSON.stringify(data),
  }, true),
  
  update: (id: string, data: any) => apiFetch<any>(`/media/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, true),
  
  delete: (id: string) => apiFetch<{ message: string }>(`/media/${id}`, {
    method: 'DELETE',
  }, true),
};

// ============================================================================
// ANALYTICS API
// ============================================================================

export const analyticsApi = {
  getAnalytics: () => apiFetch<any>('/stats/analytics', {}, true),
};