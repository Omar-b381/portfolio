document.addEventListener('DOMContentLoaded', async function() {
    // --- ELEMENTS ---
    const postContainer = document.getElementById('post-container');
    const relatedContainer = document.getElementById('related-posts-container');
    const tocContainer = document.getElementById('toc-container');
    const langSwitcher = document.getElementById('language-switcher-link');
    const progressBar = document.getElementById('progress-bar');

    // --- HELPER FUNCTIONS ---
    function displayError(container, title, message) {
        container.innerHTML = `<div class="error-message"><h1>${title}</h1><p>${message}</p></div>`;
    }

    // Determine language and fetch the correct JSON file
    async function fetchPosts() {
        const isArabic = document.documentElement.lang === 'ar';
        const jsonPath = isArabic ? '../../blog-posts.json' : '../../blog-posts-en.json';
        try {
            const response = await fetch(jsonPath);
            if (!response.ok) throw new Error(`Network error: ${response.statusText}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            return null;
        }
    }

    // --- RENDER FUNCTIONS ---
    function renderPost(post) {
        const isArabic = document.documentElement.lang === 'ar';
        document.title = `${post.title} - ${isArabic ? 'عمر بدر' : 'Omar Badr'}`;

        const tagsHTML = post.tags.map(tag => `<span>${tag}</span>`).join('');
        
        let authorHTML = '';
        const byText = isArabic ? 'بقلم' : 'By';
        if (post.author && post.author.name) {
            authorHTML = `<span class="post-author"><i class="fas fa-user"></i> ${byText}: <a href="${post.author.linkedin}" target="_blank" class="author-link">${post.author.name} <i class="fab fa-linkedin"></i></a></span>`;
        } else {
            authorHTML = `<span class="post-author"><i class="fas fa-user"></i> ${byText}: Omar Badr</span>`;
        }

        const readTimeText = isArabic ? `قراءة ${post.readTime}` : post.readTime;

        postContainer.innerHTML = `
            <header class="post-header">
                <div class="post-card-tags">${tagsHTML}</div>
                <h1 class="post-title">${post.title}</h1>
                <div class="post-meta">
                    ${authorHTML}
                    <span><i class="fas fa-calendar-alt"></i> ${post.date}</span>
                    <span><i class="fas fa-clock"></i> ${readTimeText}</span>
                </div>
            </header>
            <img src="../../${post.image}" alt="${post.title}" class="post-featured-image">
            <div class="post-content post-body">${post.content || ''}</div>
            <div id="author-box-container"></div> <!-- Placeholder for author box -->
            <div class="back-to-portfolio">
                 <a href="/${isArabic ? 'ar' : 'en'}/blog/" class="cta-button secondary">${isArabic ? 'العودة إلى كل المقالات' : 'Back to All Articles'}</a>
            </div>
        `;
    }

    function renderAuthorBox(author) {
    const authorContainer = document.getElementById('author-box-container');
    // تعديل: التأكد من وجود حقل الصورة قبل العرض
    if (!author || !author.avatar || !authorContainer) return; 
    
    const isArabic = document.documentElement.lang === 'ar';

    authorContainer.innerHTML = `
        <div class="author-box">
            <div class="author-avatar">
                <!-- تعديل: استخدام مسار الصورة مباشرة من ملف JSON -->
                <img src="../../${author.avatar}" alt="${author.name}">
            </div>
            <div class="author-details">
                <h3 class="author-name">${author.name}</h3>
                <p class="author-bio">${isArabic ? 'كاتب هذا المقال وخبير في مجاله.' : 'Author of this post and expert in the field.'}</p>
                <div class="author-socials">
                    <a href="${author.linkedin}" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>
        </div>
    `;

    }

    function renderRelatedPosts(allPosts, currentPostId) {
        const isArabic = document.documentElement.lang === 'ar';
        const related = allPosts.filter(p => p.id !== currentPostId && p.date !== (isArabic ? 'قريباً' : 'Coming Soon'));
        const shuffled = related.sort(() => 0.5 - Math.random());
        const selectedPosts = shuffled.slice(0, 3);
        
        if (selectedPosts.length === 0) {
            document.querySelector('.related-posts-section').style.display = 'none';
            return;
        }

        let relatedHTML = '';
        selectedPosts.forEach(post => {
            const tagsHTML = post.tags.map(tag => `<span>${tag}</span>`).join('');
            relatedHTML += `
                <div class="blog-post-card">
                    <a href="/${isArabic ? 'ar' : 'en'}/${post.link}" class="post-card-image-link">
                        <img src="../../${post.image}" alt="${post.title}" class="post-card-image">
                    </a>
                    <div class="post-card-content">
                        <div class="post-card-tags">${tagsHTML}</div>
                        <h3 class="post-card-title"><a href="/${isArabic ? 'ar' : 'en'}/${post.link}">${post.title}</a></h3>
                        <div class="post-card-meta"><span><i class="fas fa-calendar-alt"></i> ${post.date}</span></div>
                    </div>
                </div>
            `;
        });
        relatedContainer.innerHTML = relatedHTML;
    }

    // --- DYNAMIC FUNCTIONALITY ---
    function generateTOC() {
        const headings = postContainer.querySelectorAll('.post-body h2, .post-body h3');
        if (headings.length < 2) {
            document.querySelector('.post-sidebar').style.display = 'none';
            return;
        };

        let tocHTML = '<ul>';
        headings.forEach((heading, index) => {
            const id = `heading-${index}`;
            heading.id = id;
            const levelClass = heading.tagName === 'H3' ? 'level-h3' : 'level-h2';
            tocHTML += `<li><a href="#${id}" class="${levelClass}">${heading.textContent}</a></li>`;
        });
        tocHTML += '</ul>';
        tocContainer.innerHTML = tocHTML;
    }

    function setupShareButtons(post) {
        const url = window.location.href;
        const text = encodeURIComponent(`Check out this article: ${post.title}`);
        
        document.getElementById('share-twitter').href = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        document.getElementById('share-linkedin').href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        document.getElementById('share-whatsapp').href = `https://api.whatsapp.com/send?text=${text}%20${url}`;
        
        const copyButton = document.getElementById('share-copy');
        copyButton.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(url).then(() => {
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => { copyButton.innerHTML = '<i class="fas fa-copy"></i>'; }, 2000);
            });
        });
    }

    function handleScroll() {
        // Progress Bar
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
        progressBar.style.width = `${scrollPercent}%`;

        // Active TOC link (using Intersection Observer is better, but this is simpler)
        const headings = postContainer.querySelectorAll('.post-body h2, .post-body h3');
        let activeHeadingId = '';
        headings.forEach(heading => {
            const rect = heading.getBoundingClientRect();
            if (rect.top < 150) { // 150px from top
                activeHeadingId = heading.id;
            }
        });

        tocContainer.querySelectorAll('a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${activeHeadingId}`) {
                a.classList.add('active');
            }
        });
    }

    // --- MAIN EXECUTION ---
    async function main() {
        const isArabic = document.documentElement.lang === 'ar';
        const pathSegments = window.location.pathname.split('/').filter(Boolean);
        const postId = pathSegments.pop(); // last part of URL

        if (langSwitcher) {
            langSwitcher.href = `/${isArabic ? 'en' : 'ar'}/posts/${postId}/`;
        }

        if (!postId || pathSegments.indexOf('posts') === -1) {
            displayError(postContainer, isArabic ? 'خطأ' : 'Error', isArabic ? 'المقال غير موجود.' : 'Post not found.');
            return;
        }

        const allPosts = await fetchPosts();
        if (!allPosts) {
            displayError(postContainer, isArabic ? 'خطأ في التحميل' : 'Loading Error', isArabic ? 'لا يمكن تحميل المقالات.' : 'Could not load posts.');
            return;
        }

        const post = allPosts.find(p => p.id === postId);

        if (post) {
            renderPost(post);
            // These must run AFTER post content is in the DOM
            generateTOC(); 
            renderAuthorBox(post.author);
            renderRelatedPosts(allPosts, postId);
            setupShareButtons(post);
            window.addEventListener('scroll', handleScroll);
        } else {
            displayError(postContainer, '404', isArabic ? 'المقال غير موجود.' : 'Post not found.');
        }
    }

    main();
});