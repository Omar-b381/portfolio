document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    if (!form) return; // Exit if no form is found

    const submitButton = form.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoading = submitButton.querySelector('.button-loading');
    const submitStatus = document.getElementById('submit-status');
    const formFields = form.querySelectorAll('input[required], textarea[required]');

    // --- Basic real-time validation (optional but good to have) ---
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (!this.checkValidity()) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
    });

    // --- Form Submission Logic ---
    form.addEventListener('submit', function(e) {
        // 1. Prevent the form from submitting immediately
        e.preventDefault();

        // 2. Validate all fields one last time
        let isFormValid = true;
        formFields.forEach(field => {
            if (!field.checkValidity()) {
                field.classList.add('error');
                isFormValid = false;
            } else {
                field.classList.remove('error');
            }
        });

        if (!isFormValid) {
            showStatus('يرجى ملء جميع الحقول المطلوبة بشكل صحيح.', 'error');
            return;
        }

        // 3. Show loading state to the user
        setLoadingState(true);
        showStatus('جاري إرسال الرسالة...', 'loading');

        // 4. Create FormData object
        const formData = new FormData(form);

        // 5. Use fetch to send the data
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json' // This tells Formspree to reply with JSON
            }
        }).then(response => {
            if (response.ok) {
                // SUCCESS!
                showStatus('تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.', 'success');
                form.reset();
                formFields.forEach(field => field.classList.remove('error', 'valid'));
            } else {
                // Handle server-side errors from Formspree
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        const errorMsg = data["errors"].map(error => error["message"]).join(", ");
                        showStatus(`حدث خطأ: ${errorMsg}`, 'error');
                    } else {
                        showStatus('حدث خطأ غير متوقع من الخادم. يرجى المحاولة مرة أخرى.', 'error');
                    }
                })
            }
        }).catch(error => {
            // Handle network errors (e.g., no internet connection)
            showStatus('لا يمكن الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت.', 'error');
        }).finally(() => {
            // ALWAYS turn off the loading state
            setLoadingState(false);
        });
    });

    function setLoadingState(loading) {
        if (loading) {
            submitButton.disabled = true;
            buttonText.style.display = 'none';
            buttonLoading.style.display = 'inline-flex';
        } else {
            submitButton.disabled = false;
            buttonText.style.display = 'inline';
            buttonLoading.style.display = 'none';
        }
    }

    function showStatus(message, type) {
        submitStatus.textContent = message;
        submitStatus.className = `submit-status ${type}`; // Use classes for styling
        
        setTimeout(() => {
            if (submitStatus.textContent === message) {
                submitStatus.textContent = '';
                submitStatus.className = 'submit-status';
            }
        }, 6000); // Message disappears after 6 seconds
    }
});