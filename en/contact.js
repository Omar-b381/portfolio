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
        name: /^[a-zA-Z\s]{2,50}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: /^.{10,1000}$/s
    };

    // Error messages
    const errorMessages = {
        name: {
            required: 'Name is required',
            invalid: 'Please enter a valid name (2-50 characters)'
        },
        email: {
            required: 'Email is required',
            invalid: 'Please enter a valid email address'
        },
        message: {
            required: 'Message is required',
            invalid: 'The message must be between 10-1000 characters'
        }
    };

    // Character counter for message
    if (messageTextarea && characterCount) {
        messageTextarea.addEventListener('input', function() {
            const length = this.value.length;
            characterCount.textContent = `${length}/1000 characters`;
            
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

        errorElement.textContent = '';
        field.classList.remove('error');

        if (field.hasAttribute('required') && !value) {
            showError(field, errorElement, errorMessages[fieldName]?.required || 'This field is required');
            return false;
        }

        if (value && patterns[fieldName] && !patterns[fieldName].test(value)) {
            showError(field, errorElement, errorMessages[fieldName]?.invalid || 'Invalid value');
            return false;
        }

        field.classList.add('valid');
        return true;
    }

    function showError(field, errorElement, message) {
        field.classList.add('error');
        field.classList.remove('valid');
        errorElement.textContent = message;
    }

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

        let isValid = true;
        formFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            showStatus('Please correct the errors above', 'error');
            return;
        }

        setLoadingState(true);
        showStatus('Sending message...', 'loading');

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                showStatus('Your message has been sent successfully! I will contact you soon.', 'success');
                form.reset();
                if(characterCount) characterCount.textContent = '0/1000 characters';
                formFields.forEach(field => field.classList.remove('valid', 'error'));
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showStatus('An error occurred while sending the message. Please try again or contact me directly.', 'error');
        } finally {
            setLoadingState(false);
        }
    });

    function setLoadingState(loading) {
        if (loading) {
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            if (buttonText) buttonText.style.display = 'none';
            if (buttonLoading) buttonLoading.style.display = 'inline-flex';
        } else {
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
            if (buttonText) buttonText.style.display = 'inline';
            if (buttonLoading) buttonLoading.style.display = 'none';
        }
    }

    function showStatus(message, type) {
        submitStatus.textContent = message;
        submitStatus.className = `submit-status ${type}`;
        
        if (type === 'success' || type === 'error') {
            setTimeout(() => {
                submitStatus.textContent = '';
                submitStatus.className = 'submit-status';
            }, 5000);
        }
    }
});