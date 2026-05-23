// About View Component
import { translations } from '../data.js';

export function render(lang) {
  const t = translations.about;
  const isRTL = lang === 'ar';
  
  // Render timeline steps
  const stepsHTML = t.steps.map(step => `
    <div class="timeline-step">
      <div class="step-num-badge">${step.num}</div>
      <div class="timeline-content">
        <h4>${step.title[lang]}</h4>
        <p>${step.desc[lang]}</p>
      </div>
    </div>
  `).join('');

  // Render comparison table rows
  const comparisonHTML = t.comparison.map(row => `
    <tr>
      <td>${row.feature[lang]}</td>
      <td class="comp-highlight">${row.me[lang]}</td>
      <td style="color: var(--text-muted);">${row.full[lang]}</td>
    </tr>
  `).join('');

  return `
    <div class="page-transition container" style="padding-top: 3rem;">
      <section class="about-hero">
        <h1 class="hero-title" style="font-size: clamp(2rem, 4vw, 3rem); line-height: 1.3;">
          <span>${t.heroTitle[lang]}</span>
        </h1>
        <p class="hero-subtitle" style="max-width: 800px; margin: 1.5rem auto 0 auto;">
          ${t.heroSubtitle[lang]}
        </p>
      </section>

      <section class="about-grid" style="margin-top: 4rem;">
        <div class="bento-card problem-card">
          <div class="bento-icon"><i class="fas fa-exclamation-triangle"></i></div>
          <h3>${t.problemTitle[lang]}</h3>
          <p>${t.problemText[lang]}</p>
        </div>
        <div class="bento-card solution-card">
          <div class="bento-icon"><i class="fas fa-lightbulb"></i></div>
          <h3>${t.solutionTitle[lang]}</h3>
          <p>${t.solutionText[lang]}</p>
        </div>
      </section>

      <section style="padding: 4rem 0; border-top: 1px solid var(--border-color);">
        <div class="section-header">
          <span class="section-tag">${lang === 'ar' ? 'الخطوات' : 'Steps'}</span>
          <h2 class="section-title">${t.processTitle[lang]}</h2>
        </div>
        <div class="about-timeline">
          ${stepsHTML}
        </div>
      </section>

      <section style="padding: 4rem 0; border-top: 1px solid var(--border-color);">
        <div class="section-header">
          <span class="section-tag">${lang === 'ar' ? 'المقارنة' : 'Comparison'}</span>
          <h2 class="section-title">${t.whyMeTitle[lang]}</h2>
        </div>
        <div class="comparison-table-wrapper">
          <table class="comp-table">
            <thead>
              <tr>
                <th>${t.featureLabel[lang]}</th>
                <th style="color: var(--accent-teal);">${t.optionMe[lang]}</th>
                <th style="color: var(--text-muted);">${t.optionFull[lang]}</th>
              </tr>
            </thead>
            <tbody>
              ${comparisonHTML}
            </tbody>
          </table>
        </div>
      </section>

      <section class="bento-card card-cta" style="margin-top: 2rem; padding: 4rem 2rem;">
        <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 1rem;">${t.readyCTA[lang]}</h2>
        <p style="margin-bottom: 2rem; font-size: 1.1rem; max-width: 600px; color: var(--text-secondary);">${t.ctaText[lang]}</p>
        <a href="#/${lang}/contact" class="btn btn-primary">
          <i class="fas fa-calendar-check"></i> ${t.ctaBtn[lang]}
        </a>
      </section>
    </div>
  `;
}

export function init(lang) {
  // No custom init logic needed for about view currently
}
