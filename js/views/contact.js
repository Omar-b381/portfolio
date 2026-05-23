// Contact View Component
import { translations } from '../data.js';

export function render(lang) {
  const t = translations.contact;
  const isRTL = lang === 'ar';

  return `
    <div class="page-transition container" style="padding-top: 3rem;">
      <section style="text-align: center; margin-bottom: 3rem;">
        <h1 class="hero-title" style="font-size: clamp(2rem, 4vw, 3rem);">
          <span>${t.title[lang]}</span>
        </h1>
        <p class="hero-subtitle" style="max-width: 700px; margin: 1.5rem auto 0 auto;">
          ${t.subtitle[lang]}
        </p>
      </section>

      <div class="contact-grid">
        <!-- CONTACT INFO -->
        <div class="contact-info-panel">
          <h2 style="font-size: 1.6rem; font-weight: 800; border-bottom:1px solid var(--border-color); padding-bottom: 0.5rem;">
            ${t.infoTitle[lang]}
          </h2>
          <p style="color:var(--text-secondary); margin-bottom: 1.5rem;">${t.infoSub[lang]}</p>
          
          <div class="contact-method">
            <div class="contact-method-icon"><i class="fas fa-envelope"></i></div>
            <div class="contact-method-details">
              <span class="contact-method-label">${t.email[lang]}</span>
              <a href="mailto:omar.work381@gmail.com" class="contact-method-val" style="color: var(--accent-blue);">
                omar.work381@gmail.com
              </a>
            </div>
          </div>

          <div class="contact-method">
            <div class="contact-method-icon"><i class="fab fa-whatsapp"></i></div>
            <div class="contact-method-details">
              <span class="contact-method-label">${t.whatsapp[lang]}</span>
              <a href="https://wa.me/201220224039" target="_blank" rel="noopener noreferrer" class="contact-method-val" style="color: var(--accent-teal);">
                ${t.whatsappLink[lang]} <i class="fas fa-external-link-alt" style="font-size:0.8rem;"></i>
              </a>
            </div>
          </div>

          <div class="contact-method">
            <div class="contact-method-icon"><i class="fas fa-calendar-alt"></i></div>
            <div class="contact-method-details">
              <span class="contact-method-label">${t.meeting[lang]}</span>
              <a href="https://calendly.com/omar-work381/30min" target="_blank" rel="noopener noreferrer" class="contact-method-val" style="color: var(--accent-blue);">
                ${t.meetingLink[lang]} <i class="fas fa-external-link-alt" style="font-size:0.8rem;"></i>
              </a>
            </div>
          </div>

          <div class="contact-socials-wrapper">
            <span class="contact-method-label">${t.followMe[lang]}</span>
            <div class="contact-socials-list">
              <a href="https://www.linkedin.com/in/omarbadrdata/" target="_blank" rel="noopener noreferrer" class="icon-btn" aria-label="LinkedIn">
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a href="https://github.com/Omar-b381" target="_blank" rel="noopener noreferrer" class="icon-btn" aria-label="GitHub">
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- FORM -->
        <div class="form-panel">
          <h2 class="form-title">${t.formTitle[lang]}</h2>
          <form id="spa-contact-form" novalidate>
            <div class="form-group">
              <label for="contact-name">${t.labelName[lang]}*</label>
              <input type="text" id="contact-name" name="name" class="form-control" placeholder="${t.placeholderName[lang]}" required autocomplete="name">
              <span id="contact-name-error" class="form-status error" style="display:none; padding: 0.2rem; margin: 0; text-align:start; background:none; border:none; font-size:0.8rem;"></span>
            </div>

            <div class="form-group">
              <label for="contact-email">${t.labelEmail[lang]}*</label>
              <input type="email" id="contact-email" name="email" class="form-control" placeholder="${t.placeholderEmail[lang]}" required autocomplete="email">
              <span id="contact-email-error" class="form-status error" style="display:none; padding: 0.2rem; margin: 0; text-align:start; background:none; border:none; font-size:0.8rem;"></span>
            </div>

            <div class="form-group">
              <label for="contact-msg">${t.labelMessage[lang]}*</label>
              <textarea id="contact-msg" name="message" class="form-control form-textarea" placeholder="${t.placeholderMessage[lang]}" required minlength="10"></textarea>
              <span id="contact-msg-error" class="form-status error" style="display:none; padding: 0.2rem; margin: 0; text-align:start; background:none; border:none; font-size:0.8rem;"></span>
            </div>

            <button type="submit" class="btn btn-primary" id="contact-submit-btn" style="width: 100%; justify-content: center;">
              <i class="fas fa-paper-plane"></i> ${t.submit[lang]}
            </button>
            
            <div id="contact-status-msg" class="form-status" style="margin-top:1.5rem;"></div>
          </form>
        </div>
      </div>
    </div>
  `;
}

export function init(lang) {
  const form = document.getElementById('spa-contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const statusMsg = document.getElementById('contact-status-msg');

  if (!form) return;

  const isRTL = lang === 'ar';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const msgInput = document.getElementById('contact-msg');

    const nameErr = document.getElementById('contact-name-error');
    const emailErr = document.getElementById('contact-email-error');
    const msgErr = document.getElementById('contact-msg-error');

    // Reset messages
    nameErr.style.display = 'none';
    emailErr.style.display = 'none';
    msgErr.style.display = 'none';
    statusMsg.style.display = 'none';

    let isValid = true;

    if (!nameInput.value.trim()) {
      nameErr.textContent = isRTL ? 'الرجاء إدخال الاسم' : 'Please enter your name';
      nameErr.style.display = 'block';
      isValid = false;
    }

    if (!emailInput.value.trim() || !emailInput.checkValidity()) {
      emailErr.textContent = isRTL ? 'الرجاء إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address';
      emailErr.style.display = 'block';
      isValid = false;
    }

    if (msgInput.value.trim().length < 10) {
      msgErr.textContent = isRTL ? 'الرجاء كتابة رسالة (10 أحرف على الأقل)' : 'Please enter a message (at least 10 characters)';
      msgErr.style.display = 'block';
      isValid = false;
    }

    if (!isValid) return;

    // Send Formspree post request
    submitBtn.disabled = true;
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.textContent = translations.contact.sending[lang];
    
    statusMsg.textContent = translations.contact.sending[lang];
    statusMsg.className = 'form-status';
    statusMsg.style.display = 'block';

    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/mblkpegv', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Success
        statusMsg.textContent = translations.contact.success[lang];
        statusMsg.className = 'form-status success';
        form.reset();
        setTimeout(() => {
          statusMsg.style.display = 'none';
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
        }, 5000);
      } else {
        throw new Error('Formspree returned error status');
      }
    } catch (err) {
      // Error
      statusMsg.textContent = translations.contact.error[lang];
      statusMsg.className = 'form-status error';
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
    }
  });
}
