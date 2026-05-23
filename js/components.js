// Common Layout Components for Omar Badr Portfolio
import { translations } from './data.js';

// Header component rendering
export function renderHeader(currentView, currentLang) {
  const headerRoot = document.getElementById('header-root');
  if (!headerRoot) return;

  const t = translations.nav;
  const isRTL = currentLang === 'ar';
  
  // Calculate language switcher target hash
  const otherLang = currentLang === 'ar' ? 'en' : 'ar';
  let otherLangHash = window.location.hash;
  if (otherLangHash.includes(`/${currentLang}/`)) {
    otherLangHash = otherLangHash.replace(`/${currentLang}/`, `/${otherLang}/`);
  } else if (otherLangHash.includes(`/${currentLang}`)) {
    otherLangHash = otherLangHash.replace(`/${currentLang}`, `/${otherLang}`);
  } else {
    otherLangHash = `#/${otherLang}/`;
  }

  const items = [
    { key: 'home', hash: `#/${currentLang}/` },
    { key: 'services', hash: `#/${currentLang}/services` },
    { key: 'portfolio', hash: `#/${currentLang}/portfolio` },
    { key: 'blog', hash: `#/${currentLang}/blog` },
    { key: 'about', hash: `#/${currentLang}/about` },
    { key: 'startProject', hash: `#/${currentLang}/start-project` },
    { key: 'contact', hash: `#/${currentLang}/contact` }
  ];

  const navLinksHTML = items.map(item => {
    const isActive = currentView === item.key || (item.key === 'portfolio' && currentView === 'project-detail') || (item.key === 'blog' && currentView === 'blog-detail');
    return `
      <a href="${item.hash}" class="nav-item ${isActive ? 'active' : ''}" data-view="${item.key}">
        ${t[item.key][currentLang]}
      </a>
    `;
  }).join('');

  headerRoot.innerHTML = `
    <div class="navbar">
      <div class="container nav-container">
        <a href="#/${currentLang}/" class="logo">
          <i class="fas fa-chart-line"></i>
          <span>${isRTL ? 'عمر بدر' : 'Omar Badr'}</span>
        </a>
        <nav class="nav-links" id="navbar-links">
          ${navLinksHTML}
        </nav>
        <div class="nav-controls">
          <button class="icon-btn" id="theme-toggle-btn" aria-label="Toggle Theme">
            <i class="fas fa-moon"></i>
          </button>
          <a href="${otherLangHash}" class="lang-btn">
            ${isRTL ? 'English' : 'العربية'}
          </a>
          <button class="icon-btn menu-toggle" id="menu-toggle-btn" aria-label="Toggle Mobile Menu">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  // Attach navbar events
  const themeToggle = document.getElementById('theme-toggle-btn');
  if (themeToggle) {
    // Update theme toggle icon based on current theme class
    const isLight = document.body.classList.contains('light-theme');
    themeToggle.innerHTML = `<i class="fas ${isLight ? 'fa-moon' : 'fa-sun'}"></i>`;
    
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const activeLight = document.body.classList.contains('light-theme');
      themeToggle.innerHTML = `<i class="fas ${activeLight ? 'fa-moon' : 'fa-sun'}"></i>`;
      // Save theme preference
      localStorage.setItem('theme', activeLight ? 'light' : 'dark');
    });
  }

  // Mobile navigation drawer toggle
  const menuToggle = document.getElementById('menu-toggle-btn');
  const navLinks = document.getElementById('navbar-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      menuToggle.innerHTML = `<i class="fas ${isOpen ? 'fa-times' : 'fa-bars'}"></i>`;
    });
  }
}

// Footer rendering
export function renderFooter(currentLang) {
  const footerRoot = document.getElementById('footer-root');
  if (!footerRoot) return;
  const copyrightText = translations.footer.copyright[currentLang];
  footerRoot.innerHTML = `
    <footer>
      <div class="container">
        <p>${copyrightText}</p>
      </div>
    </footer>
  `;
}

// Sandbox Interactive Chart Component
const chartData = {
  retail: {
    points: [90, 140, 110, 200, 290, 250, 390],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    labelsAr: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو'],
    accuracy: '89.4%',
    pred: '$390,000'
  },
  tech: {
    points: [140, 190, 320, 380, 500, 620, 780],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    labelsAr: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو'],
    accuracy: '94.2%',
    pred: '$780,000'
  },
  healthcare: {
    points: [110, 120, 170, 150, 230, 270, 310],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    labelsAr: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو'],
    accuracy: '91.8%',
    pred: '$310,000'
  }
};

export function initSandboxChart(containerId, currentLang) {
  const selectElement = document.getElementById('sandbox-select-industry');
  if (!selectElement) return;

  const isRTL = currentLang === 'ar';
  
  function updateChart(industry) {
    const data = chartData[industry];
    const maxVal = 900;
    const svgWidth = 500;
    const svgHeight = 250;
    const padding = 40;
    const pointsCount = data.points.length;
    
    // Map points to SVG coordinates
    const coords = data.points.map((val, index) => {
      const x = padding + (index * (svgWidth - 2 * padding) / (pointsCount - 1));
      const y = svgHeight - padding - (val * (svgHeight - 2 * padding) / maxVal);
      return { x, y, val };
    });
    
    // Generate SVG path string (Line and Area)
    let linePath = `M ${coords[0].x} ${coords[0].y}`;
    let areaPath = `M ${coords[0].x} ${svgHeight - padding} L ${coords[0].x} ${coords[0].y}`;
    
    for (let i = 1; i < coords.length; i++) {
      linePath += ` L ${coords[i].x} ${coords[i].y}`;
      areaPath += ` L ${coords[i].x} ${coords[i].y}`;
    }
    areaPath += ` L ${coords[coords.length - 1].x} ${svgHeight - padding} Z`;
    
    // Update SVG elements
    const pathLine = document.getElementById('sandbox-chart-line');
    const pathArea = document.getElementById('sandbox-chart-area');
    const pointsGroup = document.getElementById('sandbox-chart-points');
    const xLabelsGroup = document.getElementById('sandbox-chart-x-labels');
    
    if (pathLine) pathLine.setAttribute('d', linePath);
    if (pathArea) pathArea.setAttribute('d', areaPath);
    
    // Update Stats text
    const predValEl = document.getElementById('sandbox-predicted-value');
    const accValEl = document.getElementById('sandbox-accuracy-value');
    
    if (predValEl) predValEl.textContent = data.pred;
    if (accValEl) accValEl.textContent = data.accuracy;
    
    // Update points
    if (pointsGroup) {
      pointsGroup.innerHTML = coords.map((c, i) => `
        <circle class="chart-point" cx="${c.x}" cy="${c.y}" r="6" data-value="${c.val}" data-index="${i}"></circle>
      `).join('');
    }
    
    // Update X-axis labels
    if (xLabelsGroup) {
      xLabelsGroup.innerHTML = coords.map((c, i) => `
        <text class="chart-text" x="${c.x}" y="${svgHeight - 15}" text-anchor="middle">
          ${isRTL ? data.labelsAr[i] : data.labels[i]}
        </text>
      `).join('');
    }
  }

  // Bind change event
  selectElement.addEventListener('change', (e) => {
    updateChart(e.target.value);
  });
  
  // Initial draw
  updateChart(selectElement.value);
}
