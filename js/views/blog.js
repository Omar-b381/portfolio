// Blog View Component
import { translations, blogPosts } from '../data.js';

export function render(lang, postId = null) {
  const t = translations.blog;
  const isRTL = lang === 'ar';
  
  if (postId) {
    // RENDER SINGLE BLOG POST
    const post = blogPosts.find(p => p.id === postId);
    if (!post) {
      return `
        <div class="page-transition container" style="padding-top: 3rem; text-align: center;">
          <a href="#/${lang}/blog" class="back-link">
            <i class="fas ${isRTL ? 'fa-arrow-right' : 'fa-arrow-left'}"></i> ${isRTL ? 'العودة إلى المدونة' : 'Back to Blog'}
          </a>
          <div style="margin-top: 5rem;">
            <h2>${isRTL ? 'المقال غير موجود' : 'Article Not Found'}</h2>
          </div>
        </div>
      `;
    }
    
    // Author block
    let authorHTML = `${t.by[lang]} ${isRTL ? 'عمر بدر' : 'Omar Badr'}`;
    if (post.author && post.author.name) {
      const authorName = lang === 'ar' ? 'عمر بدر' : 'Omar Badr';
      authorHTML = `${t.by[lang]} <a href="${post.author.linkedin}" target="_blank" rel="noopener noreferrer" style="color:var(--accent-blue); font-weight:700;">${authorName}</a>`;
    }

    return `
      <div class="page-transition container blog-post-view">
        <header class="blog-post-header">
          <a href="#/${lang}/blog" class="back-link">
            <i class="fas ${isRTL ? 'fa-arrow-right' : 'fa-arrow-left'}"></i> ${isRTL ? 'العودة إلى المدونة' : 'Back to Blog'}
          </a>
          <div class="blog-meta" style="margin-top:1.5rem;">
            <span><i class="fas fa-calendar-alt"></i> ${post.date[lang]}</span>
            <span><i class="fas fa-clock"></i> ${post.readTime[lang]}</span>
          </div>
          <h1 class="blog-post-title">${post.title[lang]}</h1>
          <p style="color:var(--text-muted); font-size:1.05rem;">${authorHTML}</p>
        </header>

        <img src="${post.image}" alt="${post.title[lang]}" class="blog-post-img">

        <article class="blog-post-body">
          ${post.content[lang]}
          
          <hr>
          <div class="bento-card card-cta" style="padding: 2.5rem 1.5rem;">
            <h3>${isRTL ? 'هل أعجبك المقال؟' : 'Did you enjoy this article?'}</h3>
            <p>${isRTL ? 'اشترك في النشرة الإخبارية للحصول على جديد المقالات مباشرة.' : 'Subscribe to our newsletter to receive new articles directly.'}</p>
            <a href="#/${lang}/" class="btn btn-primary">${isRTL ? 'اشترك الآن' : 'Subscribe Now'}</a>
          </div>
        </article>
      </div>
    `;
  } else {
    // RENDER MAIN BLOG PAGE
    if (blogPosts.length === 0) {
      return `
        <div class="page-transition container" style="padding-top: 3rem; text-align: center;">
          <h2>${t.title[lang]}</h2>
          <p style="margin-top:2rem; color:var(--text-secondary);">${isRTL ? 'لا توجد مقالات حالياً.' : 'No articles available at the moment.'}</p>
        </div>
      `;
    }

    // Extract all unique tags
    const allTags = new Set();
    blogPosts.forEach(p => p.tags[lang].forEach(tag => allTags.add(tag)));
    
    const tagsButtonsHTML = Array.from(allTags).map(tag => `
      <button class="filter-btn" data-tag="${tag}">${tag}</button>
    `).join('');

    // Highlight latest post as featured
    const featuredPost = blogPosts[0];
    const featuredTagsHTML = featuredPost.tags[lang].map(tag => `<span class="tag">${tag}</span>`).join('');
    
    // Grid cards (excluding the featured one if preferred, or including all. Let's list all in grid and have featured at top)
    const otherPosts = blogPosts.slice(1);
    const gridCardsHTML = otherPosts.map(post => {
      const tagsHTML = post.tags[lang].map(tag => `<span class="tag">${tag}</span>`).join('');
      const matchText = (post.title[lang] + " " + post.excerpt[lang]).toLowerCase();
      const matchTags = JSON.stringify(post.tags[lang]).toLowerCase();
      
      return `
        <div class="blog-card" data-text="${matchText}" data-tags='${matchTags}'>
          <div class="blog-img-wrapper">
            <img src="${post.image}" alt="${post.title[lang]}" class="blog-img" loading="lazy">
          </div>
          <div class="blog-info">
            <div class="blog-meta">
              <span><i class="fas fa-calendar-alt"></i> ${post.date[lang]}</span>
              <span><i class="fas fa-clock"></i> ${post.readTime[lang]}</span>
            </div>
            <h3>${post.title[lang]}</h3>
            <p>${post.excerpt[lang]}</p>
            <div class="project-tags" style="margin-top:auto;">${tagsHTML}</div>
          </div>
          <div class="project-footer" style="padding: 1rem 1.5rem;">
            <a href="#/${lang}/posts/${post.id}" class="read-more-link">
              ${t.readMore[lang]} <i class="fas ${isRTL ? 'fa-arrow-left' : 'fa-arrow-right'}"></i>
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

        <!-- CONTROLS -->
        <div class="blog-controls">
          <div class="search-box">
            <input type="text" id="blog-search-input" placeholder="${t.searchPlaceholder[lang]}">
            <i class="fas fa-search"></i>
          </div>
          <div class="portfolio-filters" id="blog-tags-container" style="margin-bottom:0;">
            <button class="filter-btn active" data-tag="all">${t.allTopics[lang]}</button>
            ${tagsButtonsHTML}
          </div>
        </div>

        <!-- FEATURED POST -->
        <section class="featured-post-container" id="featured-post-wrapper" style="margin-bottom: 4rem;">
          <h3 style="font-size: 1.4rem; font-weight:800; margin-bottom: 1.5rem;">${t.latest[lang]}</h3>
          <div class="bento-card" style="display:grid; grid-template-columns: 1.1fr 0.9fr; gap:2.5rem; padding: 2rem; align-items: center;">
            <div style="border-radius: var(--radius-md); overflow:hidden; aspect-ratio:16/10;">
              <img src="${featuredPost.image}" alt="${featuredPost.title[lang]}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div style="display:flex; flex-direction:column; gap:1.2rem; height:100%; justify-content:center;">
              <div class="blog-meta">
                <span><i class="fas fa-calendar-alt"></i> ${featuredPost.date[lang]}</span>
                <span><i class="fas fa-clock"></i> ${featuredPost.readTime[lang]}</span>
              </div>
              <h2 style="font-size: 1.6rem; font-weight:800; line-height: 1.3;">
                <a href="#/${lang}/posts/${featuredPost.id}" style="color:var(--text-primary);">${featuredPost.title[lang]}</a>
              </h2>
              <p style="color:var(--text-secondary); font-size:0.95rem;">${featuredPost.excerpt[lang]}</p>
              <div class="project-tags">${featuredTagsHTML}</div>
              <div style="margin-top: 0.5rem;">
                <a href="#/${lang}/posts/${featuredPost.id}" class="btn btn-primary">${t.readMore[lang]}</a>
              </div>
            </div>
          </div>
        </section>

        <!-- ALL POSTS -->
        <section>
          <h3 style="font-size: 1.4rem; font-weight:800; margin-bottom: 1.5rem;">${t.allPosts[lang]}</h3>
          <div class="blog-grid" id="blog-grid-container">
            ${gridCardsHTML}
          </div>
          <p id="blog-no-results" style="display:none; text-align:center; padding: 3rem; color:var(--text-muted); font-size:1.1rem;">
            ${t.noResults[lang]}
          </p>
        </section>
      </div>
    `;
  }
}

export function init(lang, postId = null) {
  if (postId) return; // No init logic for single post detail view

  const searchInput = document.getElementById('blog-search-input');
  const tagButtons = document.querySelectorAll('#blog-tags-container .filter-btn');
  const cards = document.querySelectorAll('.blog-card');
  const featuredWrapper = document.getElementById('featured-post-wrapper');
  const noResultsText = document.getElementById('blog-no-results');

  let activeTag = 'all';
  let searchQuery = '';

  function filterPosts() {
    let visibleCount = 0;
    
    // If filtering is applied, we hide the featured post as it might not match
    if (activeTag !== 'all' || searchQuery !== '') {
      if (featuredWrapper) featuredWrapper.style.display = 'none';
    } else {
      if (featuredWrapper) featuredWrapper.style.display = 'block';
    }

    cards.forEach(card => {
      const text = card.getAttribute('data-text');
      const tags = card.getAttribute('data-tags');
      
      const matchesSearch = text.includes(searchQuery);
      const matchesTag = activeTag === 'all' || tags.includes(activeTag.toLowerCase());
      
      if (matchesSearch && matchesTag) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.4s ease forwards';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (visibleCount === 0 && (activeTag !== 'all' || searchQuery !== '')) {
      if (noResultsText) noResultsText.style.display = 'block';
    } else {
      if (noResultsText) noResultsText.style.display = 'none';
    }
  }

  // Bind Tag Filter Buttons
  tagButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tagButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTag = btn.getAttribute('data-tag');
      filterPosts();
    });
  });

  // Bind Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterPosts();
    });
  }
}
