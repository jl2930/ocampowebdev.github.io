document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('form');
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const firstName = document.querySelector('input[placeholder="Jherome"]').value;
        const lastName = document.querySelector('input[placeholder="Ocampo"]').value;
        const email = document.querySelector('input[type="email"]').value;
        const phone = document.querySelector('input[type="tel"]').value;
        const dob = document.querySelector('input[type="date"]').value;
        const password = document.querySelectorAll('input[type="password"]')[0].value;
        const confirmPassword = document.querySelectorAll('input[type="password"]')[1].value;
        
        // Simple validation
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Create URL parameters
        const params = new URLSearchParams();
        params.append('firstName', firstName);
        params.append('lastName', lastName);
        params.append('email', email);
        if (phone) params.append('phone', phone);
        params.append('dob', dob);
        
        window.location.href = 'login.html?' + params.toString();
    });
       
});