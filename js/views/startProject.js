// Start Project Wizard View Component
import { translations } from '../data.js';

export function render(lang) {
  const t = translations.startProject;
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

      <div class="bento-card wizard-card">
        <!-- Progress Steps indicator -->
        <div class="wizard-steps-header">
          <div class="wizard-step-indicator active" data-step="1">
            <div class="indicator-circle">1</div>
            <div class="indicator-title">${t.steps['1'][lang]}</div>
          </div>
          <div class="wizard-step-indicator" data-step="2">
            <div class="indicator-circle">2</div>
            <div class="indicator-title">${t.steps['2'][lang]}</div>
          </div>
          <div class="wizard-step-indicator" data-step="3">
            <div class="indicator-circle">3</div>
            <div class="indicator-title">${t.steps['3'][lang]}</div>
          </div>
        </div>

        <form id="project-wizard-form" novalidate>
          <!-- STEP 1: Project Type -->
          <div class="wizard-step-content active" data-step="1">
            <h3 class="wizard-question">${t.q1[lang]}</h3>
            <div class="options-grid">
              <div>
                <input type="radio" id="type-analysis" name="projectType" value="Data Analysis" checked class="option-radio">
                <label for="type-analysis" class="option-label">
                  <span class="option-bullet"></span>
                  <span>${t.opt1_1[lang]}</span>
                </label>
              </div>
              <div>
                <input type="radio" id="type-dashboard" name="projectType" value="Power BI Dashboard" class="option-radio">
                <label for="type-dashboard" class="option-label">
                  <span class="option-bullet"></span>
                  <span>${t.opt1_2[lang]}</span>
                </label>
              </div>
              <div>
                <input type="radio" id="type-ml" name="projectType" value="Machine Learning Model" class="option-radio">
                <label for="type-ml" class="option-label">
                  <span class="option-bullet"></span>
                  <span>${t.opt1_3[lang]}</span>
                </label>
              </div>
              <div>
                <input type="radio" id="type-scraping" name="projectType" value="Web Scraping Tool" class="option-radio">
                <label for="type-scraping" class="option-label">
                  <span class="option-bullet"></span>
                  <span>${t.opt1_4[lang]}</span>
                </label>
              </div>
              <div>
                <input type="radio" id="type-other" name="projectType" value="Other / General" class="option-radio">
                <label for="type-other" class="option-label">
                  <span class="option-bullet"></span>
                  <span>${t.opt1_5[lang]}</span>
                </label>
              </div>
            </div>
          </div>

          <!-- STEP 2: Budget & Timeline -->
          <div class="wizard-step-content" data-step="2">
            <!-- Budget question -->
            <h3 class="wizard-question">${t.q2[lang]}</h3>
            <div class="options-grid" style="margin-bottom: 2.5rem;">
              <div>
                <input type="radio" id="budget-low" name="projectBudget" value="Under $500" checked class="option-radio">
                <label for="budget-low" class="option-label">
                  <span class="option-bullet"></span>
                  <span>${t.opt2_1[lang]}</span>
                </label>
              </div>
              <div>
                <input type="radio" id="budget-mid" name="projectBudget" value="$500 - $1500" class="option-radio">
                <label for="budget-mid" class="option-label">
                  <span class="option-bullet"></span>
                  <span>${t.opt2_2[lang]}</span>
                </label>
              </div>
              <div>
                <input type="radio" id="budget-high" name="projectBudget" value="Above $1500" class="option-radio">
                <label for="budget-high" class="option-label">
                  <span class="option-bullet"></span>
                  <span>${t.opt2_3[lang]}</span>
                </label>
              </div>
              <div>
                <input type="radio" id="budget-discuss" name="projectBudget" value="To discuss" class="option-radio">
                <label for="budget-discuss" class="option-label">
                  <span class="option-bullet"></span>
                  <span>${t.opt2_4[lang]}</span>
                </label>
              </div>
            </div>

            <!-- Timeline question -->
            <h3 class="wizard-question">${t.q3[lang]}</h3>
            <div class="options-grid">
              <div>
                <input type="radio" id="time-fast" name="projectTimeline" value="Under 2 weeks" checked class="option-radio">
                <label for="time-fast" class="option-label">
                  <span class="option-bullet"></span>
                  <span>${t.opt3_1[lang]}</span>
                </label>
              </div>
              <div>
                <input type="radio" id="time-mid" name="projectTimeline" value="2 weeks to 1 month" class="option-radio">
                <label for="time-mid" class="option-label">
                  <span class="option-bullet"></span>
                  <span>${t.opt3_2[lang]}</span>
                </label>
              </div>
              <div>
                <input type="radio" id="time-flex" name="projectTimeline" value="Flexible" class="option-radio">
                <label for="time-flex" class="option-label">
                  <span class="option-bullet"></span>
                  <span>${t.opt3_3[lang]}</span>
                </label>
              </div>
            </div>
          </div>

          <!-- STEP 3: Contact Details -->
          <div class="wizard-step-content" data-step="3">
            <h3 class="wizard-question">${translations.contact.formTitle[lang]}</h3>
            
            <div class="form-group">
              <label for="wizard-name">${translations.contact.labelName[lang]}*</label>
              <input type="text" id="wizard-name" name="name" class="form-control" placeholder="${translations.contact.placeholderName[lang]}" required autocomplete="name">
              <span id="wizard-name-error" class="form-status error" style="display:none; padding: 0.2rem; margin: 0; text-align:start; background:none; border:none; font-size:0.8rem;"></span>
            </div>

            <div class="form-group">
              <label for="wizard-email">${translations.contact.labelEmail[lang]}*</label>
              <input type="email" id="wizard-email" name="email" class="form-control" placeholder="${translations.contact.placeholderEmail[lang]}" required autocomplete="email">
              <span id="wizard-email-error" class="form-status error" style="display:none; padding: 0.2rem; margin: 0; text-align:start; background:none; border:none; font-size:0.8rem;"></span>
            </div>

            <div class="form-group">
              <label for="wizard-desc">${translations.contact.labelMessage[lang]}*</label>
              <textarea id="wizard-desc" name="message" class="form-control form-textarea" placeholder="${translations.contact.placeholderMessage[lang]}" required minlength="10"></textarea>
              <span id="wizard-desc-error" class="form-status error" style="display:none; padding: 0.2rem; margin: 0; text-align:start; background:none; border:none; font-size:0.8rem;"></span>
            </div>
          </div>

          <!-- Actions navigation footer -->
          <div class="wizard-actions">
            <button type="button" class="btn btn-secondary" id="wizard-prev-btn" style="visibility: hidden;">
              <i class="fas ${isRTL ? 'fa-arrow-left' : 'fa-arrow-right'}"></i> ${t.back[lang]}
            </button>
            <button type="button" class="btn btn-primary" id="wizard-next-btn">
              ${t.next[lang]} <i class="fas ${isRTL ? 'fa-arrow-right' : 'fa-arrow-left'}"></i>
            </button>
          </div>
          
          <div id="wizard-status-msg" class="form-status" style="margin-top:1.5rem;"></div>
        </form>
      </div>
    </div>
  `;
}

export function init(lang) {
  const form = document.getElementById('project-wizard-form');
  const nextBtn = document.getElementById('wizard-next-btn');
  const prevBtn = document.getElementById('wizard-prev-btn');
  const statusMsg = document.getElementById('wizard-status-msg');

  if (!form) return;

  const totalSteps = 3;
  let currentStep = 1;

  const isRTL = lang === 'ar';
  const t = translations.startProject;

  function updateWizardUI() {
    // Hide all steps
    document.querySelectorAll('.wizard-step-content').forEach(el => el.classList.remove('active'));
    // Show active step
    document.querySelector(`.wizard-step-content[data-step="${currentStep}"]`).classList.add('active');

    // Update progress steps
    document.querySelectorAll('.wizard-step-indicator').forEach(el => {
      const step = parseInt(el.getAttribute('data-step'));
      el.classList.remove('active', 'completed');
      if (step === currentStep) {
        el.classList.add('active');
      } else if (step < currentStep) {
        el.classList.add('completed');
      }
    });

    // Control buttons visibility and labels
    if (currentStep === 1) {
      prevBtn.style.visibility = 'hidden';
      nextBtn.innerHTML = `${t.next[lang]} <i class="fas ${isRTL ? 'fa-arrow-left' : 'fa-arrow-right'}"></i>`;
    } else {
      prevBtn.style.visibility = 'visible';
      if (currentStep === totalSteps) {
        nextBtn.innerHTML = `<i class="fas fa-paper-plane"></i> ${t.finish[lang]}`;
      } else {
        nextBtn.innerHTML = `${t.next[lang]} <i class="fas ${isRTL ? 'fa-arrow-left' : 'fa-arrow-right'}"></i>`;
      }
    }
  }

  // Next and Submit action
  nextBtn.addEventListener('click', async () => {
    if (currentStep < totalSteps) {
      currentStep++;
      updateWizardUI();
    } else {
      // Step 3 submission logic
      const nameInput = document.getElementById('wizard-name');
      const emailInput = document.getElementById('wizard-email');
      const descInput = document.getElementById('wizard-desc');

      const nameErr = document.getElementById('wizard-name-error');
      const emailErr = document.getElementById('wizard-email-error');
      const descErr = document.getElementById('wizard-desc-error');

      // Clear errors
      nameErr.style.display = 'none';
      emailErr.style.display = 'none';
      descErr.style.display = 'none';
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

      if (descInput.value.trim().length < 10) {
        descErr.textContent = isRTL ? 'الرجاء كتابة تفاصيل المشروع (10 أحرف على الأقل)' : 'Please write project details (at least 10 characters)';
        descErr.style.display = 'block';
        isValid = false;
      }

      if (!isValid) return;

      // Submit via fetch to Formspree
      nextBtn.disabled = true;
      nextBtn.textContent = t.submitting[lang];
      statusMsg.textContent = t.submitting[lang];
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
          statusMsg.textContent = t.success[lang];
          statusMsg.className = 'form-status success';
          form.reset();
          // Reset steps
          currentStep = 1;
          setTimeout(() => {
            updateWizardUI();
            statusMsg.style.display = 'none';
            nextBtn.disabled = false;
          }, 6000);
        } else {
          throw new Error('Formspree returned error status');
        }
      } catch (err) {
        // Error
        statusMsg.textContent = translations.contact.error[lang];
        statusMsg.className = 'form-status error';
        nextBtn.disabled = false;
        nextBtn.innerHTML = `<i class="fas fa-paper-plane"></i> ${t.finish[lang]}`;
      }
    }
  });

  // Previous action
  prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
      currentStep--;
      updateWizardUI();
    }
  });
}
