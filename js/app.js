// Main Application Entry Point for Omar Badr Portfolio SPA
import { initRouter } from './router.js';
import { renderHeader, renderFooter } from './components.js';

// Import Views
import * as homeView from './views/home.js';
import * as aboutView from './views/about.js';
import * as servicesView from './views/services.js';
import * as portfolioView from './views/portfolio.js';
import * as blogView from './views/blog.js';
import * as startProjectView from './views/startProject.js';
import * as contactView from './views/contact.js';

// Map view names to views modules
const views = {
  'home': homeView,
  'about': aboutView,
  'services': servicesView,
  'portfolio': portfolioView,
  'project-detail': portfolioView,
  'blog': blogView,
  'blog-detail': blogView,
  'start-project': startProjectView,
  'contact': contactView
};

// Global Page SEO Meta Descriptions mapping
const metaDescriptions = {
  ar: {
    'home': 'الموقع الشخصي لعمر بدر - محلل بيانات وخبير تعلم آلة. أصنع من بياناتك أقوى أصولك.',
    'about': 'تعرف على عمر بدر - شريكك في نمو الأعمال من خلال ترجمة البيانات والتحليل الاستراتيجي.',
    'services': 'خدمات تحليل البيانات، لوحات التحكم تفاعلية بـ Power BI، نماذج تعلم آلة، وكشط الويب.',
    'portfolio': 'معرض أعمال ودراسات حالة لمشاريع تحليل البيانات وتعلم الآلة المنفذة.',
    'blog': 'مدونة عمر بدر لعلوم البيانات والذكاء الاصطناعي - مقالات وشروحات تقنية مبسطة.',
    'start-project': 'ابدأ مشروعك معنا واحصل على دراسة وتكلفة تقديرية لمتطلبات تحليل البيانات.',
    'contact': 'تواصل مع عمر بدر مباشرة للحصول على استشارات مجانية أو لمناقشة فرص العمل.'
  },
  en: {
    'home': 'Omar Badr Personal Portfolio - Data Analyst & Machine Learning Expert. Turn your data into your strongest asset.',
    'about': 'Learn about Omar Badr - your partner in business growth through data translation and strategic analysis.',
    'services': 'Data analysis services, interactive Power BI dashboards, machine learning models, and web scraping.',
    'portfolio': 'Case studies and gallery of completed data analysis and machine learning projects.',
    'blog': 'Omar Badr Data & AI Blog - simplified articles and technical tutorials.',
    'start-project': 'Start your project and get a custom scoping estimate for your data analysis needs.',
    'contact': 'Contact Omar Badr directly for consultations or business opportunities.'
  }
};

const pageTitles = {
  ar: {
    'home': 'عمر بدر - خبير تحليل بيانات وتعلم آلة',
    'about': 'لماذا أنا؟ - عمر بدر',
    'services': 'الخدمات المهنية - عمر بدر',
    'portfolio': 'معرض المشاريع ودراسات الحالة - عمر بدر',
    'blog': 'المدونة التقنية لعلوم البيانات - عمر بدر',
    'start-project': 'ابدأ مشروعك - عمر بدر',
    'contact': 'تواصل معي - عمر بدر'
  },
  en: {
    'home': 'Omar Badr - Data Analyst & ML Expert',
    'about': 'About Me - Omar Badr',
    'services': 'Professional Services - Omar Badr',
    'portfolio': 'Projects Portfolio & Case Studies - Omar Badr',
    'blog': 'Data & AI Tech Blog - Omar Badr',
    'start-project': 'Start a Project - Omar Badr',
    'contact': 'Contact Me - Omar Badr'
  }
};

// Render active route page view
export function renderPage(routeInfo) {
  const { view, lang, params } = routeInfo;
  
  const appContainer = document.getElementById('app');
  if (!appContainer) return;
  
  const viewModule = views[view];
  if (!viewModule) {
    console.error(`View "${view}" not found.`);
    return;
  }
  
  // Set HTML lang and direction attributes
  const htmlElement = document.documentElement;
  htmlElement.setAttribute('lang', lang);
  htmlElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  
  // Update SEO Document Title and Meta Description
  let pageTitle = pageTitles[lang][view] || pageTitles[lang]['home'];
  let metaDesc = metaDescriptions[lang][view] || metaDescriptions[lang]['home'];
  
  // For dynamic pages (detail views)
  if (view === 'project-detail' && params.id) {
    const projectTitle = lang === 'ar' ? 'تفاصيل المشروع' : 'Project Details';
    pageTitle = `${projectTitle} - ${pageTitles[lang]['portfolio']}`;
  } else if (view === 'blog-detail' && params.id) {
    const postTitle = lang === 'ar' ? 'المقال التقني' : 'Blog Post';
    pageTitle = `${postTitle} - ${pageTitles[lang]['blog']}`;
  }
  
  document.title = pageTitle;
  
  const metaDescEl = document.querySelector('meta[name="description"]');
  if (metaDescEl) {
    metaDescEl.setAttribute('content', metaDesc);
  }

  // Track page view in Google Analytics (vital for a Data Analyst!)
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_title: pageTitle,
      page_location: window.location.href,
      page_path: window.location.hash || '/'
    });
  }
  
  // Renders Header & Footer
  renderHeader(view, lang);
  renderFooter(lang);
  
  // Render View HTML content
  // Portfolio and Blog render functions support optional second param (ID)
  const detailId = params.id || null;
  appContainer.innerHTML = viewModule.render(lang, detailId);
  
  // Initialize View Events and Interactive Components
  if (viewModule.init) {
    viewModule.init(lang, detailId);
  }
  
  // Scroll to top on navigation
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// App Bootstrapper
document.addEventListener('DOMContentLoaded', () => {
  // Restore saved theme or default to Dark mode
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }
  
  // Initialize the router engine
  initRouter();
});
