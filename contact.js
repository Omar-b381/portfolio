// Contact Form Enhancement Script
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const submitButton = form.querySelector('.cta-button');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoading = submitButton.querySelector('.button-loading');
    const submitStatus = document.getElementById('submit-status');
    const messageTextarea = document.getElementById('message');
    const characterCount = document.querySelector('.character-count');

    // Form validation patterns
    const patterns = {
        name: /^[\u0600-\u06FFa-zA-Z\s]{2,50}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: /^.{10,1000}$/s
    };

    // Error messages
    const errorMessages = {
        name: {
            required: 'الاسم مطلوب',
            invalid: 'يرجى إدخال اسم صحيح (2-50 حرف)'
        },
        email: {
            required: 'البريد الإلكتروني مطلوب',
            invalid: 'يرجى إدخال بريد إلكتروني صحيح'
        },
        message: {
            required: 'الرسالة مطلوبة',
            invalid: 'يجب أن تكون الرسالة بين 10-1000 حرف'
        }
    };

    // Character counter for message
    if (messageTextarea && characterCount) {
        messageTextarea.addEventListener('input', function() {
            const length = this.value.length;
            characterCount.textContent = `${length}/1000 حرف`;
            
            if (length > 1000) {
                characterCount.classList.add('over-limit');
            } else {
                characterCount.classList.remove('over-limit');
            }
        });
    }

    // Real-time validation
    function validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        if (!errorElement) return true;

        // Clear previous error
        errorElement.textContent = '';
        field.classList.remove('error');

        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            showError(field, errorElement, errorMessages[fieldName]?.required || 'هذا الحقل مطلوب');
            return false;
        }

        // Validate pattern if value exists
        if (value && patterns[fieldName] && !patterns[fieldName].test(value)) {
            showError(field, errorElement, errorMessages[fieldName]?.invalid || 'قيمة غير صحيحة');
            return false;
        }

        // Field is valid
        field.classList.add('valid');
        return true;
    }

    function showError(field, errorElement, message) {
        field.classList.add('error');
        field.classList.remove('valid');
        errorElement.textContent = message;
    }

    // Add event listeners for real-time validation
    const formFields = form.querySelectorAll('input[required], textarea[required]');
    formFields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                validateField(field);
            }
        });
    });

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        formFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            showStatus('يرجى تصحيح الأخطاء أعلاه', 'error');
            return;
        }

        // Show loading state
        setLoadingState(true);
        showStatus('جاري إرسال الرسالة...', 'loading');

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showStatus('تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.', 'success');
                form.reset();
                characterCount.textContent = '0/1000 حرف';
                
                // Remove validation classes
                formFields.forEach(field => {
                    field.classList.remove('valid', 'error');
                });
            } else {
                throw new Error('فشل في إرسال الرسالة');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showStatus('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى أو التواصل مباشرة.', 'error');
        } finally {
            setLoadingState(false);
        }
    });

    function setLoadingState(loading) {
        if (loading) {
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            buttonText.style.display = 'none';
            buttonLoading.style.display = 'inline-flex';
        } else {
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
            buttonText.style.display = 'inline';
            buttonLoading.style.display = 'none';
        }
    }

    function showStatus(message, type) {
        submitStatus.textContent = message;
        submitStatus.className = `submit-status ${type}`;
        
        // Auto-hide success/error messages after 5 seconds
        if (type === 'success' || type === 'error') {
            setTimeout(() => {
                submitStatus.textContent = '';
                submitStatus.className = 'submit-status';
            }, 5000);
        }
    }

    // Smooth scroll to form on page load if there's a hash
    if (window.location.hash === '#contact-form') {
        setTimeout(() => {
            document.querySelector('.contact-form-wrapper').scrollIntoView({
                behavior: 'smooth'
            });
        }, 100);
    }
});

