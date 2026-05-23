// Client-side Hash Router for Omar Badr Portfolio SPA
import { renderPage } from './app.js';

// Route definitions and matching
const routes = [
  // Home
  { path: /^\/?(ar|en)?\/?$/, view: 'home' },
  // Services
  { path: /^\/?(ar|en)\/services\/?$/, view: 'services' },
  // Portfolio
  { path: /^\/?(ar|en)\/portfolio\/?$/, view: 'portfolio' },
  // Project detail
  { path: /^\/?(ar|en)\/portfolio\/([^\/]+)\/?$/, view: 'project-detail', params: ['lang', 'id'] },
  // Blog
  { path: /^\/?(ar|en)\/blog\/?$/, view: 'blog' },
  // Blog post detail (old structures support)
  { path: /^\/?(ar|en)\/posts\/([^\/]+)\/?$/, view: 'blog-detail', params: ['lang', 'id'] },
  { path: /^\/?(ar|en)\/blog\/([^\/]+)\/?$/, view: 'blog-detail', params: ['lang', 'id'] },
  // About
  { path: /^\/?(ar|en)\/about\/?$/, view: 'about' },
  // Start Project
  { path: /^\/?(ar|en)\/start-project\/?$/, view: 'start-project' },
  // Contact
  { path: /^\/?(ar|en)\/contact\/?$/, view: 'contact' },
];

export function parseLocation() {
  const hash = window.location.hash.slice(1) || '/';
  
  // Normalize leading slash
  const path = hash.startsWith('/') ? hash : '/' + hash;
  
  for (const route of routes) {
    const match = path.match(route.path);
    if (match) {
      const lang = match[1] || 'ar'; // Default language to Arabic
      const result = {
        view: route.view,
        lang: lang,
        params: {}
      };
      
      if (route.params && match.length > 2) {
        // We have custom parameters (e.g. project id)
        route.params.forEach((paramName, index) => {
          if (index === 0) {
            result.lang = match[1] || 'ar';
          } else {
            result.params[paramName] = match[index + 1];
          }
        });
      }
      return result;
    }
  }
  
  // Fallback if no match: default to /ar/ home
  return { view: 'home', lang: 'ar', params: {} };
}

export function navigate(path) {
  window.location.hash = path;
}

export function initRouter() {
  window.addEventListener('hashchange', () => {
    const routeInfo = parseLocation();
    renderPage(routeInfo);
  });
  
  // Trigger on load
  const routeInfo = parseLocation();
  
  // Ensure hash is set properly if page loaded at root without hash
  if (!window.location.hash) {
    window.location.hash = `#/${routeInfo.lang}/`;
  } else {
    renderPage(routeInfo);
  }
}
