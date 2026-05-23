// Home View Component
import { translations, portfolioProjects, blogPosts } from '../data.js';
import { initSandboxChart } from '../components.js';

export function render(lang) {
  const t = translations.home;
  const ts = translations.sandbox;
  const tn = translations.newsletter;
  const isRTL = lang === 'ar';

  // Retrieve featured projects (first 3)
  const featured = portfolioProjects.slice(0, 3);
  const featuredHTML = featured.map(project => {
    const tagsHTML = project.tags[lang].map(tag => `<span class="tag">${tag}</span>`).join('');
    return `
      <div class="project-card">
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
            ${translations.portfolio.viewDetails[lang]} <i class="fas ${isRTL ? 'fa-arrow-left' : 'fa-arrow-right'}"></i>
          </a>
        </div>
      </div>
    `;
  }).join('');

  // Bento Services Section
  const services = translations.services.items;
  const servicesHTML = `
    <div class="bento-grid">
      <div class="bento-card card-large">
        <div class="bento-icon"><i class="fas ${services[0].icon}"></i></div>
        <h3>${services[0].title[lang]}</h3>
        <p>${services[0].desc[lang]}</p>
        <ul class="outcomes-list">
          ${services[0].outcomes[lang].map(o => `<li><i class="fas fa-check-circle"></i>${o}</li>`).join('')}
        </ul>
      </div>
      <div class="bento-card">
        <div class="bento-icon"><i class="fas ${services[1].icon}"></i></div>
        <h3>${services[1].title[lang]}</h3>
        <p>${services[1].desc[lang]}</p>
      </div>
      <div class="bento-card">
        <div class="bento-icon"><i class="fas ${services[2].icon}"></i></div>
        <h3>${services[2].title[lang]}</h3>
        <p>${services[2].desc[lang]}</p>
      </div>
      <div class="bento-card card-cta">
        <h3>${lang === 'ar' ? 'هل لديك فكرة مشروع؟' : 'Have a Project Idea?'}</h3>
        <p>${lang === 'ar' ? 'لنحول فكرتك إلى واقع ملموس.' : "Let's turn your idea into a tangible reality."}</p>
        <a href="#/${lang}/start-project" class="btn btn-primary">
          ${lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}
        </a>
      </div>
    </div>
  `;

  // Testimonials
  const testimonials = [
    {
      text: {
        ar: "والله محترم ومميز.. تأخرت عليه في التسليم ومع ذلك كان في غاية الاحترام والتعاون شاكر لك يا أ.عمر وبإذن الله ما يكون آخر تعامل",
        en: "Truly respectful and professional. I was late in delivering my part, yet he remained very cooperative and polite. Thank you, Mr. Omar. Hopefully, this won’t be our last collaboration."
      },
      author: { ar: "عبد الملك", en: "Abdulmalik" },
      project: { ar: "عميل من مستقل", en: "Client from Mostaql" }
    },
    {
      text: {
        ar: "عمر شخص محترف و سريع في العمل ومتعاون جدا انصح بالعمل معه شكراً عمر",
        en: "Omar is a professional, fast, and very cooperative. I highly recommend working with him. Thank you, Omar."
      },
      author: { ar: "عماد", en: "Emad" },
      project: { ar: "عميل من مستقل", en: "Client from Mostaql" }
    },
    {
      text: {
        ar: "الاستاذ عمر شاكر ومقدر لكم التعاون معه جدا سلسل والاحترفية عالية بادارة البيانات وتحليلها",
        en: "Mr. Omar, I truly appreciate working with you. The process was very smooth, and your professionalism in data management and analysis is outstanding."
      },
      author: { ar: "هشام", en: "Hisham" },
      project: { ar: "عميل من مستقل", en: "Client from Mostaql" }
    }
  ];

  const testimonialsHTML = testimonials.map(item => `
    <div class="bento-card">
      <div class="bento-icon"><i class="fas fa-quote-left" style="opacity: 0.15;"></i></div>
      <p style="font-style: italic;">"${item.text[lang]}"</p>
      <div style="border-top: 1px solid var(--border-color); padding-top: 1rem; margin-top: auto;">
        <h4 style="margin:0; font-size: 1rem;">${item.author[lang]}</h4>
        <small style="color: var(--text-muted);">${item.project[lang]}</small>
      </div>
    </div>
  `).join('');

  return `
    <div class="page-transition">
      <!-- HERO -->
      <section class="hero-section">
        <div class="container hero-grid">
          <div class="hero-text">
            <h1 class="hero-title">${isRTL ? 'أصنع من بياناتك' : 'Turn Your Data'} <br><span>${isRTL ? 'أقوى أصولك' : 'Into Your Strongest Asset'}</span></h1>
            <p class="hero-subtitle">${t.heroSubtitle[lang]}</p>
            <div class="hero-cta">
              <a href="#/${lang}/portfolio" class="btn btn-primary">${t.exploreWork[lang]}</a>
              <a href="#/${lang}/contact" class="btn btn-secondary">${t.discussProject[lang]}</a>
            </div>
          </div>
          <div class="hero-visual">
            <div class="glow-circle"></div>
            <div class="interactive-sphere">
              <i class="fas fa-brain interactive-sphere-icon"></i>
            </div>
          </div>
        </div>
      </section>

      <!-- STATS -->
      <section class="stats-bar">
        <div class="container stats-grid">
          <div>
            <div class="stat-val">+4</div>
            <div class="stat-label">${t.stats.experience[lang]}</div>
          </div>
          <div>
            <div class="stat-val">+50</div>
            <div class="stat-label">${t.stats.completed[lang]}</div>
          </div>
          <div>
            <div class="stat-val">98%</div>
            <div class="stat-label">${t.stats.satisfaction[lang]}</div>
          </div>
        </div>
      </section>

      <!-- SERVICES -->
      <section class="services-section" style="padding: 5rem 0;">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">${lang === 'ar' ? 'الخدمات' : 'Services'}</span>
            <h2 class="section-title">${t.servicesTitle[lang]}</h2>
            <p class="section-subtitle">${translations.services.subtitle[lang]}</p>
          </div>
          ${servicesHTML}
        </div>
      </section>

      <!-- DATA SANDBOX (WOW FACTOR) -->
      <section class="sandbox-section">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">${lang === 'ar' ? 'لوحة تحكم تفاعلية' : 'Interactive Sandbox'}</span>
            <h2 class="section-title">${ts.title[lang]}</h2>
            <p class="section-subtitle">${ts.subtitle[lang]}</p>
          </div>
          <div class="sandbox-container">
            <div class="sandbox-card">
              <div class="sandbox-controls">
                <label class="sandbox-select-label" for="sandbox-select-industry">${ts.filterIndustry[lang]}</label>
                <select id="sandbox-select-industry" class="sandbox-select">
                  <option value="retail" selected>${ts.indRetail[lang]}</option>
                  <option value="tech">${ts.indTech[lang]}</option>
                  <option value="healthcare">${ts.indHealth[lang]}</option>
                </select>
              </div>
              <div class="sandbox-stats">
                <div class="sandbox-stat-item">
                  <h5>${ts.predSales[lang]}</h5>
                  <div class="sandbox-stat-val" id="sandbox-predicted-value">$390,000</div>
                </div>
                <div class="sandbox-stat-item">
                  <h5>${ts.accuracy[lang]}</h5>
                  <div class="sandbox-stat-val" id="sandbox-accuracy-value">89.4%</div>
                </div>
              </div>
            </div>
            <div class="chart-container">
              <svg class="chart-svg" viewBox="0 0 500 250">
                <defs>
                  <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="var(--accent-blue)" stop-opacity="0.3"></stop>
                    <stop offset="100%" stop-color="var(--accent-blue)" stop-opacity="0.00"></stop>
                  </linearGradient>
                </defs>
                <!-- Grid Lines -->
                <line class="chart-grid" x1="40" y1="40" x2="460" y2="40"></line>
                <line class="chart-grid" x1="40" y1="90" x2="460" y2="90"></line>
                <line class="chart-grid" x1="40" y1="140" x2="460" y2="140"></line>
                <line class="chart-grid" x1="40" y1="190" x2="460" y2="190"></line>
                
                <!-- Y-axis labels -->
                <text class="chart-text" x="30" y="44" text-anchor="end">800k</text>
                <text class="chart-text" x="30" y="94" text-anchor="end">500k</text>
                <text class="chart-text" x="30" y="144" text-anchor="end">300k</text>
                <text class="chart-text" x="30" y="194" text-anchor="end">100k</text>
                
                <!-- Area and Line Paths -->
                <path class="chart-area" id="sandbox-chart-area" d=""></path>
                <path class="chart-line" id="sandbox-chart-line" d=""></path>
                
                <!-- Interaction points -->
                <g id="sandbox-chart-points"></g>
                <!-- X-axis Labels -->
                <g id="sandbox-chart-x-labels"></g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <!-- PORTFOLIO SHOWCASE -->
      <section class="portfolio-showcase" style="padding: 5rem 0;">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">${lang === 'ar' ? 'المحفظة المهنية' : 'Portfolio'}</span>
            <h2 class="section-title">${t.projectsTitle[lang]}</h2>
            <p class="section-subtitle">${translations.portfolio.subtitle[lang]}</p>
          </div>
          <div class="portfolio-grid">
            ${featuredHTML}
          </div>
          <div style="text-align: center; margin-top: 3.5rem;">
            <a href="#/${lang}/portfolio" class="btn btn-secondary">${t.viewAllProjects[lang]} <i class="fas ${isRTL ? 'fa-arrow-left' : 'fa-arrow-right'}"></i></a>
          </div>
        </div>
      </section>

      <!-- TESTIMONIALS -->
      <section class="testimonials-section" style="padding: 5rem 0; background-color: var(--bg-secondary);">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">${lang === 'ar' ? 'الآراء' : 'Testimonials'}</span>
            <h2 class="section-title">${t.testimonialsTitle[lang]}</h2>
            <p class="section-subtitle">${lang === 'ar' ? 'شهادات فخورة من عملاء عملت معهم على منصات العمل الحر.' : 'Proud testimonials from clients I collaborated with on freelance platforms.'}</p>
          </div>
          <div class="portfolio-grid">
            ${testimonialsHTML}
          </div>
        </div>
      </section>

      <!-- NEWSLETTER (CONNECTED TO BREVO) -->
      <section class="newsletter-section">
        <div class="container">
          <div class="newsletter-card">
            <h3>${tn.title[lang]}</h3>
            <p>${tn.desc[lang]}</p>
            
            <form id="spa-newsletter-form" class="newsletter-form">
              <input 
                id="spa-email-input"
                type="email" 
                placeholder="${tn.placeholder[lang]}" 
                required
              >
              <button type="submit" class="btn btn-primary">${tn.btn[lang]}</button>
            </form>
            <p id="spa-newsletter-status" class="form-status" style="display: none;"></p>

            <!-- Hidden Brevo form integration -->
            <div style="display:none;">
              <iframe id="hidden-brevo-iframe" name="hidden-brevo-iframe"></iframe>
              <form 
                id="real-brevo-form"
                method="POST" 
                action="https://490e2f14.sibforms.com/serve/MUIFACe1fTJui8C7Tjdf74_j4K_C7phYKEuGkAocy0lKQSxzB5bE5OwOL4NVULS4DPVs1LnfPaDhTsvO-zi0134kziKvF9w1H2jz5Aqk47vPkQMFz1ZUG2R07yg0EqEivRhMwLxDLyvr3rZ5Qhif_zIuiYLOxX2sKqWG9mA3gw79bSMt9uyw5L7JWdGDSH0PyzbNE4MKjw7KsuvM"
                target="hidden-brevo-iframe"
              >
                <input type="email" id="brevo-email-input" name="EMAIL" />
                <input type="hidden" name="locale" value="${lang}">
              </form>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section style="padding: 5rem 0; text-align: center; border-top: 1px solid var(--border-color);">
        <div class="container" style="max-width: 800px; display:flex; flex-direction:column; gap:1.5rem;">
          <h2 style="font-size:2.3rem;">${t.readyTitle[lang]}</h2>
          <p style="color:var(--text-secondary);">${t.readySubtitle[lang]}</p>
          <div style="margin-top:1rem;">
            <a href="#/${lang}/contact" class="btn btn-primary">${t.contactNow[lang]}</a>
          </div>
        </div>
      </section>
    </div>
  `;
}

export function init(lang) {
  // Init the SVG interactive chart
  initSandboxChart('sandbox-chart-container', lang);

  // Newsletter Brevo functionality
  const customForm = document.getElementById('spa-newsletter-form');
  const realForm = document.getElementById('real-brevo-form');
  const customEmailInput = document.getElementById('spa-email-input');
  const brevoEmailInput = document.getElementById('brevo-email-input');
  const newsletterStatus = document.getElementById('spa-newsletter-status');
  
  if (customForm) {
    customForm.addEventListener('submit', function(e) {
      e.preventDefault();

      if (!customEmailInput.checkValidity() || customEmailInput.value === '') {
        newsletterStatus.textContent = translations.newsletter.error[lang];
        newsletterStatus.className = 'form-status error';
        newsletterStatus.style.display = 'block';
        return;
      }

      // Copy email to hidden form and submit
      brevoEmailInput.value = customEmailInput.value;
      realForm.submit();

      // Show success
      newsletterStatus.textContent = translations.newsletter.success[lang];
      newsletterStatus.className = 'form-status success';
      newsletterStatus.style.display = 'block';
      
      customEmailInput.value = '';
    });
  }
}
