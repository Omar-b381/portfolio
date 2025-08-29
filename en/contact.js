document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    if (!form) return; // Exit if no form is found on the page

    const submitButton = form.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoading = submitButton.querySelector('.button-loading');
    const submitStatus = document.getElementById('submit-status');
    const formFields = form.querySelectorAll('input[required], textarea[required]');

    // --- Basic real-time validation (optional but good to have) ---
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            // Use the browser's built-in validation check
            if (!this.checkValidity()) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
    });

    // --- Form Submission Logic ---
    form.addEventListener('submit', function(e) {
        // 1. Prevent the form from submitting the traditional way
        e.preventDefault();

        // 2. Validate all fields one last time before sending
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
            showStatus('Please fill out all required fields correctly.', 'error');
            return;
        }

        // 3. Show loading state to the user
        setLoadingState(true);
        showStatus('Sending your message...', 'loading');

        // 4. Create a FormData object from the form
        const formData = new FormData(form);

        // 5. Use fetch to send the data via AJAX
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json' // Crucial for Formspree to reply with JSON
            }
        }).then(response => {
            if (response.ok) {
                // SUCCESS! The form was submitted correctly.
                showStatus('Your message has been sent successfully! I will get back to you soon.', 'success');
                form.reset(); // Clear the form fields
                formFields.forEach(field => field.classList.remove('error', 'valid')); // Clear validation styles
            } else {
                // Handle server-side errors from Formspree (e.g., validation errors)
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        const errorMsg = data["errors"].map(error => error["message"]).join(", ");
                        showStatus(`An error occurred: ${errorMsg}`, 'error');
                    } else {
                        showStatus('An unexpected server error occurred. Please try again.', 'error');
                    }
                })
            }
        }).catch(error => {
            // Handle network errors (e.g., no internet connection)
            showStatus('Could not connect to the server. Please check your internet connection.', 'error');
        }).finally(() => {
            // ALWAYS turn off the loading state, whether it succeeded or failed
            setLoadingState(false);
        });
    });

    function setLoadingState(loading) {
        if (loading) {
            submitButton.disabled = true;
            if (buttonText) buttonText.style.display = 'none';
            if (buttonLoading) buttonLoading.style.display = 'inline-flex';
        } else {
            submitButton.disabled = false;
            if (buttonText) buttonText.style.display = 'inline';
            if (buttonLoading) buttonLoading.style.display = 'none';
        }
    }

    function showStatus(message, type) {
        if (!submitStatus) return;
        submitStatus.textContent = message;
        submitStatus.className = `submit-status ${type}`; // Use classes for styling
        
        // Auto-hide the message after a few seconds
        setTimeout(() => {
            // Only clear the message if it hasn't been replaced by a new one
            if (submitStatus.textContent === message) {
                submitStatus.textContent = '';
                submitStatus.className = 'submit-status';
            }
        }, 6000); // Message disappears after 6 seconds
    }
});