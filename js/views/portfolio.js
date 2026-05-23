// Portfolio and Project Case Study View Component
import { translations, portfolioProjects } from '../data.js';

// Renders either the portfolio grid gallery or the specific project case study details
export function render(lang, projectId = null) {
  const t = translations.portfolio;
  const isRTL = lang === 'ar';
  
  if (projectId) {
    // RENDER CASE STUDY VIEW
    const project = portfolioProjects.find(p => p.id === projectId);
    if (!project || !project.details || !project.details[lang]) {
      // If project or case study details are missing, show fallback message
      return `
        <div class="page-transition container" style="padding-top: 3rem; text-align: center;">
          <a href="#/${lang}/portfolio" class="back-link">
            <i class="fas ${isRTL ? 'fa-arrow-right' : 'fa-arrow-left'}"></i> ${t.backBtn[lang]}
          </a>
          <div style="margin-top: 5rem;">
            <h2>${isRTL ? 'المشروع غير موجود' : 'Project Not Found'}</h2>
            <p style="color: var(--text-secondary); margin-top: 1rem;">
              ${isRTL ? 'عذرًا، تفاصيل دراسة الحالة لهذا المشروع غير متوفرة.' : 'Sorry, the case study details for this project are not available.'}
            </p>
          </div>
        </div>
      `;
    }

    const details = project.details[lang];
    const tagsHTML = project.tags[lang].map(tag => `<span class="tag">${tag}</span>`).join('');
    
    // Overview keys and translations
    const overviewKeys = {
      ar: { task: 'المهمة', tools: 'الأدوات المستخدمة', result: 'النتيجة الرئيسية' },
      en: { task: 'Task', tools: 'Tools Used', result: 'Key Result' }
    };
    
    // Retrieve overview values
    const oTaskKey = isRTL ? 'المهمة' : 'Task';
    const oToolsKey = isRTL ? 'الأدوات المستخدمة' : 'Tools Used';
    const oResultKey = isRTL ? 'النتيجة الرئيسية' : 'Key Result';
    
    const taskText = details.overview[oTaskKey] || details.overview['Task'] || details.overview['المهمة'] || '';
    const toolsText = details.overview[oToolsKey] || details.overview['Tools Used'] || details.overview['الأدوات المستخدمة'] || '';
    const resultText = details.overview[oResultKey] || details.overview['Key Result'] || details.overview['النتيجة الرئيسية'] || '';

    // Render Actions Buttons
    let actionsHTML = '';
    if (project.github) {
      actionsHTML += `
        <a href="${project.github}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-github"></i> ${t.viewCode[lang]}
        </a>
      `;
    }
    if (project.live) {
      actionsHTML += `
        <a href="${project.live}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
          <i class="fas fa-external-link-alt"></i> ${t.viewLive[lang]}
        </a>
      `;
    }
    actionsHTML += `
      <a href="#/${lang}/portfolio" class="btn btn-secondary">
        <i class="fas ${isRTL ? 'fa-arrow-right' : 'fa-arrow-left'}"></i> ${t.backBtn[lang]}
      </a>
    `;

    return `
      <div class="page-transition container project-details">
        <header class="project-details-header">
          <a href="#/${lang}/portfolio" class="back-link">
            <i class="fas ${isRTL ? 'fa-arrow-right' : 'fa-arrow-left'}"></i> ${t.backBtn[lang]}
          </a>
          <h1 class="project-details-title" style="margin-top: 1.5rem;">${project.title[lang]}</h1>
          <p class="project-details-subtitle">${details.subtitle}</p>
          <div class="project-tags" style="margin-top: 0.5rem;">${tagsHTML}</div>
        </header>

        <img src="${project.image}" alt="${project.title[lang]}" class="project-details-img">

        <div class="study-grid">
          <!-- Left overview sticky box -->
          <aside class="study-overview">
            <div class="overview-box">
              <h4>${overviewKeys[lang].task}</h4>
              <p>${taskText}</p>
            </div>
            <div class="overview-box">
              <h4>${overviewKeys[lang].tools}</h4>
              <p>${toolsText}</p>
            </div>
            <div class="overview-box">
              <h4>${overviewKeys[lang].result}</h4>
              <p>${resultText}</p>
            </div>
          </aside>

          <!-- Right case study narrative -->
          <article class="study-body">
            <div class="study-section">
              ${details.content}
            </div>
            
            <div class="study-footer-actions">
              ${actionsHTML}
            </div>
          </article>
        </div>
      </div>
    `;
  } else {
    // RENDER GALLERY GRID VIEW
    const allTags = new Set();
    portfolioProjects.forEach(p => {
      p.tags[lang].forEach(tag => allTags.add(tag));
    });

    const tagsArray = Array.from(allTags);
    
    // Define standard tags to translate / group
    const filterTags = [
      { key: 'all', label: t.filterAll[lang] },
      { key: 'Power BI', label: 'Power BI' },
      { key: 'Python', label: 'Python' },
      { key: 'Machine Learning', label: lang === 'ar' ? 'تعلم الآلة' : 'Machine Learning' },
      { key: 'Web Scraping', label: lang === 'ar' ? 'كشط الويب' : 'Web Scraping' }
    ];

    const filterButtonsHTML = filterTags.map(tag => `
      <button class="filter-btn ${tag.key === 'all' ? 'active' : ''}" data-filter="${tag.key}">
        ${tag.label}
      </button>
    `).join('');

    const projectCardsHTML = portfolioProjects.map(project => {
      const tagsHTML = project.tags[lang].map(tag => `<span class="tag">${tag}</span>`).join('');
      
      // We stringify the tags to match filters easily
      const matchTags = JSON.stringify(project.tags[lang]).toLowerCase();
      
      return `
        <div class="project-card" data-tags='${matchTags}'>
          <div class="project-img-wrapper">
            <img src="${project.image}" alt="${project.title[lang]}" class="project-img" loading="lazy">
          </div>
          <div class="project-info">
            <div class="project-tags">${tagsHTML}</div>
            <h3>${project.title[lang]}</h3>
            <p>${project.description[lang]}</p>
          </div>
          <div class="project-footer">
            <a href="#/${lang}/portfolio/${project.id}" class="read-more-link">
              ${t.viewDetails[lang]} <i class="fas ${isRTL ? 'fa-arrow-left' : 'fa-arrow-right'}"></i>
            </a>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="page-transition container" style="padding-top: 3rem;">
        <section style="text-align: center; margin-bottom: 4rem;">
          <h1 class="hero-title" style="font-size: clamp(2rem, 4vw, 3rem);">
            <span>${t.title[lang]}</span>
          </h1>
          <p class="hero-subtitle" style="max-width: 700px; margin: 1.5rem auto 0 auto;">
            ${t.subtitle[lang]}
          </p>
        </section>

        <!-- FILTERS -->
        <div class="portfolio-filters">
          ${filterButtonsHTML}
        </div>

        <!-- GRID -->
        <div class="portfolio-grid" id="portfolio-grid-container">
          ${projectCardsHTML}
        </div>
      </div>
    `;
  }
}

export function init(lang, projectId = null) {
  if (projectId) return; // No init logic for case study detail page

  // Gallery filtering logic
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      buttons.forEach(b => b.classList.remove('active'));
      // Add active to current
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter').toLowerCase();
      
      cards.forEach(card => {
        if (filter === 'all') {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          // Check if filter matches tag
          const cardTags = card.getAttribute('data-tags').toLowerCase();
          
          // Map filters to equivalent terms if needed (bilingual mapping)
          let matches = cardTags.includes(filter);
          
          // Specific mappings for Arabic
          if (filter === 'machine learning') {
            matches = matches || cardTags.includes('تعلم الآلة') || cardTags.includes('ml');
          }
          if (filter === 'web scraping') {
            matches = matches || cardTags.includes('كشط الويب') || cardTags.includes('scraping');
          }
          
          if (matches) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });
}
