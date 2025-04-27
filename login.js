document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember-me').checked;
        
        // Create URL parameters
        const params = new URLSearchParams();
        params.append('email', email);
        params.append('password', password);
        if (rememberMe) params.append('remember', 'true');
        
        window.location.href = 'product.html?' + params.toString();
    });
    

});