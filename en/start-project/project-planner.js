document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const form = document.getElementById('project-planner-form');
    const formSteps = [...form.querySelectorAll('.form-step')];
    const progressSteps = [...document.querySelectorAll('.progress-step')];
    const successMessage = document.getElementById('success-message');
    let currentStep = 0;

    const updateFormSteps = () => {
        formSteps.forEach((step, index) => {
            step.classList.toggle('active-step', index === currentStep);
        });
    };

    const updateProgressbar = () => {
        progressSteps.forEach((step, index) => {
            if (index < currentStep + 1) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    };

    const compileSummary = () => {
        const formData = new FormData(form);
        let summary = "Project Request Summary:\n\n";
        summary += `Main Goal: ${formData.get('project_goal')}\n`;
        summary += `Selected Package: ${formData.get('service_package')}\n`;
        summary += `Approximate Budget: ${formData.get('budget')}\n\n`;
        summary += `Additional Details:\n${formData.get('project_details')}`;
        
        document.getElementById('summary-for-email').value = summary;
    };

    nextBtn.addEventListener('click', () => {
        const currentInputs = formSteps[currentStep].querySelectorAll('input[type="radio"]');
        if (currentInputs.length > 0) {
            const isChecked = [...currentInputs].some(input => input.checked);
            if (!isChecked) {
                alert('Please select an option to continue.');
                return;
            }
        }

        if (currentStep < formSteps.length - 1) {
            currentStep++;
            updateFormSteps();
            updateProgressbar();
            prevBtn.style.display = 'inline-flex';
            if (currentStep === formSteps.length - 1) {
                nextBtn.textContent = 'Submit Request';
            }
        } else {
            compileSummary();
            
            const submitButton = document.getElementById('next-btn');
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;

            const finalFormData = new FormData(form);
            fetch(form.action, {
                method: 'POST',
                body: finalFormData,
                headers: {'Accept': 'application/json'}
            }).then(response => {
                if (response.ok || response.type === 'opaqueredirect') {
                    form.style.display = 'none';
                    document.querySelector('.planner-progress').style.display = 'none';
                    successMessage.style.display = 'block';
                } else {
                    alert('An error occurred while submitting the form. Please try again.');
                    submitButton.textContent = 'Submit Request';
                    submitButton.disabled = false;
                }
            }).catch(() => {
                alert('Could not connect to the server. Please check your internet connection.');
                submitButton.textContent = 'Submit Request';
                submitButton.disabled = false;
            });
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            updateFormSteps();
            updateProgressbar();
            nextBtn.textContent = 'Next';
            if (currentStep === 0) {
                prevBtn.style.display = 'none';
            }
        }
    });
});