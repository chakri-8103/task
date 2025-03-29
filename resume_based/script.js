document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('interviewForm');
    const fileInput = form.querySelector('input[type="file"]');
    const fileName = form.querySelector('.file-name');

    // Update file name display when a file is selected
    fileInput.addEventListener('change', function() {
        fileName.textContent = this.files[0] ? this.files[0].name : 'No file chosen';
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            if (key === 'resume' && value.name) {
                data[key] = value.name;
            } else {
                data[key] = value;
            }
        }

        console.log('Form submitted:', data);
        // Here you would typically send the data to a server
        alert('Interview form submitted successfully!');
    });
});