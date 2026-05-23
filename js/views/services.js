// Services View Component
import { translations } from '../data.js';

export function render(lang) {
  const t = translations.services;
  const isRTL = lang === 'ar';
  
  const servicesListHTML = t.items.map(service => {
    const outcomesHTML = service.outcomes[lang].map(o => `
      <li><i class="fas fa-check-circle"></i> ${o}</li>
    `).join('');
    
    return `
      <div class="bento-card" style="gap: 1.5rem;">
        <div class="bento-icon"><i class="fas ${service.icon}"></i></div>
        <h3 style="font-size: 1.5rem; font-weight: 800;">${service.title[lang]}</h3>
        <p style="font-size: 1.05rem; line-height: 1.7;">${service.desc[lang]}</p>
        <div style="border-top: 1px solid var(--border-color); padding-top: 1.5rem; margin-top: auto;">
          <h4 style="font-size: 0.9rem; font-weight: 700; text-transform: uppercase; color: var(--accent-teal); letter-spacing: 1px; margin-bottom: 1rem;">
            ${lang === 'ar' ? 'النتائج المتوقعة:' : 'Key Outcomes:'}
          </h4>
          <ul class="outcomes-list">
            ${outcomesHTML}
          </ul>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="page-transition container" style="padding-top: 3rem;">
      <section class="services-hero" style="text-align: center; margin-bottom: 4rem;">
        <h1 class="hero-title" style="font-size: clamp(2rem, 4vw, 3rem);">
          <span>${t.title[lang]}</span>
        </h1>
        <p class="hero-subtitle" style="max-width: 700px; margin: 1.5rem auto 0 auto;">
          ${t.subtitle[lang]}
        </p>
      </section>

      <section class="portfolio-grid" style="grid-template-columns: repeat(auto-fill, minmax(450px, 1fr)); gap: 2rem; margin-bottom: 4rem;">
        ${servicesListHTML}
      </section>

      <section class="bento-card card-cta" style="padding: 4rem 2rem;">
        <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 1rem;">
          ${lang === 'ar' ? 'هل أنت جاهز لتحديد متطلبات مشروعك؟' : 'Ready to Scope Your Project?'}
        </h2>
        <p style="margin-bottom: 2rem; font-size: 1.1rem; max-width: 600px; color: var(--text-secondary);">
          ${lang === 'ar' 
            ? 'استخدم معالج المشاريع التفاعلي لتحديد نطاق عملك والحصول على تسعيرة ووقت تقديري.' 
            : 'Use our interactive project wizard to define your scope and get a cost and timeline estimate.'}
        </p>
        <a href="#/${lang}/start-project" class="btn btn-primary">
          <i class="fas fa-magic"></i> ${translations.nav.startProject[lang]}
        </a>
      </section>
    </div>
  `;
}

export function init(lang) {
  // No custom init logic needed for services view
}
