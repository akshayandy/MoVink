document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;


    try {
        const response = await fetch('http://localhost:1000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });

        if (response.ok) {
            alert('Sign up successful! Please sign in.');
            window.location.href = './Signin.html'; // Redirect to sign-in page after successful sign-up
        } else {
            alert('Sign up failed. Please try again.');
        }
    } catch (error) {
        console.error('Error during sign up:', error);
        alert('An error occurred. Please try again later.');
    }
});